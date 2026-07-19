"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  Search,
  Bell,
  Command,
  Menu,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AppHeaderProps {
  onMenuClick?: () => void;
}

// ---------------------------------------------------------------------------
// Route → Page title mapping
// ---------------------------------------------------------------------------

const routeTitles: Record<string, string> = {
  "/": "Home",
  "/ai-workspace": "AI Workspace",
  "/startup": "Startup",
  "/documents": "Documents",
  "/executive-team": "Executive Team",
  "/knowledge": "Knowledge",
  "/projects": "Projects",
  "/automations": "Automations",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  // Exact match first
  if (routeTitles[pathname]) return routeTitles[pathname];
  // Prefix match for nested routes
  const match = Object.entries(routeTitles).find(
    ([route]) => route !== "/" && pathname.startsWith(route)
  );
  return match ? match[1] : "Dashboard";
}

// ---------------------------------------------------------------------------
// Header component
// ---------------------------------------------------------------------------

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const [notificationCount] = useState(3);

  // Cmd+K listener (just a placeholder – full search modal lives elsewhere)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // TODO: open global search modal
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between gap-4 px-6",
        "glass border-b border-white/[0.06] backdrop-blur-xl"
      )}
    >
      {/* ---- Left: Mobile menu + Page title ---- */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors lg:hidden focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <motion.h1
          key={pageTitle}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="heading-md text-white"
        >
          {pageTitle}
        </motion.h1>
      </div>

      {/* ---- Center: Search trigger ---- */}
      <button
        className={cn(
          "hidden md:flex items-center gap-2.5 rounded-xl px-4 py-2 max-w-md w-full",
          "bg-white/[0.04] border border-white/[0.06] text-slate-500",
          "hover:bg-white/[0.06] hover:border-white/[0.1] hover:text-slate-400",
          "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
        )}
        onClick={() => {
          /* TODO: open command palette */
        }}
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="text-sm flex-1 text-left">Search anything…</span>
        <kbd
          className={cn(
            "ml-auto inline-flex h-5 items-center gap-0.5 rounded-md px-1.5",
            "bg-white/[0.06] border border-white/[0.06] text-[11px] font-medium text-slate-500"
          )}
        >
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      {/* ---- Right: Notifications + Avatar ---- */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button
          className={cn(
            "relative flex h-9 w-9 items-center justify-center rounded-xl",
            "text-slate-400 hover:text-white hover:bg-white/[0.06]",
            "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
          )}
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          {notificationCount > 0 && (
            <span
              className={cn(
                "absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1",
                "bg-gradient-to-r from-violet-500 to-indigo-500 text-[10px] font-bold text-white",
                "ring-2 ring-[#0a0a0f]"
              )}
            >
              {notificationCount}
            </span>
          )}
        </button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex items-center gap-2 rounded-xl px-2 py-1.5",
              "hover:bg-white/[0.05] transition-all duration-200 focus:outline-none"
            )}
          >
            <Avatar size="sm" className="ring-1 ring-white/10">
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-[10px] text-white">
                KV
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-sm font-medium text-slate-300">
              Kishore
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            sideOffset={8}
            className="w-56 bg-slate-900/95 backdrop-blur-xl border-white/[0.08] shadow-2xl"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-white">
                  Kishore V
                </span>
                <span className="text-xs text-slate-500">
                  kishore@automyte.ai
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/[0.06]" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2.5 text-slate-300 focus:text-white focus:bg-white/[0.06]">
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5 text-slate-300 focus:text-white focus:bg-white/[0.06]">
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/[0.06]" />
            <DropdownMenuItem className="gap-2.5 text-rose-400 focus:text-rose-300 focus:bg-rose-500/10">
              <LogOut className="h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
