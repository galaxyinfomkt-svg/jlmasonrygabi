"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ImageIcon, ZoomIn } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { galleryCategories, galleryImages, type GalleryCategory } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Gallery() {
  const [active, setActive] = useState<GalleryCategory>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (active === "All") return galleryImages;
    return galleryImages.filter((img) => img.category === active);
  }, [active]);

  const slides = useMemo(
    () =>
      filtered.map((img) => ({
        src: img.src,
        alt: img.alt,
        title: img.title,
        description: img.category,
      })),
    [filtered]
  );

  return (
    <section
      id="gallery"
      className="relative bg-brand-stone py-24 lg:py-32 overflow-hidden"
      aria-labelledby="gallery-h"
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
            Our Portfolio
            <span className="h-px w-9 bg-brand-gold" />
          </div>
          <h2
            id="gallery-h"
            className="mt-5 font-display text-brand-light tracking-tight text-balance"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.04 }}
          >
            Recent Work in <span className="italic text-brand-gold">Massachusetts</span>
          </h2>
          <p className="mt-5 text-brand-light/65 text-lg leading-relaxed text-pretty">
            Click any image to view full-size. Every photo below is a real JL
            Masonry project — no stock photography.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {galleryCategories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={`px-5 py-2.5 rounded-sm text-sm font-bold transition-all duration-300 border ${
                  isActive
                    ? "bg-brand-gold text-brand-dark border-brand-gold shadow-gold-sm"
                    : "bg-brand-dark/40 text-brand-light/80 border-white/15 hover:border-brand-gold hover:text-brand-gold backdrop-blur-sm"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Swiper coverflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          key={active}
        >
          <Swiper
            modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop={filtered.length > 3}
            coverflowEffect={{
              rotate: 22,
              stretch: 0,
              depth: 220,
              modifier: 1,
              slideShadows: false,
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.1 },
              640: { slidesPerView: 1.6 },
              1024: { slidesPerView: 2.4 },
              1280: { slidesPerView: 2.8 },
            }}
            className="!pb-16"
          >
            {filtered.map((img, i) => (
              <SwiperSlide key={img.src + i} className="!w-[280px] sm:!w-[360px] lg:!w-[420px]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`View ${img.title} full size`}
                  className="group relative block w-full aspect-[4/5] overflow-hidden rounded-sm bg-brand-dark border border-white/10 hover:border-brand-gold transition-all duration-500 hover:shadow-warm cursor-zoom-in"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/35 to-transparent" />
                  <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/12 transition-colors duration-500" />

                  <span className="absolute top-4 right-4 h-10 w-10 rounded-full bg-brand-dark/85 backdrop-blur-sm border border-white/15 grid place-items-center text-brand-light/85 group-hover:bg-brand-gold group-hover:text-brand-dark group-hover:border-brand-gold transition-all duration-500">
                    <ZoomIn className="h-4 w-4" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-[0.65rem] uppercase tracking-[0.2em] text-brand-gold font-bold mb-1.5">
                      {img.category}
                    </div>
                    <div className="font-display text-lg lg:text-xl text-brand-light leading-tight">
                      {img.title}
                    </div>
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-brand-light/55 flex flex-col items-center gap-3">
            <ImageIcon className="h-10 w-10 text-brand-gold/40" />
            No projects in this category yet — see all work.
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-center"
        >
          <a href="#contact" className="btn-primary">
            Start Your Project →
          </a>
        </motion.div>
      </div>

      <Lightbox
        open={openIndex !== null}
        index={openIndex ?? 0}
        close={() => setOpenIndex(null)}
        slides={slides}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: "rgba(28,28,28,0.96)" } }}
      />
    </section>
  );
}
