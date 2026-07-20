"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#1A1A1A] font-sans flex flex-col">
      <header className="sticky top-0 z-50 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-serif font-semibold tracking-tight text-[#1A1A1A] no-underline">
            <span>Automyte</span>
          </Link>
          <Link href="/signup" className="text-xs font-semibold text-slate-700 hover:text-black no-underline">
            Back to Sign Up
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 space-y-6">
        <h1 className="text-3xl font-serif font-bold">Terms of Service</h1>
        <p className="text-xs text-slate-500 font-mono">Last updated: July 2026</p>

        <div className="bg-white p-8 rounded-3xl border border-black/10 shadow-xs space-y-4 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-lg font-bold text-[#1A1A1A]">1. Agreement to Terms</h2>
          <p>By accessing or using Automyte AI ("Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.</p>

          <h2 className="text-lg font-bold text-[#1A1A1A]">2. Description of Service</h2>
          <p>Automyte AI provides an agentic workspace platform enabling founders to deploy, orchestrate, and collaborate with autonomous executive AI agents.</p>

          <h2 className="text-lg font-bold text-[#1A1A1A]">3. User Responsibilities</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials, reviewing agent-generated code or documents before deployment, and ensuring compliance with applicable laws.</p>

          <h2 className="text-lg font-bold text-[#1A1A1A]">4. Intellectual Property</h2>
          <p>All content, branding, and platform architecture are the property of Automyte AI. Work products, code, and documents generated for your specific workspace belong to your company.</p>

          <h2 className="text-lg font-bold text-[#1A1A1A]">5. Limitation of Liability</h2>
          <p>Automyte AI is provided on an "as is" and "as available" basis without warranties of any kind. In no event shall Automyte AI be liable for indirect, incidental, or consequential damages.</p>
        </div>
      </main>

      <footer className="py-8 border-t border-black/5 bg-white text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Automyte AI. All rights reserved.
      </footer>
    </div>
  );
}
