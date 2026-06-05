import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"], // narrowed from 5 weights → 2 (~60% fewer font bytes)
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // narrowed from 6 weights → 3
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.website),
  title:
    "Masonry Contractor in Woburn MA | Patios, Stone Walls & Chimneys | JL Masonry",
  description:
    "JL Masonry & Construction offers expert masonry services in Woburn, MA — patios, stone walls, walkways, chimneys, and hardscaping. Free estimates. Call (617) 913-9845!",
  keywords: [
    "masonry contractor Woburn MA",
    "patios stone walls Woburn Massachusetts",
    "masonry contractor Eastern Massachusetts",
    "walkway construction Middlesex County",
    "chimney repair Woburn MA",
    "custom masonry near me",
    "hardscape contractor MA",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    title: "JL Masonry & Construction — Woburn, MA",
    description: "Expert masonry services in Woburn, MA. Free estimates.",
    type: "website",
    locale: "en_US",
    url: site.website,
    siteName: site.name,
    images: ["/assets/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JL Masonry & Construction — Woburn, MA",
    description: "Expert masonry services in Woburn, MA. Free estimates.",
    images: ["/assets/hero.jpg"],
  },
  alternates: { canonical: site.website },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: { icon: "/assets/logo.png", apple: "/assets/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#0F0F0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-brand-dark text-brand-light">
        {children}
        {/* form_embed.js is only needed once the deferred iframe is mounted —
            lazyOnload pushes it off the critical path. The LeadConnectorForm
            component lazy-mounts the iframe on first user interaction / scroll. */}
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
