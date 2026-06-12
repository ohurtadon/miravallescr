import {
  attractions as fallbackAttractions,
  businesses as fallbackBusinesses,
  experiences as fallbackExperiences,
  gallery as fallbackGallery,
  mapPoints as fallbackMapPoints,
  promoSlots as fallbackPromoSlots,
  properties as fallbackProperties,
  sponsors as fallbackSponsors,
  stats as fallbackStats,
  wildlife as fallbackWildlife
} from "@/data/site";

const apiBaseUrl = process.env.MIRAVALLESGTE_API_URL?.replace(/\/$/, "");

type ApiList<T> = {
  items: T[];
};

type ImageAsset = {
  url?: string;
  alt?: string;
};

type ApiRecord = Record<string, any>;

export type SiteBusiness = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  images: string[];
  location: string;
  coordinates?: { lat: number; lng: number };
  phone?: string;
  whatsapp?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  isFeatured: boolean;
  isSponsor?: boolean;
  sponsorLevel?: string;
  services: string[];
  openingHours?: string;
};

export type SiteExperience = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  duration: string;
  difficulty: string;
  price: string;
  provider?: string;
  location: string;
  contactUrl: string;
  whatsapp?: string;
  isFeatured: boolean;
  season: string;
};

export type SiteProperty = {
  id: string;
  title: string;
  slug: string;
  operation: string;
  type: string;
  price: string;
  image: string;
  description: string;
  location: string;
  area: string;
  landSize: string;
  contactUrl: string;
  isFeatured: boolean;
};

export type SiteAttraction = {
  title: string;
  slug: string;
  summary: string;
  description?: string;
  image: string;
  icon: string;
};

export type SiteSponsor = {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  level: string;
  active: boolean;
};

export type SitePromoSlot = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

export type SiteGalleryItem = {
  src: string;
  alt: string;
  span: string;
};

export type SiteMapPoint = {
  name: string;
  category: string;
  lng: number;
  lat: number;
};

export type SiteSpecies = {
  id: string;
  slug: string;
  commonName: string;
  scientificName?: string;
  type: "flora" | "fauna";
  category: string;
  summary: string;
  description: string;
  image?: string;
  habitat?: string;
  conservationStatus?: string;
  isFeatured: boolean;
};

export type SiteData = {
  attractions: SiteAttraction[];
  businesses: SiteBusiness[];
  businessCategories: string[];
  experiences: SiteExperience[];
  experienceCategories: string[];
  gallery: SiteGalleryItem[];
  mapPoints: SiteMapPoint[];
  promoSlots: SitePromoSlot[];
  properties: SiteProperty[];
  propertyOperations: string[];
  propertyTypes: string[];
  species: SiteSpecies[];
  sponsors: SiteSponsor[];
  stats: typeof fallbackStats;
  wildlife: typeof fallbackWildlife;
};

export async function getSiteData(): Promise<SiteData> {
  const [businesses, experiences, properties, attractions, species, sponsors, promoSlots, gallery, mapPoints, settings] =
    await Promise.all([
      fetchCollection("businesses"),
      fetchCollection("experiences"),
      fetchCollection("properties"),
      fetchCollection("attractions"),
      fetchCollection("species"),
      fetchCollection("sponsors"),
      fetchCollection("promo-slots"),
      fetchCollection("gallery-assets"),
      fetchCollection("map-points"),
      fetchCollection("site-settings")
    ]);

  const normalizedBusinesses = published(businesses).map(normalizeBusiness);
  const normalizedExperiences = published(experiences).map(normalizeExperience);
  const normalizedProperties = published(properties).map(normalizeProperty);
  const normalizedAttractions = published(attractions).map(normalizeAttraction);
  const normalizedSponsors = published(sponsors).map(normalizeSponsor);
  const normalizedPromoSlots = promoSlots.filter((item) => item.active !== false).map(normalizePromoSlot);
  const normalizedGallery = published(gallery).map(normalizeGalleryAsset);
  const normalizedMapPoints = mapPoints.filter((item) => item.visible !== false).map(normalizeMapPoint);
  const normalizedSpecies = published(species).map(normalizeSpecies);
  const speciesSource = normalizedSpecies.length ? normalizedSpecies : normalizeFallbackSpecies();
  const mainSettings = settings.find((item) => item.key === "main")?.value;

  return {
    attractions: normalizedAttractions.length ? normalizedAttractions : fallbackAttractions.map(normalizeFallbackAttraction),
    businesses: normalizedBusinesses.length ? normalizedBusinesses : fallbackBusinesses.map(normalizeFallbackBusiness),
    businessCategories: unique(normalizedBusinesses.map((item) => item.category), [
      "Hospedaje",
      "Restaurante",
      "Guía turístico",
      "Termales",
      "Tour operador",
      "Transporte",
      "Artesanía",
      "Producto local"
    ]),
    experiences: normalizedExperiences.length ? normalizedExperiences : fallbackExperiences.map(normalizeFallbackExperience),
    experienceCategories: unique(normalizedExperiences.map((item) => item.category), [
      "Naturaleza",
      "Aventura",
      "Relajación",
      "Familiar",
      "Fotografía",
      "Observación de aves",
      "Turismo rural"
    ]),
    gallery: normalizedGallery.length ? normalizedGallery : fallbackGallery,
    mapPoints: normalizedMapPoints.length ? normalizedMapPoints : fallbackMapPoints,
    promoSlots: normalizedPromoSlots.length ? normalizedPromoSlots : fallbackPromoSlots,
    properties: normalizedProperties.length ? normalizedProperties : fallbackProperties.map(normalizeFallbackProperty),
    propertyOperations: unique(normalizedProperties.map((item) => item.operation), ["Venta", "Alquiler"]),
    propertyTypes: unique(normalizedProperties.map((item) => item.type), ["Casa", "Finca", "Lote", "Comercio"]),
    species: speciesSource,
    sponsors: normalizedSponsors.length ? normalizedSponsors : fallbackSponsors,
    stats: Array.isArray(mainSettings?.stats) ? mainSettings.stats : fallbackStats,
    wildlife: normalizeWildlife(speciesSource)
  };
}

