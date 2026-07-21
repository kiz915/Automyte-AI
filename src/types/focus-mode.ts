/* ============================================================
   Automyte AI Focus Mode — Data Types & Helpers
   ============================================================ */

export type DepartmentId =
  | "engineering"
  | "marketing"
  | "finance"
  | "design"
  | "sales"
  | "operations"
  | "legal"
  | "support";

export type AgentStatus = "working" | "idle" | "awaiting_approval" | "error";

export type StepState = "completed" | "active" | "pending";

export interface FocusStep {
  id: string;
  title: string;
  state: StepState;
}

export interface FileChange {
  path: string;
  status: "modified" | "created" | "deleted";
  additions: number;
  deletions: number;
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "success";
  text: string;
}

export interface FocusAgent {
  id: string;
  name: string;
  initials: string;
  departmentId: DepartmentId;
  departmentLabel: string;
  icon: string;
  accentColor: string; // CSS color string (hex/var)
  bgSubtle: string;
  borderColor: string;
}

export interface FocusTask {
  id: string;
  title: string;
  elapsedSeconds: number;
  progressPercent: number; // 0 to 100
  steps: FocusStep[];
  status: AgentStatus;
  approvalCallout?: {
    actionRequired: string;
    details: string;
    proposedChange: string;
  };
  errorInfo?: {
    plainLanguageReason: string;
    suggestedFix: string;
  };
  logs: ExecutionLog[];
  touchedFiles: FileChange[];
  diffSnippet?: string;
  isSettled?: boolean;
}

// Department Color Configurations
export const DEPARTMENT_CONFIGS: Record<DepartmentId, {
  label: string;
  icon: string;
  accentColor: string;
  bgSubtle: string;
  borderColor: string;
}> = {
  engineering: {
    label: "ENGINEERING",
    icon: "⚙",
    accentColor: "#3B82F6", // Blue
    bgSubtle: "rgba(59, 130, 246, 0.12)",
    borderColor: "rgba(59, 130, 246, 0.35)",
  },
  marketing: {
    label: "MARKETING",
    icon: "📣",
    accentColor: "#F97316", // Coral / Orange
    bgSubtle: "rgba(249, 115, 22, 0.12)",
    borderColor: "rgba(249, 115, 22, 0.35)",
  },
  finance: {
    label: "FINANCE",
    icon: "💰",
    accentColor: "#14B8A6", // Teal
    bgSubtle: "rgba(20, 184, 166, 0.12)",
    borderColor: "rgba(20, 184, 166, 0.35)",
  },
  design: {
    label: "DESIGN",
    icon: "🎨",
    accentColor: "#8B5CF6", // Purple
    bgSubtle: "rgba(139, 92, 246, 0.12)",
    borderColor: "rgba(139, 92, 246, 0.35)",
  },
  sales: {
    label: "SALES",
    icon: "📈",
    accentColor: "#F59E0B", // Amber
    bgSubtle: "rgba(245, 158, 11, 0.12)",
    borderColor: "rgba(245, 158, 11, 0.35)",
  },
  operations: {
    label: "OPERATIONS",
    icon: "🔧",
    accentColor: "#10B981", // Emerald
    bgSubtle: "rgba(16, 185, 129, 0.12)",
    borderColor: "rgba(16, 185, 129, 0.35)",
  },
  legal: {
    label: "LEGAL",
    icon: "⚖",
    accentColor: "#6366F1", // Indigo
    bgSubtle: "rgba(99, 102, 241, 0.12)",
    borderColor: "rgba(99, 102, 241, 0.35)",
  },
  support: {
    label: "SUPPORT",
    icon: "💬",
    accentColor: "#EC4899", // Pink
    bgSubtle: "rgba(236, 72, 153, 0.12)",
    borderColor: "rgba(236, 72, 153, 0.35)",
  },
};

