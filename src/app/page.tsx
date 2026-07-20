"use client";

/* ============================================================
   AUTOMYTE AI v2.0 — Cofounder.co Landing Page
   ============================================================ */

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Zap, Target, Users, LineChart, Sparkles, Check } from "lucide-react";

const departments = [
  { label: "Engineering", angle: 0 },
  { label: "Sales", angle: 45 },
  { label: "Marketing", angle: 90 },
  { label: "Design", angle: 135 },
  { label: "Finance", angle: 180 },
  { label: "Operations", angle: 225 },
  { label: "Legal", angle: 270 },
  { label: "Support", angle: 315 },
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
          Brief your AI cofounder, scaffold your product codebase, launch outbound sales campaigns, and scale your operations from a single unified canvas.
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
      {/* HERO CANVAS MOCKUP DEMO WINDOW */}
      {/* ============================================================ */}
      <section className="px-6 pb-24 max-w-6xl mx-auto w-full">
        <div className="bg-white border border-black/10 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
          {/* Mockup Top Window Bar */}
          <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-4 font-mono text-[11px] text-slate-600">app.automyte.ai/canvas</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Z 60%</span>
              <span>📁 Q</span>
            </div>
          </div>

          {/* Grid Layout inside Mockup Window */}
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[420px]">
            {/* Left Canvas Node Orbit Diagram */}
            <div className="lg:col-span-7 relative flex items-center justify-center p-8 bg-[#FAF9F6] rounded-2xl border border-black/5">
              <svg viewBox="0 0 440 440" className="w-full max-w-md aspect-square">
                {/* Outer Orbit Circle */}
                <circle cx="220" cy="220" r="140" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="3 3" fill="none" />

                {/* Orbit Lines & Nodes */}
                {departments.map((dept, i) => {
                  const rad = (dept.angle * Math.PI) / 180;
                  const x = 220 + 140 * Math.cos(rad - Math.PI / 2);
                  const y = 220 + 140 * Math.sin(rad - Math.PI / 2);
                  return (
                    <g key={dept.label}>
                      <line x1="220" y1="220" x2={x} y2={y} stroke="rgba(0,0,0,0.08)" strokeDasharray="3 3" />
                      <circle cx={x} cy={y} r="10" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                      <text x={x} y={y + 22} textAnchor="middle" fontSize="9" fontWeight="600" fill="#444444">
                        {dept.label}
                      </text>
                    </g>
                  );
                })}

                {/* Center Node */}
                <g>
                  <rect x="170" y="195" width="100" height="50" rx="14" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" />
                  <text x="220" y="214" textAnchor="middle" fontSize="14">🌻</text>
                  <text x="220" y="232" textAnchor="middle" fontSize="11" fontStyle="italic" fontFamily="Georgia, serif" fill="#1A1A1A">Automyte</text>
                </g>
              </svg>
            </div>

            {/* Right Panel Tabbed Preview */}
            <div className="lg:col-span-5 bg-[#181820] text-white p-6 rounded-2xl space-y-6 shadow-lg">
              {/* Header Tabs */}
              <div className="flex border-b border-white/10 pb-3 gap-4 text-xs font-semibold text-slate-400">
                <span className="text-white border-b-2 border-amber-400 pb-2">Home</span>
                <span>Company</span>
                <span>Cofounder</span>
                <span>Tasks</span>
                <span>Library</span>
              </div>

              {/* Home Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-white">Good morning, Founder</h3>
                <p className="text-xs text-slate-400">Welcome back to your operational control center</p>
              </div>
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
