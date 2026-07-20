export interface HowToStepItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullContent: string;
  agentRole: string;
  suggestedPrompt: string;
  checklist: string[];
}

export interface HowToChapter {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  iconName: "Zap" | "Target" | "Users" | "LineChart";
  description: string;
  readTime: string;
  quote: {
    text: string;
    author: string;
    role: string;
  };
  metrics: { label: string; value: string }[];
  steps: HowToStepItem[];
  nextSlug?: string;
  nextTitle?: string;
}

export const howToData: Record<string, HowToChapter> = {
  start: {
    slug: "start",
    title: "How to start a company",
    subtitle: "Pick a wedge, evaluate the idea, ship a domain — the start of the founder playbook.",
    tagline: "Go from concept to incorporated startup with AI executives by your side.",
    iconName: "Zap",
    readTime: "8 min read",
    description:
      "Starting a company used to mean weeks of legal friction, expensive corporate counsel, and guesswork about positioning. With Automyte AI, your virtual Legal, Finance, and Operations executives analyze market opportunities, draft legal charters, and set up your founding operating stack.",
    quote: {
      text: "Automyte took the headache out of incorporation and strategic setup. It was like having a seasoned GC and Operations VP on staff from day one.",
      author: "Kishore V",
      role: "Founder & CEO, Automyte AI",
    },
    metrics: [
      { label: "Time to Incorporate", value: "48 Hours" },
      { label: "Cost Saved on Legal", value: "$4,500+" },
      { label: "Initial Traction Speed", value: "3x Faster" },
    ],
    steps: [
      {
        id: "introduction",
        number: "01",
        title: "Introduction to Agentic Founding",
        shortDesc: "Understand how AI cofounders shift the paradigm of starting a company.",
        fullContent:
          "Traditional company formation requires juggling dozens of disparate tasks: market research, entity incorporation, equity split agreements, and initial pitch positioning. Automyte AI changes the default by providing an agentic operating system. Instead of spending your first month in administrative deadlock, your executive squad collaborates live on your canvas to execute tasks autonomously.",
        agentRole: "CEO & Strategy Executive",
        suggestedPrompt: "Brief Automyte AI on your initial startup vision and target domain to generate your founding roadmap.",
        checklist: [
          "Define core thesis and problem statement",
          "Set target timeline and milestone goals",
          "Identify initial cofounder roles and responsibilities",
        ],
      },
      {
        id: "should-you-start",
        number: "02",
        title: "Should You Start a Company?",
        shortDesc: "Evaluate personal conviction, risk tolerance, and founder-market fit.",
        fullContent:
          "Before committing years of effort, conduct a rigorous self and market assessment. Are you solving a problem you have felt deeply? Do you possess an unfair advantage in distribution, technical capability, or domain depth? Your AI CEO Agent helps evaluate your thesis against market data, identifying blind spots early before capital is deployed.",
        agentRole: "CEO Executive",
        suggestedPrompt: "Evaluate my founder-market fit for building a B2B developer tool based on my background in infrastructure engineering.",
        checklist: [
          "Assess unfair advantage (distribution, domain, technical)",
          "Validate personal conviction and 5-year commitment",
          "Analyze downside risk profile and runway requirement",
        ],
      },
      {
        id: "startup-ideas",
        number: "03",
        title: "How to Come Up With Startup Ideas",
        shortDesc: "Mine personal pain points, emerging AI primitives, and workflow shifts.",
        fullContent:
          "The best startup ideas often come from 'living in the future' and noticing what's missing. Look for painful manual workflows in existing industries, unbundled enterprise software suites, or new capabilities unlocked by LLM reasoning and multimodal foundation models. Use Automyte AI to brainstorm and cluster ideas into high-potential opportunity vectors.",
        agentRole: "Product Executive",
        suggestedPrompt: "Generate 5 high-yield startup ideas in the agentic finance space that address manual compliance bottlenecks.",
        checklist: [
          "List 10 personal frustrations from your previous work",
          "Identify manual workflows costing companies >$50k/yr",
          "Map newly available AI primitives to legacy SaaS categories",
        ],
      },
      {
        id: "evaluate-ideas",
        number: "04",
        title: "Evaluate Startup Ideas",
        shortDesc: "Run your ideas through market size, velocity, and moat frameworks.",
        fullContent:
          "Not all good ideas make great businesses. Filter your concepts using four key dimensions: Total Addressable Market (TAM), distribution velocity, unit economics potential, and long-term defensibility (data moats, network effects, or workflow lock-in). Automyte's Market Research Agent pulls real-time competitive intelligence to score your candidate ideas.",
        agentRole: "Strategy Agent",
        suggestedPrompt: "Run a TAM analysis and competitive evaluation for a developer-centric API monitoring service.",
        checklist: [
          "Estimate TAM, SAM, and SOM using bottom-up sizing",
          "Map top 5 existing competitors and incumbents",
          "Identify potential moat: network effect, data flywheel, or switching cost",
        ],
      },
      {
        id: "wedge-market",
        number: "05",
        title: "Pick a Wedge Market",
        shortDesc: "Start hyper-focused on a narrow Ideal Customer Profile (ICP).",
        fullContent:
          "A wedge market is a small, underserved segment where your product can become dominant quickly. Don't try to build software for 'all sales teams'; build software for 'Series A B2B DevTools sales reps using HubSpot'. Winning a concentrated wedge gives you momentum, social proof, and cash flow to expand into adjacent markets.",
        agentRole: "Marketing Executive",
        suggestedPrompt: "Define the narrowest wedge market and ICP for an AI-powered code auditing agent.",
        checklist: [
          "Select a niche ICP with high urgency and budget",
          "Craft a hyper-specific value proposition statement",
          "Identify 50 target prospect companies in your wedge",
        ],
      },
      {
        id: "name-and-domain",
        number: "06",
        title: "Pick a Name and Domain",
        shortDesc: "Establish a clear brand name, secure domain, and check trademark availability.",
        fullContent:
          "Your brand name should be memorable, easy to spell, and aligned with your positioning. Your Design and Legal Agents search domain registries, analyze trademark databases, and generate available name options along with social media handle availability.",
        agentRole: "Design & Legal Agents",
        suggestedPrompt: "Brainstorm 10 short, punchy brand names for an AI dev agent platform and check domain availability.",
        checklist: [
          "Generate name concepts (descriptive, abstract, or compound)",
          "Check domain availability (.co, .ai, .com, or .io)",
          "Run preliminary USPTO trademark availability search",
        ],
      },
      {
        id: "take-the-leap",
        number: "07",
        title: "Take the Leap & Incorporate",
        shortDesc: "Draft bylaws, incorporate your entity, and launch your founding charter.",
        fullContent:
          "Once your wedge is clear and your name is secured, take the leap. Connect with Ramp via Automyte AI to incorporate your Delaware C-Corp or LLC in minutes, set up corporate banking, assign founder equity with 4-year vesting schedules (1-year cliff), and issue your first 80(b) tax elections.",
        agentRole: "Legal & Operations Executive",
        suggestedPrompt: "Draft Delaware C-Corp incorporation docs with 80/20 equity split and standard 4-year vesting schedule.",
        checklist: [
          "File Delaware C-Corp or state LLC incorporation",
          "Establish founder equity split & vesting terms",
          "Set up business bank account and corporate credit card via Ramp",
        ],
      },
    ],
    nextSlug: "build",
    nextTitle: "Build your product",
  },

  build: {
    slug: "build",
    title: "How to build with Automyte AI",
    subtitle: "From spec to deployment: scaffolding the codebase, wiring CI, and running real infrastructure.",
    tagline: "Ship production-grade MVPs in days with engineering and design agent squads.",
    iconName: "Target",
    readTime: "10 min read",
    description:
      "Building software shouldn't require months of boilerplate setup. Automyte AI's Engineering and Design Executives work together to transform your product specs into clean, deployable code repositories complete with database schemas, CI/CD pipelines, and responsive frontends.",
    quote: {
      text: "We shipped our entire MVP in 2 weeks instead of 3 months. The engineering agents set up our Supabase schemas and Vercel pipelines automatically.",
      author: "Jordan Rivera",
      role: "CTO, Automyte AI",
    },
    metrics: [
      { label: "Deployment Velocity", value: "10x Speedup" },
      { label: "Code Coverage", value: "92% Tests" },
      { label: "Time to First Commit", value: "< 15 Mins" },
    ],
    steps: [
      {
        id: "introduction",
        number: "01",
        title: "Introduction to Agentic Engineering",
        shortDesc: "Learn how autonomous developer agents collaborate with human founders.",
        fullContent:
          "Agentic engineering replaces repetitive boilerplate coding with architectural oversight. Instead of typing every line of React or SQL, you describe features to your CTO and Engineering agents. They break specifications into tasks, draft database migration scripts, write component logic, and run automated test suites before deploying.",
        agentRole: "CTO & Engineering Executive",
        suggestedPrompt: "Scaffold a Next.js 16 app with TypeScript, Tailwind CSS, and Supabase authentication.",
        checklist: [
          "Choose tech stack (Next.js, TypeScript, Tailwind, Supabase)",
          "Establish codebase conventions and directory structure",
          "Configure environment variable templates",
        ],
      },
      {
        id: "come-up-with-spec",
        number: "02",
        title: "Come Up With a Spec (PRD)",
        shortDesc: "Turn brain dumps into structured Product Requirement Documents.",
        fullContent:
          "Great software starts with a unambiguous spec. Your Product Agent translates high-level feature requirements into detailed user stories, data schemas, API routes, and edge case specifications. This ensures engineering agents execute with zero ambiguity.",
        agentRole: "Product Executive",
        suggestedPrompt: "Write a PRD for a real-time task management dashboard with team permissions and activity feeds.",
        checklist: [
          "Document core user journeys and wireframe concepts",
          "Define mandatory vs. nice-to-have features for MVP",
          "Specify data models and API endpoint contracts",
        ],
      },
      {
        id: "create-repository",
        number: "03",
        title: "Create a Repository & Git Strategy",
        shortDesc: "Initialize code repos, branch protection, and commit conventions.",
        fullContent:
          "Set up a GitHub or GitLab repository with strict branch protection rules (`main` protected, PR reviews required). Your Engineering Executive initializes the repository, sets up `.gitignore`, configures ESLint and Prettier, and establishes semantic commit conventions.",
        agentRole: "Engineering Executive",
        suggestedPrompt: "Initialize GitHub repository with main branch protection rules and GitHub Actions CI workflow.",
        checklist: [
          "Create GitHub repository and set access permissions",
          "Add README, license, and .gitignore file",
          "Configure branch protection and automated pull request checks",
        ],
      },
      {
        id: "setup-deployment",
        number: "04",
        title: "Set Up Deployment & Infrastructure",
        shortDesc: "Connect Vercel, Supabase, and automated deployment pipelines.",
        fullContent:
          "Continuous deployment ensures every merged pull request is immediately live on a staging or production preview URL. Connect Vercel for serverless hosting and Supabase for Managed PostgreSQL, Row Level Security (RLS), and Realtime subscriptions.",
        agentRole: "DevOps & Cloud Agent",
        suggestedPrompt: "Link Vercel project to GitHub repository and configure automatic production deployments.",
        checklist: [
          "Provision Vercel project and custom domain preview URLs",
          "Create Supabase database instance and retrieve API credentials",
          "Verify SSL certificates and DNS A/CNAME records",
        ],
      },
      {
        id: "secret-management",
        number: "05",
        title: "Secret Management & Environment Safety",
        shortDesc: "Isolate API keys, secret tokens, and database credentials safely.",
        fullContent:
          "Never hardcode secrets into source repositories. Store sensitive keys (Supabase Service Keys, LLM API keys, Stripe Webhook secrets) in Vercel Environment Variables and local `.env.local` files protected by `.gitignore`.",
        agentRole: "Security Agent",
        suggestedPrompt: "Audit current codebase for exposed API keys or unencrypted environment secrets.",
        checklist: [
          "Store production secrets in encrypted Vercel settings",
          "Set up `.env.local.example` for local developer onboarding",
          "Implement secret scanning in CI pipeline",
        ],
      },
      {
        id: "scaffold-app",
        number: "06",
        title: "Scaffold Your App Architecture",
        shortDesc: "Build your design system, component library, and brand kit.",
        fullContent:
          "Your Design Executive creates a cohesive design system: dark/light theme tokens, typography scales (Inter, Outfit, Georgia), button primitives, glassmorphism cards, and responsive sidebar layouts. This ensures every view in your app looks sleek and premium.",
        agentRole: "Design Executive",
        suggestedPrompt: "Generate a Tailwind CSS design token system with custom surface, border, and ink color variables.",
        checklist: [
          "Define color palette tokens (surface, border, ink, primary)",
          "Build reusable UI components (Buttons, Inputs, Cards, Modals)",
          "Establish responsive layout grid and header navigation",
        ],
      },
      {
        id: "the-backend",
        number: "07",
        title: "The Backend & Database Schema",
        shortDesc: "Design relational database tables, RLS policies, and serverless APIs.",
        fullContent:
          "Define SQL schemas in `schema.sql` with strict foreign key constraints, indexes on lookup columns, and Supabase Row Level Security policies so users can only access their own workspace data. Build Next.js Route Handlers (`/api/tasks`, `/api/executives`) with input validation.",
        agentRole: "Backend Engineering Agent",
        suggestedPrompt: "Write Supabase SQL schema for workspaces, user profiles, and tasks with RLS enabled.",
        checklist: [
          "Draft `schema.sql` with primary keys, foreign keys, and indexes",
          "Apply Supabase RLS policies for multi-tenant isolation",
          "Build REST/JSON Next.js API route handlers",
        ],
      },
      {
        id: "the-frontend",
        number: "08",
        title: "The Frontend & Interactive UI",
        shortDesc: "Assemble pages, live state management, and real-time subscriptions.",
        fullContent:
          "Construct interactive client components using React hooks, Zustand/Context state stores, and Lucide icons. Implement optimistic UI updates so user actions feel instantaneous, and wire up Supabase Realtime channels for live data synchronization.",
        agentRole: "Frontend Engineering Agent",
        suggestedPrompt: "Build an interactive workspace canvas component with SVG node connections and sidebar panels.",
        checklist: [
          "Connect frontend UI to API routes with SWR or React Query",
          "Implement optimistic UI feedback for button actions",
          "Test responsive rendering on mobile, tablet, and desktop viewports",
        ],
      },
      {
        id: "deploy-production",
        number: "09",
        title: "Deploy to Production & Custom Domain",
        shortDesc: "Map your production domain, SSL, and perform launch checks.",
        fullContent:
          "Point your custom domain (`app.yourcompany.com`) to Vercel CNAME targets. Verify HTTPS certificates, configure canonical redirects, and set up meta headers, OpenGraph images, and favicon assets for optimal SEO.",
        agentRole: "Operations Agent",
        suggestedPrompt: "Verify production SSL deployment and run lighthouse performance check.",
        checklist: [
          "Configure DNS records for custom domain name",
          "Verify HTTPS certificate status and HTTP to HTTPS redirects",
          "Add SEO title tags, meta descriptions, and OpenGraph images",
        ],
      },
      {
        id: "testing-quality",
        number: "10",
        title: "Testing, Quality & CI Automation",
        shortDesc: "Automate unit tests, integration tests, and static linting.",
        fullContent:
          "Configure GitHub Actions to execute `npm run build`, `eslint`, and `vitest` unit tests on every pull request. Catch type errors and broken imports before they ever reach production users.",
        agentRole: "QA & Testing Agent",
        suggestedPrompt: "Set up GitHub Actions workflow to run ESLint and Vitest on pull requests.",
        checklist: [
          "Write unit tests for core helper functions and stores",
          "Configure automated CI test runner on PR creation",
          "Perform cross-browser compatibility testing",
        ],
      },
    ],
    nextSlug: "sell",
    nextTitle: "Sell to customers",
  },

  sell: {
    slug: "sell",
    title: "How to sell with Automyte AI",
    subtitle: "Brand, ICP, outreach, and a sales motion you can actually run end-to-end.",
    tagline: "Build a high-converting go-to-market engine with AI sales & marketing agents.",
    iconName: "Users",
    readTime: "9 min read",
    description:
      "Having a great product isn't enough; you need a distribution engine that converts prospects into passionate paying customers. Automyte AI's Sales and Marketing Executives identify high-intent buyer personas, write personalized cold outreach sequences, and automate customer deal tracking.",
    quote: {
      text: "Our marketing and sales agents generated a targeted cold email campaign that closed our first 12 enterprise design partners in 30 days.",
      author: "Maya Johnson",
      role: "CMO, Automyte AI",
    },
    metrics: [
      { label: "Outbound Reply Rate", value: "38% Average" },
      { label: "Customer Acquisition Cost", value: "65% Lower" },
      { label: "Pipeline Growth", value: "4.2x MoM" },
    ],
    steps: [
      {
        id: "introduction",
        number: "01",
        title: "Introduction to Agentic GTM",
        shortDesc: "Discover how AI agents transform sales and marketing execution.",
        fullContent:
          "Go-to-market execution requires continuous experiment velocity: testing messaging angles, identifying niche buyer segments, and following up systematically. Automyte AI automates these repetitive workflows so you can focus on building high-trust customer relationships.",
        agentRole: "CMO & Sales Executive",
        suggestedPrompt: "Outline a 30-day GTM strategy for launching our B2B SaaS product to engineering leaders.",
        checklist: [
          "Establish GTM goals (lead volume, conversion rates, ARR targets)",
          "Select primary acquisition channels (Outbound, Content, PLG)",
          "Set up marketing analytics and pipeline tracking dashboard",
        ],
      },
      {
        id: "build-brand",
        number: "02",
        title: "Build a Brand Identity",
        shortDesc: "Define visual positioning, brand voice, and core value proposition.",
        fullContent:
          "Your brand is how customers feel when interacting with your product. Establish a memorable visual identity, clean typography, consistent color palettes, and a tone of voice that projects confidence, clarity, and authority.",
        agentRole: "Design & Brand Agent",
        suggestedPrompt: "Create a Brand Kit with typography guidelines, color palettes, and brand voice pillars.",
        checklist: [
          "Define brand personality pillars (e.g. Modern, Minimal, Powerful)",
          "Select primary, secondary, and accent color hex codes",
          "Craft concise elevator pitch and tagline",
        ],
      },
      {
        id: "build-website",
        number: "03",
        title: "Build a High-Converting Website",
        shortDesc: "Design landing pages optimized for visitor conversion and trust.",
        fullContent:
          "Your marketing site is your 24/7 sales representative. Structure landing pages with clear hero headlines, social proof badges, interactive product demos, benefit feature grids, founder stories, pricing cards, and prominent Call to Action (CTA) buttons.",
        agentRole: "Marketing Executive",
        suggestedPrompt: "Generate landing page copy for our product emphasizing ROI, time savings, and developer ease.",
        checklist: [
          "Draft above-the-fold headline and value proposition subtitle",
          "Include customer logos, testimonials, or quantitative metrics",
          "Ensure mobile responsiveness and fast sub-second page loads",
        ],
      },
      {
        id: "first-user",
        number: "04",
        title: "Get Your First 10 Paying Users",
        shortDesc: "Execute founder-led sales and direct outreach to get early design partners.",
        fullContent:
          "Do things that don't scale. Reach out directly to colleagues, LinkedIn contacts, and community members in your target wedge. Offer white-glove onboarding in exchange for honest product feedback and case study rights.",
        agentRole: "Sales Executive",
        suggestedPrompt: "Draft 5 personalized cold outreach templates tailored to VP of Engineering prospects.",
        checklist: [
          "Compile list of 100 warm and cold prospects in your network",
          "Conduct 15-minute discovery calls to uncover exact pain points",
          "Offer discounted founding partner pricing in exchange for case studies",
        ],
      },
      {
        id: "define-icp",
        number: "05",
        title: "Define Your Ideal Customer Profile (ICP)",
        shortDesc: "Build detailed buyer personas, firmographics, and pain point matrices.",
        fullContent:
          "Targeting everyone means targeting no one. Narrow your ICP by company size (e.g., 20-100 employees), technology stack (e.g., AWS + React), geography, and specific job titles (e.g., VP Infrastructure). Your Sales Agent enriches lead lists matching these criteria.",
        agentRole: "Sales Intelligence Agent",
        suggestedPrompt: "Identify key firmographic criteria and buyer motivations for mid-market DevOps buyers.",
        checklist: [
          "Document company headcount, ARR tier, and tech stack requirements",
          "Define economic buyer vs. champion vs. end-user roles",
          "Map top 3 objections and effective response scripts",
        ],
      },
      {
        id: "competitors",
        number: "06",
        title: "Understand Your Competitors",
        shortDesc: "Analyze competitor strengths, pricing models, and differentiation moats.",
        fullContent:
          "Know where incumbents fall short. Build competitive battle cards detailing product gaps, pricing friction, and implementation complexity of legacy alternatives. Position your product around speed, modern UX, or AI automation.",
        agentRole: "Market Research Agent",
        suggestedPrompt: "Create a competitive comparison matrix contrasting our product against top 3 market alternatives.",
        checklist: [
          "Analyze top 3 competitor pricing models and feature sets",
          "Identify key product differentiators and unique capabilities",
          "Draft competitive battle cards for your sales reps",
        ],
      },
      {
        id: "sales-workflow",
        number: "07",
        title: "Set Up Automated Sales Workflows",
        shortDesc: "Connect CRM enrichment, email sequencers, and deal pipelines.",
        fullContent:
          "Automate prospect tracking from lead capture to deal close. Set up automated CRM triggers: when a lead requests a demo, send an instant calendar link, enrich company data, and assign a Sales Agent to draft a tailored follow-up.",
        agentRole: "Sales Operations Agent",
        suggestedPrompt: "Create automated email follow-up sequence triggered when a demo request is submitted.",
        checklist: [
          "Configure CRM pipeline stages (New Lead, Qualified, Demo, Closed-Won)",
          "Set up automated email follow-up sequences with 3 touchpoints",
          "Integrate calendar booking tool (Cal.com / Calendly)",
        ],
      },
    ],
    nextSlug: "scale",
    nextTitle: "Scale your operations",
  },

  scale: {
    slug: "scale",
    title: "How to scale with Automyte AI",
    subtitle: "Analytics, support, unit economics — the loops that turn a working product into a business.",
    tagline: "Maintain momentum and build predictable compounding growth loops.",
    iconName: "LineChart",
    readTime: "11 min read",
    description:
      "When product-market fit takes off, your operations must scale seamlessly without increasing headcount linearly. Automyte AI's Finance, Operations, and Customer Support Executives automate tier-1 support, build dynamic financial runway models, and optimize your unit economics.",
    quote: {
      text: "Scaling from 10 to 50 enterprise contracts usually breaks your operations. Automyte's automated finance and support agents kept us completely sane.",
      author: "Sam Williams",
      role: "CFO, Automyte AI",
    },
    metrics: [
      { label: "Net Revenue Retention", value: "135% NRR" },
      { label: "Support Resolution Rate", value: "88% Automated" },
      { label: "Runway Accuracy", value: "99.4%" },
    ],
    steps: [
      {
        id: "introduction",
        number: "01",
        title: "Introduction to Agentic Scaling",
        shortDesc: "Learn how to build autonomous operating loops for compounding growth.",
        fullContent:
          "Scaling is about turning a working product engine into a predictable, high-margin business machine. Agentic scaling automates financial forecasting, customer support triage, churn prevention, and operational compliance so your core team stays lean.",
        agentRole: "CFO & Operations Executive",
        suggestedPrompt: "Generate a 12-month financial model forecasting MRR, ARR, and cash runway based on current growth rates.",
        checklist: [
          "Establish key SaaS health metrics (ARR, NRR, CAC Payback, LTV)",
          "Identify operational bottlenecks limiting monthly velocity",
          "Deploy automated support & financial monitoring workflows",
        ],
      },
      {
        id: "scaling-loop",
        number: "02",
        title: "Start With the Scaling Loop",
        shortDesc: "Create compounding loops: retention, expansion, and customer referrals.",
        fullContent:
          "Growth loops beat linear funnels every time. Design loops where satisfied users naturally drive new user acquisition—whether through collaborative features, viral sharing, or account expansion. Monitor customer retention cohorts closely.",
        agentRole: "Growth Agent",
        suggestedPrompt: "Design a referral and account expansion incentive program for existing power users.",
        checklist: [
          "Map core customer retention and expansion loop",
          "Implement referral incentives and team invite prompts",
          "Track 30-day, 60-day, and 90-day retention cohort tables",
        ],
      },
      {
        id: "product-analytics",
        number: "03",
        title: "Add Product Analytics & Event Tracking",
        shortDesc: "Track user behavior, feature adoption, and funnel drop-off points.",
        fullContent:
          "Implement telemetry to understand how users interact with your app. Instrument key funnel events: signup, workspace creation, feature activation, and subscription upgrades. Use data to eliminate UX friction points.",
        agentRole: "Analytics Agent",
        suggestedPrompt: "Set up product analytics event schema for tracking onboarding activation and feature usage.",
        checklist: [
          "Instrument core user events (Signup, Onboarded, Activated)",
          "Build dashboard tracking DAU/MAU ratio and feature adoption",
          "Set up automated alert triggers for sudden drops in user activity",
        ],
      },
      {
        id: "customer-support",
        number: "04",
        title: "Add AI Customer Support & Documentation",
        shortDesc: "Deploy automated tier-1 support agents and self-serve documentation.",
        fullContent:
          "Deliver instant, 24/7 support responses using AI support agents trained on your technical documentation, API specs, and knowledge base. Automatically escalate edge cases or billing inquiries to human team members with full context.",
        agentRole: "Support Executive",
        suggestedPrompt: "Generate a comprehensive FAQ and knowledge base structure from our product documentation.",
        checklist: [
          "Connect AI support agent to product knowledge base and docs",
          "Configure ticket escalation rules for complex inquiries",
          "Monitor First Contact Resolution (FCR) rate and CSAT scores",
        ],
      },
      {
        id: "unit-economics",
        number: "05",
        title: "Understand & Optimize Unit Economics",
        shortDesc: "Master LTV, CAC payback, gross margins, and net revenue retention.",
        fullContent:
          "Sustained growth requires healthy unit economics. Ensure your Customer Lifetime Value (LTV) is at least 3x your Customer Acquisition Cost (CAC), your CAC payback period is under 12 months, and your gross margins remain above 80%.",
        agentRole: "CFO Executive",
        suggestedPrompt: "Calculate our current LTV/CAC ratio, payback period, and net revenue retention (NRR).",
        checklist: [
          "Compute blended CAC across outbound and paid channels",
          "Calculate monthly customer churn and net dollar retention",
          "Optimize pricing tiers and add-on modules to boost ARPU",
        ],
      },
      {
        id: "expand-business",
        number: "06",
        title: "Expand the Business & What Comes Next",
        shortDesc: "Launch enterprise tiers, international markets, and new product lines.",
        fullContent:
          "Once your core engine is compounding, expand upmarket into enterprise contracts with custom SLA guarantees, SOC2 compliance, and SSO integration. Build autonomous category leadership with Automyte AI's executive suite.",
        agentRole: "CEO & Strategy Executive",
        suggestedPrompt: "Prepare an Enterprise Readiness Plan covering SOC2 compliance, SSO integration, and custom SLAs.",
        checklist: [
          "Launch Enterprise tier with annual billing & custom SLAs",
          "Initiate SOC2 Type II compliance audit and security controls",
          "Expand into adjacent product verticals and international markets",
        ],
      },
    ],
    nextSlug: "resources",
    nextTitle: "Explore Resources & Essays",
  },
};
