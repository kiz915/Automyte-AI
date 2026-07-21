"use client";

/* ============================================================
   AUTOMYTE AI — Landing Page
   ============================================================ */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "motion/react";
import { ArrowRight, Zap, Target, Users, LineChart, Play, Pause } from "lucide-react";
import { FocusModePanel } from "@/components/canvas/focus-mode-panel";
import {
  DepartmentId,
  DEFAULT_FOCUS_AGENTS,
  SAMPLE_TASKS_BY_DEPT,
  DEPARTMENT_CONFIGS
} from "@/types/focus-mode";
import { LoadingScreen } from "@/components/landing/loading-screen";
import { SmoothScrollProvider } from "@/components/landing/smooth-scroll-provider";
import { AnimatedBackground } from "@/components/landing/animated-background";
import { HeroBackground } from "@/components/landing/hero-background";
import { CursorGlow } from "@/components/landing/cursor-glow";
import { AnimatedCounter } from "@/components/landing/animated-counter";
import { Reveal } from "@/components/landing/reveal";
import { CtaButton } from "@/components/landing/cta-button";

const stats: { label: string; to: number; suffix?: string; prefix?: string }[] = [
  { label: "Companies running on Automyte", to: 10000, suffix: "+" },
  { label: "Average outbound reply rate", to: 42, suffix: "%" },
  { label: "Avg. monthly recurring revenue growth", to: 12, suffix: "% MoM" },
  { label: "Avg. cash runway forecasted", to: 18.4, suffix: " mo" },
];

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

  // Header reacts to scroll position — condenses and gains shadow once past the hero
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  // Premium boot sequence before the hero is shown
  const [loading, setLoading] = useState(true);

  // Hero-only scroll parallax — content settles with a slight fade,
  // scale, and lift as it scrolls out; the background keeps running.
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.4]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.96]);
  const heroY = useTransform(heroProgress, [0, 1], [0, -30]);

  return (
    <SmoothScrollProvider>
      <LoadingScreen onDone={() => setLoading(false)} />
      <AnimatedBackground />
      <CursorGlow />
      <div
        className={`min-h-screen flex flex-col bg-[#F7F6F2] text-[#1A1A1A] font-sans select-none overflow-x-hidden transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
      
      {/* ============================================================ */}
      {/* TOP NAVIGATION HEADER */}
      {/* ============================================================ */}
      <motion.header
        animate={{
          height: isScrolled ? 64 : 80,
          backgroundColor: isScrolled ? "rgba(247,246,242,0.72)" : "rgba(247,246,242,0)",
          backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
          borderBottomColor: isScrolled ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0)",
          boxShadow: isScrolled
            ? "0 1px 0 rgba(0,0,0,0.06), 0 8px 30px rgba(0,0,0,0.06)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 border-b"
        style={{ WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(0px)" }}
      >
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
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
            <CtaButton href="/onboarding" className="!px-5 !py-2.5">
              Run a company
            </CtaButton>
          </nav>
        </div>
      </motion.header>

      {/* ============================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================ */}
      <section ref={heroRef} className="relative isolate overflow-hidden">
        {/* Edge-to-edge layered background — keeps running regardless of scroll/parallax below */}
        <HeroBackground />

        <motion.div
          initial="hidden"
          animate="show"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          className="relative z-10 pt-36 pb-28 px-6 text-center max-w-5xl mx-auto"
        >
          {/* Announcement badge */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-black/10 text-xs font-medium text-slate-600 shadow-xs"
          >
            <span>🌻</span>
            <span>over 10,000 companies are running on Automyte</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-4xl md:text-6xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-[112%] max-w-4xl mx-auto"
          >
            Automyte is an agent orchestration platform <br />
            <span className="text-slate-500 font-serif font-normal">designed to help you run an entire business</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-base text-slate-600 max-w-xl mx-auto leading-relaxed"
          >
            Brief your AI cofounder, scaffold your product codebase, launch outbound sales campaigns, and scale your operations with single-agent <strong className="text-black">Focus Mode</strong> clarity.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-11 flex items-center justify-center gap-4"
          >
            <CtaButton href="/onboarding" icon={<ArrowRight className="w-4 h-4" />}>
              Run a company
            </CtaButton>
            <CtaButton href="/canvas?demo=true" variant="secondary">
              Explore workspace canvas →
            </CtaButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* HERO INTERACTIVE FOCUS MODE DEMO WINDOW */}
      {/* ============================================================ */}
      <section className="px-6 pb-24 max-w-6xl mx-auto w-full">
        <div className="automyte-float">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#121217] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
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
                {/* Outer Orbit Circle — slow continuous rotation */}
                <motion.circle
                  cx="220" cy="220" r="140"
                  stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" fill="none"
                  style={{ transformOrigin: "220px 220px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                />

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
                      <motion.line
                        x1="220" y1="220" x2={x} y2={y}
                        animate={{
                          stroke: isFocused ? cfg.accentColor : "rgba(255,255,255,0.12)",
                          strokeWidth: isFocused ? 2 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 24 }}
                        strokeDasharray="4 4"
                        className={isFocused ? "automyte-line-glow" : undefined}
                      />
                      <motion.circle
                        cx={x} cy={y}
                        animate={{
                          r: isFocused ? 16 : 12,
                          fill: isFocused ? "#242432" : "#1A1A24",
                          stroke: isFocused ? cfg.accentColor : "rgba(255,255,255,0.2)",
                          strokeWidth: isFocused ? 3 : 1,
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      />
                      <text x={x} y={y + 3.5} textAnchor="middle" fontSize={isFocused ? "12" : "10"} className="pointer-events-none select-none">
                        {dept.icon}
                      </text>
                      {/* Pulse ring for active focused node */}
                      <AnimatePresence>
                        {isFocused && (
                          <motion.circle
                            cx={x} cy={y} r="16" fill="none" stroke={cfg.accentColor} strokeWidth="1.5"
                            initial={{ opacity: 0.5, scale: 1 }}
                            animate={{ opacity: 0, scale: 1.6 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                            style={{ transformOrigin: `${x}px ${y}px` }}
                          />
                        )}
                      </AnimatePresence>
                      <motion.text
                        x={x} y={y + 26}
                        textAnchor="middle"
                        fontSize="9.5"
                        animate={{
                          fontWeight: isFocused ? 700 : 500,
                          fill: isFocused ? cfg.accentColor : "rgba(255,255,255,0.6)",
                        }}
                        transition={{ duration: 0.3 }}
                        className="pointer-events-none select-none"
                      >
                        {dept.label}
                      </motion.text>
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
        </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SOCIAL PROOF CLIENT LOGOS */}
      {/* ============================================================ */}
      <section className="py-12 border-y border-black/5 bg-white/50 text-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 space-y-6">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Leading founders build with Automyte
          </span>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex items-center gap-16 text-slate-600 font-serif font-bold text-lg w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              {[...socialProofCompanies, ...socialProofCompanies].map((c, i) => (
                <span key={`${c}-${i}`} className="hover:text-black transition-colors cursor-pointer shrink-0">{c}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* STATISTICS STRIP */}
      {/* ============================================================ */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <Reveal className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="space-y-1.5">
              <div className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A]">
                {s.prefix}
                <AnimatedCounter
                  to={s.to}
                  format={(n) =>
                    Number.isInteger(s.to) ? Math.round(n).toLocaleString() : n.toFixed(1)
                  }
                />
                {s.suffix}
              </div>
              <p className="text-xs text-slate-500 leading-snug max-w-[16ch] mx-auto">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/* HOW TO SECTION (TABBED PHASES) */}
      {/* ============================================================ */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A]">
            From business plan to production deployment
          </h2>
          <p className="text-slate-600 text-sm">Four structured phases executed completely by your AI executive team.</p>
        </motion.div>

        {/* Tabbed Interactive Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="lg:col-span-5 space-y-4"
          >
            {howToSteps.map((step, idx) => (
              <motion.div
                key={step.tag}
                variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveStep(idx)}
                whileHover={{ x: activeStep === idx ? 0 : 3 }}
                className={`automyte-card p-6 rounded-2xl border cursor-pointer space-y-2 ${
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
              </motion.div>
            ))}
          </motion.div>

          {/* Right Code/Preview Box */}
          <div className="lg:col-span-7 bg-[#16161C] text-white p-8 rounded-3xl space-y-4 shadow-xl border border-white/10 font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={howToSteps[activeStep].previewTitle}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.25 }}
                  className="text-amber-400 font-bold"
                >
                  {howToSteps[activeStep].previewTitle}
                </motion.span>
              </AnimatePresence>
              <span className="text-slate-500 text-[10px]">EXECUTION LOG</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.pre
                key={howToSteps[activeStep].previewCode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap p-4 bg-[#0E0E12] rounded-xl border border-white/5"
              >
                {howToSteps[activeStep].previewCode}
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER */}
      {/* ============================================================ */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="py-12 border-t border-black/5 bg-white text-center text-xs text-slate-500 space-y-4"
      >
        <div className="flex items-center justify-center gap-6">
          <Link href="/onboarding" className="hover:text-black">Run a company</Link>
          <Link href="/canvas" className="hover:text-black">Canvas</Link>
          <Link href="/pricing" className="hover:text-black">Pricing</Link>
        </div>
        <p>© {new Date().getFullYear()} Automyte AI Inc. All rights reserved.</p>
      </motion.footer>
      </div>
    </SmoothScrollProvider>
  );
}
