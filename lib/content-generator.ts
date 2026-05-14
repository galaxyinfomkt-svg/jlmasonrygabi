// Generates UNIQUE programmatic SEO copy for city × service combos.
// Every output is composed from the city's local context (architecture, soil,
// climate, neighborhoods, landmark, history) so no two pages read alike.

import type { City } from "./cities";
import type { ServiceMeta } from "./service-meta";

export type GeneratedCityService = {
  headline: string;
  subheadline: string;
  intro: string;
  whyLocal: string;
  cityProblems: string[];
  process: string[];
  closingPitch: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

// Pick deterministically using a hash of the slugs so the same combo always
// produces the same output (good for crawlers + caching).
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: string, salt = "") {
  return arr[hash(seed + salt) % arr.length];
}

export function generateCityService(
  city: City,
  svc: ServiceMeta
): GeneratedCityService {
  const seed = `${city.slug}-${svc.slug}`;
  const neighborhood = pick(city.neighborhoods, seed, "n");
  const altNeighborhood =
    city.neighborhoods.find((n) => n !== neighborhood) || neighborhood;

  // Headline variants — picked deterministically per combo
  const headlineVariants = [
    `${svc.longLabel} in ${city.name}, ${city.state}`,
    `${city.name}'s Trusted ${svc.shortLabel} Specialists`,
    `Expert ${svc.shortLabel} Work for ${city.name} Homeowners`,
    `${svc.shortLabel} Construction & Repair in ${city.name}, MA`,
    `Hand-Built ${svc.searchPhrasePlural} in ${city.name}`,
  ];
  const headline = pick(headlineVariants, seed, "h");

  // Subheadline variants
  const subVariants = [
    `Serving ${neighborhood}, ${altNeighborhood}, and all of ${city.name}, ${city.state}. Licensed, insured, and built to last every Massachusetts winter.`,
    `From ${neighborhood} to ${altNeighborhood} — we build ${svc.searchPhrasePlural} that hold up to ${city.county} County's freeze-thaw cycles.`,
    `${city.name} homeowners choose JL Masonry for ${svc.searchPhrasePlural} that look right and last decades — not seasons.`,
    `Hand-laid ${svc.searchPhrasePlural} for ${city.name}, ${city.state} — built by the same crew that quotes the job, on the schedule we sign for.`,
  ];
  const subheadline = pick(subVariants, seed, "s");

  // Intro paragraph — uses architecture, soil, climate, and landmark
  const introVariants = [
    `${city.name} is ${city.architectureStyle.toLowerCase().includes("colonial") ? "Colonial country" : "a community with its own character"} — and the masonry that frames a property here has to respect that. We build ${svc.searchPhrasePlural} for homes throughout ${neighborhood} and ${altNeighborhood}, with material choices and detailing that fit the local architecture. ${city.localProof}.`,
    `When we take on a ${svc.shortLabel.toLowerCase()} project in ${city.name}, the first thing we factor in is the local soil: ${city.soilNote.toLowerCase()}. Combined with ${city.climateNote.toLowerCase()}, this dictates how we engineer the base and joints. The result is a ${svc.shortLabel.toLowerCase()} that performs the way it's supposed to — for decades.`,
    `${city.name} sits in ${city.region} (${city.county} County), and projects here near ${city.nearbyLandmark} need to handle a specific blend of weather and soil. ${city.localProof}. We've built ${svc.searchPhrasePlural} throughout ${neighborhood}, ${altNeighborhood}, and the rest of town with that local knowledge baked in.`,
  ];
  const intro = pick(introVariants, seed, "i");

  // Why local — short paragraph specific to JL's local advantage
  const whyLocalVariants = [
    `We're based in Woburn and reach ${city.name} on a regular schedule. That means same-day callbacks, on-site estimates within 48 hours, and crews that know which materials handle ${city.county} County conditions best.`,
    `JL Masonry has been serving ${city.name} homeowners for over 15 years. Our crews understand the ${city.architectureStyle.split(",")[0].toLowerCase()} aesthetic that dominates ${neighborhood}, and we stock material samples that match ${city.name}'s historic vocabulary.`,
    `Choosing a ${svc.shortLabel.toLowerCase()} contractor in ${city.name} means choosing someone who'll show up. We do. Licensed, insured, MA HIC registered — and the same crew you meet at the estimate is the crew that builds the project.`,
  ];
  const whyLocal = pick(whyLocalVariants, seed, "w");

  // City-specific problems — combine service problems with local conditions
  const cityProblems = svc.problems.map((p) => {
    if (p.toLowerCase().includes("freeze")) {
      return `${p} — particularly common in ${city.name} given ${city.climateNote.toLowerCase()}.`;
    }
    if (p.toLowerCase().includes("settle") || p.toLowerCase().includes("heav")) {
      return `${p} — ${city.soilNote.toLowerCase()} makes this a recurring issue in ${neighborhood}.`;
    }
    if (p.toLowerCase().includes("look") || p.toLowerCase().includes("match")) {
      return `${p} — material matching is especially important given ${city.name}'s ${city.architectureStyle.split(",")[0].toLowerCase()} character.`;
    }
    return p;
  });

  // Process — generic but presented with local framing
  const process = [
    `Free on-site estimate at your ${city.name} property — we walk the site, listen, and ask the right questions.`,
    `Written quote within 48 hours with materials, scope, schedule, and price — itemized, in plain English.`,
    `Permits and town coordination handled by us (${city.county} County conservation, historic, and wetlands overlays where applicable).`,
    `Hand-built by our crew — daily site cleanup, daily progress photos, foreman on-site every working day.`,
    `Final walk-through with you, punch list addressed, and written workmanship warranty in your hands before we leave.`,
  ];

  // Closing pitch
  const closingVariants = [
    `${city.name} homeowners deserve masonry that lasts. ${svc.whyNow} Call (617) 913-9845 or request your free estimate online — we'll be at your property within 48 hours.`,
    `Whether you're in ${neighborhood} or ${altNeighborhood}, we'd love to walk your property and give you an honest quote. No deposit, no obligation, no high-pressure sales — just a real number from real masons.`,
    `${svc.whyNow} Let's talk about your ${city.name} project — call (617) 913-9845 or send a request through the form on this page. Most ${city.name} estimates happen within 48 hours.`,
  ];
  const closingPitch = pick(closingVariants, seed, "c");

  // SEO meta — title under 60 chars, description under 160 chars
  const metaTitleVariants = [
    `${svc.shortLabel} ${svc.slug === "patios" ? "Builder" : svc.slug === "chimneys" ? "Repair" : "Contractor"} in ${city.name} MA | JL Masonry`,
    `${city.name} ${svc.shortLabel} Specialists | JL Masonry & Construction`,
    `Expert ${svc.shortLabel} in ${city.name}, ${city.state} — Free Estimates`,
  ];
  const metaTitle = pick(metaTitleVariants, seed, "mt");

  const metaDescVariants = [
    `Licensed ${svc.searchPhrase} serving ${city.name}, ${city.state}. ${svc.searchPhrasePlural[0].toUpperCase() + svc.searchPhrasePlural.slice(1)} built to last every New England winter. Free estimates. Call (617) 913-9845.`,
    `JL Masonry builds custom ${svc.searchPhrasePlural} in ${city.name}, MA. ${city.county} County's trusted mason. Licensed & insured. Free quote in 48 hours.`,
    `Expert ${svc.searchPhrasePlural} for ${city.name} homeowners. Serving ${neighborhood}, ${altNeighborhood} & all of ${city.name}. Call (617) 913-9845 for a free estimate.`,
  ];
  const metaDescription = pick(metaDescVariants, seed, "md");

  // Keywords — local + service combos
  const keywords = [
    `${svc.searchPhrase} ${city.name} MA`,
    `${svc.searchPhrase} ${city.name}`,
    `${svc.shortLabel.toLowerCase()} contractor ${city.name}`,
    `${svc.searchPhrasePlural} ${city.name} Massachusetts`,
    `masonry ${city.name} MA`,
    `${svc.shortLabel.toLowerCase()} repair ${city.name}`,
    `${svc.shortLabel.toLowerCase()} installation ${city.county} County`,
    `mason near ${neighborhood}`,
    `JL Masonry ${city.name}`,
    `${svc.shortLabel.toLowerCase()} cost ${city.name} MA`,
  ];

  return {
    headline,
    subheadline,
    intro,
    whyLocal,
    cityProblems,
    process,
    closingPitch,
    metaTitle,
    metaDescription,
    keywords,
  };
}

