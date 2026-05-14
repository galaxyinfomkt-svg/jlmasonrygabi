import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import QuoteModal from "@/components/QuoteModal";
import { serviceMeta } from "@/lib/service-meta";
import { services as servicesData } from "@/lib/site";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Masonry Services — Patios, Stone Walls, Chimneys & More | JL Masonry",
  description:
    "Complete masonry services in Middlesex County, MA. Patios, stone walls, walkways, chimneys, retaining walls, sidewalks, residential & commercial. Free estimates: (617) 913-9845.",
  keywords: [
    "masonry services Massachusetts",
    "masonry contractor Middlesex County",
    "patios stone walls walkways chimneys",
    "residential masonry MA",
    "commercial masonry MA",
    "hardscape contractor",
  ],
  alternates: { canonical: `${site.website}/services` },
};

export default function ServicesIndexPage() {
  return (
    <>
      <Header />
      <PageBreadcrumb items={[{ label: "Services" }]} />

      <section className="bg-brand-dark py-12 lg:py-20">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <div className="eyebrow justify-center">
            <span className="h-px w-9 bg-brand-gold" />
            All Masonry Services
            <span className="h-px w-9 bg-brand-gold" />
          </div>
          <h1
            className="mt-5 font-display text-brand-light tracking-tight text-balance"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.04 }}
          >
            Every masonry service we offer — <span className="italic text-brand-gold">across Middlesex County</span>
          </h1>
          <p className="mt-5 text-brand-light/70 text-lg leading-relaxed text-pretty">
            From hand-laid stone walls to full property hardscape, every service
            we offer is built by the same crew on the same uncompromising
            standard.
          </p>
        </div>
      </section>

      <section className="bg-brand-stone py-16 lg:py-24">
        <div className="container-edge">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesData.map((svc) => {
              const meta = serviceMeta.find((s) => s.slug === svc.slug);
              return (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="group block bg-brand-dark border border-white/10 hover:border-brand-gold rounded-sm overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-warm"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden bg-brand-stone">
                      <Image
                        src={svc.image}
                        alt={`${svc.title} by JL Masonry`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h2 className="font-display text-2xl text-brand-light group-hover:text-brand-gold transition-colors">
                        {svc.title}
                      </h2>
                      <p className="mt-3 text-sm text-brand-light/65 leading-relaxed">
                        {svc.description}
                      </p>
                      {meta && (
                        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-brand-light/55 space-y-1">
                          <div>
                            <span className="text-brand-light/85 font-medium">Cost:</span>{" "}
                            {meta.costRange}
                          </div>
                          <div>
                            <span className="text-brand-light/85 font-medium">Duration:</span>{" "}
                            {meta.durationTypical}
                          </div>
                        </div>
                      )}
                      <div className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-brand-gold font-bold">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Footer />
      <QuoteModal />
    </>
  );
}
