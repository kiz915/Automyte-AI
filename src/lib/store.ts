import type { Task, Document, ApprovalRequest, StartupProfile } from "@/types/database";

/* ============================================================
   Automyte Central In-Memory Store
   Unifies data across chat, tasks, documents, and approvals
   Persists across Next.js hot-reloads via global object
   ============================================================ */

export interface CompanyData {
  id: string;
  name: string;
  idea: string;
  industry: string;
  stage: string;
  teamSize: string;
  createdAt: string;
  hasCompany: boolean;
}

export interface InterviewData {
  targetCustomer?: string;
  problem?: string;
  solution?: string;
  revenueModel?: string;
  competitors?: string;
  milestones?: string;
  followUpAnswers?: Record<string, string>;
}

export interface AIAnalysisResult {
  isIdeaClear: boolean;
  marketSaturation: "low" | "medium" | "high";
  competitors: Array<{ name: string; summary: string; differentiation: string }>;
  differentiation: string;
  swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
  confidenceScore: number;
  recommendation: string;
}

interface StoreState {
  user: {
    isLoggedIn: boolean;
    email: string | null;
    name: string | null;
  };
  company: CompanyData;
  interview: InterviewData;
  analysis: AIAnalysisResult | null;
  tasks: Task[];
  documents: Document[];
  approvals: ApprovalRequest[];
  profile: StartupProfile;
  progress: {
    completedCount: number;
    totalCount: number;
    percentage: number;
    todayMission: string;
    currentTaskId: string | null;
  };
}

const WORKSPACE_ID = "ws_demo_001";
const now = new Date().toISOString();

const initialTasks: Task[] = [
  {
    id: "task_001",
    workspace_id: WORKSPACE_ID,
    title: "Draft Series A pitch deck",
    description: "Create a compelling 15-slide pitch deck covering problem, solution, traction, market size, team, and financials. Target: $4M raise at $20M pre-money.",
    requested_by: "user_founder",
    assigned_executive_id: "exec_ceo",
    module: "documents",
    status: "ongoing",
    priority: "critical",
    requires_approval: true,
    created_at: now,
    updated_at: now,
    artifacts: [],
    messages: [],
    subtasks: [],
    dependencies: [],
    project_id: null,
  },
  {
    id: "task_002",
    workspace_id: WORKSPACE_ID,
    title: "Implement user authentication flow",
    description: "Set up Supabase Auth with email/password and Google OAuth. Include protected routes middleware, session management, and the onboarding wizard redirect.",
    requested_by: "user_founder",
    assigned_executive_id: "exec_engineering",
    module: "engineering",
    status: "todo",
    priority: "high",
    requires_approval: false,
    created_at: now,
    updated_at: now,
    artifacts: [],
    messages: [],
    subtasks: [],
    dependencies: [],
    project_id: null,
  },
  {
    id: "task_003",
    workspace_id: WORKSPACE_ID,
    title: "Competitive landscape analysis",
    description: "Research and analyze top 5 competitors in the AI productivity space. Include pricing, features, funding, market positioning, and SWOT for each.",
    requested_by: "user_founder",
    assigned_executive_id: "exec_research",
    module: "research",
    status: "done",
    priority: "medium",
    requires_approval: false,
    created_at: now,
    updated_at: now,
    artifacts: [],
    messages: [],
    subtasks: [],
    dependencies: [],
    project_id: null,
  },
];

const initialDocuments: Document[] = [
  {
    id: "doc_001",
    workspace_id: WORKSPACE_ID,
    name: "Automyte AI — Executive Summary",
    type: "executive_summary",
    content: `# Automyte AI — Executive Summary\n\n## The Problem\nEarly-stage founders juggle every business function simultaneously — strategy, engineering, marketing, finance, legal, and operations.\n\n## The Solution\nAutomyte AI provides an AI-powered executive team of 12 specialized agents that handle strategy, marketing, engineering, finance, legal, and product management.`,
    storage_ref: null,
    pinned: true,
    generated_by: "exec_ceo",
    uploaded_by: null,
    version: 1,
    folder: "Strategy",
    created_at: now,
    updated_at: now,
  },
  {
    id: "doc_002",
    workspace_id: WORKSPACE_ID,
    name: "Product Requirements Document — v1.0",
    type: "prd",
    content: `# Automyte AI — PRD v1.0\n\n## Overview\nDefine the core feature set for Automyte AI's initial public release.`,
    storage_ref: null,
    pinned: true,
    generated_by: "exec_product",
    uploaded_by: null,
    version: 2,
    folder: "Product",
    created_at: now,
    updated_at: now,
  }
];

