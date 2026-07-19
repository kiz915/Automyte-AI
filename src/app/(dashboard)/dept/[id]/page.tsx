"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";

/* ============================================================
   Department Workspace — Chat + Task Panel
   Wired to real NVIDIA API via /api/chat
   ============================================================ */

const deptMeta: Record<string, { name: string; description: string; agentName: string }> = {
  engineering: { name: "Engineering", description: "Code, infrastructure, and deployments", agentName: "Kai" },
  sales: { name: "Sales", description: "Leads, outreach, and pipeline", agentName: "Ryan" },
  marketing: { name: "Marketing", description: "Content, campaigns, and growth", agentName: "Aria" },
  design: { name: "Design", description: "Brand, UI, and creative assets", agentName: "Luna" },
  finance: { name: "Finance", description: "Revenue, costs, and projections", agentName: "Sam" },
  operations: { name: "Operations", description: "Processes, tools, and workflows", agentName: "Devon" },
  legal: { name: "Legal", description: "Contracts, compliance, and IP", agentName: "Morgan" },
  support: { name: "Support", description: "Customer issues and feedback", agentName: "Jamie" },
};

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function DepartmentPage() {
  const params = useParams();
  const deptId = params.id as string;
  const meta = deptMeta[deptId] || { name: deptId, description: "", agentName: "Agent" };
  const capitalizedRole = (deptId.charAt(0).toUpperCase() + deptId.slice(1)) as any; // Map to ExecutiveRole

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hi! I'm ${meta.agentName}, your ${meta.name} agent. I can help with ${meta.description.toLowerCase()}. What would you like to work on?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const messageToSend = input.trim();
    setInput("");
    setIsStreaming(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", timestamp: new Date() }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          executiveRole: capitalizedRole,
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      
      if (reader) {
        let done = false;
        let assistantContent = "";

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.replace("data: ", "");
                if (data === "[DONE]") {
                  done = true;
                  break;
                }
                
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.type === "content") {
                    assistantContent += parsed.content;
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === assistantId ? { ...m, content: assistantContent } : m
                      )
                    );
                  }
                } catch (e) {
                  console.error("Error parsing JSON chunk:", e);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: "Sorry, I encountered an error communicating with the server." } : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="h-[calc(100vh-52px)] flex">
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Department header */}
        <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-[560] text-ink">{meta.name}</h1>
            <p className="text-[12px] text-ink-muted">{meta.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[rgba(32,32,32,0.04)]">
              <span className="status-dot status-dot-active" style={{ width: 6, height: 6 }} />
              <span className="text-[11px] text-ink-faint font-[460]">{meta.agentName} is active</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[600px] ${msg.role === "user" ? "order-2" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#D9D9D6] flex items-center justify-center">
                      <span className="text-[7px] font-bold text-ink-faint">{meta.agentName[0]}</span>
                    </div>
                    <span className="text-[11px] font-[520] text-ink-faint">{meta.agentName}</span>
                    <span className="text-[10px] text-ink-ghost">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                )}
                <div
                  className={`rounded-[12px] px-4 py-2.5 text-[14px] leading-[160%] ${
                    msg.role === "user"
                      ? "bg-ink text-ink-inverted rounded-br-[4px]"
                      : "bg-surface-card border border-border-subtle rounded-bl-[4px]"
                  }`}
                >
                  {msg.content.split("\n").map((line, i) => (
                    <p key={i} className={`${i > 0 ? "mt-2" : ""} ${!line ? "h-2" : ""}`}>
                      {line.split("**").map((part, j) =>
                        j % 2 === 1 ? <strong key={j} className="font-[600]">{part}</strong> : part
                      )}
                    </p>
                  ))}
                  {msg.role === "assistant" && msg.content === "" && isStreaming && (
                    <div className="flex gap-1 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-5 pb-4 pt-2">
          <div className="flex items-end gap-2 p-2 rounded-[12px] border border-border bg-surface-card focus-within:border-ink/20 transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Ask ${meta.agentName} anything...`}
              rows={1}
              className="flex-1 resize-none bg-transparent text-[14px] text-ink placeholder:text-ink-muted focus:outline-none min-h-[36px] max-h-[120px] px-2 py-1.5"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="shrink-0 w-8 h-8 rounded-[6px] bg-ink text-ink-inverted flex items-center justify-center disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-opacity"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-ink-ghost text-center mt-2">
            Automyte agents can make mistakes. Review important actions before approving.
          </p>
        </div>
      </div>

      {/* Right panel — tasks */}
      <div className="w-[300px] border-l border-border-subtle bg-surface-card overflow-y-auto hidden xl:flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-border-subtle">
          <h2 className="text-[13px] font-[560] text-ink">Tasks</h2>
        </div>
        <div className="flex-1 px-3 py-2 space-y-1">
          {/* Example task items */}
          {["Set up CI/CD pipeline", "Configure staging environment", "Review PR #42"].map((task, i) => (
            <div key={i} className="flex items-start gap-2.5 px-2 py-2 rounded-[6px] hover:bg-[rgba(32,32,32,0.02)] transition-colors cursor-pointer">
              <input type="checkbox" className="mt-0.5 w-3.5 h-3.5 rounded-sm border-border accent-ink" readOnly />
              <div className="min-w-0">
                <p className="text-[12px] font-[480] text-ink truncate">{task}</p>
                <p className="text-[10px] text-ink-muted mt-0.5">{i === 0 ? "In progress" : i === 1 ? "Blocked" : "Ready for review"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
