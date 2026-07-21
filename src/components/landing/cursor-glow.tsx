"use client";

/* ============================================================
   CursorGlow — a soft radial glow that trails the mouse.
   Desktop only (pointer: fine), disabled under reduced motion.
   Uses a motion value + spring so it never fights layout/paint.
   ============================================================ */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
    if (!fine || reduced) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-30 pointer-events-none"
      style={{
        translateX: springX,
        translateY: springY,
        x: "-50%",
        y: "-50%",
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, rgba(242,183,5,0.10) 0%, rgba(242,183,5,0.04) 40%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />
    </motion.div>
  );
}
