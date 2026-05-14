import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Award, BadgeCheck, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { cities, citiesBySlug } from "@/lib/cities";
import { generateCityOverview } from "@/lib/content-generator";
import { serviceMeta } from "@/lib/service-meta";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import CityServiceSchema from "@/components/CityServiceSchema";
import LeadConnectorForm from "@/components/LeadConnectorForm";
import QuoteModal from "@/components/QuoteModal";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = citiesBySlug.get(citySlug);
  if (!city) return {};

  const ctx = generateCityOverview(city);
  const url = `${site.website}/${city.slug}`;

  return {
    title: ctx.metaTitle,
    description: ctx.metaDescription,
    keywords: ctx.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: ctx.metaTitle,
      description: ctx.metaDescription,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: ["/assets/hero.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: ctx.metaTitle,
      description: ctx.metaDescription,
      images: ["/assets/hero.jpg"],
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = citiesBySlug.get(citySlug);
  if (!city) notFound();

  const ctx = generateCityOverview(city);
  const url = `${site.website}/${city.slug}`;

  // Find sibling cities in same region for internal linking
  const nearby = cities
    .filter((c) => c.region === city.region && c.slug !== city.slug)
    .slice(0, 6);

  return (
    <>
      <CityServiceSchema city={city} url={url} />
      <Header />

      <PageBreadcrumb
        items={[
          { label: "Locations", href: "/locations" },
          { label: `${city.name}, ${city.state}` },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-brand-dark py-16 lg:py-24" aria-labelledby="city-h">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="container-edge relative grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-gold/15 border border-brand-gold/40 rounded-sm text-[0.7rem] uppercase tracking-[0.2em] font-bold text-brand-gold">
              <MapPin className="h-3.5 w-3.5" />
              {city.region} · {city.county} County
            </div>
            <h1
              id="city-h"
              className="mt-5 font-display text-brand-light tracking-tight text-balance"
              style={{ fontSize: "clamp(2.2rem, 5.2vw, 4.4rem)", lineHeight: 1.04 }}
            >
              {ctx.headline}
            </h1>
            <p className="mt-5 text-brand-light/75 text-lg leading-relaxed text-pretty max-w-2xl">
              {ctx.subheadline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={site.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {site.phone}
              </a>
              <a href="#contact" className="btn-ghost">
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <span className="text-sm text-brand-light/75">
                <span className="font-bold text-brand-light">{site.rating.value}</span> ·{" "}
                {site.rating.count}+ verified Google reviews
              </span>
            </div>
          </div>

          {/* Form */}
          <div id="contact" className="relative">
            <div className="bg-brand-light rounded-sm border border-brand-gold/30 shadow-2xl p-5 lg:p-6">
              <div className="absolute -top-3 -left-3 h-12 w-12 bg-brand-gold rounded-sm grid place-items-center text-brand-dark shadow-gold">
                <Star className="h-5 w-5 fill-brand-dark" />
              </div>
              <div className="mb-4">
                <div className="text-[0.65rem] uppercase tracking-[0.22em] text-brand-gold-deep font-bold">
                  Free · No Obligation
                </div>
                <h2 className="mt-1 font-display text-2xl text-brand-dark">
                  Get a Free Estimate for Your {city.name} Project
                </h2>
              </div>
              <LeadConnectorForm height={500} title={`JL Masonry — ${city.name} Quote`} />
            </div>
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="bg-brand-stone py-16 lg:py-24">
        <div className="container-edge grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <div className="eyebrow">
              <span className="h-px w-9 bg-brand-gold" />
              Why {city.name} Homeowners Choose Us
            </div>
            <h2
              className="mt-5 font-display text-brand-light"
              style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", lineHeight: 1.1 }}
            >
              Masonry that fits {city.name}'s character
            </h2>
            <div className="mt-5 space-y-4 text-brand-light/75 text-lg leading-relaxed">
              <p>{ctx.intro}</p>
              <p>{ctx.localContext}</p>
            </div>
          </div>
          <div className="bg-brand-dark border border-white/10 rounded-sm p-6 lg:p-8">
            <h3 className="font-display text-2xl text-brand-light mb-5">
              {city.name} at a Glance
            </h3>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="text-brand-light/55 uppercase tracking-[0.15em] text-[0.65rem] font-semibold">
                  Region
                </dt>
                <dd className="text-brand-light mt-1">{city.region}</dd>
              </div>
              <div>
                <dt className="text-brand-light/55 uppercase tracking-[0.15em] text-[0.65rem] font-semibold">
                  County
                </dt>
                <dd className="text-brand-light mt-1">{city.county} County</dd>
              </div>
              <div>
                <dt className="text-brand-light/55 uppercase tracking-[0.15em] text-[0.65rem] font-semibold">
                  ZIP
                </dt>
                <dd className="text-brand-light mt-1">{city.zip}</dd>
              </div>
              <div>
                <dt className="text-brand-light/55 uppercase tracking-[0.15em] text-[0.65rem] font-semibold">
                  Population
                </dt>
                <dd className="text-brand-light mt-1">{city.population}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-brand-light/55 uppercase tracking-[0.15em] text-[0.65rem] font-semibold">
                  Neighborhoods we serve
                </dt>
                <dd className="text-brand-light mt-1">
                  {city.neighborhoods.join(" · ")}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-brand-light/55 uppercase tracking-[0.15em] text-[0.65rem] font-semibold">
                  Local conditions
                </dt>
                <dd className="text-brand-light/85 mt-1">{city.soilNote}. {city.climateNote}.</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-brand-light/55 uppercase tracking-[0.15em] text-[0.65rem] font-semibold">
                  Architecture
                </dt>
                <dd className="text-brand-light/85 mt-1">{city.architectureStyle}</dd>
              </div>
            </dl>
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: BadgeCheck, label: "MA HIC" },
                { icon: ShieldCheck, label: "Insured" },
                { icon: Award, label: "15+ yrs" },
              ].map(({ icon: Icon, label }) => (
                <div key={label}>
                  <Icon className="h-5 w-5 text-brand-gold mx-auto" />
                  <div className="text-[0.65rem] uppercase tracking-[0.15em] text-brand-light/70 mt-1.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services for this city */}
      <section className="bg-brand-dark py-16 lg:py-24" aria-labelledby="services-h">
        <div className="container-edge">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="eyebrow justify-center">
              <span className="h-px w-9 bg-brand-gold" />
              Services Available in {city.name}
              <span className="h-px w-9 bg-brand-gold" />
            </div>
            <h2
              id="services-h"
              className="mt-5 font-display text-brand-light tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)", lineHeight: 1.05 }}
            >
              What we build in <span className="italic text-brand-gold">{city.name}</span>
            </h2>
            <p className="mt-5 text-brand-light/65 text-lg leading-relaxed">
              Click any service to see how we approach it for {city.name} properties specifically.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceMeta.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${city.slug}/${s.slug}`}
                  className="group block p-6 bg-brand-stone border border-white/10 hover:border-brand-gold rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-warm h-full"
                >
                  <h3 className="font-display text-xl text-brand-light group-hover:text-brand-gold transition-colors">
                    {s.longLabel} in {city.name}
                  </h3>
                  <p className="mt-3 text-sm text-brand-light/65 line-clamp-2">
                    {s.problems[0]}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-brand-gold font-bold">
                    See {city.name} details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nearby cities */}
      {nearby.length > 0 && (
        <section className="bg-brand-stone py-16 lg:py-20">
          <div className="container-edge">
            <div className="eyebrow">
              <span className="h-px w-9 bg-brand-gold" />
              Also serving nearby
            </div>
            <h2 className="mt-4 font-display text-brand-light text-2xl lg:text-3xl">
              Other {city.region} cities we work in
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {nearby.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-dark border border-white/10 hover:border-brand-gold hover:text-brand-gold text-brand-light/85 rounded-sm text-sm transition"
                  >
                    {c.name}, {c.state}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-gold text-brand-dark rounded-sm text-sm font-bold hover:bg-[#E0B864] transition"
                >
                  See all 109 cities →
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      <Footer />
      <QuoteModal />
    </>
  );
}
