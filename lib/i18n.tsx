"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "es" | "en";

type TranslationKey =
  | "language.label"
  | "language.es"
  | "language.en"
  | "nav.attractions"
  | "nav.wildlife"
  | "nav.experiences"
  | "nav.businesses"
  | "nav.properties"
  | "nav.promotions"
  | "nav.gallery"
  | "nav.map"
  | "nav.contact"
  | "header.openMenu"
  | "header.closeMenu"
  | "back.label"
  | "hero.badge"
  | "hero.title"
  | "hero.copy"
  | "hero.cta"
  | "discover.eyebrow"
  | "discover.title"
  | "discover.copy"
  | "discover.cta"
  | "attractions.eyebrow"
  | "attractions.title"
  | "attractions.copy"
  | "experiences.eyebrow"
  | "experiences.title"
  | "experiences.copy"
  | "experiences.filterTitle"
  | "experiences.filterCopy"
  | "businesses.eyebrow"
  | "businesses.title"
  | "businesses.copy"
  | "businesses.filterTitle"
  | "businesses.filterCopy"
  | "businesses.directoryCta"
  | "wildlife.eyebrow"
  | "wildlife.title"
  | "wildlife.copy"
  | "gallery.eyebrow"
  | "gallery.title"
  | "gallery.copy"
  | "gallery.close"
  | "map.eyebrow"
  | "map.title"
  | "map.copy"
  | "map.filterLabel"
  | "map.regionLabel"
  | "map.loading"
  | "map.errorTitle"
  | "map.errorCopy"
  | "map.placesTitle"
  | "map.placesCopy"
  | "map.empty"
  | "map.closeSummary"
  | "map.approxLocation"
  | "map.placePage"
  | "properties.eyebrow"
  | "properties.title"
  | "properties.copy"
  | "properties.filterTitle"
  | "properties.filterCopy"
  | "properties.operation"
  | "properties.type"
  | "properties.featured"
  | "sponsors.eyebrow"
  | "sponsors.title"
  | "sponsors.copy"
  | "sponsors.cta"
  | "cta.eyebrow"
  | "cta.title"
  | "cta.copy"
  | "cta.visit"
  | "cta.business"
  | "card.recommended"
  | "card.featured"
  | "card.duration"
  | "card.difficulty"
  | "card.fallbackPrice"
  | "card.more"
  | "filters.all"
  | "results.singular"
  | "results.plural"
  | "footer.copy"
  | "footer.explore"
  | "footer.info"
  | "footer.commercial"
  | "footer.social"
  | "footer.directions"
  | "footer.weather"
  | "footer.partnerships"
  | "footer.promoteExperience"
  | "footer.publishProperty";

