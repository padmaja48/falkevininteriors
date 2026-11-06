import { Reveal } from "@/components/Reveal";
import { homeContent } from "@/content/home";

export function Stats() {
  return (
    <section className="border-y border-deep/10 bg-secondary/40" aria-label="Studio statistics">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {homeContent.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className="border-deep/10 px-4 py-10 sm:px-6 sm:py-12 md:border-r md:px-8 md:py-16 md:last:border-r-0 [&:nth-child(odd)]:border-r max-md:[&:nth-child(-n+2)]:border-b"
          >
            <p className="font-heading text-3xl font-light text-deep sm:text-4xl md:text-5xl lg:text-6xl">
              {stat.value}
            </p>
            <p className="mt-2 font-body text-[0.625rem] uppercase leading-snug tracking-[0.14em] text-muted sm:mt-3 sm:text-[0.6875rem] sm:tracking-[0.18em]">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
