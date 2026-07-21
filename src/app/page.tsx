"use client";

/* ============================================================
   AUTOMYTE AI — Professional Orchestrator Landing Page
   ============================================================ */

import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/landing/loading-screen";
import { SmoothScrollProvider } from "@/components/landing/smooth-scroll-provider";
import { ShaderBackground } from "@/components/landing/shader-background";
import { AnimatedCounter } from "@/components/landing/animated-counter";

const stats: { label: string; to: number; suffix?: string; prefix?: string }[] = [
  { label: "Companies Live", to: 10000, suffix: "+" },
  { label: "Outbound Reply Rate", to: 42, suffix: "%" },
  { label: "MoM Revenue Growth", to: 12, suffix: "%" },
  { label: "Runway Forecasted", to: 18.4, suffix: " mo" },
];

export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  // IntersectionObserver for reveal on scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  return (
    <SmoothScrollProvider>
      <LoadingScreen onDone={() => setLoading(false)} />
      <div
        className={`antialiased font-body-md min-h-screen relative text-on-background bg-transparent selection:bg-secondary-fixed selection:text-on-secondary-fixed transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Interactive WebGL Shader Background */}
        <ShaderBackground />

        {/* Multi-Layered Ambient Background Gradients & Technical Grid */}
        <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
          {/* Top Hero Radial Glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(46,92,197,0.15),rgba(13,27,62,0.04)_55%,transparent_75%)] blur-3xl opacity-90" />
          {/* Middle Section Ambient Accent Glow */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(0,93,183,0.08),rgba(46,92,197,0.02)_60%,transparent_80%)] blur-3xl opacity-75" />
          {/* Technical Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />
        </div>

        {/* Navigation Shell */}
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-surface/75 backdrop-blur-xl border-b border-border-subtle/80">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-10">
              <Link className="text-2xl font-display-hero font-extrabold text-primary tracking-tight" href="/">
                Automyte
              </Link>
              <div className="hidden md:flex gap-8">
                <Link className="text-on-surface-variant hover:text-secondary transition-colors font-label-sm text-xs tracking-wide uppercase font-medium flex items-center gap-1.5" href="/how-to/start">
                  How to
                </Link>
                <Link className="text-on-surface-variant hover:text-secondary transition-colors font-label-sm text-xs tracking-wide uppercase font-medium flex items-center gap-1.5" href="/resources">
                  Resources
                </Link>
                <Link className="text-on-surface-variant hover:text-secondary transition-colors font-label-sm text-xs tracking-wide uppercase font-medium flex items-center gap-1.5" href="/pricing">
                  Pricing
                </Link>
              </div>
            </div>
            <Link className="bg-primary text-on-primary hover:bg-secondary transition-all duration-200 px-5 py-2.5 rounded-lg font-label-sm text-xs font-semibold tracking-wide uppercase shadow-sm hover:scale-[1.02] active:scale-[0.98]" href="/onboarding">
              Run a company
            </Link>
          </div>
        </nav>

        <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-24">
          {/* Hero Section */}
          <section className="relative pt-8 pb-12 flex flex-col justify-center items-center text-center">
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 backdrop-blur-md border border-border-subtle rounded-full mb-8 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-success-leaf animate-pulse" />
                <span className="font-label-xs text-xs font-semibold tracking-wider text-on-surface-variant uppercase">System Status: Active</span>
              </div>
              <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] mb-6">
                An entire company run by <span className="text-secondary">Automyte agents</span>
              </h1>
              <p className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
                Deploy intelligent, autonomous workforce segments capable of planning, executing, and optimizing complex business workflows with absolute precision.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-sm text-sm font-semibold hover:bg-secondary transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-3 w-full sm:w-auto" href="/onboarding">
                  Deploy Infrastructure
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <Link className="bg-white/80 border border-border-subtle text-on-surface px-8 py-4 rounded-xl font-label-sm text-sm font-semibold hover:bg-surface-muted transition-all backdrop-blur-md shadow-xs hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full sm:w-auto" href="/how-to/start">
                  View Blueprint
                </Link>
              </div>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="bg-white/80 backdrop-blur-md border border-border-subtle rounded-2xl p-8 shadow-sm reveal-on-scroll is-visible">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border-subtle">
              {stats.map((s, idx) => (
                <div key={s.label} className={idx > 0 ? "pt-6 md:pt-0" : ""}>
                  <div className="text-4xl md:text-5xl font-extrabold text-secondary mb-2 tracking-tight">
                    {s.prefix}
                    <AnimatedCounter
                      to={s.to}
                      format={(n) =>
                        Number.isInteger(s.to) ? Math.round(n).toLocaleString() : n.toFixed(1)
                      }
                    />
                    {s.suffix}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/70 font-label-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Orchestrator Dashboard HUD Preview */}
          <section className="relative reveal-on-scroll is-visible">
            <div className="bg-surface-container-lowest/90 backdrop-blur-xl border border-border-subtle rounded-2xl p-3 md:p-6 shadow-xl mx-auto max-w-6xl">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6 px-2">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5 mr-3">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-muted px-3 py-1 rounded-md border border-border-subtle">
                    <span className="material-symbols-outlined text-xs text-on-surface-variant">lock</span>
                    <span className="font-label-xs text-xs text-on-surface-variant font-medium">app.automyte.ai / orchestrator-hud</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-success-leaf uppercase tracking-wider font-label-xs">
                    <span className="w-2 h-2 rounded-full bg-success-leaf animate-pulse" />
                    Systems Online
                  </span>
                </div>
              </div>

              {/* Dashboard Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative overflow-hidden min-h-[460px]">
                <div className="scanner-line"></div>
                {/* Left Sidebar (Agent Status) */}
                <div className="lg:col-span-4 border-r border-border-subtle pr-6 hidden lg:flex flex-col gap-4">
                  <h3 className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-bold">Active Executive Nodes</h3>
                  
                  <div className="bg-surface-muted/90 backdrop-blur-sm p-4 rounded-xl border border-border-subtle flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-sm font-bold text-on-surface">Engineering Node</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-success-leaf/10 text-success-leaf font-bold">ACTIVE</span>
                    </div>
                    <div className="font-label-xs text-xs text-on-surface-variant">Task: Next.js & Supabase Scaffolding</div>
                    <div className="w-full bg-surface-variant h-1.5 mt-1 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full w-[85%]"></div>
                    </div>
                  </div>

                  <div className="bg-surface-muted/90 backdrop-blur-sm p-4 rounded-xl border border-border-subtle flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-sm font-bold text-on-surface">Sales Director</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-success-leaf/10 text-success-leaf font-bold">ACTIVE</span>
                    </div>
                    <div className="font-label-xs text-xs text-on-surface-variant">Task: Lead Gen Outbound (1,420 target)</div>
                    <div className="w-full bg-surface-variant h-1.5 mt-1 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full w-[72%]"></div>
                    </div>
                  </div>

                  <div className="bg-surface-muted/90 backdrop-blur-sm p-4 rounded-xl border border-border-subtle flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-sm font-bold text-on-surface">Marketing Lead</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-success-leaf/10 text-success-leaf font-bold">SYNCING</span>
                    </div>
                    <div className="font-label-xs text-xs text-on-surface-variant">Task: Campaign Draft & Content Engine</div>
                    <div className="w-full bg-surface-variant h-1.5 mt-1 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full w-[45%]"></div>
                    </div>
                  </div>

                  <div className="bg-surface-muted/90 p-4 rounded-xl border border-border-subtle mt-auto">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-label-xs text-xs text-on-surface-variant font-medium">System Performance</span>
                      <span className="font-label-xs text-xs text-success-leaf font-bold">99.98%</span>
                    </div>
                    <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                      <div className="bg-success-leaf h-full w-[99.98%]"></div>
                    </div>
                  </div>
                </div>

                {/* Main HUD (Graph & Live Status) */}
                <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-headline-md text-xl font-bold text-on-surface">Orchestration Graph</h2>
                    <div className="bg-surface-muted border border-border-subtle px-3 py-1 rounded-lg">
                      <span className="font-label-xs text-xs text-secondary font-bold">12 Connected Nodes</span>
                    </div>
                  </div>
                  <div className="flex-1 border border-border-subtle rounded-xl bg-surface-bright/90 backdrop-blur-sm relative flex items-center justify-center p-8 min-h-[320px]">
                    <div className="w-full h-full border border-dashed border-border-subtle/80 rounded-lg flex flex-col items-center justify-center text-center p-8 opacity-80">
                      <span className="material-symbols-outlined text-5xl text-secondary mb-4 animate-pulse">account_tree</span>
                      <h3 className="font-bold text-on-surface text-base mb-1">Autonomous Graph Active</h3>
                      <p className="font-label-sm text-xs text-on-surface-variant max-w-md">
                        Executive agents communicating across network protocols, syncing state & executing tasks continuously.
                      </p>
                    </div>
                    {/* Live Data Point Callouts */}
                    <div className="absolute top-8 left-8 p-3 bg-white/90 backdrop-blur-md border border-border-subtle shadow-sm rounded-lg flex items-center gap-2.5">
                      <span className="w-2 h-2 bg-secondary rounded-full animate-ping" />
                      <span className="font-label-xs text-xs font-semibold text-on-surface">Node Init: Alex (Engineering)</span>
                    </div>
                    <div className="absolute bottom-10 right-8 p-3 bg-white/90 backdrop-blur-md border border-border-subtle shadow-sm rounded-lg flex items-center gap-2.5">
                      <span className="w-2 h-2 bg-success-leaf rounded-full" />
                      <span className="font-label-xs text-xs font-semibold text-on-surface">Sync Complete: 42% Reply Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Path to Autonomy (Bento Grid) */}
          <section className="space-y-12 reveal-on-scroll is-visible">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-extrabold text-4xl">The Path to Autonomy</h2>
              <p className="font-body-md text-base text-on-surface-variant">Read the digital blueprint, then let Automyte turn each phase into reality.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Phase 1 */}
              <Link className="bg-white/80 backdrop-blur-md border border-border-subtle rounded-2xl p-6 flex flex-col gap-6 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300" href="/how-to/start">
                <div className="flex justify-between items-start">
                  <span className="font-label-xs text-xs text-secondary uppercase tracking-widest font-bold">PHASE 01</span>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">north_east</span>
                </div>
                <h3 className="font-headline-md text-2xl font-bold text-on-surface">Describe</h3>
                <div className="rounded-xl overflow-hidden border border-border-subtle/70 aspect-[4/3]">
                  <img src="https://lh3.googleusercontent.com/aida/AP1WRLt4KyTcbla-8iQt6MEX-gR5lVF6-OjExstA7rXnavYtEsmuTOFvC2eVUJPHy0udIrCSsO8Z6zX1B80FnOFYN1Jd4NG0SeNhDvVjDb8N59_94YGSvfd80VSciGopQG1LaAdoMIRYxMysRzt1i5NVNyKccjEMMUBpOmQZebpLuWmmg1-oZb_4G-O9PTWV2fQDdV97lEzA_g6rfL9JrS0Oj9cIJUO1cDA0acMPts1rqtN9DDNCOXuIGREDLnE" alt="Phase 1 Describe" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>

              {/* Phase 2 */}
              <Link className="bg-white/80 backdrop-blur-md border border-border-subtle rounded-2xl p-6 flex flex-col gap-6 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300" href="/how-to/build">
                <div className="flex justify-between items-start">
                  <span className="font-label-xs text-xs text-secondary uppercase tracking-widest font-bold">PHASE 02</span>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">north_east</span>
                </div>
                <h3 className="font-headline-md text-2xl font-bold text-on-surface">Build</h3>
                <div className="rounded-xl overflow-hidden border border-border-subtle/70 aspect-[4/3]">
                  <img src="https://lh3.googleusercontent.com/aida/AP1WRLsGv0ZeCPKPFu288KywCPlKkZAVw_1dUUaHjDRQCWqa6nJKPakf7UV2XdEQl2WpWlOZENHqv1dW4Ji8a4A3lxP0YDKw3HnrxEo9HZWSQGVLVdzy8on3Oah0ANXMwaTe0rgKZ6vOm4B6OdGuZcKqarmbl2Yz9MvmF7NmOGdSdIr-exmumGUPX8MMQRh2HYyNc501d3Zkca1sZcn92G4HjQuh8WtTRXYdoTPT2gJKl8uuTRL7uN6mDEciMl4" alt="Phase 2 Build" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>

              {/* Phase 3 */}
              <Link className="bg-white/80 backdrop-blur-md border border-border-subtle rounded-2xl p-6 flex flex-col gap-6 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300" href="/how-to/sell">
                <div className="flex justify-between items-start">
                  <span className="font-label-xs text-xs text-secondary uppercase tracking-widest font-bold">PHASE 03</span>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">north_east</span>
                </div>
                <h3 className="font-headline-md text-2xl font-bold text-on-surface">Reach</h3>
                <div className="rounded-xl overflow-hidden border border-border-subtle/70 aspect-[4/3]">
                  <img src="https://lh3.googleusercontent.com/aida/AP1WRLvLBw-CVrRqLqs5vuw75XZyTJ9rQXqh_Y3JyognuaVwhQrHLfw6SqwtpHVk-RD9E4FS-WuOqT5O_957vAgeMuk3xaFcZKsDoFwzougYumiq9_yns-YFQje6HM5TYs3_f4TRsCrrdeiBzzIF1N0I4BJapOqqQ_niLp8AXNNsIK4si-YX8UKchzeIhWH2FIAL8RtOe7ziIRd_NE3SshYXnB1dXQGFPo0VleNzQRdHl8Ap0gQWxx2O5HeNEc8" alt="Phase 3 Reach" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>

              {/* Phase 4 */}
              <Link className="bg-white/80 backdrop-blur-md border border-border-subtle rounded-2xl p-6 flex flex-col gap-6 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300" href="/how-to/scale">
                <div className="flex justify-between items-start">
                  <span className="font-label-xs text-xs text-secondary uppercase tracking-widest font-bold">PHASE 04</span>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">north_east</span>
                </div>
                <h3 className="font-headline-md text-2xl font-bold text-on-surface">Optimize</h3>
                <div className="rounded-xl overflow-hidden border border-border-subtle/70 aspect-[4/3]">
                  <img src="https://lh3.googleusercontent.com/aida/AP1WRLuj91sT8IdSwgNsUkKC9RcHt4WO5gNfdlLCZXVFzhVWbRxKtagPv9nj6TUbwnyR27iRNCBhkIN7WzpnfiGJ_MuW16XfnLNOq4llmoXgNjBJQjvOD6m7XMcs3Qlu_r2P4KlTubVgDby6igoVTnCqjl-iLHusktXbpYtDFg7Aver6M2tBdykZBmzxV0Xo-MWVWLdwBc09m05iRKvFEeIBtjTR-2wIFVAGqTN1nH6GQTyIxUlu6L585hrjAO8" alt="Phase 4 Optimize" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>
            </div>

            <div className="pt-8 text-center">
              <Link className="bg-primary text-on-primary px-10 py-4.5 rounded-xl font-label-sm text-sm font-semibold hover:bg-secondary transition-all inline-block shadow-md hover:-translate-y-0.5" href="/onboarding">
                Put the guide to work
              </Link>
            </div>
          </section>
        </main>

        {/* Footer Shell */}
        <footer className="w-full pt-20 pb-8 px-6 max-w-7xl mx-auto bg-surface-container-low/90 backdrop-blur-xl border-t border-border-subtle mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-5 space-y-6">
              <Link className="font-display-hero text-3xl font-bold text-primary tracking-tight" href="/">
                Automyte
              </Link>
              <p className="font-body-md text-sm text-on-surface-variant max-w-sm leading-relaxed">
                The agent orchestration platform designed to run an entire business autonomously. Scale without the headcount.
              </p>
              <div className="flex gap-3">
                <a href="https://x.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center border border-border-subtle rounded-lg bg-white/90 hover:bg-surface-variant transition-colors shadow-xs">
                  <svg className="w-4 h-4 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center border border-border-subtle rounded-lg bg-white/90 hover:bg-surface-variant transition-colors shadow-xs">
                  <svg className="w-4 h-4 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-7 grid grid-cols-3 gap-8">
              <div className="flex flex-col space-y-4">
                <h4 className="font-label-xs text-xs font-bold uppercase tracking-widest text-primary">Product</h4>
                <Link className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors" href="/">Homepage</Link>
                <Link className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors" href="/resources">Resources</Link>
                <Link className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors" href="/pricing">Pricing</Link>
                <Link className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors" href="/canvas">Canvas</Link>
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="font-label-xs text-xs font-bold uppercase tracking-widest text-primary">Company</h4>
                <Link className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors" href="/careers">Careers</Link>
                <Link className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors" href="/privacy">Privacy</Link>
                <Link className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors" href="/terms">Terms</Link>
                <Link className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors" href="/security">Security</Link>
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="font-label-xs text-xs font-bold uppercase tracking-widest text-primary">Connect</h4>
                <Link className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors" href="/how-to/build">Documentation</Link>
                <Link className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors" href="/support">Support</Link>
                <a className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors" href="https://discord.gg" target="_blank" rel="noreferrer">Discord</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-label-xs text-xs text-outline uppercase tracking-wider">© 2026 AUTOMYTE AI INC. BUILT FOR THE AUTONOMOUS AGE.</div>
            <div className="font-label-xs text-xs text-outline uppercase tracking-wider">KISHORE V - AUTOMYTE CEO</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-leaf animate-pulse" />
              <span className="font-label-xs text-xs text-success-leaf font-bold uppercase tracking-wider">Systems Operational</span>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  );
}
