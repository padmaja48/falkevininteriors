import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { ParallaxImage } from "@/components/ParallaxImage";
import { homeContent } from "@/content/home";
import { images } from "@/content/images";
import { getWhatsAppUrl } from "@/content/site.config";

export function FinalCTA() {
  const { finalCta } = homeContent;

  return (
    <section className="relative min-h-[70svh] overflow-hidden" aria-labelledby="final-cta-heading">
      <ParallaxImage
        src={images.finalCta.src}
        alt={images.finalCta.alt}
        sizes="100vw"
        parallax={30}
        fromScale={1.1}
      />
      <div className="absolute inset-0 bg-deep/55" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[70svh] items-end page-gutter py-16 pb-[calc(var(--sticky-bar-h)+2rem)] md:items-center md:py-28 md:pb-28">
        <Reveal className="mx-auto w-full max-w-7xl">
          <h2
            id="final-cta-heading"
            className="font-heading max-w-3xl text-[clamp(1.75rem,6vw,3.75rem)] font-light leading-tight text-white"
          >
            {finalCta.heading}
          </h2>
          <p className="mt-4 max-w-md font-body text-sm text-white/85 sm:mt-5 sm:text-base md:text-lg">
            {finalCta.text}
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:max-w-md sm:flex-row sm:gap-4 md:max-w-none">
            <CTA href={finalCta.primaryHref} variant="light-solid" className="w-full sm:w-auto">
              {finalCta.primaryCta}
            </CTA>
            <CTA href={getWhatsAppUrl()} external variant="light-outline" className="w-full sm:w-auto">
              {finalCta.secondaryCta}
            </CTA>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
