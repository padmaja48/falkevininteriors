import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ImageReveal } from "@/components/ImageReveal";
import { homeContent } from "@/content/home";
import { images } from "@/content/images";

export function WhyUs() {
  const { whyUs } = homeContent;

  return (
    <section className="section-pad bg-background page-gutter" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label-caps mb-4">Why Us</p>
              <h2
                id="why-heading"
                className="font-heading heading-section text-deep"
              >
                {whyUs.heading}
              </h2>
            </Reveal>
            <ImageReveal
              variant="mask"
              direction="up"
              delay={0.1}
              className="relative mt-10 hidden aspect-[3/4] overflow-hidden bg-secondary lg:block"
            >
              <Image
                src={images.whyUs.src}
                alt={images.whyUs.alt}
                fill
                sizes="40vw"
                className="object-contain"
              />
            </ImageReveal>
          </div>

          <div className="lg:col-span-7">
            <ImageReveal
              variant="fade-up"
              className="relative mb-10 aspect-[3/4] overflow-hidden bg-secondary lg:hidden"
            >
              <Image
                src={images.whyUs.src}
                alt={images.whyUs.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </ImageReveal>
            <ul className="space-y-0">
              {whyUs.blocks.map((block, i) => (
                <Reveal key={block.number} delay={i * 0.07} as="li">
                  <div className="grid gap-3 border-t border-deep/10 py-8 md:grid-cols-12 md:gap-6">
                    <p className="label-caps md:col-span-2">{block.number}</p>
                    <div className="md:col-span-10">
                      <h3 className="font-heading text-2xl text-deep md:text-3xl">
                        {block.title}
                      </h3>
                      <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-muted">
                        {block.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-deep/10" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