async function fetchCollection(collection: string) {
  if (!apiBaseUrl) return [];

  try {
    const response = await fetch(`${apiBaseUrl}/api/public/${collection}?limit=100&sort=displayOrder,-updatedAt`, {
      cache: "no-store"
    });

    if (!response.ok) return [];
    const data = (await response.json()) as ApiList<ApiRecord>;
    return data.items ?? [];
  } catch {
    return [];
  }
}

function normalizeBusiness(item: ApiRecord): SiteBusiness {
  return {
    id: item._id,
    name: item.name,
    slug: item.slug,
    category: item.category,
    description: item.summary || item.description || "",
    longDescription: item.description || item.summary || "",
    images: normalizeImages(item.images),
    location: item.location?.text || item.location?.address || item.location?.area || "Miravalles",
    coordinates: item.location?.coordinates,
    phone: item.contact?.phone,
    whatsapp: item.contact?.whatsapp,
    website: item.contact?.website,
    socialLinks: item.contact?.socialLinks ?? {},
    isFeatured: Boolean(item.isFeatured),
    isSponsor: Boolean(item.sponsorLevel),
    sponsorLevel: item.sponsorLevel,
    services: item.services ?? [],
    openingHours: item.openingHours
  };
}

function normalizeExperience(item: ApiRecord): SiteExperience {
  const provider = typeof item.providerBusinessId === "object" ? item.providerBusinessId?.name : item.providerSnapshot?.name;

  return {
    id: item._id,
    title: item.title,
    slug: item.slug,
    category: item.category,
    description: item.summary || item.description || "",
    image: normalizeImages(item.images)[0] || fallbackExperiences[0].image,
    duration: item.duration || "Consultar",
    difficulty: item.difficulty || "Consultar",
    price: item.price || "Consultar",
    provider: provider || "Aliado local",
    location: item.location?.text || "Miravalles",
    contactUrl: "/contacto",
    whatsapp: item.contact?.whatsapp || item.providerSnapshot?.whatsapp,
    isFeatured: Boolean(item.isFeatured),
    season: item.season || "Todo el año"
  };
}

function normalizeProperty(item: ApiRecord): SiteProperty {
  return {
    id: item._id,
    title: item.title,
    slug: item.slug,
    operation: item.operation === "rent" ? "Alquiler" : "Venta",
    type: item.type,
    price: item.price?.label || (item.price?.amount ? `${item.price.currency || "USD"} ${item.price.amount}` : "Consultar"),
    image: normalizeImages(item.images)[0] || fallbackProperties[0].image,
    description: item.summary || item.description || "",
    location: item.location?.text || "Miravalles",
    area: item.area || "Consultar",
    landSize: item.landSize || "Consultar",
    contactUrl: "/contacto",
    isFeatured: Boolean(item.isFeatured)
  };
}

function normalizeAttraction(item: ApiRecord): SiteAttraction {
  return {
    title: item.title,
    slug: item.slug,
    summary: item.summary || item.description || "",
    description: item.description,
    image: normalizeImages(item.images)[0] || fallbackAttractions[0].image,
    icon: item.icon || "Leaf"
  };
}

function normalizeSponsor(item: ApiRecord): SiteSponsor {
  return {
    id: item._id,
    name: item.name,
    logo: item.logo?.url || item.name?.slice(0, 2)?.toUpperCase() || "SP",
    description: item.description || "",
    website: item.website || "/alianzas",
    level: item.level || "aliado",
    active: item.active !== false
  };
}

