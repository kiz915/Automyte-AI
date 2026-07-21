import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Automyte AI — Run an entire company with AI",
    template: "%s | Automyte AI",
  },
  description:
    "Automyte is an AI company operating system for founders, coordinating engineering, sales, marketing, design, finance, and operations agents.",
  keywords: [
    "AI company operating system",
    "AI agents for founders",
    "startup operating system",
    "agent-native company",
    "Automyte AI",
  ],
  applicationName: "Automyte AI",
  authors: [{ name: "Automyte AI" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-body-md text-body-md text-on-background bg-background" style={{ overscrollBehavior: "none" }}>
        {/* SVG filter definitions for inner-shadow text effect */}
        <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
          <defs>
            <filter id="headline-inner-shadow-dark">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
              <feOffset dx="0" dy="2" />
              <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
              <feColorMatrix in="shadowDiff" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.75 0" result="shadow" />
              <feComposite in="shadow" in2="SourceGraphic" operator="over" />
            </filter>
            <filter id="headline-inner-shadow-light">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
              <feOffset dx="0" dy="2" />
              <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
              <feColorMatrix in="shadowDiff" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" result="shadow" />
              <feComposite in="shadow" in2="SourceGraphic" operator="over" />
            </filter>
          </defs>
        </svg>

        {children}

        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: "#FFFFFF",
              border: "1px solid rgba(32, 32, 32, 0.10)",
              color: "#1A1A1A",
              boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.08)",
            },
          }}
        />
      </body>
    </html>
  );
}
