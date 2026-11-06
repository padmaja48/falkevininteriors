"use client";

import { getWhatsAppUrl, siteConfig } from "@/content/site.config";

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${siteConfig.cta.whatsapp} on WhatsApp`}
      className="fixed right-6 bottom-8 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-deep text-white shadow-lg transition-transform duration-500 hover:scale-105 md:flex"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 fill-current"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.78 11.78 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.82c0 2.08.55 4.11 1.6 5.9L0 24l6.45-1.69a11.8 11.8 0 0 0 5.59 1.42h.01c6.54 0 11.84-5.3 11.84-11.82 0-3.16-1.23-6.13-3.37-8.43ZM12.05 21.6h-.01a9.78 9.78 0 0 1-4.98-1.36l-.36-.21-3.83 1 1.02-3.73-.24-.38a9.74 9.74 0 0 1-1.5-5.2c0-5.38 4.38-9.76 9.77-9.76a9.7 9.7 0 0 1 6.91 2.86 9.7 9.7 0 0 1 2.86 6.91c0 5.38-4.38 9.77-9.74 9.77Zm5.36-7.32c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.73-.71 1.97-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34Z" />
      </svg>
    </a>
  );
}
