"use client";

/* ============================================================
   AnimatedCounter — counts from 0 (or `from`) up to `to` once
   the element enters the viewport. Uses motion's animate() on
   a plain number, so it works for "10,000", "42%", "$42.5k" etc.
   via a `format` function.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useReducedMotion } from "motion/react";

export function AnimatedCounter({
  to,
  from = 0,
  duration = 1.6,
  format = (n: number) => Math.round(n).toLocaleString(),
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(format(from));

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setDisplay(format(to));
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
  }, [isInView, from, to, duration, format, reduceMotion]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
