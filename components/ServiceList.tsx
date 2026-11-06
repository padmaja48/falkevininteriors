"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { homeContent } from "@/content/home";
import { images } from "@/content/images";
import { cn } from "@/lib/utils";

type ImageKey = keyof typeof images.services;

export function ServiceList() {
  const items = homeContent.servicesPreview.items;
  const [active, setActive] = useState<ImageKey>(items[0].imageKey);
  const reduce = useReducedMotion();
  const activeImage = images.services[active];

  return (
    <section
      className="section-pad bg-secondary/40 page-gutter"
      aria-labelledby="services-preview-heading"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="label-caps mb-4">Services</p>
          <h2
            id="services-preview-heading"
            className="font-heading heading-section text-deep"
          >
            {homeContent.servicesPreview.heading}
          </h2>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <ol className="lg:col-span-6">
            {items.map((item, i) => {
              const isActive = active === item.imageKey;
              return (
                <li key={item.number}>
                  <button
                    type="button"
                    className={cn(
                      "group flex w-full items-center gap-3 border-t border-deep/10 py-4 text-left transition-all duration-500 sm:gap-4 md:gap-6 md:py-6",
                      isActive ? "md:translate-x-2" : "md:hover:translate-x-2"
                    )}
                    onMouseEnter={() => setActive(item.imageKey)}
                    onFocus={() => setActive(item.imageKey)}
                    onClick={() => setActive(item.imageKey)}
                    aria-pressed={isActive}
                  >
                    <span className="label-caps w-7 shrink-0 sm:w-8">{item.number}</span>
                    <span
                      className={cn(
                        "font-heading min-w-0 flex-1 text-lg leading-snug text-deep transition-colors duration-500 sm:text-xl md:text-2xl lg:text-3xl",
                        isActive && "text-accent"
                      )}
                    >
                      {item.title}
                    </span>
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden bg-secondary sm:h-16 sm:w-16 lg:hidden">
                      <Image
                        src={images.services[item.imageKey].src}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </span>
                  </button>
                  {isActive && (
                    <div className="pb-4 lg:hidden">
                      <Link
                        href="/services"
                        className="font-body text-xs uppercase tracking-[0.14em] text-accent underline underline-offset-4"
                      >
                        View all services →
                      </Link>
                    </div>
                  )}
                  {i === items.length - 1 && (
                    <div className="border-t border-deep/10" />
                  )}
                </li>
              );
            })}
          </ol>

          <div className="relative hidden overflow-hidden bg-secondary lg:col-span-6 lg:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="relative"
                initial={reduce ? { opacity: 0 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduce ? 0.6 : 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* The service artwork keeps its complete source composition. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="block h-auto w-full"
                />
              </motion.div>
            </AnimatePresence>
            <Link
              href="/services"
              className="absolute right-4 bottom-4 z-10 border border-white/70 bg-deep/40 px-4 py-2.5 font-body text-[0.65rem] uppercase tracking-[0.14em] text-white backdrop-blur-sm"
            >
              Explore services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
