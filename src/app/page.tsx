"use client";

/* ============================================================
   AUTOMYTE AI — Professional Orchestrator Landing Page
   ============================================================ */

import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/landing/loading-screen";
import { SmoothScrollProvider } from "@/components/landing/smooth-scroll-provider";
import { ShaderBackground } from "@/components/landing/shader-background";

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

        {/* Navigation Shell */}
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto bg-background/80 dark:bg-background/80 backdrop-blur-md border-b border-subtle dark:border-outline-variant flat no shadows">
          <div className="flex items-center gap-8">
            <Link className="text-body-lg font-display-hero font-bold text-primary dark:text-on-primary-fixed tracking-tight" href="/">
              Automyte
            </Link>
            <div className="hidden md:flex gap-6">
              <Link className="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-primary-fixed transition-colors font-label-sm text-label-sm flex items-center gap-2" href="/how-to/start">
                How to
              </Link>
              <Link className="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-primary-fixed transition-colors font-label-sm text-label-sm flex items-center gap-2" href="/resources">
                Resources
              </Link>
              <Link className="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-primary-fixed transition-colors font-label-sm text-label-sm flex items-center gap-2" href="/pricing">
                Pricing
              </Link>
            </div>
          </div>
          <Link className="bg-primary text-on-primary hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-all duration-200 px-4 py-2 rounded font-label-sm text-label-sm hidden md:block border border-primary" href="/onboarding">
            Run a company
          </Link>
        </nav>

        <main className="pt-24 pb-section-v-desktop px-gutter max-w-container-max mx-auto space-y-section-v-desktop">
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center">
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-muted/80 backdrop-blur-sm border border-border-subtle rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                <span className="font-label-xs text-label-xs text-on-surface-variant">System Status: Active</span>
              </div>
              <h1 className="font-display-hero text-display-hero text-primary tracking-tight text-6xl md:text-7xl font-extrabold">
                An entire company run by <span className="text-secondary block">Automyte agents</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                Deploy intelligent, autonomous workforce segments capable of planning, executing, and optimizing complex business workflows with absolute precision.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link className="bg-primary text-on-primary px-6 py-3 rounded font-label-sm text-label-sm hover:bg-inverse-surface transition-colors flex items-center gap-2 w-full sm:w-auto justify-center" href="/onboarding">
                  Deploy Infrastructure
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_right_alt</span>
                </Link>
                <Link className="bg-transparent border border-primary text-primary px-6 py-3 rounded font-label-sm text-label-sm hover:bg-surface-muted/50 transition-colors w-full sm:w-auto justify-center backdrop-blur-sm" href="/how-to/start">
                  View Blueprint
                </Link>
              </div>
            </div>
          </section>

          {/* Dashboard Preview / Orchestrator HUD */}
          <section className="relative">
            <div className="bg-surface-container-lowest/80 backdrop-blur-md border border-border-subtle rounded-lg p-2 md:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mx-auto max-w-5xl">
              {/* Mac-like Header */}
              <div className="flex items-center border-b border-border-subtle pb-3 mb-4 px-2">
                <div className="flex gap-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                  <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                  <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="font-label-xs text-label-xs text-on-surface-variant">automyte_orchestrator.exe</span>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">filter_list</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">more_horiz</span>
                </div>
              </div>
              {/* Dashboard Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 relative overflow-hidden min-h-[480px]">
                <div className="scanner-line"></div>
                {/* Left Sidebar (Agent Status) */}
                <div className="md:col-span-3 border-r border-border-subtle pr-4 hidden md:flex flex-col gap-4">
                  <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2 font-bold">Active Agents</h3>
                  <div className="bg-surface-muted/80 backdrop-blur-sm p-3 rounded border border-border-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-sm text-label-sm font-semibold">Sales Node</span>
                      <div className="w-2 h-2 rounded-full bg-success-leaf animate-pulse"></div>
                    </div>
                    <div className="font-label-xs text-label-xs text-on-surface-variant mb-1">Task: Lead Gen</div>
                    <div className="w-full bg-surface-variant h-1 mt-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-1 w-[75%]"></div>
                    </div>
                  </div>
                  <div className="bg-surface-muted/80 backdrop-blur-sm p-3 rounded border border-border-subtle">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-sm text-label-sm font-semibold">Marketing</span>
                      <div className="w-2 h-2 rounded-full bg-success-leaf animate-pulse"></div>
                    </div>
                    <div className="font-label-xs text-label-xs text-on-surface-variant mb-1">Task: Campaign Draft</div>
                    <div className="w-full bg-surface-variant h-1 mt-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-1 w-[40%]"></div>
                    </div>
                  </div>
                  <div className="bg-surface-muted/80 backdrop-blur-sm p-3 rounded border border-border-subtle mt-auto">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-label-xs text-label-xs text-on-surface-variant">System Health</span>
                      <span className="font-label-xs text-label-xs text-success-leaf font-bold">99.9%</span>
                    </div>
                    <div className="w-full bg-surface-variant h-1 rounded-full overflow-hidden">
                      <div className="bg-success-leaf h-1 w-[99.9%]"></div>
                    </div>
                  </div>
                </div>
                {/* Main HUD (Graph/Data) */}
                <div className="col-span-1 md:col-span-9 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Orchestration Graph</h2>
                    <div className="bg-surface-muted/80 backdrop-blur-sm border border-border-subtle px-3 py-1 rounded">
                      <span className="font-label-xs text-label-xs text-secondary font-semibold">12 Active Nodes</span>
                    </div>
                  </div>
                  <div className="flex-1 border border-border-subtle rounded bg-surface-bright/80 backdrop-blur-sm relative flex items-center justify-center p-8 min-h-[340px]">
                    <div className="w-full h-full border border-dashed border-border-subtle flex flex-col items-center justify-center text-center opacity-70 p-6">
                      <span className="material-symbols-outlined text-4xl text-outline-variant mb-4">account_tree</span>
                      <p className="font-label-sm text-label-sm text-on-surface-variant max-w-sm">
                        Graph visualization active. Nodes communicating seamlessly across network protocols.
                      </p>
                    </div>
                    {/* Overlay elements simulating data points */}
                    <div className="absolute top-10 left-10 p-2 bg-surface-container-lowest/80 backdrop-blur-sm border border-border-subtle shadow-sm rounded flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span className="font-label-xs text-label-xs">Init Process</span>
                    </div>
                    <div className="absolute bottom-20 right-10 p-2 bg-surface-container-lowest/80 backdrop-blur-sm border border-border-subtle shadow-sm rounded flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span className="font-label-xs text-label-xs">Sync Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Path to Autonomy (Bento Grid) */}
          <section className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-extrabold text-4xl">The Path to Autonomy</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Read the digital blueprint, then let Automyte turn each phase into reality.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Phase 1 */}
              <Link className="bg-surface-container-lowest/80 backdrop-blur-md border border-border-subtle rounded-xl p-6 flex flex-col gap-6 group hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all" href="/how-to/start">
                <div className="flex justify-between items-start">
                  <div className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">PHASE 01</div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">north_east</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Describe</h3>
                <div className="rounded-lg overflow-hidden border border-border-subtle">
                  <img src="https://lh3.googleusercontent.com/aida/AP1WRLt4KyTcbla-8iQt6MEX-gR5lVF6-OjExstA7rXnavYtEsmuTOFvC2eVUJPHy0udIrCSsO8Z6zX1B80FnOFYN1Jd4NG0SeNhDvVjDb8N59_94YGSvfd80VSciGopQG1LaAdoMIRYxMysRzt1i5NVNyKccjEMMUBpOmQZebpLuWmmg1-oZb_4G-O9PTWV2fQDdV97lEzA_g6rfL9JrS0Oj9cIJUO1cDA0acMPts1rqtN9DDNCOXuIGREDLnE" alt="Phase 1 Describe" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>
              {/* Phase 2 */}
              <Link className="bg-surface-container-lowest/80 backdrop-blur-md border border-border-subtle rounded-xl p-6 flex flex-col gap-6 group hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all" href="/how-to/build">
                <div className="flex justify-between items-start">
                  <div className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">PHASE 02</div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">north_east</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Build</h3>
                <div className="rounded-lg overflow-hidden border border-border-subtle">
                  <img src="https://lh3.googleusercontent.com/aida/AP1WRLsGv0ZeCPKPFu288KywCPlKkZAVw_1dUUaHjDRQCWqa6nJKPakf7UV2XdEQl2WpWlOZENHqv1dW4Ji8a4A3lxP0YDKw3HnrxEo9HZWSQGVLVdzy8on3Oah0ANXMwaTe0rgKZ6vOm4B6OdGuZcKqarmbl2Yz9MvmF7NmOGdSdIr-exmumGUPX8MMQRh2HYyNc501d3Zkca1sZcn92G4HjQuh8WtTRXYdoTPT2gJKl8uuTRL7uN6mDEciMl4" alt="Phase 2 Build" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>
              {/* Phase 3 */}
              <Link className="bg-surface-container-lowest/80 backdrop-blur-md border border-border-subtle rounded-xl p-6 flex flex-col gap-6 group hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all" href="/how-to/sell">
                <div className="flex justify-between items-start">
                  <div className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">PHASE 03</div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">north_east</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Reach</h3>
                <div className="rounded-lg overflow-hidden border border-border-subtle">
                  <img src="https://lh3.googleusercontent.com/aida/AP1WRLvLBw-CVrRqLqs5vuw75XZyTJ9rQXqh_Y3JyognuaVwhQrHLfw6SqwtpHVk-RD9E4FS-WuOqT5O_957vAgeMuk3xaFcZKsDoFwzougYumiq9_yns-YFQje6HM5TYs3_f4TRsCrrdeiBzzIF1N0I4BJapOqqQ_niLp8AXNNsIK4si-YX8UKchzeIhWH2FIAL8RtOe7ziIRd_NE3SshYXnB1dXQGFPo0VleNzQRdHl8Ap0gQWxx2O5HeNEc8" alt="Phase 3 Reach" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>
              {/* Phase 4 */}
              <Link className="bg-surface-container-lowest/80 backdrop-blur-md border border-border-subtle rounded-xl p-6 flex flex-col gap-6 group hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all" href="/how-to/scale">
                <div className="flex justify-between items-start">
                  <div className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">PHASE 04</div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">north_east</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Optimize</h3>
                <div className="rounded-lg overflow-hidden border border-border-subtle">
                  <img src="https://lh3.googleusercontent.com/aida/AP1WRLuj91sT8IdSwgNsUkKC9RcHt4WO5gNfdlLCZXVFzhVWbRxKtagPv9nj6TUbwnyR27iRNCBhkIN7WzpnfiGJ_MuW16XfnLNOq4llmoXgNjBJQjvOD6m7XMcs3Qlu_r2P4KlTubVgDby6igoVTnCqjl-iLHusktXbpYtDFg7Aver6M2tBdykZBmzxV0Xo-MWVWLdwBc09m05iRKvFEeIBtjTR-2wIFVAGqTN1nH6GQTyIxUlu6L585hrjAO8" alt="Phase 4 Optimize" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </Link>
            </div>
          </section>
        </main>

        {/* Footer Shell */}
        <footer className="w-full pt-section-v-desktop pb-8 px-gutter max-w-container-max mx-auto bg-surface-container-low/80 backdrop-blur-md border-t border-subtle">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
            <div className="md:col-span-5 space-y-6">
              <Link className="font-display-hero text-headline-md font-bold text-primary tracking-tight text-3xl" href="/">
                Automyte
              </Link>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm leading-relaxed">
                The agent orchestration platform designed to run an entire business autonomously. Scale without the headcount.
              </p>
              <div className="flex gap-3">
                <a href="https://x.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center border border-border-subtle rounded bg-surface-container-lowest hover:bg-surface-variant transition-colors">
                  <svg className="w-4 h-4 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center border border-border-subtle rounded bg-surface-container-lowest hover:bg-surface-variant transition-colors">
                  <svg className="w-4 h-4 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-7 grid grid-cols-3 gap-8">
              <div className="flex flex-col space-y-4">
                <h4 className="font-label-xs text-label-xs font-bold uppercase tracking-widest text-primary">Product</h4>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/">Homepage</Link>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/resources">Resources</Link>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/pricing">Pricing</Link>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/canvas">Canvas</Link>
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="font-label-xs text-label-xs font-bold uppercase tracking-widest text-primary">Company</h4>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/careers">Careers</Link>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/privacy">Privacy</Link>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/terms">Terms</Link>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/security">Security</Link>
              </div>
              <div className="flex flex-col space-y-4">
                <h4 className="font-label-xs text-label-xs font-bold uppercase tracking-widest text-primary">Connect</h4>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/how-to/build">Documentation</Link>
                <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/support">Support</Link>
                <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="https://discord.gg" target="_blank" rel="noreferrer">Discord</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-label-xs text-label-xs text-outline uppercase">© 2026 AUTOMYTE AI INC. BUILT FOR THE AUTONOMOUS AGE.</div>
            <div className="font-label-xs text-label-xs text-outline uppercase">KISHORE V - AUTOMYTE CEO</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success-leaf animate-pulse"></div>
              <span className="font-label-xs text-label-xs text-success-leaf font-bold uppercase">Systems Operational</span>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  );
}
