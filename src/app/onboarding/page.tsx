"use client";

/* ============================================================
   AUTOMYTE AI — Run a Company (Reworked End-to-End Operational Workflow)
   Flowchart & Specification Compliant Implementation
   ============================================================ */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getUser,
  setUserLogin,
  getCompany,
  setCompanyData,
  getInterviewData,
  saveInterviewAnswer,
  getAnalysisResult,
  setAnalysisResult,
  getTasks,
  completeTask,
  reprioritizeTasks,
  getDocuments,
  getProgress,
  generateFullCompanyWorkspace,
  type CompanyData,
  type InterviewData,
  type AIAnalysisResult,
} from "@/lib/store";
import type { Task, Document } from "@/types/database";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Bot,
  Building2,
  FileText,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Play,
  LogOut,
  Send,
  RefreshCw,
  Plus,
  Compass,
  Layers,
  Award,
  Clock,
  Check,
  HelpCircle,
  Eye,
  ChevronRight,
  Target,
  Zap,
} from "lucide-react";

export default function RunACompanyPage() {
  const router = useRouter();

  // Core Process Stages
  // 1: Auth Guard, 2: Check Company, 3: Create Company, 4: AI Founder Interview,
  // 5: AI Analysis Pipeline, 6: Workspace & Docs Generation, 7: Founder Dashboard
  const [stage, setStage] = useState<
    "auth" | "check_company" | "create_company" | "interview" | "analysis" | "generation" | "dashboard"
  >("auth");

  // User & Auth State
  const [userState, setUserState] = useState(getUser());
  const [loginEmail, setLoginEmail] = useState("");

  // Company Form State
  const [companyName, setCompanyName] = useState("");
  const [startupIdea, setStartupIdea] = useState("");
  const [industry, setIndustry] = useState("Developer Tools / AI");
  const [companyStageIdx, setCompanyStageIdx] = useState(1);
  const stagesList = ["Pre-idea", "Idea", "Pre-MVP", "MVP", "Customers", "Revenue", "Public"];
  const [teamSize, setTeamSize] = useState("Solo Founder");
  const [formError, setFormError] = useState<string | null>(null);

  // AI Interview State
  const interviewQuestions = [
    {
      id: "q1",
      key: "targetCustomer" as keyof InterviewData,
      title: "Who is your primary target customer and what core pain point are you solving?",
      subtitle: "Focus on the specific persona and why current market solutions fall short.",
      placeholder: "e.g., Early tech founders and micro-SaaS developers struggling with operational legal & strategy overhead...",
    },
    {
      id: "q2",
      key: "solution" as keyof InterviewData,
      title: "What is your proposed solution and what makes it 10x better or unique?",
      subtitle: "Describe your product wedge, core mechanism, or competitive moat.",
      placeholder: "e.g., An autonomous executive team of 12 AI agents that execute company ops without prompt engineering...",
    },
    {
      id: "q3",
      key: "revenueModel" as keyof InterviewData,
      title: "What is your business model and monetization strategy?",
      subtitle: "Outline your pricing structure, tiering, or unit economics.",
      placeholder: "e.g., $29/mo Pro subscription with usage-based credits for execution agent workflows...",
    },
    {
      id: "q4",
      key: "competitors" as keyof InterviewData,
      title: "Who are your primary competitors, and what is your unfair advantage?",
      subtitle: "List key players and your secret positioning strategy.",
      placeholder: "e.g., Traditional SaaS workflow builders and single-prompt business plan generators...",
    },
    {
      id: "q5",
      key: "milestones" as keyof InterviewData,
      title: "What are your top 30-day goals and any key constraints or risks?",
      subtitle: "Define milestone targets for launch, revenue, or customer traction.",
      placeholder: "e.g., Launch MVP build in 3 weeks, onboard 50 beta founders, reach $5k MRR...",
    },
  ];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [interviewHistory, setInterviewHistory] = useState<
    Array<{ question: string; answer: string; isFollowUp?: boolean }>
  >([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [followUpPrompt, setFollowUpPrompt] = useState<string | null>(null);

  // AI Analysis Pipeline State
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [analysisData, setAnalysisData] = useState<AIAnalysisResult | null>(null);

  // Workspace Generation State
  const [genStepIndex, setGenStepIndex] = useState(0);
  const genSteps = [
    "Initializing Company Memory Store...",
    "Executing AI Structuring & Idea Validation...",
    "Generating Executive Summary & Lean Canvas...",
    "Formulating Product Roadmap & Milestones Plan...",
    "Creating First Week Execution Guide...",
    "Decomposing MVP Features into Daily Sprint Tasks...",
    "Assembling Operational Founder Dashboard...",
  ];

  // Dashboard Active State
  const [dashboardTab, setDashboardTab] = useState<"mission" | "documents" | "roadmap" | "ceo_chat">("mission");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [docList, setDocList] = useState<Document[]>([]);
  const [activeDoc, setActiveDoc] = useState<Document | null>(null);
  const [progressState, setProgressState] = useState(getProgress());
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string; time: string }>
  >([
    {
      role: "assistant",
      content: "Welcome to your Automyte Founder Workspace! I am your CEO AI Agent. All company documents, roadmap milestones, and daily tasks have been generated. What would you like to tackle today?",
      time: "Just now",
    },
  ]);
  const [userChatInput, setUserChatInput] = useState("");
  const [aiFeedbackAlert, setAiFeedbackAlert] = useState<string | null>(null);

  // Initial Load & Auth Check
  useEffect(() => {
    const user = getUser();
    setUserState(user);
    if (!user.isLoggedIn) {
      router.push("/login");
    } else {
      const comp = getCompany();
      if (comp && comp.hasCompany) {
        setStage("check_company");
      } else {
        setStage("create_company");
      }
    }
  }, [router]);

  // Update dashboard tasks and docs when entering dashboard
  const refreshDashboardData = () => {
    const tasks = getTasks();
    const docs = getDocuments();
    const prog = getProgress();
    setTaskList([...tasks]);
    setDocList([...docs]);
    setProgressState({ ...prog });
    const current = tasks.find((t) => t.status === "ongoing" || t.status === "todo") || tasks[0] || null;
    setActiveTask(current);
  };

  // Step 1: Authentication Handlers
  const handleLogin = (provider: "google" | "github" | "email") => {
    const email = provider === "email" ? loginEmail || "founder@automyte.ai" : `founder.${provider}@automyte.ai`;
    const updatedUser = setUserLogin(true, email, "Founder");
    setUserState(updatedUser);
    
    // Check company existence after login
    const comp = getCompany();
    if (comp && comp.hasCompany) {
      setStage("check_company");
    } else {
      setStage("create_company");
    }
  };

  // Step 3: Create Company Form Submit & Validation
  const handleCreateCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!companyName.trim()) {
      setFormError("Please enter your company name.");
      return;
    }
    if (!startupIdea.trim()) {
      setFormError("Please describe your startup idea.");
      return;
    }

    // Save initial company metadata
    setCompanyData({
      name: companyName.trim(),
      idea: startupIdea.trim(),
      industry,
      stage: stagesList[companyStageIdx],
      teamSize,
    });

    // Move to AI Founder Interview
    setStage("interview");
  };

  // Step 4: AI Founder Interview Handler
  const handleAnswerSubmit = () => {
    if (!currentAnswer.trim() || isAiThinking) return;

    const currentQ = interviewQuestions[currentQuestionIdx];
    const userAns = currentAnswer.trim();

    // Check if answer is too brief -> trigger dynamic follow-up
    if (userAns.length < 15 && !followUpPrompt) {
      setFollowUpPrompt(`Could you elaborate a bit more on ${currentQ.title.toLowerCase()} to help me structure your company roadmap accurately?`);
      return;
    }

    setIsAiThinking(true);
    saveInterviewAnswer(currentQ.key, userAns);

    setInterviewHistory((prev) => [
      ...prev,
      {
        question: followUpPrompt || currentQ.title,
        answer: userAns,
        isFollowUp: !!followUpPrompt,
      },
    ]);

    setCurrentAnswer("");
    setFollowUpPrompt(null);

    setTimeout(() => {
      setIsAiThinking(false);
      if (currentQuestionIdx < interviewQuestions.length - 1) {
        setCurrentQuestionIdx((prev) => prev + 1);
      } else {
        // Interview complete -> Move to AI Analysis Pipeline
        setStage("analysis");
        runAiAnalysisPipeline();
      }
    }, 900);
  };

  // Step 5: AI Analysis Pipeline Engine
  const runAiAnalysisPipeline = () => {
    setAnalysisStep(1);

    setTimeout(() => {
      // Step 2: Idea Validation & Saturation Check
      setAnalysisStep(2);

      const generatedAnalysis: AIAnalysisResult = {
        isIdeaClear: true,
        marketSaturation: "medium",
        competitors: [
          {
            name: `${industry.split(" ")[0]} Competitor A`,
            summary: "Established market player with high enterprise pricing.",
            differentiation: `${companyName} offers 10x faster setup with automated AI execution.`,
          },
          {
            name: `${industry.split(" ")[0]} Competitor B`,
            summary: "Legacy SaaS platform with steep learning curve.",
            differentiation: "Simple unified workspace powered by 12 specialized executive agents.",
          },
        ],
        differentiation: `${companyName} combines strategic planning, document creation, and continuous task execution in one platform.`,
        swot: {
          strengths: ["Autonomous multi-agent execution", "Unified company memory", "Instant document synthesis"],
          weaknesses: ["New market entry", "API dependency"],
          opportunities: ["Unserved solo founder & developer market", "Viral ProductHunt launch"],
          threats: ["Hyperscaler AI bundling", "Market competition"],
        },
        confidenceScore: 96,
        recommendation: "High market potential. Recommended to proceed with MVP creation and Lean Canvas execution.",
      };

      setAnalysisResult(generatedAnalysis);
      setAnalysisData(generatedAnalysis);

      setTimeout(() => {
        setAnalysisStep(3);
      }, 1200);
    }, 1200);
  };

  // Step 6: Workspace & Document & Task Generation Handler
  const startWorkspaceGeneration = () => {
    setStage("generation");
    setGenStepIndex(0);

    const interval = setInterval(() => {
      setGenStepIndex((prev) => {
        if (prev < genSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Generate full workspace in store
          generateFullCompanyWorkspace(companyName || "Automyte", startupIdea || "AI Company Operating System", industry);
          refreshDashboardData();
          setTimeout(() => {
            setStage("dashboard");
          }, 800);
          return prev;
        }
      });
    }, 700);
  };

  // Step 11: Task Completion & Daily AI Review Handler
  const handleTaskComplete = (taskId: string) => {
    completeTask(taskId);
    refreshDashboardData();

    setAiFeedbackAlert(
      "🎉 Task Completed! Your progress updated, the next daily task is unlocked, and your company memory has been synced."
    );
    setTimeout(() => setAiFeedbackAlert(null), 5000);
  };

  const handleReprioritize = () => {
    reprioritizeTasks();
    refreshDashboardData();

    setAiFeedbackAlert("⚡ Tasks reprioritized! High-impact overdue items pushed to critical priority.");
    setTimeout(() => setAiFeedbackAlert(null), 5000);
  };

  const handleSendChat = () => {
    if (!userChatInput.trim()) return;
    const msg = userChatInput.trim();
    setUserChatInput("");

    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: msg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Analyzing "${msg}" against ${companyName}'s vision and document vault... I recommend prioritizing our MVP Feature Architecture sprint before launching outbound outreach. I've updated our internal notes.`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#1A1A1A] font-sans flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* Top Header Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/90 border-b border-black/10 backdrop-blur-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-base shadow-sm">
              A
            </div>
            <span className="font-serif font-extrabold text-xl tracking-tight text-[#1A1A1A]">
              Automyte <span className="text-xs font-sans font-normal text-slate-500 uppercase tracking-widest border border-black/10 px-2 py-0.5 rounded-full ml-1 bg-slate-50">Run a Company</span>
            </span>
          </div>

          {userState.isLoggedIn && (
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{userState.email}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {stage === "dashboard" && (
            <button
              onClick={() => setStage("create_company")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> New Company
            </button>
          )}

          {userState.isLoggedIn && (
            <button
              onClick={() => {
                setUserLogin(false);
                setUserState(getUser());
                setStage("auth");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-black/10 text-xs font-semibold text-slate-600 hover:text-black transition-all"
            >
              <LogOut className="w-3.5 h-3.5 rotate-180" /> Log out
            </button>
          )}
        </div>
      </nav>

      {/* Main Flow Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 z-20 relative max-w-7xl mx-auto w-full">

        {/* ========================================================================= */}
        {/* STAGE 1: AUTHENTICATION (IF USER NOT LOGGED IN) */}
        {/* ========================================================================= */}
        {stage === "auth" && (
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-black/10 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl mx-auto">
                🚀
              </div>
              <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Sign in to Run a Company</h1>
              <p className="text-xs text-slate-500">Authenticate to initialize your secure company workspace memory store.</p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => handleLogin("google")}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-black/10 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-all shadow-xs"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => handleLogin("github")}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-black/10 bg-slate-900 hover:bg-black text-xs font-semibold text-white transition-all shadow-xs"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Continue with GitHub
              </button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-semibold">
                <span className="bg-white px-2 text-slate-400">or email login</span>
              </div>
            </div>

            {/* Email Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin("email");
              }}
              className="space-y-3"
            >
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="founder@company.com"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-black/10 bg-slate-50 focus:outline-none focus:border-black/30"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all shadow-md"
              >
                Sign in & Start Workspace
              </button>
            </form>

            {/* Instant Demo Login Button */}
            <div className="pt-2">
              <button
                onClick={() => handleLogin("email")}
                className="w-full py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Continue in Demo Founder Mode →
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 2: CHECK COMPANY */}
        {/* ========================================================================= */}
        {stage === "check_company" && (
          <div className="max-w-lg w-full bg-white p-8 rounded-3xl border border-black/10 shadow-xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-3xl mx-auto">
              🏢
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-full">
                Active Company Found
              </span>
              <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">{getCompany().name}</h1>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                We retrieved your existing company workspace memory store with generated documents, tasks, and roadmap.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => {
                  refreshDashboardData();
                  setStage("dashboard");
                }}
                className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all shadow-md flex items-center justify-center gap-2"
              >
                Open Founder Dashboard →
              </button>
              <button
                onClick={() => setStage("create_company")}
                className="w-full py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all"
              >
                Build a New Company
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 3: CREATE COMPANY FORM */}
        {/* ========================================================================= */}
        {stage === "create_company" && (
          <div className="max-w-xl w-full bg-white p-8 md:p-10 rounded-3xl border border-black/10 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Company Initialization Form
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A]">Create your company</h1>
              <p className="text-xs text-slate-500">Provide basic information about your startup vision to initialize company memory.</p>
            </div>

            <form onSubmit={handleCreateCompanySubmit} className="space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Company Name *</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Automyte, Apex, Nexus AI"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-black/10 bg-slate-50 focus:outline-none focus:border-black/30 font-medium"
                />
              </div>

              {/* Startup Idea */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Startup Idea *</label>
                <textarea
                  rows={3}
                  value={startupIdea}
                  onChange={(e) => setStartupIdea(e.target.value)}
                  placeholder="Briefly describe what your product or business does..."
                  className="w-full px-4 py-3 text-xs rounded-xl border border-black/10 bg-slate-50 focus:outline-none focus:border-black/30 leading-relaxed"
                />
              </div>

              {/* Industry Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-black/10 bg-slate-50 focus:outline-none focus:border-black/30 font-medium"
                >
                  <option value="Developer Tools / AI">Developer Tools / Enterprise AI</option>
                  <option value="SaaS & Productivity">SaaS & Productivity</option>
                  <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                  <option value="FinTech & Finance">FinTech & Finance</option>
                  <option value="HealthTech & Wellness">HealthTech & Wellness</option>
                  <option value="EdTech & E-Learning">EdTech & E-Learning</option>
                  <option value="Marketplace & Community">Marketplace & Community</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Stage Selector */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <span>Current Stage</span>
                  <span className="text-blue-600 font-mono">{stagesList[companyStageIdx]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={companyStageIdx}
                  onChange={(e) => setCompanyStageIdx(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  {stagesList.map((stg, i) => (
                    <span key={stg} className={companyStageIdx === i ? "text-blue-600 font-bold" : ""}>
                      {stg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Size */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Team Size</label>
                <div className="grid grid-cols-4 gap-2">
                  {["Solo Founder", "2-5", "6-20", "20+"].map((sz) => (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => setTeamSize(sz)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                        teamSize === sz
                          ? "border-black bg-[#1A1A1A] text-white shadow-xs"
                          : "border-black/10 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Alert */}
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> {formError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all shadow-md flex items-center justify-center gap-2"
              >
                Submit & Start AI Founder Interview →
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 4: AI FOUNDER INTERVIEW */}
        {/* ========================================================================= */}
        {stage === "interview" && (
          <div className="max-w-2xl w-full bg-white p-8 md:p-10 rounded-3xl border border-black/10 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Interview Header & Progress */}
            <div className="space-y-4 border-b border-black/5 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  <Bot className="w-4 h-4" /> AI Founder Interview
                </div>
                <div className="text-xs font-mono text-slate-400 font-bold">
                  Question {currentQuestionIdx + 1} / {interviewQuestions.length}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-500"
                  style={{
                    width: `${((currentQuestionIdx + 1) / interviewQuestions.length) * 100}%`,
                  }}
                />
              </div>

              <div className="space-y-1 pt-2">
                <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">
                  {followUpPrompt || interviewQuestions[currentQuestionIdx].title}
                </h2>
                <p className="text-xs text-slate-500">
                  {interviewQuestions[currentQuestionIdx].subtitle}
                </p>
              </div>
            </div>

            {/* Past Answers Stream */}
            {interviewHistory.length > 0 && (
              <div className="space-y-3 max-h-48 overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-black/5 text-xs">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Saved Answers</div>
                {interviewHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1 border-b border-black/5 pb-2 last:border-0 last:pb-0">
                    <p className="font-semibold text-slate-800">Q: {item.question}</p>
                    <p className="text-slate-600 italic bg-white p-2 rounded-lg border border-black/5">"{item.answer}"</p>
                  </div>
                ))}
              </div>
            )}

            {/* Current Input Box */}
            <div className="space-y-4">
              <textarea
                rows={4}
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder={interviewQuestions[currentQuestionIdx].placeholder}
                className="w-full p-4 text-xs rounded-2xl border border-black/10 bg-slate-50 focus:outline-none focus:border-black/30 leading-relaxed font-medium"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {currentAnswer.length} characters • AI structures free-text automatically
                </span>

                <button
                  onClick={handleAnswerSubmit}
                  disabled={!currentAnswer.trim() || isAiThinking}
                  className="px-6 py-3 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all shadow-md disabled:opacity-40 flex items-center gap-2"
                >
                  {isAiThinking ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      Save & Next <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 5: AI ANALYSIS PIPELINE */}
        {/* ========================================================================= */}
        {stage === "analysis" && (
          <div className="max-w-2xl w-full bg-white p-8 md:p-10 rounded-3xl border border-black/10 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-3xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mx-auto">
                <Sparkles className="w-7 h-7 animate-pulse" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">AI Analysis Pipeline</h1>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Evaluating company vision, market saturation, competitors matrix, and priority scoring.
              </p>
            </div>

            {/* Analysis Progress Steps */}
            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-black/5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 font-semibold text-slate-800">
                  <CheckCircle2 className={`w-5 h-5 ${analysisStep >= 1 ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>Idea Validation & Clarity Check</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-600 font-bold">100% Clear</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 font-semibold text-slate-800">
                  <CheckCircle2 className={`w-5 h-5 ${analysisStep >= 2 ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>Market Saturation & Competitor Matrix</span>
                </div>
                <span className="font-mono text-[11px] text-amber-600 font-bold">Medium Saturation</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 font-semibold text-slate-800">
                  <CheckCircle2 className={`w-5 h-5 ${analysisStep >= 3 ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>SWOT & Execution Priority Score</span>
                </div>
                <span className="font-mono text-[11px] text-indigo-600 font-bold">96 / 100</span>
              </div>
            </div>

            {/* Competitor & Differentiation Card */}
            {analysisData && (
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 space-y-3 text-xs">
                <div className="font-bold text-indigo-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" /> Strategic Differentiation Recommendation
                </div>
                <p className="text-slate-700 leading-relaxed">{analysisData.differentiation}</p>

                <div className="pt-2 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identified Competitor Landscape</span>
                  <div className="grid grid-cols-2 gap-2">
                    {analysisData.competitors.map((c, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border border-black/5">
                        <div className="font-bold text-slate-900">{c.name}</div>
                        <div className="text-[10.5px] text-slate-500 mt-1">{c.summary}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={startWorkspaceGeneration}
              disabled={analysisStep < 3}
              className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all shadow-md disabled:opacity-40 flex items-center justify-center gap-2"
            >
              Generate Workspace & Documents →
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 6: WORKSPACE & DOCUMENTS GENERATION LOADER */}
        {/* ========================================================================= */}
        {stage === "generation" && (
          <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-black/10 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center text-3xl mx-auto">
              <RefreshCw className="w-8 h-8 animate-spin text-amber-600" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-bold text-[#1A1A1A]">Generating Workspace</h1>
              <p className="text-xs text-slate-500">Synthesizing company profile, executive documents, and daily tasks.</p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-black/5 text-left text-xs font-medium">
              {genSteps.map((stepText, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  {idx < genStepIndex ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : idx === genStepIndex ? (
                    <RefreshCw className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span className={idx <= genStepIndex ? "text-slate-800" : "text-slate-400"}>
                    {stepText}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 7: OPERATIONAL FOUNDER DASHBOARD */}
        {/* ========================================================================= */}
        {stage === "dashboard" && (
          <div className="w-full space-y-6 animate-in fade-in duration-300">
            
            {/* AI Feedback Notification Alert */}
            {aiFeedbackAlert && (
              <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top duration-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> {aiFeedbackAlert}
                </div>
                <button onClick={() => setAiFeedbackAlert(null)} className="text-white hover:opacity-80">
                  ✕
                </button>
              </div>
            )}

            {/* Dashboard Header Bar */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-black/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
                    Company Workspace • Active
                  </span>
                </div>
                <h1 className="text-3xl font-serif font-bold text-[#1A1A1A]">{getCompany().name}</h1>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">{getCompany().idea}</p>
              </div>

              {/* Progress & Milestone Overview */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-black/5 space-y-2 min-w-[260px]">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Workspace Progress</span>
                  <span className="text-emerald-700 font-mono">{progressState.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-500"
                    style={{ width: `${progressState.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10.5px] text-slate-500">
                  <span>Completed: {progressState.completedCount} / {progressState.totalCount} tasks</span>
                  <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={handleReprioritize}>
                    ⚡ Reprioritize
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-black/10 pb-2">
              <button
                onClick={() => setDashboardTab("mission")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  dashboardTab === "mission"
                    ? "bg-[#1A1A1A] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-black/10 hover:bg-slate-50"
                }`}
              >
                <Target className="w-3.5 h-3.5" /> Today's Mission & Tasks
              </button>

              <button
                onClick={() => setDashboardTab("documents")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  dashboardTab === "documents"
                    ? "bg-[#1A1A1A] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-black/10 hover:bg-slate-50"
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Generated Documents ({docList.length})
              </button>

              <button
                onClick={() => setDashboardTab("roadmap")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  dashboardTab === "roadmap"
                    ? "bg-[#1A1A1A] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-black/10 hover:bg-slate-50"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" /> Company Roadmap
              </button>

              <button
                onClick={() => setDashboardTab("ceo_chat")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  dashboardTab === "ceo_chat"
                    ? "bg-[#1A1A1A] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-black/10 hover:bg-slate-50"
                }`}
              >
                <Bot className="w-3.5 h-3.5" /> CEO AI Co-Founder
              </button>
            </div>

            {/* ========================================================================= */}
            {/* TAB 1: TODAY'S MISSION & TASKS */}
            {/* ========================================================================= */}
            {dashboardTab === "mission" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left Column: Today's Mission & Active Task */}
                <div className="md:col-span-2 space-y-6">
                  
                  {/* Today's Mission Banner */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-md space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                      <Zap className="w-4 h-4 fill-amber-400" /> Today's Mission
                    </div>
                    <h2 className="text-xl font-serif font-bold">{progressState.todayMission}</h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      This is the single highest-impact priority recommended by your AI Executive Team for today's execution.
                    </p>
                  </div>

                  {/* Active Task Card */}
                  {activeTask && (
                    <div className="bg-white p-6 rounded-3xl border border-black/10 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-black/5 pb-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              activeTask.priority === "critical"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {activeTask.priority} priority
                          </span>
                          <span className="text-xs font-mono text-slate-400">• Assigned to {activeTask.assigned_executive_id || "CEO AI"}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{activeTask.status}</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">{activeTask.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{activeTask.description}</p>
                      </div>

                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => handleTaskComplete(activeTask.id)}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Mark Complete & Unlock Next Task
                        </button>
                        <button
                          onClick={handleReprioritize}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all"
                        >
                          Reprioritize Overdue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Task List Breakdown */}
                  <div className="bg-white p-6 rounded-3xl border border-black/10 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Workspace Task Queue</h3>
                    <div className="space-y-2.5">
                      {taskList.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => setActiveTask(task)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            activeTask?.id === task.id
                              ? "border-black bg-slate-50 shadow-xs"
                              : "border-black/5 bg-white hover:border-black/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2
                              className={`w-4 h-4 ${task.status === "done" ? "text-emerald-600" : "text-slate-300"}`}
                            />
                            <div>
                              <div className={`text-xs font-bold ${task.status === "done" ? "line-through text-slate-400" : "text-slate-900"}`}>
                                {task.title}
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5">{task.module} • {task.priority} priority</div>
                            </div>
                          </div>
                          {task.status !== "done" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTaskComplete(task.id);
                              }}
                              className="px-3 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Quick Stats & AI Recommendations */}
                <div className="space-y-6">
                  
                  {/* Strategic Health Card */}
                  <div className="bg-white p-6 rounded-3xl border border-black/10 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company Metrics</h3>
                    
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between border-b border-black/5 pb-2">
                        <span className="text-slate-500">Target Customer</span>
                        <span className="font-semibold text-slate-800 text-right truncate max-w-[120px]">{getInterviewData().targetCustomer || "Tech founders"}</span>
                      </div>
                      <div className="flex justify-between border-b border-black/5 pb-2">
                        <span className="text-slate-500">Business Model</span>
                        <span className="font-semibold text-slate-800">{getInterviewData().revenueModel || "Subscription SaaS"}</span>
                      </div>
                      <div className="flex justify-between border-b border-black/5 pb-2">
                        <span className="text-slate-500">Estimated Runway</span>
                        <span className="font-semibold text-emerald-700 font-mono">18.4 months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Executive Agents</span>
                        <span className="font-semibold text-indigo-600">12 Active</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div className="bg-amber-50/60 border border-amber-200 p-6 rounded-3xl space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <Sparkles className="w-4 h-4 text-amber-600" /> AI Executive Suggestion
                    </div>
                    <p className="text-xs text-amber-900 leading-relaxed font-medium">
                      "After reviewing your business plan and roadmap, we recommend starting customer discovery surveys on Day 3 while engineering builds the auth scaffolding."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: GENERATED DOCUMENTS VAULT */}
            {/* ========================================================================= */}
            {dashboardTab === "documents" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {docList.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setActiveDoc(doc)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 bg-white hover:border-black/30 shadow-xs ${
                        activeDoc?.id === doc.id ? "border-black ring-1 ring-black" : "border-black/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">📄</span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">{doc.folder}</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                        <p className="text-[10.5px] text-slate-500 mt-1 line-clamp-2">{doc.content.slice(0, 100)}...</p>
                      </div>
                      <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                        <span>v{doc.version || 1} • {doc.generated_by || "AI"}</span>
                        <span className="text-blue-600 flex items-center gap-0.5">View <ChevronRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Document Viewer Modal / Drawer */}
                {activeDoc && (
                  <div className="bg-white p-8 rounded-3xl border border-black/10 shadow-lg space-y-6 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-black/5 pb-4">
                      <div>
                        <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">{activeDoc.name}</h2>
                        <span className="text-[10px] font-mono text-slate-400">Generated by {activeDoc.generated_by || "CEO AI"}</span>
                      </div>
                      <button
                        onClick={() => setActiveDoc(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        Close Reader
                      </button>
                    </div>

                    <textarea
                      rows={14}
                      value={activeDoc.content}
                      onChange={(e) => {
                        const updated = { ...activeDoc, content: e.target.value };
                        setActiveDoc(updated);
                      }}
                      className="w-full p-4 font-mono text-xs text-slate-800 bg-slate-50 rounded-2xl border border-black/10 focus:outline-none leading-relaxed"
                    />

                    <div className="flex justify-end">
                      <button
                        onClick={() => setActiveDoc(null)}
                        className="px-6 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all"
                      >
                        Save & Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: COMPANY ROADMAP */}
            {/* ========================================================================= */}
            {dashboardTab === "roadmap" && (
              <div className="bg-white p-8 rounded-3xl border border-black/10 shadow-sm space-y-8">
                <div className="space-y-2">
                  <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">Company Strategic Roadmap</h2>
                  <p className="text-xs text-slate-500">Phased milestones generated from your founder interview & market positioning.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { phase: "Phase 1", title: "Founder Interview & Setup", status: "Completed", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
                    { phase: "Phase 2", title: "MVP Feature Scaffolding", status: "In Progress", color: "bg-amber-50 border-amber-200 text-amber-900" },
                    { phase: "Phase 3", title: "Private Alpha Testing", status: "Upcoming", color: "bg-slate-50 border-slate-200 text-slate-600" },
                    { phase: "Phase 4", title: "Public GTM & Revenue", status: "Planned", color: "bg-slate-50 border-slate-200 text-slate-600" },
                  ].map((m, idx) => (
                    <div key={idx} className={`p-5 rounded-2xl border space-y-2 ${m.color}`}>
                      <span className="text-[10px] font-mono font-bold uppercase">{m.phase}</span>
                      <h4 className="text-xs font-bold">{m.title}</h4>
                      <div className="text-[10px] font-semibold mt-2">{m.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: CEO AI CO-FOUNDER LIVE CHAT */}
            {/* ========================================================================= */}
            {dashboardTab === "ceo_chat" && (
              <div className="bg-white rounded-3xl border border-black/10 shadow-sm overflow-hidden flex flex-col h-[520px]">
                {/* Chat Top Banner */}
                <div className="p-4 border-b border-black/5 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                      CEO
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">CEO AI Co-Founder Agent</h4>
                      <p className="text-[10px] text-slate-400">Contextualized with full company memory store</p>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Chat Message Stream */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col max-w-lg ${
                        msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                      }`}
                    >
                      <div
                        className={`p-4 rounded-2xl text-xs leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[#1A1A1A] text-white rounded-br-none"
                            : "bg-slate-100 text-slate-800 rounded-bl-none"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[9.5px] text-slate-400 mt-1 font-mono">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Prompts */}
                <div className="px-4 py-2 border-t border-black/5 bg-slate-50 flex gap-2 overflow-x-auto text-[10.5px]">
                  {["Review week 1 plan", "Competitor matrix details", "Draft investor update"].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        setUserChatInput(prompt);
                      }}
                      className="px-3 py-1 rounded-full bg-white border border-black/10 text-slate-700 hover:bg-slate-100 whitespace-nowrap"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <div className="p-4 border-t border-black/5 bg-white flex items-center gap-2">
                  <input
                    type="text"
                    value={userChatInput}
                    onChange={(e) => setUserChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendChat();
                    }}
                    placeholder="Ask your CEO AI Co-founder anything about your company..."
                    className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-black/10 focus:outline-none"
                  />
                  <button
                    onClick={handleSendChat}
                    className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
