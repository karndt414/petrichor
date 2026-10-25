import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    ...(siteConfig.url ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: `${title} | Petrichor`,
      description,
      url: siteConfig.url ? `${siteConfig.url}${path}` : undefined,
      siteName: "Petrichor",
      type: "website",
      images: [
        {
          url: "/images/social-card.jpg",
          width: 1200,
          height: 630,
          alt: "Petrichor — Indie / Alternative rock",
        },
      ],
    },
  };
}
