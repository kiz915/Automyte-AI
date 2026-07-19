-- ============================================================
-- Automyte AI — Production Supabase Schema DDL
-- Run this in your Supabase SQL Editor to initialize tables
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ---- WORKSPACES ----
create table if not exists public.workspaces (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
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

-- ---- TASKS ----
create table if not exists public.tasks (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    title text not null,
    description text default '',
    requested_by text not null default 'user_founder',
    assigned_executive_id text, -- e.g., 'exec_engineering'
    module text not null default 'general',
    status text not null default 'todo', -- 'needs_action' | 'ongoing' | 'todo' | 'done' | 'cancelled'
    priority text not null default 'medium', -- 'critical' | 'high' | 'medium' | 'low'
    requires_approval boolean default false,
    artifacts jsonb default '[]'::jsonb,
    messages jsonb default '[]'::jsonb,
    subtasks jsonb default '[]'::jsonb,
    dependencies jsonb default '[]'::jsonb,
    project_id uuid,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
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
    uploaded_by uuid,
    version integer default 1,
    folder text not null default 'General',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ---- APPROVAL REQUESTS ----
create table if not exists public.approvals (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade not null,
    task_id uuid references public.tasks(id) on delete set null,
    automation_id text,
    requested_action text not null,
    payload jsonb default '{}'::jsonb,
    status text not null default 'pending', -- 'pending' | 'approved' | 'rejected'
    decided_by text,
    decided_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
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

-- Enable Row Level Security (RLS) on tables
alter table public.workspaces enable row level security;
alter table public.startup_profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.documents enable row level security;
alter table public.approvals enable row level security;
alter table public.integrations enable row level security;

-- Basic policy: authenticated users can access workspace data
create policy "Users can access their workspaces" on public.workspaces
    for all using (true);

create policy "Users can access startup profiles" on public.startup_profiles
    for all using (true);

create policy "Users can access tasks" on public.tasks
    for all using (true);

create policy "Users can access documents" on public.documents
    for all using (true);

create policy "Users can access approvals" on public.approvals
    for all using (true);

create policy "Users can access integrations" on public.integrations
    for all using (true);
