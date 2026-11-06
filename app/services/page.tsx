import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import { ImageReveal } from "@/components/ImageReveal";
import { CTA } from "@/components/CTA";
import { FinalCTA } from "@/components/home/FinalCTA";
import { images } from "@/content/images";
import { services, servicesPage } from "@/content/services";
import { siteConfig } from "@/content/site.config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description: servicesPage.intro,
  alternates: { canonical: `${siteConfig.seo.siteUrl}/services` },
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <main id="main">
        <section className="page-gutter page-top pb-12 md:pb-20">
          <div className="mx-auto max-w-7xl">
            <p className="label-caps mb-4">{servicesPage.label}</p>
            <h1 className="font-heading heading-display max-w-3xl text-deep">
              {servicesPage.heading}
            </h1>
            <p className="mt-5 max-w-2xl font-body text-base text-muted md:text-lg">
              {servicesPage.intro}
            </p>
          </div>
        </section>

        {services.map((service, i) => {
          const img = images.services[service.imageKey];
          const reverse = i % 2 === 1;
          return (
            <section
              key={service.slug}
              id={service.slug}
              className={cn(
                "border-t border-deep/10 page-gutter py-12 sm:py-16 md:py-24",
                reverse && "bg-secondary/30"
              )}
              aria-labelledby={`${service.slug}-heading`}
            >
              <div
                className={cn(
                  "mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-12 md:gap-14",
                  reverse && "md:[direction:rtl] md:[&>*]:[direction:ltr]"
                )}
              >
                <ImageReveal
                  variant="fade-up"
                  direction={reverse ? "right" : "up"}
                  className="relative overflow-hidden bg-secondary md:col-span-6"
                >
                  {/* Service photography keeps its complete source composition. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} className="block h-auto w-full" />
                </ImageReveal>

                <Reveal delay={0.1} className="md:col-span-6">
                  <p className="label-caps mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2
                    id={`${service.slug}-heading`}
                    className="font-heading text-3xl font-light text-deep md:text-4xl"
                  >
                    {service.name}
                  </h2>
                  <p className="mt-5 font-body text-base leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <p className="label-caps mt-10 mb-4">What we offer</p>
                  <ul className="space-y-2">
                    {service.offer.map((item) => (
                      <li
                        key={item}
                        className="font-body text-sm text-deep before:mr-2 before:text-accent before:content-['—']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="label-caps mt-10 mb-4">Design approach</p>
                  <p className="font-body text-sm leading-relaxed text-muted">
                    {service.approach}
                  </p>

                  <div className="mt-8">
                    <CTA href={siteConfig.cta.primaryHref} variant="outline">
                      {siteConfig.cta.primary}
                    </CTA>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}

        <FinalCTA />
      </main>
    </SiteShell>
  );
}
