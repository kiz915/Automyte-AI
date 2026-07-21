"use client";

/* ============================================================
   AUTOMYTE AI v2.0 — Cofounder.co Landing Page
   ============================================================ */

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Zap, Target, Users, LineChart, Sparkles, Check, Play, Pause } from "lucide-react";
import { FocusModePanel } from "@/components/canvas/focus-mode-panel";
import {
  DepartmentId,
  DEFAULT_FOCUS_AGENTS,
  SAMPLE_TASKS_BY_DEPT,
  DEPARTMENT_CONFIGS
} from "@/types/focus-mode";

const departments: { id: DepartmentId; label: string; angle: number; icon: string }[] = [
  { id: "engineering", label: "Engineering", angle: 0, icon: "⚙" },
  { id: "sales", label: "Sales", angle: 45, icon: "📈" },
  { id: "marketing", label: "Marketing", angle: 90, icon: "📣" },
  { id: "design", label: "Design", angle: 135, icon: "🎨" },
  { id: "finance", label: "Finance", angle: 180, icon: "💰" },
  { id: "operations", label: "Operations", angle: 225, icon: "🔧" },
  { id: "legal", label: "Legal", angle: 270, icon: "⚖" },
  { id: "support", label: "Support", angle: 315, icon: "💬" },
];

const howToSteps = [
  {
    tag: "Start",
    title: "Describe your company",
    description: "Brief your AI executive on your vision and goals. We automatically build a customized business roadmap and draft your founding charter.",
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    previewTitle: "Executive Briefing",
    previewCode: `{\n  "company_name": "Automyte SaaS",\n  "model": "B2B Subscription",\n  "target_audience": "Developer & Ops Tools",\n  "roadmap": ["Legal Charter", "Design Brand Kit", "MVP Scaffolding"]\n}`
  },
  {
    tag: "Build",
    title: "Agents build your systems",
    description: "Engineering and design agents scaffold your codebase, configure Supabase tables, and wire up deploy pipelines to Vercel.",
    icon: <Target className="w-5 h-5 text-amber-500" />,
    previewTitle: "Automated Deployments",
    previewCode: `CREATE TABLE users (\n  id UUID PRIMARY KEY,\n  email TEXT UNIQUE,\n  created_at TIMESTAMP WITH TIME ZONE\n);\n-- Vercel deployment: SUCCESS (2.1s)`
  },
  {
    tag: "Sell",
    title: "Reach your customers",
    description: "Sales and marketing agents build targeted outbound lists, write automated email sequences, and generate marketing copy.",
    icon: <Users className="w-5 h-5 text-amber-500" />,
    previewTitle: "Outreach Campaign",
    previewCode: `Subject: Elevating developer workflows\nTo: engineering-leads@target.com\nBody: I noticed you're scaling your team. Automyte helps...\nStatus: 42% reply rate`
  },
  {
    tag: "Scale",
    title: "Optimize and grow",
    description: "Finance, operations, and analytics agents monitor live dashboard metrics, forecast cash runway, and suggest growth levers.",
    icon: <LineChart className="w-5 h-5 text-amber-500" />,
    previewTitle: "Runway & Growth Models",
    previewCode: `Monthly Recurring Revenue: $42,500 (+12% MoM)\nCash Runway: 18.4 months\nBurn Rate: $8,200/mo\nRecommendation: Scale Sales Outbound`
  },
];

