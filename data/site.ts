import {
  Binoculars,
  Bus,
  Camera,
  Coffee,
  Flame,
  HandHeart,
  Hotel,
  Leaf,
  MapPin,
  Mountain,
  Palmtree,
  Sparkles,
  Utensils,
  Waves
} from "lucide-react";

export const navItems = [
  { label: "Atractivos", href: "/atractivos" },
  { label: "Flora y fauna", href: "/flora-fauna" },
  { label: "Experiencias", href: "/experiencias" },
  { label: "Negocios", href: "/negocios" },
  { label: "Propiedades", href: "/propiedades" },
  { label: "Galería", href: "/galeria" },
  { label: "Mapa", href: "/mapa" },
  { label: "Alianzas", href: "/alianzas" }
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
    id: "exp-caminata-ecologica",
    title: "Caminata ecológica",
    slug: "caminata-ecologica",
    category: "Naturaleza",
    description:
      "Recorrido interpretativo por bosque, nacientes y miradores para conocer el paisaje volcánico con bajo impacto.",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=80",
    duration: "2-4 horas",
    difficulty: "Baja a media",
    price: "Desde $35",
    provider: "Guías locales de Miravalles",
    location: "Senderos de Miravalles",
    contactUrl: "/contacto",
    whatsapp: "https://wa.me/50600000000",
    isFeatured: true,
    season: "Todo el año",
    icon: Palmtree
  },
  {
    id: "exp-termales-volcanicas",
    title: "Día de termales",
    slug: "dia-de-termales",
    category: "Relajación",
    description:
      "Experiencia de bienestar con aguas termales, barro volcánico y tiempo libre para descansar entre naturaleza.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80",
    duration: "Medio día",
    difficulty: "Baja",
    price: "Consultar",
    provider: "Operadores termales aliados",
    location: "Zona termal de Miravalles",
    contactUrl: "/contacto",
    whatsapp: "https://wa.me/50600000000",
    isFeatured: true,
    season: "Mañanas frescas",
    icon: Flame
  },
  {
    id: "exp-observacion-aves",
    title: "Observación de aves",
    slug: "observacion-de-aves",
    category: "Observación de aves",
    description:
      "Salida temprana para avistar tucanes, colibríes y especies migratorias en corredores biológicos cercanos.",
    image:
      "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?auto=format&fit=crop&w=1000&q=80",
    duration: "3 horas",
    difficulty: "Baja",
    price: "Desde $45",
    provider: "Guía naturalista local",
    location: "Bosques y fincas cercanas",
    contactUrl: "/contacto",
    whatsapp: "https://wa.me/50600000000",
    isFeatured: true,
    season: "Amanecer",
    icon: Binoculars
  },
  {
    id: "exp-tour-fotografico",
    title: "Tour fotográfico",
    slug: "tour-fotografico",
    category: "Fotografía",
    description:
      "Ruta pausada para capturar ríos, vapor termal, miradores y detalles de flora tropical con acompañamiento local.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80",
    duration: "4 horas",
    difficulty: "Media",
    price: "Consultar",
    provider: "Fotógrafos y guías aliados",
    location: "Miradores de Miravalles",
    contactUrl: "/contacto",
    whatsapp: "https://wa.me/50600000000",
    isFeatured: false,
    season: "Atardecer",
    icon: Camera
  },
  {
    id: "exp-ruta-rural",
    title: "Ruta rural",
    slug: "ruta-rural",
    category: "Turismo rural",
    description:
      "Visita a emprendimientos, productores y paisajes de comunidad para conocer el Miravalles cotidiano.",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=80",
    duration: "Medio día",
    difficulty: "Baja",
    price: "Desde $30",
    provider: "Emprendimientos locales",
    location: "Comunidades de Miravalles",
    contactUrl: "/alianzas",
    whatsapp: "https://wa.me/50600000000",
    isFeatured: false,
    season: "Todo el año",
    icon: HandHeart
  }
];

export const experienceCategories = [
  "Naturaleza",
  "Aventura",
  "Relajación",
  "Familiar",
  "Fotografía",
  "Observación de aves",
  "Turismo rural"
];

export const businessCategories = [
  "Hospedaje",
  "Restaurante",
  "Guía turístico",
  "Termales",
  "Tour operador",
  "Transporte",
  "Artesanía",
  "Producto local"
];

export const propertyOperations = ["Venta", "Alquiler"];

export const propertyTypes = ["Casa", "Finca", "Lote", "Comercio"];