// Default agents for each department
export const DEFAULT_FOCUS_AGENTS: Record<string, FocusAgent> = {
  engineering: {
    id: "kai-eng",
    name: "Kai",
    initials: "KA",
    departmentId: "engineering",
    departmentLabel: "ENGINEERING",
    icon: "⚙",
    accentColor: "#3B82F6",
    bgSubtle: "rgba(59, 130, 246, 0.12)",
    borderColor: "rgba(59, 130, 246, 0.35)",
  },
  marketing: {
    id: "aria-mkt",
    name: "Aria",
    initials: "AR",
    departmentId: "marketing",
    departmentLabel: "MARKETING",
    icon: "📣",
    accentColor: "#F97316",
    bgSubtle: "rgba(249, 115, 22, 0.12)",
    borderColor: "rgba(249, 115, 22, 0.35)",
  },
  finance: {
    id: "sam-fin",
    name: "Sam",
    initials: "SA",
    departmentId: "finance",
    departmentLabel: "FINANCE",
    icon: "💰",
    accentColor: "#14B8A6",
    bgSubtle: "rgba(20, 184, 166, 0.12)",
    borderColor: "rgba(20, 184, 166, 0.35)",
  },
  design: {
    id: "luna-des",
    name: "Luna",
    initials: "LU",
    departmentId: "design",
    departmentLabel: "DESIGN",
    icon: "🎨",
    accentColor: "#8B5CF6",
    bgSubtle: "rgba(139, 92, 246, 0.12)",
    borderColor: "rgba(139, 92, 246, 0.35)",
  },
  sales: {
    id: "ryan-sal",
    name: "Ryan",
    initials: "RY",
    departmentId: "sales",
    departmentLabel: "SALES",
    icon: "📈",
    accentColor: "#F59E0B",
    bgSubtle: "rgba(245, 158, 11, 0.12)",
    borderColor: "rgba(245, 158, 11, 0.35)",
  },
  operations: {
    id: "devon-ops",
    name: "Devon",
    initials: "DE",
    departmentId: "operations",
    departmentLabel: "OPERATIONS",
    icon: "🔧",
    accentColor: "#10B981",
    bgSubtle: "rgba(16, 185, 129, 0.12)",
    borderColor: "rgba(16, 185, 129, 0.35)",
  },
  legal: {
    id: "morgan-leg",
    name: "Morgan",
    initials: "MO",
    departmentId: "legal",
    departmentLabel: "LEGAL",
    icon: "⚖",
    accentColor: "#6366F1",
    bgSubtle: "rgba(99, 102, 241, 0.12)",
    borderColor: "rgba(99, 102, 241, 0.35)",
  },
  support: {
    id: "jamie-sup",
    name: "Jamie",
    initials: "JA",
    departmentId: "support",
    departmentLabel: "SUPPORT",
    icon: "💬",
    accentColor: "#EC4899",
    bgSubtle: "rgba(236, 72, 153, 0.12)",
    borderColor: "rgba(236, 72, 153, 0.35)",
  },
};

