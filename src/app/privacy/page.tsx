"use client";

import Link from "next/link";

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-serif font-bold">Privacy Policy</h1>
        <p className="text-xs text-slate-500 font-mono">Last updated: July 2026</p>

        <div className="bg-white p-8 rounded-3xl border border-black/10 shadow-xs space-y-4 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-lg font-bold text-[#1A1A1A]">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when creating an account, configuring workspace prompts, or communicating with executive agents on the platform.</p>

          <h2 className="text-lg font-bold text-[#1A1A1A]">2. How We Use Information</h2>
          <p>Your data is used solely to provide, maintain, and improve the Automyte AI platform services, process transactions, and personalize your agent workspace context.</p>

          <h2 className="text-lg font-bold text-[#1A1A1A]">3. Data Security & Isolation</h2>
          <p>We implement strict row-level security (RLS) and encryption standard safeguards to protect your workspace data. We do not sell or share your workspace data with third parties.</p>

          <h2 className="text-lg font-bold text-[#1A1A1A]">4. Your Rights & Choices</h2>
          <p>You may access, update, or delete your account information and workspace data at any time from your settings dashboard.</p>
        </div>
      </main>

      <footer className="py-8 border-t border-black/5 bg-white text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Automyte AI. All rights reserved.
      </footer>
    </div>
  );
}
