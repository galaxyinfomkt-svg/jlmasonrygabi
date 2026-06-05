// Real Google Business Profile reviews for JL Masonry & Construction.
//
// IMPORTANT — every entry here must come from the actual GBP at
// https://g.page/r/CYrB7gKa9WaQEBM/review and be reproducible there.
// Do NOT add placeholder, paraphrased, or AI-generated reviews — the
// schema below is emitted as schema.org Review markup and a fabricated
// review is grounds for a Google manual action (and an FTC issue).
//
// State as of this commit: Jonildo's GBP is temporarily unavailable, so
// we have ZERO reviews we can legally markup. JsonLd.tsx therefore does
// NOT emit a `review` block until this array has at least one verified
// entry. The visual <Testimonials /> component is unaffected — it can
// keep showing wording for social proof, but it must NOT be wired back
// into structured data without each entry being a real, dated GBP review.
//
// TODO(Luiz): once Jonildo's GBP is restored, pull each visible review
// here with the EXACT author name (or initial+last initial as shown on
// GBP), the EXACT date the review was posted, the verbatim text, and the
// star rating. Then JsonLd.tsx will start emitting the review schema
// again. Same goes for site.rating in lib/site.ts — replace the current
// values with the real count/average from GBP once visible.

export type RealReview = {
  /** Author name as it appears on the public GBP review */
  author: string;
  /** ISO date — when the review was posted on GBP */
  datePublished: string;
  /** 1–5 star rating */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Verbatim review text from GBP */
  text: string;
  /** Optional: city/state if disclosed on the review */
  location?: string;
};

export const realReviews: RealReview[] = [
  // TODO(Luiz): populate with verified GBP reviews once they're restored.
];

/** True iff we have at least one real, dated review safe to mark up. */
export const hasRealReviews = realReviews.length > 0;
