import { AppShell } from "@/components/layout/app-shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#111115] text-white overflow-hidden">{children}</div>;
}
