import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    throw new Error("Sentry Test Error from Automyte AI API");
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({
      status: "error_captured",
      message: "Sentry test exception captured successfully.",
      timestamp: new Date().toISOString(),
    });
  }
}
