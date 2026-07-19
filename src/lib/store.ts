import type { Task, Document, ApprovalRequest, StartupProfile } from "@/types/database";

/* ============================================================
   Automyte Central In-Memory Store
   Unifies data across chat, tasks, documents, and approvals
   Persists across Next.js hot-reloads via global object
   ============================================================ */

interface StoreState {
  tasks: Task[];
  documents: Document[];
  approvals: ApprovalRequest[];
  profile: StartupProfile;
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

// Global object persistence in development mode
const globalForStore = global as unknown as { automyteStore?: StoreState };

export const store: StoreState = globalForStore.automyteStore || {
  tasks: initialTasks,
  documents: initialDocuments,
  approvals: initialApprovals,
  profile: initialProfile,
};

if (process.env.NODE_ENV !== "production") {
  globalForStore.automyteStore = store;
}

// Helper methods to interact with store data safely
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
    return store.tasks[index];
  }
  return null;
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
