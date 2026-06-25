import {
  attractions as fallbackAttractions,
  businesses as fallbackBusinesses,
  experiences as fallbackExperiences,
  gallery as fallbackGallery,
  properties as fallbackProperties,
  sponsors as fallbackSponsors,
  stats as fallbackStats,
  wildlife as fallbackWildlife
} from "@/data/site";

const apiBaseUrl = (process.env.MIRAVALLESGTE_API_URL || "https://miravallesgte-api.onrender.com").replace(/\/$/, "");

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
  isBoosted?: boolean;
  boostWeight?: number;
};

export type SiteExperience = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  images: string[];
  duration: string;
  difficulty: string;
  price: string;
  provider?: string;
  location: string;
  contactUrl: string;
  whatsapp?: string;
  isFeatured: boolean;
  season: string;
  isBoosted?: boolean;
  boostWeight?: number;
};

export type SiteProperty = {
  id: string;
  title: string;
  slug: string;
  operation: string;
  type: string;
  price: string;
  image: string;
  images: string[];
  description: string;
  location: string;
  area: string;
  landSize: string;
  contactUrl: string;
  isFeatured: boolean;
  isBoosted?: boolean;
  boostWeight?: number;
};

export type SiteAttraction = {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  description?: string;
  image: string;
  images: string[];
  icon: string;
  location: string;
  coordinates?: { lat: number; lng: number };
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
  id?: string;
  key?: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  image?: string;
  imageAlt?: string;
  startsAt?: string;
  endsAt?: string;
  targetBusiness?: {
    name?: string;
    slug?: string;
    category?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    href: string;
  } | null;
};

export type SitePromotion = SitePromoSlot & {
  serveId: string;
  promotionId?: string;
  targetType: "business" | "experience" | "property";
  targetId: string;
  category: string;
  href: string;
  clickHref: string;
};

export type SiteGalleryItem = {
  src: string;
  alt: string;
  span: string;
};

export type SiteMapPoint = {
  id: string;
  name: string;
  category: string;
  kind: "business" | "attraction";
  summary: string;
  image?: string;
  href: string;
  location: string;
  approximate: boolean;
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
  contact: {
    email: string;
    whatsapp: string;
  };
  siteName: string;
  experiences: SiteExperience[];
  experienceCategories: string[];
  gallery: SiteGalleryItem[];
  mapPoints: SiteMapPoint[];
  properties: SiteProperty[];
  propertyOperations: string[];
  propertyTypes: string[];
  species: SiteSpecies[];
  sponsors: SiteSponsor[];
  stats: typeof fallbackStats;
  wildlife: typeof fallbackWildlife;
};

export async function getSiteData(): Promise<SiteData> {
  const [businesses, experiences, properties, attractions, species, sponsors, gallery, settings] =
    await Promise.all([
      fetchCollection("businesses"),
      fetchCollection("experiences"),
      fetchCollection("properties"),
      fetchCollection("attractions"),
      fetchCollection("species"),
      fetchCollection("sponsors"),
      fetchCollection("gallery-assets"),
      fetchCollection("site-settings")
    ]);

  const normalizedBusinesses = published(businesses).map(normalizeBusiness);
  const normalizedExperiences = published(experiences).map(normalizeExperience);
  const normalizedProperties = published(properties).map(normalizeProperty);
  const normalizedAttractions = published(attractions).map(normalizeAttraction);
  const normalizedSponsors = published(sponsors).map(normalizeSponsor);
  const normalizedGallery = published(gallery).map(normalizeGalleryAsset);
  const normalizedSpecies = published(species).map(normalizeSpecies);
  const speciesSource = normalizedSpecies.length ? normalizedSpecies : normalizeFallbackSpecies();
  const mainSettings = settings.find((item) => item.key === "main")?.value;
  const contactSettings = mainSettings?.contact && typeof mainSettings.contact === "object" ? mainSettings.contact : {};

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
    contact: {
      email: contactSettings.email || "info@miravallescr.com",
      whatsapp: normalizeWhatsAppUrl(contactSettings.whatsapp)
    },
    siteName: mainSettings?.siteName || "Raíz Volcanica",
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
    mapPoints: buildMapPoints(
      normalizedBusinesses.length ? normalizedBusinesses : fallbackBusinesses.map(normalizeFallbackBusiness),
      normalizedAttractions.length ? normalizedAttractions : fallbackAttractions.map(normalizeFallbackAttraction)
    ),
    properties: normalizedProperties.length ? normalizedProperties : fallbackProperties.map(normalizeFallbackProperty),
    propertyOperations: unique(normalizedProperties.map((item) => item.operation), ["Venta", "Alquiler"]),
    propertyTypes: unique(normalizedProperties.map((item) => item.type), ["Casa", "Finca", "Lote", "Comercio"]),
    species: speciesSource,
    sponsors: normalizedSponsors.length ? normalizedSponsors : fallbackSponsors,
    stats: Array.isArray(mainSettings?.stats) ? mainSettings.stats : fallbackStats,
    wildlife: normalizeWildlife(speciesSource)
  };
}

