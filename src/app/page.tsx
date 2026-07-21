"use client";

/* ============================================================
   AUTOMYTE AI — Landing Page
   ============================================================ */

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause } from "lucide-react";
import { FocusModePanel } from "@/components/canvas/focus-mode-panel";
import {
  DepartmentId,
  DEFAULT_FOCUS_AGENTS,
  SAMPLE_TASKS_BY_DEPT,
  DEPARTMENT_CONFIGS
} from "@/types/focus-mode";
import { LoadingScreen } from "@/components/landing/loading-screen";
import { SmoothScrollProvider } from "@/components/landing/smooth-scroll-provider";
import { AnimatedCounter } from "@/components/landing/animated-counter";

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
    tag: "Describe",
    title: "Describe your company",
    description: "Brief your AI executive on your vision and goals. We automatically build a customized business roadmap and draft your founding charter.",
    icon: "description",
    previewTitle: "Executive Briefing",
    previewCode: `{
  "company_name": "Automyte SaaS",
  "model": "B2B Subscription",
  "target_audience": "Developer & Ops Tools",
  "roadmap": [
    "Legal Charter",
    "Design Brand Kit",
    "MVP Scaffolding"
  ]
}`
  },
  {
    tag: "Build",
    title: "Agents build your systems",
    description: "Engineering and design agents scaffold your codebase, configure Supabase tables, and wire up deploy pipelines to Vercel.",
    icon: "memory",
    previewTitle: "Automated Systems Scaffolding",
    previewCode: `{
  "agent": "Engineering Lead (Alex)",
  "database": "Supabase PostgreSQL",
  "pipeline": "Vercel Continuous Integration",
  "status": "BUILD_SUCCESSFUL",
  "services_provisioned": [
    "Auth & JWT Middleware",
    "Agent State Sync API",
    "Stripe Subscription Webhooks"
  ]
}`
  },
  {
    tag: "Reach",
    title: "Reach your customers",
    description: "Sales and marketing agents build targeted outbound lists, write automated email sequences, and generate marketing copy.",
    icon: "campaign",
    previewTitle: "Outbound Growth Engine",
    previewCode: `{
  "agent": "Sales Director (Marcus)",
  "campaign": "Tech Founders Outbound",
  "target_prospects": 1420,
  "metrics": {
    "deliverability": "99.4%",
    "open_rate": "68.2%",
    "reply_rate": "42.0%"
  }
}`
  },
  {
    tag: "Optimize",
    title: "Optimize and grow",
    description: "Finance, operations, and analytics agents monitor live dashboard metrics, forecast cash runway, and suggest growth levers.",
    icon: "trending_up",
    previewTitle: "Executive Operations & Runway",
    previewCode: `{
  "mrr": "$42,500 (+12% MoM)",
  "cash_runway": "18.4 months",
  "burn_rate": "$8,200/mo",
  "forecast": "Profitable within 4.2 months",
  "recommended_action": "Scale outbound sales capacity"
}`
  },
];

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);

  // Focus Mode Demo State
  const [heroFocusedDept, setHeroFocusedDept] = useState<DepartmentId>("engineering");
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

  // Auto-cycle through departments every 5 seconds
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

  // Mousemove parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const targets = document.querySelectorAll<HTMLElement>('.parallax-target');
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      targets.forEach((el, index) => {
        const factor = (index + 1) * 0.4;
        el.style.setProperty('--tx', `${x * factor}px`);
        el.style.setProperty('--ty', `${y * factor}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Reveal on scroll IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  const activeHeroAgent = DEFAULT_FOCUS_AGENTS[heroFocusedDept] || DEFAULT_FOCUS_AGENTS.engineering;
  const activeHeroTask = SAMPLE_TASKS_BY_DEPT[heroFocusedDept]?.working || SAMPLE_TASKS_BY_DEPT.engineering.working;

  return (
    <SmoothScrollProvider>
      <LoadingScreen onDone={() => setLoading(false)} />
      <div
        className={`antialiased min-h-screen flex flex-col font-body-md text-body-md text-on-background bg-background selection:bg-secondary-container selection:text-on-secondary-container transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto bg-background/80 dark:bg-background/80 backdrop-blur-md border-b border-border-subtle dark:border-outline-variant flat no shadows">
          <Link className="text-body-lg font-display-hero font-bold text-primary dark:text-on-primary-fixed" href="/">
            Automyte
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-primary-fixed transition-colors" href="/how-to/start">
              How to
            </Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-primary-fixed transition-colors" href="/resources">
              Resources
            </Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-primary-fixed transition-colors" href="/pricing">
              Pricing
            </Link>
          </div>
          <Link className="font-label-sm text-label-sm bg-primary text-on-primary px-4 py-2 rounded font-medium hover:bg-surface-tint transition-colors" href="/onboarding">
            Run a company
          </Link>
        </nav>

        <main className="flex-grow pt-24">
          {/* Hero Section */}
          <section className="relative w-full py-section-v-desktop overflow-hidden bg-surface-container-lowest">
            {/* Decorative Clouds */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 flex justify-between items-start pt-12">
              <div className="w-1/3 max-w-[400px]">
                <img
                  alt=""
                  aria-hidden="true"
                  className="w-full h-auto object-contain object-left-top animate-float-slow"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLvwzcYsSgGUbnBb6ECkind0vDztJ9YfLEXLZLG6mhFh7aam0fMj40quamEt6iQOBx3VfL_sRc1iEDs_2cKpf22ngH-MJAYTolLapYcQ98cXdqNx2rbry_ay4XDOVcaww50I4250oDopHNKEwtltffJGmNym1wPyzgz5Y9djdeL2K7gvfgLFUtjJaexF1nDmn4WaDPRi3LDebXFq-J8wWYasAWiMrm5AH_yFcEfO6gDcpmh7PRagM1clNA"
                />
              </div>
              <div className="w-1/3 max-w-[400px]">
                <img
                  alt=""
                  aria-hidden="true"
                  className="w-full h-auto object-contain object-right-top animate-float-slow animate-float-slower"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLu5moWawPsrIh4o97opik1eaV_zenYo43h6MTIQSjZJBGwwzHpkSykKSX2PlJtVRrrGDZ8vJsGJwMlsc_7cscjtyGHRIcwYBo7B-B1toj36eEUKpTca1RwBuhVXC3iiAOC4qcinoA4r7FKbOKvxOJMNXaErp3d56v7pfKwOBGLk6yurB3ZOF8s39EntLPN4udi4OBRXnBbrNuEYeVRe_pDZ1WIjr1rrNsy2LCfANe3UqNqip56u8GzUOXA"
                />
              </div>
            </div>

            <div className="max-w-container-max mx-auto px-gutter relative z-10 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface mb-8 text-sm font-medium parallax-target">
                <span className="text-xl">🌻</span> over 10,000 companies are running on Automyte
              </div>
              <h1 className="font-display-hero text-display-hero text-primary max-w-5xl mx-auto mb-4 parallax-target">
                Automyte is an agent orchestration platform
              </h1>
              <p className="font-headline-md text-headline-md text-primary max-w-4xl mx-auto mb-6 parallax-target opacity-75">
                designed to help you run an entire business
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto mb-10 parallax-target">
                Brief your AI cofounder, scaffold your product codebase, launch outbound sales campaigns, and scale your operations with single-agent <strong>Focus Mode</strong> clarity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  className="font-label-sm text-label-sm bg-primary text-on-primary px-8 py-4 rounded font-medium hover:bg-surface-tint shadow-lg hover:scale-105 hover:brightness-110 transition-all"
                  href="/onboarding"
                >
                  Run a company
                </Link>
                <Link
                  className="font-label-sm text-label-sm bg-transparent border border-primary text-primary px-8 py-4 rounded font-medium hover:bg-surface-muted hover:scale-105 hover:brightness-110 transition-all"
                  href="/canvas?demo=true"
                >
                  Explore workspace canvas →
                </Link>
              </div>

              {/* Interactive Focus Mode Workspace Canvas Mockup */}
              <div className="bg-[#1a1a1a] rounded-2xl p-4 sm:p-8 border border-border-subtle shadow-2xl w-full max-w-5xl text-left">
                <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] pb-4 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                    <div className="w-3 h-3 rounded-full bg-success-leaf"></div>
                    <div className="ml-4 font-label-xs text-label-xs text-outline-variant">
                      app.automyte.ai/canvas — Focus Mode Live Preview
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAutoCycling(!isAutoCycling)}
                    className="px-3 py-1 rounded bg-white/10 hover:bg-white/15 text-xs text-slate-200 flex items-center gap-1.5 transition-colors border-0 cursor-pointer"
                  >
                    {isAutoCycling ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                    <span>{isAutoCycling ? "Auto-cycling" : "Paused"}</span>
                  </button>
                </div>

                {/* Node Orbit & Focus Mode Live Panel */}
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  {/* Left SVG Node Orbit */}
                  <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-6 bg-[#161620] rounded-2xl border border-white/10">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-label-xs">
                      Click any agent node to focus
                    </div>
                    <svg viewBox="0 0 440 440" className="w-full max-w-md aspect-square">
                      <motion.circle
                        cx="220" cy="220" r="140"
                        stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" fill="none"
                        style={{ transformOrigin: "220px 220px" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                      />
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
                      <g>
                        <circle cx="220" cy="220" r="38" fill="#1E1E2A" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                        <text x="220" y="214" textAnchor="middle" fontSize="16">🌻</text>
                        <text x="220" y="232" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#FFFFFF" letterSpacing="0.05em">AUTOMYTE</text>
                      </g>
                    </svg>

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
                            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all border cursor-pointer font-label-xs ${
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

                  {/* Right Live Panel */}
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
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 px-gutter max-w-container-max mx-auto border-t border-border-subtle">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {s.prefix}
                    <AnimatedCounter
                      to={s.to}
                      format={(n) =>
                        Number.isInteger(s.to) ? Math.round(n).toLocaleString() : n.toFixed(1)
                      }
                    />
                    {s.suffix}
                  </div>
                  <div className="text-sm text-on-surface-variant">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Features Overview Section */}
          <section className="py-16 px-gutter max-w-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
                  From business plan to production deployment
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                  Four structured phases executed completely by your AI executive team.
                </p>
                <div className="space-y-6">
                  {howToSteps.map((step, idx) => {
                    const isSelected = activeStep === idx;
                    return (
                      <div
                        key={step.tag}
                        onClick={() => setActiveStep(idx)}
                        className={`p-6 border rounded-lg cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-surface-container-lowest shadow-md -translate-y-0.5"
                            : "border-border-subtle bg-surface-container-low hover:-translate-y-1 hover:shadow-sm"
                        }`}
                      >
                        <h3 className="font-headline-md text-lg text-primary mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary">{step.icon}</span>
                          {step.title}
                        </h3>
                        <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Code Display */}
              <div className="bg-surface-container rounded-2xl p-8 border border-border-subtle shadow-2xl sticky top-32">
                <div className="flex justify-between items-center mb-6 border-b border-border-subtle pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                    <div className="w-3 h-3 rounded-full bg-success-leaf"></div>
                    <span className="ml-4 text-yellow-500 font-label-xs text-xs font-bold tracking-wider">
                      {howToSteps[activeStep].previewTitle}
                    </span>
                  </div>
                  <span className="text-on-surface-variant font-label-xs text-xs tracking-wider">EXECUTION LOG</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={activeStep}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="font-label-xs text-sm text-on-surface leading-relaxed overflow-x-auto whitespace-pre-wrap"
                  >
                    <code>{howToSteps[activeStep].previewCode}</code>
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Guides Section */}
          <section className="py-section-v-desktop px-gutter max-w-container-max mx-auto bg-surface-muted rounded-2xl my-8">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Learn how to start a company</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                Read the guide, then let Automyte turn each step into a roadmap, tasks, and agents.
              </p>
              <Link className="font-label-sm text-label-sm bg-primary text-on-primary px-6 py-3 rounded font-medium hover:bg-surface-tint transition-colors inline-block" href="/onboarding">
                Put the guide to work
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Chapter 1 */}
              <Link
                className="group block border border-border-subtle rounded-xl bg-surface overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all reveal-on-scroll"
                href="/how-to/start"
                style={{ transitionDelay: '100ms' }}
              >
                <div className="p-6 pb-0">
                  <div className="font-label-xs text-label-xs text-on-surface-variant mb-2">Phase 1</div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-4">Describe</h3>
                </div>
                <div className="aspect-[1.23] bg-surface-container-low m-4 rounded overflow-hidden relative">
                  <img
                    alt="Phase 1 Describe"
                    aria-hidden="true"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8FnKVaIh9hkzr1rBmSvF1UEQPV-IOTsZUJPPZHfulcztk9kZUs8jdG7pUnQVa9eN1JoIJ1-ZhYDHfaNU3d31aj0XlysZC4H-EU1sKSVMZnKeXyoN8mV6AMWKvALjF95K2x99sVKhfbautK92DcqoDaudrDwoKnaN37ZgNrxA60PHHsscRijbyX0WeoSeVfAxuCMexsp_QgQd1rwaM0LPGMtq8X-pHqLNrAJNizS6Vmy30MsOYRowS"
                  />
                </div>
                <div className="p-4 border-t border-border-subtle bg-surface-container-lowest text-center">
                  <span className="font-label-xs text-label-xs text-on-surface-variant group-hover:text-primary transition-colors">Read this chapter</span>
                </div>
              </Link>

              {/* Chapter 2 */}
              <Link
                className="group block border border-border-subtle rounded-xl bg-surface overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all reveal-on-scroll"
                href="/how-to/build"
                style={{ transitionDelay: '200ms' }}
              >
                <div className="p-6 pb-0">
                  <div className="font-label-xs text-label-xs text-on-surface-variant mb-2">Phase 2</div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-4">Build</h3>
                </div>
                <div className="aspect-[1.23] bg-surface-container-low m-4 rounded overflow-hidden relative">
                  <img
                    alt="Phase 2 Build"
                    aria-hidden="true"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIjNHWTjNXmlNNocTz82eBsqZSyCHbITvdRwa5kiT2_LY9nqo9KTWyx8OsM9w1Ie7oCZwt9S2w9NetdGxiuXCm2dd79zWQz_ogVR_pgf8MQEI7IjOIpCx42ApR0eU9Cn6hgduyovalgs5RDNC8zUlY78INqdqT2VBxrNBugaxsv36sJIn_lP-4OLsiWbtomGZKNZDfKkI8p7S7Fs1LI7ghenqvRwQsJBNpTrXVA9J7w_Pwe2KHYexs"
                  />
                </div>
                <div className="p-4 border-t border-border-subtle bg-surface-container-lowest text-center">
                  <span className="font-label-xs text-label-xs text-on-surface-variant group-hover:text-primary transition-colors">Read this chapter</span>
                </div>
              </Link>

              {/* Chapter 3 */}
              <Link
                className="group block border border-border-subtle rounded-xl bg-surface overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all reveal-on-scroll"
                href="/how-to/sell"
                style={{ transitionDelay: '300ms' }}
              >
                <div className="p-6 pb-0">
                  <div className="font-label-xs text-label-xs text-on-surface-variant mb-2">Phase 3</div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-4">Reach</h3>
                </div>
                <div className="aspect-[1.23] bg-surface-container-low m-4 rounded overflow-hidden relative">
                  <img
                    alt="Phase 3 Reach"
                    aria-hidden="true"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpQjMI9h23dZZclPIIiDLo60Aj6fGS-3UrvZ0cvmYTwLxFfo3edeGH2iAxz0usQqQp2AhiwbOSOCDa0EtVApSOALqtyTHouejuM2PB-Lp1K7-bGqoBdrewizNAP_NzSYKEhbpmadoLFh-lpCkwh_06ZRpXUJ-6hbm-xV8ks4VL1hz-lQ_wBZdjN8Y5fRokaAMSN5xxsCe56oVJmJyf375In50V0_tT9JDLQvuQMyO12BvLUcGHBzUk"
                  />
                </div>
                <div className="p-4 border-t border-border-subtle bg-surface-container-lowest text-center">
                  <span className="font-label-xs text-label-xs text-on-surface-variant group-hover:text-primary transition-colors">Read this chapter</span>
                </div>
              </Link>

              {/* Chapter 4 */}
              <Link
                className="group block border border-border-subtle rounded-xl bg-surface overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all reveal-on-scroll"
                href="/how-to/scale"
                style={{ transitionDelay: '400ms' }}
              >
                <div className="p-6 pb-0">
                  <div className="font-label-xs text-label-xs text-on-surface-variant mb-2">Phase 4</div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-4">Optimize</h3>
                </div>
                <div className="aspect-[1.23] bg-surface-container-low m-4 rounded overflow-hidden relative">
                  <img
                    alt="Phase 4 Optimize"
                    aria-hidden="true"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbcvOlZzh6AhgMNPDMPFLTwrVgji_EbO5jeyTufTWeSFeBypsVdWUmNSj_6qWiZ8MBamvXMfW6z2bNkVzTWGD0B8u0qsC_hzBMvflz0c6nZCDm37RYlJQm6PHGw4LBlHjOX8wfRNv-qfFUo7yhyJxeoLjm8Tx6ixxBTy2Isae8Gf2VEQIuqL92bnDXq2eQ1AwNEcTMhRs0R1EE_xPNHM9hZ9gTQRYfPduPAcfyphq8pKhC4jW64H_"
                  />
                </div>
                <div className="p-4 border-t border-border-subtle bg-surface-container-lowest text-center">
                  <span className="font-label-xs text-label-xs text-on-surface-variant group-hover:text-primary transition-colors">Read this chapter</span>
                </div>
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full py-section-v-desktop px-gutter flex flex-col md:flex-row justify-between max-w-container-max mx-auto bg-surface-container-low dark:bg-surface-container-highest border-t border-subtle dark:border-outline-variant flat no shadows relative overflow-hidden">
          {/* Background landscape */}
          <div className="absolute bottom-0 left-0 w-full h-auto pointer-events-none opacity-20 z-0">
            <img
              alt=""
              aria-hidden="true"
              className="w-full h-auto object-cover object-bottom"
              src="https://lh3.googleusercontent.com/aida/AP1WRLuRr99PF8CMi7nujWB65uPnskH-dh7hj4Rj2_8fANjAkbaMSGeB6ultUKXvCpfuYGSGBErUEk7mChTRF3zDJUeQHb5E-fs-M1cnTsqS3AuircshM544PBmacjYYAQ7w_agZCawf-8PHPoP3cDzxlJouDBhFizKKDNtwBbkNjHd-0n4p_Y24VdFkhiRHIq8VJ6WrSt8s71i3kTLYBV9QgVjEmgdMlPn5YenIpTEOi77-2SwX84wUT8j8xis"
            />
          </div>
          <div className="relative z-10 w-full flex flex-col md:flex-row justify-between gap-12">
            <div className="flex flex-col gap-6 max-w-sm">
              <Link className="font-display-hero text-body-lg font-bold text-primary dark:text-on-primary-fixed" href="/">
                Automyte
              </Link>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Automyte is an agent orchestration platform designed to run an entire business.
              </p>
              <div className="font-label-xs text-label-xs text-on-surface-variant">
                © 2026 Automyte AI Inc. All rights reserved.
              </div>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-8">
              <div className="flex flex-col gap-3">
                <span className="font-label-sm text-label-sm font-bold text-primary">Product</span>
                <Link className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="/">
                  Homepage
                </Link>
                <Link className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="/resources">
                  Resources
                </Link>
                <Link className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="/pricing">
                  Pricing
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-label-sm text-label-sm font-bold text-primary">Company</span>
                <Link className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="/how-to/start">
                  How-To Guide
                </Link>
                <Link className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="/privacy">
                  Privacy Policy
                </Link>
                <Link className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="/terms">
                  Terms of Service
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-label-sm text-label-sm font-bold text-primary">Connect</span>
                <Link className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="/how-to/build">
                  Docs
                </Link>
                <a className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="https://x.com/" target="_blank" rel="noreferrer">
                  Twitter
                </a>
                <a className="font-label-xs text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  );
}