const socialProofCompanies = ["ActiveGraph", "DentalFlow", "LearnPath", "Valence OS", "Acumen", "Kore Labs"];

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);

  // Focus Mode Landing Demo State
  const [heroFocusedDept, setHeroFocusedDept] = useState<DepartmentId>("engineering");
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

  // Auto-cycle through departments every 5 seconds to demonstrate Focus Mode in action
  useEffect(() => {
    if (!isAutoCycling) return;
    const depts: DepartmentId[] = ["engineering", "marketing", "finance", "design", "sales"];
    const interval = setInterval(() => {
      setHeroFocusedDept((prev) => {
        const nextIdx = (depts.indexOf(prev) + 1) % depts.length;
        return depts[nextIdx];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const activeHeroAgent = DEFAULT_FOCUS_AGENTS[heroFocusedDept] || DEFAULT_FOCUS_AGENTS.engineering;
  const activeHeroTask = SAMPLE_TASKS_BY_DEPT[heroFocusedDept]?.working || SAMPLE_TASKS_BY_DEPT.engineering.working;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#1A1A1A] font-sans select-none overflow-x-hidden">
      
      {/* ============================================================ */}
      {/* TOP NAVIGATION HEADER */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-serif font-semibold tracking-tight text-[#1A1A1A] no-underline">
            <span>Automyte</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center bg-white/80 border border-black/10 rounded-full px-3 py-1.5 gap-2 text-xs font-medium shadow-xs">
              <span className="text-slate-400 font-semibold pl-1">How to</span>
              <span className="text-slate-300">|</span>
              <Link
                href="/how-to/start"
                className="px-3 py-1 rounded-full text-slate-600 hover:text-black hover:bg-slate-100 transition-all no-underline"
              >
                Start
              </Link>
              <Link
                href="/how-to/build"
                className="px-3 py-1 rounded-full text-slate-600 hover:text-black hover:bg-slate-100 transition-all no-underline"
              >
                Build
              </Link>
              <Link
                href="/how-to/sell"
                className="px-3 py-1 rounded-full text-slate-600 hover:text-black hover:bg-slate-100 transition-all no-underline"
              >
                Sell
              </Link>
              <Link
                href="/how-to/scale"
                className="px-3 py-1 rounded-full text-slate-600 hover:text-black hover:bg-slate-100 transition-all no-underline"
              >
                Scale
              </Link>
            </div>

            <Link href="/resources" className="text-xs font-medium text-slate-700 hover:text-black transition-colors no-underline">
              Resources
            </Link>

            <Link href="/pricing" className="text-xs font-medium text-slate-700 hover:text-black transition-colors no-underline">
              Pricing
            </Link>

            {/* Run a company CTA Button */}
            <Link
              href="/onboarding"
              className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold hover:bg-black transition-all shadow-md no-underline flex items-center gap-1.5"
            >
              Run a company
            </Link>
          </nav>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================ */}
      <section className="pt-20 pb-16 px-6 text-center space-y-8 relative max-w-5xl mx-auto">
        {/* Social Proof Sub-tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-black/10 text-xs font-medium text-slate-600 shadow-xs">
          <span>🌻</span>
          <span>over 10,000 companies are running on Automyte</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-[112%] max-w-4xl mx-auto">
          Automyte is an agent orchestration platform <br />
          <span className="text-slate-500 font-serif font-normal">designed to help you run an entire business</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Brief your AI cofounder, scaffold your product codebase, launch outbound sales campaigns, and scale your operations with single-agent <strong className="text-black">Focus Mode</strong> clarity.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/onboarding"
            className="px-8 py-4 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold hover:bg-black transition-all shadow-lg no-underline flex items-center gap-2"
          >
            Run a company
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/canvas?demo=true"
            className="px-8 py-4 rounded-xl bg-white border border-black/10 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-all shadow-sm no-underline"
          >
            Explore workspace canvas →
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HERO INTERACTIVE FOCUS MODE DEMO WINDOW */}
      {/* ============================================================ */}
      <section className="px-6 pb-24 max-w-6xl mx-auto w-full">
        <div className="bg-[#121217] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
          {/* Window Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-4 font-mono text-[11px] text-slate-300">app.automyte.ai/canvas — Focus Mode Live Preview</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAutoCycling(!isAutoCycling)}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 text-[11px] font-medium text-slate-200 flex items-center gap-1.5 transition-colors border-0 cursor-pointer"
              >
                {isAutoCycling ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{isAutoCycling ? "Auto-cycling" : "Paused"}</span>
              </button>
            </div>
          </div>

          {/* Grid Layout inside Mockup Window */}
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[460px]">
            {/* Left Canvas Node Orbit Diagram */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-6 bg-[#161620] rounded-2xl border border-white/10">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Click Any Agent Node To Focus</span>
              </div>

              <svg viewBox="0 0 440 440" className="w-full max-w-md aspect-square">
                {/* Outer Orbit Circle */}
                <circle cx="220" cy="220" r="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" fill="none" />

                {/* Orbit Lines & Nodes */}
                {departments.map((dept) => {
                  const rad = (dept.angle * Math.PI) / 180;
                  const x = 220 + 140 * Math.cos(rad - Math.PI / 2);
                  const y = 220 + 140 * Math.sin(rad - Math.PI / 2);
                  const isFocused = heroFocusedDept === dept.id;
                  const cfg = DEPARTMENT_CONFIGS[dept.id] || DEPARTMENT_CONFIGS.engineering;

                  return (
                    <g
                      key={dept.id}
                      className="cursor-pointer group"
                      onClick={() => {
                        setIsAutoCycling(false);
                        setHeroFocusedDept(dept.id);
                      }}
                    >
                      <line
                        x1="220" y1="220" x2={x} y2={y}
                        stroke={isFocused ? cfg.accentColor : "rgba(255,255,255,0.12)"}
                        strokeWidth={isFocused ? "2" : "1"}
                        strokeDasharray="4 4"
                      />
                      <circle
                        cx={x} cy={y}
                        r={isFocused ? "16" : "12"}
                        fill={isFocused ? "#242432" : "#1A1A24"}
                        stroke={isFocused ? cfg.accentColor : "rgba(255,255,255,0.2)"}
                        strokeWidth={isFocused ? "3" : "1"}
                        className="transition-all duration-300 group-hover:scale-110"
                      />
                      <text x={x} y={y + 3.5} textAnchor="middle" fontSize={isFocused ? "12" : "10"} className="pointer-events-none select-none">
                        {dept.icon}
                      </text>
                      {/* Pulse ring for active focused node */}
                      {isFocused && (
                        <circle cx={x} cy={y} r="22" fill="none" stroke={cfg.accentColor} strokeWidth="1.5" className="animate-ping opacity-30" />
                      )}
                      <text
                        x={x} y={y + 26}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight={isFocused ? "700" : "500"}
                        fill={isFocused ? cfg.accentColor : "rgba(255,255,255,0.6)"}
                        className="pointer-events-none select-none transition-colors"
                      >
                        {dept.label}
                      </text>
                    </g>
                  );
                })}

                {/* Center Core */}
                <g>
                  <circle cx="220" cy="220" r="38" fill="#1E1E2A" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                  <text x="220" y="214" textAnchor="middle" fontSize="16">🌻</text>
                  <text x="220" y="232" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#FFFFFF" letterSpacing="0.05em">AUTOMYTE</text>
                </g>
              </svg>

              {/* Department selector pill bar on landing page */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full pt-2 justify-center">
                {(["engineering", "marketing", "finance", "design", "sales"] as DepartmentId[]).map((d) => {
                  const isSelected = heroFocusedDept === d;
                  const cfg = DEPARTMENT_CONFIGS[d];
                  return (
                    <button
                      key={d}
                      onClick={() => {
                        setIsAutoCycling(false);
                        setHeroFocusedDept(d);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                        isSelected
                          ? "text-white border-white/30 shadow-md"
                          : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
                      }`}
                      style={{
                        backgroundColor: isSelected ? cfg.accentColor : undefined,
                      }}
                    >
                      {cfg.icon} {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side Focus Mode Live Panel */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <FocusModePanel
                agent={activeHeroAgent}
                task={activeHeroTask}
                allAgents={Object.values(DEFAULT_FOCUS_AGENTS)}
                onSwitchAgent={(agentId) => {
                  const found = Object.values(DEFAULT_FOCUS_AGENTS).find((a) => a.id === agentId);
                  if (found) {
                    setIsAutoCycling(false);
                    setHeroFocusedDept(found.departmentId);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SOCIAL PROOF CLIENT LOGOS */}
      {/* ============================================================ */}
      <section className="py-12 border-y border-black/5 bg-white/50 text-center">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Leading founders build with Automyte
          </span>
          <div className="flex flex-wrap items-center justify-center gap-12 text-slate-600 font-serif font-bold text-lg">
            {socialProofCompanies.map((c) => (
              <span key={c} className="hover:text-black transition-colors cursor-pointer">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW TO SECTION (TABBED PHASES) */}
      {/* ============================================================ */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A]">
            From business plan to production deployment
          </h2>
          <p className="text-slate-600 text-sm">Four structured phases executed completely by your AI executive team.</p>
        </div>

        {/* Tabbed Interactive Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            {howToSteps.map((step, idx) => (
              <div
                key={step.tag}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  activeStep === idx
                    ? "bg-white border-black/15 shadow-md"
                    : "bg-white/40 border-black/5 hover:bg-white/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">{step.icon}</div>
                  <h3 className="text-base font-serif font-bold text-[#1A1A1A]">{step.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-11">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Right Code/Preview Box */}
          <div className="lg:col-span-7 bg-[#16161C] text-white p-8 rounded-3xl space-y-4 shadow-xl border border-white/10 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-amber-400 font-bold">{howToSteps[activeStep].previewTitle}</span>
              <span className="text-slate-500 text-[10px]">EXECUTION LOG</span>
            </div>
            <pre className="text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap p-4 bg-[#0E0E12] rounded-xl border border-white/5">
              {howToSteps[activeStep].previewCode}
            </pre>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER */}
      {/* ============================================================ */}
      <footer className="py-12 border-t border-black/5 bg-white text-center text-xs text-slate-500 space-y-4">
        <div className="flex items-center justify-center gap-6">
          <Link href="/onboarding" className="hover:text-black">Run a company</Link>
          <Link href="/canvas" className="hover:text-black">Canvas</Link>
          <Link href="/pricing" className="hover:text-black">Pricing</Link>
        </div>
        <p>© {new Date().getFullYear()} Automyte AI Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
