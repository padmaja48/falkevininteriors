"use client";

import Link from "next/link";
import { getWhatsAppUrl, siteConfig } from "@/content/site.config";

export function MobileStickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-deep/10 bg-background/95 backdrop-blur-sm md:hidden"
      style={{ paddingBottom: "var(--safe-bottom)" }}
    >
      <div className="grid grid-cols-2">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center border-r border-deep/10 px-2 py-3.5 font-body text-[0.625rem] uppercase tracking-[0.12em] text-deep sm:text-[0.6875rem] sm:tracking-[0.14em]"
        >
          WhatsApp
        </a>
        <Link
          href={siteConfig.cta.primaryHref}
          className="flex min-h-12 items-center justify-center bg-deep px-2 py-3.5 text-center font-body text-[0.625rem] uppercase tracking-[0.12em] text-white sm:text-[0.6875rem] sm:tracking-[0.14em]"
        >
          Book Consultation
        </Link>
      </div>
    </div>
  );
}