const initialApprovals: ApprovalRequest[] = [
  {
    id: "apr_001",
    workspace_id: WORKSPACE_ID,
    task_id: "task_001",
    automation_id: null,
    requested_action: "Send pitch deck to investor list",
    payload: {
      document_id: "doc_001",
      recipients: ["vc@sequoia.com", "partner@a16z.com"],
      executive: "Sales",
      risk_level: "high",
    },
    status: "pending",
    decided_by: null,
    decided_at: null,
    created_at: now,
  },
  {
    id: "apr_002",
    workspace_id: WORKSPACE_ID,
    task_id: "task_004",
    automation_id: null,
    requested_action: "Publish landing page to production",
    payload: {
      deploy_target: "vercel-production",
      branch: "feat/landing-page-v2",
      executive: "Engineering",
      risk_level: "medium",
    },
    status: "pending",
    decided_by: null,
    decided_at: null,
    created_at: now,
  }
];

const initialProfile: StartupProfile = {
  id: "prof_001",
  workspace_id: WORKSPACE_ID,
  vision_mission: "Enable anyone in the world to launch and scale a business with AI co-founders.",
  core_values: "Visionary execution, extreme transparency, absolute reliability.",
  problem: "Founders spend 80% of their time on operations and legal tasks, distracting from product vision.",
  solution: "An agentic executive operating system replacing departmental overhead.",
  target_audience: "Tech founders, developers, SMB operators.",
  persona: "Innovative builders.",
  business_model: "Freemium SaaS, $29/mo Pro.",
  value_prop: "Your complete corporate executive suite, automated.",
  swot: {
    strengths: ["Highly collaborative agents", "Supabase & Vercel deployment integrations", "Real-time task synchronization"],
    weaknesses: ["Heavy API reliance", "NVIDIA Nemotron dependency"],
    opportunities: ["Explosion of micro-SaaS startups globally", "Unserved technical founder market"],
    threats: ["Platform competition", "Rapid LLM pricing shifts"]
  },
  competitors: [
    { name: "Cofounder.co", description: "Direct competitor in AI co-founder generation space", strengths: "Early market entry", weaknesses: "Static content templates", url: "https://cofounder.co" }
  ],
  market_size: "$42B TAM",
  pricing: "$29/month Pro subscription",
  gtm: "ProductHunt launch, content loops, developer developer community seeding.",
  launch_plan: "Private beta with 100 select founders, followed by public launch.",
  growth_strategy: "Affiliate structures and self-service growth models.",
  risk_analysis: "Regulatory complexity, IP protection of generated code.",
  okrs: [
    { objective: "Ship stable v1.0 platform", key_results: ["Complete 8 core agent routes", "Connect real-time DB sync"], progress: 85 }
  ],
  kpis: [
    { name: "Weekly Active Users", target: 500, current: 120, unit: "users" }
  ],
  brand_kit: {
    primary_color: "#1A1A1A",
    secondary_color: "rgba(32, 32, 32, 0.7)",
    accent_color: "#F2B705",
    font_heading: "Figtree",
    font_body: "Figtree",
    tone: "Professional, ambitious, visionary",
    logo_url: null,
    guidelines: "Use cream backgrounds (#F5F5F2) and golden CTAs (#F2B705) for high visual balance."
  },
  created_at: now,
  updated_at: now,
};

const initialCompany: CompanyData = {
  id: "comp_001",
  name: "Automyte",
  idea: "AI agent orchestrator platform enabling founders and operators to build, run, and scale companies with autonomous AI executives.",
  industry: "Developer Tools / Enterprise AI",
  stage: "Pre-MVP",
  teamSize: "1-5",
  createdAt: now,
  hasCompany: true,
};

const initialInterview: InterviewData = {
  targetCustomer: "Tech founders, solo entrepreneurs, and micro-SaaS builders who need speed and operational leverage.",
  problem: "Founders spend 80% of their bandwidth on fragmented operational overhead, legal setup, content, and planning.",
  solution: "An intelligent autonomous workspace with 12 specialized AI executives handling marketing, finance, engineering, legal, and product.",
  revenueModel: "$29/month Pro subscription + usage-based AI agent compute credits.",
  competitors: "Traditional SaaS workflow automation tools, static business plan generators, human agencies.",
  milestones: "Launch MVP in 4 weeks, acquire first 100 paid users, secure $500k seed funding.",
};

