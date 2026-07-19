"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  CheckSquare, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Terminal,
  Code,
  LineChart,
  Target,
  Palette,
  Briefcase,
  Scale,
  MessageSquare
} from "lucide-react";

const coreLinks = [
  { label: "Home Canvas", href: "/home", icon: <Home className="w-4 h-4" /> },
  { label: "Tasks Board", href: "/projects", icon: <CheckSquare className="w-4 h-4" /> },
  { label: "Documents", href: "/documents", icon: <FileText className="w-4 h-4" /> },
];

const departments = [
  { label: "Engineering", href: "/dept/engineering", icon: <Code className="w-4 h-4" /> },
  { label: "Sales", href: "/dept/sales", icon: <LineChart className="w-4 h-4" /> },
  { label: "Marketing", href: "/dept/marketing", icon: <Target className="w-4 h-4" /> },
  { label: "Design", href: "/dept/design", icon: <Palette className="w-4 h-4" /> },
  { label: "Finance", href: "/dept/finance", icon: <Briefcase className="w-4 h-4" /> },
  { label: "Operations", href: "/dept/operations", icon: <Terminal className="w-4 h-4" /> },
  { label: "Legal", href: "/dept/legal", icon: <Scale className="w-4 h-4" /> },
  { label: "Support", href: "/dept/support", icon: <MessageSquare className="w-4 h-4" /> },
];

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const [showWorkspaceSwitcher, setShowWorkspaceSwitcher] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-surface-card border-r border-border transition-all duration-300",
        collapsed ? "w-[56px]" : "w-[260px]"
      )}
    >
      {/* Workspace switcher */}
      <div className="px-3 pt-4 pb-2">
        <button
          onClick={() => setShowWorkspaceSwitcher(!showWorkspaceSwitcher)}
          className={cn(
            "flex items-center gap-2 w-full rounded-[8px] px-2 py-[6px] hover:bg-[rgba(32,32,32,0.03)] transition-all cursor-pointer border-0 bg-transparent text-left",
            collapsed && "justify-center"
          )}
        >
          <div className="w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-white">A</span>
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 text-left min-w-0">
                <p className="text-[12px] font-semibold text-ink truncate">My Startup Inc.</p>
                <p className="text-[10px] text-ink-muted truncate">Free trial · 6 days left</p>
              </div>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="shrink-0">
                <path d="M1 1L4 4L7 1" stroke="rgba(32,32,32,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="mx-3 border-t border-border-subtle" />

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {/* Core Sections */}
        <div className="space-y-1">
          {!collapsed && (
            <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider px-2.5 block mb-1">
              Workspace
            </span>
          )}
          {coreLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-[6px] px-2.5 py-[7px] text-[13px] font-medium no-underline transition-all duration-150",
                  isActive
                    ? "bg-ink/5 text-ink font-semibold"
                    : "text-ink-secondary hover:bg-[rgba(32,32,32,0.02)] hover:text-ink",
                  collapsed && "justify-center px-0"
                )}
                title={collapsed ? item.label : undefined}
              >
                <span className={cn("shrink-0", isActive ? "text-ink" : "text-ink-muted")}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* AI Executives (Departments) */}
        <div className="space-y-1">
          {!collapsed && (
            <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider px-2.5 block mb-1">
              AI Executives
            </span>
          )}
          {departments.map((dept) => {
            const isActive = pathname === dept.href;
            return (
              <Link
                key={dept.href}
                href={dept.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-[6px] px-2.5 py-[7px] text-[13px] font-medium no-underline transition-all duration-150",
                  isActive
                    ? "bg-ink/5 text-ink font-semibold"
                    : "text-ink-secondary hover:bg-[rgba(32,32,32,0.02)] hover:text-ink",
                  collapsed && "justify-center px-0"
                )}
                title={collapsed ? dept.label : undefined}
              >
                <span className={cn("shrink-0", isActive ? "text-ink" : "text-ink-muted")}>
                  {dept.icon}
                </span>
                {!collapsed && <span>{dept.label}</span>}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-2 pb-3 space-y-1">
        <div className="mx-1 border-t border-border-subtle mb-2" />

        {/* Settings */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2.5 rounded-[6px] px-2.5 py-[7px] text-[13px] font-medium text-ink-secondary hover:text-ink hover:bg-[rgba(32,32,32,0.02)] transition-all no-underline",
            collapsed && "justify-center px-0"
          )}
        >
          <Settings className="w-4 h-4 text-ink-muted" />
          {!collapsed && <span>Settings</span>}
        </Link>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-2.5 rounded-[6px] px-2.5 py-[7px] text-[13px] font-medium text-ink-muted hover:text-ink hover:bg-[rgba(32,32,32,0.02)] transition-all w-full cursor-pointer border-0 bg-transparent text-left",
            collapsed && "justify-center px-0"
          )}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </aside>
  );
}
