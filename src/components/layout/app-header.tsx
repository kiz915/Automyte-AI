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
  onOpenTechTree?: () => void;
  selectedDeptName?: string | null;
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

export function AppHeader({ onMenuClick, onOpenTechTree, selectedDeptName }: AppHeaderProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center justify-between gap-4 px-5",
        "bg-[#141417]/90 border-b border-white/[0.08] backdrop-blur-md text-white select-none"
      )}
    >
      {/* ---- Left: Mobile Hamburger + Workspace Switcher + Breadcrumb ---- */}
      <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors lg:hidden focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Workspace Chip */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-colors focus:outline-none">
            <span className="flex items-center justify-center w-5 h-5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              AA
            </span>
            <span className="font-semibold text-slate-200">Automyte</span>
            <span className="text-[10px] text-slate-400">▾</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="bg-[#1C1C21] border-white/10 text-white w-48 shadow-xl">
            <DropdownMenuLabel className="text-xs text-slate-400 font-normal">Workspaces</DropdownMenuLabel>
            <DropdownMenuItem className="focus:bg-white/10 gap-2 cursor-pointer font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Automyte AI (Active)
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="focus:bg-white/10 text-xs text-amber-400 cursor-pointer">
              + Create new workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Breadcrumb separator */}
        {selectedDeptName && (
          <>
            <span className="text-slate-500 font-light">&gt;</span>
            <span className="text-slate-200 font-medium">{selectedDeptName}</span>
          </>
        )}
      </div>

      {/* ---- Right: Upgrade Button, Theme Toggle, Map, Search, Profile ---- */}
      <div className="flex items-center gap-2">
        {/* Upgrade Button */}
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all shadow-sm"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.open("/pricing", "_self");
            }
          }}
        >
          <span>🌻</span>
          <span>Upgrade</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Roadmap / Tech Tree Button */}
        <button
          onClick={onOpenTechTree}
          title="How to Build a Company (Tech Tree)"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          📖
        </button>

        {/* Search */}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
          title="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 ml-1 rounded-full focus:outline-none">
            <Avatar size="sm" className="h-7 w-7 ring-1 ring-white/20">
              <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-700 text-[10px] font-bold text-white">
                AV
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            sideOffset={8}
            className="w-56 bg-[#1A1A1F] border-white/10 text-white shadow-2xl"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-white">Automyte Founder</span>
                <span className="text-xs text-slate-400">founder@automyte.ai</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 text-slate-300 focus:text-white focus:bg-white/10 cursor-pointer">
                <User className="h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-slate-300 focus:text-white focus:bg-white/10 cursor-pointer">
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="gap-2 text-rose-400 focus:text-rose-300 focus:bg-rose-500/10 cursor-pointer">
              <LogOut className="h-4 w-4" /> Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
