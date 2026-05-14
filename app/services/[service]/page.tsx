import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { cities } from "@/lib/cities";
import { serviceMeta, serviceMetaBySlug } from "@/lib/service-meta";
import { services as servicesData, site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import LeadConnectorForm from "@/components/LeadConnectorForm";
import QuoteModal from "@/components/QuoteModal";

export function generateStaticParams() {
  return serviceMeta.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const svc = serviceMetaBySlug.get(serviceSlug);
  if (!svc) return {};

  const url = `${site.website}/services/${svc.slug}`;
  const title = `${svc.longLabel} in Middlesex County, MA | JL Masonry`;
  const description = `Expert ${svc.searchPhrase} serving Middlesex County, Massachusetts. ${svc.longLabel} built to last. Licensed & insured. Free estimates: ${site.phone}.`;

  return {
    title,
    description,
    keywords: [
      svc.searchPhrase,
      `${svc.searchPhrase} Massachusetts`,
      `${svc.shortLabel.toLowerCase()} contractor MA`,
      `${svc.searchPhrasePlural} Middlesex County`,
      `${svc.shortLabel.toLowerCase()} installation MA`,
      `${svc.shortLabel.toLowerCase()} repair MA`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: ["/assets/hero.jpg"],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: serviceSlug } = await params;
  const svc = serviceMetaBySlug.get(serviceSlug);
  if (!svc) notFound();

  const baseService = servicesData.find((s) => s.slug === svc.slug);
  const url = `${site.website}/services/${svc.slug}`;

  // Top 12 cities for internal linking
  const topCities = cities.slice(0, 12);

  // FAQ JSON-LD
  const faqSchema = svc.faqs.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: svc.longLabel,
    name: svc.longLabel,
    description: `${svc.longLabel} for homeowners and businesses across Middlesex County, Massachusetts.`,
    provider: { "@id": `${site.website}#business` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Middlesex County, Massachusetts",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceSpecification: { "@type": "PriceSpecification", price: svc.costRange },
    },
  };

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />

      <PageBreadcrumb
        items={[
          { label: "Services", href: "/services" },
          { label: svc.shortLabel },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-brand-dark py-14 lg:py-20">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="container-edge relative grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-gold/15 border border-brand-gold/40 rounded-sm text-[0.7rem] uppercase tracking-[0.2em] font-bold text-brand-gold">
              <Wrench className="h-3.5 w-3.5" />
              Service · Middlesex County, MA
            </div>
            <h1
              className="mt-5 font-display text-brand-light tracking-tight text-balance"
              style={{ fontSize: "clamp(2.2rem, 5.2vw, 4.4rem)", lineHeight: 1.04 }}
            >
              {svc.longLabel} in <span className="italic text-brand-gold">Massachusetts</span>
            </h1>
            <p className="mt-5 text-brand-light/75 text-lg leading-relaxed max-w-2xl">
              {baseService?.description || svc.whyNow}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={site.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {site.phone}
              </a>
              <a href="#srv-form" className="btn-ghost">
                Free Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Form */}
          <div id="srv-form" className="relative">
            <div className="bg-brand-light rounded-sm border border-brand-gold/30 shadow-2xl p-5 lg:p-6">
              <div className="absolute -top-3 -left-3 h-12 w-12 bg-brand-gold rounded-sm grid place-items-center text-brand-dark shadow-gold">
                <Star className="h-5 w-5 fill-brand-dark" />
              </div>
              <h2 className="font-display text-2xl text-brand-dark mb-4">
                Free Estimate for {svc.shortLabel}
              </h2>
              <LeadConnectorForm height={500} title={`JL Masonry — ${svc.shortLabel}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="bg-brand-stone py-16 lg:py-24">
        <div className="container-edge grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14">
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-brand-light text-2xl lg:text-3xl">
                Common {svc.shortLabel.toLowerCase()} problems we solve
              </h2>
              <ul className="mt-5 space-y-3.5">
                {svc.problems.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 h-6 w-6 rounded-sm bg-brand-gold/15 border border-brand-gold/40 grid place-items-center text-brand-gold shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-brand-light/85 leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-brand-dark border border-white/10 rounded-sm">
                <h3 className="font-display text-xl text-brand-light mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-brand-gold" />
                  Materials
                </h3>
                <ul className="space-y-2 text-sm text-brand-light/75">
                  {svc.materials.map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-brand-gold shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-brand-dark border border-white/10 rounded-sm">
                <h3 className="font-display text-xl text-brand-light mb-4 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-brand-gold" />
                  What we inspect
                </h3>
                <ul className="space-y-2 text-sm text-brand-light/75">
                  {svc.inspectionPoints.map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-brand-gold shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {svc.faqs.length > 0 && (
              <div>
                <h2 className="font-display text-brand-light text-2xl lg:text-3xl">
                  {svc.shortLabel} FAQ
                </h2>
                <dl className="mt-5 space-y-5">
                  {svc.faqs.map((f) => (
                    <div key={f.q} className="p-5 bg-brand-dark border border-white/10 rounded-sm">
                      <dt className="font-display text-lg text-brand-light">{f.q}</dt>
                      <dd className="mt-2 text-brand-light/75 leading-relaxed">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="p-6 bg-brand-dark border border-white/10 rounded-sm">
              <h3 className="font-display text-xl text-brand-light mb-4">
                {svc.shortLabel} at a glance
              </h3>
              <dl className="space-y-3 text-sm">
                <Row icon={Clock} label="Duration" value={svc.durationTypical} />
                <Row icon={DollarSign} label="Cost range" value={svc.costRange} />
                <Row icon={BadgeCheck} label="Best season" value={svc.bestSeason} />
                <Row icon={ShieldCheck} label="Lifespan" value={svc.lifespan} />
              </dl>
            </div>

            <div className="p-6 bg-brand-dark border border-white/10 rounded-sm">
              <h3 className="font-display text-xl text-brand-light mb-4">
                Available in these cities
              </h3>
              <ul className="space-y-2 text-sm">
                {topCities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}/${svc.slug}`}
                      className="flex items-center justify-between gap-3 py-1.5 text-brand-light/75 hover:text-brand-gold transition group"
                    >
                      <span>{svc.shortLabel} in {c.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-white/5">
                  <Link
                    href="/locations"
                    className="block text-center py-2 text-brand-gold font-bold text-sm hover:text-[#DC4640]"
                  >
                    See all 109 cities →
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
      <QuoteModal />
    </>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 text-brand-gold mt-0.5 shrink-0" />
      <div>
        <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/55 font-bold">
          {label}
        </dt>
        <dd className="text-brand-light/90 mt-0.5">{value}</dd>
      </div>
    </div>
  );
}
