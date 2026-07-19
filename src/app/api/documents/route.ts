/* ============================================================
   Automyte AI — Documents API Route (Store Integrated)
   GET  /api/documents          → list documents (filterable)
   POST /api/documents          → create / generate a document
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { getDocuments, addDocument } from "@/lib/store";
import type { DocumentType } from "@/types/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as DocumentType | null;
    const folder = searchParams.get("folder");
    const pinned = searchParams.get("pinned");

    let filtered = [...getDocuments()];

    if (type) {
      filtered = filtered.filter((d) => d.type === type);
    }
    if (folder) {
      filtered = filtered.filter(
        (d) => d.folder.toLowerCase() === folder.toLowerCase()
      );
    }
    if (pinned !== null) {
      filtered = filtered.filter((d) => d.pinned === (pinned === "true"));
    }

    // Sort by pinned first, then by updated_at
    filtered.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    return NextResponse.json({ data: filtered, error: null });
  } catch (error) {
    console.error("[/api/documents] GET error:", error);
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

    const { name, type, content, folder, generated_by } = body as {
      name?: string;
      type?: DocumentType;
      content?: string;
      folder?: string;
      generated_by?: string;
    };

    if (!name || !type) {
      return NextResponse.json(
        { data: null, error: "Missing required fields: name, type" },
        { status: 400 }
      );
    }

    const newDoc = addDocument({
      name,
      type,
      content: content ?? "",
      storage_ref: null,
      pinned: false,
      generated_by: generated_by ?? null,
      uploaded_by: null,
      folder: folder ?? "General",
    });

    return NextResponse.json({ data: newDoc, error: null }, { status: 201 });
  } catch (error) {
    console.error("[/api/documents] POST error:", error);

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
