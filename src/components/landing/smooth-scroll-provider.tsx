"use client";

/* ============================================================
   SmoothScrollProvider — buttery scrolling via Lenis
   - Skips entirely for prefers-reduced-motion
   - Uses a gentler config on touch/mobile devices
   ============================================================ */

import { useEffect, useRef, type ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion) return;

    let lenis: import("lenis").default | null = null;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: isTouch ? 0.9 : 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: !isTouch,
        touchMultiplier: isTouch ? 1.4 : 1,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId.current = requestAnimationFrame(raf);
      };
      rafId.current = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
