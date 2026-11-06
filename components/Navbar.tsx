"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";
import { siteConfig } from "@/content/site.config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[60] border-b border-deep/10 bg-background/95 backdrop-blur-sm"
      style={{ paddingTop: "var(--safe-top)" }}
    >
      <div className="page-gutter mx-auto flex h-[var(--nav-h)] max-w-7xl items-center justify-between gap-3">
        <Link
          href="/"
          className="relative z-[60] flex min-w-0 shrink items-center gap-2.5 sm:gap-3"
          aria-label={siteConfig.company}
          onClick={() => setOpen(false)}
        >
          <BrandLogo priority size="nav" />
          <span className="font-heading truncate text-base tracking-[0.06em] text-deep sm:text-lg md:text-xl">
            {siteConfig.logoText}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 xl:gap-8 lg:flex"
          aria-label="Primary"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body whitespace-nowrap text-[0.7rem] uppercase tracking-[0.16em] text-deep transition-colors duration-300 hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.cta.primaryHref}
            className="whitespace-nowrap border border-deep px-4 py-2.5 font-body text-[0.65rem] uppercase tracking-[0.16em] text-deep transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {siteConfig.cta.primary}
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-[60] flex h-11 w-11 shrink-0 items-center justify-center text-deep lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <span className="flex w-6 flex-col gap-1.5">
            <span
              className={cn(
                "block h-px w-full bg-current transition-transform duration-300",
                open && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-px w-full bg-current transition-opacity duration-300",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-px w-full bg-current transition-transform duration-300",
                open && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-0 z-[55] flex h-[100dvh] min-h-[100svh] flex-col overflow-y-auto bg-background page-gutter lg:hidden"
              style={{
                paddingTop: "calc(var(--nav-h) + var(--safe-top) + 1rem)",
                paddingBottom: "calc(var(--safe-bottom) + 1rem)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.6 : 0.35 }}
            >
              <nav
                className="flex min-h-0 flex-1 flex-col justify-center gap-1 overflow-y-auto py-4"
                aria-label="Mobile"
              >
                {siteConfig.nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 * i,
                      duration: reduce ? 0.6 : 0.45,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="font-heading block min-h-12 py-2.5 text-[clamp(1.75rem,8vw,2.5rem)] leading-tight text-deep"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <Link
                href={siteConfig.cta.primaryHref}
                onClick={() => setOpen(false)}
                className="flex min-h-12 shrink-0 items-center justify-center border border-deep px-5 py-4 text-center font-body text-xs uppercase tracking-[0.16em] text-deep"
              >
                {siteConfig.cta.primary}
              </Link>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
