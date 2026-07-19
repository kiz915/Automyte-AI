"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, Zap, Target, LineChart, Users } from "lucide-react";

const contentMap: Record<
  string,
  {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    description: string;
    steps: { title: string; desc: string }[];
    quote: string;
  }
> = {
  start: {
    title: "Start your company",
    subtitle: "Go from idea to incorporation in days, not months.",
    icon: <Zap className="w-6 h-6 text-ink-secondary" />,
    description:
      "Starting a company usually involves endless research, expensive lawyers, and confusing paperwork. With Automyte AI, your virtual Legal and Operations executives handle the heavy lifting.",
    steps: [
      {
        title: "1. Define your structure",
        desc: "Chat with your Legal Agent to determine if you need an LLC or C-Corp based on your funding goals.",
      },
      {
        title: "2. Generate paperwork",
        desc: "Instantly generate localized operating agreements, bylaws, and founder equity splits.",
      },
      {
        title: "3. Set up the back-office",
        desc: "Your Finance Agent will map out your cap table and prepare your initial banking requirements.",
      },
    ],
    quote: "Automyte took the headache out of incorporation. It was like having a seasoned GC on staff from day one.",
  },
  build: {
    title: "Build your product",
    subtitle: "Accelerate development with AI-driven product management.",
    icon: <Target className="w-6 h-6 text-ink-secondary" />,
    description:
      "Building the MVP is the hardest part of any startup journey. Your Engineering and Design agents work together to turn your rough ideas into deployable code and beautiful interfaces.",
    steps: [
      {
        title: "1. PRD Generation",
        desc: "Your Product Agent turns your brain-dump into a structured Product Requirements Document.",
      },
      {
        title: "2. UI/UX Design System",
        desc: "The Design Agent establishes your brand kit, color palette, and component library.",
      },
      {
        title: "3. Code Generation",
        desc: "The Engineering Agent sets up your CI/CD pipeline and writes the foundational boilerplate.",
      },
    ],
    quote: "We shipped our MVP in 3 weeks instead of 3 months. The engineering agent caught edge cases we didn't even think of.",
  },
  sell: {
    title: "Sell to customers",
    subtitle: "Build a scalable GTM motion from day one.",
    icon: <Users className="w-6 h-6 text-ink-secondary" />,
    description:
      "You built it, but will they come? Your Sales and Marketing agents help you identify your Ideal Customer Profile (ICP), write compelling copy, and execute outbound campaigns.",
    steps: [
      {
        title: "1. Define your ICP",
        desc: "The Marketing Agent analyzes your product to identify the highest-converting buyer personas.",
      },
      {
        title: "2. Craft the messaging",
        desc: "Generate landing page copy, email sequences, and ad creatives tailored to your audience.",
      },
      {
        title: "3. Execute outreach",
        desc: "The Sales Agent builds targeted lead lists and drafts personalized cold emails for your approval.",
      },
    ],
    quote: "Our marketing agent wrote a cold email sequence that got us our first 10 paying enterprise customers.",
  },
  scale: {
    title: "Scale your operations",
    subtitle: "Maintain momentum without breaking the machine.",
    icon: <LineChart className="w-6 h-6 text-ink-secondary" />,
    description:
      "When you hit product-market fit, things break. Your Finance and Operations agents help you forecast cash flow, automate HR onboarding, and keep the engine running smoothly.",
    steps: [
      {
        title: "1. Financial Modeling",
        desc: "The Finance Agent builds dynamic runway models and prepares your Series A data room.",
      },
      {
        title: "2. Automate Workflows",
        desc: "The Operations Agent connects your CRM to your billing system to eliminate manual data entry.",
      },
      {
        title: "3. Scale Support",
        desc: "Deploy AI-driven support protocols to handle tier-1 customer tickets automatically.",
      },
    ],
    quote: "Scaling from 10 to 50 employees usually breaks a company. Automyte's operations agent kept us completely sane.",
  },
};

export default function HowToPage() {
  const params = useParams();
  const slug = params.slug as string;

  const content = contentMap[slug];

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-surface/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-md bg-ink flex items-center justify-center">
              <span className="text-surface-raised text-sm font-bold">A</span>
            </div>
            <span className="text-[20px] font-semibold tracking-tight text-ink">
              Automyte
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-[14px] font-[500] text-ink-secondary hover:text-ink transition-colors no-underline"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="h-[36px] px-4 rounded-full bg-ink text-ink-inverted flex items-center justify-center text-[13px] font-[500] hover:bg-[#333] transition-colors no-underline"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 border-b border-border-subtle bg-surface-card">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-surface border border-border-subtle mb-6 shadow-sm">
              {content.icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-6">
              {content.title}
            </h1>
            <p className="text-xl text-ink-secondary font-[420] max-w-2xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-24 px-6">
          <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <h2 className="text-2xl font-semibold text-ink mb-4">
                The Playbook
              </h2>
              <p className="text-[15px] text-ink-faint leading-relaxed mb-10">
                {content.description}
              </p>

              <div className="space-y-8">
                {content.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-ink-secondary" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-[500] text-ink mb-1">
                        {step.title}
                      </h3>
                      <p className="text-[14px] text-ink-faint leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA & Quote */}
            <div className="space-y-8">
              {/* Card */}
              <div className="surface-card p-8 rounded-[16px] border border-border-subtle shadow-sm">
                <h3 className="text-xl font-semibold text-ink mb-2">
                  Ready to execute?
                </h3>
                <p className="text-[14px] text-ink-faint mb-6">
                  Deploy your AI executive team today and start executing on this
                  playbook immediately.
                </p>
                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-2 w-full h-[44px] rounded-[8px] bg-ink text-ink-inverted text-[14px] font-[500] hover:bg-[#333] transition-colors no-underline"
                >
                  Start building for free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quote block */}
              <blockquote className="pl-6 border-l-2 border-ink/20">
                <p className="text-[15px] italic text-ink-secondary mb-4 leading-relaxed">
                  "{content.quote}"
                </p>
                <footer className="text-[13px] font-[500] text-ink">
                  — Kishore V, Automyte CEO
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-border-subtle text-center">
        <p className="text-[13px] text-ink-ghost">
          © {new Date().getFullYear()} Automyte AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
