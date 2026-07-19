"use client";

import { useState } from "react";
import { AppSidebar } from "./app-sidebar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          collapsed ? "ml-[56px]" : "ml-[260px]"
        )}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between h-[52px] px-4 border-b border-border-subtle bg-surface/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="flex items-center gap-2 h-[33px] px-3 rounded-[6px] border border-border bg-surface-card hover:bg-surface text-[13px] text-ink-muted transition-all cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9.99514 9.99908L7.92873 7.93266M9.04652 5.23752C9.04652 7.34121 7.34115 9.04658 5.23746 9.04658C3.13378 9.04658 1.42841 7.34121 1.42841 5.23752C1.42841 3.13384 3.13378 1.42847 5.23746 1.42847C7.34115 1.42847 9.04652 3.13384 9.04652 5.23752Z" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Search...</span>
              <kbd className="ml-6 text-[10px] text-ink-ghost border border-border-subtle rounded px-1 py-0.5">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="w-8 h-8 rounded-[6px] flex items-center justify-center hover:bg-[rgba(32,32,32,0.04)] transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(32,32,32,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </button>

            {/* User avatar */}
            <button className="w-7 h-7 rounded-full bg-[#D9D9D6] flex items-center justify-center cursor-pointer">
              <span className="text-[9px] font-medium text-ink-faint">U</span>
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="page-enter">
          {children}
        </div>
      </main>
    </div>
  );
}
