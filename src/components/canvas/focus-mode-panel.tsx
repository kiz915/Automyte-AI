"use client";

/* ============================================================
   AUTOMYTE AI — Agent Focus Mode Panel Component
   Original single-agent real-time focus interaction model.
   ============================================================ */

import React, { useState, useEffect } from "react";
import {
  FocusAgent,
  FocusTask,
  AgentStatus,
  formatElapsedTime,
  DEPARTMENT_CONFIGS,
  DepartmentId
} from "@/types/focus-mode";
import {
  Check,
  ChevronDown,
  ChevronUp,
  X,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Maximize2,
  Minimize2,
  FileCode,
  Terminal,
  AlertTriangle,
  Play,
  Pause,
  Clock,
  Layers,
  ArrowRight
} from "lucide-react";

export interface FocusModePanelProps {
  agent: FocusAgent;
  task: FocusTask;
  allAgents?: FocusAgent[];
  onClose?: () => void;
  onSwitchAgent?: (agentId: string) => void;
  onApprove?: (taskId: string) => void;
  onReject?: (taskId: string) => void;
  onRetry?: (taskId: string) => void;
  onTogglePause?: (taskId: string) => void;
  className?: string;
}

export function FocusModePanel({
  agent,
  task,
  allAgents = [],
  onClose,
  onSwitchAgent,
  onApprove,
  onReject,
  onRetry,
  onTogglePause,
  className = "",
}: FocusModePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAgentMenuOpen, setIsAgentMenuOpen] = useState(false);
  const [elapsed, setElapsed] = useState(task.elapsedSeconds);
  const [activeTab, setActiveTab] = useState<"overview" | "logs" | "files">("overview");

  // Timer ticker for working state
  useEffect(() => {
    setElapsed(task.elapsedSeconds);
    if (task.status !== "working") return;

    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [task.status, task.elapsedSeconds, task.id]);

  const deptConfig = DEPARTMENT_CONFIGS[agent.departmentId] || DEPARTMENT_CONFIGS.engineering;
  const accentColor = agent.accentColor || deptConfig.accentColor;

  // Status Dot CSS class
  const getStatusDotClass = (status: AgentStatus) => {
    switch (status) {
      case "working":
        return "focus-dot-active";
      case "awaiting_approval":
        return "focus-dot-approval";
      case "error":
        return "focus-dot-error";
      case "idle":
      default:
        return "focus-dot-idle";
    }
  };

  // Status Label Text
  const getStatusLabel = (status: AgentStatus) => {
    switch (status) {
      case "working":
        return "ACTIVE";
      case "awaiting_approval":
        return "NEEDS INPUT";
      case "error":
        return "ERROR";
      case "idle":
      default:
        return "IDLE";
    }
  };

  return (
    <div
      className={`w-full max-w-[440px] bg-[#16161C] border border-white/10 rounded-2xl shadow-2xl flex flex-col text-white font-sans overflow-hidden transition-all duration-300 ${className}`}
      style={{
        boxShadow: `0 12px 32px -8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)`,
      }}
    >
      {/* ------------------------------------------------------------
          1. HEADER ROW
          Avatar (initials in colored circle), Agent Name, Dept Label, Live Status Dot
         ------------------------------------------------------------ */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-white/[0.08] bg-[#1A1A22]/80 backdrop-blur-sm select-none">
        <div className="flex items-center gap-3 min-w-0">
          {/* Agent Avatar Circle */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-transform duration-200 hover:scale-105"
            style={{
              backgroundColor: task.status === "idle" ? "rgba(255,255,255,0.08)" : deptConfig.bgSubtle,
              border: `1.5px solid ${task.status === "idle" ? "rgba(255,255,255,0.15)" : accentColor}`,
              color: task.status === "idle" ? "rgba(255,255,255,0.4)" : accentColor,
            }}
          >
            {agent.initials}
          </div>

          {/* Agent Name & Dept Label */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white truncate">{agent.name}</span>

              {/* Live Status Dot */}
              <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                <span className={`w-2 h-2 rounded-full ${getStatusDotClass(task.status)}`} />
                <span className="text-[9px] font-bold tracking-wider text-slate-300">
                  {getStatusLabel(task.status)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 tracking-wider">
              <span>{deptConfig.icon}</span>
              <span>{agent.departmentLabel || deptConfig.label}</span>
            </div>
          </div>
        </div>

        {/* Action controls in header (Agent Switcher & Close) */}
        <div className="flex items-center gap-1 shrink-0">
          {allAgents.length > 1 && (
            <div className="relative">
              <button
                onClick={() => setIsAgentMenuOpen(!isAgentMenuOpen)}
                className="px-2 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 flex items-center gap-1 transition-colors border border-white/10"
                title="Switch Focused Agent"
              >
                <Layers className="w-3.5 h-3.5" />
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {/* Agent Selector Dropdown */}
              {isAgentMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-[#1F1F2A] border border-white/15 rounded-xl shadow-2xl z-50 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                    Switch Focused Agent
                  </div>
                  {allAgents.map((a) => {
                    const isSelected = a.id === agent.id;
                    const aConfig = DEPARTMENT_CONFIGS[a.departmentId] || DEPARTMENT_CONFIGS.engineering;
                    return (
                      <button
                        key={a.id}
                        onClick={() => {
                          setIsAgentMenuOpen(false);
                          if (onSwitchAgent) onSwitchAgent(a.id);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${
                          isSelected ? "bg-white/10 font-bold text-white" : "text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                            style={{
                              backgroundColor: aConfig.bgSubtle,
                              color: aConfig.accentColor,
                              border: `1px solid ${aConfig.accentColor}`,
                            }}
                          >
                            {a.initials}
                          </span>
                          <span>{a.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{aConfig.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close Focus Panel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------
          2. BODY CONTENT (State Driven)
         ------------------------------------------------------------ */}
      <div className="p-5 space-y-4">
        {/* =========================================================
            STATE: IDLE
           ========================================================= */}
        {task.status === "idle" ? (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-2 select-none">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center opacity-40 mb-1"
              style={{ backgroundColor: deptConfig.bgSubtle, color: accentColor }}
            >
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-300">Waiting for next task</p>
            <p className="text-xs text-slate-500 max-w-[260px]">
              {agent.name} is ready. Assign a new goal or workflow step to start execution.
            </p>
          </div>
        ) : (
          /* =========================================================
             STATES: WORKING, AWAITING APPROVAL, ERROR
             ========================================================= */
          <>
            {/* ------------------------------------------------------
                Settling Finished View or Standard Task Title
               ------------------------------------------------------ */}
            {task.isSettled ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 flex items-center gap-2.5 animate-in fade-in duration-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-emerald-200">
                  Completed: {task.title}
                </span>
              </div>
            ) : (
              <div>
                {/* Task Title (15px medium weight) */}
                <h3 className="text-[15px] font-medium text-white leading-snug tracking-tight">
                  {task.title}
                </h3>

                {/* 3. Elapsed Time (small and muted) */}
                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{formatElapsedTime(elapsed)}</span>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------
                4. THIN PROGRESS BAR (4px, rounded, eased animation)
               ------------------------------------------------------ */}
            {!task.isSettled && (
              <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                <div
                  className="focus-progress-bar-fill h-full rounded-full"
                  style={{
                    width: `${Math.max(5, Math.min(100, task.progressPercent))}%`,
                    backgroundColor:
                      task.status === "error"
                        ? "#EF4444"
                        : task.status === "awaiting_approval"
                        ? "#F59E0B"
                        : accentColor,
                  }}
                />
              </div>
            )}

            {/* ------------------------------------------------------
                SPECIAL STATE: AWAITING APPROVAL CALLOUT
               ------------------------------------------------------ */}
            {task.status === "awaiting_approval" && task.approvalCallout && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-amber-300">
                      {task.approvalCallout.actionRequired}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {task.approvalCallout.details}
                    </p>
                    {task.approvalCallout.proposedChange && (
                      <div className="mt-2 p-2 rounded-lg bg-black/40 border border-amber-500/20 text-[11px] font-mono text-amber-200/90 overflow-x-auto">
                        {task.approvalCallout.proposedChange}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2.5 pt-1">
                  <button
                    onClick={() => onApprove && onApprove(task.id)}
                    className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-slate-950 transition-all shadow-md hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer border-0"
                    style={{ backgroundColor: "#F59E0B" }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve
                  </button>
                  <button
                    onClick={() => onReject && onReject(task.id)}
                    className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5 text-slate-400" />
                    Reject
                  </button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------
                SPECIAL STATE: ERROR CALLOUT
               ------------------------------------------------------ */}
            {task.status === "error" && task.errorInfo && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-red-300">Execution Error</h4>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {task.errorInfo.plainLanguageReason}
                    </p>
                    <p className="text-[11px] text-red-300/80 italic">
                      💡 {task.errorInfo.suggestedFix}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onRetry && onRetry(task.id)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-red-600/80 hover:bg-red-500 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer border-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retry Task
                </button>
              </div>
            )}

            {/* ------------------------------------------------------
                5. SHORT STEP LIST (3-5 steps max with eased transitions)
               ------------------------------------------------------ */}
            {!task.isSettled && task.steps && task.steps.length > 0 && (
              <div className="space-y-2 pt-1 select-none">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Current Steps</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {task.steps.filter((s) => s.state === "completed").length}/{task.steps.length}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {task.steps.slice(0, 5).map((step) => {
                    const isCompleted = step.state === "completed";
                    const isActive = step.state === "active";
                    const isPending = step.state === "pending";

                    return (
                      <div
                        key={step.id}
                        className={`focus-step-item flex items-start gap-2.5 p-2 rounded-lg text-xs leading-normal transition-all ${
                          isActive
                            ? "bg-white/[0.06] border border-white/10"
                            : "bg-transparent"
                        }`}
                      >
                        {/* Step Icon */}
                        <div className="mt-0.5 shrink-0">
                          {isCompleted && (
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${accentColor}25`, color: accentColor }}
                            >
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </div>
                          )}

                          {isActive && (
                            <div
                              className="w-4 h-4 rounded-full border-2 border-t-transparent focus-ring-spinner"
                              style={{ borderColor: accentColor, borderTopColor: "transparent" }}
                            />
                          )}

                          {isPending && (
                            <div className="w-4 h-4 flex items-center justify-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 opacity-60" />
                            </div>
                          )}
                        </div>

                        {/* Step Label */}
                        <span
                          className={`flex-1 ${
                            isCompleted
                              ? "text-slate-400 line-through opacity-80"
                              : isActive
                              ? "font-semibold text-white"
                              : "text-slate-500 font-normal opacity-70"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------
                6. SINGLE ACTION: "Step into this task" (Expand Mode)
               ------------------------------------------------------ */}
            <div className="pt-2 border-t border-white/[0.08]">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  {isExpanded ? "Collapse task detail" : "Step into this task"}
                </span>
                <div className="flex items-center gap-1">
                  {task.touchedFiles?.length > 0 && !isExpanded && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                      {task.touchedFiles.length} files
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* ----------------------------------------------------
                  EXPANDED DETAIL SECTION (Logs, Diffs, Touched Files)
                 ---------------------------------------------------- */}
              {isExpanded && (
                <div className="mt-3 p-3.5 rounded-xl bg-[#111116] border border-white/10 space-y-3 text-xs animate-in slide-in-from-top-2 duration-200">
                  {/* Detail Tabs */}
                  <div className="flex border-b border-white/10 pb-2 gap-2 select-none">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors border-0 cursor-pointer ${
                        activeTab === "overview"
                          ? "bg-white/10 text-white font-bold"
                          : "bg-transparent text-slate-400 hover:text-white"
                      }`}
                    >
                      Summary
                    </button>
                    <button
                      onClick={() => setActiveTab("logs")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 border-0 cursor-pointer ${
                        activeTab === "logs"
                          ? "bg-white/10 text-white font-bold"
                          : "bg-transparent text-slate-400 hover:text-white"
                      }`}
                    >
                      <Terminal className="w-3 h-3" />
                      Logs ({task.logs?.length || 0})
                    </button>
                    <button
                      onClick={() => setActiveTab("files")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 border-0 cursor-pointer ${
                        activeTab === "files"
                          ? "bg-white/10 text-white font-bold"
                          : "bg-transparent text-slate-400 hover:text-white"
                      }`}
                    >
                      <FileCode className="w-3 h-3" />
                      Files ({task.touchedFiles?.length || 0})
                    </button>
                  </div>

                  {/* OVERVIEW TAB */}
                  {activeTab === "overview" && (
                    <div className="space-y-3">
                      {task.diffSnippet ? (
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Recent Diff Output
                          </div>
                          <pre className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-300 leading-relaxed overflow-x-auto max-h-36 whitespace-pre">
                            {task.diffSnippet}
                          </pre>
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400">
                          Agent {agent.name} is working directly inside workspace. All generated output files and logs update in real time.
                        </p>
                      )}

                      {/* Touched files summary list */}
                      {task.touchedFiles?.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Touched Files
                          </div>
                          {task.touchedFiles.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-1.5 rounded bg-white/[0.04] text-[11px] font-mono text-slate-300"
                            >
                              <span className="truncate pr-2">{file.path}</span>
                              <div className="flex items-center gap-1 shrink-0 text-[10px]">
                                {file.additions > 0 && (
                                  <span className="text-emerald-400">+{file.additions}</span>
                                )}
                                {file.deletions > 0 && (
                                  <span className="text-red-400">-{file.deletions}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* LOGS TAB */}
                  {activeTab === "logs" && (
                    <div className="space-y-1.5 max-h-48 overflow-y-auto font-mono text-[11px] bg-black/50 p-2.5 rounded-lg border border-white/10">
                      {task.logs && task.logs.length > 0 ? (
                        task.logs.map((log) => (
                          <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-slate-500 shrink-0 text-[10px]">
                              [{log.timestamp}]
                            </span>
                            <span
                              className={
                                log.level === "error"
                                  ? "text-red-400 font-bold"
                                  : log.level === "warn"
                                  ? "text-amber-400"
                                  : log.level === "success"
                                  ? "text-emerald-400"
                                  : "text-slate-300"
                              }
                            >
                              {log.text}
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="text-slate-500 text-[11px]">No log entries stream yet.</span>
                      )}
                    </div>
                  )}

                  {/* FILES TAB */}
                  {activeTab === "files" && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {task.touchedFiles && task.touchedFiles.length > 0 ? (
                        task.touchedFiles.map((file, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg bg-white/[0.04] border border-white/10 space-y-1"
                          >
                            <div className="flex items-center justify-between text-xs font-mono font-medium text-slate-200">
                              <span className="truncate">{file.path}</span>
                              <span
                                className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                                  file.status === "created"
                                    ? "bg-emerald-500/20 text-emerald-300"
                                    : file.status === "modified"
                                    ? "bg-blue-500/20 text-blue-300"
                                    : "bg-red-500/20 text-red-300"
                                }`}
                              >
                                {file.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                              <span className="text-emerald-400">+{file.additions} lines</span>
                              <span className="text-red-400">-{file.deletions} lines</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] text-slate-500">No files modified in current task step.</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
