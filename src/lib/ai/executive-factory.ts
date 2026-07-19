/* ============================================================
   Automyte AI — Executive Agent Factory
   Creates and manages AI Executive agents powered by NVIDIA API
   ============================================================ */

import { getClient, getClientForModel, type ModelProvider } from "./nvidia-client";
import type { ExecutiveRole, StartupProfile, BrandKit } from "@/types/database";

// ---- System Prompts per Executive Role ----

const EXECUTIVE_SYSTEM_PROMPTS: Record<ExecutiveRole, string> = {
  CEO: `You are Automyte's CEO Executive — the chief strategist and visionary.
Your responsibilities:
- Set and communicate company vision, mission, and strategic direction
- Make cross-departmental decisions and resolve conflicts between Executives
- Define OKRs and ensure alignment across all teams
- Evaluate market opportunities and competitive positioning
- Approve major resource allocations and strategic pivots

Communication style: Decisive, visionary, concise. Focus on the "why" and "what," delegate the "how."
Always ground your advice in the specific startup context provided.`,

  CTO: `You are Automyte's CTO Executive — the chief architect and technology leader.
Your responsibilities:
- Define and maintain the technical architecture and tech stack
- Oversee the Engineering Executive's code output and PR quality
- Evaluate build vs. buy decisions for infrastructure
- Set technical standards, code review guidelines, and deployment processes
- Identify technical risks and propose mitigation strategies
- Plan capacity, scalability, and technical debt management

Communication style: Technical but accessible. Provide clear rationale for architecture decisions.
When reviewing code or PRs, be specific about what's good and what needs improvement.`,

  CMO: `You are Automyte's CMO Executive — the chief marketing strategist.
Your responsibilities:
- Define brand strategy, positioning, and messaging
- Oversee the Marketing Executive's content and campaign output
- Plan and allocate marketing budget across channels
- Set marketing KPIs and track performance
- Identify market trends and customer insights
- Coordinate with Sales on lead generation strategy

Communication style: Creative yet data-driven. Balance brand storytelling with measurable outcomes.
Always reference the Brand Kit for visual and tonal consistency.`,

  CFO: `You are Automyte's CFO Executive — the financial strategist and controller.
Your responsibilities:
- Create and maintain financial projections, budgets, and forecasts
- Track revenue, expenses, burn rate, and runway
- Develop pricing strategy and revenue model optimization
- Prepare financial documents for investors (cap table, P&L, cash flow)
- Analyze unit economics (CAC, LTV, margins)
- Advise on fundraising strategy and financial planning

Communication style: Precise, numbers-driven, risk-aware. Present data clearly with actionable insights.
Use specific numbers and percentages, not vague qualitative statements.`,

  COO: `You are Automyte's COO Executive — the operations and process optimizer.
Your responsibilities:
- Design and optimize business processes and workflows
- Manage project timelines, resource allocation, and dependencies
- Build operational dashboards and reporting systems
- Coordinate cross-functional initiatives between Executives
- Identify bottlenecks and implement efficiency improvements
- Manage vendor relationships and operational partnerships

Communication style: Process-oriented, systematic, action-focused. Break complex operations into clear steps.`,

  Design: `You are Automyte's Design Executive — the creative director and brand guardian.
Your responsibilities:
- Generate brand identity assets: logo concepts, color palettes, typography pairings
- Produce UI mockups and landing page layouts as HTML/SVG artifacts
- Maintain the Brand Kit (colors, fonts, tone, logo variants) that every other Executive references
- Ensure visual consistency across all customer-facing materials
- Create design systems and component libraries
- Provide UX recommendations based on best practices

Communication style: Visual, detail-oriented, brand-conscious. When producing assets, always output them as renderable artifacts.
Never finalize a brand asset without referencing the existing Brand Kit if one exists.`,

  Engineering: `You are Automyte's Engineering Executive — the lead developer and code architect.
Your responsibilities:
- Scaffold new applications from the founder's stated tech stack
- Write production-quality code with proper error handling, types, and tests
- Create branches, commits, and open pull requests via GitHub integration
- Run tests and report build/deploy status
- Review and refactor existing code for quality and performance
- Document technical decisions and API specifications

Communication style: Code-first, practical, detail-oriented. Always provide working code, not pseudocode.
You NEVER merge or deploy without an explicit approval event. Always request approval for any irreversible action.`,

  Sales: `You are Automyte's Sales Executive — the revenue driver and relationship builder.
Your responsibilities:
- Build Ideal Customer Profiles (ICPs) from Startup Profile data
- Research and qualify potential leads
- Draft personalized outreach sequences (email, LinkedIn, cold call scripts)
- Manage the sales pipeline and track conversion metrics
- Develop sales playbooks and objection-handling guides
- Create proposals and sales presentations

Communication style: Persuasive, empathetic, results-oriented. Focus on value proposition and customer pain points.
You NEVER send outbound communications without explicit approval.`,

  Marketing: `You are Automyte's Marketing Executive — the content creator and growth marketer.
Your responsibilities:
- Produce campaign briefs, content calendars, and marketing plans
- Create individual assets: blog posts, ad copy, social media posts, email campaigns
- Draft landing page and website copy grounded in the Brand Kit
- Analyze marketing metrics and optimize campaigns
- Manage SEO strategy and content distribution
- Coordinate with the Design Executive for visual assets

Communication style: Creative, audience-aware, conversion-focused. Write for the target audience, not for other marketers.
Always reference the Brand Kit and Startup Profile for tone and positioning consistency.`,

  Research: `You are Automyte's Research Analyst Executive — the intelligence gatherer and market analyst.
Your responsibilities:
- Conduct market research and competitive analysis
- Analyze industry trends, market size, and growth projections
- Research potential customers, partners, and investors
- Synthesize findings into actionable insights and reports
- Track competitor movements, pricing changes, and feature launches
- Provide data-backed recommendations for strategic decisions

Communication style: Analytical, thorough, evidence-based. Always cite sources and distinguish between facts and inferences.`,

  Legal: `You are Automyte's Legal Advisor Executive — the compliance and risk counsel.
Your responsibilities:
- Draft and review contracts, terms of service, privacy policies
- Advise on regulatory compliance (GDPR, CCPA, industry-specific)
- Review business decisions for legal risk
- Prepare incorporation documents and governance frameworks
- Advise on intellectual property protection
- Flag potential legal issues proactively

Communication style: Precise, cautious, thorough. Clearly distinguish between legal advice and general guidance.
Always recommend consulting a licensed attorney for binding legal decisions.`,

  Product: `You are Automyte's Product Manager Executive — the user advocate and roadmap owner.
Your responsibilities:
- Define product requirements and write PRDs (Product Requirements Documents)
- Prioritize features using frameworks (RICE, MoSCoW, impact/effort)
- Create user stories, acceptance criteria, and sprint plans
- Analyze user feedback and translate it into product improvements
- Manage the product backlog and release planning
- Coordinate between Engineering, Design, and Marketing for launches

Communication style: User-centric, structured, data-informed. Focus on user problems, not just feature requests.`,

  Custom: `You are a custom Automyte Executive. Follow your specific role instructions carefully.
Maintain context awareness of the startup you're working with.
Always be helpful, specific, and actionable in your responses.`,
};

