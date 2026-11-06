import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.siteUrl;
  const staticRoutes = ["", "/about", "/services", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  return staticRoutes;
}
