"use client";

/* ============================================================
   AUTOMYTE AI — Stitch Co-Founder Connect (Multi-Agent Visual Network Engine)
   Ultra-High Aesthetic Co-Founder Stitching & Team Orchestration Platform
   ============================================================ */

import { useState, useEffect } from "react";
import {
  Sparkles,
  Bot,
  Layers,
  Zap,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Shield,
  Code,
  Palette,
  LineChart,
  Briefcase,
  Scale,
  Terminal,
  MessageSquare,
  Plus,
  ArrowRight,
  RefreshCw,
  Sliders,
  Share2,
  Network,
  Users,
  Activity,
  Check,
  Play,
  Settings2,
} from "lucide-react";
import { getCompany, getProfile, getTasks } from "@/lib/store";

interface CoFounderNode {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarIcon: string;
  accentColor: string;
  status: "synced" | "active" | "working" | "standby";
  synergyScore: number;
  specialization: string[];
  currentMission: string;
  stitchedWith: string[];
  tasksCompleted: number;
}

const INITIAL_COFOUNDERS: CoFounderNode[] = [
  {
    id: "exec_ceo",
    name: "Alex Vance",
    role: "Chief Executive Co-Founder",
    department: "Executive Strategy",
    avatarIcon: "👑",
    accentColor: "#F2B705", // Amber/Gold
    status: "synced",
    synergyScore: 99,
    specialization: ["Pitch Decks", "Fundraising Strategy", "Executive Oversight"],
    currentMission: "Drafting Series A Pitch Deck & 12-Month Financial Target",
    stitchedWith: ["exec_cto", "exec_cfo", "exec_cmo"],
    tasksCompleted: 42,
  },
  {
    id: "exec_cto",
    name: "Kai Sterling",
    role: "Chief Technology Co-Founder",
    department: "Engineering & Tech",
    avatarIcon: "⚙️",
    accentColor: "#3B82F6", // Blue
    status: "working",
    synergyScore: 97,
    specialization: ["System Architecture", "Supabase & Auth Scaffold", "Code Generation"],
    currentMission: "Implementing Next.js 15 App Directory Scaffolding & API Guards",
    stitchedWith: ["exec_ceo", "exec_design"],
    tasksCompleted: 88,
  },
  {
    id: "exec_cmo",
    name: "Aria Thorne",
    role: "Chief Marketing Co-Founder",
    department: "Growth & Marketing",
    avatarIcon: "📣",
    accentColor: "#EC4899", // Pink
    status: "active",
    synergyScore: 95,
    specialization: ["GTM Campaigns", "Content Loops", "ProductHunt Seeding"],
    currentMission: "Building Launch Landing Copy & Developer Community Campaign",
    stitchedWith: ["exec_ceo", "exec_design"],
    tasksCompleted: 64,
  },
  {
    id: "exec_cfo",
    name: "Sam Mercer",
    role: "Chief Financial Co-Founder",
    department: "Finance & Accounting",
    avatarIcon: "💰",
    accentColor: "#10B981", // Emerald
    status: "synced",
    synergyScore: 96,
    specialization: ["Runway Modeling", "Unit Economics", "SaaS Pricing Tiers"],
    currentMission: "Formulating 18-Month Financial Projections & CAC/LTV Model",
    stitchedWith: ["exec_ceo"],
    tasksCompleted: 31,
  },
  {
    id: "exec_design",
    name: "Luna Chen",
    role: "Head of Design & Product",
    department: "Design & Brand",
    avatarIcon: "🎨",
    accentColor: "#8B5CF6", // Purple
    status: "working",
    synergyScore: 98,
    specialization: ["UI Design System", "Brand Kit", "Figma Design Specs"],
    currentMission: "Refining Modern Dark Glassmorphic Dashboard Design System",
    stitchedWith: ["exec_cto", "exec_cmo"],
    tasksCompleted: 53,
  },
  {
    id: "exec_coo",
    name: "Devon Ross",
    role: "Chief Operating Co-Founder",
    department: "Operations",
    avatarIcon: "🔧",
    accentColor: "#F97316", // Orange
    status: "active",
    synergyScore: 94,
    specialization: ["Sprint Workflows", "Integration Pipelines", "Task Decomposition"],
    currentMission: "Orchestrating Daily Founder Sprint Tasks & Dependencies",
    stitchedWith: ["exec_cto", "exec_legal"],
    tasksCompleted: 77,
  },
  {
    id: "exec_legal",
    name: "Morgan Blake",
    role: "General Legal Counsel",
    department: "Legal & Compliance",
    avatarIcon: "⚖️",
    accentColor: "#64748B", // Slate
    status: "synced",
    synergyScore: 93,
    specialization: ["Terms of Service", "Privacy Policies", "IP Safeguards"],
    currentMission: "Drafting Enterprise Terms & Privacy Compliance Matrix",
    stitchedWith: ["exec_coo"],
    tasksCompleted: 19,
  },
  {
    id: "exec_support",
    name: "Jamie Vance",
    role: "Head of Customer Support",
    department: "Support & Success",
    avatarIcon: "💬",
    accentColor: "#06B6D4", // Cyan
    status: "standby",
    synergyScore: 91,
    specialization: ["Customer Ticket Loops", "Help Center KB", "User Feedback"],
    currentMission: "Setting up Autonomous Customer Help Center & Chatbot Docs",
    stitchedWith: ["exec_cmo"],
    tasksCompleted: 26,
  },
];

