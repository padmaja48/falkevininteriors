"use client";

import {
  m,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ImageRevealVariant = "mask" | "fade-up" | "scale" | "curtain";
export type ImageRevealDirection = "up" | "left" | "right";

type ImageRevealProps = {
  children: ReactNode;
  variant?: ImageRevealVariant;
  delay?: number;
  duration?: number;
  direction?: ImageRevealDirection;
  className?: string;
  once?: boolean;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function clipForDirection(
  direction: ImageRevealDirection,
  closed: boolean
): string {
  if (!closed) return "inset(0% 0% 0% 0%)";
  switch (direction) {
    case "left":
      return "inset(0% 100% 0% 0%)";
    case "right":
      return "inset(0% 0% 0% 100%)";
    case "up":
    default:
      return "inset(100% 0% 0% 0%)";
  }
}

function curtainAnimate(direction: ImageRevealDirection) {
  switch (direction) {
    case "left":
    case "right":
      return { scaleX: 0 };
    case "up":
    default:
      return { scaleY: 0 };
  }
}

export function ImageReveal({
  children,
  variant = "mask",
  delay = 0,
  duration,
  direction = "up",
  className,
  once = true,
}: ImageRevealProps) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  // Visible until hydrated — never leave images permanently hidden if JS/observer fails
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const baseDuration =
    duration ??
    (variant === "fade-up" ? 1 : variant === "scale" ? 1.2 : 1.1);
  // Mobile: keep 0.8–1.1s elegant range
  const dur = mobile
    ? Math.min(1.1, Math.max(0.8, baseDuration * 0.85))
    : baseDuration;

  const transition: Transition = {
    duration: reduce ? 0.6 : dur,
    delay: reduce ? 0 : delay,
    ease: EASE,
  };

  // Desktop: slight negative margin; mobile: amount-based trigger (no negative margin)
  const viewport = mobile
    ? { once, amount: 0.15 as const }
    : { once, margin: "-5% 0px" as const };

  const shellClass = cn("relative overflow-hidden", className);

  // SSR / pre-hydration: always visible
  if (!hydrated) {
    return <div className={shellClass}>{children}</div>;
  }

  // Reduced motion: soft opacity fade only (never instant / never scale or clip)
  if (reduce) {
    return (
      <m.div
        className={shellClass}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {children}
      </m.div>
    );
  }

  // Mobile: avoid clip-path — use fade-up + slight scale (iOS Safari clip-path is flaky)
  const effectiveVariant =
    mobile && (variant === "mask" || variant === "curtain")
      ? "fade-up"
      : variant;

  if (effectiveVariant === "fade-up" || (mobile && variant === "mask")) {
    return (
      <m.div
        className={shellClass}
        initial={{ opacity: 0, y: mobile ? 24 : 40, scale: mobile ? 1.05 : 1 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={viewport}
        transition={transition}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </m.div>
    );
  }

  if (effectiveVariant === "scale") {
    return (
      <m.div
        className={shellClass}
        initial={{ opacity: 0, scale: mobile ? 1.05 : 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewport}
        transition={transition}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </m.div>
    );
  }

  if (effectiveVariant === "curtain") {
    return (
      <div className={shellClass}>
        <div className="absolute inset-0">{children}</div>
        <m.div
          className="pointer-events-none absolute inset-0 z-10 bg-[#E9E1D5]"
          aria-hidden="true"
          initial={{ scaleX: 1, scaleY: 1 }}
          whileInView={curtainAnimate(direction)}
          viewport={viewport}
          transition={transition}
          style={{
            willChange: "transform",
            transformOrigin:
              direction === "left"
                ? "left center"
                : direction === "right"
                  ? "right center"
                  : "center top",
          }}
        />
      </div>
    );
  }

  // Desktop mask — clip-path + inner scale; include -webkit via style
  const closed = clipForDirection(direction, true);
  const open = clipForDirection(direction, false);

  return (
    <m.div
      className={shellClass}
      initial={{ clipPath: closed, WebkitClipPath: closed } as never}
      whileInView={{ clipPath: open, WebkitClipPath: open } as never}
      viewport={viewport}
      transition={transition}
      style={{ willChange: "clip-path, transform" }}
    >
      <m.div
        className="absolute inset-0 origin-center"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={viewport}
        transition={transition}
        style={{ willChange: "transform" }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
