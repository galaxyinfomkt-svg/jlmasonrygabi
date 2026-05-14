import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
import { cities, citiesBySlug } from "@/lib/cities";
import { serviceMeta, serviceMetaBySlug } from "@/lib/service-meta";
import { generateCityService } from "@/lib/content-generator";
import { getServicePhotos } from "@/lib/service-images";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import CityServiceSchema from "@/components/CityServiceSchema";
import LeadConnectorForm from "@/components/LeadConnectorForm";
import QuoteModal from "@/components/QuoteModal";

export function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const c of cities) {
    for (const s of serviceMeta) {
      params.push({ city: c.slug, service: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = citiesBySlug.get(citySlug);
  const svc = serviceMetaBySlug.get(serviceSlug);
  if (!city || !svc) return {};

  const content = generateCityService(city, svc);
  const url = `${site.website}/${city.slug}/${svc.slug}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: ["/assets/hero.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: ["/assets/hero.jpg"],
    },
  };
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = citiesBySlug.get(citySlug);
  const svc = serviceMetaBySlug.get(serviceSlug);
  if (!city || !svc) notFound();

  const c = generateCityService(city, svc);
  const photos = getServicePhotos(svc.slug);
  const url = `${site.website}/${city.slug}/${svc.slug}`;

  // Related services in same city
  const relatedServices = serviceMeta.filter((s) => s.slug !== svc.slug).slice(0, 5);
  // Same service in nearby cities
  const nearbyCities = cities
    .filter((cc) => cc.region === city.region && cc.slug !== city.slug)
    .slice(0, 6);

  return (
    <>
      <CityServiceSchema city={city} service={svc} url={url} />
      <Header />

      <PageBreadcrumb
        items={[
          { label: city.name, href: `/${city.slug}` },
          { label: svc.shortLabel },
        ]}
      />

      {/* Hero with full-bleed service image */}
      <section className="relative isolate overflow-hidden" aria-labelledby="cs-h">
        <div className="absolute inset-0 -z-10">
          <Image
            src={photos.hero.src}
            alt={`${svc.shortLabel} by JL Masonry in ${city.name}, ${city.state}`}
            fill
            sizes="100vw"
            priority
            className="object-cover animate-kenburns"
          />
          <div className="absolute inset-0 bg-[rgba(15,15,15,0.35)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark" />
        </div>
        <div className="container-edge relative pt-12 pb-16 lg:pt-16 lg:pb-24 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
          <div>
            <div className="inline-flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold/15 border border-brand-gold/40 rounded-sm text-[0.7rem] uppercase tracking-[0.2em] font-bold text-brand-gold">
                <MapPin className="h-3.5 w-3.5" />
                {city.name}, {city.state}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-light/10 border border-white/10 rounded-sm text-[0.7rem] uppercase tracking-[0.2em] font-bold text-brand-light/85">
                {svc.shortLabel}
              </span>
            </div>
            <h1
              id="cs-h"
              className="mt-5 font-display text-brand-light tracking-tight text-balance"
              style={{ fontSize: "clamp(2.1rem, 5vw, 4.2rem)", lineHeight: 1.04 }}
            >
              {c.headline}
            </h1>
            <p className="mt-5 text-brand-light/75 text-lg leading-relaxed text-pretty max-w-2xl">
              {c.subheadline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={site.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {site.phone}
              </a>
              <a href="#cs-form" className="btn-ghost">
                Free Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <span className="text-sm text-brand-light/75">
                <span className="font-bold text-brand-light">{site.rating.value}</span> · {site.rating.count}+ Google reviews
              </span>
            </div>
          </div>

          {/* Form */}
          <div id="cs-form" className="relative">
            <div className="bg-brand-light rounded-sm border border-brand-gold/30 shadow-2xl p-5 lg:p-6">
              <div className="absolute -top-3 -left-3 h-12 w-12 bg-brand-gold rounded-sm grid place-items-center text-brand-dark shadow-gold">
                <Star className="h-5 w-5 fill-brand-dark" />
              </div>
              <div className="mb-4">
                <div className="text-[0.65rem] uppercase tracking-[0.22em] text-brand-gold-deep font-bold">
                  Free · No Obligation
                </div>
                <h2 className="mt-1 font-display text-2xl text-brand-dark">
                  Free {svc.shortLabel} Quote — {city.name}
                </h2>
              </div>
              <LeadConnectorForm
                height={500}
                title={`JL Masonry — ${svc.shortLabel} in ${city.name}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY — recent {service} work, contextualized for this city */}
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
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.08 }}
                >
                  Real {svc.searchPhrasePlural} we&apos;ve built around {city.name}
                </h2>
              </div>
              <Link
                href={`/services/${svc.slug}`}
                className="text-sm font-bold text-brand-red hover:text-brand-red-light transition inline-flex items-center gap-2"
              >
                See all {svc.shortLabel.toLowerCase()} work <ArrowRight className="h-4 w-4" />
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
                    <figcaption className="absolute inset-x-0 bottom-0 p-3 lg:p-4">
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

      {/* Body content */}
      <section className="bg-brand-dark py-16 lg:py-24">
        <div className="container-edge grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14">
          <div className="space-y-12">
            {/* Intro */}
            <div>
              <div className="eyebrow">
                <span className="h-px w-9 bg-brand-gold" />
                {svc.shortLabel} in {city.name}, {city.state}
              </div>
              <h2
                className="mt-5 font-display text-brand-light"
                style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", lineHeight: 1.1 }}
              >
                A {svc.shortLabel.toLowerCase()} contractor that knows {city.name}
              </h2>
              <p className="mt-5 text-brand-light/80 text-lg leading-[1.75] text-pretty">
                {c.intro}
              </p>
              <p className="mt-5 text-brand-light/80 text-lg leading-[1.75] text-pretty">
                {c.whyLocal}
              </p>
            </div>

            {/* Problems we solve */}
            <div>
              <h3 className="font-display text-brand-light text-2xl lg:text-3xl">
                Common {svc.shortLabel.toLowerCase()} problems in {city.name}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {c.cityProblems.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 h-6 w-6 rounded-sm bg-brand-gold/15 border border-brand-gold/40 grid place-items-center text-brand-gold shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-brand-light/85 leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials & process */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-brand-dark border border-white/10 rounded-sm">
                <h4 className="font-display text-xl text-brand-light mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-brand-gold" />
                  Materials we use
                </h4>
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
                <h4 className="font-display text-xl text-brand-light mb-4 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-brand-gold" />
                  What we inspect
                </h4>
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

            {/* Process */}
            <div>
              <h3 className="font-display text-brand-light text-2xl lg:text-3xl">
                How we approach a {svc.shortLabel.toLowerCase()} project in {city.name}
              </h3>
              <ol className="mt-5 space-y-4">
                {c.process.map((p, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="shrink-0 h-9 w-9 rounded-full bg-brand-gold text-brand-dark font-bold grid place-items-center text-sm">
                      {i + 1}
                    </span>
                    <span className="text-brand-light/85 leading-relaxed pt-1">
                      {p}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ */}
            {svc.faqs.length > 0 && (
              <div>
                <h3 className="font-display text-brand-light text-2xl lg:text-3xl">
                  {svc.shortLabel} questions, answered
                </h3>
                <dl className="mt-5 space-y-5">
                  {svc.faqs.map((f) => (
                    <div key={f.q} className="p-5 bg-brand-dark border border-white/10 rounded-sm">
                      <dt className="font-display text-lg text-brand-light">
                        {f.q}
                      </dt>
                      <dd className="mt-2 text-brand-light/75 leading-relaxed text-pretty">
                        {f.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Closing pitch */}
            <div className="p-7 lg:p-9 bg-brand-dark border border-brand-gold/30 rounded-sm">
              <h3 className="font-display text-2xl lg:text-3xl text-brand-light">
                Ready to start your {city.name} {svc.shortLabel.toLowerCase()} project?
              </h3>
              <p className="mt-3 text-brand-light/75 leading-relaxed">{c.closingPitch}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={site.phoneHref} className="btn-primary">
                  <Phone className="h-4 w-4" />
                  Call {site.phone}
                </a>
                <a href="#cs-form" className="btn-ghost">
                  Send a Request <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="p-6 bg-brand-dark border border-white/10 rounded-sm">
              <h4 className="font-display text-xl text-brand-light mb-4">
                {svc.shortLabel} at a glance
              </h4>
              <dl className="space-y-3 text-sm">
                <Row icon={Clock} label="Typical duration" value={svc.durationTypical} />
                <Row icon={DollarSign} label="Cost range" value={svc.costRange} />
                <Row icon={BadgeCheck} label="Best season" value={svc.bestSeason} />
                <Row icon={ShieldCheck} label="Lifespan" value={svc.lifespan} />
              </dl>
            </div>

            <div className="p-6 bg-brand-dark border border-white/10 rounded-sm">
              <h4 className="font-display text-xl text-brand-light mb-4">
                Related services in {city.name}
              </h4>
              <ul className="space-y-2">
                {relatedServices.map((rs) => (
                  <li key={rs.slug}>
                    <Link
                      href={`/${city.slug}/${rs.slug}`}
                      className="flex items-center justify-between gap-3 py-2 text-sm text-brand-light/80 hover:text-brand-gold transition group"
                    >
                      <span>{rs.shortLabel} in {city.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {nearbyCities.length > 0 && (
              <div className="p-6 bg-brand-dark border border-white/10 rounded-sm">
                <h4 className="font-display text-xl text-brand-light mb-4">
                  Same service nearby
                </h4>
                <ul className="space-y-2">
                  {nearbyCities.map((nc) => (
                    <li key={nc.slug}>
                      <Link
                        href={`/${nc.slug}/${svc.slug}`}
                        className="flex items-center justify-between gap-3 py-2 text-sm text-brand-light/80 hover:text-brand-gold transition group"
                      >
                        <span>{svc.shortLabel} in {nc.name}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
