import { faqs, services, site } from "@/lib/site";
import { BUSINESS_ID } from "@/lib/schema";
import { hasRealReviews, realReviews } from "@/lib/reviews";

export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
    "@id": BUSINESS_ID,
    name: site.name,
    alternateName: site.shortName,
    legalName: "J L Masonry & Construction, LLC",
    image: `${site.website}/assets/logo.png`,
    logo: `${site.website}/assets/logo.png`,
    url: site.website,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
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
    founder: { "@type": "Person", name: "Jonildo Leitão", jobTitle: "Owner" },
    ...(site.hic
      ? {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Massachusetts Home Improvement Contractor Registration",
            identifier: site.hic,
          },
        }
      : {}),
    sameAs: [site.social.facebook, site.social.instagram, site.social.bbb],
    // Review markup only from real, dated reviews in lib/reviews.ts.
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
