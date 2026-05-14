import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import QuoteModal from "@/components/QuoteModal";
import { cities, citiesByRegion, type CityRegion } from "@/lib/cities";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas — Cities We Serve in Massachusetts | JL Masonry",
  description: `JL Masonry serves ${cities.length}+ Massachusetts cities across Greater Boston, MetroWest, South Suburban, North Shore, and Central MA. Find your city.`,
  keywords: [
    "masonry contractor Massachusetts service areas",
    "Middlesex County masonry",
    "Norfolk County masonry",
    "Worcester County masonry",
    "Essex County masonry",
    "MetroWest masonry contractor",
  ],
  alternates: { canonical: `${site.website}/locations` },
};

export default function LocationsPage() {
  const grouped = citiesByRegion();
  const regionOrder: CityRegion[] = [
    "Greater Boston",
    "MetroWest",
    "South Suburban",
    "North Shore",
    "Central MA",
  ];

  return (
    <>
      <Header />
      <PageBreadcrumb items={[{ label: "Service Areas" }]} />

      <section className="bg-brand-dark py-12 lg:py-20">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <div className="eyebrow justify-center">
            <span className="h-px w-9 bg-brand-gold" />
            Service Areas
            <span className="h-px w-9 bg-brand-gold" />
          </div>
          <h1
            className="mt-5 font-display text-brand-light tracking-tight text-balance"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.04 }}
          >
            We serve <span className="italic text-brand-gold">{cities.length}+ Massachusetts cities</span>
          </h1>
          <p className="mt-5 text-brand-light/70 text-lg leading-relaxed text-pretty">
            From our base in Woburn we reach Greater Boston, MetroWest, South
            Suburban, North Shore, and Central Massachusetts — usually within
            48 hours of your first call.
          </p>
        </div>
      </section>

      <section className="bg-brand-stone py-16 lg:py-24">
        <div className="container-edge space-y-14">
          {regionOrder.map((region) => (
            <div key={region}>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-5 w-5 text-brand-gold" />
                <h2 className="font-display text-2xl lg:text-3xl text-brand-light">
                  {region}
                </h2>
                <span className="text-xs uppercase tracking-[0.2em] text-brand-light/55 font-bold">
                  {grouped[region].length} cities
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {grouped[region]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        className="block px-4 py-2.5 bg-brand-dark border border-white/10 hover:border-brand-gold rounded-sm text-sm text-brand-light/85 hover:text-brand-gold transition"
                      >
                        {c.name}, {c.state}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <QuoteModal />
    </>
  );
}
