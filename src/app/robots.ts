import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteConfig.url
      ? { sitemap: `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml` }
      : {}),
  };
}
