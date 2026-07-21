"use client";

/* ============================================================
   HeroBackground — a calm, layered system that reads as
   "invisible AI processes continuously running" behind the
   hero copy. Five layers, back to front:

     1. Large blurred gradient orbs — extremely slow drift
     2. Fine grid — near-invisible, slow seamless vertical loop
     3. Thin curved paths with a traveling light streak
     4. Small nodes orbiting along those same paths
     5. Soft breathing glow directly behind the headline

   Everything here is CSS transform/opacity + SVG path motion —
   no layout-affecting properties, so it never causes reflow.
   Fully inert under prefers-reduced-motion (see globals.css).
   ============================================================ */

import { useReducedMotion } from "motion/react";

export function HeroBackground() {
  const reduceMotion = useReducedMotion();

  // Two long, shallow bezier curves — mostly horizontal drift,
  // a little vertical give, never touching the readable copy band.
  const pathA = "M -100 120 C 220 40, 480 220, 780 110 S 1260 60, 1500 150";
  const pathB = "M -100 340 C 260 420, 560 240, 860 360 S 1300 300, 1500 380";

  return (
    <div className="hero-bg" aria-hidden="true">
      {/* Layer 1 — blurred gradient orbs */}
      <div className="hero-orb hero-orb--a" />
      <div className="hero-orb hero-orb--b" />
      <div className="hero-orb hero-orb--c" />

      {/* Layer 2 — fine perspective grid */}
      <div className="hero-grid" />

      {/* Layer 3 + 4 — flowing paths and orbiting nodes */}
      <svg
        className="hero-lines"
        viewBox="0 0 1400 460"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroLineGlow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="260" y2="0">
            <stop offset="0" stopColor="#F2B705" stopOpacity="0" />
            <stop offset="0.5" stopColor="#F2B705" stopOpacity="0.9" />
            <stop offset="1" stopColor="#F2B705" stopOpacity="0" />
          </linearGradient>
          <filter id="heroNodeGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>

        {/* Faint static base curves */}
        <path d={pathA} fill="none" stroke="rgba(26,26,26,0.07)" strokeWidth="1" />
        <path d={pathB} fill="none" stroke="rgba(26,26,26,0.06)" strokeWidth="1" />

        {!reduceMotion && (
          <>
            {/* Traveling light streak, seamless dash loop */}
            <path
              d={pathA}
              fill="none"
              stroke="url(#heroLineGlow)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="10 990"
              className="hero-path-glow hero-path-glow--slow"
            />
            <path
              d={pathB}
              fill="none"
              stroke="url(#heroLineGlow)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="10 990"
              className="hero-path-glow hero-path-glow--slower"
            />

            {/* Orbiting nodes, riding the same curves */}
            <circle r="3.2" fill="#F2B705" opacity="0.7" filter="url(#heroNodeGlow)">
              <animateMotion dur="22s" repeatCount="indefinite" path={pathA} rotate="auto" />
            </circle>
            <circle r="2.4" fill="#F2B705" opacity="0.55" filter="url(#heroNodeGlow)">
              <animateMotion dur="22s" begin="-11s" repeatCount="indefinite" path={pathA} rotate="auto" />
            </circle>
            <circle r="2.8" fill="#94A3B8" opacity="0.5" filter="url(#heroNodeGlow)">
              <animateMotion dur="28s" begin="-4s" repeatCount="indefinite" path={pathB} rotate="auto" />
            </circle>
          </>
        )}
      </svg>

      {/* Layer 5 — soft breathing glow behind the headline */}
      <div className="hero-title-glow" />
    </div>
  );
}
