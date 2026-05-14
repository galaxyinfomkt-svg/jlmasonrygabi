"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Star } from "lucide-react";
import { site } from "@/lib/site";
import LeadConnectorForm from "./LeadConnectorForm";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-brand-dark py-24 lg:py-32 overflow-hidden"
      aria-labelledby="contact-h"
    >
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="container-edge relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="eyebrow justify-center">
            <span className="h-px w-9 bg-brand-gold" />
            Get in Touch
            <span className="h-px w-9 bg-brand-gold" />
          </div>
          <h2
            id="contact-h"
            className="mt-5 font-display text-brand-light tracking-tight text-balance"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.04 }}
          >
            Get Your Free <span className="italic text-brand-gold">Masonry Estimate</span>
          </h2>
          <p className="mt-5 text-brand-light/70 text-lg leading-relaxed text-pretty">
            Ready to start your project? Contact us for a free, no-obligation
            estimate. We respond within one business day — usually same day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* Left: image + contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            className="relative flex flex-col gap-5"
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 shadow-warm">
              <Image
                src="https://storage.googleapis.com/msgsndr/QDJQl1odcMmCwTMFVIKK/media/68c83604b376d91a30f02912.webp"
                alt="Custom JL Masonry stonework in Middlesex County, MA"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[0.65rem] uppercase tracking-[0.22em] text-brand-gold font-bold mb-1">
                  Locally trusted since 2010
                </div>
                <div className="font-display text-2xl lg:text-3xl text-brand-light leading-tight">
                  Mason-owned. Mason-built.
                </div>
              </div>
            </div>

            <div className="bg-brand-stone border border-white/10 rounded-sm p-6 lg:p-7 flex-1">
              <ul className="space-y-4">
                <InfoRow icon={<Phone className="h-5 w-5" />} label="Phone">
                  <a
                    href={site.phoneHref}
                    className="font-display text-xl lg:text-2xl text-brand-light hover:text-brand-gold transition"
                  >
                    {site.phone}
                  </a>
                </InfoRow>
                <InfoRow icon={<Mail className="h-5 w-5" />} label="Email">
                  <a
                    href={site.emailHref}
                    className="text-brand-light hover:text-brand-gold transition break-all"
                  >
                    {site.email}
                  </a>
                </InfoRow>
                <InfoRow icon={<MapPin className="h-5 w-5" />} label="Location">
                  <div className="text-brand-light">
                    {site.address.city}, {site.address.region}
                  </div>
                  <div className="text-brand-light/55 text-sm">
                    Serving all of {site.address.serviceArea}
                  </div>
                </InfoRow>
                <InfoRow icon={<Clock className="h-5 w-5" />} label="Hours">
                  <ul className="space-y-0.5">
                    {site.hoursStructured.map((h) => (
                      <li
                        key={h.days}
                        className="text-sm flex justify-between gap-4 max-w-xs"
                      >
                        <span className="text-brand-light/85">{h.days}</span>
                        <span className="text-brand-light/60">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </InfoRow>
              </ul>

              <div className="mt-7 pt-6 border-t border-white/10 flex items-center gap-3">
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="h-11 w-11 rounded-sm border border-white/10 grid place-items-center text-brand-light/75 hover:text-brand-gold hover:border-brand-gold/50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="h-11 w-11 rounded-sm border border-white/10 grid place-items-center text-brand-light/75 hover:text-brand-gold hover:border-brand-gold/50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={site.social.review}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Reviews"
                  className="h-11 w-11 rounded-sm border border-white/10 grid place-items-center text-brand-light/75 hover:text-brand-gold hover:border-brand-gold/50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Star className="h-4 w-4" />
                </a>
                <a
                  href={site.social.review}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-sm text-brand-light/70 hover:text-brand-gold underline-offset-4 hover:underline"
                >
                  Leave a Google review
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: LeadConnector form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="bg-brand-stone border border-white/10 rounded-sm p-5 lg:p-7 h-full flex flex-col"
          >
            <div className="mb-5">
              <h3 className="font-display text-2xl lg:text-3xl text-brand-light">
                Request My Free Estimate
              </h3>
              <p className="mt-2 text-sm text-brand-light/55">
                Takes 60 seconds. We respond within one business day.
              </p>
            </div>

            <LeadConnectorForm
              height={620}
              className="flex-1"
              title="JL Masonry — Request a Free Estimate"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="mt-1 h-11 w-11 rounded-sm bg-brand-gold/10 grid place-items-center text-brand-gold border border-brand-gold/25 shrink-0">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/55 mb-1 font-semibold">
          {label}
        </div>
        {children}
      </div>
    </li>
  );
}
