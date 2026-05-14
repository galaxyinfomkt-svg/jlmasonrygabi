"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ChevronDown,
  Cog,
  Construction,
  Footprints,
  Home,
  Layers,
  Menu,
  Mountain,
  Phone,
  Route,
  Sparkles,
  Wind,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";
import { openQuoteModal } from "./QuoteModal";

const nav = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
];

const dropdownServices = [
  { slug: "patios", label: "Patios", icon: Layers },
  { slug: "stone-walls", label: "Stone Walls", icon: Mountain },
  { slug: "walkways", label: "Walkways", icon: Footprints },
  { slug: "chimneys", label: "Chimneys", icon: Wind },
  { slug: "retaining-walls", label: "Retaining Walls", icon: Construction },
  { slug: "sidewalks", label: "Sidewalks", icon: Route },
  { slug: "residential-masonry", label: "Residential Masonry", icon: Home },
  { slug: "commercial-masonry", label: "Commercial Masonry", icon: Building2 },
  { slug: "custom-projects", label: "Custom Projects", icon: Sparkles },
  { slug: "hardscape", label: "Hardscape", icon: Cog },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
          ? "backdrop-blur-md bg-brand-dark/85 border-b border-white/8 shadow-lg"
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
            <div className="text-[0.6rem] tracking-[0.3em] uppercase text-brand-red font-semibold">
              &amp; Construction
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          <Link
            href="/"
            className="relative text-sm font-medium text-brand-light/80 hover:text-brand-red transition-colors group"
          >
            Home
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-red transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              className="flex items-center gap-1.5 text-sm font-medium text-brand-light/80 hover:text-brand-red transition-colors group"
            >
              Services
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                >
                  <div className="w-[340px] bg-white rounded-md shadow-2xl border border-black/5 overflow-hidden">
                    <ul className="py-2">
                      {dropdownServices.map((svc) => {
                        const Icon = svc.icon;
                        return (
                          <li key={svc.slug}>
                            <Link
                              href={`/services/${svc.slug}`}
                              className="flex items-center gap-3.5 px-5 py-3 hover:bg-brand-red-pale/60 transition-colors group/item"
                            >
                              <span className="h-9 w-9 rounded-sm bg-brand-red-pale grid place-items-center text-brand-red shrink-0 group-hover/item:bg-brand-red group-hover/item:text-white transition-colors">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="text-sm font-medium text-brand-dark group-hover/item:text-brand-red transition-colors">
                                {svc.label}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="border-t border-black/5 px-5 py-3 bg-brand-red-pale/30">
                      <Link
                        href="/services"
                        className="flex items-center justify-between text-sm font-bold text-brand-red hover:text-brand-red-deep transition-colors"
                      >
                        View All Services
                        <span className="text-base">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {nav.slice(1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-brand-light/80 hover:text-brand-red transition-colors group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-red transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <a
            href={site.phoneHref}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-brand-light hover:text-brand-red transition px-3 py-2 border border-white/10 hover:border-brand-red/50 rounded-sm"
          >
            <Phone className="h-4 w-4 text-brand-red" />
            {site.phone}
          </a>
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="hidden md:inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-light text-white font-bold text-sm px-5 py-2.5 rounded-sm transition-all duration-300 hover:-translate-y-0.5 shadow-red-sm"
          >
            Free Estimate
          </button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 -mr-2 text-brand-light hover:text-brand-red"
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
                  className="p-2 text-brand-light/80 hover:text-brand-red"
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
                    className="font-display text-xl py-3 border-b border-white/5 text-brand-light hover:text-brand-red transition"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mb-6">
                <div className="text-[0.65rem] uppercase tracking-[0.2em] text-brand-red mb-3 font-bold">
                  Services
                </div>
                <ul className="space-y-1">
                  {dropdownServices.map((svc) => {
                    const Icon = svc.icon;
                    return (
                      <li key={svc.slug}>
                        <Link
                          href={`/services/${svc.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 py-2 text-sm text-brand-light/80 hover:text-brand-red transition"
                        >
                          <span className="h-7 w-7 rounded-sm bg-brand-red-pale/15 grid place-items-center text-brand-red shrink-0">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          {svc.label}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="pt-2">
                    <Link
                      href="/services"
                      onClick={() => setOpen(false)}
                      className="block py-2 text-sm font-bold text-brand-red hover:text-brand-red-light"
                    >
                      View All Services →
                    </Link>
                  </li>
                </ul>
              </div>
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
                  className="block text-center w-full bg-brand-red hover:bg-brand-red-light text-white font-bold text-sm px-5 py-3 rounded-sm transition shadow-red"
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
