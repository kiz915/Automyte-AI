import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Middleware that:
 * 1. Allows public routes without any auth check
 * 2. Only runs Supabase session refresh on protected routes
 * 3. Gracefully skips if Supabase env vars are missing (dev/demo mode)
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes — no auth required
  const publicPaths = [
    "/",
    "/login",
    "/signup",
    "/pricing",
    "/resources",
    "/how-to",
    "/privacy",
    "/terms",
    "/auth/callback",
  ];

  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // If Supabase env vars are missing, allow all routes (demo mode)
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.next();
  }

  // Protected routes — refresh session
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
