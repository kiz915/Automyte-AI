-- ============================================================
-- Automyte AI — Production Supabase Schema DDL (Full Parity v2)
-- Run this in your Supabase SQL Editor to initialize or update tables
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ---- USERS & PROFILES ----
create table if not exists public.users (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    full_name text,
    avatar_url text,
    provider text default 'email',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Supabase Auth Auto-Sync Trigger: Sync auth.users -> public.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url, provider)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_app_meta_data->>'provider', 'email')
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.users.full_name),
    avatar_url = coalesce(excluded.avatar_url, public.users.avatar_url),
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---- WORKSPACES & MEMBERS ----
create table if not exists public.workspaces (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text not null unique,
    industry text default 'Developer Tools / AI',
    stage text default 'Idea',
    team_size text default 'Solo Founder',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.workspace_members (
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    user_id uuid references public.users(id) on delete cascade not null,
    role text not null default 'member', -- 'owner' | 'admin' | 'member' | 'viewer'
    joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (workspace_id, user_id)
);

-- ---- COMPANIES & AI ONBOARDING ----
create table if not exists public.companies (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade,
    user_id uuid references public.users(id) on delete cascade,
    name text not null,
    idea text not null,
    industry text not null default 'Developer Tools / AI',
    stage text not null default 'Idea',
    team_size text not null default 'Solo Founder',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.company_interviews (
    id uuid primary key default gen_random_uuid(),
    company_id uuid references public.companies(id) on delete cascade,
    target_customer text,
    problem text,
    solution text,
    revenue_model text,
    competitors text,
    milestones text,
    follow_up_answers jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.ai_analysis_results (
    id uuid primary key default gen_random_uuid(),
    company_id uuid references public.companies(id) on delete cascade,
    is_idea_clear boolean default true,
    market_saturation text default 'medium',
    competitors jsonb default '[]'::jsonb,
    differentiation text,
    swot jsonb default '{"strengths": [], "weaknesses": [], "opportunities": [], "threats": []}'::jsonb,
    confidence_score integer default 94,
    recommendation text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.company_memories (
    id uuid primary key default gen_random_uuid(),
    company_id uuid references public.companies(id) on delete cascade,
    workspace_id uuid references public.workspaces(id) on delete cascade,
    type text not null default 'context', -- 'fact' | 'decision' | 'context' | 'document' | 'transcript'
    title text not null,
    summary text not null,
    source_ref text,
    tags jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- STARTUP PROFILE & BRAND KIT ----
create table if not exists public.startup_profiles (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    vision_mission text,
    core_values text,
    problem text,
    solution text,
    target_audience text,
    persona text,
    business_model text,
    value_prop text,
    swot jsonb default '{"strengths": [], "weaknesses": [], "opportunities": [], "threats": []}'::jsonb,
    competitors jsonb default '[]'::jsonb,
    market_size text,
    pricing text,
    gtm text,
    launch_plan text,
    growth_strategy text,
    risk_analysis text,
    okrs jsonb default '[]'::jsonb,
    kpis jsonb default '[]'::jsonb,
    brand_kit jsonb default '{"primary_color": "#1A1A1A", "secondary_color": "rgba(32, 32, 32, 0.7)", "accent_color": "#F2B705", "font_heading": "Figtree", "font_body": "Figtree", "tone": "", "logo_url": null, "guidelines": ""}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- AI EXECUTIVES & AGENTS ----
create table if not exists public.executives (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    name text not null,
    role text not null, -- 'CEO' | 'CTO' | 'CMO' | 'CFO' | 'COO' | 'Design' | 'Engineering' | 'Sales' | 'Marketing' | 'Research' | 'Legal' | 'Product' | 'Custom'
    system_prompt text default '',
    skills jsonb default '[]'::jsonb,
    context_text text default '',
    integrations jsonb default '[]'::jsonb,
    schedule text,
    state text not null default 'idle', -- 'active' | 'idle' | 'busy' | 'error'
    avatar_url text,
    model text default 'gemini-2.5-flash',
    is_default boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- PROJECTS & BOARDS ----
create table if not exists public.projects (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    name text not null,
    description text default '',
    view_type text default 'kanban', -- 'kanban' | 'calendar' | 'timeline' | 'list'
    columns jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- TASKS & SUBTASKS ----
create table if not exists public.tasks (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    title text not null,
    description text default '',
    requested_by text not null default 'user_founder',
    assigned_executive_id text, -- e.g., 'exec_engineering' or UUID reference
    module text not null default 'general',
    status text not null default 'todo', -- 'needs_action' | 'ongoing' | 'todo' | 'done' | 'cancelled'
    priority text not null default 'medium', -- 'critical' | 'high' | 'medium' | 'low'
    requires_approval boolean default false,
    artifacts jsonb default '[]'::jsonb,
    messages jsonb default '[]'::jsonb,
    subtasks jsonb default '[]'::jsonb,
    dependencies jsonb default '[]'::jsonb,
    project_id uuid references public.projects(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- MESSAGES & CONVERSATIONS ----
create table if not exists public.messages (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    task_id uuid references public.tasks(id) on delete cascade,
    executive_id uuid references public.executives(id) on delete set null,
    role text not null default 'user', -- 'user' | 'assistant' | 'system' | 'tool'
    content text default '',
    attachments jsonb default '[]'::jsonb,
    tool_calls jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- DOCUMENTS ----
create table if not exists public.documents (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    name text not null,
    type text not null default 'custom',
    content text default '',
    storage_ref text,
    pinned boolean default false,
    generated_by text,
    uploaded_by uuid references public.users(id) on delete set null,
    version integer default 1,
    folder text not null default 'General',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- AUTOMATIONS ----
create table if not exists public.automations (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    name text not null,
    description text default '',
    trigger jsonb default '{}'::jsonb,
    conditions jsonb default '[]'::jsonb,
    actions jsonb default '[]'::jsonb,
    schedule text,
    last_run timestamp with time zone,
    status text not null default 'active', -- 'active' | 'paused' | 'error' | 'draft'
    execution_count integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- APPROVAL REQUESTS ----
create table if not exists public.approvals (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    task_id uuid references public.tasks(id) on delete set null,
    automation_id uuid references public.automations(id) on delete set null,
    requested_action text not null,
    payload jsonb default '{}'::jsonb,
    status text not null default 'pending', -- 'pending' | 'approved' | 'rejected'
    decided_by text,
    decided_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- ROADMAP STEPS ----
create table if not exists public.roadmap_steps (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    stage text not null default 'idea', -- 'idea' | 'validation' | 'build' | 'gtm' | 'launch' | 'scale'
    title text not null,
    description text default '',
    why text default '',
    how text default '',
    is_executive_task boolean default false,
    executive_role text,
    prerequisites jsonb default '[]'::jsonb,
    unlocks jsonb default '[]'::jsonb,
    status text not null default 'locked', -- 'locked' | 'available' | 'in_progress' | 'completed' | 'skipped'
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- METRICS & KPIS ----
create table if not exists public.metrics (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    name text not null,
    value numeric default 0,
    previous_value numeric,
    historical_series jsonb default '[]'::jsonb,
    source text default 'system',
    unit text default '',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- INTEGRATIONS ----
create table if not exists public.integrations (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    name text not null,
    type text not null, -- 'managed' | 'native' | 'model_provider'
    provider text not null,
    status text not null default 'disconnected', -- 'connected' | 'disconnected' | 'error'
    config jsonb default '{}'::jsonb,
    allowed_executives jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- AUDIT LOGS ----
create table if not exists public.audit_logs (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    user_id uuid references public.users(id) on delete set null,
    executive_id uuid references public.executives(id) on delete set null,
    action text not null,
    details jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ============================================================
create index if not exists idx_workspace_members_user on public.workspace_members(user_id);
create index if not exists idx_companies_workspace on public.companies(workspace_id);
create index if not exists idx_company_memories_workspace on public.company_memories(workspace_id);
create index if not exists idx_startup_profiles_workspace on public.startup_profiles(workspace_id);
create index if not exists idx_executives_workspace on public.executives(workspace_id);
create index if not exists idx_projects_workspace on public.projects(workspace_id);
create index if not exists idx_tasks_workspace on public.tasks(workspace_id);
create index if not exists idx_tasks_project on public.tasks(project_id);
create index if not exists idx_messages_workspace on public.messages(workspace_id);
create index if not exists idx_messages_task on public.messages(task_id);
create index if not exists idx_documents_workspace on public.documents(workspace_id);
create index if not exists idx_automations_workspace on public.automations(workspace_id);
create index if not exists idx_approvals_workspace on public.approvals(workspace_id);
create index if not exists idx_approvals_task on public.approvals(task_id);
create index if not exists idx_roadmap_steps_workspace on public.roadmap_steps(workspace_id);
create index if not exists idx_metrics_workspace on public.metrics(workspace_id);
create index if not exists idx_integrations_workspace on public.integrations(workspace_id);
create index if not exists idx_audit_logs_workspace on public.audit_logs(workspace_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
alter table public.users enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.companies enable row level security;
alter table public.company_interviews enable row level security;
alter table public.ai_analysis_results enable row level security;
alter table public.company_memories enable row level security;
alter table public.startup_profiles enable row level security;
alter table public.executives enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.messages enable row level security;
alter table public.documents enable row level security;
alter table public.automations enable row level security;
alter table public.approvals enable row level security;
alter table public.roadmap_steps enable row level security;
alter table public.metrics enable row level security;
alter table public.integrations enable row level security;
alter table public.audit_logs enable row level security;

-- Row Level Security Policies (Idempotent Drop & Create)
drop policy if exists "Users can access their user profile" on public.users;
create policy "Users can access their user profile" on public.users for all using (true);

drop policy if exists "Users can access their workspaces" on public.workspaces;
create policy "Users can access their workspaces" on public.workspaces for all using (true);

drop policy if exists "Users can access workspace members" on public.workspace_members;
create policy "Users can access workspace members" on public.workspace_members for all using (true);

drop policy if exists "Users can access companies" on public.companies;
create policy "Users can access companies" on public.companies for all using (true);

drop policy if exists "Users can access interviews" on public.company_interviews;
create policy "Users can access interviews" on public.company_interviews for all using (true);

drop policy if exists "Users can access analysis results" on public.ai_analysis_results;
create policy "Users can access analysis results" on public.ai_analysis_results for all using (true);

drop policy if exists "Users can access company memories" on public.company_memories;
create policy "Users can access company memories" on public.company_memories for all using (true);

drop policy if exists "Users can access startup profiles" on public.startup_profiles;
create policy "Users can access startup profiles" on public.startup_profiles for all using (true);

drop policy if exists "Users can access executives" on public.executives;
create policy "Users can access executives" on public.executives for all using (true);

drop policy if exists "Users can access projects" on public.projects;
create policy "Users can access projects" on public.projects for all using (true);

drop policy if exists "Users can access tasks" on public.tasks;
create policy "Users can access tasks" on public.tasks for all using (true);

drop policy if exists "Users can access messages" on public.messages;
create policy "Users can access messages" on public.messages for all using (true);

drop policy if exists "Users can access documents" on public.documents;
create policy "Users can access documents" on public.documents for all using (true);

drop policy if exists "Users can access automations" on public.automations;
create policy "Users can access automations" on public.automations for all using (true);

drop policy if exists "Users can access approvals" on public.approvals;
create policy "Users can access approvals" on public.approvals for all using (true);

drop policy if exists "Users can access roadmap steps" on public.roadmap_steps;
create policy "Users can access roadmap steps" on public.roadmap_steps for all using (true);

drop policy if exists "Users can access metrics" on public.metrics;
create policy "Users can access metrics" on public.metrics for all using (true);

drop policy if exists "Users can access integrations" on public.integrations;
create policy "Users can access integrations" on public.integrations for all using (true);

drop policy if exists "Users can access audit logs" on public.audit_logs;
create policy "Users can access audit logs" on public.audit_logs for all using (true);
