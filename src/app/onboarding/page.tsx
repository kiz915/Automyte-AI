"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/store";
import { ArrowRight, ChevronLeft, Sparkles, Check, Play, LogOut, Plus, Send } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [onboardingStage, setOnboardingStage] = useState<1 | 2 | 3 | 4>(1);

  // Stage 1: Idea stage selection
  const [ideaStageIdx, setIdeaStageIdx] = useState(1); // 0=Pre-idea, 1=Idea, 2=Pre-MVP, 3=MVP, 4=Customers, 5=Revenue, 6=Public
  const stages = ["Pre-idea", "Idea", "Pre-MVP", "MVP", "Customers", "Revenue", "Public"];

  // Stage 3: Chat & Business Plan generation
  const [companyPrompt, setCompanyPrompt] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasBusinessPlan, setHasBusinessPlan] = useState(false);
  const [spawnedNodes, setSpawnedNodes] = useState<string[]>([]);

  // Stage 4: Visual identity options
  const [activeVibe, setActiveVibe] = useState("Minimalist Dark");

  const handleSendPrompt = () => {
    if (!companyPrompt.trim() || isGenerating) return;
    const userMsg = companyPrompt.trim();
    setCompanyPrompt("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsGenerating(true);

    // Simulate AI response & spawning department nodes onto the orbit canvas
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Analyzing ${userMsg}... I've generated your founding strategy and initialized your executive department agents.`,
        },
      ]);
      setHasBusinessPlan(true);
      setSpawnedNodes(["Marketing", "Finance", "Operations", "Sales", "Engineering", "Design", "Legal", "Support"]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleFinishOnboarding = () => {
    try {
      updateProfile({
        vision_mission: "Build a premier AI agent orchestration platform for end-to-end business operations.",
        target_audience: "Startups, SaaS teams, and digital agencies",
        business_model: "Subscription & usage-based executive AI agents",
      });
    } catch (e) {
      console.error(e);
    }
    router.push("/canvas");
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#1A1A1A] font-sans select-none flex flex-col justify-between relative overflow-hidden">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-8 py-5 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-black/10 text-xs font-semibold text-slate-700 hover:bg-white transition-all shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5 rotate-180" /> Log out
          </button>

          {onboardingStage >= 3 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-black/10 text-xs font-semibold text-slate-800">
              <span className="w-5 h-5 rounded bg-amber-100 text-amber-700 font-extrabold flex items-center justify-center text-[10px]">
                AA
              </span>
              <span>Automyte</span>
              <span className="text-[10px] text-slate-400">▾</span>
            </div>
          )}
        </div>

        {/* Top Right Skip Button when in Stage 3 or 4 */}
        {onboardingStage >= 3 && (
          <button
            onClick={handleFinishOnboarding}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm"
          >
            Skip onboarding →
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SCREEN 1: IDEA STAGE SELECTOR WITH ASCII ART BANNER */}
      {/* ========================================================================= */}
      {onboardingStage === 1 && (
        <div className="flex-1 flex items-center justify-between px-16 max-w-7xl mx-auto w-full z-10">
          {/* Left Side: ASCII Art Text */}
          <div className="font-mono text-slate-400 leading-none text-[13px] tracking-tight select-none opacity-85">
            <pre className="text-slate-500 font-extrabold leading-tight">
{`   _____                           _ 
  / ____|                         | |
 | |  __  ___ _ __   ___ _ __ __ _| |
 | | |_ |/ _ \\ '_ \\ / _ \\ '__/ _\` | |
 | |__| |  __/ | | |  __/ | | (_| | |
  \\____|_|\\___|_| |_|\\___|_|  \\__,_|_|

  _____ _____ _______ 
 |_   _/ ____|__   __|
   | || |  __   | |   
   | || | |_ |  | |   
  _| || |__| |  | |   
 |_____\\_____|  |_|   

   _____                                                 
  / ____|                                                
 | |  __ ___  _ __ ___  _ __   __ _ _ __  _   _ 
 | | |_ / _ \\| '_ \` _ \\| '_ \\ / _\` | '_ \\| | | |
 | |__| | (_) | | | | | | |_) | (_| | | | | |_| |
  \\_____|\\___/|_| |_| |_| .__/ \\__,_|_| |_|\\__, |
                        | |                 __/ |
                        |_|                |___/ `}
            </pre>
          </div>

          {/* Right Side: Idea Stage Slider */}
          <div className="w-full max-w-md space-y-8 bg-white/40 p-8 rounded-3xl backdrop-blur-sm border border-black/5">
            <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">What stage is your idea?</h1>

            {/* Stage Selector Pills & Slider Ticks */}
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs font-medium text-slate-500 px-1">
                {stages.map((stg, i) => (
                  <button
                    key={stg}
                    onClick={() => setIdeaStageIdx(i)}
                    className={`px-2 py-1 rounded-md transition-all ${
                      ideaStageIdx === i ? "bg-[#E6E4DD] text-[#1A1A1A] font-bold" : "hover:text-black"
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>

              {/* Ticks Scale Line */}
              <div className="relative py-2">
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={ideaStageIdx}
                  onChange={(e) => setIdeaStageIdx(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between px-2 text-[10px] text-slate-400 font-mono mt-1">
                  {stages.map((_, i) => (
                    <span key={i} className={ideaStageIdx === i ? "text-blue-600 font-bold" : ""}>
                      |
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setOnboardingStage(2)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all shadow-md"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 2: CREATE YOUR COMPANY */}
      {/* ========================================================================= */}
      {onboardingStage === 2 && (
        <div className="flex-1 flex items-center justify-center gap-16 px-12 max-w-5xl mx-auto w-full z-10">
          {/* Pixel Sunflower Graphic */}
          <div className="text-center">
            <pre className="font-mono text-amber-500 leading-none text-[11px] font-bold select-none tracking-tighter">
{`       .-""-.
     .'  __  '.
    /   /  \\   \\
   |   | () |   |
    \\   \\__/   /
     '.______.'
       ||||||
       ||||||
    \\//||||||//\\
     \\/||||||\\/
       ||||||
       ||||||
       ||||||`}
            </pre>
          </div>

          {/* Action Box */}
          <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">Create your company</h1>
            <button
              onClick={() => setOnboardingStage(3)}
              className="px-8 py-3.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all shadow-md"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 3: INTERACTIVE CHAT & ORBIT GRAPH ONBOARDING */}
      {/* ========================================================================= */}
      {onboardingStage === 3 && (
        <div className="flex-1 flex overflow-hidden z-10">
          {/* Left Canvas: Radial Orbit Graph */}
          <div className="flex-1 relative flex items-center justify-center border-r border-black/5">
            <svg viewBox="0 0 440 440" className="w-full max-w-md aspect-square">
              {/* Outer Orbit Circle */}
              <circle cx="220" cy="220" r="150" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="3 3" fill="none" />

              {/* Central Cofounder Node */}
              <g className="cursor-pointer">
                <rect x="170" y="195" width="100" height="50" rx="14" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" />
                <text x="220" y="215" textAnchor="middle" fontSize="14">🌻</text>
                <text x="220" y="233" textAnchor="middle" fontSize="11" fontStyle="italic" fontFamily="Georgia, serif" fill="#1A1A1A">Cofounder</text>
              </g>

              {/* Spawning Department Nodes */}
              {spawnedNodes.map((dept, i) => {
                const angle = (i * 360) / spawnedNodes.length;
                const rad = (angle * Math.PI) / 180;
                const x = 220 + 150 * Math.cos(rad - Math.PI / 2);
                const y = 220 + 150 * Math.sin(rad - Math.PI / 2);
                return (
                  <g key={dept} className="animate-in fade-in zoom-in duration-500">
                    <line x1="220" y1="220" x2={x} y2={y} stroke="rgba(0,0,0,0.1)" strokeDasharray="3 3" />
                    <rect x={x - 35} y={y - 14} width="70" height="28" rx="8" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                    <text x={x} y={y + 4} textAnchor="middle" fontSize="9.5" fontStyle="normal" fontWeight="500" fill="#333333">
                      {dept}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right Panel: Interactive Onboarding Chat */}
          <div className="w-[480px] bg-white border-l border-black/5 flex flex-col justify-between shadow-xl">
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {!hasBusinessPlan ? (
                /* Initial Chat Prompt Screen */
                <div className="space-y-6 text-center py-12">
                  <div className="text-4xl">🌻</div>
                  <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">Tell me more about your company</h2>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">Brief your virtual cofounder about your startup vision, product goals, or business model.</p>
                </div>
              ) : (
                /* Business Plan Accepted Card Output */
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 border-b border-black/5 pb-3">
                    <span>📑 Onboarding</span>
                    <span>•</span>
                    <span>Automyte . Automyte AI</span>
                  </div>

                  {/* Business Plan Card */}
                  <div className="bg-[#FAF9F6] border border-black/10 rounded-2xl p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-black/5 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📄</span>
                        <div>
                          <h3 className="text-xs font-bold text-[#1A1A1A]">Business Plan</h3>
                          <p className="text-[10px] text-slate-400">Automyte . Automyte AI</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-black/10 rounded-lg text-slate-700">Edit</button>
                        <button className="px-2 py-1 text-[11px] font-semibold bg-white border border-black/10 rounded-lg text-slate-700">↗</button>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Company Name</span>
                        <p className="font-semibold text-slate-900 mt-1">Automyte</p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Product or Service</span>
                        <p className="text-slate-700 leading-relaxed mt-1">
                          Automyte is an AI automation platform for internal operations. It helps teams replace repetitive work with workflows, agents, and integrations.
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">First wedge</span>
                        <p className="text-slate-700 leading-relaxed mt-1">
                          Own one painful internal workflow end-to-end (high ROI, narrowly scoped) before expanding into a broader ops automation platform.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 text-center">
                      <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-black/10 text-xs font-bold text-emerald-700 shadow-xs">
                        ✓ Business Plan Accepted
                      </div>
                    </div>
                  </div>

                  {/* Next Step Banner */}
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-[10px] text-slate-500 uppercase tracking-wider block">NEXT: BRAND DESIGN</span>
                      <span className="text-slate-600 text-[11px]">We'll use your answers for the look and feel.</span>
                    </div>
                    <button
                      onClick={() => setOnboardingStage(4)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1A1A1A] text-white font-semibold text-xs hover:bg-black transition-colors"
                    >
                      Proceed →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Input Box */}
            <div className="p-4 border-t border-black/5 bg-[#FAF9F6]">
              <div className="flex items-center gap-2 border border-black/10 bg-white rounded-2xl p-2 shadow-xs">
                <input
                  type="text"
                  value={companyPrompt}
                  onChange={(e) => setCompanyPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendPrompt();
                  }}
                  placeholder={hasBusinessPlan ? "Ask for follow up changes..." : "Share what you're building..."}
                  className="flex-1 border-0 focus:outline-none text-xs text-slate-800 px-2 py-1"
                />
                <button
                  onClick={handleSendPrompt}
                  disabled={!companyPrompt.trim() || isGenerating}
                  className="w-8 h-8 rounded-xl bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-black transition-colors disabled:opacity-30"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 4: VISUAL IDENTITY & BRAND KIT MODAL */}
      {/* ========================================================================= */}
      {onboardingStage === 4 && (
        <div className="flex-1 flex items-center justify-center p-8 z-10">
          <div className="bg-white border border-black/10 rounded-3xl max-w-3xl w-full p-10 shadow-2xl space-y-8 text-center relative overflow-hidden">
            {/* Header Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <span>*</span> Design agent ready
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">
                Let's build <span className="text-indigo-600">your visual identity</span> from the ground up.
              </h1>
              <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
                First we'll create a brand kit for Automyte. Then Design can move into logos, decks, components, and the rest of the workspace.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleFinishOnboarding}
                className="px-6 py-3 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold hover:bg-black transition-all shadow-md"
              >
                Choose vibe &gt;
              </button>
              <button
                onClick={handleFinishOnboarding}
                className="px-6 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all"
              >
                Skip setup
              </button>
            </div>

            {/* Design Roadmap Row */}
            <div className="pt-6 border-t border-black/5 space-y-4 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Design Roadmap</span>
              <div className="grid grid-cols-3 gap-3">
                <div className="border border-indigo-200 bg-indigo-50/40 p-4 rounded-xl space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">Brand kit</h4>
                  <p className="text-[10.5px] text-slate-500">Choose vibe, add references, review the first board</p>
                </div>
                <div className="border border-slate-200 p-4 rounded-xl space-y-1 opacity-60">
                  <h4 className="text-xs font-bold text-slate-900">Design logo</h4>
                  <p className="text-[10.5px] text-slate-500">Unlocked after brand approval</p>
                </div>
                <div className="border border-slate-200 p-4 rounded-xl space-y-1 opacity-60">
                  <h4 className="text-xs font-bold text-slate-900">Create pitch deck</h4>
                  <p className="text-[10.5px] text-slate-500">Business context plus brand kit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
