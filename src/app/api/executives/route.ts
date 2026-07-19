/* ============================================================
   Automyte AI — Executives API Route
   GET  /api/executives    → list all default executives
   POST /api/executives    → create a custom executive (placeholder)
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import type { Executive, ExecutiveRole } from "@/types/database";
import {
  EXECUTIVE_COLORS,
  EXECUTIVE_ICONS,
  getSystemPrompt,
} from "@/lib/ai/executive-factory";

// ---- Default Executives (hardcoded for MVP) ----

const WORKSPACE_ID = "ws_demo_001";
const now = new Date().toISOString();

function makeExecutive(
  role: ExecutiveRole,
  name: string,
  model: string = "nvidia/llama-3.3-nemotron-super-49b-v1"
): Executive {
  return {
    id: `exec_${role.toLowerCase()}`,
    workspace_id: WORKSPACE_ID,
    name,
    role,
    system_prompt: getSystemPrompt(role),
    skills: [],
    context_text: "",
    integrations: [],
    schedule: null,
    state: "idle",
    avatar_url: null,
    model,
    is_default: true,
    created_at: now,
    updated_at: now,
  };
}

const DEFAULT_EXECUTIVES: Executive[] = [
  makeExecutive("CEO", "Atlas — Chief Executive"),
  makeExecutive("CTO", "Nova — Chief Technology Officer"),
  makeExecutive("CMO", "Lyra — Chief Marketing Officer"),
  makeExecutive("CFO", "Sage — Chief Financial Officer"),
  makeExecutive("COO", "Orion — Chief Operations Officer"),
  makeExecutive("Design", "Prism — Design Director"),
  makeExecutive("Engineering", "Axon — Lead Engineer"),
  makeExecutive("Sales", "Blaze — Sales Director"),
  makeExecutive("Marketing", "Echo — Marketing Lead"),
  makeExecutive("Research", "Cipher — Research Analyst"),
  makeExecutive("Legal", "Shield — Legal Advisor"),
  makeExecutive("Product", "Compass — Product Manager"),
];

// In-memory store for custom executives (MVP)
const customExecutives: Executive[] = [];

// ---- Enrichment helper (add colors/icons for the frontend) ----

interface EnrichedExecutive extends Executive {
  color: string;
  icon: string;
}

function enrich(exec: Executive): EnrichedExecutive {
  return {
    ...exec,
    color: EXECUTIVE_COLORS[exec.role] ?? "#8b5cf6",
    icon: EXECUTIVE_ICONS[exec.role] ?? "Bot",
  };
}

// ---- Handlers ----

export async function GET() {
  try {
    const all = [...DEFAULT_EXECUTIVES, ...customExecutives].map(enrich);
    return NextResponse.json({ data: all, error: null });
  } catch (error) {
    console.error("[/api/executives] GET error:", error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, role, model } = body as {
      name?: string;
      role?: ExecutiveRole;
      model?: string;
    };

    if (!name || !role) {
      return NextResponse.json(
        { data: null, error: "Missing required fields: name, role" },
        { status: 400 }
      );
    }

    const newExec: Executive = {
      id: `exec_custom_${Date.now()}`,
      workspace_id: WORKSPACE_ID,
      name,
      role,
      system_prompt: getSystemPrompt(role),
      skills: [],
      context_text: body.context_text ?? "",
      integrations: [],
      schedule: null,
      state: "idle",
      avatar_url: null,
      model: model ?? "nvidia/llama-3.3-nemotron-super-49b-v1",
      is_default: false,
      created_at: now,
      updated_at: now,
    };

    customExecutives.push(newExec);

    return NextResponse.json({ data: enrich(newExec), error: null }, { status: 201 });
  } catch (error) {
    console.error("[/api/executives] POST error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { data: null, error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
