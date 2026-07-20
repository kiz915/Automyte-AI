"use client";

import Link from "next/link";
import { useState } from "react";

const tiers = [
  {
    name: "Free Trial",
    tagline: "Get started",
    badge: "7 day free trial",
    price: "Free",
    priceDetail: "$10 in usage included",
    features: [
      "7 days of Automyte Pro",
      "Access to multiple AI models",
      "Agent-built previews",
      "Preview environments",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Automyte Pro",
    tagline: "Starting at",
    badge: null,
    price: "$20",
    priceDetail: "/month usage included",
    features: [
      "Everything in the Free Plan",
      "Access to multiple AI models",
      "Domain purchasing and hosting",
      "Agent inboxes",
      "Graduate data from the platform",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Team Plan",
    tagline: "Coming soon",
    badge: null,
    price: "$50",
    priceDetail: "/month usage included",
    features: [
      "Everything in the Pro Plan",
      "Multiplayer",
      "SOC 2",
      "Priority support",
    ],
    cta: "Join waitlist",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What's included in the free trial?",
    a: "The free trial gives you 7 days of Automyte Pro, $10 in included usage, access to multiple AI models, and preview environments so you can review what agents build before anything ships.",
  },
  {
    q: "How does usage-based pricing work?",
    a: "Your plan includes a monthly amount of usage. Automyte Pro includes $20 per month, and Team includes $50 per month. You only pay more when your usage exceeds the included amount. Usage covers agents, AI models, compute, database, and managed services.",
  },
  {
    q: "What services does Automyte manage?",
    a: "Automyte can manage project setup and connected services across GitHub, Supabase, Vercel, domain hosting, secrets, email hosting, and image or video generation services.",
  },
  {
    q: "Can I graduate and take ownership?",
    a: "Yes. Automyte Pro and Team users can graduate at any point and claim ownership of the GitHub, Supabase, Vercel, and related projects Automyte manages for them.",
  },
  {
    q: "Who is Automyte designed for?",
    a: "Automyte is best for early-stage software companies, solo founders, and small teams that want to validate, build, launch, and operate without hiring a full team.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState(25);

  const estimatedCost = sliderValue <= 10 ? 0 : sliderValue <= 50 ? 20 + Math.floor((sliderValue - 10) * 0.8) : 50 + Math.floor((sliderValue - 50) * 1.2);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 flex justify-center border-b border-border-subtle bg-surface/90 backdrop-blur-sm">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-7 h-7 rounded-md bg-ink flex items-center justify-center">
              <span className="text-surface-raised text-xs font-bold">A</span>
            </div>
            <span className="text-[18px] font-semibold tracking-tight text-ink">Automyte</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/how-to/start" className="text-[14px] font-[460] text-ink-secondary hover:text-ink transition-colors no-underline">Start</Link>
            <Link href="/how-to/build" className="text-[14px] font-[460] text-ink-secondary hover:text-ink transition-colors no-underline">Build</Link>
            <Link href="/how-to/sell" className="text-[14px] font-[460] text-ink-secondary hover:text-ink transition-colors no-underline">Sell</Link>
            <Link href="/how-to/scale" className="text-[14px] font-[460] text-ink-secondary hover:text-ink transition-colors no-underline">Scale</Link>
            <Link href="/resources" className="text-[14px] font-[460] text-ink-secondary hover:text-ink transition-colors no-underline">Resources</Link>
            <Link href="/pricing" className="text-[14px] font-[520] text-ink no-underline">Pricing</Link>
          </nav>
          <Link href="/onboarding" className="relative inline-flex items-center justify-center h-[37px] px-4 rounded-[8px] no-underline">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[8px] cta-btn" />
            <span className="relative z-10 text-[14px] font-[460] text-[#1a1a1a]">Run a company</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="w-full pt-16 pb-12 px-6 text-center">
        <h1 className="heading-xl text-ink" style={{ filter: "url(#headline-inner-shadow-dark)" }}>
          Build and scale without managing<br />the systems behind it.
        </h1>
      </div>

      {/* Pricing cards */}
      <div className="mx-auto max-w-[1100px] px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`surface-card rounded-[16px] p-6 flex flex-col ${tier.highlight ? "ring-2 ring-ink/10 shadow-md" : ""}`}
            >
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-[16px] font-[560] text-ink">{tier.name}</h3>
                  {tier.badge && (
                    <span className="text-[10px] font-[520] text-ink-faint bg-[rgba(32,32,32,0.05)] px-2 py-0.5 rounded-full">{tier.badge}</span>
                  )}
                </div>
                <p className="text-[11px] text-ink-muted mb-3">{tier.tagline}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-[600] text-ink leading-none">{tier.price}</span>
                  <span className="text-[13px] text-ink-faint">{tier.priceDetail}</span>
                </div>
              </div>

              <ul className="flex-1 space-y-2.5 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[13px] text-ink-secondary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-success">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/onboarding" className="relative flex items-center justify-center h-[41px] rounded-[8px] no-underline">
                {tier.highlight ? (
                  <>
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[8px] cta-btn" />
                    <span className="relative z-10 text-[14px] font-[460] text-[#1a1a1a]">{tier.cta}</span>
                  </>
                ) : (
                  <>
                    <span className="absolute inset-0 rounded-[8px] border border-border bg-surface-card hover:bg-surface transition-colors" />
                    <span className="relative z-10 text-[14px] font-[460] text-ink">{tier.cta}</span>
                  </>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Usage estimator */}
      <div className="w-full bg-surface py-16 border-t border-border-subtle">
        <div className="mx-auto max-w-[600px] px-6 text-center">
          <h2 className="heading-lg text-ink mb-2">Estimate your monthly cost</h2>
          <p className="body-sm mb-8">Move the slider to see how pricing changes as you grow</p>

          <div className="surface-card rounded-[16px] p-8">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full accent-ink mb-4"
            />
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-[36px] font-[600] text-ink">${estimatedCost}</span>
              <span className="text-[14px] text-ink-faint">/month estimated</span>
            </div>
            <p className="text-[12px] text-ink-muted mt-2">
              Based on {sliderValue <= 20 ? "light" : sliderValue <= 60 ? "moderate" : "heavy"} usage
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="w-full bg-surface py-16 border-t border-border-subtle">
        <div className="mx-auto max-w-[700px] px-6">
          <h2 className="heading-lg text-ink text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-1">
            {faqs.map((faq, i) => (
              <div key={i} className="surface-card rounded-[10px] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer bg-transparent border-0"
                >
                  <span className="text-[14px] font-[500] text-ink pr-4">{faq.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`shrink-0 text-ink-muted transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-[13px] text-ink-secondary leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="w-full bg-surface-dark text-surface-raised py-16">
        <div className="mx-auto max-w-[600px] px-6 text-center">
          <h2 className="text-[28px] font-[500] text-white mb-3">Run an entire company with AI agents</h2>
          <p className="text-[15px] text-white/60 mb-6">Automyte is an agent orchestration platform designed to run an entire business.</p>
          <Link href="/login" className="relative inline-flex items-center justify-center h-[41px] px-6 rounded-[8px] no-underline">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[8px] cta-btn" />
            <span className="relative z-10 text-[15px] font-[460] text-[#1a1a1a]">Run a company</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