// City-only content (for /[city]/page.tsx)
export function generateCityOverview(city: City) {
  const neighborhood = city.neighborhoods[0];
  const altNeighborhood = city.neighborhoods[1] || neighborhood;

  return {
    headline: `Masonry & Hardscape Services in ${city.name}, ${city.state}`,
    subheadline: `Hand-built patios, stone walls, walkways, chimneys, and retaining walls for ${city.name} homeowners. Serving ${neighborhood}, ${altNeighborhood}, and all of ${city.name}, ${city.county} County.`,
    intro: `JL Masonry & Construction is the trusted masonry contractor for ${city.name}, ${city.state}. From ${neighborhood} to ${altNeighborhood}, we build ${city.architectureStyle.toLowerCase()}-appropriate stonework, patios, retaining walls, and chimneys. ${city.localProof}.`,
    localContext: `${city.name} (population ${city.population}) sits in ${city.region}. ${city.climateNote}. Our crews are based in Woburn and reach ${city.name} on a regular schedule — usually within 48 hours of your first call.`,
    metaTitle: `Masonry Contractor in ${city.name}, MA | Patios, Walls & Chimneys | JL Masonry`,
    metaDescription: `Expert masonry services in ${city.name}, MA. Patios, stone walls, walkways, chimneys, retaining walls & hardscape. Serving ${neighborhood} & all of ${city.name}. Free estimates: (617) 913-9845.`,
    keywords: [
      `masonry contractor ${city.name} MA`,
      `mason ${city.name}`,
      `patio builder ${city.name}`,
      `stone wall ${city.name}`,
      `chimney repair ${city.name} MA`,
      `${city.county} County masonry`,
      `hardscape ${city.name}`,
      `retaining wall ${city.name}`,
      `JL Masonry ${city.name}`,
    ],
  };
}
