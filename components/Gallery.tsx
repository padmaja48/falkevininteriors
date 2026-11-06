import { Reveal } from "@/components/Reveal";
import { ImageReveal } from "@/components/ImageReveal";
import { CTA } from "@/components/CTA";
import { homeContent } from "@/content/home";
import { images } from "@/content/images";
import { siteConfig } from "@/content/site.config";

export function Gallery() {
  return (
    <section className="section-pad bg-background page-gutter" aria-labelledby="journal-heading">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-caps mb-4">Visual Journal</p>
            <h2
              id="journal-heading"
              className="font-heading heading-section text-deep"
            >
              {homeContent.journal.heading}
            </h2>
          </div>
          <CTA href={siteConfig.social.instagram} external variant="ghost">
            {homeContent.journal.cta} →
          </CTA>
        </Reveal>

        <div className="columns-1 gap-4 md:columns-2 md:gap-5 lg:columns-3">
          {images.journal.map((img, i) => (
            <ImageReveal
              key={img.src}
              variant="fade-up"
              delay={i * 0.08}
              className="relative mb-4 break-inside-avoid overflow-hidden bg-secondary md:mb-5"
            >
              {/* The journal preserves each source image's native aspect ratio. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="block h-auto w-full" />
            </ImageReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
