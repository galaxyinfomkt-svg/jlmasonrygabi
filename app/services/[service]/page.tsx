import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { cities } from "@/lib/cities";
import { serviceMeta, serviceMetaBySlug } from "@/lib/service-meta";
import { getServicePhotos } from "@/lib/service-images";
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

  const photos = getServicePhotos(svc.slug);
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
      images: [photos.hero.src],
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
  const photos = getServicePhotos(svc.slug);

  const topCities = cities.slice(0, 12);

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
    image: photos.gallery.map((g) => `${site.website}${g.src}`),
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

      {/* HERO — homepage style */}
      <section
        className="relative min-h-[100svh] overflow-hidden bg-brand-dark isolate"
        aria-labelledby="srv-h"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover animate-kenburns"
          />
          <div className="absolute inset-0 bg-[rgba(15,15,15,0.35)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark" />
        </div>

        <div className="container-edge relative pt-28 pb-16 lg:pt-36 lg:pb-24 min-h-[100svh] flex flex-col justify-center">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex flex-wrap items-center gap-2 bg-brand-red/15 border border-brand-red/40 px-4 py-2 rounded-sm backdrop-blur-sm">
                <span className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-brand-red">
                  <BadgeCheck className="h-3.5 w-3.5" /> Free Estimates
                </span>
                <span className="h-3 w-px bg-brand-red/40" />
                <span className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-brand-red">
                  <ShieldCheck className="h-3.5 w-3.5" /> Licensed
                </span>
                <span className="h-3 w-px bg-brand-red/40" />
                <span className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-brand-red">
                  <MapPin className="h-3.5 w-3.5" /> Middlesex County
                </span>
              </div>

              <h1
                id="srv-h"
                className="mt-6 font-display font-semibold text-brand-light tracking-[-0.025em] text-balance"
                style={{ fontSize: "clamp(2.1rem, 4.6vw, 4.4rem)", lineHeight: 1.02 }}
              >
                {svc.longLabel} in{" "}
                <span className="italic text-brand-red font-medium">
                  Massachusetts
                </span>
              </h1>

              <p className="mt-6 text-base lg:text-lg text-brand-light/80 leading-relaxed text-pretty max-w-xl">
                {baseService?.description || svc.whyNow}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href={site.phoneHref} className="btn-primary">
                  <Phone className="h-4 w-4" />
                  Call {site.phone}
                </a>
                <a href="#srv-form" className="btn-ghost">
                  Get Free Quote <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Rating row */}
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-brand-red text-brand-red" />
                    ))}
                  </div>
                  <span className="text-sm text-brand-light/85">
                    <span className="font-bold text-brand-light">{site.rating.value}</span> ·{" "}
                    {site.rating.count}+ Google reviews
                  </span>
                </div>
                <span className="hidden sm:inline h-4 w-px bg-white/20" />
                <span className="text-xs text-brand-light/65">
                  No deposit · No pressure
                </span>
              </div>
            </div>

            {/* RIGHT: Form card */}
            <div
              id="srv-form"
              className="relative w-full max-w-md lg:max-w-none mx-auto"
            >
              <div className="absolute -top-3 -left-3 lg:-top-4 lg:-left-4 h-12 w-12 lg:h-14 lg:w-14 bg-brand-red rounded-sm grid place-items-center text-white shadow-red z-10">
                <Star className="h-5 w-5 lg:h-6 lg:w-6 fill-white" />
              </div>
              <div className="relative bg-brand-light rounded-sm border border-brand-red/30 shadow-2xl p-5 lg:p-6 backdrop-blur-md">
                <div className="mb-4">
                  <div className="text-[0.65rem] uppercase tracking-[0.22em] text-brand-red-deep font-bold">
                    Free · No Obligation
                  </div>
                  <h2 className="mt-1 font-display text-2xl lg:text-[1.75rem] text-brand-dark leading-tight">
                    Request a Free Estimate
                  </h2>
                  <p className="mt-1.5 text-xs lg:text-sm text-brand-gray">
                    Takes 60 seconds. We reply within one business day.
                  </p>
                </div>
                <LeadConnectorForm
                  height={500}
                  title={`JL Masonry — ${svc.shortLabel}`}
                />
                <div className="mt-4 pt-4 border-t border-brand-dark/10 flex items-center justify-between gap-3 text-xs">
                  <span className="text-brand-gray">Prefer to call?</span>
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-1.5 text-brand-dark hover:text-brand-red-deep font-bold transition"
                  >
                    <Phone className="h-3.5 w-3.5 text-brand-red-deep" />
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY — recent {service} work */}
      {photos.gallery.length > 0 && (
        <section className="bg-brand-stone py-14 lg:py-20">
          <div className="container-edge">
            <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-bold text-brand-red">
                  <Camera className="h-3.5 w-3.5" />
                  Recent {svc.shortLabel} Work
                </div>
                <h2
                  className="mt-3 font-display text-brand-light"
                  style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)", lineHeight: 1.08 }}
                >
                  Real {svc.searchPhrasePlural} we&apos;ve built in Massachusetts
                </h2>
              </div>
              <Link
                href="/#gallery"
                className="text-sm font-bold text-brand-red hover:text-brand-red-light transition inline-flex items-center gap-2"
              >
                See full portfolio <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {photos.gallery.map((g, i) => (
                <figure
                  key={g.src + i}
                  className={`group relative overflow-hidden rounded-sm bg-brand-dark border border-white/5 hover:border-brand-red/60 transition-all duration-500 ${
                    i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-square"
                  }`}
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent opacity-70 group-hover:opacity-90 transition" />
                  {g.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 p-3 lg:p-4 translate-y-1 group-hover:translate-y-0 transition">
                      <div className="text-[0.6rem] uppercase tracking-[0.2em] text-brand-red font-bold mb-1">
                        JL Masonry
                      </div>
                      <div className="text-xs lg:text-sm font-semibold text-brand-light leading-snug line-clamp-2">
                        {g.caption}
                      </div>
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DETAIL */}
      <section className="bg-brand-dark py-16 lg:py-24">
        <div className="container-edge grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14">
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-brand-light text-2xl lg:text-3xl">
                Common {svc.shortLabel.toLowerCase()} problems we solve
              </h2>
              <ul className="mt-5 space-y-3.5">
                {svc.problems.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 h-6 w-6 rounded-sm bg-brand-red/15 border border-brand-red/40 grid place-items-center text-brand-red shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-brand-light/85 leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inline image between sections */}
            {photos.gallery.length > 1 && (
              <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-white/10">
                <Image
                  src={photos.gallery[1].src}
                  alt={photos.gallery[1].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover hover:scale-105 transition-transform duration-[1500ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
                {photos.gallery[1].caption && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[0.6rem] uppercase tracking-[0.22em] font-bold text-brand-red mb-1">
                      Recent project
                    </div>
                    <div className="font-display text-xl lg:text-2xl text-brand-light">
                      {photos.gallery[1].caption}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-brand-stone border border-white/10 rounded-sm">
                <h3 className="font-display text-xl text-brand-light mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-brand-red" />
                  Materials
                </h3>
                <ul className="space-y-2 text-sm text-brand-light/75">
                  {svc.materials.map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-brand-red shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-brand-stone border border-white/10 rounded-sm">
                <h3 className="font-display text-xl text-brand-light mb-4 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-brand-red" />
                  What we inspect
                </h3>
                <ul className="space-y-2 text-sm text-brand-light/75">
                  {svc.inspectionPoints.map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-brand-red shrink-0" />
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
                    <div key={f.q} className="p-5 bg-brand-stone border border-white/10 rounded-sm">
                      <dt className="font-display text-lg text-brand-light">{f.q}</dt>
                      <dd className="mt-2 text-brand-light/75 leading-relaxed">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="p-6 bg-brand-stone border border-white/10 rounded-sm">
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

            {/* Sidebar image */}
            {photos.gallery.length > 2 && (
              <div className="relative aspect-square rounded-sm overflow-hidden border border-white/10">
                <Image
                  src={photos.gallery[2].src}
                  alt={photos.gallery[2].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover hover:scale-105 transition-transform duration-[1500ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                {photos.gallery[2].caption && (
                  <div className="absolute bottom-3 left-3 right-3 text-brand-light text-sm font-semibold">
                    {photos.gallery[2].caption}
                  </div>
                )}
              </div>
            )}

            <div className="p-6 bg-brand-stone border border-white/10 rounded-sm">
              <h3 className="font-display text-xl text-brand-light mb-4">
                Available in these cities
              </h3>
              <ul className="space-y-2 text-sm">
                {topCities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}/${svc.slug}`}
                      className="flex items-center justify-between gap-3 py-1.5 text-brand-light/75 hover:text-brand-red transition group"
                    >
                      <span>{svc.shortLabel} in {c.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-white/5">
                  <Link
                    href="/locations"
                    className="block text-center py-2 text-brand-red font-bold text-sm hover:text-brand-red-light"
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
      <Icon className="h-4 w-4 text-brand-red mt-0.5 shrink-0" />
      <div>
        <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/55 font-bold">
          {label}
        </dt>
        <dd className="text-brand-light/90 mt-0.5">{value}</dd>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="p-3 bg-brand-dark/70 border border-white/10 rounded-sm backdrop-blur-md">
      <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-brand-red font-bold">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-brand-light leading-tight">
        {value}
      </div>
    </div>
  );
}
