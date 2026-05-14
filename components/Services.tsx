"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-brand-dark py-24 lg:py-32"
      aria-labelledby="services-h"
    >
      <div className="container-edge">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="eyebrow justify-center">
            <span className="h-px w-9 bg-brand-gold" />
            What We Do
            <span className="h-px w-9 bg-brand-gold" />
          </div>
          <h2
            id="services-h"
            className="mt-5 font-display text-brand-light tracking-tight text-balance"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.04 }}
          >
            Our <span className="italic text-brand-gold">Masonry Services</span>
          </h2>
          <p className="mt-5 text-brand-light/65 text-lg leading-relaxed text-pretty">
            From custom patios to commercial hardscape — every project is built
            by hand, by the same crew, on the schedule you sign for.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
        >
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.li
                key={svc.slug}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <a
                  href="#contact"
                  className="group relative block bg-brand-stone border border-white/8 hover:border-brand-gold rounded-sm overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-warm"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={`${svc.title} by JL Masonry — ${svc.description}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/55 to-transparent" />

                    {/* Hover gold overlay */}
                    <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/15 transition-all duration-500" />

                    {/* Icon top-left */}
                    <span className="absolute top-4 left-4 h-10 w-10 rounded-sm bg-brand-dark/85 backdrop-blur-sm border border-brand-gold/40 grid place-items-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-500">
                      <Icon className="h-5 w-5" />
                    </span>

                    {/* Arrow top-right */}
                    <span className="absolute top-4 right-4 h-9 w-9 rounded-full bg-brand-dark/85 backdrop-blur-sm border border-white/15 grid place-items-center text-brand-light/80 group-hover:bg-brand-gold group-hover:text-brand-dark group-hover:border-brand-gold group-hover:rotate-45 transition-all duration-500">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>

                    {/* Title + desc */}
                    <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                      <h3 className="font-display text-xl lg:text-2xl text-brand-light leading-tight">
                        {svc.title}
                      </h3>
                      <p className="mt-2 text-xs lg:text-sm text-brand-light/70 leading-snug line-clamp-2 group-hover:text-brand-light/95 transition-colors">
                        {svc.description}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-brand-gold font-bold opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                        Learn more
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center"
        >
          <p className="text-brand-light/65 mb-5">
            Not sure which service fits? Call and describe what you're picturing.
          </p>
          <a href="#contact" className="btn-primary">
            Talk to a Mason →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
