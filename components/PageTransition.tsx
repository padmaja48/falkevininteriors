"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={pathname}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: reduce ? 0.6 : 0.3, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
