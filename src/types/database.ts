/* ============================================================
   Automyte AI — Database Types
   ============================================================ */

// ---- Enums ----
export type TaskStatus = "needs_action" | "ongoing" | "todo" | "done" | "cancelled";
export type TaskPriority = "critical" | "high" | "medium" | "low";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type ExecutiveState = "active" | "idle" | "busy" | "error";
export type RoadmapStage = "idea" | "validation" | "build" | "gtm" | "launch" | "scale";
export type StepStatus = "locked" | "available" | "in_progress" | "completed" | "skipped";
export type IntegrationType = "managed" | "native" | "model_provider";
export type IntegrationStatus = "connected" | "disconnected" | "error";
export type AutomationStatus = "active" | "paused" | "error" | "draft";
export type MemoryType = "fact" | "decision" | "context" | "document" | "transcript";
export type ProjectView = "kanban" | "calendar" | "timeline" | "list";
export type MessageRole = "user" | "assistant" | "system" | "tool";

export type ExecutiveRole =
  | "CEO"
  | "CTO"
  | "CMO"
  | "CFO"
  | "COO"
  | "Design"
  | "Engineering"
  | "Sales"
  | "Marketing"
  | "Research"
  | "Legal"
  | "Product"
  | "Custom";

export type DocumentType =
  | "business_plan"
  | "pitch_deck"
  | "investor_memo"
  | "executive_summary"
  | "prd"
  | "marketing_plan"
  | "sales_plan"
  | "financial_projection"
  | "landing_copy"
  | "investor_email"
  | "cold_email"
  | "job_description"
  | "meeting_notes"
  | "weekly_report"
  | "brand_guidelines"
  | "custom";

// ---- Core Models ----

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceMember {
  workspace_id: string;
  user_id: string;
  role: "owner" | "admin" | "member" | "viewer";
  joined_at: string;
}

export interface Executive {
  id: string;
  workspace_id: string;
  name: string;
  role: ExecutiveRole;
  system_prompt: string;
  skills: Skill[];
  context_text: string;
  integrations: string[];
  schedule: string | null;
  state: ExecutiveState;
  avatar_url: string | null;
  model: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  md_content: string;
  attached_files: string[];
  is_custom: boolean;
}

export interface Task {
  id: string;
  workspace_id: string;
  title: string;
  description: string;
  requested_by: string;
  assigned_executive_id: string | null;
  assigned_executive?: Executive;
  module: string;
  status: TaskStatus;
  priority: TaskPriority;
  requires_approval: boolean;
  created_at: string;
  updated_at: string;
  artifacts: TaskArtifact[];
  messages: Message[];
  subtasks: Task[];
  dependencies: string[];
  project_id: string | null;
}

export interface TaskArtifact {
  id: string;
  task_id: string;
  type: string;
  content: string;
  storage_ref: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  task_id: string | null;
  workspace_id: string;
  executive_id: string | null;
  role: MessageRole;
  content: string;
  attachments: Attachment[];
  tool_calls: ToolCall[];
  created_at: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  result?: string;
  requires_approval: boolean;
}

export interface StartupProfile {
  id: string;
  workspace_id: string;
  vision_mission: string;
  core_values: string;
  problem: string;
  solution: string;
  target_audience: string;
  persona: string;
  business_model: string;
  value_prop: string;
  swot: SWOTData;
  competitors: CompetitorData[];
  market_size: string;
  pricing: string;
  gtm: string;
  launch_plan: string;
  growth_strategy: string;
  risk_analysis: string;
  okrs: OKR[];
  kpis: KPI[];
  brand_kit: BrandKit | null;
  created_at: string;
  updated_at: string;
}

export interface SWOTData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface CompetitorData {
  name: string;
  description: string;
  strengths: string;
  weaknesses: string;
  url: string;
}

export interface OKR {
  objective: string;
  key_results: string[];
  progress: number;
}

export interface KPI {
  name: string;
  target: number;
  current: number;
  unit: string;
}

export interface BrandKit {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_heading: string;
  font_body: string;
  tone: string;
  logo_url: string | null;
  guidelines: string;
}

