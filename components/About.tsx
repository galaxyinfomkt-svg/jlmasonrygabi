"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { aboutHighlights, site } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-brand-stone py-24 lg:py-32 overflow-hidden"
      aria-labelledby="about-h"
    >
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="container-edge relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-white/10 shadow-warm">
              <Image
                src="/assets/about.jpg"
                alt={`${site.name} masonry craftsman at work in Woburn, MA`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
            </div>
            <div className="hidden lg:flex absolute -top-5 -right-5 items-center gap-3 bg-brand-gold text-brand-dark px-5 py-4 rounded-sm shadow-gold-sm border border-brand-gold-deep/30">
              <div className="font-display text-3xl font-bold leading-none">15+</div>
              <div className="text-[0.65rem] uppercase tracking-[0.18em] leading-tight font-bold">
                Years
                <br />
                in the trade
              </div>
            </div>
          </motion.div>

          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="eyebrow">
                <span className="h-px w-9 bg-brand-gold" />
                About Us
              </div>
              <h2
                id="about-h"
                className="mt-5 font-display text-brand-light tracking-tight text-balance"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.05 }}
              >
                Built on Craftsmanship.{" "}
                <span className="italic text-brand-gold">Trusted in Woburn, MA.</span>
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mt-7 space-y-5 text-brand-light/75 text-lg leading-relaxed text-pretty max-w-xl"
            >
              <p>
                At JL Masonry &amp; Construction, we bring decades of hands-on
                experience to every project. From custom stone patios and
                retaining walls to chimney repairs and commercial hardscaping,
                our team delivers durable, beautiful masonry work that stands
                the test of time.
              </p>
              <p>
                Serving Woburn, MA and all of Middlesex County, we combine
                old-world craftsmanship with modern techniques — treating every
                property like our own. Whether it's a backyard transformation or
                a full commercial project, we show up on time, communicate
                clearly, and deliver results that exceed expectations.
              </p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
              }}
              className="mt-9 space-y-3.5"
            >
              {aboutHighlights.map((h) => (
                <motion.li
                  key={h}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 h-7 w-7 rounded-full bg-brand-gold/15 border border-brand-gold/40 grid place-items-center text-brand-gold shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="text-brand-light/90 leading-snug">{h}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
