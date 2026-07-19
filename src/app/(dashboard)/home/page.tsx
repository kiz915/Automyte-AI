"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { ApprovalRequest } from "@/types/database";

/* ============================================================
   Home / Canvas — Agent Orchestration Diagram
   Matches cofounder.co's central orchestrator view
   Wired to /api/approvals for the Attention Queue
   ============================================================ */

const departments = [
  { id: "engineering", label: "Engineering", angle: 0, status: "active", tasks: 3, description: "CI/CD pipeline configured. Ready for staging deploy." },
  { id: "sales", label: "Sales", angle: 45, status: "idle", tasks: 1, description: "ICP definition in progress. Waiting for competitor data." },
  { id: "marketing", label: "Marketing", angle: 90, status: "active", tasks: 4, description: "Landing page copy v2 ready for review." },
  { id: "design", label: "Design", angle: 135, status: "busy", tasks: 2, description: "Brand guidelines document in progress." },
  { id: "finance", label: "Finance", angle: 180, status: "idle", tasks: 0, description: "No active tasks. Ready for financial planning." },
  { id: "operations", label: "Operations", angle: 225, status: "idle", tasks: 0, description: "Operational workflows not yet configured." },
  { id: "legal", label: "Legal", angle: 270, status: "idle", tasks: 0, description: "Legal review pending. Terms of service needed." },
  { id: "support", label: "Support", angle: 315, status: "idle", tasks: 0, description: "Customer support channels not yet set up." },
];

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-[#22C55E] shadow-[0_0_6px_rgba(34,197,94,0.4)]",
    busy: "bg-[#F59E0B] shadow-[0_0_6px_rgba(245,158,11,0.4)] animate-pulse",
    idle: "bg-[rgba(32,32,32,0.2)]",
  };
  return <span className={`inline-block w-[6px] h-[6px] rounded-full ${colors[status] || colors.idle}`} />;
}

