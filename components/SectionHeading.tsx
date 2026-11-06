import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
  light?: boolean;
};

export function SectionHeading({
  label,
  heading,
  subheading,
  align = "left",
  className,
  as: Tag = "h2",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        "max-w-3xl",
        align === "center" && "mx-auto",
        className
      )}
    >
      {label && (
        <p className={cn("label-caps mb-4", light && "text-accent")}>{label}</p>
      )}
      <Tag
        className={cn(
          "font-heading text-3xl font-light leading-[1.15] tracking-tight md:text-5xl lg:text-[3.25rem]",
          light ? "text-white" : "text-deep"
        )}
      >
        {heading}
      </Tag>
      {subheading && (
        <p
          className={cn(
            "mt-5 font-body text-base leading-relaxed md:text-lg",
            light ? "text-white/80" : "text-muted"
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
