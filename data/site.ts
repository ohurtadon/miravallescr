import {
  Binoculars,
  Flame,
  Leaf,
  MapPin,
  Mountain,
  Palmtree,
  Sparkles,
  Waves
} from "lucide-react";

export const navItems = [
  { label: "Atractivos", href: "/atractivos" },
  { label: "Flora y fauna", href: "/flora-fauna" },
  { label: "Experiencias", href: "/experiencias" },
  { label: "Galería", href: "/galeria" },
  { label: "Mapa", href: "/mapa" },
  { label: "Contacto", href: "/contacto" }
];

export const stats = [
  { value: "300+", label: "especies de aves" },
  { value: "12", label: "senderos y rutas" },
  { value: "7", label: "ríos y cataratas" },
  { value: "365", label: "días para visitar" }
];

export const attractions = [
  {
    title: "Río Blanco",
    slug: "rio-blanco",
    summary: "Pozas cristalinas, bosque ribereño y rutas suaves para conectar con el agua.",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80",
    icon: Waves
  },
  {
    title: "Aguas termales",
    slug: "termales",
    summary: "Relajación natural entre vapor mineral, barro volcánico y paisaje tropical.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
    icon: Sparkles
  },
  {
    title: "Volcán Miravalles",
    slug: "volcan-miravalles",
    summary: "El origen geológico de la zona y un telón escénico para cada aventura.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    icon: Mountain
  },
  {
    title: "Senderos",
    slug: "senderos",
    summary: "Caminatas entre helechos, sombra fresca y sonidos vivos del bosque.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
    icon: Leaf
  },
  {
    title: "Observación de aves",
    slug: "aves",
    summary: "Tucanes, colibríes y aves migratorias en corredores biológicos activos.",
    image:
      "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?auto=format&fit=crop&w=900&q=80",
    icon: Binoculars
  },
  {
    title: "Miradores",
    slug: "miradores",
    summary: "Vistas amplias hacia las montañas, pueblos y mosaicos verdes de Guanacaste.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    icon: MapPin
  }
];

export const wildlife = {
  fauna: ["Perezoso", "Tucán", "Mono congo", "Mariposas", "Reptiles"],
  flora: ["Guanacaste", "Helechos", "Orquídeas", "Bosque nuboso"]
};

export const experiences = [
  {
    title: "Caminata ecológica",
    duration: "2-4 horas",
    difficulty: "Baja a media",
    season: "Todo el año",
    icon: Palmtree
  },
  {
    title: "Termales y barro volcánico",
    duration: "Medio día",
    difficulty: "Baja",
    season: "Mañanas frescas",
    icon: Flame
  },
  {
    title: "Observación de aves",
    duration: "3 horas",
    difficulty: "Baja",
    season: "Amanecer",
    icon: Binoculars
  }
];

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    alt: "Bosque tropical con luz de amanecer",
    span: "md:row-span-2"
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
    alt: "Paisaje verde de montaña",
    span: ""
  },
  {
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
    alt: "Agua natural en movimiento",
    span: ""
  },
  {
    src: "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?auto=format&fit=crop&w=900&q=80",
    alt: "Sendero dentro de bosque",
    span: "md:row-span-2"
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    alt: "Valle y río en paisaje natural",
    span: ""
  }
];

export const mapPoints = [
  { name: "Río Blanco", category: "Naturaleza", lng: -85.153, lat: 10.744 },
  { name: "Termales", category: "Relajación", lng: -85.185, lat: 10.711 },
  { name: "Cataratas", category: "Aventura", lng: -85.129, lat: 10.701 },
  { name: "Mirador", category: "Naturaleza", lng: -85.096, lat: 10.765 },
  { name: "Comedor local", category: "Gastronomía", lng: -85.172, lat: 10.689 }
];

export const testimonials = [
  {
    quote: "Un destino tranquilo, verde y perfecto para viajar despacio.",
    name: "Visitante nacional"
  },
  {
    quote: "Las aguas termales y los senderos hacen que el viaje se sienta muy auténtico.",
    name: "Familia viajera"
  },
  {
    quote: "Miravalles tiene esa mezcla preciosa de aventura y conservación.",
    name: "Fotógrafa de naturaleza"
  }
];
