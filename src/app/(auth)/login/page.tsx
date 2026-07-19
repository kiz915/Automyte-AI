"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
    } else {
      router.push("/home");
      router.refresh();
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setError(null);
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (authError) {
      setError(authError.message);
    }
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    router.push("/home");
  };

  return (
    <div className="page-enter">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-md bg-ink flex items-center justify-center">
          <span className="text-surface-raised text-sm font-bold">A</span>
        </div>
        <span className="text-[20px] font-semibold tracking-tight text-ink">Automyte</span>
      </div>

      {/* Card */}
      <div className="surface-card p-8 rounded-[16px]">
        <div className="text-center mb-6">
          <h1 className="text-[22px] font-semibold tracking-tight text-ink mb-1">
            Welcome back
          </h1>
          <p className="text-[14px] text-ink-faint font-[460]">
            Sign in to run your company
          </p>
        </div>

        {/* OAuth buttons */}
        <div className="flex flex-col gap-2.5 mb-6">
          <button
            onClick={() => handleOAuth("google")}
            className="relative flex items-center justify-center gap-2.5 w-full h-[41px] rounded-[8px] border border-border bg-surface-card hover:bg-surface transition-all duration-200 cursor-pointer text-[14px] font-[460] text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button
            onClick={() => handleOAuth("github")}
            className="relative flex items-center justify-center gap-2.5 w-full h-[41px] rounded-[8px] border border-border bg-surface-card hover:bg-surface transition-all duration-200 cursor-pointer text-[14px] font-[460] text-ink"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-[12px]">
            <span className="bg-surface-card px-3 text-ink-muted">or</span>
          </div>
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailLogin} className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-[13px] font-[500] text-ink-secondary mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full h-[41px] px-3 rounded-[8px] border border-border bg-surface-card text-ink text-[14px] placeholder:text-ink-muted focus:outline-none focus:border-ink/30 focus:ring-1 focus:ring-ink/10 transition-all"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-[13px] font-[500] text-ink-secondary">
                Password
              </label>
              <Link href="#" className="text-[12px] text-ink-faint hover:text-ink transition-colors no-underline">
                Forgot?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-[41px] px-3 rounded-[8px] border border-border bg-surface-card text-ink text-[14px] placeholder:text-ink-muted focus:outline-none focus:border-ink/30 focus:ring-1 focus:ring-ink/10 transition-all"
            />
          </div>

          {error && (
            <div className="text-[13px] text-error bg-error/5 border border-error/10 rounded-[8px] px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full h-[41px] rounded-[8px] cursor-pointer text-[15px] font-[460] text-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[8px] cta-btn" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin" />
              ) : (
                "Sign in"
              )}
            </span>
          </button>
        </form>

        {/* Demo mode */}
        <button
          onClick={handleDemoLogin}
          className="w-full mt-3 h-[37px] rounded-[8px] border border-border bg-transparent hover:bg-surface text-[13px] font-[460] text-ink-faint hover:text-ink-secondary transition-all cursor-pointer"
        >
          Try demo mode →
        </button>
      </div>

      <p className="text-center text-[13px] text-ink-faint mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-ink font-[500] hover:underline no-underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
