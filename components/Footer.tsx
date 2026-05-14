import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Facebook, Instagram, Phone, Star } from "lucide-react";
import { citiesByRegion, type CityRegion } from "@/lib/cities";
import { serviceMeta } from "@/lib/service-meta";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const grouped = citiesByRegion();
  const regionOrder: CityRegion[] = [
    "Greater Boston",
    "MetroWest",
    "South Suburban",
    "North Shore",
    "Central MA",
  ];

  return (
    <footer className="relative bg-brand-stone border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="relative container-edge py-14 lg:py-20">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-10 lg:gap-12">
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
              <div className="relative h-14 w-14">
                <Image src="/assets/logo.png" alt={`${site.name} logo`} fill sizes="56px" className="object-contain" />
              </div>
              <div>
                <div className="font-display text-xl text-brand-light leading-tight">JL Masonry</div>
                <div className="text-[0.6rem] tracking-[0.3em] uppercase text-brand-gold font-semibold">&amp; Construction</div>
              </div>
            </Link>
            <p className="mt-5 italic font-display text-brand-light/80 text-lg max-w-sm leading-snug">
              {site.tagline}
            </p>
            <p className="mt-4 text-brand-light/60 text-sm leading-relaxed max-w-sm">
              Locally owned, fully insured, and proudly serving 109+ Massachusetts cities.
            </p>

            <a
              href={site.social.review}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 p-3 bg-brand-dark border border-white/10 rounded-sm hover:border-brand-gold/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <div className="text-sm">
                <div className="text-brand-light font-bold leading-tight">
                  {site.rating.value} on Google
                </div>
                <div className="text-brand-light/55 text-xs">{site.rating.count}+ verified reviews</div>
              </div>
            </a>
          </div>

          <div>
            <h3 className="font-display text-brand-light text-lg mb-5">Services</h3>
            <ul className="space-y-2.5 text-sm text-brand-light/65">
              {serviceMeta.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-brand-gold transition relative group inline-block"
                  >
                    {s.shortLabel}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-brand-gold font-bold hover:text-[#E0B864] transition"
                >
                  All services →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-brand-light text-lg mb-5">Explore</h3>
            <ul className="space-y-2.5 text-sm text-brand-light/65">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About" },
                { href: "/services", label: "All Services" },
                { href: "/locations", label: "Service Areas" },
                { href: "/#gallery", label: "Gallery" },
                { href: "/#testimonials", label: "Reviews" },
                { href: "/#faq", label: "FAQ" },
                { href: "/#contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-brand-gold transition relative group inline-block"
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-brand-light text-lg mb-5">Contact</h3>
            <ul className="space-y-4 text-sm text-brand-light/70">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 text-brand-light hover:text-brand-gold transition font-semibold"
                >
                  <Phone className="h-4 w-4 text-brand-gold" /> {site.phone}
                </a>
              </li>
              <li className="text-brand-light/65">
                {site.address.city}, {site.address.region}
                <br />
                <span className="text-brand-light/50">
                  Serving all of {site.address.serviceArea}
                </span>
              </li>
              <li className="text-brand-light/65">
                <span className="text-brand-light/85 block">Mon – Sat · 7 AM – 5 PM</span>
                <span className="text-brand-light/50 text-xs">Sunday closed</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2.5">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-10 w-10 rounded-sm border border-white/10 grid place-items-center text-brand-light/70 hover:text-brand-gold hover:border-brand-gold/40 hover:-translate-y-0.5 transition-all duration-200">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-10 w-10 rounded-sm border border-white/10 grid place-items-center text-brand-light/70 hover:text-brand-gold hover:border-brand-gold/40 hover:-translate-y-0.5 transition-all duration-200">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Areas — all 109 cities by region */}
      <div className="relative border-t border-white/5">
        <div className="container-edge py-12 lg:py-14">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="font-display text-brand-light text-lg">
              Massachusetts Cities We Serve
            </h3>
            <span className="text-xs uppercase tracking-[0.2em] text-brand-light/55 font-bold">
              109 locations
            </span>
            <div className="h-px flex-1 bg-white/10" />
            <Link
              href="/locations"
              className="text-xs uppercase tracking-[0.2em] text-brand-gold font-bold hover:text-[#E0B864] transition"
            >
              View all →
            </Link>
          </div>

          <div className="space-y-6">
            {regionOrder.map((region) => (
              <div key={region}>
                <div className="text-[0.7rem] uppercase tracking-[0.18em] text-brand-gold font-bold mb-2.5">
                  {region}
                </div>
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-brand-light/65">
                  {grouped[region]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((c, i) => (
                      <li key={c.slug} className="flex items-center gap-3">
                        <Link
                          href={`/${c.slug}`}
                          className="hover:text-brand-gold transition"
                        >
                          {c.name}
                        </Link>
                        {i < grouped[region].length - 1 && (
                          <span className="text-brand-light/20">·</span>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/5 bg-brand-dark/50">
        <div className="container-edge py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-light/50">
          <div>
            © {year} {site.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <span>MA HIC Registered · Fully Insured</span>
            <span className="hidden sm:inline">·</span>
            <Link href="/locations" className="hover:text-brand-gold transition">
              Service Areas
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link href="/services" className="hover:text-brand-gold transition">
              Services
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#hero"
        aria-label="Back to top"
        className="absolute right-5 bottom-20 lg:bottom-24 h-11 w-11 grid place-items-center rounded-full bg-brand-gold text-brand-dark shadow-gold hover:scale-110 hover:bg-[#E0B864] transition-all"
      >
        <ArrowUp className="h-4 w-4" />
      </a>
    </footer>
  );
}
