import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url || "http://localhost:3000"),
  title: {
    default: "Petrichor | Indie / Alternative Rock",
    template: "%s | Petrichor",
  },
  description: siteConfig.description,
  applicationName: "Petrichor",
  openGraph: {
    title: "Petrichor",
    description: siteConfig.description,
    siteName: "Petrichor",
    locale: "en_US",
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
  twitter: {
    card: "summary_large_image",
    title: "Petrichor",
    description: siteConfig.description,
    images: ["/images/social-card.jpg"],
  },
  ...(siteConfig.url ? { alternates: { canonical: "/" } } : {}),
};
export const viewport: Viewport = {
  themeColor: "#0e1020",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
