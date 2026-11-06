"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";
import type { ImageAsset } from "@/content/images";

type BeforeAfterProps = {
  before: ImageAsset;
  after: ImageAsset;
};

export function BeforeAfter({ before, after }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const updateFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <div className="space-y-4">
      <p id={labelId} className="label-caps">
        Before / After
      </p>
      <div
        ref={trackRef}
        className="relative aspect-[16/10] touch-none overflow-hidden bg-secondary select-none"
        onPointerDown={(e) => {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          updateFromClientX(e.clientX);
        }}
      >
        <Image
          src={after.src}
          alt={after.alt}
          fill
          sizes="(max-width: 768px) 100vw, 90vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover"
          />
        </div>

        <div
          className="absolute inset-y-0 z-10 w-px bg-white"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-deep/70 text-white">
            <span className="font-body text-[0.55rem] tracking-wider">↔</span>
          </div>
        </div>

        <span className="absolute top-4 left-4 z-10 bg-deep/70 px-2 py-1 font-body text-[0.6rem] uppercase tracking-[0.14em] text-white">
          Before
        </span>
        <span className="absolute top-4 right-4 z-10 bg-deep/70 px-2 py-1 font-body text-[0.6rem] uppercase tracking-[0.14em] text-white">
          After
        </span>
      </div>

      <label className="sr-only" htmlFor={`${labelId}-range`}>
        Compare before and after
      </label>
      <input
        id={`${labelId}-range`}
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-labelledby={labelId}
        onChange={(e) => setPos(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </div>
  );
}