export const properties = [
  {
    id: "prop-casa-bosque",
    title: "Casa de montaña cerca de senderos",
    slug: "casa-montana-senderos",
    operation: "Venta",
    type: "Casa",
    price: "$185,000",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Casa rodeada de vegetación, ideal para vivir cerca de rutas naturales y servicios locales.",
    location: "Camino a Miravalles",
    area: "220 m2 construcción",
    landSize: "1,200 m2 terreno",
    contactUrl: "/contacto",
    isFeatured: true
  },
  {
    id: "prop-finca-rio",
    title: "Finca con acceso a quebrada",
    slug: "finca-acceso-quebrada",
    operation: "Venta",
    type: "Finca",
    price: "Consultar",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    description:
      "Terreno amplio con potencial para proyecto familiar, agroecológico o turismo rural de baja escala.",
    location: "Zona rural de Miravalles",
    area: "Uso mixto",
    landSize: "3.5 hectáreas",
    contactUrl: "/contacto",
    isFeatured: true
  },
  {
    id: "prop-lote-mirador",
    title: "Lote con vista a montaña",
    slug: "lote-vista-montana",
    operation: "Venta",
    type: "Lote",
    price: "$48,000",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    description:
      "Lote de ejemplo para residencia o cabaña, con vista abierta y acceso por camino local.",
    location: "Mirador de Miravalles",
    area: "Listo para diseño",
    landSize: "850 m2",
    contactUrl: "/contacto",
    isFeatured: false
  },
  {
    id: "prop-cabina-alquiler",
    title: "Cabina amueblada para alquiler",
    slug: "cabina-amueblada-alquiler",
    operation: "Alquiler",
    type: "Casa",
    price: "$650 / mes",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    description:
      "Opción temporal para quienes desean probar la zona antes de comprar o invertir.",
    location: "Cerca del centro",
    area: "2 habitaciones",
    landSize: "Patio pequeño",
    contactUrl: "/contacto",
    isFeatured: false
  },
  {
    id: "prop-local-comercial",
    title: "Local para cafetería o tienda turística",
    slug: "local-cafeteria-tienda",
    operation: "Alquiler",
    type: "Comercio",
    price: "$900 / mes",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    description:
      "Espacio comercial de ejemplo para emprendimiento ligado a visitantes, productos locales o servicios turísticos.",
    location: "Ruta de acceso principal",
    area: "90 m2",
    landSize: "Frente a calle",
    contactUrl: "/alianzas",
    isFeatured: false
  }
];