const initialAnalysis: AIAnalysisResult = {
  isIdeaClear: true,
  marketSaturation: "medium",
  competitors: [
    { name: "Cofounder.co", summary: "Static AI prompt generator for business plans", differentiation: "Automyte provides live, actionable executive agents that continuously execute work." },
    { name: "Custom GPTs", summary: "Single-turn text generators without shared memory", differentiation: "Automyte maintains unified company memory across documents, tasks, and approvals." },
  ],
  differentiation: "Full end-to-end operational execution with 12 specialized AI executives and real-time task orchestration.",
  swot: {
    strengths: ["Autonomous multi-agent architecture", "Unified company memory", "Real-time task synchronization"],
    weaknesses: ["Dependence on third-party LLM API latency", "Early market positioning"],
    opportunities: ["Rapid expansion of micro-SaaS and solo founder ecosystems", "Developer ecosystem integrations"],
    threats: ["Hyperscaler AI feature bundling", "Evolving LLM pricing models"],
  },
  confidenceScore: 94,
  recommendation: "Proceed directly to MVP development and customer validation loop.",
};

// Global object persistence in development mode
const globalForStore = global as unknown as { automyteStore?: StoreState };

export const store: StoreState = globalForStore.automyteStore || {
  user: {
    isLoggedIn: false,
    email: null,
    name: null,
  },
  company: initialCompany,
  interview: initialInterview,
  analysis: initialAnalysis,
  tasks: initialTasks,
  documents: initialDocuments,
  approvals: initialApprovals,
  profile: initialProfile,
  progress: {
    completedCount: 1,
    totalCount: 4,
    percentage: 25,
    todayMission: "Draft Executive Summary & Series A Pitch Deck",
    currentTaskId: "task_001",
  },
};

if (process.env.NODE_ENV !== "production") {
  globalForStore.automyteStore = store;
}

// Helper methods to interact with store data safely

export function getUser() {
  if (typeof window !== "undefined") {
    try {
      const savedUser = localStorage.getItem("automyte_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        store.user = parsed;
      } else {
        store.user = {
          isLoggedIn: false,
          email: null,
          name: null,
        };
      }
    } catch (e) {
      console.error("Error reading automyte_user from localStorage:", e);
    }
  }
  return store.user;
}

export function setUserLogin(isLoggedIn: boolean, email?: string, name?: string) {
  store.user = {
    isLoggedIn,
    email: email || (isLoggedIn ? "founder@automyte.ai" : null),
    name: name || (isLoggedIn ? "Founder" : null),
  };

  if (typeof window !== "undefined") {
    try {
      if (isLoggedIn) {
        localStorage.setItem("automyte_user", JSON.stringify(store.user));
      } else {
        localStorage.removeItem("automyte_user");
      }
    } catch (e) {
      console.error("Error saving automyte_user to localStorage:", e);
    }
  }
  return store.user;
}

export function getCompany() {
  return store.company;
}

export function setCompanyData(data: Partial<CompanyData>) {
  store.company = {
    ...store.company,
    ...data,
    hasCompany: true,
    createdAt: store.company.createdAt || new Date().toISOString(),
  };
  return store.company;
}

export function getInterviewData() {
  return store.interview;
}

export function saveInterviewAnswer(key: keyof InterviewData, value: string) {
  if (key === "followUpAnswers") {
    store.interview.followUpAnswers = {
      ...(store.interview.followUpAnswers || {}),
      [Date.now()]: value,
    };
  } else {
    (store.interview as Record<string, unknown>)[key] = value;
  }
  return store.interview;
}

export function getAnalysisResult() {
  return store.analysis;
}

export function setAnalysisResult(result: AIAnalysisResult) {
  store.analysis = result;
  return store.analysis;
}

export function getTasks() {
  return store.tasks;
}

