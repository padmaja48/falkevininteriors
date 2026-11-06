import { Reveal } from "@/components/Reveal";
import { homeContent } from "@/content/home";

export function ProcessTimeline() {
  const { process } = homeContent;

  return (
    <section
      id={process.id}
      className="section-pad scroll-mt-[calc(var(--nav-h)+1rem)] bg-secondary/30 page-gutter"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <Reveal className="max-w-md lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              <p className="label-caps">Process</p>
            </div>
            <h2
              id="process-heading"
              className="font-heading heading-section mt-6 text-deep"
            >
              {process.heading}
            </h2>
            <div className="mt-10 flex items-end gap-4 border-t border-deep/15 pt-5">
              <span className="font-heading text-6xl leading-none text-accent/80">05</span>
              <span className="pb-1 font-body text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                considered steps
              </span>
            </div>
          </Reveal>

          <div className="relative">
            <span
              className="absolute top-8 bottom-8 left-[1.35rem] w-px bg-accent/35"
              aria-hidden="true"
            />
            <ol className="relative">
              {process.steps.map((step, i) => (
                <Reveal
                  key={step.number}
                  delay={i * 0.06}
                  as="li"
                  className="group border-t border-deep/15 last:border-b"
                >
                  <div className="grid grid-cols-[3rem_1fr] gap-5 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-7 sm:py-9">
                    <span className="relative z-10 mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/60 bg-background shadow-[0_0_0_6px_rgba(246,243,236,0.85)] transition-colors duration-500 group-hover:bg-accent">
                      <span className="font-body text-[0.625rem] tracking-[0.12em] text-accent transition-colors duration-500 group-hover:text-deep">
                        {step.number}
                      </span>
                    </span>
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-heading text-2xl text-deep transition-colors duration-500 group-hover:text-accent sm:text-3xl">
                          {step.title}
                        </h3>
                        <span
                          className="hidden font-body text-lg text-accent/70 transition-transform duration-500 group-hover:translate-x-1 sm:block"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </div>
                      <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-muted sm:text-lg">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
