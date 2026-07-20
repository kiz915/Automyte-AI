"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { resourcesData, ResourceArticle } from "@/lib/resources-data";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Share2 } from "lucide-react";

export default function ResourceArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const article = resourcesData.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = resourcesData
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

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
            <Link
              href="/resources"
              className="text-xs font-semibold text-slate-700 hover:text-black flex items-center gap-1.5 no-underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Resources
            </Link>

            <Link
              href="/how-to/start"
              className="text-xs font-medium text-slate-700 hover:text-black transition-colors no-underline"
            >
              How To
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
      {/* ARTICLE HEADER & COVER IMAGE */}
      {/* ============================================================ */}
      <article className="max-w-4xl mx-auto px-6 py-12 w-full space-y-8 flex-1">
        {/* Meta Bar */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
            <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
              {article.category}
            </span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1A1A1A] leading-[115%]">
            {article.title}
          </h1>

          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-sm">
              {article.author.name[0]}
            </div>
            <div>
              <div className="text-xs font-bold text-[#1A1A1A]">
                {article.author.name}
              </div>
              <div className="text-xs text-slate-500">{article.author.role}</div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="aspect-video w-full rounded-3xl overflow-hidden border border-black/10 shadow-sm bg-slate-100">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="bg-white p-6 rounded-3xl border border-black/10 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Key Takeaways
            </h3>
            <div className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/10 shadow-xs space-y-6 text-slate-800 text-base leading-relaxed font-normal">
          <div
            className="prose prose-slate max-w-none space-y-6"
            dangerouslySetInnerHTML={{
              __html: article.content.replace(/\n\n/g, "</p><p>").replace(/### (.*)/g, '<h3 class="text-xl font-bold text-[#1A1A1A] mt-6 mb-2">$1</h3>').replace(/> (.*)/g, '<blockquote class="border-l-4 border-amber-500 pl-4 py-2 italic text-slate-600 bg-amber-50/50 rounded-r-xl">$1</blockquote>'),
            }}
          />
        </div>

        {/* Call to Action Box */}
        <div className="bg-[#1A1A1A] text-white p-8 md:p-10 rounded-3xl shadow-xl space-y-4 text-center">
          <h3 className="text-2xl font-serif font-bold">Ready to build with Automyte AI?</h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Deploy your virtual executive squad today and start executing on your startup roadmap.
          </p>
          <div className="pt-2">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-slate-100 transition-all no-underline shadow-md"
            >
              Start building for free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="pt-12 space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
              Related Articles & Case Studies
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/resources/${rel.slug}`}
                  className="group bg-white p-5 rounded-2xl border border-black/10 shadow-2xs hover:shadow-md transition-all no-underline space-y-3"
                >
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#1A1A1A] group-hover:text-amber-600 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <div className="text-xs text-slate-500">{rel.readTime}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

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
            <Link href="/how-to/start" className="hover:text-black no-underline">
              How To
            </Link>
            <Link href="/pricing" className="hover:text-black no-underline">
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