function normalizePromoSlot(item: ApiRecord): SitePromoSlot {
  return {
    eyebrow: item.eyebrow || "Destacado",
    title: item.title,
    description: item.description || "",
    href: item.href || "/contacto",
    cta: item.cta || "Ver más"
  };
}

function normalizeGalleryAsset(item: ApiRecord): SiteGalleryItem {
  return {
    src: item.url,
    alt: item.alt || item.title || "Imagen de Miravalles",
    span: ""
  };
}

function normalizeMapPoint(item: ApiRecord): SiteMapPoint {
  return {
    name: item.name,
    category: item.category,
    lat: item.coordinates?.lat ?? 10.72,
    lng: item.coordinates?.lng ?? -85.15
  };
}

function normalizeSpecies(item: ApiRecord): SiteSpecies {
  return {
    id: item._id,
    slug: item.slug,
    commonName: item.commonName,
    scientificName: item.scientificName,
    type: item.type,
    category: item.category || (item.type === "flora" ? "Flora" : "Fauna"),
    summary: item.summary || item.description || "Contenido ampliable con fotografias y datos locales.",
    description: item.description || item.summary || "Contenido ampliable con fotografias y datos locales.",
    image: normalizeImages(item.images)[0],
    habitat: item.habitat,
    conservationStatus: item.conservationStatus,
    isFeatured: Boolean(item.isFeatured)
  };
}

function normalizeWildlife(species: SiteSpecies[]) {
  const flora = species.filter((item) => item.type === "flora").map((item) => item.commonName).filter(Boolean);
  const fauna = species.filter((item) => item.type === "fauna").map((item) => item.commonName).filter(Boolean);

  return {
    flora: flora.length ? flora : fallbackWildlife.flora,
    fauna: fauna.length ? fauna : fallbackWildlife.fauna
  };
}

function normalizeFallbackSpecies(): SiteSpecies[] {
  return [
    ...fallbackWildlife.fauna.map((name, index) => ({
      id: `fallback-fauna-${index}`,
      slug: slugify(name),
      commonName: name,
      type: "fauna" as const,
      category: "Fauna",
      summary: "Contenido ampliable con fotografias y datos locales.",
      description: "Contenido ampliable con fotografias y datos locales.",
      isFeatured: false
    })),
    ...fallbackWildlife.flora.map((name, index) => ({
      id: `fallback-flora-${index}`,
      slug: slugify(name),
      commonName: name,
      type: "flora" as const,
      category: "Flora",
      summary: "Contenido ampliable con fotografias y datos locales.",
      description: "Contenido ampliable con fotografias y datos locales.",
      isFeatured: false
    }))
  ];
}

function normalizeImages(images: ImageAsset[] | undefined) {
  return images?.map((image) => image.url).filter(Boolean) as string[] || [];
}

function normalizeFallbackBusiness(item: (typeof fallbackBusinesses)[number]): SiteBusiness {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    category: item.category,
    description: item.description,
    longDescription: item.longDescription,
    images: item.images,
    location: item.location,
    phone: item.phone,
    whatsapp: item.whatsapp,
    website: item.website,
    socialLinks: sanitizeSocialLinks(item.socialLinks),
    isFeatured: item.isFeatured,
    isSponsor: item.isSponsor,
    sponsorLevel: item.sponsorLevel,
    services: item.services,
    openingHours: item.openingHours
  };
}

function normalizeFallbackExperience(item: (typeof fallbackExperiences)[number]): SiteExperience {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    category: item.category,
    description: item.description,
    image: item.image,
    duration: item.duration,
    difficulty: item.difficulty,
    price: item.price,
    provider: item.provider,
    location: item.location,
    contactUrl: item.contactUrl,
    whatsapp: item.whatsapp,
    isFeatured: item.isFeatured,
    season: item.season
  };
}

function sanitizeSocialLinks(socialLinks: Record<string, string | undefined> | undefined) {
  if (!socialLinks) return {};
  return Object.fromEntries(Object.entries(socialLinks).filter((entry): entry is [string, string] => Boolean(entry[1])));
}

function normalizeFallbackProperty(item: (typeof fallbackProperties)[number]): SiteProperty {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    operation: item.operation,
    type: item.type,
    price: item.price,
    image: item.image,
    description: item.description,
    location: item.location,
    area: item.area,
    landSize: item.landSize,
    contactUrl: item.contactUrl,
    isFeatured: item.isFeatured
  };
}

function normalizeFallbackAttraction(item: (typeof fallbackAttractions)[number]): SiteAttraction {
  return {
    title: item.title,
    slug: item.slug,
    summary: item.summary,
    image: item.image,
    icon: item.icon.displayName || item.icon.name || "Leaf"
  };
}

function unique(values: string[], fallback: string[]) {
  const items = [...new Set(values.filter(Boolean))];
  return items.length ? items : fallback;
}

function published(items: ApiRecord[]) {
  return items.filter((item) => !item.status || item.status === "published");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
