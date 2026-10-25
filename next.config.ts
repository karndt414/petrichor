import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set STATIC_EXPORT=1 only when publishing to a static host.
  ...(process.env.STATIC_EXPORT === "1"
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  poweredByHeader: false,
};

export default nextConfig;
