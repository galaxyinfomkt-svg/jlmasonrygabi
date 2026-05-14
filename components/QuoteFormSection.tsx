"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Phone, ShieldCheck, Star } from "lucide-react";
import { site } from "@/lib/site";
import LeadConnectorForm from "./LeadConnectorForm";

const perks = [
  { icon: CheckCircle2, label: "Free, no-obligation estimate" },
  { icon: ShieldCheck, label: "Licensed & insured masons" },
  { icon: Clock, label: "Reply within 1 business day" },
];

export default function QuoteFormSection() {
  return (
    <section
      id="quote"
      className="relative bg-brand-light py-20 lg:py-28"
      aria-labelledby="quote-h"
    >
      <div className="container-edge">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-stretch">
          {/* Left copy column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-3 self-start font-sans uppercase font-bold text-brand-gold-deep text-xs tracking-[0.22em]">
              <span className="h-px w-9 bg-brand-gold" />
              Get a Free Quote
            </div>
            <h2
              id="quote-h"
              className="mt-5 font-display text-brand-dark tracking-tight text-balance"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.05 }}
            >
              Tell us about your project — <br className="hidden sm:block" />
              <span className="italic text-brand-gold-deep">we'll quote it within 24 hours.</span>
            </h2>
            <p className="mt-5 text-brand-gray text-lg leading-relaxed text-pretty max-w-lg">
              Whether it's a Saturday-morning walkway or a multi-week patio
              build, you'll get an itemized quote in plain English — materials,
              labor, schedule, and price.
            </p>

            <ul className="mt-7 space-y-3.5">
              {perks.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.label} className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-sm bg-brand-gold/15 grid place-items-center text-brand-gold-deep border border-brand-gold/40">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-brand-dark/90 font-medium">{p.label}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 p-5 bg-brand-dark text-brand-light rounded-sm flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <span className="text-sm">
                  <span className="font-bold">{site.rating.value}</span> ·{" "}
                  {site.rating.count}+ Google reviews
                </span>
              </div>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:text-[#DC4640] transition"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </motion.div>

          {/* Right form column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="relative bg-white rounded-sm border border-brand-dark/10 shadow-warm p-5 lg:p-7">
              {/* Decorative gold corner */}
              <div className="absolute -top-3 -left-3 h-12 w-12 bg-brand-gold rounded-sm grid place-items-center text-brand-dark shadow-gold-sm">
                <Star className="h-5 w-5 fill-brand-dark" />
              </div>

              <div className="mb-5">
                <h3 className="font-display text-2xl lg:text-3xl text-brand-dark">
                  Request My Free Estimate
                </h3>
                <p className="mt-1.5 text-sm text-brand-gray">
                  Takes 60 seconds. No pressure, no spam.
                </p>
              </div>

              <LeadConnectorForm
                height={580}
                title="JL Masonry — Quick Quote Form"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