export default function HomePage() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [zoomLevel] = useState(100);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
  const [isLoadingApprovals, setIsLoadingApprovals] = useState(true);

  const cx = 260;
  const cy = 260;
  const radius = 190;

  useEffect(() => {
    fetch("/api/approvals?status=pending")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          setApprovals(json.data);
        }
      })
      .catch((err) => console.error("Failed to fetch approvals:", err))
      .finally(() => setIsLoadingApprovals(false));
  }, []);

  const handleAction = async (id: string, action: "approved" | "rejected") => {
    // Optimistic UI update
    setApprovals((prev) => prev.filter((a) => a.id !== id));

    try {
      const res = await fetch(`/api/approvals?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });
      if (!res.ok) {
        throw new Error("Action failed");
      }
    } catch (error) {
      console.error(`Failed to ${action} approval:`, error);
      // In a real app, we would revert the optimistic update or show a toast here.
    }
  };

  return (
    <div className="h-[calc(100vh-52px)] flex">
      {/* Canvas area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Zoom indicator */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
          <span className="mono text-[10px] text-ink-muted">Z</span>
          <span className="text-[10px] font-medium text-ink-faint">{zoomLevel}%</span>
        </div>

        {/* Orchestration canvas */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-[560px] aspect-square">
            <svg viewBox="0 0 520 520" className="w-full h-full" fill="none">
              {/* Outer orbit circle */}
              <circle cx={cx} cy={cy} r={radius} stroke="rgba(0,0,0,0.08)" strokeWidth="1" />

              {/* Dashed connector lines + nodes */}
              {departments.map((dept) => {
                const rad = (dept.angle * Math.PI) / 180;
                const outerX = cx + radius * Math.cos(rad - Math.PI / 2);
                const outerY = cy + radius * Math.sin(rad - Math.PI / 2);
                const innerX = cx + 55 * Math.cos(rad - Math.PI / 2);
                const innerY = cy + 55 * Math.sin(rad - Math.PI / 2);
                const isHovered = hoveredDept === dept.id;
                const labelRadius = radius + 36;
                const lx = cx + labelRadius * Math.cos(rad - Math.PI / 2);
                const ly = cy + labelRadius * Math.sin(rad - Math.PI / 2);

                return (
                  <g key={dept.id}>
                    {/* Dashed line */}
                    <line
                      x1={innerX} y1={innerY}
                      x2={outerX} y2={outerY}
                      stroke={isHovered ? "rgba(32,32,32,0.25)" : "rgba(32,32,32,0.08)"}
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeDasharray="4.5 4.5"
                      className="transition-all duration-200"
                    />
                    {/* Inner dot */}
                    <circle cx={innerX} cy={innerY} r="2.5" fill="#F5F5F2" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
                    {/* Outer node (clickable) */}
                    <a href={`/dept/${dept.id}`}>
                      <circle
                        cx={outerX} cy={outerY}
                        r={isHovered ? "18" : "14"}
                        fill={isHovered ? "#FBFBF8" : "#F5F5F2"}
                        stroke={isHovered ? "rgba(32,32,32,0.2)" : "rgba(0,0,0,0.08)"}
                        strokeWidth={isHovered ? "1.5" : "1"}
                        className="transition-all duration-200 cursor-pointer"
                        onMouseEnter={() => setHoveredDept(dept.id)}
                        onMouseLeave={() => setHoveredDept(null)}
                      />
                    </a>
                    {/* Status dot on node */}
                    <circle
                      cx={outerX + 9} cy={outerY - 9}
                      r="3"
                      fill={dept.status === "active" ? "#22C55E" : dept.status === "busy" ? "#F59E0B" : "rgba(32,32,32,0.15)"}
                      stroke="#F5F5F2"
                      strokeWidth="1.5"
                    />
                    {/* Department label */}
                    <text
                      x={lx} y={ly}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="11"
                      fontWeight={isHovered ? "600" : "480"}
                      fill={isHovered ? "rgba(32,32,32,0.8)" : "rgba(32,32,32,0.45)"}
                      className="transition-all duration-200 pointer-events-none select-none"
                    >
                      {dept.label}
                    </text>
                    {/* Task count badge */}
                    {dept.tasks > 0 && (
                      <g>
                        <rect
                          x={lx - 8} y={ly + 8}
                          width="16" height="14"
                          rx="3"
                          fill="rgba(32,32,32,0.06)"
                          className="pointer-events-none"
                        />
                        <text
                          x={lx} y={ly + 16}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="8"
                          fontWeight="500"
                          fill="rgba(32,32,32,0.5)"
                          className="pointer-events-none select-none"
                        >
                          {dept.tasks}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Center orchestrator */}
              <circle cx={cx} cy={cy} r="52" fill="#FFFFFF" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
              <circle cx={cx} cy={cy} r="42" fill="#FBFBF8" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
              <text x={cx} y={cy - 6} textAnchor="middle" fontSize="10" fontWeight="600" fill="rgba(32,32,32,0.75)" letterSpacing="0.08em">AUTOMYTE</text>
              <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7.5" fontWeight="420" fill="rgba(32,32,32,0.35)" letterSpacing="0.04em">ORCHESTRATOR</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Right panel — attention queue */}
      <div className="w-[340px] border-l border-border-subtle bg-surface-card overflow-y-auto hidden lg:flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-border-subtle">
          <h2 className="text-[14px] font-[560] text-ink">Attention Queue</h2>
          <p className="text-[12px] text-ink-muted mt-0.5">Items that need your review</p>
        </div>

        {/* Attention items */}
        <div className="flex-1 px-3 py-2 space-y-1.5">
          {isLoadingApprovals ? (
            <div className="p-4 text-center text-[12px] text-ink-faint">Loading queue...</div>
          ) : approvals.length === 0 ? (
            <div className="p-4 text-center text-[12px] text-ink-faint">
              All caught up! No pending approvals.
            </div>
          ) : (
            approvals.map((approval) => {
              const executive = (approval.payload?.executive as string) || "System";
              const riskLevel = (approval.payload?.risk_level as string) || "low";
              
              const isHighRisk = riskLevel === "high";
              const isMediumRisk = riskLevel === "medium";
              
              return (
                <div key={approval.id} className="surface-card rounded-[10px] p-3.5 border-border-subtle">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusDot status={isHighRisk ? "busy" : isMediumRisk ? "active" : "idle"} />
                    <span className="text-[11px] font-[520] text-ink-faint uppercase tracking-wider">
                      {isHighRisk ? "Critical Approval" : "Approval"}
                    </span>
                  </div>
                  <p className="text-[13px] font-[500] text-ink mb-1">{approval.requested_action}</p>
                  <p className="text-[12px] text-ink-faint leading-relaxed mb-3">
                    {executive} agent requests approval to proceed with this action.
                  </p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleAction(approval.id, "approved")}
                      className="flex-1 h-[30px] rounded-[6px] text-[12px] font-[500] cursor-pointer bg-ink text-ink-inverted hover:bg-[#333] transition-colors border-0"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleAction(approval.id, "rejected")}
                      className="flex-1 h-[30px] rounded-[6px] text-[12px] font-[500] cursor-pointer border border-border text-ink-secondary hover:bg-surface transition-colors bg-transparent"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom stats */}
        <div className="px-4 py-3 border-t border-border-subtle">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="mono text-[10px] text-ink-muted uppercase">Tasks</p>
              <p className="text-[16px] font-[600] text-ink">10</p>
            </div>
            <div>
              <p className="mono text-[10px] text-ink-muted uppercase">Pending</p>
              <p className="text-[16px] font-[600] text-[#F59E0B]">{approvals.length}</p>
            </div>
            <div>
              <p className="mono text-[10px] text-ink-muted uppercase">Done</p>
              <p className="text-[16px] font-[600] text-[#22C55E]">7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