export async function getPromotion(placement: string): Promise<SitePromotion | null> {
  try {
    const response = await fetch(`${apiBaseUrl}/api/public/promotions/serve?placement=${encodeURIComponent(placement)}`, {
      cache: "no-store"
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { item?: SitePromotion };
    if (!data.item) return null;
    return {
      ...data.item,
      clickHref: data.item.clickHref.startsWith("http") ? data.item.clickHref : `${apiBaseUrl}${data.item.clickHref}`,
      href: data.item.href
    };
  } catch {
    return null;
  }
}

export async function getPublicPromotions(): Promise<SitePromoSlot[]> {
  try {
    const response = await fetch(`${apiBaseUrl}/api/public/promotions`, { cache: "no-store" });
    if (!response.ok) return [];
    const data = (await response.json()) as ApiList<ApiRecord>;
    return (data.items ?? []).map(normalizePromoSlot);
  } catch {
    return [];
  }
}

export async function getPublicPromotion(key: string): Promise<SitePromoSlot | null> {
  try {
    const response = await fetch(`${apiBaseUrl}/api/public/promotions/${encodeURIComponent(key)}`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = (await response.json()) as { item?: ApiRecord };
    return data.item ? normalizePromoSlot(data.item) : null;
  } catch {
    return null;
  }
}

export function withWhatsAppMessage(whatsappUrl: string | undefined, message: string) {
  if (!whatsappUrl) return "";
  const separator = whatsappUrl.includes("?") ? "&" : "?";
  return `${whatsappUrl}${separator}text=${encodeURIComponent(message)}`;
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
    location: item.location?.text || item.location?.address || item.location?.area || "Región norte de Costa Rica",
    coordinates: item.location?.coordinates,
    phone: formatCostaRicaPhone(item.contact?.phone),
    whatsapp: normalizeWhatsAppUrl(item.contact?.whatsapp),
    website: item.contact?.website,
    socialLinks: item.contact?.socialLinks ?? {},
    isFeatured: Boolean(item.isFeatured),
    isSponsor: Boolean(item.sponsorLevel),
    sponsorLevel: item.sponsorLevel,
    services: item.services ?? [],
    openingHours: item.openingHours,
    isBoosted: Boolean(item.isBoosted),
    boostWeight: Number(item.boostWeight ?? 1)
  };
}

function normalizeExperience(item: ApiRecord): SiteExperience {
  const provider = typeof item.providerBusinessId === "object" ? item.providerBusinessId?.name : item.providerSnapshot?.name;
  const images = normalizeImages(item.images);

  return {
    id: item._id,
    title: item.title,
    slug: item.slug,
    category: item.category,
    description: item.summary || item.description || "",
    image: images[0] || fallbackExperiences[0].image,
    images: images.length ? images : [fallbackExperiences[0].image],
    duration: item.duration || "Consultar",
    difficulty: item.difficulty || "Consultar",
    price: item.price || "Consultar",
    provider: provider || "Aliado local",
    location: item.location?.text || "Región norte de Costa Rica",
    contactUrl: "/contacto",
    whatsapp: normalizeWhatsAppUrl(item.contact?.whatsapp || item.providerSnapshot?.whatsapp),
    isFeatured: Boolean(item.isFeatured),
    season: item.season || "Todo el año",
    isBoosted: Boolean(item.isBoosted),
    boostWeight: Number(item.boostWeight ?? 1)
  };
}

function normalizeProperty(item: ApiRecord): SiteProperty {
  const images = normalizeImages(item.images);

  return {
    id: item._id,
    title: item.title,
    slug: item.slug,
    operation: item.operation === "rent" ? "Alquiler" : "Venta",
    type: item.type,
    price: item.price?.label || (item.price?.amount ? `${item.price.currency || "USD"} ${item.price.amount}` : "Consultar"),
    image: images[0] || fallbackProperties[0].image,
    images: images.length ? images : [fallbackProperties[0].image],
    description: item.summary || item.description || "",
    location: item.location?.text || "Región norte de Costa Rica",
    area: item.area || "Consultar",
    landSize: item.landSize || "Consultar",
    contactUrl: "/contacto",
    isFeatured: Boolean(item.isFeatured),
    isBoosted: Boolean(item.isBoosted),
    boostWeight: Number(item.boostWeight ?? 1)
  };
}

function normalizeAttraction(item: ApiRecord): SiteAttraction {
  const images = normalizeImages(item.images);

  return {
    id: item._id,
    title: item.title,
    slug: item.slug,
    category: item.category || "Atractivo",
    summary: item.summary || item.description || "",
    description: item.description,
    image: images[0] || fallbackAttractions[0].image,
    images: images.length ? images : [fallbackAttractions[0].image],
    icon: item.icon || "Leaf",
    location: item.location?.text || "Región norte de Costa Rica",
    coordinates: item.location?.coordinates
  };
}

function normalizeSponsor(item: ApiRecord): SiteSponsor {
  return {
    id: item._id,
    name: item.name,
    logo: item.logo?.url || item.name?.slice(0, 2)?.toUpperCase() || "SP",
    description: item.description || "",
    website: normalizeExternalUrl(item.website) || "/alianzas",
    level: item.level || "aliado",
    active: item.active !== false
  };
}

function normalizeExternalUrl(value?: string) {
  const url = value?.trim();
  if (!url) return "";
  if (url.startsWith("/") || /^https?:\/\//i.test(url) || /^mailto:/i.test(url) || /^tel:/i.test(url)) return url;
  return `https://${url}`;
}

function normalizeWhatsAppUrl(value?: string) {
  const digits = normalizeCostaRicaPhone(value);
  return digits.length === 11 ? `https://wa.me/${digits}` : "";
}

function normalizeCostaRicaPhone(value?: string) {
  const digits = value?.replace(/\D/g, "") ?? "";
  if (!digits) return "";
  if (digits.startsWith("506") && digits.length >= 11) return digits.slice(0, 11);
  const localNumber = digits.length >= 8 ? digits.slice(-8) : digits;
  return localNumber.length === 8 ? `506${localNumber}` : localNumber;
}

function formatCostaRicaPhone(value?: string) {
  const digits = normalizeCostaRicaPhone(value);
  if (!digits) return "";
  if (!digits.startsWith("506") || digits.length !== 11) return digits;
  return `+506 ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function normalizePromoSlot(item: ApiRecord): SitePromoSlot {
  return {
    id: item.id || item._id,
    key: item.key,
    eyebrow: item.eyebrow || "Destacado",
    title: item.title,
    description: item.description || "",
    cta: item.cta || "Ver más",
    image: item.image || normalizeImages(item.images)[0],
    imageAlt: item.imageAlt || item.images?.[0]?.alt || item.title,
    startsAt: item.startsAt,
    endsAt: item.endsAt,
    targetBusiness: item.targetBusiness ?? null
  };
}

function normalizeGalleryAsset(item: ApiRecord): SiteGalleryItem {
  return {
    src: item.url,
    alt: item.alt || item.title || "Imagen de la región",
    span: ""
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
    coordinates: item.coordinates,
    phone: formatCostaRicaPhone(item.phone),
    whatsapp: normalizeWhatsAppUrl(item.whatsapp),
    website: item.website,
    socialLinks: sanitizeSocialLinks(item.socialLinks),
    isFeatured: item.isFeatured,
    isSponsor: item.isSponsor,
    sponsorLevel: item.sponsorLevel,
    services: item.services,
    openingHours: item.openingHours
  };
}

function normalizeFallbackExperience(item: (typeof fallbackExperiences)[number], index: number): SiteExperience {
  const images = "images" in item && Array.isArray(item.images)
    ? item.images
    : [item.image, fallbackGallery[index % fallbackGallery.length].src];

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    category: item.category,
    description: item.description,
    image: item.image,
    images,
    duration: item.duration,
    difficulty: item.difficulty,
    price: item.price,
    provider: item.provider,
    location: item.location,
    contactUrl: item.contactUrl,
    whatsapp: normalizeWhatsAppUrl(item.whatsapp),
    isFeatured: item.isFeatured,
    season: item.season
  };
}

function sanitizeSocialLinks(socialLinks: Record<string, string | undefined> | undefined) {
  if (!socialLinks) return {};
  return Object.fromEntries(Object.entries(socialLinks).filter((entry): entry is [string, string] => Boolean(entry[1])));
}

function normalizeFallbackProperty(item: (typeof fallbackProperties)[number], index: number): SiteProperty {
  const images = "images" in item && Array.isArray(item.images)
    ? item.images
    : [item.image, fallbackGallery[index % fallbackGallery.length].src];

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    operation: item.operation,
    type: item.type,
    price: item.price,
    image: item.image,
    images,
    description: item.description,
    location: item.location,
    area: item.area,
    landSize: item.landSize,
    contactUrl: item.contactUrl,
    isFeatured: item.isFeatured
  };
}

function normalizeFallbackAttraction(item: (typeof fallbackAttractions)[number], index: number): SiteAttraction {
  const images = "images" in item && Array.isArray(item.images)
    ? item.images
    : [item.image, fallbackGallery[index % fallbackGallery.length].src];

  return {
    id: `attraction-${item.slug}`,
    title: item.title,
    slug: item.slug,
    category: "Atractivo",
    summary: item.summary,
    image: item.image,
    images,
    icon: item.icon.displayName || item.icon.name || "Leaf",
    location: "Región norte de Costa Rica",
    coordinates: undefined
  };
}

function buildMapPoints(businesses: SiteBusiness[], attractions: SiteAttraction[]): SiteMapPoint[] {
  const businessPoints = businesses
    .filter((item) => validCoordinates(item.coordinates))
    .map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      kind: "business" as const,
      summary: item.description,
      image: item.images[0],
      href: `/negocios/${item.slug}`,
      location: item.location,
      approximate: true,
      lat: item.coordinates!.lat,
      lng: item.coordinates!.lng
    }));

  const attractionPoints = attractions
    .filter((item) => validCoordinates(item.coordinates))
    .map((item) => ({
      id: item.id,
      name: item.title,
      category: item.category,
      kind: "attraction" as const,
      summary: item.summary,
      image: item.image,
      href: `/atractivos/${item.slug}`,
      location: item.location,
      approximate: true,
      lat: item.coordinates!.lat,
      lng: item.coordinates!.lng
    }));

  return [...attractionPoints, ...businessPoints];
}

function validCoordinates(coordinates?: { lat: number; lng: number }) {
  return Boolean(
    coordinates &&
    Number.isFinite(coordinates.lat) &&
    Number.isFinite(coordinates.lng) &&
    coordinates.lat >= -90 && coordinates.lat <= 90 &&
    coordinates.lng >= -180 && coordinates.lng <= 180
  );
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
