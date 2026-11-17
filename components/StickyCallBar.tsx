"use client";

import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { openQuoteModal } from "./QuoteModal";

/**
 * Mobile-only bottom bar: one tap to call, one tap to the quote form.
 * The body gets `pb-16 lg:pb-0` in app/layout.tsx so nothing hides behind it.
 *
 * "Free Estimate" opens the QuoteModal when the page has one; pages without
 * it (legal pages, 404) fall back to the contact form on the home page.
 */
export default function StickyCallBar() {
  const onEstimate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (document.documentElement.dataset.quoteModal) {
      e.preventDefault();
      openQuoteModal();
    }
  };

  return (
    <div
      className="lg:hidden fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-white/10 bg-brand-dark/95 shadow-[0_-6px_20px_rgba(0,0,0,0.35)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={site.phoneHref}
        className="flex h-14 items-center justify-center gap-2 bg-brand-red font-bold text-white"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call Now
      </a>
      <a
        href="/#contact"
        onClick={onEstimate}
        className="flex h-14 items-center justify-center gap-2 font-bold text-brand-light"
      >
        Free Estimate
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
}
