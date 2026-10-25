import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  return ["/", "/music", "/shows", "/about", "/contact"].map((path) => ({
    url: `${siteConfig.url.replace(/\/$/, "")}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
