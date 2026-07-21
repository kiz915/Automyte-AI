"use client";

/* ============================================================
   AUTOMYTE AI — Landing Page
   ============================================================ */

import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/landing/loading-screen";
import { SmoothScrollProvider } from "@/components/landing/smooth-scroll-provider";
import { AnimatedCounter } from "@/components/landing/animated-counter";

const stats: { label: string; to: number; suffix?: string; prefix?: string }[] = [
  { label: "Companies Live", to: 10000, suffix: "+" },
  { label: "Reply Rate", to: 42, suffix: "%" },
  { label: "MoM Growth", to: 12, suffix: "%" },
  { label: "Runway Forecast", to: 18.4, suffix: " mo" },
];

export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  // Mousemove parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const targets = document.querySelectorAll<HTMLElement>('.parallax-target');
      const x = (window.innerWidth / 2 - e.pageX) / 100;
      const y = (window.innerHeight / 2 - e.pageY) / 100;
      targets.forEach((el, index) => {
        const factor = (index + 1) * 0.5;
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

    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('py-3');
          nav.classList.remove('py-5');
        } else {
          nav.classList.add('py-5');
          nav.classList.remove('py-3');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <SmoothScrollProvider>
      <LoadingScreen onDone={() => setLoading(false)} />
      <div
        className={`antialiased min-h-screen flex flex-col font-body-md text-body-md text-on-background bg-background selection:bg-secondary-container selection:text-on-secondary-container transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-[100] transition-all duration-300 bg-background/60 backdrop-blur-xl border-b border-subtle">
          <div className="max-w-container-max mx-auto px-gutter py-5 flex justify-between items-center">
            <Link className="text-2xl font-display-hero font-extrabold tracking-tight text-primary" href="/">
              Automyte
            </Link>
            <div className="hidden md:flex items-center space-x-10">
              <Link className="font-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="/how-to/start">
                How to
              </Link>
              <Link className="font-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="/resources">
                Resources
              </Link>
              <Link className="font-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="/pricing">
                Pricing
              </Link>
            </div>
            <Link className="font-label-sm text-on-secondary px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] bg-primary-container" href="/onboarding">
              Run a company
            </Link>
          </div>
        </nav>

        <main className="flex-grow">
          {/* Cinematic Hero Section */}
          <section className="relative pt-48 pb-section-v-desktop overflow-hidden bg-surface-container-lowest">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-40">
                <img
                  alt=""
                  aria-hidden="true"
                  className="absolute -top-40 -left-40 w-[800px] animate-float-slow mix-blend-multiply opacity-20"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLvwzcYsSgGUbnBb6ECkind0vDztJ9YfLEXLZLG6mhFh7aam0fMj40quamEt6iQOBx3VfL_sRc1iEDs_2cKpf22ngH-MJAYTolLapYcQ98cXdqNx2rbry_ay4XDOVcaww50I4250oDopHNKEwtltffJGmNym1wPyzgz5Y9djdeL2K7gvfgLFUtjJaexF1nDmn4WaDPRi3LDebXFq-J8wWYasAWiMrm5AH_yFcEfO6gDcpmh7PRagM1clNA"
                />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(46,92,197,0.08),transparent_70%)]"></div>
            </div>
            <div className="max-w-container-max mx-auto px-gutter relative z-10">
              <div className="flex flex-col items-center text-center mb-24">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-subtle bg-white/50 backdrop-blur-sm mb-8 text-[11px] font-bold tracking-widest uppercase text-on-surface-variant parallax-target">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-leaf"></span>
                  Trusted by 10,000+ scaling companies
                </div>
                <h1 className="font-display-hero text-display-hero text-on-surface max-w-5xl mx-auto mb-8 text-balance parallax-target tracking-tight text-7xl font-extrabold">
                  An entire company run by <span className="text-primary-container italic">Automyte agents</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12 text-balance parallax-target opacity-80 leading-relaxed font-semibold">
                  Brief your AI cofounder, scaffold your product, and scale operations with <strong>Focus Mode</strong> precision. Run an entire business through a single command center.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                  <Link
                    className="font-label-sm text-on-secondary px-10 py-4.5 rounded-lg font-bold hover:opacity-90 transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 bg-primary-container"
                    href="/onboarding"
                  >
                    Run a company <span className="material-symbols-outlined text-sm">rocket_launch</span>
                  </Link>
                  <Link
                    className="font-label-sm bg-white border border-border-subtle text-on-surface px-10 py-4.5 rounded-lg font-bold hover:bg-surface-muted transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                    href="/canvas?demo=true"
                  >
                    Workspace Canvas <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Integrated Focus Mode Preview */}
              <div className="w-full max-w-6xl mx-auto relative group reveal-on-scroll is-visible">
                <div className="absolute -inset-10 bg-secondary/10 blur-[120px] rounded-full -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="dashboard-gradient rounded-3xl p-[1px] border border-white/10 premium-shadow overflow-hidden">
                  <div className="bg-[#0c0c0c]/80 border-b border-white/5 p-4 flex items-center justify-between backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5 mr-6">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded border border-white/10">
                        <span className="material-symbols-outlined text-xs text-white/40">lock</span>
                        <span className="font-label-xs text-[10px] text-white/60 tracking-wider">app.automyte.ai / focus-mode</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-success-leaf text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-success-leaf animate-pulse"></span> Systems Online
                      </span>
                    </div>
                  </div>
                  <div className="p-16 aspect-[21/9] flex items-center justify-center relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                    <div className="animate-scan-line"></div>
                    <div className="grid grid-cols-3 gap-12 w-full max-w-5xl h-full opacity-80 relative z-10">
                      <div className="border border-white/5 bg-white/5 rounded-2xl flex flex-col p-8 items-start backdrop-blur-sm">
                        <span className="font-label-xs text-[10px] text-white/40 uppercase mb-4 tracking-tighter">Neural Load</span>
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mb-4"><div className="bg-secondary h-full w-2/3"></div></div>
                        <span className="text-white font-mono text-3xl animate-data-flicker tracking-tight">64.8%</span>
                        <div className="mt-auto flex gap-1 items-end h-8">
                          <div className="w-1 h-1/2 bg-white/20"></div><div className="w-1 h-3/4 bg-white/20"></div><div className="w-1 h-full bg-secondary"></div><div className="w-1 h-2/3 bg-white/20"></div>
                        </div>
                      </div>
                      <div className="border border-white/10 bg-white/5 rounded-2xl flex items-center justify-center relative backdrop-blur-md overflow-visible">
                        <div className="absolute inset-0 rounded-2xl active-agent-node border border-secondary/30"></div>
                        <span className="material-symbols-outlined text-secondary text-7xl active-agent-node-glow relative z-10 opacity-90">hub</span>
                      </div>
                      <div className="border border-white/5 bg-white/5 rounded-2xl flex flex-col p-8 items-end text-right backdrop-blur-sm">
                        <span className="font-label-xs text-[10px] text-white/40 uppercase mb-4 tracking-tighter">System Uptime</span>
                        <span className="text-white font-mono text-3xl animate-data-flicker tracking-tight">99.998</span>
                        <div className="flex gap-1.5 mt-auto">
                          <div className="w-1.5 h-6 bg-success-leaf/40"></div>
                          <div className="w-1.5 h-4 bg-success-leaf/20"></div>
                          <div className="w-1.5 h-8 bg-success-leaf"></div>
                        </div>
                      </div>
                    </div>
                    {/* Background Grid */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent absolute"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-24 px-gutter max-w-container-max mx-auto border-y border-border-subtle bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div className="reveal-on-scroll metric-infrequent-glitch is-visible">
                <div className="text-5xl font-extrabold text-secondary mb-3">
                  <AnimatedCounter to={stats[0].to} format={(n) => Math.round(n).toLocaleString()} />
                  {stats[0].suffix}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">{stats[0].label}</div>
              </div>
              <div className="reveal-on-scroll metric-infrequent-glitch is-visible" style={{ transitionDelay: '100ms', animationDelay: '2s' }}>
                <div className="text-5xl font-extrabold text-secondary mb-3">
                  <AnimatedCounter to={stats[1].to} format={(n) => Math.round(n).toString()} />
                  {stats[1].suffix}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">{stats[1].label}</div>
              </div>
              <div className="reveal-on-scroll metric-infrequent-glitch is-visible" style={{ transitionDelay: '200ms', animationDelay: '4s' }}>
                <div className="text-5xl font-extrabold text-secondary mb-3">
                  <AnimatedCounter to={stats[2].to} format={(n) => Math.round(n).toString()} />
                  {stats[2].suffix}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">{stats[2].label}</div>
              </div>
              <div className="reveal-on-scroll metric-infrequent-glitch is-visible" style={{ transitionDelay: '300ms', animationDelay: '6s' }}>
                <div className="text-5xl font-extrabold text-secondary mb-3">
                  <AnimatedCounter to={stats[3].to} format={(n) => n.toFixed(1)} />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">{stats[3].label}</div>
              </div>
            </div>
          </section>

          {/* Command Center Grid */}
          <section className="py-section-v-desktop px-gutter max-w-container-max mx-auto">
            <div className="mb-20 max-w-3xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 font-extrabold">From initial vision to global production</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant font-medium">The Automyte framework organizes your agents into structured executive departments that execute autonomously.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Large Focus Card */}
              <div className="md:col-span-7 bg-surface-container-low rounded-3xl p-10 border border-border-subtle flex flex-col justify-between group hover:shadow-2xl hover:border-secondary/20 transition-all duration-500 reveal-on-scroll is-visible">
                <div>
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-secondary text-3xl">description</span>
                  </div>
                  <h3 className="font-headline-md text-on-surface mb-4 font-bold">Strategic Briefing</h3>
                  <p className="font-body-md text-on-surface-variant max-w-md">The core blueprint. Brief your AI executive on vision, and watch as it builds a customized roadmap, legal charter, and founding strategy.</p>
                </div>
                <div className="mt-12 bg-white rounded-xl border border-border-subtle p-6 font-label-xs text-xs">
                  <div className="flex gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <div className="w-2 h-2 rounded-full bg-secondary opacity-30"></div>
                    <div className="w-2 h-2 rounded-full bg-secondary opacity-30"></div>
                  </div>
                  <div className="text-secondary mb-1">STRATEGIC_OBJECTIVE_SET:</div>
                  <div className="text-on-surface-variant">&quot;Disrupt SaaS infrastructure through agentic automation...&quot;</div>
                </div>
              </div>
              {/* Side Bento Stack */}
              <div className="md:col-span-5 flex flex-col gap-8">
                <div className="bg-surface-container rounded-3xl p-8 border border-border-subtle flex flex-col gap-4 group hover:bg-white hover:shadow-xl transition-all reveal-on-scroll is-visible" style={{ transitionDelay: '100ms' }}>
                  <span className="material-symbols-outlined text-secondary text-2xl">memory</span>
                  <h3 className="font-bold text-on-surface text-2xl">Systems Scaffolding</h3>
                  <p className="text-sm text-on-surface-variant">Engineering agents configure Supabase, wire up Vercel, and deploy production code.</p>
                </div>
                <div className="text-on-secondary rounded-3xl p-8 border border-secondary flex flex-col gap-4 group hover:shadow-xl transition-all reveal-on-scroll bg-primary-container is-visible" style={{ transitionDelay: '200ms' }}>
                  <span className="material-symbols-outlined text-on-secondary text-2xl">campaign</span>
                  <h3 className="font-bold text-2xl">Global Outreach</h3>
                  <p className="text-sm text-white/80">Automated marketing agents generate targeted lists and execute complex outbound sequences.</p>
                </div>
              </div>
              {/* Bottom Wide Bento */}
              <div className="md:col-span-12 bg-[#0a1631] rounded-3xl p-10 border border-white/5 flex flex-col md:flex-row items-center gap-12 reveal-on-scroll is-visible" style={{ transitionDelay: '300ms' }}>
                <div className="flex-1 w-full">
                  <div className="inline-block px-3 py-1 rounded bg-white/10 text-white/50 text-[10px] font-bold uppercase tracking-widest mb-6">Execution Log</div>
                  <pre className="font-label-xs text-sm text-white/70 leading-relaxed overflow-x-auto animate-terminal-stream"><code>{`{
  "active_growth_levers": [
    "SEO_Optimization", 
    "Churn_Reduction_AI"
  ],
  "forecast_accuracy": "98.4%"
}`}</code></pre>
                </div>
                <div className="flex-1 text-white">
                  <h3 className="font-headline-md mb-4 text-white font-bold text-2xl">Operational Excellence</h3>
                  <p className="text-white/60 mb-6">Finance and operations agents monitor live metrics, forecast cash runway, and suggest high-impact growth pivots in real-time.</p>
                  <Link className="text-secondary-container font-label-sm flex items-center gap-2 hover:gap-3 transition-all" href="/canvas">
                    Explore Operations Dashboard <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Chapters Section */}
          <section className="py-section-v-desktop bg-surface-muted">
            <div className="max-w-container-max mx-auto px-gutter">
              <div className="text-center mb-24 max-w-3xl mx-auto">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 font-extrabold">The Path to Autonomy</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Read the digital blueprint, then let Automyte turn each phase into reality.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Chapter 1 */}
                <Link className="group block bg-white rounded-3xl border border-border-subtle overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 reveal-on-scroll is-visible" href="/how-to/start">
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-label-xs text-secondary/60 font-bold tracking-widest">PHASE 01</span>
                      <span className="material-symbols-outlined text-border-subtle group-hover:text-secondary transition-colors">arrow_outward</span>
                    </div>
                    <h3 className="font-headline-md text-2xl text-on-surface mb-4 font-bold">Describe</h3>
                  </div>
                  <div className="mx-4 mb-4 rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container-low border border-border-subtle/50 relative">
                    <img alt="Phase 01 Describe" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.3] brightness-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8FnKVaIh9hkzr1rBmSvF1UEQPV-IOTsZUJPPZHfulcztk9kZUs8jdG7pUnQVa9eN1JoIJ1-ZhYDHfaNU3d31aj0XlysZC4H-EU1sKSVMZnKeXyoN8mV6AMWKvALjF95K2x99sVKhfbautK92DcqoDaudrDwoKnaN37ZgNrxA60PHHsscRijbyX0WeoSeVfAxuCMexsp_QgQd1rwaM0LPGMtq8X-pHqLNrAJNizS6Vmy30MsOYRowS" />
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </Link>
                {/* Chapter 2 */}
                <Link className="group block bg-white rounded-3xl border border-border-subtle overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 reveal-on-scroll is-visible" href="/how-to/build" style={{ transitionDelay: '100ms' }}>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-label-xs text-secondary/60 font-bold tracking-widest">PHASE 02</span>
                      <span className="material-symbols-outlined text-border-subtle group-hover:text-secondary transition-colors">arrow_outward</span>
                    </div>
                    <h3 className="font-headline-md text-2xl text-on-surface mb-4 font-bold">Build</h3>
                  </div>
                  <div className="mx-4 mb-4 rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container-low border border-border-subtle/50 relative">
                    <img alt="Phase 02 Build" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.3] brightness-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIjNHWTjNXmlNNocTz82eBsqZSyCHbITvdRwa5kiT2_LY9nqo9KTWyx8OsM9w1Ie7oCZwt9S2w9NetdGxiuXCm2dd79zWQz_ogVR_pgf8MQEI7IjOIpCx42ApR0eU9Cn6hgduyovalgs5RDNC8zUlY78INqdqT2VBxrNBugaxsv36sJIn_lP-4OLsiWbtomGZKNZDfKkI8p7S7Fs1LI7ghenqvRwQsJBNpTrXVA9J7w_Pwe2KHYexs" />
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </Link>
                {/* Chapter 3 */}
                <Link className="group block bg-white rounded-3xl border border-border-subtle overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 reveal-on-scroll is-visible" href="/how-to/sell" style={{ transitionDelay: '200ms' }}>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-label-xs text-secondary/60 font-bold tracking-widest">PHASE 03</span>
                      <span className="material-symbols-outlined text-border-subtle group-hover:text-secondary transition-colors">arrow_outward</span>
                    </div>
                    <h3 className="font-headline-md text-2xl text-on-surface mb-4 font-bold">Reach</h3>
                  </div>
                  <div className="mx-4 mb-4 rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container-low border border-border-subtle/50 relative">
                    <img alt="Phase 03 Reach" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.3] brightness-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpQjMI9h23dZZclPIIiDLo60Aj6fGS-3UrvZ0cvmYTwLxFfo3edeGH2iAxz0usQqQp2AhiwbOSOCDa0EtVApSOALqtyTHouejuM2PB-Lp1K7-bGqoBdrewizNAP_NzSYKEhbpmadoLFh-lpCkwh_06ZRpXUJ-6hbm-xV8ks4VL1hz-lQ_wBZdjN8Y5fRokaAMSN5xxsCe56oVJmJyf375In50V0_tT9JDLQvuQMyO12BvLUcGHBzUk" />
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </Link>
                {/* Chapter 4 */}
                <Link className="group block bg-white rounded-3xl border border-border-subtle overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 reveal-on-scroll is-visible" href="/how-to/scale" style={{ transitionDelay: '300ms' }}>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-label-xs text-secondary/60 font-bold tracking-widest">PHASE 04</span>
                      <span className="material-symbols-outlined text-border-subtle group-hover:text-secondary transition-colors">arrow_outward</span>
                    </div>
                    <h3 className="font-headline-md text-2xl text-on-surface mb-4 font-bold">Optimize</h3>
                  </div>
                  <div className="mx-4 mb-4 rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container-low border border-border-subtle/50 relative">
                    <img alt="Phase 04 Optimize" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.3] brightness-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbcvOlZzh6AhgMNPDMPFLTwrVgji_EbO5jeyTufTWeSFeBypsVdWUmNSj_6qWiZ8MBamvXMfW6z2bNkVzTWGD0B8u0qsC_hzBMvflz0c6nZCDm37RYlJQm6PHGw4LBlHjOX8wfRNv-qfFUo7yhyJxeoLjm8Tx6ixxBTy2Isae8Gf2VEQIuqL92bnDXq2eQ1AwNEcTMhRs0R1EE_xPNHM9hZ9gTQRYfPduPAcfyphq8pKhC4jW64H_" />
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </Link>
              </div>
              <div className="mt-20 text-center">
                <Link className="font-label-sm text-on-secondary px-12 py-5 rounded-lg font-bold hover:opacity-90 transition-all shadow-xl hover:-translate-y-1 inline-block bg-primary-container" href="/onboarding">
                  Put the guide to work
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Architectural Footer */}
        <footer className="w-full py-20 px-gutter bg-surface-container-low border-t border-subtle relative overflow-hidden">
          <div className="max-w-container-max mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
              <div className="lg:col-span-5 flex flex-col gap-6">
                <Link className="text-3xl font-display-hero font-extrabold tracking-tight text-on-surface" href="/">
                  Automyte
                </Link>
                <p className="font-body-md text-on-surface-variant max-w-sm leading-relaxed">
                  The agent orchestration platform designed to run an entire business autonomously. Scale without the headcount.
                </p>
                <div className="flex gap-4 mt-2">
                  <a className="w-10 h-10 rounded-lg border border-border-subtle flex items-center justify-center text-on-surface-variant hover:bg-white hover:text-secondary transition-all" href="https://x.com" target="_blank" rel="noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                  </a>
                  <a className="w-10 h-10 rounded-lg border border-border-subtle flex items-center justify-center text-on-surface-variant hover:bg-white hover:text-secondary transition-all" href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
                <div className="flex flex-col gap-6">
                  <span className="font-label-sm font-bold text-on-surface tracking-widest uppercase text-[11px]">Product</span>
                  <div className="flex flex-col gap-4">
                    <Link className="font-label-xs text-on-surface-variant hover:text-secondary transition-colors" href="/">Homepage</Link>
                    <Link className="font-label-xs text-on-surface-variant hover:text-secondary transition-colors" href="/resources">Resources</Link>
                    <Link className="font-label-xs text-on-surface-variant hover:text-secondary transition-colors" href="/pricing">Pricing</Link>
                    <Link className="font-label-xs text-on-surface-variant hover:text-secondary transition-colors" href="/canvas">Canvas</Link>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <span className="font-label-sm font-bold text-on-surface tracking-widest uppercase text-[11px]">Company</span>
                  <div className="flex flex-col gap-4">
                    <Link className="font-label-xs text-on-surface-variant hover:text-secondary transition-colors" href="/careers">Careers</Link>
                    <Link className="font-label-xs text-on-surface-variant hover:text-secondary transition-colors" href="/privacy">Privacy</Link>
                    <Link className="font-label-xs text-on-surface-variant hover:text-secondary transition-colors" href="/terms">Terms</Link>
                    <Link className="font-label-xs text-on-surface-variant hover:text-secondary transition-colors" href="/security">Security</Link>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <span className="font-label-sm font-bold text-on-surface tracking-widest uppercase text-[11px]">Connect</span>
                  <div className="flex flex-col gap-4">
                    <Link className="font-label-xs text-on-surface-variant hover:text-secondary transition-colors" href="/how-to/build">Documentation</Link>
                    <Link className="font-label-xs text-on-surface-variant hover:text-secondary transition-colors" href="/support">Support</Link>
                    <a className="font-label-xs text-on-surface-variant hover:text-secondary transition-colors" href="https://discord.gg" target="_blank" rel="noreferrer">Discord</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="font-label-xs text-on-surface-variant/40 text-[10px] tracking-wider uppercase">
                © 2026 Automyte AI Inc. Built for the autonomous age.
              </div>
              <div className="font-label-xs text-on-surface-variant/60 text-[10px] tracking-wider uppercase mt-2 sm:mt-0">
                Kishore V - Automyte CEO
              </div>
              <div className="flex gap-8">
                <span className="flex items-center gap-2 text-[10px] font-bold text-success-leaf uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-leaf"></span> Systems Operational
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  );
}
