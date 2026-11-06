"use client";

import { m, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li" | "header" | "footer";
};

const motionMap = {
  div: m.div,
  section: m.section,
  article: m.article,
  li: m.li,
  header: m.header,
  footer: m.footer,
} as const;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motionMap[as];
  const [hydrated, setHydrated] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!hydrated) {
    return <div className={className}>{children}</div>;
  }

  const viewport = mobile
    ? { once: true as const, amount: 0.15 as const }
    : { once: true as const, margin: "-5% 0px" as const };

  // Reduced motion: soft fade only
  if (reduce) {
    return (
      <Comp
        className={cn(className)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: EASE, delay: 0 }}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      className={cn(className)}
      initial={{ opacity: 0, y: mobile ? Math.min(y, 24) : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: mobile ? 0.85 : 0.9,
        ease: EASE,
        delay,
      }}
    >
      {children}
    </Comp>
  );
}
