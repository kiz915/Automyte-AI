# 🌻 Automyte AI — Cofounder Orchestration Platform

> Automyte AI is an agent orchestration platform designed to help you run an entire business.

![Automyte AI](https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)

---

## ✨ Features

- **🌻 Interactive Canvas Workspace (`/canvas`)**: 
  - Central `Cofounder` core node with 8 orbiting department nodes (*Engineering, Sales, Marketing, Design, Finance, Operations, Legal, Support*).
  - Real-time status indicators, branch lines to active artifact cards, and click-to-focus department detail sidebar.
  - Floating notification bell `[🔔]`, plus button `[+]`, and model release toast notifications.

- **📜 Onboarding Workflow (`/onboarding`)**:
  - Stage 1 idea stage slider (*Pre-idea, Idea, Pre-MVP, MVP, Customers, Revenue, Public*) with ASCII art header.
  - Interactive onboarding Q&A chat streaming AI responses and generating a **Business Plan Accepted** card.
  - Dynamic orbital graph spawning executive department agents live as you chat.
  - Visual identity brand kit roadmap & vibe selector.

- **📁 "How to Build a Company" Tech Tree Modal**:
  - 5-stage company build roadmap (*Identity Stage, Build Stage, GTM Stage, Launch Stage, Scale Stage*).
  - Status badges (*Available, Agent can do this, Needs your input, Needs approval, Locked*).

- **💬 Multi-Tab Executive Control Center**:
  - `Home`: Greeting, Automyte Roadmap progress card (`9% >`), and "Suggested Next" checklist.
  - `Cofounder`: Direct executive chat assistant.
  - `Company`: Startup profile briefing, SWOT, and business model.
  - `Tasks`: Approval workflow gates and task execution logs.
  - `Library`: Document asset library with inline editor.

---

## 🛠️ Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the platform.

### Available Routes

- `/` — Landing page with radial node orchestration preview
- `/onboarding` — 4-stage interactive startup onboarding
- `/canvas` — Full-bleed 100vw x 100vh interactive workspace canvas
- `/home` — Dashboard control center
- `/pricing` — Upgrade & plan selection
- `/how-to/start` — Guide documentation

---

## 🔒 Environment Variables

Copy `.env.local.example` to `.env.local` and add your Supabase & NVIDIA API credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NVIDIA_API_KEY=your-nvidia-api-key
```

---

## 🚢 Deployment

Deployed automatically on [Vercel](https://automyte-ai.vercel.app).
