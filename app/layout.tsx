import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
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
  themeColor: "#1C1C1C",
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
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