// Preset state tasks generator for testing & production demo
export const SAMPLE_TASKS_BY_DEPT: Record<DepartmentId, Record<AgentStatus, FocusTask>> = {
  engineering: {
    working: {
      id: "task-eng-1",
      title: "Scaffolding checkout API endpoints.",
      elapsedSeconds: 165,
      progressPercent: 62,
      status: "working",
      steps: [
        { id: "s1", title: "Validating Stripe webhook signature contract", state: "completed" },
        { id: "s2", title: "Generating TypeScript types for checkout session payload", state: "completed" },
        { id: "s3", title: "Wiring idempotency keys and error handlers", state: "active" },
        { id: "s4", title: "Running integration test suite", state: "pending" },
      ],
      logs: [
        { id: "l1", timestamp: "07:02:10", level: "info", text: "GET /api/checkout/session 200 OK (14ms)" },
        { id: "l2", timestamp: "07:02:18", level: "info", text: "Constructing Stripe Event object from raw request body" },
        { id: "l3", timestamp: "07:02:30", level: "success", text: "Verified webhook secret against process.env.STRIPE_WEBHOOK_SECRET" },
        { id: "l4", timestamp: "07:02:44", level: "info", text: "Compiling API route /src/app/api/checkout/route.ts" },
      ],
      touchedFiles: [
        { path: "src/app/api/checkout/route.ts", status: "modified", additions: 42, deletions: 8 },
        { path: "src/types/checkout.ts", status: "created", additions: 28, deletions: 0 },
        { path: "src/lib/stripe.ts", status: "modified", additions: 15, deletions: 3 },
      ],
      diffSnippet: `+// src/app/api/checkout/route.ts
+export async function POST(req: NextRequest) {
+  const body = await req.text();
+  const signature = req.headers.get("stripe-signature");
+  const event = stripe.webhooks.constructEvent(body, signature!, endpointSecret);
+  return NextResponse.json({ status: "success", eventId: event.id });
+}`,
    },
    awaiting_approval: {
      id: "task-eng-2",
      title: "Deploying database migration to production server.",
      elapsedSeconds: 310,
      progressPercent: 75,
      status: "awaiting_approval",
      approvalCallout: {
        actionRequired: "Needs your input: Production Database Schema Migration",
        details: "This step will add an index on user_id in orders table and lock writes for ~1.5 seconds.",
        proposedChange: "ALTER TABLE orders ADD INDEX idx_user_id (user_id);",
      },
      steps: [
        { id: "s1", title: "Generating SQL migration file", state: "completed" },
        { id: "s2", title: "Performing zero-downtime shadow test in staging", state: "completed" },
        { id: "s3", title: "Requesting production deployment authorization", state: "active" },
        { id: "s4", title: "Verifying post-deploy index health", state: "pending" },
      ],
      logs: [
        { id: "l1", timestamp: "07:01:00", level: "info", text: "Shadow migration test completed cleanly on DB-staging-02" },
        { id: "l2", timestamp: "07:01:40", level: "warn", text: "Production lock required for 1500ms during schema alteration" },
      ],
      touchedFiles: [
        { path: "migrations/20260721_add_user_index.sql", status: "created", additions: 12, deletions: 0 },
      ],
    },
    error: {
      id: "task-eng-3",
      title: "Connecting automated CI/CD deployment pipeline.",
      elapsedSeconds: 88,
      progressPercent: 40,
      status: "error",
      errorInfo: {
        plainLanguageReason: "Authentication token for GitHub Actions runner expired during deploy build.",
        suggestedFix: "Click Retry to refresh the auth token and re-trigger the build runner.",
      },
      steps: [
        { id: "s1", title: "Bundling Next.js production build artifacts", state: "completed" },
        { id: "s2", title: "Authenticating with deployment runner", state: "active" },
        { id: "s3", title: "Syncing static assets to CDN edge", state: "pending" },
      ],
      logs: [
        { id: "l1", timestamp: "07:00:10", level: "info", text: "Compiled 44 client components successfully" },
        { id: "l2", timestamp: "07:00:35", level: "error", text: "HTTP 401 Unauthorized: GITHUB_TOKEN has expired or lacks repo permissions" },
      ],
      touchedFiles: [
        { path: ".github/workflows/deploy.yml", status: "modified", additions: 4, deletions: 4 },
      ],
    },
    idle: {
      id: "task-eng-idle",
      title: "Waiting for next task",
      elapsedSeconds: 0,
      progressPercent: 0,
      status: "idle",
      steps: [],
      logs: [],
      touchedFiles: [],
    },
  },
  marketing: {
    working: {
      id: "task-mkt-1",
      title: "Drafting launch campaign copy for Product Hunt.",
      elapsedSeconds: 210,
      progressPercent: 50,
      status: "working",
      steps: [
        { id: "ms1", title: "Analyzing top 20 SaaS launches for hero tagline formulas", state: "completed" },
        { id: "ms2", title: "Drafting 3 headline variants and founder story email", state: "active" },
        { id: "ms3", title: "Preparing promotional GIF sequences and thumbnail banners", state: "pending" },
      ],
      logs: [
        { id: "ml1", timestamp: "07:03:00", level: "info", text: "Scraped 15 Product Hunt #1 products of the day" },
        { id: "ml2", timestamp: "07:03:30", level: "info", text: "Synthesizing tone of voice: confident, minimal, founder-focused" },
      ],
      touchedFiles: [
        { path: "content/launch/product_hunt_copy.md", status: "created", additions: 85, deletions: 0 },
      ],
    },
    awaiting_approval: {
      id: "task-mkt-2",
      title: "Scheduling automated email drip for new user onboarding.",
      elapsedSeconds: 140,
      progressPercent: 80,
      status: "awaiting_approval",
      approvalCallout: {
        actionRequired: "Needs your input: Confirm Email Broadcast Schedule",
        details: "Aria wants to send 'Day 1: Welcome to Automyte' to 1,240 subscribers at 9:00 AM EST tomorrow.",
        proposedChange: "Subject: 'Build your AI virtual team in 5 minutes'",
      },
      steps: [
        { id: "ms1", title: "Filtering segment: Active onboarding signups", state: "completed" },
        { id: "ms2", title: "A/B testing subject lines for deliverability", state: "completed" },
        { id: "ms3", title: "Requesting broadcast send approval", state: "active" },
      ],
      logs: [
        { id: "ml1", timestamp: "07:00:10", level: "info", text: "Segment created: 1,240 subscribers validated" },
      ],
      touchedFiles: [],
    },
    error: {
      id: "task-mkt-3",
      title: "Publishing social announcement on X/Twitter.",
      elapsedSeconds: 45,
      progressPercent: 30,
      status: "error",
      errorInfo: {
        plainLanguageReason: "X API rate limit reached while uploading image asset.",
        suggestedFix: "Wait 1 minute or click Retry to post text-first announcement.",
      },
      steps: [
        { id: "ms1", title: "Formatting thread posts", state: "completed" },
        { id: "ms2", title: "Uploading image asset", state: "active" },
      ],
      logs: [],
      touchedFiles: [],
    },
    idle: {
      id: "task-mkt-idle",
      title: "Waiting for next task",
      elapsedSeconds: 0,
      progressPercent: 0,
      status: "idle",
      steps: [],
      logs: [],
      touchedFiles: [],
    },
  },
  finance: {
    working: {
      id: "task-fin-1",
      title: "Building Q3 financial runway & cash burn projection.",
      elapsedSeconds: 95,
      progressPercent: 70,
      status: "working",
      steps: [
        { id: "fs1", title: "Importing monthly API infrastructure expenses", state: "completed" },
        { id: "fs2", title: "Calculating gross margin per active subscriber", state: "completed" },
        { id: "fs3", title: "Generating 12-month runway forecast model", state: "active" },
        { id: "fs4", title: "Exporting executive summary PDF", state: "pending" },
      ],
      logs: [
        { id: "fl1", timestamp: "07:04:10", level: "info", text: "Parsed AWS & OpenAI usage invoices ($1,420/mo baseline)" },
        { id: "fl2", timestamp: "07:04:22", level: "success", text: "Projected runway: 22.4 months at current burn rate" },
      ],
      touchedFiles: [
        { path: "financials/q3_runway_model.json", status: "created", additions: 120, deletions: 0 },
      ],
    },
    awaiting_approval: {
      id: "task-fin-2",
      title: "Authorizing SaaS subscription renewal payments.",
      elapsedSeconds: 180,
      progressPercent: 90,
      status: "awaiting_approval",
      approvalCallout: {
        actionRequired: "Needs your input: Annual Vercel Enterprise Renewal",
        details: "Sam recommends switching from monthly to annual billing to save $480/yr ($2,400 total).",
        proposedChange: "Approve payment of $2,400 via corporate card ending in 4012.",
      },
      steps: [
        { id: "fs1", title: "Auditing active vendor seats", state: "completed" },
        { id: "fs2", title: "Evaluating tier discounts", state: "completed" },
        { id: "fs3", title: "Awaiting founder approval for card charge", state: "active" },
      ],
      logs: [],
      touchedFiles: [],
    },
    error: {
      id: "task-fin-3",
      title: "Syncing QuickBooks bank feed.",
      elapsedSeconds: 30,
      progressPercent: 20,
      status: "error",
      errorInfo: {
        plainLanguageReason: "Bank connection session expired. Re-authentication required.",
        suggestedFix: "Reconnect banking portal credentials in settings.",
      },
      steps: [
        { id: "fs1", title: "Initiating bank feed sync", state: "active" },
      ],
      logs: [],
      touchedFiles: [],
    },
    idle: {
      id: "task-fin-idle",
      title: "Waiting for next task",
      elapsedSeconds: 0,
      progressPercent: 0,
      status: "idle",
      steps: [],
      logs: [],
      touchedFiles: [],
    },
  },
  design: {
    working: {
      id: "task-des-1",
      title: "Designing high-contrast dark mode component tokens.",
      elapsedSeconds: 340,
      progressPercent: 85,
      status: "working",
      steps: [
        { id: "ds1", title: "Creating accessible color contrast matrix (WCAG AAA)", state: "completed" },
        { id: "ds2", title: "Exporting Figma design tokens to CSS variables", state: "completed" },
        { id: "ds3", title: "Building glassmorphism card elevation styles", state: "active" },
        { id: "ds4", title: "Testing icon set legibility at 12px", state: "pending" },
      ],
      logs: [
        { id: "dl1", timestamp: "07:01:15", level: "info", text: "Exported 24 theme tokens from Figma API" },
        { id: "dl2", timestamp: "07:02:00", level: "success", text: "Contrast ratio check: 14.2:1 passes AAA standard" },
      ],
      touchedFiles: [
        { path: "src/styles/theme-tokens.json", status: "modified", additions: 64, deletions: 12 },
      ],
    },
    awaiting_approval: {
      id: "task-des-2",
      title: "Finalizing brand logo mark variant.",
      elapsedSeconds: 190,
      progressPercent: 60,
      status: "awaiting_approval",
      approvalCallout: {
        actionRequired: "Needs your input: Select Primary App Icon",
        details: "Luna created 2 icon proposals: Sunflower Minimalist vs Pixel Spark.",
        proposedChange: "Set 'Pixel Sunflower' as default favicons & app store icon.",
      },
      steps: [
        { id: "ds1", title: "Rendering vector assets across 16px to 512px", state: "completed" },
        { id: "ds2", title: "Requesting design review", state: "active" },
      ],
      logs: [],
      touchedFiles: [],
    },
    error: {
      id: "task-des-3",
      title: "Syncing Figma design library components.",
      elapsedSeconds: 50,
      progressPercent: 15,
      status: "error",
      errorInfo: {
        plainLanguageReason: "Figma personal access token expired.",
        suggestedFix: "Click Retry after updating token in integrations panel.",
      },
      steps: [
        { id: "ds1", title: "Connecting to Figma REST API", state: "active" },
      ],
      logs: [],
      touchedFiles: [],
    },
    idle: {
      id: "task-des-idle",
      title: "Waiting for next task",
      elapsedSeconds: 0,
      progressPercent: 0,
      status: "idle",
      steps: [],
      logs: [],
      touchedFiles: [],
    },
  },
  sales: {
    working: {
      id: "task-sal-1",
      title: "Enriching target B2B outbound lead list.",
      elapsedSeconds: 120,
      progressPercent: 45,
      status: "working",
      steps: [
        { id: "ss1", title: "Filtering LinkedIn leads: Founders with 5-50 employee size", state: "completed" },
        { id: "ss2", title: "Verifying email syntax & MX record deliverability", state: "active" },
        { id: "ss3", title: "Personalizing 1-to-1 cold outreach messages", state: "pending" },
      ],
      logs: [
        { id: "sl1", timestamp: "07:03:10", level: "info", text: "Found 150 matching founder profiles in US Tech sector" },
        { id: "sl2", timestamp: "07:03:40", level: "info", text: "Verified 142 direct work emails (94.6% accuracy rate)" },
      ],
      touchedFiles: [
        { path: "sales/leads_q3_validated.csv", status: "created", additions: 150, deletions: 0 },
      ],
    },
    awaiting_approval: {
      id: "task-sal-2",
      title: "Launching outbound cold email sequence.",
      elapsedSeconds: 200,
      progressPercent: 75,
      status: "awaiting_approval",
      approvalCallout: {
        actionRequired: "Needs your input: Outbound Sequence Approval",
        details: "Ryan prepared a 3-step email campaign targeting 50 SaaS cofounders.",
        proposedChange: "Start sending Step 1: 'Automate your startup ops in 2026'.",
      },
      steps: [
        { id: "ss1", title: "Drafting personalized hooks", state: "completed" },
        { id: "ss2", title: "Setting daily send throttle (25 emails/day)", state: "completed" },
        { id: "ss3", title: "Awaiting campaign authorization", state: "active" },
      ],
      logs: [],
      touchedFiles: [],
    },
    error: {
      id: "task-sal-3",
      title: "Syncing CRM contacts to HubSpot.",
      elapsedSeconds: 40,
      progressPercent: 25,
      status: "error",
      errorInfo: {
        plainLanguageReason: "HubSpot API key missing 'crm.objects.contacts.write' scope.",
        suggestedFix: "Grant contact write permission in HubSpot developer portal.",
      },
      steps: [
        { id: "ss1", title: "Authenticating with HubSpot OAuth2", state: "active" },
      ],
      logs: [],
      touchedFiles: [],
    },
    idle: {
      id: "task-sal-idle",
      title: "Waiting for next task",
      elapsedSeconds: 0,
      progressPercent: 0,
      status: "idle",
      steps: [],
      logs: [],
      touchedFiles: [],
    },
  },
  operations: {
    working: {
      id: "task-ops-1",
      title: "Automating internal Slack notification triggers.",
      elapsedSeconds: 110,
      progressPercent: 60,
      status: "working",
      steps: [
        { id: "os1", title: "Connecting Slack Webhook API", state: "completed" },
        { id: "os2", title: "Formatting rich block kit message templates", state: "active" },
        { id: "os3", title: "Testing webhook delivery", state: "pending" },
      ],
      logs: [],
      touchedFiles: [],
    },
    awaiting_approval: {
      id: "task-ops-2",
      title: "Updating team permission policies.",
      elapsedSeconds: 90,
      progressPercent: 50,
      status: "awaiting_approval",
      approvalCallout: {
        actionRequired: "Needs your input: Grant Admin Access",
        details: "Devon requests admin access to production monitoring tools.",
        proposedChange: "Assign 'Infrastructure Administrator' role to Devon agent.",
      },
      steps: [{ id: "os1", title: "Formulating access request", state: "active" }],
      logs: [],
      touchedFiles: [],
    },
    error: {
      id: "task-ops-3",
      title: "Backup automated database snapshot.",
      elapsedSeconds: 20,
      progressPercent: 10,
      status: "error",
      errorInfo: {
        plainLanguageReason: "AWS S3 bucket storage quota exceeded.",
        suggestedFix: "Expand S3 storage bucket or archive old backups.",
      },
      steps: [{ id: "os1", title: "Creating snapshot", state: "active" }],
      logs: [],
      touchedFiles: [],
    },
    idle: {
      id: "task-ops-idle",
      title: "Waiting for next task",
      elapsedSeconds: 0,
      progressPercent: 0,
      status: "idle",
      steps: [],
      logs: [],
      touchedFiles: [],
    },
  },
  legal: {
    working: {
      id: "task-leg-1",
      title: "Drafting Terms of Service and Privacy Policy.",
      elapsedSeconds: 300,
      progressPercent: 80,
      status: "working",
      steps: [
        { id: "ls1", title: "Reviewing GDPR compliance rules", state: "completed" },
        { id: "ls2", title: "Drafting user data retention clauses", state: "completed" },
        { id: "ls3", title: "Formatting customer agreement document", state: "active" },
      ],
      logs: [],
      touchedFiles: [{ path: "legal/terms_of_service.md", status: "created", additions: 140, deletions: 0 }],
    },
    awaiting_approval: {
      id: "task-leg-2",
      title: "Filing trademark application.",
      elapsedSeconds: 150,
      progressPercent: 70,
      status: "awaiting_approval",
      approvalCallout: {
        actionRequired: "Needs your input: Confirm Trademark Filing",
        details: "Morgan prepared USPTO filing for brand name 'Automyte'.",
        proposedChange: "Submit Class 042 Software as a Service application.",
      },
      steps: [{ id: "ls1", title: "Preparing USPTO form", state: "active" }],
      logs: [],
      touchedFiles: [],
    },
    error: {
      id: "task-leg-3",
      title: "Verifying corporate registration document.",
      elapsedSeconds: 25,
      progressPercent: 20,
      status: "error",
      errorInfo: {
        plainLanguageReason: "State filing portal API unavailable.",
        suggestedFix: "Retry operation during business hours.",
      },
      steps: [{ id: "ls1", title: "Querying Delaware portal", state: "active" }],
      logs: [],
      touchedFiles: [],
    },
    idle: {
      id: "task-leg-idle",
      title: "Waiting for next task",
      elapsedSeconds: 0,
      progressPercent: 0,
      status: "idle",
      steps: [],
      logs: [],
      touchedFiles: [],
    },
  },
  support: {
    working: {
      id: "task-sup-1",
      title: "Responding to customer onboarding inquiry.",
      elapsedSeconds: 70,
      progressPercent: 65,
      status: "working",
      steps: [
        { id: "su1", title: "Parsing user support ticket #1042", state: "completed" },
        { id: "su2", title: "Searching knowledge base for custom domain setup guide", state: "completed" },
        { id: "su3", title: "Drafting personalized resolution response", state: "active" },
      ],
      logs: [],
      touchedFiles: [],
    },
    awaiting_approval: {
      id: "task-sup-2",
      title: "Issuing customer subscription refund.",
      elapsedSeconds: 110,
      progressPercent: 85,
      status: "awaiting_approval",
      approvalCallout: {
        actionRequired: "Needs your input: Confirm $49 Refund Request",
        details: "Jamie recommends issuing a pro-rated refund for customer ticket #1019.",
        proposedChange: "Refund $49.00 to card ending in 8831.",
      },
      steps: [{ id: "su1", title: "Calculating pro-rated amount", state: "active" }],
      logs: [],
      touchedFiles: [],
    },
    error: {
      id: "task-sup-3",
      title: "Syncing Intercom ticket inbox.",
      elapsedSeconds: 15,
      progressPercent: 10,
      status: "error",
      errorInfo: {
        plainLanguageReason: "Intercom OAuth token expired.",
        suggestedFix: "Reconnect Intercom integration in settings.",
      },
      steps: [{ id: "su1", title: "Connecting inbox", state: "active" }],
      logs: [],
      touchedFiles: [],
    },
    idle: {
      id: "task-sup-idle",
      title: "Waiting for next task",
      elapsedSeconds: 0,
      progressPercent: 0,
      status: "idle",
      steps: [],
      logs: [],
      touchedFiles: [],
    },
  },
};

// Format seconds into MM:SS or HH:MM:SS
export function formatElapsedTime(seconds: number): string {
  if (seconds <= 0) return "Just started";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${pad(hrs)}:${pad(remMins)}:${pad(secs)} elapsed`;
  }
  return `${pad(mins)}:${pad(secs)} elapsed`;
}