const translations: Record<Locale, Record<TranslationKey, string>> = {
  es: {
    "language.label": "Idioma",
    "language.es": "ES",
    "language.en": "EN",
    "nav.attractions": "Atractivos",
    "nav.wildlife": "Flora y fauna",
    "nav.experiences": "Experiencias",
    "nav.businesses": "Negocios",
    "nav.properties": "Propiedades",
    "nav.promotions": "Promociones",
    "nav.gallery": "Galería",
    "nav.map": "Mapa",
    "nav.contact": "Contacto",
    "header.openMenu": "Abrir menú",
    "header.closeMenu": "Cerrar menú",
    "back.label": "Volver",
    "hero.badge": "Guía regional y plataforma turística",
    "hero.title": "Raíz Volcanica: naturaleza, termales y aventura local",
    "hero.copy": "Explora atractivos, experiencias y negocios locales del corredor volcánico y natural del norte de Costa Rica.",
    "hero.cta": "Explorar la región",
    "discover.eyebrow": "Descubre la región",
    "discover.title": "Un territorio vivo entre volcán, agua y bosque.",
    "discover.copy": "Este corredor reúne rutas de montaña, aguas termales, ríos frescos y una biodiversidad que invita a viajar con calma. Es una puerta a la naturaleza del norte de Costa Rica para quienes buscan aventura, descanso y turismo sostenible.",
    "discover.cta": "Conocer más",
    "attractions.eyebrow": "Principales atractivos",
    "attractions.title": "Rutas naturales para cada ritmo de viaje",
    "attractions.copy": "Agua, bosque, miradores y experiencias termales se combinan en un destino compacto y lleno de contrastes.",
    "experiences.eyebrow": "Experiencias",
    "experiences.title": "Actividades para viajar con intención",
    "experiences.copy": "Opciones promocionables de medio día o día completo, listas para conectar visitantes con guías, operadores y emprendimientos locales.",
    "experiences.filterTitle": "Filtrar experiencias",
    "experiences.filterCopy": "Selecciona una categoría para ver actividades relacionadas.",
    "businesses.eyebrow": "Negocios locales",
    "businesses.title": "Servicios turísticos con raíz local",
    "businesses.copy": "Un directorio preparado para conectar visitantes con hospedajes, restaurantes, guías, termales, transporte y productores de la zona.",
    "businesses.filterTitle": "Filtrar negocios",
    "businesses.filterCopy": "Selecciona una categoría para ajustar el directorio.",
    "businesses.directoryCta": "Ver directorio completo",
    "wildlife.eyebrow": "Flora y fauna",
    "wildlife.title": "La biodiversidad que da vida a este territorio volcánico",
    "wildlife.copy": "Bosques, aves, mamíferos y plantas tropicales hacen de la región un aula viva para visitantes y comunidades.",
    "gallery.eyebrow": "Galería",
    "gallery.title": "Primeras postales de un territorio donde la naturaleza es protagonista",
    "gallery.copy": "Estas imágenes son referenciales y serán reemplazadas por material real de la región en próximas iteraciones.",
    "gallery.close": "Cerrar galería",
    "map.eyebrow": "Mapa interactivo",
    "map.title": "Ubica atractivos y negocios locales",
    "map.copy": "Explora el territorio en un mapa real y abre la ficha de cada lugar para conocerlo mejor.",
    "map.filterLabel": "Filtrar puntos del mapa",
    "map.regionLabel": "Mapa interactivo de la región",
    "map.loading": "Cargando mapa de la región...",
    "map.errorTitle": "No fue posible cargar el mapa.",
    "map.errorCopy": "Revisa la conexión o la configuración del token de Mapbox.",
    "map.placesTitle": "Lugares en el mapa",
    "map.placesCopy": "Selecciona un marcador o un lugar para ver su resumen.",
    "map.empty": "No hay ubicaciones publicadas en esta categoría.",
    "map.closeSummary": "Cerrar resumen",
    "map.approxLocation": "Ubicación aproximada en Mogote",
    "map.placePage": "Ver página del lugar",
    "properties.eyebrow": "Propiedades",
    "properties.title": "Te gustó la zona, quieres vivir acá",
    "properties.copy": "Te ofrecemos las siguientes propiedades de ejemplo para preparar futuras oportunidades de venta o alquiler en la región.",
    "properties.filterTitle": "Filtrar propiedades",
    "properties.filterCopy": "Combina operación y tipo de propiedad.",
    "properties.operation": "Operación",
    "properties.type": "Tipo",
    "properties.featured": "Destacada",
    "sponsors.eyebrow": "Patrocinadores",
    "sponsors.title": "Aliados que impulsan el turismo sostenible y el desarrollo de la región",
    "sponsors.copy": "Espacios preparados para reconocer a negocios, organizaciones y emprendimientos que impulsan una promoción turística responsable.",
    "sponsors.cta": "Conocer aliado",
    "cta.eyebrow": "Plan de viaje",
    "cta.title": "Explore la región o forme parte de nuestra red de aliados locales",
    "cta.copy": "Conectamos visitantes con atractivos, experiencias y emprendimientos de la región mediante contacto directo.",
    "cta.visit": "Planificar visita",
    "cta.business": "Registrar negocio",
    "card.recommended": "Recomendada",
    "card.featured": "Destacado",
    "card.duration": "Duración",
    "card.difficulty": "Dificultad",
    "card.fallbackPrice": "Precio por definir",
    "card.more": "Ver más",
    "filters.all": "Todos",
    "results.singular": "resultado",
    "results.plural": "resultados",
    "footer.copy": "La plataforma que conecta volcanes, bosques, ríos, termales, comunidades y experiencias del norte de Costa Rica.",
    "footer.explore": "Explorar",
    "footer.info": "Información",
    "footer.commercial": "Comercial",
    "footer.social": "Redes sociales",
    "footer.directions": "Cómo llegar",
    "footer.weather": "Clima",
    "footer.partnerships": "Alianzas",
    "footer.promoteExperience": "Promocionar experiencia",
    "footer.publishProperty": "Publicar propiedad"
  },
  en: {
    "language.label": "Language",
    "language.es": "ES",
    "language.en": "EN",
    "nav.attractions": "Attractions",
    "nav.wildlife": "Flora and fauna",
    "nav.experiences": "Experiences",
    "nav.businesses": "Businesses",
    "nav.properties": "Properties",
    "nav.promotions": "Promotions",
    "nav.gallery": "Gallery",
    "nav.map": "Map",
    "nav.contact": "Contact",
    "header.openMenu": "Open menu",
    "header.closeMenu": "Close menu",
    "back.label": "Back",
    "hero.badge": "Regional guide and tourism platform",
    "hero.title": "Raíz Volcanica: nature, hot springs, and local adventure",
    "hero.copy": "Explore attractions, experiences, and local businesses across the volcanic and natural corridor of northern Costa Rica.",
    "hero.cta": "Explore the region",
    "discover.eyebrow": "Discover the region",
    "discover.title": "A living landscape shaped by volcanoes, water, and forest.",
    "discover.copy": "This corridor brings together mountain routes, hot springs, fresh rivers, and biodiversity that invites slow travel. It is a gateway to northern Costa Rica for travelers seeking adventure, rest, and sustainable tourism.",
    "discover.cta": "Learn more",
    "attractions.eyebrow": "Main attractions",
    "attractions.title": "Natural routes for every travel pace",
    "attractions.copy": "Water, forest, viewpoints, and hot spring experiences come together in a compact destination full of contrast.",
    "experiences.eyebrow": "Experiences",
    "experiences.title": "Activities for intentional travel",
    "experiences.copy": "Promotable half-day or full-day options ready to connect visitors with local guides, operators, and ventures.",
    "experiences.filterTitle": "Filter experiences",
    "experiences.filterCopy": "Choose a category to see related activities.",
    "businesses.eyebrow": "Local businesses",
    "businesses.title": "Tourism services with local roots",
    "businesses.copy": "A directory built to connect visitors with lodging, restaurants, guides, hot springs, transportation, and local producers.",
    "businesses.filterTitle": "Filter businesses",
    "businesses.filterCopy": "Choose a category to refine the directory.",
    "businesses.directoryCta": "View full directory",
    "wildlife.eyebrow": "Flora and fauna",
    "wildlife.title": "The biodiversity that brings this volcanic territory to life",
    "wildlife.copy": "Forests, birds, mammals, and tropical plants make the region a living classroom for visitors and communities.",
    "gallery.eyebrow": "Gallery",
    "gallery.title": "First postcards from a territory where nature leads",
    "gallery.copy": "These images are references and will be replaced with real material from the region in future iterations.",
    "gallery.close": "Close gallery",
    "map.eyebrow": "Interactive map",
    "map.title": "Find attractions and local businesses",
    "map.copy": "Explore the territory on a real map and open each place profile to learn more.",
    "map.filterLabel": "Filter map points",
    "map.regionLabel": "Interactive regional map",
    "map.loading": "Loading regional map...",
    "map.errorTitle": "The map could not be loaded.",
    "map.errorCopy": "Check the connection or the Mapbox token configuration.",
    "map.placesTitle": "Places on the map",
    "map.placesCopy": "Select a marker or place to see its summary.",
    "map.empty": "There are no published locations in this category.",
    "map.closeSummary": "Close summary",
    "map.approxLocation": "Approximate location in Mogote",
    "map.placePage": "View place page",
    "properties.eyebrow": "Properties",
    "properties.title": "You liked the area and want to live here",
    "properties.copy": "Example properties prepared for future sale or rental opportunities in the region.",
    "properties.filterTitle": "Filter properties",
    "properties.filterCopy": "Combine operation and property type.",
    "properties.operation": "Operation",
    "properties.type": "Type",
    "properties.featured": "Featured",
    "sponsors.eyebrow": "Sponsors",
    "sponsors.title": "Partners advancing sustainable tourism and regional development",
    "sponsors.copy": "Spaces prepared to recognize businesses, organizations, and ventures that support responsible tourism promotion.",
    "sponsors.cta": "Meet partner",
    "cta.eyebrow": "Trip planning",
    "cta.title": "Explore the region or join our network of local partners",
    "cta.copy": "We connect visitors with attractions, experiences, and local ventures through direct contact.",
    "cta.visit": "Plan a visit",
    "cta.business": "Register business",
    "card.recommended": "Recommended",
    "card.featured": "Featured",
    "card.duration": "Duration",
    "card.difficulty": "Difficulty",
    "card.fallbackPrice": "Price TBD",
    "card.more": "View more",
    "filters.all": "All",
    "results.singular": "result",
    "results.plural": "results",
    "footer.copy": "The platform connecting volcanoes, forests, rivers, hot springs, communities, and experiences in northern Costa Rica.",
    "footer.explore": "Explore",
    "footer.info": "Information",
    "footer.commercial": "Commercial",
    "footer.social": "Social media",
    "footer.directions": "Getting here",
    "footer.weather": "Weather",
    "footer.partnerships": "Partnerships",
    "footer.promoteExperience": "Promote experience",
    "footer.publishProperty": "Publish property"
  }
};

