"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import {
  projectFilters,
  projects,
  type ProjectCategory,
} from "@/content/projects";

export function ProjectFilters() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]["id"]>("all");
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === (filter as ProjectCategory));
  }, [filter]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 border-b border-deep/10 pb-6"
        role="tablist"
        aria-label="Filter projects"
      >
        {projectFilters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={`min-h-11 px-4 py-2 font-body text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                active
                  ? "bg-deep text-white"
                  : "border border-deep/15 text-deep hover:border-accent hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <LayoutGroup>
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.03 }}
              >
                <ProjectCard
                  project={project}
                  revealDelay={(i % 6) * 0.08}
                  revealDirection={
                    i % 3 === 1 ? "left" : i % 3 === 2 ? "right" : "up"
                  }
                  aspect={
                    i % 3 === 1
                      ? "aspect-[4/5]"
                      : i % 3 === 2
                        ? "aspect-square"
                        : "aspect-[5/4]"
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {filtered.length === 0 && (
        <p className="mt-16 font-body text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}
