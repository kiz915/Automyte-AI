"use client";

/* ============================================================
   AUTOMYTE AI — Orchestration Canvas Dashboard
   ============================================================ */

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AppHeader } from "@/components/layout/app-header";
import type { Task, Document, ApprovalRequest, StartupProfile } from "@/types/database";
import { 
  Home, 
  MessageSquare, 
  Briefcase, 
  CheckSquare, 
  FolderOpen, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  Send,
  Loader2,
  FileText,
  Pin,
  Folder,
  ArrowLeft,
  Download,
  Save,
  Layers,
  Target,
  Eye
} from "lucide-react";

import { FocusModePanel } from "@/components/canvas/focus-mode-panel";
import { FocusModeDemoControls } from "@/components/canvas/focus-mode-demo-controls";
import {
  DepartmentId,
  AgentStatus,
  FocusAgent,
  FocusTask,
  DEFAULT_FOCUS_AGENTS,
  SAMPLE_TASKS_BY_DEPT,
  DEPARTMENT_CONFIGS
} from "@/types/focus-mode";

// Departments meta
const departments = [
  { id: "engineering", label: "Engineering", angle: 0, status: "active", agentName: "Kai", icon: "⚙", desc: "Kai coordinates code & infrastructure" },
  { id: "sales", label: "Sales", angle: 45, status: "idle", agentName: "Ryan", icon: "📈", desc: "Ryan automates outreach & pipelines" },
  { id: "marketing", label: "Marketing", angle: 90, status: "active", agentName: "Aria", icon: "📣", desc: "Aria drives content & growth campaigns" },
  { id: "design", label: "Design", angle: 135, status: "busy", agentName: "Luna", icon: "🎨", desc: "Luna creates beautiful brands & UI" },
  { id: "finance", label: "Finance", angle: 180, status: "idle", agentName: "Sam", icon: "💰", desc: "Sam models runway & forecasts growth" },
  { id: "operations", label: "Operations", angle: 225, status: "idle", agentName: "Devon", icon: "🔧", desc: "Devon automates tools & workflows" },
  { id: "legal", label: "Legal", angle: 270, status: "idle", agentName: "Morgan", icon: "⚖", desc: "Morgan drafts contracts & compliance" },
  { id: "support", label: "Support", angle: 315, status: "idle", agentName: "Jamie", icon: "💬", desc: "Jamie handles tickets & client inquiries" },
];

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function HomePage() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>(null); // Null means global tabs, string means active agent chat
  const [activeTab, setActiveTab] = useState<"home" | "automyte" | "company" | "tasks" | "library">("home");

  // Focus Mode States
  const [isFocusModeActive, setIsFocusModeActive] = useState<boolean>(true);
  const [focusedDept, setFocusedDept] = useState<DepartmentId>("engineering");
  const [focusedStatus, setFocusedStatus] = useState<AgentStatus>("working");
  const [customTaskOverrides, setCustomTaskOverrides] = useState<Record<string, FocusTask>>({});

  // Global Data States
  const [tasks, setTasks] = useState<Task[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
  const [profile, setProfile] = useState<StartupProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // General Chat & Agent Chat states
  const [globalChatMessages, setGlobalChatMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Good morning! I'm your CEO orchestrator. What strategic goals are we focusing on today?" }
  ]);
  const [globalInput, setGlobalInput] = useState("");
  const [isGlobalStreaming, setIsGlobalStreaming] = useState(false);

  const [agentChats, setAgentChats] = useState<Record<string, ChatMessage[]>>({});
  const [agentInput, setAgentInput] = useState("");
  const [isAgentStreaming, setIsAgentStreaming] = useState(false);

  // Library / Document Editor State
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [docContent, setDocContent] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [globalChatMessages, agentChats, selectedDept]);

  useEffect(() => {
    // Fetch all unified store items
    Promise.all([
      fetch("/api/tasks").then((r) => r.json()),
      fetch("/api/documents").then((r) => r.json()),
      fetch("/api/approvals").then((r) => r.json()),
      fetch("/api/startup-profile").then((r) => r.json()),
    ])
      .then(([tasksJson, docsJson, approvalsJson, profileJson]) => {
        if (tasksJson.data) setTasks(tasksJson.data);
        if (docsJson.data) setDocuments(docsJson.data);
        if (approvalsJson.data) setApprovals(approvalsJson.data);
        if (profileJson.data) setProfile(profileJson.data);
      })
      .catch((err) => console.error("Error loading store dashboard:", err))
      .finally(() => setLoading(false));
  }, [selectedDept, activeTab]);

  const handleGlobalChatSend = async () => {
    if (!globalInput.trim() || isGlobalStreaming) return;
    const userMsg = globalInput.trim();
    setGlobalInput("");
    setGlobalChatMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsGlobalStreaming(true);

    setGlobalChatMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          executiveRole: "CEO",
          conversationHistory: globalChatMessages.slice(-5),
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";

      if (reader) {
        let done = false;
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.replace("data: ", "");
                if (data === "[DONE]") {
                  done = true;
                  break;
                }
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.type === "content") {
                    assistantResponse += parsed.content;
                    setGlobalChatMessages((prev) => [
                      ...prev.slice(0, -1),
                      { role: "assistant", content: assistantResponse }
                    ]);
                  }
                } catch {}
              }
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGlobalStreaming(false);
    }
  };

  const handleAgentChatSend = async (deptId: string) => {
    if (!agentInput.trim() || isAgentStreaming) return;
    const userMsg = agentInput.trim();
    setAgentInput("");

    const currentHistory = agentChats[deptId] || [
      { role: "assistant", content: `Hi! I'm ${departments.find((d) => d.id === deptId)?.agentName}, your ${deptId} agent. How can I help?` }
    ];

    setAgentChats((prev) => ({
      ...prev,
      [deptId]: [...currentHistory, { role: "user", content: userMsg }]
    }));
    setIsAgentStreaming(true);

    setAgentChats((prev) => ({
      ...prev,
      [deptId]: [...(prev[deptId] || []), { role: "assistant", content: "" }]
    }));

    const capitalizedRole = deptId.charAt(0).toUpperCase() + deptId.slice(1);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          executiveRole: capitalizedRole,
          conversationHistory: currentHistory.slice(-5),
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";

      if (reader) {
        let done = false;
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.replace("data: ", "");
                if (data === "[DONE]") {
                  done = true;
                  break;
                }
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.type === "content") {
                    assistantResponse += parsed.content;
                    setAgentChats((prev) => ({
                      ...prev,
                      [deptId]: [
                        ...prev[deptId].slice(0, -1),
                        { role: "assistant", content: assistantResponse }
                      ]
                    }));
                  }
                } catch {}
              }
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAgentStreaming(false);
    }
  };

  const handleAction = async (id: string, action: "approved" | "rejected") => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    try {
      await fetch(`/api/approvals?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = (doc: Document) => {
    const element = document.createElement("a");
    const file = new Blob([doc.content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.name.toLowerCase().replace(/\s+/g, "_")}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSaveDoc = () => {
    if (!editingDoc) return;
    const updated = documents.map((d) => 
      d.id === editingDoc.id ? { ...d, content: docContent, updated_at: new Date().toISOString() } : d
    );
    setDocuments(updated);
    setEditingDoc(null);
  };

  // Center Canvas sizing
  const cx = 240;
  const cy = 240;
  const radius = 175;

  // Tech Tree Modal State
  const [isTechTreeOpen, setIsTechTreeOpen] = useState(false);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("open_tech_tree") === "1") {
        queueMicrotask(() => setIsTechTreeOpen(true));
      }
    }
  }, []);

  // Active Focus Agent & Task computation
  const currentFocusAgent: FocusAgent = DEFAULT_FOCUS_AGENTS[focusedDept] || DEFAULT_FOCUS_AGENTS.engineering;
  const baseTask = SAMPLE_TASKS_BY_DEPT[focusedDept]?.[focusedStatus] || SAMPLE_TASKS_BY_DEPT.engineering.working;
  const currentFocusTask: FocusTask = customTaskOverrides[focusedDept] || baseTask;

  const handleApproveFocusTask = (taskId: string) => {
    setFocusedStatus("working");
    const updatedTask: FocusTask = {
      ...currentFocusTask,
      status: "working",
      progressPercent: Math.min(100, currentFocusTask.progressPercent + 25),
      approvalCallout: undefined,
      logs: [
        ...(currentFocusTask.logs || []),
        {
          id: `log-app-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
          level: "success",
          text: "Founder approved execution. Proceeding with migration step.",
        },
      ],
    };
    setCustomTaskOverrides((prev) => ({ ...prev, [focusedDept]: updatedTask }));
  };

  const handleRejectFocusTask = (taskId: string) => {
    setFocusedStatus("idle");
    const updatedTask: FocusTask = {
      ...currentFocusTask,
      status: "idle",
      approvalCallout: undefined,
    };
    setCustomTaskOverrides((prev) => ({ ...prev, [focusedDept]: updatedTask }));
  };

  const handleRetryFocusTask = (taskId: string) => {
    setFocusedStatus("working");
    const updatedTask: FocusTask = {
      ...currentFocusTask,
      status: "working",
      progressPercent: 35,
      errorInfo: undefined,
      logs: [
        ...(currentFocusTask.logs || []),
        {
          id: `log-retry-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
          level: "info",
          text: "Retrying failed task step with refreshed authorization tokens...",
        },
      ],
    };
    setCustomTaskOverrides((prev) => ({ ...prev, [focusedDept]: updatedTask }));
  };

  const handleSimulateNextStep = () => {
    const activeStepIdx = currentFocusTask.steps.findIndex((s) => s.state === "active");
    if (activeStepIdx >= 0 && activeStepIdx < currentFocusTask.steps.length - 1) {
      const updatedSteps = currentFocusTask.steps.map((s, idx) => {
        if (idx === activeStepIdx) return { ...s, state: "completed" as const };
        if (idx === activeStepIdx + 1) return { ...s, state: "active" as const };
        return s;
      });
      const newProgress = Math.min(95, Math.round(((activeStepIdx + 2) / currentFocusTask.steps.length) * 100));
      const updatedTask: FocusTask = {
        ...currentFocusTask,
        steps: updatedSteps,
        progressPercent: newProgress,
      };
      setCustomTaskOverrides((prev) => ({ ...prev, [focusedDept]: updatedTask }));
    } else {
      handleSimulateCompleteTask();
    }
  };

  const handleSimulateCompleteTask = () => {
    const completedSteps = currentFocusTask.steps.map((s) => ({ ...s, state: "completed" as const }));
    const settledTask: FocusTask = {
      ...currentFocusTask,
      steps: completedSteps,
      progressPercent: 100,
      isSettled: true,
    };
    setCustomTaskOverrides((prev) => ({ ...prev, [focusedDept]: settledTask }));

    setTimeout(() => {
      setFocusedStatus("idle");
    }, 2800);
  };

  const selectedDeptObj = departments.find((d) => d.id === selectedDept);

  return (
    <div className="flex flex-col h-screen bg-[#111115] text-white font-sans select-none overflow-hidden">
      {/* Top Navigation Header */}
      <AppHeader 
        selectedDeptName={selectedDeptObj ? selectedDeptObj.label : null}
        onOpenTechTree={() => setIsTechTreeOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Pane — Interactive Orchestrator Canvas */}
        <div className="flex-1 relative flex flex-col items-center justify-center border-r border-white/[0.08] bg-[#141419]">
          {/* Top Canvas Controls Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="flex items-center gap-1.5 bg-white/[0.05] px-2.5 py-1 rounded-md border border-white/[0.08]">
                <span className="mono text-[10px] text-slate-400">Z</span>
                <span className="text-[10px] font-medium text-slate-200">100%</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#1C1C26] px-2.5 py-1 rounded-md border border-white/[0.12] text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>5 Agents Active</span>
              </div>
            </div>

            {/* Focus Mode Toggle Pill */}
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                onClick={() => setIsFocusModeActive(!isFocusModeActive)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg border ${
                  isFocusModeActive
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-amber-500/20"
                    : "bg-[#1F1F2A] text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Focus Mode {isFocusModeActive ? "(Active)" : ""}</span>
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative w-full max-w-[500px] aspect-square">
            <svg viewBox="0 0 480 480" className="w-full h-full" fill="none">
              {/* Outer ring */}
              <circle cx={cx} cy={cy} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Connections & Nodes */}
              {departments.map((dept) => {
                const rad = (dept.angle * Math.PI) / 180;
                const outerX = cx + radius * Math.cos(rad - Math.PI / 2);
                const outerY = cy + radius * Math.sin(rad - Math.PI / 2);
                const innerX = cx + 55 * Math.cos(rad - Math.PI / 2);
                const innerY = cy + 55 * Math.sin(rad - Math.PI / 2);
                const isHovered = hoveredDept === dept.id;
                const isSelected = selectedDept === dept.id || (isFocusModeActive && focusedDept === dept.id);
                const isFocused = isFocusModeActive && focusedDept === dept.id;

                return (
                  <g key={dept.id}>
                    <line
                      x1={innerX} y1={innerY}
                      x2={outerX} y2={outerY}
                      stroke={isSelected ? "#F2B705" : isHovered ? "rgba(242,183,5,0.4)" : "rgba(255,255,255,0.12)"}
                      strokeWidth={isSelected ? "1.8" : "1"}
                      strokeDasharray="4 4"
                      className="transition-all duration-300"
                    />
                    <circle 
                      cx={outerX} cy={outerY} 
                      r={isSelected ? "16" : isHovered ? "13" : "11"}
                      fill={isSelected ? "#24242D" : isHovered ? "#1E1E26" : "#181820"}
                      stroke={isFocused ? DEPARTMENT_CONFIGS[dept.id as DepartmentId]?.accentColor || "#F2B705" : isSelected ? "#F2B705" : isHovered ? "rgba(242,183,5,0.6)" : "rgba(255,255,255,0.2)"}
                      strokeWidth={isFocused ? "3 font-bold" : isSelected ? "2" : "1"}
                      onClick={() => {
                        setSelectedDept(dept.id);
                        setFocusedDept(dept.id as DepartmentId);
                        setIsFocusModeActive(true);
                      }}
                      onMouseEnter={() => setHoveredDept(dept.id)}
                      onMouseLeave={() => setHoveredDept(null)}
                      className="cursor-pointer transition-all duration-300"
                    />
                    {/* Icon in node */}
                    <text
                      x={outerX} y={outerY + 3.5}
                      textAnchor="middle"
                      fontSize={isSelected ? "12" : "10"}
                      className="pointer-events-none select-none"
                    >
                      {dept.icon}
                    </text>
                    {/* Status indicator on node */}
                    <circle
                      cx={outerX + 8} cy={outerY - 8}
                      r="3"
                      fill={dept.status === "active" ? "#22C55E" : dept.status === "busy" ? "#F59E0B" : "rgba(255,255,255,0.3)"}
                      stroke="#141419"
                      strokeWidth="1"
                    />
                    {/* Text labels outside */}
                    <text
                      x={cx + (radius + 32) * Math.cos(rad - Math.PI / 2)}
                      y={cy + (radius + 32) * Math.sin(rad - Math.PI / 2)}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="10.5"
                      fontWeight={isSelected ? "600" : isHovered ? "550" : "480"}
                      fill={isSelected ? "#F2B705" : "rgba(255,255,255,0.7)"}
                      className="pointer-events-none select-none transition-colors duration-300"
                    >
                      {dept.label}
                    </text>
                  </g>
                );
              })}

              {/* Central Orchestrator core with Pixel Sunflower icon */}
              <circle 
                cx={cx} cy={cy} r="46" 
                fill="#1C1C24" 
                stroke={selectedDept === null ? "#F2B705" : "rgba(255,255,255,0.15)"} 
                strokeWidth="1.5" 
                onClick={() => setSelectedDept(null)}
                className="cursor-pointer hover:stroke-amber-400 transition-all shadow-xl"
              />
              <text x={cx} y={cy - 8} textAnchor="middle" fontSize="16" className="pointer-events-none">🌻</text>
              <text x={cx} y={cy + 8} textAnchor="middle" fontSize="9" fontWeight="700" fill="#FFFFFF" letterSpacing="0.06em">AUTOMYTE</text>
              <text x={cx} y={cy + 18} textAnchor="middle" fontSize="7.5" fontWeight="450" fill="rgba(255,255,255,0.5)" letterSpacing="0.04em">COFOUNDER</text>
            </svg>
          </div>

          {/* Floating Bottom Center Interactive Focus Mode Tester */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[420px]">
            <FocusModeDemoControls
              selectedDept={focusedDept}
              selectedStatus={focusedStatus}
              onSelectDept={(dept) => {
                setFocusedDept(dept);
                setIsFocusModeActive(true);
              }}
              onSelectStatus={(status) => setFocusedStatus(status)}
              onSimulateNextStep={handleSimulateNextStep}
              onSimulateComplete={handleSimulateCompleteTask}
            />
          </div>

          {/* Floating Bottom Left Toast Popup */}
          {showToast && (
            <div className="absolute bottom-24 left-5 max-w-xs bg-[#1A1A22] border border-white/10 p-3.5 rounded-xl shadow-2xl space-y-2 text-xs z-10">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">New Models Are Live</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">v1.0.16</span>
                  <button onClick={() => setShowToast(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Grok 4.5, GPT-5.6 Sol, GPT-5.6 Terra, and Muse Spark 1.1 are now available in Automyte.
              </p>
            </div>
          )}
        </div>

        {/* Right Pane — Dynamic Tabbed / Focus Mode / Agent Workspace Panel */}
        <div className="w-[480px] bg-[#16161C] border-l border-white/[0.08] flex flex-col overflow-hidden shadow-2xl">
          {/* Mode Selector Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#14141A] border-b border-white/10 select-none">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsFocusModeActive(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border-0 cursor-pointer ${
                  isFocusModeActive
                    ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                    : "bg-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                Focus Mode
              </button>
              <button
                onClick={() => setIsFocusModeActive(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border-0 cursor-pointer ${
                  !isFocusModeActive
                    ? "bg-white/10 text-white font-bold"
                    : "bg-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Multi-Agent Tabs
              </button>
            </div>

            {isFocusModeActive && (
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {currentFocusAgent.name} ({currentFocusAgent.departmentLabel})
              </span>
            )}
          </div>

          {isFocusModeActive ? (
            /* FOCUS MODE PANEL CONTAINER */
            <div className="flex-1 p-5 overflow-y-auto flex items-start justify-center bg-[#131318]">
              <FocusModePanel
                agent={currentFocusAgent}
                task={currentFocusTask}
                allAgents={Object.values(DEFAULT_FOCUS_AGENTS)}
                onClose={() => setIsFocusModeActive(false)}
                onSwitchAgent={(agentId) => {
                  const targetAgent = Object.values(DEFAULT_FOCUS_AGENTS).find((a) => a.id === agentId);
                  if (targetAgent) setFocusedDept(targetAgent.departmentId);
                }}
                onApprove={handleApproveFocusTask}
                onReject={handleRejectFocusTask}
                onRetry={handleRetryFocusTask}
              />
            </div>
          ) : selectedDept ? (
            /* DEPARTMENT CHAT PANEL WORKSPACE */
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#1A1A22]">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{departments.find(d => d.id === selectedDept)?.icon}</span>
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {departments.find(d => d.id === selectedDept)?.label} Agent
                    </h2>
                    <p className="text-xs text-slate-400">
                      Speaking with {departments.find(d => d.id === selectedDept)?.agentName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDept(null)}
                  className="text-xs font-semibold text-slate-400 hover:text-white cursor-pointer border-0 bg-transparent flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {(agentChats[selectedDept] || [
                  { role: "assistant", content: `Hi! I'm ${departments.find((d) => d.id === selectedDept)?.agentName}, your ${departments.find((d) => d.id === selectedDept)?.label} executive. Let me know what operational task we should launch.` }
                ]).map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[360px] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user" ? "bg-amber-500 text-slate-950 font-medium rounded-br-none" : "bg-[#20202A] border border-white/10 text-slate-200 rounded-bl-none"
                    }`}>
                      {msg.content}
                      {msg.role === "assistant" && msg.content === "" && isAgentStreaming && (
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/10 bg-[#1A1A22]">
                <div className="flex items-center gap-2 border border-white/10 bg-[#22222C] rounded-xl p-2 focus-within:border-amber-500/50">
                  <input
                    type="text"
                    value={agentInput}
                    onChange={(e) => setAgentInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAgentChatSend(selectedDept);
                    }}
                    placeholder={`Instruct ${departments.find(d => d.id === selectedDept)?.agentName}...`}
                    className="flex-1 border-0 bg-transparent focus:outline-none text-xs text-white px-2 py-1 placeholder-slate-500"
                  />
                  <button
                    onClick={() => handleAgentChatSend(selectedDept)}
                    disabled={!agentInput.trim() || isAgentStreaming}
                    className="h-8 w-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center cursor-pointer border-0 disabled:opacity-30"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            
          ) : (
            
            /* GLOBAL WORKSPACE TABS PANEL */
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Unified Tabs Header */}
              <div className="flex border-b border-white/10 bg-[#1A1A22] px-3 pt-2 gap-1 select-none">
                {[
                  { id: "home", label: "Home", icon: <Home className="w-3.5 h-3.5" /> },
                  { id: "automyte", label: "Automyte", icon: <MessageSquare className="w-3.5 h-3.5" /> },
                  { id: "company", label: "Company", icon: <Briefcase className="w-3.5 h-3.5" /> },
                  { id: "tasks", label: "Tasks", icon: <CheckSquare className="w-3.5 h-3.5" /> },
                  { id: "library", label: "Library", icon: <FolderOpen className="w-3.5 h-3.5" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as "home" | "automyte" | "company" | "tasks" | "library");
                      setEditingDoc(null);
                    }}
                    className={`px-3 py-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer border-0 bg-transparent ${
                      activeTab === tab.id 
                        ? "border-amber-400 text-white font-bold" 
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT: HOME */}
              {activeTab === "home" && (
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  <div>
                    <h1 className="text-lg font-serif font-semibold text-white">Good morning, Founder</h1>
                    <p className="text-xs text-slate-400">Welcome back to your operational control center</p>
                  </div>

                  {/* Approvals Attention List */}
                  {approvals.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Requires Approval</h3>
                      <div className="space-y-2">
                        {approvals.map((app) => (
                          <div key={app.id} className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-3">
                            <h4 className="text-xs font-semibold text-white">{app.requested_action}</h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAction(app.id, "approved")}
                                className="flex-1 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer border-0"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleAction(app.id, "rejected")}
                                className="flex-1 h-8 rounded-lg border border-white/10 text-xs font-semibold text-slate-300 bg-transparent hover:bg-white/5 cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT: COFOUNDER (GENERAL CHAT) */}
              {activeTab === "automyte" && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {globalChatMessages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[360px] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                          msg.role === "user" ? "bg-amber-500 text-slate-950 font-medium rounded-br-none" : "bg-[#20202A] border border-white/10 text-slate-200 rounded-bl-none"
                        }`}>
                          {msg.content}
                          {msg.role === "assistant" && msg.content === "" && isGlobalStreaming && (
                            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="p-4 border-t border-white/10 bg-[#1A1A22]">
                    <div className="flex items-center gap-2 border border-white/10 bg-[#22222C] rounded-xl p-2 focus-within:border-amber-500/50">
                      <input
                        type="text"
                        value={globalInput}
                        onChange={(e) => setGlobalInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleGlobalChatSend();
                        }}
                        placeholder="Ask Automyte anything about your company..."
                        className="flex-1 border-0 bg-transparent focus:outline-none text-xs text-white px-2 py-1 placeholder-slate-500"
                      />
                      <button
                        onClick={handleGlobalChatSend}
                        disabled={!globalInput.trim() || isGlobalStreaming}
                        className="h-8 w-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center cursor-pointer border-0 disabled:opacity-30"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: COMPANY PROFILE */}
              {activeTab === "company" && (
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  <div>
                    <h1 className="text-lg font-semibold text-white">Company Briefing</h1>
                    <p className="text-xs text-slate-400">The core values and context guiding your virtual team</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Vision</h3>
                      <p className="text-xs text-slate-300 leading-relaxed bg-[#20202A] p-3.5 rounded-xl border border-white/10">
                        {profile?.vision_mission || "Vision parameters not yet established."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Target Audience</h3>
                      <p className="text-xs text-slate-300 leading-relaxed bg-[#20202A] p-3.5 rounded-xl border border-white/10">
                        {profile?.target_audience || "No target audience defined."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Business Model</h3>
                      <p className="text-xs text-slate-300 leading-relaxed bg-[#20202A] p-3.5 rounded-xl border border-white/10">
                        {profile?.business_model || "No model structured."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: TASKS */}
              {activeTab === "tasks" && (
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <div>
                    <h1 className="text-lg font-semibold text-white">Tasks</h1>
                    <p className="text-xs text-slate-400">Current action logs from backend processes</p>
                  </div>

                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div key={task.id} className="bg-[#20202A] border border-white/10 rounded-xl p-4 flex items-start justify-between shadow-sm">
                        <div className="space-y-1 pr-4 min-w-0">
                          <h3 className="text-xs font-bold text-white truncate">{task.title}</h3>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{task.description}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded shrink-0 ${
                          task.status === "done" ? "text-emerald-400 bg-emerald-500/10" : "text-slate-400 bg-white/5"
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB CONTENT: LIBRARY (DOCUMENTS) */}
              {activeTab === "library" && (
                <div className="flex-1 overflow-y-auto p-5">
                  {editingDoc ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-2">
                        <button 
                          onClick={() => setEditingDoc(null)}
                          className="text-xs font-semibold text-slate-400 hover:text-white cursor-pointer bg-transparent border-0 flex items-center gap-1"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                        <button
                          onClick={handleSaveDoc}
                          className="h-8 px-4 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer border-0"
                        >
                          Save
                        </button>
                      </div>
                      <h3 className="text-sm font-bold text-white">{editingDoc.name}</h3>
                      <textarea
                        value={docContent}
                        onChange={(e) => setDocContent(e.target.value)}
                        className="w-full h-64 p-3.5 rounded-xl border border-white/10 bg-[#121217] text-xs font-mono text-slate-200 focus:outline-none resize-none"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-lg font-semibold text-white">Asset Library</h1>
                        <p className="text-xs text-slate-400">Click documents to view or edit</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            onClick={() => {
                              setEditingDoc(doc);
                              setDocContent(doc.content || "");
                            }}
                            className="bg-[#20202A] border border-white/10 rounded-xl p-4 hover:border-amber-500/50 shadow-sm cursor-pointer space-y-3 transition-all"
                          >
                            <div className="p-2 bg-white/5 rounded-lg w-fit">
                              <FileText className="w-4 h-4 text-amber-400" />
                            </div>
                            <h3 className="text-xs font-bold text-white truncate">{doc.name}</h3>
                            <p className="text-[10px] text-slate-400 uppercase font-semibold">{doc.folder}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TECH TREE MODAL ("How to Build a Company") */}
      {isTechTreeOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-[#181820] border border-white/10 rounded-3xl w-full max-w-6xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#1C1C26]">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📁</span>
                <div>
                  <h2 className="text-base font-bold text-white">How to Build a Company</h2>
                  <p className="text-xs text-slate-400">Automyte Operational Tech Tree</p>
                </div>
              </div>
              <button 
                onClick={() => setIsTechTreeOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Tech Tree Grid Content */}
            <div className="flex-1 overflow-x-auto p-6 bg-[#131318] flex gap-6">
              {/* STAGE 1: IDENTITY STAGE */}
              <div className="w-64 shrink-0 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase pb-2 border-b border-white/10">
                  <span>IDENTITY STAGE</span>
                  <span className="text-amber-400">0/5</span>
                </div>
                {[
                  { title: "Brand identity", tag: "Available", desc: "Agent can do this", status: "available" },
                  { title: "Buy domain", tag: "Available", desc: "Needs your input", status: "input" },
                  { title: "Setup social presence", tag: "Available", desc: "Needs your input", status: "input" },
                  { title: "Define positioning", tag: "Available", desc: "Needs approval", status: "approval" }
                ].map((item, i) => (
                  <div key={i} className="bg-[#1E1E28] border border-white/10 p-4 rounded-xl space-y-2 hover:border-amber-500/50 cursor-pointer transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{item.title}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{item.tag}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* STAGE 2: BUILD STAGE */}
              <div className="w-64 shrink-0 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase pb-2 border-b border-white/10">
                  <span>BUILD STAGE</span>
                  <span className="text-amber-400">0/8</span>
                </div>
                {[
                  { title: "Build app", tag: "Available", desc: "Agent can do this", status: "available" },
                  { title: "Add auth", tag: "Locked", desc: "Needs earlier steps first", status: "locked" },
                  { title: "Set up transactional email", tag: "Locked", desc: "Needs earlier steps first", status: "locked" },
                  { title: "Build marketing website", tag: "Available", desc: "Agent can do this", status: "available" },
                  { title: "Setup outbound email", tag: "Locked", desc: "Needs earlier steps first", status: "locked" }
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-xl border space-y-2 transition-all ${
                    item.status === "available" 
                      ? "bg-[#1E1E28] border-white/10 hover:border-amber-500/50 cursor-pointer" 
                      : "bg-[#181820] border-white/5 opacity-60"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{item.title}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        item.status === "available" ? "bg-indigo-500/20 text-indigo-300" : "bg-white/5 text-slate-500"
                      }`}>{item.tag}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* STAGE 3: GTM STAGE */}
              <div className="w-64 shrink-0 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase pb-2 border-b border-white/10">
                  <span>GTM STAGE</span>
                  <span className="text-amber-400">0/4</span>
                </div>
                {[
                  { title: "Write blog posts", desc: "Needs earlier steps first" },
                  { title: "Grow social presence", desc: "Needs earlier steps first" },
                  { title: "Send cold outreach", desc: "Needs earlier steps first" },
                  { title: "Run paid acquisition", desc: "Needs earlier steps first" }
                ].map((item, i) => (
                  <div key={i} className="bg-[#181820] border border-white/5 p-4 rounded-xl space-y-2 opacity-50">
                    <span className="text-xs font-bold text-white block">{item.title}</span>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* STAGE 4: LAUNCH STAGE */}
              <div className="w-64 shrink-0 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase pb-2 border-b border-white/10">
                  <span>LAUNCH STAGE</span>
                  <span className="text-amber-400">0/4</span>
                </div>
                {[
                  { title: "Launch app", desc: "Needs earlier steps first" },
                  { title: "Expand content engine", desc: "Needs earlier steps first" },
                  { title: "Launch marketing website", desc: "Needs earlier steps first" },
                  { title: "Qualify opportunities", desc: "Needs earlier steps first" }
                ].map((item, i) => (
                  <div key={i} className="bg-[#181820] border border-white/5 p-4 rounded-xl space-y-2 opacity-50">
                    <span className="text-xs font-bold text-white block">{item.title}</span>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* STAGE 5: SCALE STAGE */}
              <div className="w-64 shrink-0 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase pb-2 border-b border-white/10">
                  <span>SCALE STAGE</span>
                  <span className="text-amber-400">0/7</span>
                </div>
                {[
                  { title: "Add monitoring", desc: "Needs earlier steps first" },
                  { title: "Optimize SEO", desc: "Needs earlier steps first" },
                  { title: "Start community", desc: "Needs earlier steps first" },
                  { title: "Close deals", desc: "Needs earlier steps first" }
                ].map((item, i) => (
                  <div key={i} className="bg-[#181820] border border-white/5 p-4 rounded-xl space-y-2 opacity-50">
                    <span className="text-xs font-bold text-white block">{item.title}</span>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
