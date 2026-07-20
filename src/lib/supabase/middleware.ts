import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Gracefully handle missing or placeholder Supabase credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl.includes("placeholder") ||
    supabaseKey.includes("placeholder")
  ) {
    // Demo mode — allow all requests through
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // IMPORTANT: Do NOT use getSession() here. getUser() sends a request
    // to the Supabase Auth server to validate the JWT, which is more secure.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Redirect unauthenticated users to login for protected routes
    const isProtectedRoute =
      !request.nextUrl.pathname.startsWith("/login") &&
      !request.nextUrl.pathname.startsWith("/signup") &&
      !request.nextUrl.pathname.startsWith("/auth") &&
      !request.nextUrl.pathname.startsWith("/api/auth") &&
      !request.nextUrl.pathname.startsWith("/pricing") &&
      !request.nextUrl.pathname.startsWith("/resources") &&
      !request.nextUrl.pathname.startsWith("/how-to") &&
      !request.nextUrl.pathname.startsWith("/onboarding") &&
      !request.nextUrl.pathname.startsWith("/canvas") &&
      request.nextUrl.pathname !== "/";

    if (!user && isProtectedRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } catch {
    // If Supabase is unreachable, allow the request through (demo mode)
    return supabaseResponse;
  }

  return supabaseResponse;
}