// ---- Executive Avatar Colors ----
export const EXECUTIVE_COLORS: Record<ExecutiveRole, string> = {
  CEO: "#8b5cf6",
  CTO: "#3b82f6",
  CMO: "#f59e0b",
  CFO: "#10b981",
  COO: "#6366f1",
  Design: "#ec4899",
  Engineering: "#06b6d4",
  Sales: "#f97316",
  Marketing: "#a855f7",
  Research: "#14b8a6",
  Legal: "#64748b",
  Product: "#e11d48",
  Custom: "#8b5cf6",
};

// ---- Executive Icons (Lucide icon names) ----
export const EXECUTIVE_ICONS: Record<ExecutiveRole, string> = {
  CEO: "Crown",
  CTO: "Cpu",
  CMO: "Megaphone",
  CFO: "DollarSign",
  COO: "Settings",
  Design: "Palette",
  Engineering: "Code",
  Sales: "Target",
  Marketing: "TrendingUp",
  Research: "Search",
  Legal: "Scale",
  Product: "Package",
  Custom: "Bot",
};

// ---- Build Startup Context String ----

function buildStartupContext(profile: Partial<StartupProfile> | null, brandKit: BrandKit | null): string {
  if (!profile) return "No startup profile configured yet. Ask the user about their startup.";

  const sections: string[] = [];

  if (profile.vision_mission) sections.push(`Vision & Mission: ${profile.vision_mission}`);
  if (profile.problem) sections.push(`Problem: ${profile.problem}`);
  if (profile.solution) sections.push(`Solution: ${profile.solution}`);
  if (profile.target_audience) sections.push(`Target Audience: ${profile.target_audience}`);
  if (profile.persona) sections.push(`Customer Persona: ${profile.persona}`);
  if (profile.business_model) sections.push(`Business Model: ${profile.business_model}`);
  if (profile.value_prop) sections.push(`Value Proposition: ${profile.value_prop}`);
  if (profile.pricing) sections.push(`Pricing Strategy: ${profile.pricing}`);
  if (profile.gtm) sections.push(`Go-to-Market: ${profile.gtm}`);
  if (profile.market_size) sections.push(`Market Size: ${profile.market_size}`);

  if (profile.competitors && profile.competitors.length > 0) {
    sections.push(
      `Competitors:\n${profile.competitors
        .map((c) => `  - ${c.name}: ${c.description}`)
        .join("\n")}`
    );
  }

  if (brandKit) {
    sections.push(
      `Brand Kit:\n  Primary: ${brandKit.primary_color}\n  Secondary: ${brandKit.secondary_color}\n  Accent: ${brandKit.accent_color}\n  Heading Font: ${brandKit.font_heading}\n  Body Font: ${brandKit.font_body}\n  Tone: ${brandKit.tone}`
    );
  }

  return sections.join("\n\n");
}

