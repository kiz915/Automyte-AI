/* ============================================================
   Automyte AI — Startup Profile API Route (Store Integrated)
   GET  /api/startup-profile   → get current profile
   POST /api/startup-profile   → create / replace profile
   PUT  /api/startup-profile   → partial update
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { getProfile, updateProfile } from "@/lib/store";

export async function GET() {
  try {
    return NextResponse.json({ data: getProfile(), error: null });
  } catch (error) {
    console.error("[/api/startup-profile] GET error:", error);
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
    const updated = updateProfile(body);
    return NextResponse.json({ data: updated, error: null }, { status: 201 });
  } catch (error) {
    console.error("[/api/startup-profile] POST error:", error);

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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const allowedFields = new Set([
      "vision_mission",
      "core_values",
      "problem",
      "solution",
      "target_audience",
      "persona",
      "business_model",
      "value_prop",
      "swot",
      "competitors",
      "market_size",
      "pricing",
      "gtm",
      "launch_plan",
      "growth_strategy",
      "risk_analysis",
      "okrs",
      "kpis",
      "brand_kit",
    ]);

    const updates: Record<string, any> = {};
    for (const [key, value] of Object.entries(body)) {
      if (allowedFields.has(key)) {
        updates[key] = value;
      }
    }

    const updated = updateProfile(updates);

    return NextResponse.json({ data: updated, error: null });
  } catch (error) {
    console.error("[/api/startup-profile] PUT error:", error);

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
