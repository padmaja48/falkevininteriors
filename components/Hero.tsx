import { CTA } from "@/components/CTA";
import { HeroMedia } from "@/components/HeroMedia";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/content/site.config";

export function Hero() {
  const { hero } = homeContent;

  return (
    <section
      className="relative isolate flex min-h-[100svh] w-full max-w-full flex-col overflow-hidden supports-[height:100dvh]:min-h-[100dvh]"
      aria-label="Hero"
    >
      <HeroMedia />
      {/* Soft left + bottom wash — keep right side vivid for color */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent md:from-black/50 md:via-black/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent md:from-black/40 md:via-transparent"
        aria-hidden="true"
      />

      <div
        className="relative z-10 flex flex-1 flex-col justify-end page-gutter"
        style={{
          paddingTop: "calc(var(--nav-h) + var(--safe-top) + 1rem)",
          paddingBottom: "calc(var(--sticky-bar-h) + 1.25rem)",
        }}
      >
        <div className="mx-auto w-full max-w-7xl pb-6 md:pb-16 lg:pb-24">
          <div className="hero-copy max-w-2xl">
            <p className="hero-type font-heading text-lg tracking-[0.08em] text-white sm:text-xl md:text-2xl">
              {siteConfig.logoText}
            </p>
            <h1 className="hero-type mt-3 max-w-[19ch] font-heading text-[clamp(1.75rem,8vw,2.75rem)] font-light leading-[1.08] tracking-tight text-white sm:mt-4 md:max-w-none">
              {hero.heading}
            </h1>
            <p className="hero-type mt-4 max-w-[34ch] font-body text-sm leading-[1.55] text-white sm:mt-3 sm:max-w-xl sm:text-base md:mt-4 md:text-lg">
              {hero.subheading}
            </p>
            <div className="mt-5 flex w-full flex-col gap-2.5 sm:mt-7 sm:max-w-md sm:flex-row sm:items-center sm:gap-4">
              <CTA
                href={hero.primaryHref}
                variant="light-solid"
                className="h-12 w-full shadow-[0_4px_18px_rgba(0,0,0,0.35)] sm:w-auto"
              >
                {hero.primaryCta}
              </CTA>
              <CTA
                href={hero.secondaryHref}
                variant="light-outline"
                className="h-12 w-full border-2 border-white bg-black/35 shadow-[0_4px_18px_rgba(0,0,0,0.3)] sm:w-auto"
              >
                {hero.secondaryCta}
              </CTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
