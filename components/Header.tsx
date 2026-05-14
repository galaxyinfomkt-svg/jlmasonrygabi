"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";
import { openQuoteModal } from "./QuoteModal";

const nav = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-brand-dark/80 border-b border-white/8 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-edge flex items-center justify-between gap-4 py-3 lg:py-4">
        <Link
          href="/"
          className="flex items-center gap-3 group shrink-0"
          aria-label={site.name}
        >
          <div className="relative h-12 w-12 lg:h-14 lg:w-14 transition-transform group-hover:scale-105">
            <Image
              src="/assets/logo.png"
              alt={`${site.name} logo`}
              fill
              sizes="56px"
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg lg:text-xl text-brand-light tracking-tight">
              JL Masonry
            </div>
            <div className="text-[0.6rem] tracking-[0.3em] uppercase text-brand-gold font-semibold">
              &amp; Construction
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-brand-light/80 hover:text-brand-gold transition-colors group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <a
            href={site.phoneHref}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-brand-light hover:text-brand-gold transition px-3 py-2 border border-white/10 hover:border-brand-gold/40 rounded-sm"
          >
            <Phone className="h-4 w-4 text-brand-gold" />
            {site.phone}
          </a>
          <button
            type="button"
            onClick={openQuoteModal}
            className="hidden md:inline-flex items-center gap-2 bg-brand-gold hover:bg-[#E0B864] text-brand-dark font-bold text-sm px-5 py-2.5 rounded-sm transition-all duration-300 hover:-translate-y-0.5 shadow-gold-sm"
          >
            Free Estimate
          </button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 -mr-2 text-brand-light hover:text-brand-gold"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-brand-stone border-l border-white/10 p-6 flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-xl">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-brand-light/80 hover:text-brand-gold"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-0.5 mb-6" aria-label="Mobile">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-xl py-3 border-b border-white/5 text-brand-light hover:text-brand-gold transition"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto space-y-3 pt-6">
                <a
                  href={site.phoneHref}
                  className="flex items-center justify-center gap-2 w-full bg-brand-light text-brand-dark font-semibold text-sm px-5 py-3 rounded-sm"
                >
                  <Phone className="h-4 w-4" /> {site.phone}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openQuoteModal();
                  }}
                  className="block text-center w-full bg-brand-gold hover:bg-[#E0B864] text-brand-dark font-bold text-sm px-5 py-3 rounded-sm transition shadow-gold"
                >
                  Free Estimate
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