export function addTask(task: Omit<Task, "id" | "workspace_id" | "created_at" | "updated_at">) {
  const newTask: Task = {
    ...task,
    id: `task_${String(store.tasks.length + 1).padStart(3, "0")}`,
    workspace_id: WORKSPACE_ID,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  store.tasks.push(newTask);
  recalculateProgress();
  return newTask;
}

export function updateTask(id: string, updates: Partial<Task>) {
  const index = store.tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    store.tasks[index] = {
      ...store.tasks[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    recalculateProgress();
    return store.tasks[index];
  }
  return null;
}

export function completeTask(id: string) {
  const task = updateTask(id, { status: "done" });
  recalculateProgress();
  return task;
}

export function reprioritizeTasks() {
  store.tasks.forEach((t) => {
    if (t.status === "todo" || t.status === "ongoing") {
      t.priority = "critical";
      t.updated_at = new Date().toISOString();
    }
  });
  recalculateProgress();
  return store.tasks;
}

export function getDocuments() {
  return store.documents;
}

export function addDocument(doc: Omit<Document, "id" | "workspace_id" | "created_at" | "updated_at" | "version">) {
  const newDoc: Document = {
    ...doc,
    id: `doc_${String(store.documents.length + 1).padStart(3, "0")}`,
    workspace_id: WORKSPACE_ID,
    version: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  store.documents.push(newDoc);
  return newDoc;
}

export function updateDocument(id: string, updates: Partial<Document>) {
  const index = store.documents.findIndex((d) => d.id === id);
  if (index !== -1) {
    store.documents[index] = {
      ...store.documents[index],
      ...updates,
      version: (store.documents[index].version || 1) + 1,
      updated_at: new Date().toISOString(),
    };
    return store.documents[index];
  }
  return null;
}

export function getApprovals() {
  return store.approvals;
}

export function addApproval(approval: Omit<ApprovalRequest, "id" | "workspace_id" | "created_at" | "decided_by" | "decided_at" | "status">) {
  const newApproval: ApprovalRequest = {
    ...approval,
    id: `apr_${String(store.approvals.length + 1).padStart(3, "0")}`,
    workspace_id: WORKSPACE_ID,
    status: "pending",
    decided_by: null,
    decided_at: null,
    created_at: new Date().toISOString(),
  };
  store.approvals.push(newApproval);
  return newApproval;
}

export function updateApproval(id: string, status: "approved" | "rejected", decidedBy = "user_founder") {
  const index = store.approvals.findIndex((a) => a.id === id);
  if (index !== -1) {
    store.approvals[index] = {
      ...store.approvals[index],
      status,
      decided_by: decidedBy,
      decided_at: new Date().toISOString(),
    };
    return store.approvals[index];
  }
  return null;
}

export function getProfile() {
  return store.profile;
}

export function updateProfile(updates: Partial<StartupProfile>) {
  store.profile = {
    ...store.profile,
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return store.profile;
}

export function getProgress() {
  recalculateProgress();
  return store.progress;
}

function recalculateProgress() {
  const total = store.tasks.length;
  const done = store.tasks.filter((t) => t.status === "done").length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const currentTask = store.tasks.find((t) => t.status === "ongoing" || t.status === "todo") || store.tasks[0];

  store.progress = {
    completedCount: done,
    totalCount: total,
    percentage: pct,
    todayMission: currentTask ? currentTask.title : "All tasks completed!",
    currentTaskId: currentTask ? currentTask.id : null,
  };
}

export function generateFullCompanyWorkspace(companyName: string, startupIdea: string, industry: string) {
  const compId = `comp_${Date.now()}`;
  store.company = {
    id: compId,
    name: companyName,
    idea: startupIdea,
    industry,
    stage: "Idea",
    teamSize: "1-5",
    createdAt: new Date().toISOString(),
    hasCompany: true,
  };

  store.profile.vision_mission = `Build a market-leading ${industry} business powered by ${companyName}.`;
  store.profile.problem = store.interview.problem || "Market inefficiency and high manual effort.";
  store.profile.solution = store.interview.solution || startupIdea;
  store.profile.business_model = store.interview.revenueModel || "Subscription SaaS & Usage Credits";

  // Generate complete documents array
  store.documents = [
    {
      id: `doc_${Date.now()}_1`,
      workspace_id: WORKSPACE_ID,
      name: `${companyName} — Executive Summary`,
      type: "executive_summary",
      content: `# ${companyName} — Executive Summary\n\n## Business Overview\n${companyName} is an innovative business operating in the ${industry} market.\n\n## Core Value Proposition\n${startupIdea}\n\n## Target Customer\n${store.interview.targetCustomer || "Tech founders & SMB operators"}.\n\n## Problem & Solution\n- **Problem**: ${store.interview.problem || "High operational overhead and fragmented tools."}\n- **Solution**: ${store.interview.solution || startupIdea}`,
      storage_ref: null,
      pinned: true,
      generated_by: "exec_ceo",
      uploaded_by: null,
      version: 1,
      folder: "Strategy",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: `doc_${Date.now()}_2`,
      workspace_id: WORKSPACE_ID,
      name: `${companyName} — Lean Canvas`,
      type: "business_plan",
      content: `# ${companyName} — Lean Canvas\n\n### 1. Problem\n- ${store.interview.problem || "High operational friction"}\n\n### 2. Solution\n- ${store.interview.solution || startupIdea}\n\n### 3. Key Metrics\n- Active Users, MRR Growth, Retention Rate\n\n### 4. Revenue Streams\n- ${store.interview.revenueModel || "$29/mo SaaS"}`,
      storage_ref: null,
      pinned: true,
      generated_by: "exec_ceo",
      uploaded_by: null,
      version: 1,
      folder: "Strategy",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: `doc_${Date.now()}_3`,
      workspace_id: WORKSPACE_ID,
      name: `${companyName} — Business Plan`,
      type: "business_plan",
      content: `# ${companyName} — Comprehensive Business Plan\n\n## Executive Summary\n${companyName} transforms early-stage company building in ${industry}.\n\n## Financial Strategy & Projections\nTargeting $100k ARR within the first 6 months of launching MVP.`,
      storage_ref: null,
      pinned: false,
      generated_by: "exec_cfo",
      uploaded_by: null,
      version: 1,
      folder: "Strategy",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: `doc_${Date.now()}_4`,
      workspace_id: WORKSPACE_ID,
      name: `${companyName} — Company Roadmap`,
      type: "prd",
      content: `# ${companyName} — Company Roadmap\n\n### Milestone 1: MVP Build\nBuild core interface, user management, and essential features.\n\n### Milestone 2: Beta Testing & Feedback\nIntegrate 50 beta users and refine workflows.\n\n### Milestone 3: Public Growth Launch\nDeploy marketing campaigns and scale customer onboarding.`,
      storage_ref: null,
      pinned: false,
      generated_by: "exec_product",
      uploaded_by: null,
      version: 1,
      folder: "Roadmap",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: `doc_${Date.now()}_5`,
      workspace_id: WORKSPACE_ID,
      name: `${companyName} — Milestones Plan`,
      type: "custom",
      content: `# Key Milestones for ${companyName}\n\n1. **Week 1**: Finalize Brand & Architecture\n2. **Week 2-3**: Build MVP Core Features\n3. **Week 4**: Internal QA & User Testing\n4. **Month 2**: Public Launch & Paid Marketing`,
      storage_ref: null,
      pinned: false,
      generated_by: "exec_coo",
      uploaded_by: null,
      version: 1,
      folder: "Roadmap",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: `doc_${Date.now()}_6`,
      workspace_id: WORKSPACE_ID,
      name: `${companyName} — First Week Plan`,
      type: "custom",
      content: `# First Week Plan for ${companyName}\n\n- **Day 1**: Workspace & Memory Setup\n- **Day 2**: Define Technical Specs\n- **Day 3**: Landing Page & Waitlist Creation\n- **Day 4**: Database & Auth Wiring\n- **Day 5**: Deploy Staging Build & Review`,
      storage_ref: null,
      pinned: false,
      generated_by: "exec_coo",
      uploaded_by: null,
      version: 1,
      folder: "Operations",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  // Generate Tasks
  store.tasks = [
    {
      id: `task_${Date.now()}_1`,
      workspace_id: WORKSPACE_ID,
      title: `Finalize ${companyName} Value Proposition & Landing Pitch`,
      description: `Refine core messaging and prepare landing page copy for ${companyName}.`,
      requested_by: "user_founder",
      assigned_executive_id: "exec_cmo",
      module: "marketing",
      status: "ongoing",
      priority: "critical",
      requires_approval: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      artifacts: [],
      messages: [],
      subtasks: [],
      dependencies: [],
      project_id: null,
    },
    {
      id: `task_${Date.now()}_2`,
      workspace_id: WORKSPACE_ID,
      title: `Build MVP Feature Architecture for ${companyName}`,
      description: `Draft technical specification and API endpoints for ${companyName} MVP release.`,
      requested_by: "user_founder",
      assigned_executive_id: "exec_engineering",
      module: "engineering",
      status: "todo",
      priority: "high",
      requires_approval: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      artifacts: [],
      messages: [],
      subtasks: [],
      dependencies: [],
      project_id: null,
    },
    {
      id: `task_${Date.now()}_3`,
      workspace_id: WORKSPACE_ID,
      title: `Conduct Competitor Deep Dive & Differentiation Analysis`,
      description: `Review competitor pricing and feature sets to establish ${companyName}'s market edge.`,
      requested_by: "user_founder",
      assigned_executive_id: "exec_research",
      module: "research",
      status: "todo",
      priority: "medium",
      requires_approval: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      artifacts: [],
      messages: [],
      subtasks: [],
      dependencies: [],
      project_id: null,
    },
  ];

  recalculateProgress();
  return {
    company: store.company,
    documents: store.documents,
    tasks: store.tasks,
  };
}
