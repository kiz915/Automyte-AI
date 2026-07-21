"use client";

/* ============================================================
   AnimatedBackground — soft mesh gradient, radial glows, and
   a handful of slow-drifting particles. Purely decorative
   (aria-hidden), sits fixed behind all content. Respects
   prefers-reduced-motion via the .mesh-static class swap in CSS.
   ============================================================ */

import { useMemo } from "react";

export function AnimatedBackground() {
  // Deterministic "random" particle layout so server/client render match
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        size: 2 + (i % 3),
        delay: (i % 7) * 0.6,
        duration: 14 + (i % 5) * 3,
      })),
    []
  );

  return (
    <div className="automyte-bg fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="automyte-mesh" />
      <div className="automyte-glow automyte-glow--a" />
      <div className="automyte-glow automyte-glow--b" />
      <div className="automyte-glow automyte-glow--c" />
      {particles.map((p) => (
        <span
          key={p.id}
          className="automyte-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
