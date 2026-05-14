"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { site } from "@/lib/site";
import LeadConnectorForm from "./LeadConnectorForm";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-brand-dark isolate"
      aria-labelledby="hero-h"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/hero.jpg"
          alt="Hand-laid stonework by JL Masonry in Middlesex County, Massachusetts"
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
          {/* LEFT: Copy */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex flex-wrap items-center gap-2 bg-brand-gold/15 border border-brand-gold/40 px-4 py-2 rounded-sm backdrop-blur-sm"
            >
              <span className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-brand-gold">
                <BadgeCheck className="h-3.5 w-3.5" /> Free Estimates
              </span>
              <span className="h-3 w-px bg-brand-gold/40" />
              <span className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-brand-gold">
                <ShieldCheck className="h-3.5 w-3.5" /> Licensed
              </span>
              <span className="h-3 w-px bg-brand-gold/40" />
              <span className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.2em] uppercase font-bold text-brand-gold">
                <MapPin className="h-3.5 w-3.5" /> Woburn, MA
              </span>
            </motion.div>

            <motion.h1
              id="hero-h"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display font-semibold text-brand-light tracking-[-0.025em] text-balance"
              style={{ fontSize: "clamp(2.1rem, 4.6vw, 4.4rem)", lineHeight: 1.02 }}
            >
              Stonework &amp; Masonry Services in{" "}
              <span className="italic text-brand-gold font-medium">
                Woburn, Massachusetts
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-base lg:text-lg text-brand-light/80 leading-relaxed text-pretty max-w-xl"
            >
              Expert patios, stone walls, walkways, and chimneys built to last.
              Serving Woburn and all of Middlesex County with craftsmanship that
              holds up to every New England winter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <a href={site.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {site.phone}
              </a>
              <a href="#gallery" className="btn-ghost">
                View Our Projects
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* Rating row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
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
            </motion.div>
          </div>

          {/* RIGHT: Inline Quote Form */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md lg:max-w-none mx-auto"
          >
            {/* Gold corner accent */}
            <div className="absolute -top-3 -left-3 lg:-top-4 lg:-left-4 h-12 w-12 lg:h-14 lg:w-14 bg-brand-gold rounded-sm grid place-items-center text-brand-dark shadow-gold z-10">
              <Star className="h-5 w-5 lg:h-6 lg:w-6 fill-brand-dark" />
            </div>

            <div className="relative bg-brand-light rounded-sm border border-brand-gold/30 shadow-2xl p-5 lg:p-6 backdrop-blur-md">
              <div className="mb-4">
                <div className="text-[0.65rem] uppercase tracking-[0.22em] text-brand-gold-deep font-bold">
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
                title="JL Masonry — Hero Quote Form"
              />

              <div className="mt-4 pt-4 border-t border-brand-dark/10 flex items-center justify-between gap-3 text-xs">
                <span className="text-brand-gray">Prefer to call?</span>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-1.5 text-brand-dark hover:text-brand-gold-deep font-bold transition"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-gold-deep" />
                  {site.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
