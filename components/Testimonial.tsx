"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/Reveal";

export function Testimonial() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const active = testimonials[index];
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const go = useCallback((dir: -1 | 1) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  }, []);

  return (
    <section
      className="section-pad bg-secondary/50 page-gutter"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="label-caps mb-10">Google reviews · 5.0</p>
        </Reveal>

        <div
          className="relative min-h-[200px] touch-pan-y sm:min-h-[240px] md:min-h-[260px]"
          onTouchStart={(e) => {
            touchStartX.current = e.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current == null) return;
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(dx) < 48) return;
            go(dx < 0 ? 1 : -1);
          }}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{
                duration: reduce ? 0.6 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto"
            >
              <p className="font-heading text-[clamp(1.375rem,5.5vw,2.5rem)] font-light leading-snug text-deep md:leading-[1.25]">
                “{active.quote}”
              </p>
              <footer className="mt-8 font-body text-sm text-muted">
                <cite className="not-italic">
                  — {active.name}, {active.location}
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div
          className="mt-10 flex items-center justify-center gap-3"
          role="tablist"
          aria-label="Testimonial slides"
        >
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-deep md:hidden"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
          >
            ←
          </button>
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={`h-2 min-w-8 transition-colors duration-500 ${
                i === index ? "bg-accent" : "bg-deep/20"
              }`}
            />
          ))}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-deep md:hidden"
            aria-label="Next testimonial"
            onClick={() => go(1)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
