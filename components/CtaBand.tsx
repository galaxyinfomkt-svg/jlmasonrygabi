"use client";

import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { openQuoteModal } from "./QuoteModal";

/**
 * Conversion strip for the gaps between content sections.
 *
 * The page ran hero → about → services → gallery → testimonials → FAQ before
 * offering the form, so a reader convinced by the gallery had to scroll past
 * three more sections to act. This reuses the site's own quote modal rather
 * than introducing a second path, and keeps the phone beside it.
 */
export default function CtaBand({
  heading = "Ready for your free estimate?",
  sub = "Tell us about the job — we come measure at no cost.",
  tone = "red",
}: {
  heading?: string;
  sub?: string;
  tone?: "red" | "dark";
}) {
  const isRed = tone === "red";

  return (
    <section className={isRed ? "bg-brand-red py-10 sm:py-12" : "bg-brand-dark py-10 sm:py-12"}>
      <div className="container-edge flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl text-white sm:text-2xl">{heading}</h2>
          <p className="mt-1 text-sm text-white/75">{sub}</p>
        </div>

        <div className="flex flex-col gap-3 sm:shrink-0 sm:flex-row">
          <button
            type="button"
            onClick={openQuoteModal}
            className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-transform hover:scale-105 ${
              isRed
                ? "bg-white text-brand-dark hover:bg-white/90"
                : "bg-brand-red text-white hover:brightness-110"
            }`}
          >
            Get My Free Estimate
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
