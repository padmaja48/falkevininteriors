import Image from "next/image";
import type { Project } from "@/content/projects";
import { images } from "@/content/images";
import { formatIndex, cn } from "@/lib/utils";
import {
  ImageReveal,
  type ImageRevealDirection,
} from "@/components/ImageReveal";

type ProjectCardProps = {
  project: Project;
  index?: number;
  className?: string;
  aspect?: string;
  showIndex?: boolean;
  revealDelay?: number;
  revealDirection?: ImageRevealDirection;
};

export function ProjectCard({
  project,
  index,
  className,
  aspect = "aspect-[4/5]",
  showIndex = false,
  revealDelay = 0,
  revealDirection = "up",
}: ProjectCardProps) {
  const img =
    images.projects[project.slug as keyof typeof images.projects]?.cover;

  if (!img) return null;

  return (
    <article className={cn("group", className)}>
      <div className="block">
        <ImageReveal
          variant="mask"
          delay={revealDelay}
          direction={revealDirection}
          className={cn("relative overflow-hidden bg-secondary", aspect)}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
            className="img-zoom object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep/55 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="font-heading text-2xl text-white">{project.title}</p>
            <p className="mt-1 font-body text-xs uppercase tracking-[0.14em] text-white/80">
              {project.location}
            </p>
          </div>
        </ImageReveal>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            {showIndex && typeof index === "number" && (
              <span className="label-caps mr-3 inline-block">
                {formatIndex(index)}
              </span>
            )}
            <h3 className="font-heading text-xl text-deep md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 font-body text-sm text-muted">
              {project.location} · {project.categoryLabel}
            </p>
          </div>
          <p className="shrink-0 font-body text-xs text-muted">{project.year}</p>
        </div>
      </div>
    </article>
  );
}