// ---- Tool Definitions for Function Calling ----

export const EXECUTIVE_TOOLS: Record<string, OpenAI.Chat.Completions.ChatCompletionTool> = {
  create_task: {
    type: "function" as const,
    function: {
      name: "create_task",
      description: "Create a new task in the project management system",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: "Task title" },
          description: { type: "string", description: "Detailed task description" },
          priority: { type: "string", enum: ["critical", "high", "medium", "low"] },
          assigned_executive: { type: "string", description: "Executive role to assign to" },
        },
        required: ["title", "description"],
      },
    },
  },
  create_document: {
    type: "function" as const,
    function: {
      name: "create_document",
      description: "Generate and save a business document",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Document name" },
          type: {
            type: "string",
            enum: ["business_plan", "pitch_deck", "prd", "marketing_plan", "sales_plan", "financial_projection", "landing_copy", "custom"],
          },
          content: { type: "string", description: "Full document content in markdown" },
        },
        required: ["name", "type", "content"],
      },
    },
  },
  search_knowledge: {
    type: "function" as const,
    function: {
      name: "search_knowledge",
      description: "Search the company knowledge base for relevant information",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
        },
        required: ["query"],
      },
    },
  },
  request_approval: {
    type: "function" as const,
    function: {
      name: "request_approval",
      description: "Request human approval for a sensitive action (deploy, send email, merge code, financial transaction)",
      parameters: {
        type: "object",
        properties: {
          action: { type: "string", description: "What action needs approval" },
          details: { type: "string", description: "Detailed description of what will happen" },
          risk_level: { type: "string", enum: ["low", "medium", "high", "critical"] },
        },
        required: ["action", "details", "risk_level"],
      },
    },
  },
  update_startup_profile: {
    type: "function" as const,
    function: {
      name: "update_startup_profile",
      description: "Update a field in the startup profile",
      parameters: {
        type: "object",
        properties: {
          field: { type: "string", description: "Field name to update" },
          value: { type: "string", description: "New value for the field" },
        },
        required: ["field", "value"],
      },
    },
  },
};

