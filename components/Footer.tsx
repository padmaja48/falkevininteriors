import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { siteConfig, getWhatsAppUrl } from "@/content/site.config";

export function Footer() {
  return (
    <footer className="border-t border-deep/10 bg-background">
      <div className="page-gutter mx-auto grid max-w-7xl gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-20">
        <div className="md:col-span-5">
          <Link
            href="/"
            aria-label={siteConfig.company}
            className="inline-flex flex-col items-start gap-4"
          >
            <BrandLogo size="footer" />
            <span className="font-heading text-xl tracking-[0.06em] text-deep md:text-2xl">
              {siteConfig.logoText}
            </span>
          </Link>
          <p className="mt-3 font-body text-base text-muted md:text-sm">
            {siteConfig.location}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="label-caps mb-4">Navigate</p>
          <ul className="space-y-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body inline-flex min-h-11 items-center text-base text-deep transition-colors hover:text-accent md:text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="label-caps mb-4">Contact</p>
          <ul className="space-y-1 font-body text-base text-deep md:text-sm">
            <li className="min-h-11 py-2 text-muted">
              {siteConfig.contactPerson}
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phoneSecondaryHref}`}
                className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
              >
                {siteConfig.contact.phoneSecondary}
              </a>
            </li>
            <li>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
              >
                WhatsApp
              </a>
            </li>
            <li className="max-w-xs text-muted">
              {siteConfig.contact.address.full}
            </li>
            <li>
              <a
                href={siteConfig.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent"
              >
                Open in Google Maps
              </a>
            </li>
          </ul>

          <div className="mt-8 flex gap-5">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-deep/10">
        <div className="page-gutter mx-auto flex max-w-7xl flex-col gap-2 py-6 font-body text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.company}. All rights
            reserved.
          </p>
          <p>{siteConfig.businessHours}</p>
        </div>
      </div>
    </footer>
  );
}
