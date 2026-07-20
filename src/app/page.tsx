"use client";

/* ============================================================
   AUTOMYTE AI v2.0 — Cofounder.co Landing Page
   ============================================================ */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, CheckCircle2, ChevronRight, Sparkles, Shield, Cpu, Zap, Target, Users, LineChart } from "lucide-react";

/* ============================================================
   Automyte AI Landing Page
   Premium Cream/Warm Redesign - Matches cofounder.co aesthetic
   ============================================================ */

const departments = [
  { label: "Engineering", angle: 0, desc: "Kai coordinates code & infrastructure" },
  { label: "Sales", angle: 45, desc: "Ryan automates cold outreach & pipeline" },
  { label: "Marketing", angle: 90, desc: "Aria drives content & growth campaigns" },
  { label: "Design", angle: 135, desc: "Luna creates beautiful brands & UI" },
  { label: "Finance", angle: 180, desc: "Sam models runway & forecasts growth" },
  { label: "Operations", angle: 225, desc: "Devon automates tools & workflows" },
  { label: "Legal", angle: 270, desc: "Morgan drafts contracts & compliance" },
  { label: "Support", angle: 315, desc: "Jamie handles tickets & client inquiries" },
];

const howToSteps = [
  {
    tag: "Start",
    href: "/how-to/start",
    title: "Describe your company",
    description: "Brief our AI executive on your vision and goals. We automatically build a customized business roadmap and draft your founding charter.",
    icon: <Zap className="w-5 h-5 text-accent-hover" />,
    previewTitle: "Executive Briefing",
    previewCode: `{\n  "company_name": "NextGen SaaS",\n  "model": "B2B Subscription",\n  "target_audience": "Developer Tools",\n  "roadmap": ["Legal Charter", "Design Brand Kit", "MVP Scaffolding"]\n}`
  },
  {
    tag: "Build",
    href: "/how-to/build",
    title: "Agents build your systems",
    description: "Engineering and design agents scaffold your codebase, configure Supabase tables, and wire up deploy pipelines to Vercel.",
    icon: <Target className="w-5 h-5 text-accent-hover" />,
    previewTitle: "Automated Deployments",
    previewCode: `CREATE TABLE users (\n  id UUID PRIMARY KEY,\n  email TEXT UNIQUE,\n  created_at TIMESTAMP WITH TIME ZONE\n);\n-- Vercel deployment: SUCCESS (2.1s)`
  },
  {
    tag: "Sell",
    href: "/how-to/sell",
    title: "Reach your customers",
    description: "Sales and marketing agents build targeted outbound lists, write automated email sequences, and generate marketing copy.",
    icon: <Users className="w-5 h-5 text-accent-hover" />,
    previewTitle: "Outreach Campaign",
    previewCode: `Subject: Elevating developer workflows\nTo: engineering-leads@target.com\nBody: I noticed you're scaling your team. Automyte helps...\nStatus: 42% reply rate`
  },
  {
    tag: "Scale",
    href: "/how-to/scale",
    title: "Optimize and grow",
    description: "Finance, operations, and analytics agents monitor live dashboard metrics, forecast cash runway, and suggest growth levers.",
    icon: <LineChart className="w-5 h-5 text-accent-hover" />,
    previewTitle: "Runway & Growth Models",
    previewCode: `Monthly Recurring Revenue: $42,500 (+12% MoM)\nCash Runway: 18.4 months\nBurn Rate: $8,200/mo\nRecommendation: Scale Sales Outbound`
  },
];

const socialProofCompanies = ["ActiveGraph", "Veery", "LearnPath", "Valence OS"];

// ---- Canvas background particles (Charcoal particles on Cream background) ----
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; alpha: number }> = [];
    const count = 50;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.25 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Soft dark charcoal particles
        ctx.fillStyle = `rgba(26,26,26,${p.alpha * 0.45})`;
        ctx.fill();
      }
      
      // Draw delicate connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(26,26,26,${0.05 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ---- Orchestration SVG Diagram ----
