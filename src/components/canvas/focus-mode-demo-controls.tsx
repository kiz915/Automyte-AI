"use client";

/* ============================================================
   Automyte Focus Mode Demo Controls
   Interactive toolbar for testing & demonstrating all agent states:
   Working, Awaiting Approval, Error, and Idle.
   ============================================================ */

import React from "react";
import { DepartmentId, AgentStatus, DEPARTMENT_CONFIGS } from "@/types/focus-mode";
import { Play, AlertTriangle, XCircle, Clock, Sparkles } from "lucide-react";

export interface FocusModeDemoControlsProps {
  selectedDept: DepartmentId;
  selectedStatus: AgentStatus;
  onSelectDept: (dept: DepartmentId) => void;
  onSelectStatus: (status: AgentStatus) => void;
  onSimulateNextStep?: () => void;
  onSimulateComplete?: () => void;
}

export function FocusModeDemoControls({
  selectedDept,
  selectedStatus,
  onSelectDept,
  onSelectStatus,
  onSimulateNextStep,
  onSimulateComplete,
}: FocusModeDemoControlsProps) {
  const departments: DepartmentId[] = [
    "engineering",
    "marketing",
    "finance",
    "design",
    "sales",
  ];

  const statuses: { id: AgentStatus; label: string; icon: React.ReactNode; color: string }[] = [
    { id: "working", label: "Working", icon: <Play className="w-3 h-3" />, color: "#22C55E" },
    { id: "awaiting_approval", label: "Needs Approval", icon: <AlertTriangle className="w-3 h-3" />, color: "#F59E0B" },
    { id: "error", label: "Error", icon: <XCircle className="w-3 h-3" />, color: "#EF4444" },
    { id: "idle", label: "Idle", icon: <Clock className="w-3 h-3" />, color: "#94A3B8" },
  ];

  return (
    <div className="bg-[#1A1A24]/90 border border-white/10 backdrop-blur-md p-3 rounded-2xl shadow-xl flex flex-col gap-3 text-xs text-white select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 font-bold text-[11px] text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Focus Mode Interactive Tester</span>
        </div>
        <span className="text-[10px] text-slate-400">Select Department & State</span>
      </div>

      {/* Department Picker Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <span className="text-[10px] text-slate-400 font-semibold uppercase mr-1">Dept:</span>
        {departments.map((dept) => {
          const cfg = DEPARTMENT_CONFIGS[dept];
          const isSelected = selectedDept === dept;
          return (
            <button
              key={dept}
              onClick={() => onSelectDept(dept)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer border-0 ${
                isSelected
                  ? "text-white font-bold shadow-md"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
              style={{
                backgroundColor: isSelected ? cfg.accentColor : undefined,
              }}
            >
              <span>{cfg.icon}</span>
              <span className="capitalize">{dept}</span>
            </button>
          );
        })}
      </div>

      {/* State Switcher Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        <span className="text-[10px] text-slate-400 font-semibold uppercase mr-1">State:</span>
        {statuses.map((st) => {
          const isSelected = selectedStatus === st.id;
          return (
            <button
              key={st.id}
              onClick={() => onSelectStatus(st.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1.5 transition-all border cursor-pointer ${
                isSelected
                  ? "bg-white/15 text-white border-white/30 font-bold shadow-md"
                  : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10"
              }`}
            >
              <span style={{ color: st.color }}>{st.icon}</span>
              <span>{st.label}</span>
            </button>
          );
        })}

        {/* Action simulator triggers */}
        {selectedStatus === "working" && (
          <div className="flex items-center gap-1 ml-auto shrink-0">
            {onSimulateNextStep && (
              <button
                onClick={onSimulateNextStep}
                className="px-2 py-1 rounded-md text-[10px] font-bold bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30 cursor-pointer"
                title="Advance Step"
              >
                + Step
              </button>
            )}
            {onSimulateComplete && (
              <button
                onClick={onSimulateComplete}
                className="px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 cursor-pointer"
                title="Complete Task"
              >
                Finish Task
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
