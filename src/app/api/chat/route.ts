/* ============================================================
   Automyte AI — Streaming Chat API Route (Store Integrated)
   POST /api/chat
   ============================================================ */

import { runExecutive } from "@/lib/ai/executive-factory";
import { NextRequest, NextResponse } from "next/server";
import { addTask, addDocument, updateProfile, addApproval } from "@/lib/store";
import type { ExecutiveRole, StartupProfile, BrandKit, DocumentType } from "@/types/database";
import type OpenAI from "openai";

interface ChatRequestBody {
  message: string;
  executiveRole: ExecutiveRole;
  conversationHistory?: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  startupProfile?: Partial<StartupProfile> | null;
  brandKit?: BrandKit | null;
  model?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequestBody;

    // Validate required fields
    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { data: null, error: "Missing required field: message" },
        { status: 400 }
      );
    }

    if (!body.executiveRole) {
      return NextResponse.json(
        { data: null, error: "Missing required field: executiveRole" },
        { status: 400 }
      );
    }

    const {
      message,
      executiveRole,
      conversationHistory = [],
      startupProfile = null,
      brandKit = null,
      model,
    } = body;

    // Run executive in streaming mode
    const result = await runExecutive({
      role: executiveRole,
      userMessage: message,
      conversationHistory,
      startupProfile,
      brandKit,
      model,
      stream: true,
    });

    const { stream: aiStream, model: usedModel, provider } = result as {
      stream: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>;
      model: string;
      provider: string;
    };

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          // Send metadata event first
          const metaEvent = `data: ${JSON.stringify({
            type: "meta",
            model: usedModel,
            provider,
            executive: executiveRole,
          })}\n\n`;
          controller.enqueue(encoder.encode(metaEvent));

          // Accumulate tool calls across chunks
          const pendingToolCalls: Map<
            number,
            { id: string; name: string; arguments: string }
          > = new Map();

          for await (const chunk of aiStream) {
            const delta = chunk.choices[0]?.delta;
            const finishReason = chunk.choices[0]?.finish_reason;

            // Stream text content
            if (delta?.content) {
              const event = `data: ${JSON.stringify({
                type: "content",
                content: delta.content,
              })}\n\n`;
              controller.enqueue(encoder.encode(event));
            }

            // Accumulate tool call deltas
            if (delta?.tool_calls) {
              for (const tc of delta.tool_calls) {
                const idx = tc.index;
                if (!pendingToolCalls.has(idx)) {
                  pendingToolCalls.set(idx, {
                    id: tc.id || "",
                    name: tc.function?.name || "",
                    arguments: "",
                  });
                }
                const existing = pendingToolCalls.get(idx)!;
                if (tc.id) existing.id = tc.id;
                if (tc.function?.name) existing.name = tc.function.name;
                if (tc.function?.arguments) {
                  existing.arguments += tc.function.arguments;
                }
              }
            }

            // When finish_reason is "tool_calls", execute the tools and emit them
            if (finishReason === "tool_calls" || finishReason === "stop") {
              if (pendingToolCalls.size > 0) {
                for (const [, toolCall] of pendingToolCalls) {
                  let parsedArgs: Record<string, unknown> = {};
                  try {
                    parsedArgs = JSON.parse(toolCall.arguments);
                  } catch {
                    parsedArgs = { raw: toolCall.arguments };
                  }

                  // Execute action against store
                  try {
                    if (toolCall.name === "create_task") {
                      addTask({
                        title: String(parsedArgs.title || ""),
                        description: String(parsedArgs.description || ""),
                        priority: (parsedArgs.priority as "low" | "medium" | "high" | "critical") || "medium",
                        requested_by: "user_founder",
                        assigned_executive_id: `exec_${executiveRole.toLowerCase()}`,
                        module: "general",
                        status: "todo",
                        requires_approval: false,
                        artifacts: [],
                        messages: [],
                        subtasks: [],
                        dependencies: [],
                        project_id: null,
                      });
                    } else if (toolCall.name === "create_document") {
                      addDocument({
                        name: String(parsedArgs.name || ""),
                        type: (parsedArgs.type as DocumentType) || "custom",
                        content: String(parsedArgs.content || ""),
                        storage_ref: null,
                        pinned: false,
                        generated_by: `exec_${executiveRole.toLowerCase()}`,
                        uploaded_by: null,
                        folder: String(parsedArgs.folder || "General"),
                      });
                    } else if (toolCall.name === "update_startup_profile") {
                      const field = String(parsedArgs.field || "");
                      const val = parsedArgs.value;
                      if (field) {
                        updateProfile({ [field]: val });
                      }
                    } else if (toolCall.name === "request_approval") {
                      addApproval({
                        task_id: null,
                        automation_id: null,
                        requested_action: String(parsedArgs.requested_action || ""),
                        payload: (parsedArgs.payload as Record<string, unknown>) || {},
                      });
                    }
                  } catch (err) {
                    console.error("Failed to execute store action in chat SSE loop:", err);
                  }

                  const toolEvent = `data: ${JSON.stringify({
                    type: "tool_call",
                    tool_call: {
                      id: toolCall.id,
                      name: toolCall.name,
                      arguments: parsedArgs,
                    },
                  })}\n\n`;
                  controller.enqueue(encoder.encode(toolEvent));
                }
                pendingToolCalls.clear();
              }
            }

            // Stream finish event
            if (finishReason) {
              const finishEvent = `data: ${JSON.stringify({
                type: "finish",
                finish_reason: finishReason,
              })}\n\n`;
              controller.enqueue(encoder.encode(finishEvent));
            }
          }

          // Send done sentinel
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (streamError) {
          const errorEvent = `data: ${JSON.stringify({
            type: "error",
            error:
              streamError instanceof Error
                ? streamError.message
                : "Stream processing error",
          })}\n\n`;
          controller.enqueue(encoder.encode(errorEvent));
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("[/api/chat] Error:", error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { data: null, error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: null,
        error:
          error instanceof Error
            ? error.message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}
