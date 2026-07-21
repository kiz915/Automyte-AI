"use client";

/* ============================================================
   CtaButton — shared premium button interaction:
   - slight scale + lift on hover
   - soft glow shadow strengthens on hover
   - trailing arrow (if provided) slides right
   - press animation on click (whileTap)
   Variant "primary" = dark filled, "secondary" = outlined.
   Branding/colors untouched — same classes as before, just the
   motion wrapper is centralized and richer.
   ============================================================ */

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";

export function CtaButton({
  href,
  children,
  icon,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    variant === "primary"
      ? "bg-[#1A1A1A] text-white shadow-lg"
      : "bg-white text-slate-800 shadow-sm";

  return (
    <motion.div
      className="group relative inline-block rounded-xl"
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      {/* Glow halo — primary only, visible on hover */}
      {variant === "primary" && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl bg-[#F2B705]/40 blur-xl"
          initial={{ opacity: 0 }}
          variants={{ hover: { opacity: 0.6, scale: 1.08 } }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* Secondary only — animated border that draws in on hover */}
      {variant === "secondary" && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl border pointer-events-none"
          initial={{ borderColor: "rgba(0,0,0,0.10)" }}
          variants={{ hover: { borderColor: "rgba(242,183,5,0.5)" } }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <motion.div
        variants={{ hover: { scale: variant === "primary" ? 1.03 : 1.02, y: -2 } }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        className="relative"
      >
        <Link
          href={href}
          className={`px-8 py-4 rounded-xl text-xs font-bold no-underline flex items-center gap-2 transition-shadow duration-300 ${base} ${className}`}
        >
          {children}
          {icon && (
            <motion.span
              className="inline-flex"
              variants={{ hover: { x: 5 } }}
              transition={{ type: "spring", stiffness: 500, damping: 24 }}
            >
              {icon}
            </motion.span>
          )}
        </Link>
      </motion.div>
    </motion.div>
  );
}
