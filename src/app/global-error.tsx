"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body className="bg-slate-900 text-white flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 p-8 rounded-3xl text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            An unhandled error occurred. The details have been reported to Sentry monitoring.
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
