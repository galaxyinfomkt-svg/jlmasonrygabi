"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { site, testimonials } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h5.92a5.06 5.06 0 0 1-2.2 3.32v2.75h3.56c2.08-1.92 3.22-4.74 3.22-8.31Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.75c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.52H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.13a6.6 6.6 0 0 1 0-4.26V7.03H2.18a11 11 0 0 0 0 9.94l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.61 0 3.06.55 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.03l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-brand-dark py-24 lg:py-32 overflow-hidden"
      aria-labelledby="testimonials-h"
    >
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="container-edge relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="eyebrow justify-center">
            <span className="h-px w-9 bg-brand-gold" />
            Reviews
            <span className="h-px w-9 bg-brand-gold" />
          </div>
          <h2
            id="testimonials-h"
            className="mt-5 font-display text-brand-light tracking-tight text-balance"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.04 }}
          >
            What <span className="italic text-brand-gold">Homeowners</span> Say
          </h2>
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 bg-brand-stone border border-brand-gold/40 rounded-sm">
            <GoogleG className="h-5 w-5" />
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <span className="text-sm text-brand-light">
              <span className="font-bold">{site.rating.value}</span> ·{" "}
              <span className="text-brand-light/65">{site.rating.count}+ verified Google reviews</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            className="!pb-14"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <figure className="group relative h-full p-7 lg:p-9 bg-brand-stone border border-white/10 hover:border-brand-gold/60 rounded-sm transition-all duration-500 hover:shadow-warm">
                  <Quote className="absolute top-6 right-6 h-12 w-12 text-brand-gold/12 group-hover:text-brand-gold/25 transition" />

                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-[0.18em] text-brand-light/45 font-bold pl-2">
                      Verified · Google
                    </span>
                  </div>

                  <blockquote
                    className="font-display text-brand-light tracking-tight leading-[1.45] min-h-[140px]"
                    style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-7 pt-5 border-t border-white/8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-deep grid place-items-center text-brand-dark font-bold text-sm">
                        {initials(t.author)}
                      </div>
                      <div>
                        <div className="font-semibold text-brand-light">{t.author}</div>
                        <div className="text-xs text-brand-light/55">{t.location}</div>
                      </div>
                    </div>
                    <GoogleG className="h-6 w-6 opacity-70 group-hover:opacity-100 transition" />
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Google Reviews widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-5xl mx-auto"
        >
          <div className="rounded-sm overflow-hidden border border-white/10 bg-brand-stone">
            <iframe
              src={site.reviewsWidget}
              loading="lazy"
              title="Google Reviews — JL Masonry"
              className="w-full"
              style={{ minHeight: 420, border: "none" }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={site.social.review}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <GoogleG className="h-4 w-4" />
            Read All Reviews on Google
          </a>
          <a
            href={site.social.review}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-light/70 hover:text-brand-gold text-sm underline-offset-4 hover:underline transition"
          >
            Or leave one yourself
          </a>
        </motion.div>
      </div>
    </section>
  );
}
