"use client";

import Image from "next/image";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  parallax?: number;
  fromScale?: number;
  className?: string;
};

export function ParallaxImage({
  src,
  alt,
  sizes = "100vw",
  priority,
  parallax = 30,
  fromScale = 1.1,
  className,
}: ParallaxImageProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile || reduce ? [0, 0] : [parallax * -0.5, parallax * 0.5]
  );

  const viewport = isMobile
    ? { once: true as const, amount: 0.15 as const }
    : { once: true as const, margin: "-5% 0px" as const };

  if (!hydrated) {
    return (
      <div ref={ref} className={className ?? "absolute inset-0"}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={className ?? "absolute inset-0 overflow-hidden"}>
      <m.div
        className="absolute inset-[-5%]"
        style={isMobile || reduce ? undefined : { y }}
        initial={
          reduce
            ? { opacity: 0 }
            : { scale: isMobile ? 1.05 : fromScale, opacity: 0.9 }
        }
        whileInView={
          reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }
        }
        viewport={viewport}
        transition={{
          duration: reduce ? 0.6 : isMobile ? 0.95 : 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </m.div>
    </div>
  );
}
