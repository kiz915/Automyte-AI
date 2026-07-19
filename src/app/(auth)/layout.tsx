export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface relative">
      {/* Subtle grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 w-full max-w-[400px] px-6">
        {children}
      </div>
    </div>
  );
}
