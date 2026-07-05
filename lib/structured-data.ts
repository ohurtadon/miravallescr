import type { SiteAttraction, SiteBusiness, SiteProperty } from "@/lib/site-api";
import { absoluteSiteUrl, siteName } from "@/lib/seo";

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue | undefined };

export function buildBusinessJsonLd(business: SiteBusiness) {
  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    url: absoluteSiteUrl(`/negocios/${business.slug}`),
    image: business.images,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.location,
      addressRegion: "Guanacaste",
      addressCountry: "CR"
    },
    geo: business.coordinates ? {
      "@type": "GeoCoordinates",
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng
    } : undefined,
    openingHours: business.openingHours,
    sameAs: Object.values(business.socialLinks ?? {}).filter(Boolean),
    makesOffer: business.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service
      }
    }))
  });
}

export function buildAttractionJsonLd(attraction: SiteAttraction) {
  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: attraction.title,
    description: attraction.summary,
    url: absoluteSiteUrl(`/atractivos/${attraction.slug}`),
    image: attraction.images,
    touristType: ["Ecoturistas", "Familias", "Viajeros de aventura"],
    address: {
      "@type": "PostalAddress",
      streetAddress: attraction.location,
      addressRegion: "Guanacaste",
      addressCountry: "CR"
    },
    geo: attraction.coordinates ? {
      "@type": "GeoCoordinates",
      latitude: attraction.coordinates.lat,
      longitude: attraction.coordinates.lng
    } : undefined,
    isPartOf: {
      "@type": "TouristDestination",
      name: siteName,
      url: absoluteSiteUrl("/")
    }
  });
}

export function buildPropertyJsonLd(property: SiteProperty) {
  return compactJsonLd({
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    url: absoluteSiteUrl(`/propiedades/${property.slug}`),
    image: property.images,
    category: property.type,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Operación",
        value: property.operation
      },
      {
        "@type": "PropertyValue",
        name: "Construcción",
        value: property.area
      },
      {
        "@type": "PropertyValue",
        name: "Terreno",
        value: property.landSize
      },
      {
        "@type": "PropertyValue",
        name: "Ubicación",
        value: property.location
      },
      {
        "@type": "PropertyValue",
        name: "Precio",
        value: property.price
      }
    ]
  });
}

function compactJsonLd(value: JsonValue | undefined): JsonValue | undefined {
  if (Array.isArray(value)) {
    const items = value.map(compactJsonLd).filter((item) => item !== undefined);
    return items.length ? items as JsonValue[] : undefined;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([key, item]) => [key, compactJsonLd(item as JsonValue | undefined)] as const)
      .filter(([, item]) => item !== undefined);

    return entries.length ? Object.fromEntries(entries) as JsonObject : undefined;
  }

  return value === "" || value === undefined ? undefined : value;
}
