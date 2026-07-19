/* ============================================================
   Automyte AI — Tasks API Route (Store Integrated)
   GET   /api/tasks           → list all tasks
   POST  /api/tasks           → create a new task
   PATCH /api/tasks?id=<id>   → update a task
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { getTasks, addTask, updateTask } from "@/lib/store";
import type { Task, TaskStatus, TaskPriority } from "@/types/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as TaskStatus | null;
    const priority = searchParams.get("priority") as TaskPriority | null;
    const assignee = searchParams.get("assignee");

    let filtered = [...getTasks()];

    if (status) {
      filtered = filtered.filter((t) => t.status === status);
    }
    if (priority) {
      filtered = filtered.filter((t) => t.priority === priority);
    }
    if (assignee) {
      filtered = filtered.filter((t) => t.assigned_executive_id === assignee);
    }

    return NextResponse.json({ data: filtered, error: null });
  } catch (error) {
    console.error("[/api/tasks] GET error:", error);
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

    const { title, description, priority, assigned_executive_id, module } = body as {
      title?: string;
      description?: string;
      priority?: TaskPriority;
      assigned_executive_id?: string;
      module?: string;
    };

    if (!title) {
      return NextResponse.json(
        { data: null, error: "Missing required field: title" },
        { status: 400 }
      );
    }

    const newTask = addTask({
      title,
      description: description ?? "",
      requested_by: "user_founder",
      assigned_executive_id: assigned_executive_id ?? null,
      module: module ?? "general",
      status: "todo",
      priority: priority ?? "medium",
      requires_approval: false,
      artifacts: [],
      messages: [],
      subtasks: [],
      dependencies: [],
      project_id: null,
    });

    return NextResponse.json({ data: newTask, error: null }, { status: 201 });
  } catch (error) {
    console.error("[/api/tasks] POST error:", error);

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
    const taskId = searchParams.get("id");

    if (!taskId) {
      return NextResponse.json(
        { data: null, error: "Missing query parameter: id" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updates = body as Partial<
      Pick<Task, "title" | "description" | "status" | "priority" | "assigned_executive_id">
    >;

    const updated = updateTask(taskId, updates);
    if (!updated) {
      return NextResponse.json(
        { data: null, error: `Task not found: ${taskId}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updated, error: null });
  } catch (error) {
    console.error("[/api/tasks] PATCH error:", error);

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
