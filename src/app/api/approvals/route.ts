/* ============================================================
   Automyte AI — Approvals API Route (Store Integrated)
   GET   /api/approvals           → list approvals (filterable by status)
   POST  /api/approvals           → create a new approval request
   PATCH /api/approvals?id=<id>   → approve or reject
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { getApprovals, addApproval, updateApproval } from "@/lib/store";
import type { ApprovalStatus } from "@/types/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as ApprovalStatus | null;

    let filtered = [...getApprovals()];

    if (status) {
      filtered = filtered.filter((a) => a.status === status);
    }

    // Sort: pending first, then by created_at descending
    filtered.sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return NextResponse.json({ data: filtered, error: null });
  } catch (error) {
    console.error("[/api/approvals] GET error:", error);
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

    const { requested_action, payload, task_id, automation_id } = body as {
      requested_action?: string;
      payload?: Record<string, unknown>;
      task_id?: string;
      automation_id?: string;
    };

    if (!requested_action) {
      return NextResponse.json(
        { data: null, error: "Missing required field: requested_action" },
        { status: 400 }
      );
    }

    const newApproval = addApproval({
      task_id: task_id ?? null,
      automation_id: automation_id ?? null,
      requested_action,
      payload: payload ?? {},
    });

    return NextResponse.json({ data: newApproval, error: null }, { status: 201 });
  } catch (error) {
    console.error("[/api/approvals] POST error:", error);

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

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const approvalId = searchParams.get("id");

    if (!approvalId) {
      return NextResponse.json(
        { data: null, error: "Missing query parameter: id" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, decided_by } = body as {
      status?: "approved" | "rejected";
      decided_by?: string;
    };

    if (!status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        {
          data: null,
          error: "Invalid or missing field: status (must be 'approved' or 'rejected')",
        },
        { status: 400 }
      );
    }

    const updated = updateApproval(approvalId, status, decided_by ?? "user_founder");
    if (!updated) {
      return NextResponse.json(
        { data: null, error: `Approval not found: ${approvalId}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updated, error: null });
  } catch (error) {
    console.error("[/api/approvals] PATCH error:", error);

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
