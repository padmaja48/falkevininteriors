import Link from "next/link";
import { cn } from "@/lib/utils";

type CTAProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost" | "light-outline" | "light-solid";
  className?: string;
  external?: boolean;
};

export function CTA({
  href,
  children,
  variant = "outline",
  className,
  external,
}: CTAProps) {
  const styles: Record<NonNullable<CTAProps["variant"]>, string> = {
    solid:
      "bg-deep text-white border border-deep hover:bg-transparent hover:text-deep",
    outline:
      "border border-deep text-deep hover:border-accent hover:text-accent bg-transparent",
    ghost:
      "text-deep underline decoration-accent/50 underline-offset-4 hover:text-accent hover:decoration-accent",
    "light-outline":
      "border border-white/80 text-white hover:bg-white/10 bg-transparent",
    "light-solid":
      "bg-white text-deep border border-white hover:bg-transparent hover:text-white",
  };

  const classes = cn(
    "inline-flex min-h-12 items-center justify-center px-6 py-3 font-body text-[0.6875rem] uppercase tracking-[0.16em] transition-colors duration-500",
    styles[variant],
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
