"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useState } from "react";
import { howToData, HowToStepItem } from "@/lib/how-to-data";
import {
  Zap,
  Target,
  Users,
  LineChart,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";

const iconMap = {
  Zap: <Zap className="w-6 h-6 text-amber-500" />,
  Target: <Target className="w-6 h-6 text-amber-500" />,
  Users: <Users className="w-6 h-6 text-amber-500" />,
  LineChart: <LineChart className="w-6 h-6 text-amber-500" />,
};

export default function HowToPage() {
  const params = useParams();
  const slug = (params.slug as string)?.toLowerCase();

  const chapter = howToData[slug];

  const [activeStepId, setActiveStepId] = useState<string>(
    chapter?.steps[0]?.id || "introduction"
  );
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  if (!chapter) {
    notFound();
  }

  const activeStep: HowToStepItem =
    chapter.steps.find((s) => s.id === activeStepId) || chapter.steps[0];

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#1A1A1A] font-sans flex flex-col selection:bg-amber-200 selection:text-black">
      {/* ============================================================ */}
      {/* HEADER NAVIGATION */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-serif font-semibold tracking-tight text-[#1A1A1A] no-underline"
          >
            <span>Automyte</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center bg-white/80 border border-black/10 rounded-full px-3 py-1.5 gap-2 text-xs font-medium shadow-xs">
              <span className="text-slate-400 font-semibold pl-1">How to</span>
              <span className="text-slate-300">|</span>
              <Link
                href="/how-to/start"
                className={`px-3 py-1 rounded-full transition-all no-underline ${
                  slug === "start"
                    ? "bg-[#1A1A1A] text-white font-bold"
                    : "text-slate-600 hover:text-black"
                }`}
              >
                Start
              </Link>
              <Link
                href="/how-to/build"
                className={`px-3 py-1 rounded-full transition-all no-underline ${
                  slug === "build"
                    ? "bg-[#1A1A1A] text-white font-bold"
                    : "text-slate-600 hover:text-black"
                }`}
              >
                Build
              </Link>
              <Link
                href="/how-to/sell"
                className={`px-3 py-1 rounded-full transition-all no-underline ${
                  slug === "sell"
                    ? "bg-[#1A1A1A] text-white font-bold"
                    : "text-slate-600 hover:text-black"
                }`}
              >
                Sell
              </Link>
              <Link
                href="/how-to/scale"
                className={`px-3 py-1 rounded-full transition-all no-underline ${
                  slug === "scale"
                    ? "bg-[#1A1A1A] text-white font-bold"
                    : "text-slate-600 hover:text-black"
                }`}
              >
                Scale
              </Link>
            </div>

            <Link
              href="/resources"
              className="text-xs font-medium text-slate-700 hover:text-black transition-colors no-underline"
            >
              Resources
            </Link>

            <Link
              href="/pricing"
              className="text-xs font-medium text-slate-700 hover:text-black transition-colors no-underline"
            >
              Pricing
            </Link>

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
      <section className="py-16 px-6 border-b border-black/5 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FAF9F6] border border-black/10 shadow-xs">
            {iconMap[chapter.iconName]}
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <span>{chapter.readTime}</span>
            <span>•</span>
            <span>Founder Playbook</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#1A1A1A] leading-[115%]">
            {chapter.title}
          </h1>

          <p className="text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
            {chapter.subtitle}
          </p>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-4 pt-6 max-w-xl mx-auto">
            {chapter.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-[#F7F6F2] p-4 rounded-xl border border-black/5 text-center"
              >
                <div className="text-xl font-bold text-[#1A1A1A] font-mono">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MAIN PLAYBOOK BODY */}
      {/* ============================================================ */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-4 space-y-3 sticky top-28">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">
              Playbook Chapters ({chapter.steps.length} Steps)
            </h3>

            <div className="space-y-2">
              {chapter.steps.map((step) => {
                const isActive = step.id === activeStep.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all cursor-pointer border flex items-start gap-3.5 ${
                      isActive
                        ? "bg-white border-black/20 shadow-md ring-1 ring-black/5"
                        : "bg-transparent border-transparent hover:bg-white/60 hover:border-black/5 text-slate-600"
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isActive
                          ? "bg-[#1A1A1A] text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-sm font-semibold truncate ${
                          isActive ? "text-[#1A1A1A]" : "text-slate-700"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {step.shortDesc}
                      </p>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quote Box */}
            <div className="mt-8 p-6 bg-white rounded-2xl border border-black/10 shadow-xs space-y-3">
              <p className="text-xs italic text-slate-600 leading-relaxed">
                "{chapter.quote.text}"
              </p>
              <div className="text-xs font-semibold text-[#1A1A1A]">
                — {chapter.quote.author},{" "}
                <span className="text-slate-500 font-normal">
                  {chapter.quote.role}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Step Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-black/10 shadow-sm space-y-6">
              {/* Step Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#1A1A1A] text-white">
                    STEP {activeStep.number}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {activeStep.agentRole}
                  </span>
                </div>
              </div>

              {/* Title & Full Content */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A]">
                  {activeStep.title}
                </h2>
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  {activeStep.fullContent}
                </p>
              </div>

              {/* Agent Prompt Box */}
              <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-black/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Suggested Agent Execution Prompt
                  </div>
                  <button
                    onClick={() =>
                      handleCopyPrompt(activeStep.suggestedPrompt)
                    }
                    className="text-xs font-medium text-slate-600 hover:text-black flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-black/10 transition-all"
                  >
                    {copiedPrompt ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-800 bg-white p-3.5 rounded-xl border border-black/5 leading-relaxed">
                  "{activeStep.suggestedPrompt}"
                </div>
              </div>

              {/* Actionable Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Execution Checklist
                </h4>
                <div className="space-y-2.5">
                  {activeStep.checklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm text-slate-700 bg-white p-3 rounded-xl border border-black/5 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execute CTA */}
              <div className="pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/onboarding"
                  className="px-6 py-3 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold hover:bg-black transition-all shadow-md no-underline flex items-center gap-2"
                >
                  Execute this step in Automyte AI
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/canvas"
                  className="text-xs font-semibold text-slate-700 hover:text-black no-underline"
                >
                  Open Canvas Workspace →
                </Link>
              </div>
            </div>

            {/* Next Chapter Link Banner */}
            {chapter.nextSlug && (
              <div className="bg-white p-6 rounded-3xl border border-black/10 shadow-xs flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Next Playbook
                  </div>
                  <div className="text-lg font-serif font-bold text-[#1A1A1A] mt-0.5">
                    {chapter.nextTitle}
                  </div>
                </div>
                <Link
                  href={chapter.nextSlug.startsWith("/") ? chapter.nextSlug : `/how-to/${chapter.nextSlug}`}
                  className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold hover:bg-black transition-all no-underline flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-black/5 bg-white text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Automyte AI. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-black no-underline">
              Home
            </Link>
            <Link href="/resources" className="hover:text-black no-underline">
              Resources
            </Link>
            <Link href="/pricing" className="hover:text-black no-underline">
              Pricing
            </Link>
            <Link href="/onboarding" className="hover:text-black no-underline">
              Run a company
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
