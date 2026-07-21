"use client";

/* ============================================================
   Reveal — the shared "enter the viewport once" animation used
   across sections: fade in, slide up, slight scale, blur→sharp.
   Wraps children in a motion.div; pass `as` for section/etc.
   ============================================================ */

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  amount = 0.25,
  className,
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  amount?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "viewport" | "transition">) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