const valueTranslations: Record<Locale, Record<string, string>> = {
  es: {},
  en: {
    "Alianzas": "Partnerships",
    "Artesanía": "Crafts",
    "Atractivos": "Attractions",
    "Aventura": "Adventure",
    "Bosque nuboso": "Cloud forest",
    "Café": "Coffee",
    "Casa": "House",
    "Clima": "Weather",
    "Comercio": "Commercial",
    "Contacto": "Contact",
    "Desde": "From",
    "Familiar": "Family",
    "Fauna": "Fauna",
    "Flora": "Flora",
    "Fotografía": "Photography",
    "Galería": "Gallery",
    "Guía turístico": "Tour guide",
    "Hospedaje": "Lodging",
    "Lote": "Lot",
    "Mapa": "Map",
    "Naturaleza": "Nature",
    "Negocios locales": "Local businesses",
    "Observación de aves": "Birdwatching",
    "Producto local": "Local product",
    "Promociones": "Promotions",
    "Propiedades": "Properties",
    "Relajación": "Relaxation",
    "Restaurante": "Restaurant",
    "Termales": "Hot springs",
    "Todos": "All",
    "Tour operador": "Tour operator",
    "Transporte": "Transportation",
    "Turismo rural": "Rural tourism",
    "Venta": "Sale",
    "Relatos de la pagina": "Page stories",
    "Controles de relatos": "Story controls",
    "Ver relato": "View story",
    "Atractivo": "Attraction",
    "Imágenes para imaginar la visita": "Images to imagine the visit",
    "Banco visual temporal con fotografías referenciales hasta incorporar material real de la zona.": "Temporary visual bank with reference photography until real material from the area is added.",
    "Directorio turístico regional": "Regional tourism directory",
    "Te ayudamos a encontrar lo que necesitas, ya sea donde comer o hospedarte, incluso quien te lleve a tu destino.": "We help you find what you need, whether it is where to eat, where to stay, or who can take you to your destination.",
    "Puntos de interés para planificar la ruta": "Points of interest to plan your route",
    "Ubica atractivos por categoría y construye una visita equilibrada entre aventura, relajación y gastronomía.": "Find attractions by category and build a balanced visit with adventure, relaxation, and gastronomy.",
    "Naturaleza, agua y paisaje volcánico": "Nature, water, and volcanic landscapes",
    "Una selección inicial de puntos de interés para descubrir la región con rutas de baja huella y mucho valor escénico.": "An initial selection of points of interest to discover the region through low-impact routes with strong scenic value.",
    "Clima de montaña, bosque y llanura": "Mountain, forest, and lowland weather",
    "Una guía general para entender cómo cambia el tiempo durante el año en el corredor volcánico del norte de Costa Rica.": "A general guide to understand how the weather changes throughout the year in northern Costa Rica's volcanic corridor.",
    "Aliados que impulsan la región": "Partners moving the region forward",
    "Espacio preparado para reconocer a negocios, organizaciones y emprendimientos que apoyan la promoción turística responsable.": "A space prepared to recognize businesses, organizations, and ventures that support responsible tourism promotion.",
    "Encuentros silvestres para observar con respeto": "Wildlife encounters to observe with respect",
    "Una guía inicial para ordenar avistamientos, especies emblemáticas y recomendaciones de conservación.": "An initial guide to organize sightings, emblematic species, and conservation recommendations.",
    "Verde que cuenta la historia del territorio": "Greenery that tells the territory's story",
    "Una base para documentar especies vegetales, zonas de bosque y valor ecológico de la región.": "A base for documenting plant species, forest areas, and the region's ecological value.",
    "Vivir o invertir en la región": "Live or invest in the region",
    "¿Te gustó la zona, quieres vivir acá? Tenemos ese lugar perfecto para vos.": "Did you like the area and want to live here? We have the perfect place for you.",
    "Si buscas naturaleza, bienestar y aventura responsable, estas en el lugar correcto.": "If you are looking for nature, wellness, and responsible adventure, you are in the right place.",
    "Ofertas y campañas activas": "Active offers and campaigns",
    "Un espacio separado para anuncios promocionales independientes de los recomendados editoriales del sitio.": "A dedicated space for promotional announcements independent from the site's editorial recommendations.",
    "Planifica tu visita o alianza": "Plan your visit or partnership",
    "Un mismo punto de contacto para visitantes, negocios locales, operadores, patrocinadores y personas que quieran sumar valor a la región.": "A single contact point for visitors, local businesses, operators, sponsors, and people who want to add value to the region.",
    "Una primera mirada al carácter del paisaje": "A first look at the character of the landscape",
    "La experiencia también vive en los negocios locales": "The experience also lives in local businesses",
    "Un corredor vivo entre montaña y llanura": "A living corridor between mountain and lowland",
    "La ruta empieza antes de salir": "The route begins before you leave",
    "Un volcán que todavía conversa con el agua": "A volcano still in conversation with water",
    "Un clima que cambia con la altura y el volcán": "Weather that changes with elevation and the volcano",
    "Promover un destino también requiere aliados": "Promoting a destination also takes partners",
    "La fauna aparece cuando el visitante baja el ritmo": "Wildlife appears when visitors slow down",
    "Cada planta sostiene una parte del paisaje": "Every plant supports part of the landscape",
    "Quedarse también es una forma de conocer": "Staying is also a way to know a place",
    "El viaje aquí se vive despacio": "Travel here is lived slowly",
    "Aproveche las promociones de la región": "Make the most of regional promotions",
    "La mejor ruta empieza con una buena pregunta": "The best route starts with a good question"
  }
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  tv: (value: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem("rv-locale");
    if (saved === "es" || saved === "en") setLocaleState(saved);
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("rv-locale", nextLocale);
    document.documentElement.lang = nextLocale;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translations[locale][key],
      tv: (text) => valueTranslations[locale][text] || text
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}

export const translatedNavItems = [
  { key: "nav.attractions", href: "/atractivos" },
  { key: "nav.wildlife", href: "/flora-fauna" },
  { key: "nav.experiences", href: "/experiencias" },
  { key: "nav.businesses", href: "/negocios" },
  { key: "nav.properties", href: "/propiedades" },
  { key: "nav.promotions", href: "/promociones" },
  { key: "nav.gallery", href: "/galeria" },
  { key: "nav.map", href: "/mapa" },
  { key: "nav.contact", href: "/contacto" }
] satisfies { key: TranslationKey; href: string }[];
