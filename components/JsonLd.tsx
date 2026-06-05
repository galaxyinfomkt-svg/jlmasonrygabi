import { faqs, services, site } from "@/lib/site";
import { hasRealReviews, realReviews } from "@/lib/reviews";

// Set this to true ONLY when site.rating mirrors the actual public Google
// Business Profile (currently 47 reviews / 5.0 average per site.ts). With
// the GBP offline (per Jonildo) we can't verify those numbers right now,
// so the home-page LocalBusiness ships without aggregateRating until
// someone flips this back on.
// TODO(Luiz): set to true once GBP is restored and the rating is verified.
const RATING_VERIFIED = false;

export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": `${site.website}#business`,
    name: site.name,
    alternateName: site.shortName,
    image: `${site.website}/assets/logo.png`,
    logo: `${site.website}/assets/logo.png`,
    url: site.website,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: site.address.serviceArea,
    },
    geo: { "@type": "GeoCoordinates", latitude: 42.4793, longitude: -71.1523 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$",
    sameAs: [site.social.facebook, site.social.instagram],
    // aggregateRating + review are only emitted when we have a verified
    // source. Shipping fabricated/placeholder reviews as schema.org markup
    // is grounds for a manual action and an FTC issue — see lib/reviews.ts.
    ...(RATING_VERIFIED
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: site.rating.value,
            reviewCount: site.rating.count.toString(),
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
    ...(hasRealReviews
      ? {
          review: realReviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            datePublished: r.datePublished,
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating.toString(),
              bestRating: "5",
            },
            reviewBody: r.text,
          })),
        }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Masonry & Hardscape Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          areaServed: site.address.serviceArea,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
