import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ImageReveal } from "@/components/ImageReveal";
import { CTA } from "@/components/CTA";
import { homeContent } from "@/content/home";
import { images } from "@/content/images";

export function StudioIntro() {
  const { studio } = homeContent;

  return (
    <section className="section-pad bg-background page-gutter" aria-labelledby="studio-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-12 md:gap-8 lg:gap-16">
        <Reveal className="md:col-span-5 lg:col-span-5" delay={0.15}>
          <p className="label-caps mb-4">{studio.label}</p>
          <h2
            id="studio-heading"
            className="font-heading heading-section text-deep"
          >
            {studio.heading}
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-muted md:text-lg">
            {studio.paragraph}
          </p>
          <div className="mt-8">
            <CTA href={studio.ctaHref} variant="ghost">
              {studio.cta} →
            </CTA>
          </div>
        </Reveal>

        <div className="relative md:col-span-7 lg:col-span-7">
          <ImageReveal
            variant="mask"
            direction="up"
            className="relative aspect-[4/3] overflow-hidden bg-secondary md:aspect-[5/3] md:translate-x-4 lg:translate-x-8"
          >
            <Image
              src={images.studio.src}
              alt={images.studio.alt}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover object-[70%_center]"
            />
          </ImageReveal>
          <div
            className="absolute -bottom-4 -left-2 hidden h-24 w-40 bg-secondary md:block lg:-left-6"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
