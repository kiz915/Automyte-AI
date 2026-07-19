"use client";

import { useEffect, useState } from "react";
import type { Document } from "@/types/database";
import { Folder, FileText, Pin, ArrowLeft, Save, Sparkles, Download } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [editContent, setEditContent] = useState("");
  const [activeFolder, setActiveFolder] = useState<string>("All");

  useEffect(() => {
    fetch("/api/documents")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          setDocuments(json.data);
        }
      })
      .catch((err) => console.error("Failed to load documents:", err))
      .finally(() => setLoading(false));
  }, []);

  const folders = ["All", ...Array.from(new Set(documents.map((d) => d.folder || "General")))];

  const filteredDocs = activeFolder === "All" 
    ? documents 
    : documents.filter((d) => (d.folder || "General") === activeFolder);

  const handleOpenDoc = (doc: Document) => {
    setSelectedDoc(doc);
    setEditContent(doc.content || "");
  };

  const handleSaveDoc = () => {
    if (!selectedDoc) return;
    
    // In a real app we'd make a PUT request. We update state locally for demo purposes.
    const updatedDocs = documents.map((d) => 
      d.id === selectedDoc.id ? { ...d, content: editContent, updated_at: new Date().toISOString() } : d
    );
    setDocuments(updatedDocs);
    setSelectedDoc({ ...selectedDoc, content: editContent });
  };

  const handleDownload = () => {
    if (!selectedDoc) return;
    const element = document.createElement("a");
    const file = new Blob([editContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedDoc.name.toLowerCase().replace(/\s+/g, "_")}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return <div className="p-8 text-center text-ink-faint">Loading documents...</div>;
  }

  return (
    <div className="h-[calc(100vh-52px)] flex bg-surface">
      {/* Sidebar folders */}
      <div className="w-[200px] border-r border-border-subtle bg-surface-card p-4 space-y-1">
        <h2 className="text-[12px] font-semibold text-ink-faint uppercase tracking-wider mb-4 px-2">Folders</h2>
        {folders.map((folder) => (
          <button
            key={folder}
            onClick={() => {
              setActiveFolder(folder);
              setSelectedDoc(null);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeFolder === folder
                ? "bg-ink/5 text-ink font-semibold"
                : "text-ink-secondary hover:bg-[rgba(32,32,32,0.02)]"
            }`}
          >
            <Folder className="w-4 h-4 text-ink-muted" />
            {folder}
          </button>
        ))}
      </div>

      {/* Main Files Grid or Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedDoc ? (
          /* Document Editor View */
          <div className="flex-1 flex flex-col overflow-hidden bg-surface-card">
            {/* Top Editor Bar */}
            <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
              <button 
                onClick={() => setSelectedDoc(null)}
                className="flex items-center gap-2 text-[13px] text-ink-secondary hover:text-ink cursor-pointer border-0 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Documents
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 h-[32px] px-3 rounded-lg border border-border text-[12px] font-semibold text-ink-secondary hover:bg-surface transition-colors cursor-pointer bg-transparent"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download MD
                </button>
                <button
                  onClick={handleSaveDoc}
                  className="flex items-center gap-1.5 h-[32px] px-3.5 rounded-lg bg-ink text-ink-inverted text-[12px] font-semibold hover:bg-[#333] transition-colors cursor-pointer border-0"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 border-r border-border-subtle p-6 flex flex-col">
                <h1 className="text-xl font-semibold mb-4 text-ink">{selectedDoc.name}</h1>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-1 w-full resize-none border-0 focus:outline-none text-[14px] leading-relaxed text-ink font-mono bg-transparent"
                  placeholder="Start writing..."
                />
              </div>
              {/* Formatted Markdown Preview */}
              <div className="flex-1 p-6 overflow-y-auto bg-surface/30">
                <span className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-4 block">Live Preview</span>
                <div className="prose prose-sm max-w-none text-ink text-[14px] leading-relaxed space-y-4">
                  {editContent.split("\n").map((line, idx) => {
                    if (line.startsWith("# ")) {
                      return <h1 key={idx} className="text-2xl font-bold border-b border-border-subtle pb-2">{line.replace("# ", "")}</h1>;
                    }
                    if (line.startsWith("## ")) {
                      return <h2 key={idx} className="text-xl font-semibold mt-4">{line.replace("## ", "")}</h2>;
                    }
                    if (line.startsWith("### ")) {
                      return <h3 key={idx} className="text-lg font-medium mt-2">{line.replace("### ", "")}</h3>;
                    }
                    if (line.startsWith("- ") || line.startsWith("* ")) {
                      return <li key={idx} className="ml-4 list-disc">{line.replace(/^[-*]\s+/, "")}</li>;
                    }
                    return <p key={idx} className={line === "" ? "h-2" : ""}>{line}</p>;
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Grid Files View */
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-[18px] font-semibold text-ink">Documents</h1>
                <p className="text-[12px] text-ink-muted">Assets and deliverables compiled by your AI team</p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-subtle border border-accent/20">
                <Sparkles className="w-3.5 h-3.5 text-accent-hover" />
                <span className="text-[11px] font-semibold text-ink-secondary">{documents.length} Assets Generated</span>
              </div>
            </div>

            {filteredDocs.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-border rounded-xl text-ink-faint text-[13px]">
                No documents found in this folder.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => handleOpenDoc(doc)}
                    className="bg-surface-card border border-border-subtle rounded-xl p-4 hover:border-ink/20 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between h-[160px]"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-2 bg-[rgba(32,32,32,0.03)] rounded-lg">
                          <FileText className="w-4 h-4 text-ink-secondary" />
                        </div>
                        {doc.pinned && <Pin className="w-3.5 h-3.5 text-accent-hover fill-accent-hover" />}
                      </div>
                      <h3 className="text-[14px] font-semibold text-ink truncate">{doc.name}</h3>
                      <p className="text-[11px] text-ink-muted mt-1 uppercase font-semibold tracking-wider">{doc.folder}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-border-subtle pt-2.5 mt-2.5">
                      <span className="text-[11px] text-ink-faint">
                        v{doc.version} · {new Date(doc.updated_at).toLocaleDateString()}
                      </span>
                      <span className="text-[11px] font-medium text-ink-secondary">Edit →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
