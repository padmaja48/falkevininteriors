"use client";

import Image from "next/image";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { images } from "@/content/images";

export function HeroMedia() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, 40]
  );

  // Soft opacity only — avoid scale zoom (softens the photo)
  return (
    <div ref={ref} className="absolute inset-0 h-full w-full max-w-full overflow-hidden">
      <m.div
        className="absolute inset-0 h-full w-full max-w-full"
        style={isMobile || reduce ? undefined : { y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reduce ? 0.5 : 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          key={images.hero.src}
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          sizes="100vw"
          quality={100}
          className="h-full w-full max-w-full object-cover object-center"
        />
      </m.div>
    </div>
  );
}