export default function StitchCoFounderConnectPage() {
  const [coFounders, setCoFounders] = useState<CoFounderNode[]>(INITIAL_COFOUNDERS);
  const [selectedNode, setSelectedNode] = useState<CoFounderNode | null>(INITIAL_COFOUNDERS[0]);
  const [stitchingModalOpen, setStitchingModalOpen] = useState(false);
  const [primaryStitchId, setPrimaryStitchId] = useState<string>("exec_ceo");
  const [secondaryStitchId, setSecondaryStitchId] = useState<string>("exec_cto");
  const [workflowPurpose, setWorkflowPurpose] = useState("");
  const [isDeployingStitch, setIsDeployingStitch] = useState(false);
  const [stitchSuccessAlert, setStitchSuccessAlert] = useState<string | null>(null);

  // Filter & Search State
  const [filterDepartment, setFilterDepartment] = useState("all");

  const company = getCompany();

  // Handle Stitch Team Deployment
  const handleDeployStitchedTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (primaryStitchId === secondaryStitchId) return;

    setIsDeployingStitch(true);

    setTimeout(() => {
      // Update stitched connections in state
      setCoFounders((prev) =>
        prev.map((cf) => {
          if (cf.id === primaryStitchId) {
            return {
              ...cf,
              stitchedWith: Array.from(new Set([...cf.stitchedWith, secondaryStitchId])),
              synergyScore: Math.min(100, cf.synergyScore + 2),
            };
          }
          if (cf.id === secondaryStitchId) {
            return {
              ...cf,
              stitchedWith: Array.from(new Set([...cf.stitchedWith, primaryStitchId])),
              synergyScore: Math.min(100, cf.synergyScore + 2),
            };
          }
          return cf;
        })
      );

      setIsDeployingStitch(false);
      setStitchingModalOpen(false);
      setWorkflowPurpose("");

      const p1 = coFounders.find((c) => c.id === primaryStitchId)?.name;
      const p2 = coFounders.find((c) => c.id === secondaryStitchId)?.name;
      setStitchSuccessAlert(
        `⚡ Successfully stitched ${p1} & ${p2}! Multi-agent synergy pipeline deployed to workspace.`
      );
      setTimeout(() => setStitchSuccessAlert(null), 5000);
    }, 1200);
  };

  const filteredNodes = coFounders.filter((cf) =>
    filterDepartment === "all" ? true : cf.department.toLowerCase().includes(filterDepartment)
  );

  return (
    <div className="min-h-screen bg-[#0F0F12] text-white font-sans p-6 md:p-10 space-y-8 select-none">
      
      {/* Top Banner Alert */}
      {stitchSuccessAlert && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{stitchSuccessAlert}</span>
          </div>
          <button onClick={() => setStitchSuccessAlert(null)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold uppercase tracking-widest">
            <Network className="w-3.5 h-3.5 text-amber-400" /> Stitch Co-Founder Connect Engine
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-extrabold tracking-tight text-white">
            Co-Founder <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-indigo-400 to-cyan-400">Network HUD</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Stitch together specialized AI Co-Founders, connect multi-agent execution workflows, and orchestrate automated company operations for <strong className="text-white">{company.name || "Automyte"}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setStitchingModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold transition-all shadow-lg hover:shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Stitch New Team Workflow
          </button>
        </div>
      </div>

      {/* Overview Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Stitched Co-Founders", val: `${coFounders.length} Active`, icon: <Users className="w-4 h-4 text-amber-400" /> },
          { label: "Network Synergy Index", val: "97.4%", icon: <Activity className="w-4 h-4 text-emerald-400" /> },
          { label: "Multi-Agent Pipelines", val: "14 Active", icon: <Layers className="w-4 h-4 text-indigo-400" /> },
          { label: "Tasks Executed", val: "400+ Done", icon: <CheckCircle2 className="w-4 h-4 text-cyan-400" /> },
        ].map((st, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-1.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>{st.label}</span>
              {st.icon}
            </div>
            <div className="text-xl font-bold font-mono text-white">{st.val}</div>
          </div>
        ))}
      </div>

      {/* Main Grid: Orbit Visualizer + Co-Founder Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Visual Orbit Network Canvas */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between min-h-[480px]">
            
            {/* Canvas Header Controls */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Interactive Co-Founder Connection Graph
                </span>
              </div>

              {/* Department Filter Pills */}
              <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-[11px]">
                {["all", "executive", "engineering", "growth"].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setFilterDepartment(dept)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-semibold transition-all ${
                      filterDepartment === dept
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Network Graph SVG Canvas */}
            <div className="relative flex-1 flex items-center justify-center my-6 py-8">
              <svg viewBox="0 0 600 400" className="w-full max-w-xl aspect-[3/2] overflow-visible">
                
                {/* Background Orbit Line */}
                <circle cx="300" cy="200" r="140" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                <circle cx="300" cy="200" r="70" stroke="rgba(242,183,5,0.12)" strokeWidth="1" fill="none" />

                {/* Center Workspace Node */}
                <g className="cursor-pointer">
                  <circle cx="300" cy="200" r="32" fill="#1A1A22" stroke="#F2B705" strokeWidth="2" />
                  <text x="300" y="196" textAnchor="middle" fontSize="16">🌻</text>
                  <text x="300" y="214" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#F2B705" fontFamily="sans-serif">
                    {company.name || "Automyte"}
                  </text>
                </g>

                {/* Render Nodes along orbit */}
                {filteredNodes.map((cf, idx) => {
                  const angle = (idx * 360) / filteredNodes.length;
                  const rad = (angle * Math.PI) / 180;
                  const x = 300 + 140 * Math.cos(rad - Math.PI / 2);
                  const y = 200 + 140 * Math.sin(rad - Math.PI / 2);
                  const isSelected = selectedNode?.id === cf.id;

                  return (
                    <g
                      key={cf.id}
                      onClick={() => setSelectedNode(cf)}
                      className="cursor-pointer transition-all duration-300 hover:opacity-100"
                    >
                      {/* Connecting Line to Center */}
                      <line
                        x1="300"
                        y1="200"
                        x2={x}
                        y2={y}
                        stroke={isSelected ? cf.accentColor : "rgba(255,255,255,0.08)"}
                        strokeWidth={isSelected ? "2" : "1"}
                        strokeDasharray={isSelected ? "none" : "3 3"}
                      />

                      {/* Node Circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? "24" : "20"}
                        fill="#16161D"
                        stroke={cf.accentColor}
                        strokeWidth={isSelected ? "2.5" : "1.5"}
                        className="transition-all"
                      />

                      {/* Emoji Icon */}
                      <text x={x} y={y + 5} textAnchor="middle" fontSize="12">
                        {cf.avatarIcon}
                      </text>

                      {/* Name Label Below Node */}
                      <rect
                        x={x - 40}
                        y={y + 24}
                        width="80"
                        height="16"
                        rx="4"
                        fill="#0F0F14"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <text
                        x={x}
                        y={y + 35}
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="600"
                        fill={isSelected ? "#FFF" : "#A1A1AA"}
                      >
                        {cf.name.split(" ")[0]} ({cf.role.split(" ")[0]})
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Synergy Ticker */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px]">
                  <strong>Synergy Feed:</strong> Alex (CEO) & Kai (CTO) synchronized on Pitch Deck & System Spec
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Live</span>
            </div>
          </div>

          {/* Co-Founders Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Connected Co-Founders Roster ({coFounders.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coFounders.map((cf) => (
                <div
                  key={cf.id}
                  onClick={() => setSelectedNode(cf)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-md ${
                    selectedNode?.id === cf.id
                      ? "border-amber-500/50 ring-1 ring-amber-500/30"
                      : "border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg border border-white/10"
                        style={{ backgroundColor: `${cf.accentColor}15`, borderColor: `${cf.accentColor}30` }}
                      >
                        {cf.avatarIcon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{cf.name}</h4>
                        <p className="text-[11px] text-slate-400">{cf.role}</p>
                      </div>
                    </div>

                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${cf.accentColor}20`,
                        color: cf.accentColor,
                        border: `1px solid ${cf.accentColor}40`,
                      }}
                    >
                      {cf.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed bg-black/20 p-2.5 rounded-xl border border-white/5">
                    &quot;{cf.currentMission}&quot;
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Synergy: <strong className="text-emerald-400">{cf.synergyScore}%</strong></span>
                    <span>Tasks: <strong className="text-white">{cf.tasksCompleted} done</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Selected Co-Founder Detail Panel */}
        {selectedNode && (
          <div className="space-y-6">
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-6 sticky top-24">
              
              {/* Profile Card Header */}
              <div className="text-center space-y-3 border-b border-white/10 pb-6">
                <div
                  className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-3xl border shadow-lg"
                  style={{ backgroundColor: `${selectedNode.accentColor}20`, borderColor: `${selectedNode.accentColor}50` }}
                >
                  {selectedNode.avatarIcon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedNode.name}</h2>
                  <p className="text-xs text-slate-400">{selectedNode.role}</p>
                  <span className="inline-block mt-2 text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
                    {selectedNode.department}
                  </span>
                </div>
              </div>

              {/* Specialization Skill Pills */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Specializations & Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.specialization.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Current Active Mission */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Mission</span>
                <div className="p-3.5 bg-black/40 border border-white/10 rounded-2xl text-xs text-slate-300 leading-relaxed">
                  {selectedNode.currentMission}
                </div>
              </div>

              {/* Stitched Connections List */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Stitched Co-Founder Partners</span>
                <div className="space-y-1.5">
                  {selectedNode.stitchedWith.map((partnerId) => {
                    const partner = coFounders.find((c) => c.id === partnerId);
                    if (!partner) return null;
                    return (
                      <div key={partnerId} className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl text-xs border border-white/5">
                        <div className="flex items-center gap-2">
                          <span>{partner.avatarIcon}</span>
                          <span className="font-semibold text-white">{partner.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400">Synced</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Action Button */}
              <button
                onClick={() => {
                  setPrimaryStitchId(selectedNode.id);
                  setStitchingModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" /> Stitch {selectedNode.name.split(" ")[0]} with Team
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* STITCH TEAM WORKFLOW MODAL */}
      {/* ========================================================================= */}
      {stitchingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="max-w-lg w-full bg-[#16161D] border border-white/15 rounded-3xl p-8 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Stitch Team Workflow Pipeline</h3>
                  <p className="text-[11px] text-slate-400">Connect two co-founders into an autonomous execution loop</p>
                </div>
              </div>
              <button onClick={() => setStitchingModalOpen(false)} className="text-slate-400 hover:text-white text-base">
                ✕
              </button>
            </div>

            <form onSubmit={handleDeployStitchedTeam} className="space-y-5">
              {/* Primary Co-Founder Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Lead Co-Founder 1</label>
                <select
                  value={primaryStitchId}
                  onChange={(e) => setPrimaryStitchId(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl bg-black/50 border border-white/15 text-white font-semibold focus:outline-none"
                >
                  {coFounders.map((cf) => (
                    <option key={cf.id} value={cf.id} className="bg-slate-900 text-white">
                      {cf.avatarIcon} {cf.name} — {cf.role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Secondary Co-Founder Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Partner Co-Founder 2</label>
                <select
                  value={secondaryStitchId}
                  onChange={(e) => setSecondaryStitchId(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl bg-black/50 border border-white/15 text-white font-semibold focus:outline-none"
                >
                  {coFounders.map((cf) => (
                    <option key={cf.id} value={cf.id} className="bg-slate-900 text-white">
                      {cf.avatarIcon} {cf.name} — {cf.role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Workflow Purpose / Mandate */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Workflow Mandate / Goal</label>
                <textarea
                  rows={3}
                  value={workflowPurpose}
                  onChange={(e) => setWorkflowPurpose(e.target.value)}
                  placeholder="e.g. Automatically generate pitch deck slides from tech architecture specs..."
                  className="w-full p-3.5 text-xs rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStitchingModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDeployingStitch || primaryStitchId === secondaryStitchId}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold shadow-md disabled:opacity-40 flex items-center gap-2 cursor-pointer"
                >
                  {isDeployingStitch ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Deploying...
                    </>
                  ) : (
                    "Deploy Stitched Workflow →"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
