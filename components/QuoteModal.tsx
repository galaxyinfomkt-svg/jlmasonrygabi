"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { site } from "@/lib/site";
import LeadConnectorForm from "./LeadConnectorForm";

export const QUOTE_MODAL_OPEN_EVENT = "jl-open-quote-modal";

export function openQuoteModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(QUOTE_MODAL_OPEN_EVENT));
  }
}

export default function QuoteModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(QUOTE_MODAL_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(QUOTE_MODAL_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="quote-modal"
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close quote form"
            className="absolute inset-0 bg-brand-dark/85 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center p-4 lg:p-8 overflow-y-auto pointer-events-none"
          >
            <div className="relative w-full max-w-2xl bg-brand-light rounded-sm shadow-xl pointer-events-auto my-auto">
              {/* Top header (dark) */}
              <div className="relative flex items-center justify-between gap-4 px-6 lg:px-8 py-5 bg-brand-dark rounded-t-sm">
                <div>
                  <div className="text-[0.65rem] uppercase tracking-[0.22em] text-brand-gold font-bold mb-1">
                    Free · No Obligation
                  </div>
                  <h3
                    id="quote-modal-title"
                    className="font-display text-xl lg:text-2xl text-brand-light"
                  >
                    Request Your Free Masonry Estimate
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="h-10 w-10 rounded-full grid place-items-center text-brand-light/80 hover:text-brand-gold hover:bg-white/5 transition shrink-0"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 lg:px-8 py-6">
                <LeadConnectorForm height={560} title="JL Masonry — Free Estimate" />
                <div className="mt-5 pt-5 border-t border-brand-dark/10 flex items-center justify-between gap-3 flex-wrap text-sm">
                  <span className="text-brand-gray">Prefer to call?</span>
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-2 text-brand-dark hover:text-brand-gold-deep font-bold transition"
                  >
                    <Phone className="h-4 w-4 text-brand-gold-deep" />
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
