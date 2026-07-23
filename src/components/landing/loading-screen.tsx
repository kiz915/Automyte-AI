"use client";

/* ============================================================
   LoadingScreen — brief premium boot sequence
   "Automyte" -> "Initializing AI Workspace..." -> "Loading agents..."
   Fades smoothly into the hero. Skips almost entirely for
   prefers-reduced-motion (near-instant, no message cycling).
   ============================================================ */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const MESSAGES = ["Initializing AI workspace…", "Loading agents…", "Ready."];

export function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      queueMicrotask(() => {
        setVisible(false);
        onDone?.();
      });
      return;
    }

    const stepMs = 500;
    const totalSteps = MESSAGES.length;
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i < totalSteps; i++) {
      timers.push(setTimeout(() => setMsgIndex(i), stepMs * i));
    }
    timers.push(
      setTimeout(() => {
        setVisible(false);
        onDone?.();
      }, stepMs * totalSteps + 300)
    );

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#F7F6F2]"
          aria-hidden="true"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl font-semibold tracking-tight text-[#1A1A1A]"
          >
            Automyte
          </motion.span>
          <AnimatePresence mode="wait">
            <motion.span
              key={MESSAGES[msgIndex]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-medium tracking-wide text-slate-500"
            >
              {MESSAGES[msgIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
