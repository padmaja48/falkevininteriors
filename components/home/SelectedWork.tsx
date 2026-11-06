import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { CTA } from "@/components/CTA";
import { homeContent } from "@/content/home";
import { getFeaturedProjects } from "@/content/projects";
import type { ImageRevealDirection } from "@/components/ImageReveal";
import { cn } from "@/lib/utils";

const layouts = [
  "md:col-span-7 md:mt-0",
  "md:col-span-5 md:mt-16",
  "md:col-span-5 md:mt-0",
  "md:col-span-7 md:mt-20",
  "md:col-span-8 md:col-start-3 md:mt-8",
];

/** Mobile editorial stack: full / offset alternating */
const mobileLayouts = [
  "w-full max-w-full",
  "ml-0 w-[min(100%,22rem)] max-w-full sm:w-[85%] md:ml-0 md:w-auto",
  "ml-auto w-[min(100%,22rem)] max-w-full sm:w-[85%] md:ml-0 md:w-auto",
  "w-full max-w-full",
  "ml-0 w-[min(100%,24rem)] max-w-full sm:w-[90%] md:ml-0 md:w-auto",
];

const aspects = [
  "aspect-[16/9] md:aspect-[21/10]",
  "aspect-[16/9] md:aspect-[2/1]",
  "aspect-[16/9] md:aspect-[21/10]",
  "aspect-[16/9] md:aspect-[2/1]",
  "aspect-[16/9] md:aspect-[21/9]",
];

const directions: ImageRevealDirection[] = ["up", "left", "right", "up", "left"];

export function SelectedWork() {
  const projects = getFeaturedProjects();
  const { selectedWork } = homeContent;

  return (
    <section
      className="section-pad bg-background page-gutter"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="label-caps mb-4">{selectedWork.label}</p>
          <h2
            id="work-heading"
            className="font-heading heading-section text-deep"
          >
            {selectedWork.heading}
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-muted md:text-lg">
            {selectedWork.subheading}
          </p>
        </Reveal>

        <div className="flex flex-col gap-10 md:grid md:grid-cols-12 md:gap-8">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={cn(
                mobileLayouts[i] ?? "w-full",
                layouts[i] ?? "md:col-span-6"
              )}
            >
              <ProjectCard
                project={project}
                index={i + 1}
                showIndex
                aspect={aspects[i]}
                revealDelay={i * 0.1}
                revealDirection={directions[i] ?? "up"}
              />
            </div>
          ))}
        </div>

        <Reveal className="mt-14 text-center md:mt-20">
          <CTA href={selectedWork.ctaHref} variant="ghost">
            {selectedWork.cta} →
          </CTA>
        </Reveal>
      </div>
    </section>
  );
}
