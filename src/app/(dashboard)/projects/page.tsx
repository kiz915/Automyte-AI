"use client";

import { useEffect, useState } from "react";
import type { Task, TaskStatus, TaskPriority } from "@/types/database";
import { Plus, CheckSquare, Clock, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";

const COLUMNS: { id: TaskStatus; label: string; bg: string }[] = [
  { id: "todo", label: "To Do", bg: "bg-surface" },
  { id: "ongoing", label: "In Progress", bg: "bg-[rgba(242,183,5,0.03)] border-[rgba(242,183,5,0.08)]" },
  { id: "needs_action", label: "Needs Review", bg: "bg-[rgba(59,130,246,0.03)] border-[rgba(59,130,246,0.08)]" },
  { id: "done", label: "Completed", bg: "bg-[rgba(34,197,94,0.03)] border-[rgba(34,197,94,0.08)]" },
];

export default function ProjectsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPriority, setNewPriority] = useState<TaskPriority>("medium");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          setTasks(json.data);
        }
      })
      .catch((err) => console.error("Failed to load tasks:", err))
      .finally(() => setLoading(false));
  }, []);

  const moveTask = async (id: string, newStatus: TaskStatus) => {
    // Optimistic UI update
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));

    try {
      const res = await fetch(`/api/tasks?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
    } catch (err) {
      console.error(err);
      // Revert in case of failure could be added
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          priority: newPriority,
          module: "general",
        }),
      });
      const json = await res.json();
      if (json.data) {
        setTasks((prev) => [...prev, json.data]);
        setNewTitle("");
        setNewDesc("");
        setNewPriority("medium");
        setIsAdding(false);
      }
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const getPriorityColor = (p: TaskPriority) => {
    switch (p) {
      case "critical": return "text-[#EF4444] bg-[#EF4444]/10";
      case "high": return "text-[#F59E0B] bg-[#F59E0B]/10";
      case "medium": return "text-[#3B82F6] bg-[#3B82F6]/10";
      default: return "text-ink-faint bg-ink/5";
    }
  };

  const getAssigneeInitials = (id: string | null) => {
    if (!id) return "A";
    const cleanId = id.replace("exec_", "");
    return cleanId.slice(0, 2).toUpperCase();
  };

  if (loading) {
    return <div className="p-8 text-center text-ink-faint">Loading tasks...</div>;
  }

  return (
    <div className="h-[calc(100vh-52px)] flex flex-col bg-surface p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[18px] font-semibold text-ink">Projects & Tasks</h1>
          <p className="text-[12px] text-ink-muted">Track engineering sprints, marketing briefs, and operational milestones</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 h-[34px] px-4 rounded-full bg-ink text-ink-inverted text-[13px] font-semibold hover:bg-[#333] transition-colors cursor-pointer border-0 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Task
        </button>
      </div>

      {/* Adding task form overlay */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs p-4">
          <form onSubmit={handleCreateTask} className="w-full max-w-md bg-white border border-border rounded-2xl p-6 shadow-lg space-y-4">
            <h2 className="text-[16px] font-semibold text-ink">Add New Task</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-medium text-ink-secondary mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Scaffold next components..."
                  required
                  className="w-full h-[38px] px-3 rounded-lg border border-border text-[13.5px]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-ink-secondary mb-1">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Task details..."
                  className="w-full h-[80px] p-3 rounded-lg border border-border text-[13.5px] resize-none"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-ink-secondary mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                  className="w-full h-[38px] px-3 rounded-lg border border-border text-[13.5px] bg-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="h-[34px] px-4 rounded-lg border border-border text-[13px] font-medium text-ink-secondary bg-transparent cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-[34px] px-4 rounded-lg bg-ink text-ink-inverted text-[13px] font-medium hover:bg-[#333] cursor-pointer border-0"
              >
                Save Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Board Columns Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => (t.status || "todo") === col.id);
          return (
            <div key={col.id} className={`flex flex-col h-full rounded-2xl border border-border-subtle p-3 ${col.bg}`}>
              <div className="flex items-center justify-between mb-3 px-1.5">
                <span className="text-[13px] font-semibold text-ink flex items-center gap-1.5">
                  {col.label}
                  <span className="text-[11px] font-bold text-ink-faint bg-ink/5 px-2 py-0.5 rounded-full">
                    {colTasks.length}
                  </span>
                </span>
              </div>

              {/* Tasks List inside Column */}
              <div className="flex-1 overflow-y-auto space-y-2.5 min-h-[150px]">
                {colTasks.length === 0 ? (
                  <div className="h-full border border-dashed border-border/40 rounded-xl flex items-center justify-center p-4 text-[12px] text-ink-ghost">
                    No tasks here
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setActiveTask(task)}
                      className="bg-white border border-border-subtle rounded-xl p-3.5 hover:border-ink/20 shadow-xs hover:shadow-sm transition-all cursor-pointer space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-ink/5 flex items-center justify-center text-[9px] font-bold text-ink-secondary">
                          {getAssigneeInitials(task.assigned_executive_id)}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[13px] font-semibold text-ink line-clamp-2 leading-snug">{task.title}</h3>
                        <p className="text-[11.5px] text-ink-faint line-clamp-2 mt-1 leading-normal">{task.description}</p>
                      </div>
                      
                      {/* Interactive Drag Buttons */}
                      <div className="flex items-center gap-1 border-t border-border-subtle pt-2 mt-1.5">
                        {COLUMNS.filter((c) => c.id !== col.id).map((c) => (
                          <button
                            key={c.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              moveTask(task.id, c.id);
                            }}
                            className="text-[10px] font-medium text-ink-faint hover:text-ink hover:bg-ink/5 px-1.5 py-0.5 rounded transition-all cursor-pointer border-0 bg-transparent"
                            title={`Move to ${c.label}`}
                          >
                            → {c.label.slice(0, 4)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
