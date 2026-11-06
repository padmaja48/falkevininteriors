import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import { ImageReveal } from "@/components/ImageReveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { aboutContent } from "@/content/about";
import { images } from "@/content/images";
import { siteConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "About",
  description: aboutContent.heading,
  alternates: { canonical: `${siteConfig.seo.siteUrl}/about` },
};

export default function AboutPage() {
  const a = aboutContent;

  return (
    <SiteShell>
      <main id="main">
        <section className="page-gutter page-top pb-10 md:pb-16">
          <div className="mx-auto max-w-7xl">
            <p className="label-caps mb-4">{a.label}</p>
            <h1 className="font-heading heading-display max-w-4xl text-deep">
              {a.heading}
            </h1>
          </div>
        </section>

        <ImageReveal
          variant="scale"
          className="relative aspect-[16/10] w-full overflow-hidden bg-secondary md:aspect-[21/9]"
        >
          <Image
            src={images.aboutHero.src}
            alt={images.aboutHero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </ImageReveal>

        <section className="page-gutter section-pad" aria-labelledby="story-heading">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="label-caps mb-4">{a.story.label}</p>
              <h2
                id="story-heading"
                className="font-heading text-3xl font-light text-deep md:text-4xl"
              >
                {a.story.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="space-y-5 md:col-span-7 md:col-start-6">
              {a.story.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-muted md:text-lg">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="border-y border-deep/10 bg-secondary/40 page-gutter section-pad">
          <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
            <Reveal>
              <p className="label-caps mb-4">{a.philosophy.label}</p>
              <h2 className="font-heading text-3xl font-light text-deep md:text-4xl">
                {a.philosophy.heading}
              </h2>
              <p className="mt-5 font-body text-base leading-relaxed text-muted md:text-lg">
                {a.philosophy.text}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="label-caps mb-4">{a.approach.label}</p>
              <h2 className="font-heading text-3xl font-light text-deep md:text-4xl">
                {a.approach.heading}
              </h2>
              <p className="mt-5 font-body text-base leading-relaxed text-muted md:text-lg">
                {a.approach.text}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="page-gutter section-pad" aria-labelledby="founder-heading">
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-12 md:gap-16">
            <ImageReveal
              variant="mask"
              direction="up"
              className="relative aspect-[1452/1083] overflow-hidden bg-secondary md:col-span-5"
            >
              <Image
                src={images.founder.src}
                alt={images.founder.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain"
              />
            </ImageReveal>
            <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
              <p className="label-caps mb-4">{a.founder.label}</p>
              <h2 id="founder-heading" className="font-heading text-3xl text-deep md:text-4xl">
                {a.founder.name}
              </h2>
              <p className="mt-2 font-body text-sm uppercase tracking-[0.14em] text-muted">
                {a.founder.role}
              </p>
              <blockquote className="mt-8 font-heading text-2xl font-light leading-snug text-deep md:text-3xl">
                {a.founder.note}
              </blockquote>
            </Reveal>
          </div>
        </section>

        <section className="bg-secondary/30 page-gutter section-pad" aria-labelledby="what-we-do-heading">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-12 max-w-xl">
              <p className="label-caps mb-4">{a.whatWeDo.label}</p>
              <h2
                id="what-we-do-heading"
                className="font-heading text-3xl font-light text-deep md:text-4xl"
              >
                {a.whatWeDo.heading}
              </h2>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {a.whatWeDo.items.map((item, i) => (
                <Reveal key={item} delay={i * 0.05} as="li">
                  <div className="border-t border-deep/15 pt-5">
                    <p className="font-body text-base text-deep md:text-sm">
                      {item}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="page-gutter section-pad" aria-labelledby="team-heading">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-12 max-w-xl">
              <p className="label-caps mb-4">{a.team.label}</p>
              <h2
                id="team-heading"
                className="font-heading text-3xl font-light text-deep md:text-4xl"
              >
                {a.team.heading}
              </h2>
            </Reveal>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {a.team.members.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.06} as="li">
                  <div className="border-t border-deep/15 pt-6">
                    <p className="font-heading text-2xl text-deep">{m.name}</p>
                    <p className="mt-2 font-body text-sm text-muted">{m.role}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="page-gutter section-pad" aria-labelledby="values-heading">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-12">
              <p className="label-caps mb-4">{a.values.label}</p>
              <h2 id="values-heading" className="sr-only">
                Studio values
              </h2>
            </Reveal>
            <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {a.values.items.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06} as="li">
                  <p className="label-caps mb-3">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-heading text-2xl text-deep">{v.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                    {v.text}
                  </p>
                </Reveal>
              ))}
            </ul>

            <div className="mt-16 grid gap-5 md:grid-cols-2">
              <ImageReveal
                variant="mask"
                direction="left"
                className="relative aspect-[16/11] overflow-hidden bg-secondary"
              >
                <Image
                  src={images.studioPhoto1.src}
                  alt={images.studioPhoto1.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </ImageReveal>
              <ImageReveal
                variant="mask"
                direction="right"
                delay={0.12}
                className="relative aspect-[16/11] overflow-hidden bg-secondary"
              >
                <Image
                  src={images.studioPhoto2.src}
                  alt={images.studioPhoto2.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </ImageReveal>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
    </SiteShell>
  );
}
