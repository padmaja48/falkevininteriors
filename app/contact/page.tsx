import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { getWhatsAppUrl, siteConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire with Falkevin Interior Designers in Abids — blinds, curtains, wallpaper, flooring and complete interiors. We visit with sample catalogues.",
  alternates: { canonical: `${siteConfig.seo.siteUrl}/contact` },
};

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <SiteShell>
      <main id="main" className="page-top">
        <section className="page-gutter pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl space-y-16 md:space-y-24">
            <Reveal className="max-w-6xl">
              <div
                id="contact-details"
                className="relative scroll-mt-32 overflow-hidden rounded-[4px] border border-deep/10 bg-secondary/55 p-5 shadow-[0_18px_55px_rgba(18,38,31,0.08)] sm:p-8 md:p-10"
              >
                <div
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch lg:gap-14">
                  <div>
                    <p className="label-caps mb-4">Contact studio</p>
              <h1 className="font-heading heading-display text-deep">
                Let&apos;s begin the conversation.
              </h1>
              <p className="mt-5 font-body text-base leading-relaxed text-muted md:text-lg">
                {siteConfig.visitNote} Share a few details about your space —
                we typically respond within one business day.
              </p>

                    <ul className="mt-8 space-y-5 font-body text-sm text-deep sm:mt-10">
                <li>
                  <p className="label-caps mb-1">Contact</p>
                  <p className="text-muted">{siteConfig.contactPerson}</p>
                </li>
                <li>
                  <p className="label-caps mb-1">Phone / WhatsApp</p>
                  <div className="flex flex-col gap-1">
                    <a
                      href={`tel:${contact.phoneHref}`}
                      className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
                    >
                      {contact.phone}
                    </a>
                    <a
                      href={`tel:${contact.phoneSecondaryHref}`}
                      className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
                    >
                      {contact.phoneSecondary}
                    </a>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
                    >
                      Message on WhatsApp
                    </a>
                  </div>
                </li>
                <li>
                  <p className="label-caps mb-1">Studio</p>
                  <p className="max-w-sm text-muted">{contact.address.full}</p>
                </li>
                    </ul>
                  </div>

                  <div className="overflow-hidden rounded-[3px] border border-white/70 bg-white/60 p-1.5 shadow-[0_12px_35px_rgba(18,38,31,0.1)]">
                    <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-1">
                      <p className="label-caps">Find the studio</p>
                      <a
                        href={contact.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-[0.65rem] uppercase tracking-[0.14em] text-deep underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent"
                      >
                        Open maps
                      </a>
                    </div>
                    <div className="aspect-[4/3] overflow-hidden rounded-[2px] bg-secondary">
                      <iframe
                        title="Studio location map"
                        src={contact.mapsEmbedUrl}
                        className="h-full w-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mx-auto w-full max-w-4xl">
              <div id="book-consultation" className="scroll-mt-32 rounded-[4px]">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
