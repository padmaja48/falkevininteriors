import Image from "next/image";
import { images } from "@/content/images";
import { siteConfig } from "@/content/site.config";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  tone?: "dark" | "light";
  size?: "nav" | "footer" | "hero";
};

const sizeClass = {
  nav: "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14",
  footer: "h-20 w-20 sm:h-[5.5rem] sm:w-[5.5rem] md:h-28 md:w-28",
  hero: "h-20 w-20 sm:h-32 sm:w-32 md:h-40 md:w-40",
} as const;

export function BrandLogo({
  className,
  priority = false,
  size = "nav",
}: BrandLogoProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.22)] ring-1 ring-deep/15",
        sizeClass[size],
        className
      )}
    >
      <Image
        src={images.logo.src}
        alt={images.logo.alt}
        width={640}
        height={640}
        priority={priority}
        className="h-full w-full object-cover"
        title={siteConfig.company}
      />
    </span>
  );
}
