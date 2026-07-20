export interface ResourceArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: "Announcement" | "Case Study" | "Engineering" | "Essay";
  date: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  readTime: string;
  featured?: boolean;
  image: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
}

export const resourcesData: ResourceArticle[] = [
  {
    slug: "cofounder-partners-with-ramp-to-offer-incorporation",
    title: "Automyte and Ramp bring incorporation to founders",
    subtitle: "Founders can incorporate through Ramp inside Automyte today, with a broader partnership aimed at agentic finance over time.",
    category: "Announcement",
    date: "July 7, 2026",
    author: {
      name: "Automyte Team",
      role: "Official Product Announcement",
    },
    readTime: "4 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    summary: "Today, Automyte AI is partnering with Ramp to enable zero-friction legal incorporation, cap table setup, and corporate credit cards natively within your workspace canvas.",
    keyTakeaways: [
      "Instant incorporation via Ramp natively inside the Automyte AI canvas.",
      "Automated corporate banking, corporate card issuance, and 83(b) tax election tracking.",
      "Deep integration between Automyte Finance Executive and Ramp agentic financial workflows.",
    ],
    content: `
### Simplifying the Founder's First Step

Starting a company has historically required navigating fragmented legal forms, waiting weeks for state approval, and setting up separate corporate banking accounts. 

Starting today, founders can initiate Delaware C-Corp or LLC incorporation directly through Ramp from inside the Automyte AI platform. 

### Why Ramp + Automyte AI?

At Automyte, our vision is to provide an **agent-native operating system** where AI executives collaborate to execute engineering, design, marketing, and finance tasks. Ramp shares our vision for autonomous financial operations.

Through this strategic partnership:
- **Instant Entity Creation**: Your Legal Executive drafts initial charters and submits incorporation documents to Delaware through Ramp in minutes.
- **Automated Banking & Credit**: Once approved, your Ramp business bank account and corporate cards are provisioned instantly.
- **Cap Table & Vesting Sync**: Founder equity splits and 4-year vesting schedules sync seamlessly into your Finance Executive's runway dashboard.

> "Incorporation shouldn't be a multi-week administrative bottleneck. With Ramp and Automyte, founders go from idea to incorporated entity with active financial infrastructure in under 48 hours." — Kishore V, Automyte Founder

### What's Next for Agentic Finance

This incorporation release is the first milestone in a multi-phase partnership. Over the coming months, Automyte AI and Ramp will release automated expense auditing, agent-initiated invoice payments with human-in-the-loop approval, and real-time cash flow optimization models.
    `,
  },
  {
    slug: "yohei-nakajima-activegraph-cofounder",
    title: "Yohei Nakajima is building ActiveGraph with Automyte AI",
    subtitle: "How the creator of BabyAGI used Automyte to launch an open source agent runtime with a site, blog, newsletter, and audience.",
    category: "Case Study",
    date: "May 27, 2026",
    author: {
      name: "Yohei Nakajima",
      role: "Creator of BabyAGI & General Partner at Untapped Capital",
    },
    readTime: "6 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    summary: "Discover how Yohei Nakajima leveraged Automyte AI's multi-agent executive team to launch ActiveGraph—an open source agent runtime—without hiring an external engineering or marketing agency.",
    keyTakeaways: [
      "Built and launched ActiveGraph's marketing site, blog engine, and newsletter setup in under 7 days.",
      "Automyte Engineering Agent scaffolded the open-source repository documentation and API benchmarks.",
      "Automyte Marketing Agent wrote content announcements and automated audience subscriber onboarding.",
    ],
    content: `
### Background: The Need for Speed in Open Source

Yohei Nakajima, creator of the pioneering BabyAGI project, needed a fast way to launch **ActiveGraph**—an open-source framework designed for dynamic AI graph execution.

As a solo builder and venture investor, Yohei didn't have months to spend designing landing pages, configuring blog CMS tools, or drafting weekly subscriber newsletters.

### The Automyte Workflow

Using Automyte AI, Yohei deployed a full squad of virtual executives:
1. **Design Executive (Luna)**: Drafted ActiveGraph's dark-mode brand kit, SVG architecture diagrams, and landing page wireframes.
2. **Engineering Executive (Jordan)**: Scaffolded the Next.js marketing repository, wired GitHub releases, and published documentation pages.
3. **Marketing Executive (Maya)**: Wrote launch announcements, established the email newsletter channel, and automated social distribution.

> "Automyte allowed me to operate with the output of a 6-person startup team. I was able to focus entirely on core algorithm design while Automyte handled our site, docs, and subscriber launch." — Yohei Nakajima

### Impact & Results

ActiveGraph reached **over 4,500 GitHub stars** and accumulated **10,000+ newsletter subscribers** within its first three weeks of release—all managed seamlessly through the Automyte workspace canvas.
    `,
  },
  {
    slug: "daria-ansh-veery-safer-cosmetic-dentistry",
    title: "Daria Ansh, Founder of Veery, is building safer cosmetic dentistry with Automyte AI",
    subtitle: "How a solo founder is using Automyte to vet global dentist and ceramist teams, grow search visibility, and scale Veery without a team.",
    category: "Case Study",
    date: "May 21, 2026",
    author: {
      name: "Daria Ansh",
      role: "Founder & CEO, Veery",
    },
    readTime: "5 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    summary: "Veery is revolutionizing cosmetic dentistry by connecting patients with top-tier verified dental ceramists. Learn how founder Daria Ansh uses Automyte to run global vetting, SEO content pipelines, and customer support.",
    keyTakeaways: [
      "Automyte Operations Agent automated vetting workflows for over 200 global dental lab partners.",
      "Automyte Marketing Agent built an SEO pipeline generating 45k+ organic monthly visits.",
      "Automyte Support Agent handles 85% of patient pre-consultation inquiries 24/7.",
    ],
    content: `
### The Challenge: High Trust in Medical Healthcare

Cosmetic dentistry requires exceptionally high trust and rigorous quality control. Veery was founded to ensure patients receive safe, natural-looking veneers and ceramic restorations crafted by verified master technicians.

As a solo founder in healthcare operations, Daria faced immense operational overhead: verifying lab credentials, managing patient inquiries, and producing authoritative educational content.

### How Automyte AI Powers Veery

Daria deployed Automyte AI as her virtual core operating team:
- **Vetting Automation**: The Operations Agent collects dental licenses, lab certifications, and portfolio imagery, scoring partners against quality benchmarks.
- **SEO & Organic Growth**: The Marketing Agent drafts clinically verified articles explaining veneer procedures, longevity metrics, and oral health care.
- **Patient Triage**: The Support Agent answers patient questions about procedure costs, recovery timelines, and clinic locations.

> "With Automyte, Veery runs like an established healthcare company. My AI agents handle patient inquiries with empathy and accuracy, freeing me to expand our clinical partner network." — Daria Ansh

### Scale & Metrics

Veery expanded to **14 major metropolitan markets**, onboarded **120+ verified dental partners**, and handles **over 1,200 monthly patient consultations** with zero full-time operational employees.
    `,
  },
  {
    slug: "introducing-cofounder-2",
    title: "Announcing Automyte 2: Run an entire company with AI",
    subtitle: "The infrastructure for the one-person billion-dollar company.",
    category: "Announcement",
    date: "May 3, 2026",
    author: {
      name: "Kishore V",
      role: "Founder & CEO, Automyte AI",
    },
    readTime: "7 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    summary: "We are thrilled to unveil Automyte 2—the world's first agent orchestration platform designed from the ground up to let solo founders and lean teams run full-scale enterprises.",
    keyTakeaways: [
      "Full 360-degree Interactive Canvas Workspace (/canvas) with radial department nodes.",
      "Autonomous cross-agent collaboration: CTO, CMO, CFO, Design, and Legal agents communicate live.",
      "Built-in human-in-the-loop approval gates for financial transactions, code deployments, and customer outreach.",
    ],
    content: `
### The Vision Behind Automyte 2

Over the past decade, cloud computing made infrastructure cheap, open-source made building software fast, and API services enabled lean startups. But running a company still required hiring separate specialists for every single business discipline.

**Automyte 2 changes the equation.**

We built Automyte 2 on a single premise: **A solo founder equipped with a coordinated squad of specialized AI executives can out-execute traditional 50-person organizations.**

### Key Innovations in Automyte 2

1. **Radial Executive Orbit (/canvas)**:
   Instead of static chat boxes, Automyte 2 introduces a full-bleed 100vw x 100vh spatial workspace canvas. Your central Cofounder node orchestrates 8 orbiting department heads (*Engineering, Sales, Marketing, Design, Finance, Operations, Legal, Support*).

2. **Cross-Agent Task Delegation**:
   When you ask to "Launch our new product tier," your CEO agent delegates UI mockups to Design, DB migrations to Engineering, email campaigns to Sales, and pricing models to Finance simultaneously.

3. **Human-in-the-Loop Safeguards**:
   Automyte 2 gives founders full control. Critical actions—such as committing production code, sending cold emails, or deploying capital—require a single click approval on your Tasks dashboard.

> "Automyte 2 isn't just another AI wrapper. It is the operating system for the next generation of supercharged, agent-native companies."
    `,
  },
  {
    slug: "an-update-on-cofounder-1",
    title: "An Update on Automyte 1",
    subtitle: "The original Automyte product sunsets as Automyte 2 prepares to launch.",
    category: "Announcement",
    date: "April 29, 2026",
    author: {
      name: "Automyte Team",
      role: "Engineering & Operations",
    },
    readTime: "3 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    summary: "A transparent look back at what we learned from Automyte 1, why we migrated from linear chat to a spatial agent canvas, and how existing accounts transition to Automyte 2.",
    keyTakeaways: [
      "Automyte 1 single-chat interfaces struggled with multi-agent context retention.",
      "Automyte 2 spatial canvas architecture provides 10x better execution visibility and agent state clarity.",
      "Free 1-click migration for all existing Automyte 1 workspace data and custom prompt memories.",
    ],
    content: `
### Reflecting on Automyte 1

When we launched Automyte 1 in late 2025, our goal was simple: provide founders with an intelligent AI chatbot that could answer startup questions.

While founders loved having an instant sounding board, we quickly realized that a single conversational chat thread couldn't scale. Complex startup execution requires parallel processing: while your CTO agent is debugging code, your CMO agent should be writing copy, and your CFO agent should be auditing cash runway.

### Moving to Spatial Agent Orchestration

That insight led directly to **Automyte 2**. By moving from linear chat logs to a spatial node canvas, founders can view real-time state indicators across all 8 department executives simultaneously.

### Seamless Migration Details

All existing Automyte 1 workspaces have been automatically upgraded to Automyte 2. Your project memories, startup profiles, and custom executive prompts remain intact.
    `,
  },
  {
    slug: "agent-native-engineering",
    title: "Agent-Native Engineering: Reimagining the Tech Stack",
    subtitle: "How engineering teams change when agents become the default individual contributors.",
    category: "Engineering",
    date: "February 5, 2026",
    author: {
      name: "Jordan Rivera",
      role: "CTO, Automyte AI",
    },
    readTime: "8 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    summary: "An in-depth technical exploration into agent-native software architecture, self-healing code pipelines, automated PR reviews, and why human engineers are shifting to Systems Architects.",
    keyTakeaways: [
      "Agent-native engineering treats code generation as continuous compilation rather than manual entry.",
      "Self-healing CI workflows automatically capture stack traces and submit fix pull requests.",
      "Human developers transition from writing boilerplate syntax to evaluating architecture and security constraints.",
    ],
    content: `
### The Evolution of Software Engineering

For fifty years, software engineering meant humans manually typing syntax line by line into text editors. Early AI tools offered autocomplete suggestions, but the human remained the primary execution engine.

**Agent-native engineering flips this paradigm.**

In an agent-native repository, AI agents act as the primary individual contributors. They receive specifications, read existing codebase patterns, inspect dependency definitions, write tests, and submit pull requests autonomously.

### Core Principles of Agent-Native Tech Stacks

1. **Self-Describing Schemas**:
   Databases and APIs must expose strict TypeScript types, OpenAPI specs, and Supabase RLS definitions so agents can inspect contracts with zero ambiguity.

2. **Automated Verification Loops**:
   Agents rely on instant feedback. CI pipelines must execute linting, type checks (tsc --noEmit), and unit tests (vitest) in seconds to validate agent edits.

3. **Deterministic Rollbacks**:
   When an agent pull request causes runtime regressions, production telemetry triggers automatic rollback to the previous clean commit.

> "In an agent-native world, the best software architects are not those who type fastest, but those who design clearest specifications and evaluation harnesses."
    `,
  },
  {
    slug: "cofounder-1-5-seed-round",
    title: "Announcing Automyte 1.5 and our $8.7 Million Seed Round",
    subtitle: "Automyte raises seed funding to build the infrastructure for agent-run companies.",
    category: "Announcement",
    date: "December 8, 2025",
    author: {
      name: "Kishore V",
      role: "Founder & CEO, Automyte AI",
    },
    readTime: "4 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
    summary: "We are excited to announce an $8.7 million seed financing round led by top-tier venture partners to accelerate our mission of empowering solo founders with autonomous AI executive teams.",
    keyTakeaways: [
      "$8.7M Seed Round led by leading AI and SaaS venture capital firms.",
      "Funding dedicated to expanding multi-agent orchestration infrastructure and real-time execution speeds.",
      "Over 6,900 active startups already running on Automyte platform nodes.",
    ],
    content: `
### Expanding the Agentic Operating System

We started Automyte because we believed that building a company should be accessible to anyone with an extraordinary idea and unyielding drive.

Today, we are thrilled to share that we have raised **$8.7 million in seed funding** to accelerate our vision of agent-native company building.

### How We Will Invest the Capital

This funding will support three core engineering priorities:
1. **Multi-Agent Memory Infrastructure**: Enhancing long-term vector and relational memory so your executive agents retain context across months of company growth.
2. **Speed & Latency Optimization**: Reducing agent response and task execution latency to under 2 seconds.
3. **Enterprise Integration Suite**: Deepening integrations with GitHub, Supabase, Vercel, Stripe, Ramp, and HubSpot.

We want to thank our early community of founders, developers, and creators who inspire us every single day!
    `,
  },
  {
    slug: "a-day-in-the-life-of-the-worlds-most-ai-forward-company",
    title: "A Day in the Life of the World's Most AI-Forward Company",
    subtitle: "A practical look at how Automyte uses agents across engineering, support, operations, and hiring.",
    category: "Essay",
    date: "September 18, 2025",
    author: {
      name: "Automyte Team",
      role: "Internal Operations Note",
    },
    readTime: "6 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    summary: "Ever wondered what it looks like to run a tech company where AI agents outnumber human employees 10-to-1? Here is an inside look at how Automyte AI operates daily.",
    keyTakeaways: [
      "9:00 AM: Executive AI Standup synthesizes overnight GitHub commits, support tickets, and sales leads.",
      "12:00 PM: Automated product PRD generation and instant UI mockup reviews.",
      "5:00 PM: Finance agent audits cash runway, vendor invoices, and unit economics metrics.",
    ],
    content: `
### What Does an Agent-Forward Company Look Like?

At Automyte, we eat our own dog food. Our internal team consists of 5 human leaders working alongside **over 40 specialized AI agents** that run our day-to-day operations.

Here is a behind-the-scenes timeline of a typical Tuesday at Automyte:

#### 9:00 AM — Automated Executive Briefing
Instead of a 45-minute morning Zoom call, our CEO Agent compiles an overnight briefing summary:
- Engineering Agent reports 14 pull requests merged with 100% test pass rates.
- Support Agent reports 142 customer tickets resolved with 94% positive CSAT ratings.
- Sales Agent reports 8 demo meetings scheduled for the afternoon.

#### 1:00 PM — Autonomous Feature Scaffolding
When a customer requests a new filter feature on our dashboard, our Product Agent drafts a 2-page PRD, our Design Agent generates a Tailwind layout, and our Engineering Agent opens a pull request on GitHub—all within 20 minutes.

#### 5:00 PM — Real-Time Financial Audit
Before closing the day, our Finance Agent audits Stripe revenue data, forecasts 18-month runway models, and alerts us to vendor subscription overlaps.

### Conclusion

Running an AI-forward company isn't about replacing human creativity; it's about amplifying human vision. By handing operational drudgery to autonomous agents, founders regain time to think deeply, build relationships, and innovate.
    `,
  },
];
