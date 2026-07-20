"use client";

import Link from "next/link";
import { useState } from "react";
import { resourcesData, ResourceArticle } from "@/lib/resources-data";
import { ArrowRight, Sparkles, BookOpen, Filter, Search } from "lucide-react";

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Announcement", "Case Study", "Engineering", "Essay"];

  const filteredArticles = resourcesData.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = resourcesData.find((a) => a.featured) || resourcesData[0];

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#1A1A1A] font-sans flex flex-col selection:bg-amber-200 selection:text-black">
      {/* ============================================================ */}
      {/* TOP NAVIGATION HEADER */}
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
                className="px-3 py-1 rounded-full text-slate-600 hover:text-black no-underline transition-all"
              >
                Start
              </Link>
              <Link
                href="/how-to/build"
                className="px-3 py-1 rounded-full text-slate-600 hover:text-black no-underline transition-all"
              >
                Build
              </Link>
              <Link
                href="/how-to/sell"
                className="px-3 py-1 rounded-full text-slate-600 hover:text-black no-underline transition-all"
              >
                Sell
              </Link>
              <Link
                href="/how-to/scale"
                className="px-3 py-1 rounded-full text-slate-600 hover:text-black no-underline transition-all"
              >
                Scale
              </Link>
            </div>

            <Link
              href="/resources"
              className="text-xs font-bold text-black border-b-2 border-black pb-0.5 no-underline"
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
      {/* HERO BANNER & STATS */}
      {/* ============================================================ */}
      <section className="pt-16 pb-12 px-6 bg-white border-b border-black/5 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/10 text-xs font-semibold text-slate-700 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>95,000 agents powering 6,959 companies</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-[112%]">
            Automyte AI Resources & Case Studies
          </h1>

          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Read product announcements, founder case studies, agent-native engineering guides, and operational playbooks from teams running companies with AI agents.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURED HERO ARTICLE */}
      {/* ============================================================ */}
      {featuredArticle && (
        <section className="max-w-7xl mx-auto px-6 py-12 w-full">
          <Link
            href={`/resources/${featuredArticle.slug}`}
            className="group block bg-white rounded-3xl p-6 md:p-8 border border-black/10 shadow-sm hover:shadow-xl transition-all no-underline overflow-hidden"
          >
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 relative aspect-video md:aspect-4/3 rounded-2xl overflow-hidden border border-black/5">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  Featured Announcement
                </div>
              </div>

              <div className="md:col-span-6 space-y-4">
                <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                  <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
                    {featuredArticle.category}
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] group-hover:text-amber-600 transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {featuredArticle.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#1A1A1A] group-hover:translate-x-1 transition-transform">
                  <span>Read full announcement</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ============================================================ */}
      {/* FILTER TABS & SEARCH BAR */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 py-6 w-full space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-black/5 pb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs"
                    : "bg-white text-slate-600 border-black/10 hover:border-black/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-black/10 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        {/* ARTICLES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="group bg-white rounded-3xl p-6 border border-black/10 shadow-xs hover:shadow-lg transition-all no-underline flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-black/5 bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700">
                    {article.category}
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#1A1A1A] group-hover:text-amber-600 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-black/5 flex items-center justify-between text-xs text-slate-500">
                <span>{article.readTime}</span>
                <span className="font-bold text-[#1A1A1A] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-black/5 bg-white text-center text-xs text-slate-400 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Automyte AI. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-black no-underline">
              Home
            </Link>
            <Link href="/how-to/start" className="hover:text-black no-underline">
              How To
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
