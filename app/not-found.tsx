import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { siteConfig } from "@/content/site.config";

export default function NotFound() {
  return (
    <SiteShell>
      <main
        id="main"
        className="flex flex-1 flex-col items-start justify-center px-5 py-32 md:px-8"
      >
        <div className="mx-auto w-full max-w-7xl">
          <p className="label-caps mb-4">404</p>
          <h1 className="font-heading text-4xl font-light text-deep md:text-6xl">
            Page not found.
          </h1>
          <p className="mt-5 max-w-md font-body text-muted">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex border border-deep px-6 py-3 font-body text-xs uppercase tracking-[0.16em] text-deep transition-colors hover:border-accent hover:text-accent"
          >
            Back to {siteConfig.company}
          </Link>
        </div>
      </main>
    </SiteShell>
  );
}
