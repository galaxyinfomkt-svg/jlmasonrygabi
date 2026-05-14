// Per-page JSON-LD: LocalBusiness branch + Service + Place + Breadcrumb + FAQ.
// Used by both city pages and city × service combo pages.

import type { City } from "@/lib/cities";
import type { ServiceMeta } from "@/lib/service-meta";
import { site } from "@/lib/site";

type Props = {
  city: City;
  service?: ServiceMeta;
  url: string;
};

export default function CityServiceSchema({ city, service, url }: Props) {
  const businessId = `${site.website}#${city.slug}${service ? `-${service.slug}` : ""}`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": businessId,
    name: service
      ? `JL Masonry & Construction — ${service.shortLabel} in ${city.name}, ${city.state}`
      : `JL Masonry & Construction — Serving ${city.name}, ${city.state}`,
    image: `${site.website}/assets/logo.png`,
    logo: `${site.website}/assets/logo.png`,
    url,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      "@id": `https://en.wikipedia.org/wiki/${city.name.replace(/\s+/g, "_")},_Massachusetts`,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${city.county} County, Massachusetts`,
      },
    },
    sameAs: [site.social.facebook, site.social.instagram],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
  };

  const place = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${city.name}, Massachusetts`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      postalCode: city.zip,
      addressCountry: "US",
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: `${city.county} County`,
    },
  };

  const serviceSchema = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: service.longLabel,
        name: `${service.longLabel} in ${city.name}, ${city.state}`,
        description: `${service.longLabel} for ${city.name} homeowners. Licensed, insured, and locally trusted. ${service.whyNow}`,
        provider: { "@id": businessId },
        areaServed: {
          "@type": "City",
          name: city.name,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: service.costRange,
          },
        },
      }
    : null;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.website },
      service
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: city.name,
              item: `${site.website}/${city.slug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: service.shortLabel,
              item: url,
            },
          ]
        : {
            "@type": "ListItem",
            position: 2,
            name: city.name,
            item: url,
          },
    ].flat(),
  };

  const faqSchema =
    service && service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(place) }}
      />
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
