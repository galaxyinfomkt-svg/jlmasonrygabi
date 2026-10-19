import Image from "next/image";
import { ArrowRight, BadgeCheck, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { site } from "@/lib/site";
import LeadConnectorForm from "./LeadConnectorForm";

/**
 * Hero — rendered server-side WITHOUT framer-motion on the LCP path.
 * Previous version animated opacity 0 → 1 on the headline + paragraph,
 * which forced the LCP element to wait for client hydration (~2.4 s
 * element render delay on slow 4 G).
 *
 * Everything visible above the fold is now plain HTML with no JS animation.
 * Subtle `animation: fade-up` from globals.css runs once via pure CSS,
 * which the browser can composite on the GPU without blocking the main
 * thread.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-brand-dark isolate"
      aria-labelledby="hero-h"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/hero.jpg"
          alt="Hand-laid stonework by JL Masonry in Middlesex County, Massachusetts"
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          quality={62}
          className="object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-[rgba(15,15,15,0.42)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark" />
      </div>

      <div className="container-edge relative pt-28 pb-16 lg:pt-36 lg:pb-24 min-h-[100svh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          {/* LEFT: Copy — server-rendered, no JS animation */}
          <div className="max-w-2xl">
            <div className="inline-flex flex-wrap items-center gap-2 bg-brand-red/30 border border-brand-red/60 px-4 py-2 rounded-sm backdrop-blur-sm">
              <span className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-white">
                <BadgeCheck className="h-3.5 w-3.5" /> Free Estimates
              </span>
              <span className="h-3 w-px bg-white/40" />
              <span className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-white">
                <ShieldCheck className="h-3.5 w-3.5" /> MA HIC Registered
              </span>
              <span className="h-3 w-px bg-white/40" />
              <span className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-white">
                <MapPin className="h-3.5 w-3.5" /> Woburn, MA
              </span>
            </div>

            <h1
              id="hero-h"
              className="mt-6 font-display font-semibold text-brand-light tracking-[-0.025em] text-balance"
              style={{ fontSize: "clamp(2.1rem, 4.6vw, 4.4rem)", lineHeight: 1.02 }}
            >
              Stonework &amp; Masonry Services in{" "}
              <span className="italic text-brand-red font-medium">
                Woburn, Massachusetts
              </span>
            </h1>

            <p className="mt-6 text-base lg:text-lg text-brand-light/85 leading-relaxed text-pretty max-w-xl">
              Expert patios, stone walls, walkways, and chimneys built to last.
              Serving 109+ cities across Eastern Massachusetts with
              craftsmanship that holds up to every New England winter.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={site.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {site.phone}
              </a>
              <a href="#gallery" className="btn-ghost">
                View Our Projects
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <div className="flex" aria-label="5 star rating">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-brand-red text-brand-red" />
                  ))}
                </div>
                <span className="text-sm text-brand-light/90">
                  <span className="font-bold text-brand-light">{site.rating.value}</span> ·{" "}
                  {site.rating.count}+ Google reviews
                </span>
              </div>
              <span className="hidden sm:inline h-4 w-px bg-white/20" />
              <span className="text-xs text-brand-light/80">
                No deposit · No pressure
              </span>
            </div>
          </div>

          {/* RIGHT: only the quote form — no card, badge or title around it.
              LeadConnectorForm reserves its own height, so no CLS on mount. */}
          <div className="relative w-full max-w-md lg:max-w-none mx-auto">
            <LeadConnectorForm
              height={500}
              mobileHeight={560}
              title="JL Masonry — Hero Quote Form"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