function OrchestrationDiagram() {
  const cx = 260;
  const cy = 260;
  const radius = 190;
  const innerRadius = 55;
  const [activeDept, setActiveDept] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDept((prev) => (prev === null ? 0 : (prev + 1) % departments.length));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto">
      <svg viewBox="0 0 520 520" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={radius} stroke="rgba(32,32,32,0.06)" strokeWidth="1" />

        {/* Inner circle bounds */}
        <circle cx={cx} cy={cy} r={innerRadius + 20} stroke="rgba(32,32,32,0.03)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Lines and Nodes */}
        {departments.map((dept, index) => {
          const rad = (dept.angle * Math.PI) / 180;
          const outerX = cx + radius * Math.cos(rad - Math.PI / 2);
          const outerY = cy + radius * Math.sin(rad - Math.PI / 2);
          const innerX = cx + innerRadius * Math.cos(rad - Math.PI / 2);
          const innerY = cy + innerRadius * Math.sin(rad - Math.PI / 2);
          const isActive = activeDept === index;

          return (
            <g key={dept.label} className="transition-all duration-500">
              {/* Connector line */}
              <line
                x1={innerX} y1={innerY}
                x2={outerX} y2={outerY}
                stroke={isActive ? "rgba(242,183,5,0.4)" : "rgba(32,32,32,0.08)"}
                strokeWidth={isActive ? "1.5" : "1"}
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              {/* Inner node dot */}
              <circle cx={innerX} cy={innerY} r="2.5" fill="#F5F5F2" stroke="rgba(32,32,32,0.12)" strokeWidth="0.5" />
              
              {/* Outer department node */}
              <circle 
                cx={outerX} 
                cy={outerY} 
                r={isActive ? "12" : "8"} 
                fill={isActive ? "#FFFFFF" : "#F5F5F2"} 
                stroke={isActive ? "#F2B705" : "rgba(32,32,32,0.15)"} 
                strokeWidth={isActive ? "2" : "1"}
                className="transition-all duration-300"
              />
              
              {/* Status pulse for active agent */}
              {isActive && (
                <circle 
                  cx={outerX} 
                  cy={outerY} 
                  r="18" 
                  stroke="rgba(242,183,5,0.2)" 
                  strokeWidth="1"
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}

        {/* Core Orchestrator Hub */}
        <circle cx={cx} cy={cy} r={innerRadius} fill="#FFFFFF" stroke="rgba(32,32,32,0.1)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={innerRadius - 8} fill="#FBFBF8" stroke="rgba(32,32,32,0.04)" strokeWidth="0.5" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1A1A1A" letterSpacing="0.06em">AUTOMYTE</text>
        <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7" fontWeight="500" fill="rgba(32,32,32,0.45)" letterSpacing="0.05em">CORE</text>

        {/* Labels positioned cleanly outside */}
        {departments.map((dept, index) => {
          const rad = (dept.angle * Math.PI) / 180;
          const labelRadius = radius + 32;
          const lx = cx + labelRadius * Math.cos(rad - Math.PI / 2);
          const ly = cy + labelRadius * Math.sin(rad - Math.PI / 2);
          const isActive = activeDept === index;

          return (
            <text
              key={dept.label}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="10"
              fontWeight={isActive ? "600" : "500"}
              fill={isActive ? "#1A1A1A" : "rgba(32,32,32,0.45)"}
              letterSpacing="0.03em"
              className="transition-colors duration-300"
            >
              {dept.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-surface select-none">
      
      {/* ===== PREMIUM HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 z-[201] bg-surface/80 backdrop-blur-md border-b border-border-subtle">
        <div className="w-full max-w-[1200px] mx-auto px-6 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-ink flex items-center justify-center">
              <span className="text-surface-raised text-sm font-bold">A</span>
            </div>
            <span className="text-[20px] font-semibold tracking-tight text-ink">Automyte</span>
          </Link>

          {/* Navigation Pill Group */}
          <nav className="hidden md:flex items-center gap-4">
            <div className="relative flex items-center bg-surface-card border border-border-subtle rounded-full px-2 py-1 gap-1">
              <span className="text-[13px] text-ink-secondary px-3 py-1 pointer-events-none font-medium">How to</span>
              {howToSteps.map((step) => (
                <Link 
                  key={step.tag} 
                  href={step.href} 
                  className="text-[13px] text-ink hover:text-accent-hover px-2.5 py-1 rounded-full transition-colors font-medium no-underline"
                >
                  {step.tag}
                </Link>
              ))}
            </div>

            <Link href="/pricing" className="text-[13.5px] font-medium text-ink-secondary hover:text-ink transition-colors no-underline px-2">
              Pricing
            </Link>

            <Link href="/login" className="h-[36px] px-4 rounded-full bg-ink text-ink-inverted flex items-center justify-center text-[13px] font-[500] hover:bg-[#333] transition-colors no-underline">
              Run your company
            </Link>
          </nav>

          {/* Mobile Access */}
          <div className="flex md:hidden">
            <Link href="/login" className="h-[34px] px-3.5 rounded-full bg-ink text-ink-inverted flex items-center justify-center text-[12.5px] font-[500] no-underline">
              Run company
            </Link>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-[120px] pb-24 overflow-hidden border-b border-border-subtle bg-surface-raised">
        <HeroCanvas />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero left content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-subtle border border-accent/20">
              <Sparkles className="w-3.5 h-3.5 text-accent-hover" />
              <span className="text-[11px] font-semibold text-ink-secondary uppercase tracking-wider">The Autonomous Operating System</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-[110%]">
              Run an entire company with <span className="bg-gradient-to-r from-ink to-ink-secondary bg-clip-text text-transparent">AI Executives</span>
            </h1>
            
            <p className="text-lg text-ink-secondary font-[420] leading-relaxed max-w-xl">
              Automyte replaces organizational overhead with specialized, collaborating AI agents that draft charters, write and deploy code, coordinate sales campaigns, and manage runway.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/login" 
                className="inline-flex h-12 items-center justify-center px-6 rounded-full bg-ink text-ink-inverted text-[14px] font-[500] hover:bg-[#333] transition-all duration-200 no-underline shadow-sm hover:scale-[1.02]"
              >
                Launch your startup
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link 
                href="/pricing" 
                className="inline-flex h-12 items-center justify-center px-6 rounded-full border border-border bg-surface-card hover:bg-surface text-[14px] font-[500] text-ink transition-colors no-underline shadow-sm"
              >
                View Plans
              </Link>
            </div>
            
            {/* Real Stats under hero */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border-subtle max-w-md">
              <div>
                <p className="text-2xl font-bold text-ink">99.9%</p>
                <p className="text-[11px] text-ink-faint uppercase font-medium">Uptime execution</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-ink">10k+</p>
                <p className="text-[11px] text-ink-faint uppercase font-medium">Active projects</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-ink">3 Weeks</p>
                <p className="text-[11px] text-ink-faint uppercase font-medium">Avg MVP shipping</p>
              </div>
            </div>
          </div>

          {/* Hero right - interactive loop diagram */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-6 rounded-3xl bg-surface-card border border-border-subtle shadow-sm w-full max-w-[460px]">
              <OrchestrationDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST / CLIENTS ===== */}
      <section className="py-12 border-b border-border-subtle bg-surface-card">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[12px] font-[500] text-ink-muted uppercase tracking-wider mb-6">
            Leading founders build with Automyte
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 opacity-60">
            {socialProofCompanies.map((name) => (
              <span key={name} className="text-lg font-semibold tracking-tight text-ink/70">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS (TABBED PREVIEW) ===== */}
      <section className="py-24 bg-surface">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              From business plan to production deployment
            </h2>
            <p className="text-ink-secondary mt-3">
              Four structured phases executed completely by your AI executive team.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Step selection buttons */}
            <div className="lg:col-span-5 space-y-4">
              {howToSteps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <div
                    key={step.tag}
                    onClick={() => setActiveStep(index)}
                    className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? "bg-surface-card border-accent-hover shadow-sm" 
                        : "border-transparent hover:bg-surface-card/60"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? "bg-accent-subtle" : "bg-ink/5"}`}>
                        {step.icon}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-accent-hover uppercase tracking-wider">{step.tag}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? "transform translate-x-1" : "opacity-0"}`} />
                        </div>
                        <h3 className="text-[16px] font-[560] text-ink">{step.title}</h3>
                        {isActive && <p className="text-[13px] text-ink-faint leading-relaxed mt-1.5">{step.description}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Simulated interface display based on active step */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-sm min-h-[320px] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  </div>
                  <span className="text-[12px] font-semibold text-ink-secondary font-mono">
                    {howToSteps[activeStep].previewTitle}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <pre className="text-left text-[13px] font-mono text-ink-secondary leading-relaxed overflow-x-auto p-4 bg-surface rounded-lg border border-border-subtle">
                    <code>{howToSteps[activeStep].previewCode}</code>
                  </pre>
                </div>
                <div className="pt-4 border-t border-border-subtle flex justify-end">
                  <Link 
                    href={howToSteps[activeStep].href} 
                    className="inline-flex items-center text-[13px] font-semibold text-ink hover:underline no-underline"
                  >
                    Read full {howToSteps[activeStep].tag} playbook
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PLATFORM CAPABILITIES ===== */}
      <section className="py-24 border-t border-border-subtle bg-surface-raised">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              Built for production startups
            </h2>
            <p className="text-ink-secondary mt-3">
              An ecosystem engineered to handle regulatory, technical, and operational pipelines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface-card p-8 rounded-2xl border border-border-subtle shadow-xs">
              <Shield className="w-8 h-8 text-[#3B82F6] mb-6" />
              <h3 className="text-lg font-semibold text-ink mb-2">Automated Compliance</h3>
              <p className="text-[14px] text-ink-faint leading-relaxed">
                Legal and compliance agents constantly check actions against localized corporate frameworks, drafting real non-disclosure and consulting contracts.
              </p>
            </div>
            <div className="bg-surface-card p-8 rounded-2xl border border-border-subtle shadow-xs">
              <Cpu className="w-8 h-8 text-[#8B5CF6] mb-6" />
              <h3 className="text-lg font-semibold text-ink mb-2">Supabase & Vercel Native</h3>
              <p className="text-[14px] text-ink-faint leading-relaxed">
                No mock actions. Our engineering agents commit production code directly to GitHub, scaffold database relations on Supabase, and push updates live.
              </p>
            </div>
            <div className="bg-surface-card p-8 rounded-2xl border border-border-subtle shadow-xs">
              <Sparkles className="w-8 h-8 text-[#F59E0B] mb-6" />
              <h3 className="text-lg font-semibold text-ink mb-2">Interactive Approvals</h3>
              <p className="text-[14px] text-ink-faint leading-relaxed">
                You retain ultimate authority. Every deployment, contract dispatch, and outbound campaign remains pending in the queue until you click approve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CALL TO ACTION ===== */}
      <section className="py-24 bg-surface border-t border-border-subtle">
        <div className="max-w-[800px] mx-auto px-6 text-center space-y-6">
          <h2 className="text-4xl font-semibold tracking-tight text-ink">
            Launch your company with Automyte AI
          </h2>
          <p className="text-lg text-ink-secondary max-w-lg mx-auto">
            Take your ideas from conception to deployment. Set up your AI executive team today.
          </p>
          <div className="pt-4">
            <Link 
              href="/signup" 
              className="inline-flex h-12 items-center justify-center px-8 rounded-full bg-ink text-ink-inverted text-[14px] font-[500] hover:bg-[#333] transition-all no-underline shadow-sm hover:scale-[1.02]"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-surface-dark text-ink-inverted py-16 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider mb-4">How to</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/how-to/start" className="text-[14px] text-white/70 hover:text-white transition-colors no-underline">Start</Link>
                <Link href="/how-to/build" className="text-[14px] text-white/70 hover:text-white transition-colors no-underline">Build</Link>
                <Link href="/how-to/sell" className="text-[14px] text-white/70 hover:text-white transition-colors no-underline">Sell</Link>
                <Link href="/how-to/scale" className="text-[14px] text-white/70 hover:text-white transition-colors no-underline">Scale</Link>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider mb-4">Product</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/" className="text-[14px] text-white/70 hover:text-white transition-colors no-underline">Homepage</Link>
                <Link href="/pricing" className="text-[14px] text-white/70 hover:text-white transition-colors no-underline">Pricing</Link>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider mb-4">Company</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/privacy" className="text-[14px] text-white/70 hover:text-white transition-colors no-underline">Privacy Policy</Link>
                <Link href="/terms" className="text-[14px] text-white/70 hover:text-white transition-colors no-underline">Terms of Service</Link>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[14px] text-white/60 leading-relaxed">
                Automyte is an autonomous AI company operating system for founders.
              </p>
              <Link href="/signup" className="inline-flex h-[36px] px-4 rounded-full bg-white text-surface-dark items-center justify-center text-[13px] font-[500] hover:bg-white/95 transition-colors no-underline">
                Get Started
              </Link>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-6 flex items-center justify-between text-[12px] text-white/40">
            <span>Copyright © {new Date().getFullYear()} Automyte AI.</span>
            <span>Kishore V - Automyte CEO</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
