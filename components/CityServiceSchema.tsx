// Per-page JSON-LD: Service + Place + Breadcrumb + FAQ. No LocalBusiness here:
// every page points to the single business entity (BUSINESS_ID) on the home.
// Used by both city pages and city × service combo pages.

import type { City } from "@/lib/cities";
import type { ServiceMeta } from "@/lib/service-meta";
import { site } from "@/lib/site";
import { BUSINESS_ID, offerFor } from "@/lib/schema";

type Props = {
  city: City;
  service?: ServiceMeta;
  url: string;
};

export default function CityServiceSchema({ city, service, url }: Props) {
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

  const cityArea = {
    "@type": "City",
    name: `${city.name}, ${city.state}`,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: `${city.county} County, Massachusetts`,
    },
  };

  const serviceSchema = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        serviceType: service.longLabel,
        name: `${service.longLabel} in ${city.name}, ${city.state}`,
        description: `${service.longLabel} for ${city.name} homeowners. Locally owned, based in Woburn. ${service.whyNow}`,
        url,
        provider: { "@id": BUSINESS_ID },
        areaServed: cityArea,
        offers: offerFor(service.costRange),
      }
    : {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        serviceType: "Masonry contractor",
        name: `Masonry services in ${city.name}, ${city.state}`,
        url,
        provider: { "@id": BUSINESS_ID },
        areaServed: cityArea,
      };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(place) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
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
