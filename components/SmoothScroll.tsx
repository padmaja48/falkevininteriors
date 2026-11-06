"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling for fine pointer / desktop only.
 * Disabled on touch devices — Lenis fights native iOS/Android scroll
 * and breaks IntersectionObserver-driven reveals.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const isTouch =
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      window.matchMedia("(max-width: 767px)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