export const businesses = [
  {
    id: "biz-lodge-miravalles",
    name: "Lodge Bosque Miravalles",
    slug: "lodge-bosque-miravalles",
    category: "Hospedaje",
    description: "Hospedaje tranquilo rodeado de bosque, ideal para explorar termales y senderos.",
    longDescription:
      "Un hospedaje de ejemplo pensado para visitantes que buscan descanso, naturaleza y acceso sencillo a rutas de Miravalles. Esta ficha está lista para reemplazarse por datos reales del negocio.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Camino a Miravalles",
    coordinates: { lat: 10.72, lng: -85.15 },
    phone: "+506 0000-0000",
    whatsapp: "https://wa.me/50600000000",
    website: "https://example.com",
    socialLinks: { instagram: "https://instagram.com" },
    isFeatured: true,
    isSponsor: true,
    sponsorLevel: "destacado",
    services: ["Habitaciones", "Desayuno", "Parqueo", "Información turística"],
    openingHours: "Todos los días"
  },
  {
    id: "biz-sabor-rural",
    name: "Comedor Sabor Rural",
    slug: "comedor-sabor-rural",
    category: "Restaurante",
    description: "Cocina local con ingredientes frescos y atención familiar para viajeros.",
    longDescription:
      "Restaurante de ejemplo para mostrar cómo el directorio puede destacar gastronomía local, horarios, servicios y botones de contacto directo.",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Centro de la comunidad",
    coordinates: { lat: 10.69, lng: -85.17 },
    phone: "+506 0000-0000",
    whatsapp: "https://wa.me/50600000000",
    website: "",
    socialLinks: { facebook: "https://facebook.com" },
    isFeatured: true,
    isSponsor: false,
    services: ["Almuerzos", "Café", "Platos típicos", "Grupos pequeños"],
    openingHours: "8:00 a.m. - 6:00 p.m."
  },
  {
    id: "biz-guias-volcan",
    name: "Guías del Volcán",
    slug: "guias-del-volcan",
    category: "Guía turístico",
    description: "Acompañamiento local para caminatas, aves, miradores y rutas rurales.",
    longDescription:
      "Servicio de guía de ejemplo para estructurar futuras alianzas con guías certificados y operadores locales.",
    images: [
      "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Miravalles y alrededores",
    coordinates: { lat: 10.74, lng: -85.13 },
    phone: "+506 0000-0000",
    whatsapp: "https://wa.me/50600000000",
    website: "",
    socialLinks: { instagram: "https://instagram.com" },
    isFeatured: true,
    isSponsor: true,
    sponsorLevel: "aliado",
    services: ["Caminatas", "Observación de aves", "Interpretación ambiental"],
    openingHours: "Con reservación"
  },
  {
    id: "biz-termales-rio",
    name: "Termales Río Vivo",
    slug: "termales-rio-vivo",
    category: "Termales",
    description: "Espacio de relajación con aguas termales y entorno natural.",
    longDescription:
      "Ficha de ejemplo para termales, preparada para integrar precios, horarios, galería y contacto directo.",
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Zona termal",
    coordinates: { lat: 10.71, lng: -85.18 },
    phone: "+506 0000-0000",
    whatsapp: "https://wa.me/50600000000",
    website: "https://example.com",
    socialLinks: {},
    isFeatured: false,
    isSponsor: false,
    services: ["Piscinas termales", "Barro volcánico", "Zonas de descanso"],
    openingHours: "9:00 a.m. - 5:00 p.m."
  },
  {
    id: "biz-cafe-montana",
    name: "Café de Montaña",
    slug: "cafe-de-montana",
    category: "Producto local",
    description: "Café, productos artesanales y recuerdos elaborados por familias locales.",
    longDescription:
      "Ejemplo de negocio para productores locales y artesanos que quieran visibilidad dentro del portal turístico.",
    images: [
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Ruta rural de Miravalles",
    coordinates: { lat: 10.68, lng: -85.16 },
    phone: "+506 0000-0000",
    whatsapp: "https://wa.me/50600000000",
    website: "",
    socialLinks: { instagram: "https://instagram.com" },
    isFeatured: false,
    isSponsor: false,
    services: ["Café", "Artesanía", "Degustación", "Productos locales"],
    openingHours: "Fines de semana"
  },
  {
    id: "biz-transporte-verde",
    name: "Transporte Verde",
    slug: "transporte-verde",
    category: "Transporte",
    description: "Traslados locales para visitantes, grupos pequeños y rutas turísticas.",
    longDescription:
      "Ficha de ejemplo para transporte turístico local, útil para futuras alianzas y consultas de disponibilidad.",
    images: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Miravalles y conexiones cercanas",
    coordinates: { lat: 10.7, lng: -85.14 },
    phone: "+506 0000-0000",
    whatsapp: "https://wa.me/50600000000",
    website: "",
    socialLinks: {},
    isFeatured: false,
    isSponsor: false,
    services: ["Traslados", "Rutas privadas", "Grupos pequeños"],
    openingHours: "Con reservación"
  }
];

export const sponsors = [
  {
    id: "sponsor-desarrollo-local",
    name: "Alianza Desarrollo Local",
    logo: "ADL",
    description: "Apoya iniciativas de turismo sostenible, promoción comunitaria y experiencias responsables.",
    website: "/alianzas",
    level: "principal",
    active: true
  },
  {
    id: "sponsor-guias",
    name: "Red de Guías Miravalles",
    logo: "GM",
    description: "Conecta visitantes con caminatas, aves, termales y rutas rurales operadas localmente.",
    website: "/negocios/guias-del-volcan",
    level: "destacado",
    active: true
  },
  {
    id: "sponsor-hospedaje",
    name: "Hospedajes Aliados",
    logo: "HA",
    description: "Promueve estadías tranquilas para quienes desean conocer Miravalles con más tiempo.",
    website: "/negocios/lodge-bosque-miravalles",
    level: "aliado",
    active: true
  }
];

export const promoSlots = [
  {
    eyebrow: "Hospedaje recomendado",
    title: "Quédate cerca de senderos, termales y miradores",
    description: "Espacio preparado para destacar hospedajes aliados con una presencia sobria y útil para el visitante.",
    href: "/negocios/lodge-bosque-miravalles",
    cta: "Ver hospedaje"
  },
  {
    eyebrow: "Tour destacado",
    title: "Caminata ecológica con guía local",
    description: "Promoción interna para experiencias seleccionadas por valor ambiental y operación responsable.",
    href: "/experiencias/caminata-ecologica",
    cta: "Consultar experiencia"
  },
  {
    eyebrow: "Restaurante aliado",
    title: "Sabores locales después de la ruta",
    description: "Bloque discreto para conectar visitantes con gastronomía local sin interrumpir la navegación.",
    href: "/negocios/comedor-sabor-rural",
    cta: "Ver restaurante"
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
  { name: "Comedor local", category: "Gastronomía", lng: -85.172, lat: 10.689 },
  { name: "Lodge Bosque Miravalles", category: "Negocios locales", lng: -85.15, lat: 10.72 },
  { name: "Guías del Volcán", category: "Experiencias", lng: -85.13, lat: 10.74 }
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