export interface Document {
  id: string;
  workspace_id: string;
  name: string;
  type: DocumentType;
  content: string;
  storage_ref: string | null;
  pinned: boolean;
  generated_by: string | null;
  uploaded_by: string | null;
  version: number;
  folder: string;
  created_at: string;
  updated_at: string;
}

export interface RoadmapStep {
  id: string;
  workspace_id: string;
  stage: RoadmapStage;
  title: string;
  description: string;
  why: string;
  how: string;
  is_executive_task: boolean;
  executive_role: ExecutiveRole | null;
  prerequisites: string[];
  unlocks: string[];
  status: StepStatus;
  sort_order: number;
}

export interface ApprovalRequest {
  id: string;
  workspace_id: string;
  task_id: string | null;
  automation_id: string | null;
  requested_action: string;
  payload: Record<string, unknown>;
  status: ApprovalStatus;
  decided_by: string | null;
  decided_at: string | null;
  created_at: string;
}

export interface Automation {
  id: string;
  workspace_id: string;
  name: string;
  description: string;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  schedule: string | null;
  last_run: string | null;
  status: AutomationStatus;
  execution_count: number;
  created_at: string;
  updated_at: string;
}

export interface AutomationTrigger {
  type: "schedule" | "event" | "webhook" | "manual";
  config: Record<string, unknown>;
}

export interface AutomationCondition {
  field: string;
  operator: "equals" | "contains" | "gt" | "lt" | "exists";
  value: string;
}

export interface AutomationAction {
  type: "executive_task" | "notification" | "document_generate" | "api_call" | "approval";
  config: Record<string, unknown>;
  requires_approval: boolean;
}

export interface Project {
  id: string;
  workspace_id: string;
  name: string;
  description: string;
  view_type: ProjectView;
  columns: ProjectColumn[];
  created_at: string;
  updated_at: string;
}

export interface ProjectColumn {
  id: string;
  name: string;
  color: string;
  sort_order: number;
}

export interface MemoryItem {
  id: string;
  workspace_id: string;
  title: string;
  summary: string;
  type: MemoryType;
  source_ref: string | null;
  tags: string[];
  created_at: string;
}

export interface Metric {
  id: string;
  workspace_id: string;
  name: string;
  value: number;
  previous_value: number | null;
  historical_series: DataPoint[];
  source: string;
  unit: string;
  created_at: string;
  updated_at: string;
}

export interface DataPoint {
  date: string;
  value: number;
}

export interface Integration {
  id: string;
  workspace_id: string;
  name: string;
  type: IntegrationType;
  provider: string;
  status: IntegrationStatus;
  config: Record<string, unknown>;
  allowed_executives: string[];
  created_at: string;
}

export interface AuditLogEntry {
  id: string;
  workspace_id: string;
  user_id: string | null;
  executive_id: string | null;
  action: string;
  details: Record<string, unknown>;
  created_at: string;
}

// ---- AI Settings ----
export interface AISettings {
  auto_approve_low_risk: boolean;
  prompt_personalization: string;
  model_per_executive: Record<string, string>;
  default_model: string;
  fallback_providers: string[];
}

// ---- Home Dashboard ----
export interface HomeState {
  health_score: number;
  current_goal: string;
  tasks_today: Task[];
  ai_suggestions: AISuggestion[];
  recent_conversations: RecentConversation[];
  milestones: Milestone[];
  revenue_goal: RevenueGoal;
  stage_progress: StageProgress[];
}

export interface AISuggestion {
  id: string;
  title: string;
  description: string;
  executive_role: ExecutiveRole;
  action_type: "task" | "document" | "conversation";
  priority: number;
}

export interface RecentConversation {
  id: string;
  executive_name: string;
  executive_role: ExecutiveRole;
  last_message: string;
  timestamp: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  stage: RoadmapStage;
}

export interface RevenueGoal {
  target: number;
  current: number;
  period: string;
}

export interface StageProgress {
  stage: RoadmapStage;
  total_steps: number;
  completed_steps: number;
}
