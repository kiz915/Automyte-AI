"use client";

import { useEffect, useState } from "react";
import type { StartupProfile } from "@/types/database";
import { Check, Settings, Shield, Globe, Palette, Info } from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState<StartupProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "brand" | "models" | "integrations">("profile");

  // Local Form States
  const [vision, setVision] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [target, setTarget] = useState("");
  
  // Brand form states
  const [primaryColor, setPrimaryColor] = useState("#1A1A1A");
  const [accentColor, setAccentColor] = useState("#F2B705");

  // Integrations state
  const [integrations, setIntegrations] = useState([
    { id: "github", name: "GitHub Integration", desc: "Commit code, create branches, and deploy PRs", connected: true },
    { id: "supabase", name: "Supabase DB Connector", desc: "Automate migration runs and scaffold schemas", connected: false },
    { id: "stripe", name: "Stripe Billing Hub", desc: "Automate billing configuration and subscription models", connected: false },
    { id: "slack", name: "Slack Notifications", desc: "Push agent updates directly to dev channels", connected: true },
  ]);

  // Models state
  const [agentModels, setAgentModels] = useState([
    { role: "CEO", model: "nvidia/llama-3.3-nemotron-super-49b-v1" },
    { role: "CTO", model: "nvidia/llama-3.3-nemotron-super-49b-v1" },
    { role: "Engineering", model: "nvidia/llama-3.3-nemotron-super-49b-v1" },
    { role: "Design", model: "nvidia/llama-3.3-nemotron-super-49b-v1" },
    { role: "Marketing", model: "nvidia/llama-3.3-nemotron-super-49b-v1" },
  ]);

  useEffect(() => {
    fetch("/api/startup-profile")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          setProfile(json.data);
          setVision(json.data.vision_mission || "");
          setProblem(json.data.problem || "");
          setSolution(json.data.solution || "");
          setTarget(json.data.target_audience || "");
          if (json.data.brand_kit) {
            setPrimaryColor(json.data.brand_kit.primary_color || "#1A1A1A");
            setAccentColor(json.data.brand_kit.accent_color || "#F2B705");
          }
        }
      })
      .catch((err) => console.error("Failed to load profile:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/startup-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vision_mission: vision,
          problem,
          solution,
          target_audience: target,
          brand_kit: {
            ...profile?.brand_kit,
            primary_color: primaryColor,
            accent_color: accentColor,
          }
        }),
      });
      const json = await res.json();
      if (json.data) {
        setProfile(json.data);
        alert("Startup settings saved successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(item => 
      item.id === id ? { ...item, connected: !item.connected } : item
    ));
  };

  if (loading) {
    return <div className="p-8 text-center text-ink-faint">Loading settings...</div>;
  }

  return (
    <div className="h-[calc(100vh-52px)] flex bg-surface">
      {/* Settings Navigation sidebar */}
      <div className="w-[200px] border-r border-border-subtle bg-surface-card p-4 space-y-1">
        <h2 className="text-[12px] font-semibold text-ink-faint uppercase tracking-wider mb-4 px-2">Settings</h2>
        {[
          { id: "profile", label: "Startup Profile", icon: <Info className="w-4 h-4" /> },
          { id: "brand", label: "Brand Kit", icon: <Palette className="w-4 h-4" /> },
          { id: "models", label: "Executive Models", icon: <Settings className="w-4 h-4" /> },
          { id: "integrations", label: "Integrations", icon: <Shield className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "bg-ink/5 text-ink font-semibold"
                : "text-ink-secondary hover:bg-[rgba(32,32,32,0.02)]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Settings Panel */}
      <div className="flex-1 p-8 overflow-y-auto max-w-[800px]">
        {activeTab === "profile" && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div>
              <h1 className="text-[18px] font-semibold text-ink">Startup Profile</h1>
              <p className="text-[12px] text-ink-muted">Configure the context that every AI agent references before responding</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-ink-secondary mb-1.5">Vision & Mission</label>
                <textarea
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  className="w-full h-[80px] p-3 rounded-lg border border-border text-[13.5px] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-ink-secondary mb-1.5">Problem Statement</label>
                  <textarea
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    className="w-full h-[120px] p-3 rounded-lg border border-border text-[13.5px] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink-secondary mb-1.5">Proposed Solution</label>
                  <textarea
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="w-full h-[120px] p-3 rounded-lg border border-border text-[13.5px] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-ink-secondary mb-1.5">Target Audience</label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full h-[38px] px-3 rounded-lg border border-border text-[13.5px] bg-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle flex justify-end">
              <button
                type="submit"
                className="h-[36px] px-5 rounded-lg bg-ink text-ink-inverted text-[13px] font-semibold hover:bg-[#333] transition-colors cursor-pointer border-0"
              >
                Save Profile Settings
              </button>
            </div>
          </form>
        )}

        {activeTab === "brand" && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div>
              <h1 className="text-[18px] font-semibold text-ink">Brand Kit</h1>
              <p className="text-[12px] text-ink-muted">Set visual brand attributes for landing page builds and logo components</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-medium text-ink-secondary mb-1.5">Primary Branding Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 border rounded-lg cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 h-10 px-3 border rounded-lg text-[13.5px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-ink-secondary mb-1.5">Accent Action Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-10 border rounded-lg cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="flex-1 h-10 px-3 border rounded-lg text-[13.5px]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle flex justify-end">
              <button
                type="submit"
                className="h-[36px] px-5 rounded-lg bg-ink text-ink-inverted text-[13px] font-semibold hover:bg-[#333] transition-colors cursor-pointer border-0"
              >
                Save Brand Configuration
              </button>
            </div>
          </form>
        )}

        {activeTab === "models" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-[18px] font-semibold text-ink">Executive Models</h1>
              <p className="text-[12px] text-ink-muted">Map specific LLMs to different roles based on workload complexity</p>
            </div>

            <div className="bg-surface-card border border-border-subtle rounded-xl divide-y divide-border-subtle overflow-hidden">
              {agentModels.map((agent) => (
                <div key={agent.role} className="flex items-center justify-between p-4 bg-white">
                  <div>
                    <h3 className="text-[13.5px] font-semibold text-ink">{agent.role} Executive</h3>
                    <p className="text-[11.5px] text-ink-faint">Responsible for {agent.role.toLowerCase()} operations</p>
                  </div>
                  <select
                    value={agent.model}
                    onChange={(e) => {
                      setAgentModels(prev => prev.map(a => a.role === agent.role ? { ...a, model: e.target.value } : a));
                    }}
                    className="h-[34px] px-2 rounded-lg border border-border bg-white text-[13px] min-w-[240px]"
                  >
                    <option value="nvidia/llama-3.3-nemotron-super-49b-v1">Llama 3.3 Nemotron (NVIDIA)</option>
                    <option value="gpt-4o">GPT-4o (OpenAI)</option>
                    <option value="gemini-2.0-flash">Gemini 2.0 Flash (Google)</option>
                    <option value="claude-sonnet-4-20250514">Claude 3.7 Sonnet (Anthropic)</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-[18px] font-semibold text-ink">Integrations</h1>
              <p className="text-[12px] text-ink-muted">Connect Automyte agents to your external developer and communication tools</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {integrations.map((item) => (
                <div key={item.id} className="bg-white border border-border-subtle rounded-xl p-5 flex items-center justify-between shadow-xs">
                  <div>
                    <h3 className="text-[14px] font-semibold text-ink flex items-center gap-2">
                      {item.name}
                      {item.connected && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold text-success bg-success/10 border border-success/15">
                          <Check className="w-2.5 h-2.5" /> Connected
                        </span>
                      )}
                    </h3>
                    <p className="text-[12px] text-ink-faint mt-1 max-w-[480px]">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleIntegration(item.id)}
                    className={`h-[32px] px-3.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                      item.connected
                        ? "border border-border text-ink-secondary bg-transparent hover:bg-surface"
                        : "bg-ink text-ink-inverted hover:bg-[#333] border-0"
                    }`}
                  >
                    {item.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
