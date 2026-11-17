import { site } from "@/lib/site";

/**
 * The ONE business entity for the whole site. Every page points to it with
 * `provider: { "@id": BUSINESS_ID }` instead of declaring its own
 * LocalBusiness — before Nov/2026 each of the ~1,200 city pages created a
 * separate "JL Masonry" entity, which keeps Google and AI engines from
 * consolidating the brand.
 */
export const BUSINESS_ID = `${site.website}#business`;

const UNITS: Array<[RegExp, string]> = [
  [/square face foot/i, "square face foot"],
  [/square foot/i, "square foot"],
  [/linear foot/i, "linear foot"],
];

/**
 * Turns the human price text from service-meta ("$45–$85 per square foot
 * installed…") into numeric schema.org pricing. Returns null when the text
 * has no clear range (e.g. "Project-specific — get an itemized quote").
 */
export function priceSpecification(costRange: string) {
  const m = costRange.match(/\$([\d,]+)\s*[–-]\s*\$([\d,]+)/);
  if (!m) return null;
  const min = Number(m[1].replace(/,/g, ""));
  const max = Number(m[2].replace(/,/g, ""));
  const unit = UNITS.find(([re]) => re.test(costRange))?.[1];
  return unit
    ? {
        "@type": "UnitPriceSpecification",
        minPrice: min,
        maxPrice: max,
        priceCurrency: "USD",
        unitText: unit,
      }
    : { "@type": "PriceSpecification", minPrice: min, maxPrice: max, priceCurrency: "USD" };
}

export function offerFor(costRange: string) {
  const spec = priceSpecification(costRange);
  return spec ? { "@type": "Offer", priceSpecification: spec } : undefined;
}