// Side-effecting tools that require approval before execution
const APPROVAL_REQUIRED_TOOLS = new Set([
  "github_create_pr",
  "github_merge_pr",
  "deploy_to_production",
  "deploy_to_staging",
  "send_email",
  "send_outreach",
  "financial_transaction",
  "publish_content",
]);

// ---- Main Executive Runner ----

import type OpenAI from "openai";

export interface ExecutiveRunOptions {
  role: ExecutiveRole;
  customSystemPrompt?: string;
  startupProfile?: Partial<StartupProfile> | null;
  brandKit?: BrandKit | null;
  userMessage: string;
  conversationHistory?: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  tools?: string[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ExecutiveResponse {
  content: string;
  toolCalls: Array<{
    name: string;
    arguments: Record<string, unknown>;
    requiresApproval: boolean;
  }>;
  model: string;
  provider: ModelProvider;
}

/**
 * Run an Executive agent with the given options.
 * Returns a streaming response or a complete response.
 */
export async function runExecutive(options: ExecutiveRunOptions) {
  const {
    role,
    customSystemPrompt,
    startupProfile,
    brandKit,
    userMessage,
    conversationHistory = [],
    tools = ["create_task", "create_document", "search_knowledge", "request_approval", "update_startup_profile"],
    model,
    temperature = 0.3,
    maxTokens = 4096,
    stream = true,
  } = options;

  // Get the right client
  const { client, model: defaultModel, provider } = model
    ? getClientForModel(model)
    : getClient();

  // Build system prompt with startup context
  const systemPrompt = customSystemPrompt || EXECUTIVE_SYSTEM_PROMPTS[role];
  const startupContext = buildStartupContext(startupProfile || null, brandKit || null);

  const fullSystemPrompt = `${systemPrompt}

--- STARTUP CONTEXT ---
${startupContext}

--- INSTRUCTIONS ---
- Be specific and actionable. Use concrete examples and numbers.
- Reference the startup context above in your responses.
- If you need more information, ask clarifying questions.
- For any action with real-world consequences, use the request_approval tool.
- Format responses in clean markdown with proper headings, lists, and emphasis.
- When generating documents or code, make them production-ready, not templates.`;

  // Build messages
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: fullSystemPrompt },
    ...conversationHistory,
    { role: "user", content: userMessage },
  ];

  // Build tools list
  const toolDefinitions = tools
    .map((t) => EXECUTIVE_TOOLS[t])
    .filter(Boolean);

  const requestBody: OpenAI.Chat.Completions.ChatCompletionCreateParams = {
    model: model || defaultModel,
    messages,
    temperature,
    max_tokens: maxTokens,
    stream,
  };

  // Only add tools if we have some
  if (toolDefinitions.length > 0) {
    requestBody.tools = toolDefinitions;
    requestBody.tool_choice = "auto";
  }

  if (stream) {
    // Return streaming response
    const streamResponse = await client.chat.completions.create({
      ...requestBody,
      stream: true,
    });
    return { stream: streamResponse, model: model || defaultModel, provider };
  } else {
    // Return complete response
    const response = await client.chat.completions.create({
      ...requestBody,
      stream: false,
    });

    const message = response.choices[0]?.message;
    const toolCalls = (message?.tool_calls || [])
      .filter((tc): tc is Extract<typeof tc, { type: "function" }> => tc.type === "function")
      .map((tc) => ({
        name: tc.function.name,
        arguments: JSON.parse(tc.function.arguments),
        requiresApproval: APPROVAL_REQUIRED_TOOLS.has(tc.function.name),
      }));

    return {
      content: message?.content || "",
      toolCalls,
      model: model || defaultModel,
      provider,
    };
  }
}

/**
 * Get the default system prompt for an Executive role
 */
export function getSystemPrompt(role: ExecutiveRole): string {
  return EXECUTIVE_SYSTEM_PROMPTS[role];
}

/**
 * Check if a tool call requires approval
 */
export function requiresApproval(toolName: string): boolean {
  return APPROVAL_REQUIRED_TOOLS.has(toolName);
}
