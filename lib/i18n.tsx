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
    "hero.title": "Raíz Volcánica: naturaleza, termales y aventura local",
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
    "hero.title": "Raíz Volcánica: nature, hot springs, and local adventure",
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
    "Guía regional y plataforma turística": "Regional guide and tourism platform",
    "Raíz Volcánica: naturaleza, termales y aventura local": "Raíz Volcánica: nature, hot springs, and local adventure",
    "Explora atractivos, experiencias y negocios locales del corredor volcánico y natural del norte de Costa Rica.": "Explore attractions, experiences, and local businesses across the volcanic and natural corridor of northern Costa Rica.",
    "Descubre la región": "Discover the region",
    "Un territorio vivo entre volcán, agua y bosque.": "A living landscape shaped by volcanoes, water, and forest.",
    "Este corredor reúne rutas de montaña, aguas termales, ríos frescos y una biodiversidad que invita a viajar con calma. Es una puerta a la naturaleza del norte de Costa Rica para quienes buscan aventura, descanso y turismo sostenible.": "This corridor brings together mountain routes, hot springs, fresh rivers, and biodiversity that invites slow travel. It is a gateway to northern Costa Rica for travelers seeking adventure, rest, and sustainable tourism.",
    "Principales atractivos": "Main attractions",
    "Rutas naturales para cada ritmo de viaje": "Natural routes for every travel pace",
    "Agua, bosque, miradores y experiencias termales se combinan en un destino compacto y lleno de contrastes.": "Water, forest, viewpoints, and hot spring experiences come together in a compact destination full of contrast.",
    "Actividades para viajar con intención": "Activities for intentional travel",
    "Opciones promocionables de medio día o día completo, listas para conectar visitantes con guías, operadores y emprendimientos locales.": "Promotable half-day or full-day options ready to connect visitors with local guides, operators, and ventures.",
    "Servicios turísticos con raíz local": "Tourism services with local roots",
    "Un directorio preparado para conectar visitantes con hospedajes, restaurantes, guías, termales, transporte y productores de la zona.": "A directory built to connect visitors with lodging, restaurants, guides, hot springs, transportation, and local producers.",
    "La biodiversidad que da vida a este territorio volcánico": "The biodiversity that brings this volcanic territory to life",
    "Bosques, aves, mamíferos y plantas tropicales hacen de la región un aula viva para visitantes y comunidades.": "Forests, birds, mammals, and tropical plants make the region a living classroom for visitors and communities.",
    "Primeras postales de un territorio donde la naturaleza es protagonista": "First postcards from a territory where nature leads",
    "Estas imágenes son referenciales y serán reemplazadas por material real de la región en próximas iteraciones.": "These images are references and will be replaced with real material from the region in future iterations.",
    "Mapa interactivo": "Interactive map",
    "Ubica atractivos y negocios locales": "Find attractions and local businesses",
    "Explora el territorio en un mapa real y abre la ficha de cada lugar para conocerlo mejor.": "Explore the territory on a real map and open each place profile to learn more.",
    "Te gustó la zona, quieres vivir acá": "You liked the area and want to live here",
    "Te ofrecemos las siguientes propiedades de ejemplo para preparar futuras oportunidades de venta o alquiler en la región.": "Example properties prepared for future sale or rental opportunities in the region.",
    "Aliados que impulsan el turismo sostenible y el desarrollo de la región": "Partners advancing sustainable tourism and regional development",
    "Espacios preparados para reconocer a negocios, organizaciones y emprendimientos que impulsan una promoción turística responsable.": "Spaces prepared to recognize businesses, organizations, and ventures that support responsible tourism promotion.",
    "Plan de viaje": "Trip planning",
    "Explore la región o forme parte de nuestra red de aliados locales": "Explore the region or join our network of local partners",
    "Conectamos visitantes con atractivos, experiencias y emprendimientos de la región mediante contacto directo.": "We connect visitors with attractions, experiences, and local ventures through direct contact.",
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
    "Aproveche las promociones de la región": "Make the most of regional promotions",
    "La mejor ruta empieza con una buena pregunta": "The best route starts with a good question",
    "Mucho antes de que estos volcanes fueran rutas para visitantes, ya habían moldeado el paisaje con calor, roca y agua subterránea. Esa memoria geológica sigue apareciendo en fumarolas, barros calientes, nacientes minerales y aguas termales.": "Long before these volcanoes became routes for visitors, they had already shaped the landscape with heat, rock, and underground water. That geological memory still appears in fumaroles, hot mud, mineral springs, and thermal waters.",
    "Caminar por esta zona es notar cómo la tierra sigue respirando: en el vapor, en las nacientes tibias, en los barros minerales y en ese contraste entre bosque fresco y energía profunda.": "Walking through this area means noticing how the earth is still breathing: in the steam, warm springs, mineral mud, and the contrast between cool forest and deep energy.",
    "De paisaje volcánico a energía limpia": "From volcanic landscape to clean energy",
    "A finales de los años setenta, el ICE empezó a estudiar y desarrollar el potencial geotérmico de la zona. Desde entonces, el paisaje volcánico no solo se mira como montaña: también se entiende como una fuente viva de energía limpia.": "In the late 1970s, ICE began studying and developing the area's geothermal potential. Since then, the volcanic landscape has not only been seen as mountains, but also understood as a living source of clean energy.",
    "Esa historia suma otra capa al viaje: aquí conviven turismo, ciencia, comunidad rural y una forma muy costarricense de transformar el calor del volcán en desarrollo.": "That story adds another layer to the trip: here tourism, science, rural community, and a very Costa Rican way of turning volcanic heat into development coexist.",
    "Rincón de la Vieja y la fuerza visible del volcán": "Rincón de la Vieja and the visible force of the volcano",
    "En Rincón de la Vieja, la energía volcánica aparece de forma directa: fumarolas, vapores, barros calientes, nacientes y senderos donde el suelo recuerda que la montaña sigue activa bajo los pies.": "At Rincón de la Vieja, volcanic energy appears directly: fumaroles, steam, hot mud, springs, and trails where the ground reminds you the mountain is still active beneath your feet.",
    "Sus atractivos combinan aventura y lectura del paisaje. Caminar por esta zona es ver cómo el bosque seco, las quebradas y los puntos geotérmicos forman una experiencia distinta, más áspera, luminosa y profundamente volcánica.": "Its attractions combine adventure with reading the landscape. Walking this area shows how dry forest, streams, and geothermal points create a different experience: rougher, brighter, and deeply volcanic.",
    "Tenorio, Río Celeste y el agua como destino": "Tenorio, Río Celeste, and water as a destination",
    "Hacia el Volcán Tenorio, el agua se vuelve protagonista. Río Celeste, sus senderos húmedos, cataratas, pozas y bosques cercanos muestran una versión más fresca y misteriosa del corredor natural.": "Toward Tenorio Volcano, water becomes the main character. Río Celeste, its humid trails, waterfalls, pools, and nearby forests show a cooler and more mysterious side of the natural corridor.",
    "Aquí el atractivo no está solo en llegar a un punto famoso, sino en el cambio de ambiente: la temperatura baja, el bosque se cierra, los sonidos se multiplican y el viaje empieza a sentirse más pausado.": "Here the attraction is not only reaching a famous spot, but feeling the environment shift: the temperature drops, the forest closes in, sounds multiply, and the journey begins to feel slower.",
    "Un corredor de rutas, comunidades y termales": "A corridor of routes, communities, and hot springs",
    "Entre Miravalles, Tenorio y Rincón de la Vieja, los atractivos no funcionan como islas. Se conectan por caminos rurales, miradores, termales, cataratas, restaurantes, fincas y comunidades que dan sentido al recorrido.": "Between Miravalles, Tenorio, and Rincón de la Vieja, attractions do not stand alone. They are connected by rural roads, viewpoints, hot springs, waterfalls, restaurants, farms, and communities that give meaning to the route.",
    "Planificar la visita como un corredor permite viajar mejor: combinar descanso y caminata, detenerse en negocios locales, elegir rutas de baja huella y entender que cada parada suma una parte distinta de la región.": "Planning the visit as a corridor makes for better travel: combining rest and hiking, stopping at local businesses, choosing low-impact routes, and understanding that each stop adds a different part of the region.",
    "La biodiversidad de este territorio aparece en capas: árboles que sostienen sombra y humedad, aves que cruzan entre fincas y bosque, insectos que anuncian la tarde y mamíferos que recuerdan que la región sigue siendo casa para muchas especies.": "The biodiversity of this territory appears in layers: trees that hold shade and humidity, birds crossing between farms and forest, insects announcing the afternoon, and mammals reminding us the region is still home to many species.",
    "Mirar flora y fauna aquí no es solo marcar nombres en una lista. Es aprender a leer señales del paisaje y viajar con más respeto por los ritmos naturales de la región.": "Observing flora and fauna here is not just checking names off a list. It is learning to read signs in the landscape and travel with more respect for the region's natural rhythms.",
    "Nombres antiguos, agua y especies únicas": "Ancient names, water, and unique species",
    "En este territorio, los nombres antiguos, los ríos de colores, el bosque húmedo y el suelo volcánico cuentan una historia que cambia de tono a cada paso.": "In this territory, ancient names, colored rivers, humid forest, and volcanic soil tell a story that changes tone with every step.",
    "Entre los volcanes Tenorio y Miravalles también se descubrió la rana arborícola Tlalocohyla celeste, dada a conocer científicamente en 2022. Su presencia recuerda que la región todavía guarda especies pequeñas, discretas y valiosas que dependen de hábitats húmedos bien conservados.": "The tree frog Tlalocohyla celeste was also discovered between Tenorio and Miravalles volcanoes and scientifically described in 2022. Its presence reminds us the region still shelters small, discreet, valuable species that depend on well-preserved humid habitats.",
    "Parques nacionales para observar vida silvestre": "National parks for observing wildlife",
    "El Parque Nacional Miravalles-Jorge Manuel Dengo protege parte del entorno volcánico, mientras que Río Celeste forma parte del Parque Nacional Volcán Tenorio. Juntos dibujan una ruta natural donde el visitante puede pasar de fumarolas y bosque montano a aguas celestes y senderos húmedos.": "Miravalles-Jorge Manuel Dengo National Park protects part of the volcanic environment, while Río Celeste belongs to Tenorio Volcano National Park. Together they draw a natural route where visitors can move from fumaroles and montane forest to blue waters and humid trails.",
    "En estos paisajes la observación de animales pide paciencia: aves en las copas, rastros en el barro, mariposas en claros de luz y, con suerte, mamíferos que se mueven lejos del ruido. La mejor experiencia ocurre cuando se camina despacio y se respeta la distancia.": "In these landscapes, wildlife observation asks for patience: birds in the canopy, tracks in the mud, butterflies in patches of light, and, with luck, mammals moving away from noise. The best experience happens when you walk slowly and keep your distance.",
    "Rincón de la Vieja: calor, bosque y transición": "Rincón de la Vieja: heat, forest, and transition",
    "Hacia Rincón de la Vieja, el paisaje muestra otra cara del territorio volcánico: suelos calientes, fumarolas, quebradas, bosque seco, zonas húmedas y senderos donde la vegetación cambia con la altura y la exposición al viento.": "Toward Rincón de la Vieja, the landscape shows another face of the volcanic territory: hot soils, fumaroles, streams, dry forest, humid areas, and trails where vegetation changes with elevation and wind exposure.",
    "Esa mezcla crea refugios distintos para aves, mamíferos pequeños, reptiles, insectos y plantas resistentes. Visitarlo ayuda a entender que la biodiversidad regional no vive en un solo tipo de bosque, sino en la transición entre muchos ambientes.": "That mix creates different refuges for birds, small mammals, reptiles, insects, and resilient plants. Visiting it helps explain that regional biodiversity does not live in one type of forest, but in the transition between many environments.",
    "Corredores que conectan fincas, ríos y montaña": "Corridors connecting farms, rivers, and mountains",
    "Entre Miravalles, Tenorio y Rincón de la Vieja, la vida silvestre depende también de los espacios intermedios: cercas vivas, riberas, parches de bosque, cafetales, potreros arbolados y caminos rurales que todavía guardan sombra.": "Between Miravalles, Tenorio, and Rincón de la Vieja, wildlife also depends on the spaces in between: living fences, riverbanks, forest patches, coffee fields, tree-covered pastures, and rural roads that still hold shade.",
    "Estos corredores permiten que las especies se muevan, encuentren alimento y mantengan ciclos naturales. Por eso, la conservación no ocurre solo dentro de los parques: también se construye en las decisiones cotidianas de las comunidades.": "These corridors allow species to move, find food, and maintain natural cycles. That is why conservation does not happen only inside parks: it is also built through everyday community decisions.",
    "Agua que sostiene la vida del norte": "Water that sustains life in the north",
    "Ríos, nacientes, cataratas, humedales pequeños y quebradas frescas enlazan el territorio como una red viva. Donde aparece el agua, cambian los sonidos: llegan aves, anfibios, insectos, helechos y árboles que necesitan humedad constante.": "Rivers, springs, waterfalls, small wetlands, and cool streams link the territory like a living network. Where water appears, the sounds change: birds, amphibians, insects, ferns, and trees that need constant moisture arrive.",
    "Cuidar esas fuentes es cuidar la experiencia completa del visitante y la vida diaria de la región. El agua no solo embellece el paisaje: sostiene bosques, cultivos, comunidades y muchas especies que rara vez se dejan ver a simple vista.": "Protecting those sources protects the visitor experience and daily life in the region. Water does not only beautify the landscape: it sustains forests, crops, communities, and many species rarely seen at first glance.",
    "Esta región no se descubre corriendo de un punto a otro. Se entiende en la caminata fresca de la mañana, en el vapor que sube de la tierra, en una conversación con un guía local y en el descanso después de una ruta entre bosque y agua.": "This region is not discovered by rushing from one point to another. It is understood in a cool morning walk, in steam rising from the earth, in conversation with a local guide, and in resting after a route between forest and water.",
    "Estas experiencias están pensadas como puertas de entrada: algunas invitan a moverse, otras a bajar el ritmo, pero todas buscan conectar al visitante con la naturaleza y con quienes conocen el territorio desde adentro.": "These experiences are designed as gateways: some invite movement, others invite slowing down, but all seek to connect visitors with nature and with the people who know the territory from within.",
    "El viaje aquí se vive despacio": "Travel here is lived slowly",
    "Las experiencias de Raíz Volcánica conectan al visitante con el norte de Costa Rica desde lo esencial: naturaleza, bienestar, aventura responsable y contacto directo con las comunidades que conocen el territorio.": "Raíz Volcánica experiences connect visitors with northern Costa Rica through what matters most: nature, wellness, responsible adventure, and direct contact with the communities that know the territory.",
    "Miravalles, Tenorio y Rincón de la Vieja en una misma ruta": "Miravalles, Tenorio, and Rincón de la Vieja on one route",
    "Entre el Volcán Miravalles, el Volcán Tenorio y Rincón de la Vieja, el viaje puede cambiar de ritmo varias veces en un mismo día: senderos, termales, cataratas, miradores, bosque seco, bosque húmedo y caminos rurales.": "Between Miravalles Volcano, Tenorio Volcano, and Rincón de la Vieja, the trip can change pace several times in a single day: trails, hot springs, waterfalls, viewpoints, dry forest, humid forest, and rural roads.",
    "Esa diversidad permite combinar experiencias para distintos intereses: caminatas ecológicas, observación de aves, fotografía, turismo rural, visitas familiares y pausas de descanso cerca de aguas termales.": "That diversity makes it possible to combine experiences for different interests: ecological hikes, birdwatching, photography, rural tourism, family visits, and restful pauses near hot springs.",
    "Experiencias cerca de Bijagua y Dos Ríos de Upala": "Experiences near Bijagua and Dos Ríos de Upala",
    "Bijagua y Dos Ríos de Upala son puntos importantes para entender la conexión entre Guanacaste, Alajuela y la zona norte. Desde ahí se abren rutas hacia Río Celeste, Miravalles, fincas, ríos, cataratas y comunidades rurales.": "Bijagua and Dos Ríos de Upala are important points for understanding the connection between Guanacaste, Alajuela, and the northern zone. From there, routes open toward Río Celeste, Miravalles, farms, rivers, waterfalls, and rural communities.",
    "Viajar por esta zona con guías, negocios y anfitriones locales ayuda a que la visita deje más valor en la región y a que cada experiencia tenga contexto, seguridad y sentido de lugar.": "Traveling through this area with local guides, businesses, and hosts helps each visit leave more value in the region and gives every experience context, safety, and a stronger sense of place.",
    "Un destino se recuerda por sus paisajes, pero también por la comida después del camino, el hospedaje donde se descansa, la persona que recomienda una ruta y el emprendimiento que abre sus puertas con identidad propia.": "A destination is remembered for its landscapes, but also for the meal after the road, the lodging where you rest, the person who recommends a route, and the venture that opens its doors with its own identity.",
    "Este directorio busca ordenar esa red local para que el visitante encuentre servicios útiles y para que los emprendimientos de la región ganen visibilidad dentro de una plataforma turística regional.": "This directory organizes that local network so visitors can find useful services and regional ventures can gain visibility within a regional tourism platform.",
    "Este directorio busca ordenar esa red local para que el visitante encuentre servicios útiles y para que los emprendimientos de Miravalles, Guanacaste y la zona norte ganen visibilidad dentro de una plataforma turística regional.": "This directory organizes that local network so visitors can find useful services and so ventures from Miravalles, Guanacaste, and the northern zone can gain visibility within a regional tourism platform.",
    "Hospedaje, comida y guías para recorrer mejor": "Lodging, food, and guides for better travel",
    "Cerca del Volcán Miravalles, Bijagua, Dos Ríos de Upala y las rutas hacia Tenorio, los negocios locales cumplen un papel clave: hospedan, alimentan, orientan, transportan y acompañan a quienes llegan a descubrir la región.": "Near Miravalles Volcano, Bijagua, Dos Ríos de Upala, and the routes toward Tenorio, local businesses play a key role: they host, feed, guide, transport, and accompany those who come to discover the region.",
    "Encontrar restaurantes, termales, guías turísticos, productores, artesanos y transporte local en un solo lugar facilita planificar una visita más cómoda y más conectada con la comunidad.": "Finding restaurants, hot springs, tour guides, producers, artisans, and local transportation in one place makes it easier to plan a more comfortable visit that is more connected to the community.",
    "Comprar local también protege el destino": "Buying local also protects the destination",
    "Cuando una persona elige un negocio local, el viaje deja una huella más positiva. Parte del valor se queda en familias, empleos, servicios comunitarios y emprendimientos que sostienen la identidad del territorio.": "When a person chooses a local business, the trip leaves a more positive footprint. Part of the value stays with families, jobs, community services, and ventures that sustain the territory's identity.",
    "Por eso, el turismo en Raíz Volcánica no termina en el atractivo natural: también incluye cafés, sodas, hospedajes, fincas, tours y proyectos que hacen posible visitar el norte de Costa Rica con más cercanía.": "That is why tourism in Raíz Volcánica does not end at the natural attraction: it also includes cafés, small restaurants, lodging, farms, tours, and projects that make it possible to visit northern Costa Rica more closely.",
    "Hay visitantes que llegan por una caminata, unas termales o una vista al volcán, y terminan preguntándose cómo sería despertar más cerca de este paisaje. La región tiene esa mezcla de calma rural, naturaleza cercana y acceso a servicios que despierta ganas de quedarse.": "Some visitors come for a hike, hot springs, or a volcano view, and end up wondering what it would be like to wake up closer to this landscape. The region has that blend of rural calm, nearby nature, and access to services that makes people want to stay.",
    "Esta sección prepara un espacio ordenado para propiedades, fincas y oportunidades vinculadas a vivir, invertir o desarrollar proyectos responsables en la zona.": "This section prepares an organized space for properties, farms, and opportunities connected to living, investing, or developing responsible projects in the area.",
    "Vivir cerca de Miravalles, Bijagua y la zona norte": "Living near Miravalles, Bijagua, and the northern zone",
    "El entorno de Miravalles, Bijagua, Dos Ríos de Upala y el norte de Guanacaste ofrece una combinación difícil de encontrar: montaña, agua, termales, comunidades rurales, rutas turísticas y conexión con servicios cotidianos.": "The area around Miravalles, Bijagua, Dos Ríos de Upala, and northern Guanacaste offers a rare combination: mountains, water, hot springs, rural communities, tourism routes, and access to everyday services.",
    "Para algunas personas, una casa, lote o finca en esta región representa descanso. Para otras, puede ser una oportunidad de inversión ligada al turismo rural, al ecoturismo o a proyectos de vida más cercanos a la naturaleza.": "For some people, a house, lot, or farm in this region represents rest. For others, it can be an investment opportunity connected to rural tourism, ecotourism, or life projects closer to nature.",
    "Inversión con sentido de territorio": "Investment with a sense of territory",
    "Comprar o alquilar en una zona turística no debería verse solo como una transacción. Aquí importan el acceso, el agua, el paisaje, las comunidades vecinas y la relación entre cada propiedad y el corredor volcánico.": "Buying or renting in a tourism area should not be seen only as a transaction. Here, access, water, landscape, neighboring communities, and the relationship between each property and the volcanic corridor all matter.",
    "Raíz Volcánica busca mostrar oportunidades con contexto para que quienes miran propiedades entiendan mejor el lugar: su cercanía a volcanes, rutas naturales, negocios locales y atractivos del norte de Costa Rica.": "Raíz Volcánica aims to show opportunities with context so people looking at properties better understand the place: its proximity to volcanoes, natural routes, local businesses, and attractions in northern Costa Rica.",
    "La región combina llanuras cálidas, caminos rurales, zonas termales, bosques húmedos y sectores de montaña. Por eso el clima puede cambiar bastante en distancias cortas: una mañana soleada cerca de comunidades bajas puede sentirse fresca y nublada al acercarse a Tenorio, Miravalles o Rincón de la Vieja.": "The region combines warm lowlands, rural roads, hot spring areas, humid forests, and mountain sectors. That is why the weather can change noticeably over short distances: a sunny morning near lower communities can feel cool and cloudy as you approach Tenorio, Miravalles, or Rincón de la Vieja.",
    "En general, la época más seca se concentra entre diciembre y abril, con días más despejados, mejores condiciones para miradores y caminos más estables. La época lluviosa suele ir de mayo a noviembre; trae paisajes más verdes, ríos con más fuerza y tardes de lluvia, especialmente en áreas boscosas y de mayor elevación.": "In general, the driest season runs from December to April, with clearer days, better conditions for viewpoints, and more stable roads. The rainy season usually runs from May to November; it brings greener landscapes, stronger rivers, and rainy afternoons, especially in forested and higher-elevation areas.",
    "Las zonas más frescas suelen estar hacia las partes altas, senderos de bosque, alrededores de Río Celeste y sectores montañosos cercanos a los volcanes. Las áreas más cálidas aparecen en comunidades bajas, rutas abiertas y zonas con menor cobertura boscosa. Rincón de la Vieja puede sentirse más seco y soleado en algunos sectores, mientras que Tenorio tiende a ofrecer ambientes más húmedos y frescos.": "The coolest areas are usually higher up, along forest trails, around Río Celeste, and in mountain sectors near the volcanoes. Warmer areas appear in lower communities, open routes, and places with less forest cover. Rincón de la Vieja can feel drier and sunnier in some sectors, while Tenorio tends to offer more humid and cooler environments.",
    "Para viajar cómodo conviene salir temprano, llevar capa ligera para lluvia, zapatos con buen agarre y una muda seca si se visitan cataratas, termales o senderos. El mejor plan es pensar el clima como parte de la experiencia: luz limpia por la mañana, nubes sobre la montaña, lluvia que refresca el bosque y atardeceres que cambian rápido.": "For comfortable travel, it helps to leave early, bring a light rain layer, wear shoes with good grip, and carry dry clothes if visiting waterfalls, hot springs, or trails. The best plan is to treat the weather as part of the experience: clear morning light, clouds over the mountains, rain cooling the forest, and sunsets that change quickly.",
    "Cada visita a la región puede ser distinta: algunas personas buscan termales y descanso, otras quieren caminar, observar aves, encontrar un guía o ubicar un negocio local antes de salir. También apoyamos a turistas con consultas para orientar mejor su recorrido.": "Every visit to the region can be different: some people seek hot springs and rest, others want to hike, watch birds, find a guide, or locate a local business before leaving. We also support travelers with questions to better guide their route.",
    "Una plataforma regional crece mejor cuando se sostiene con participación local: comercios, guías, hospedajes, productores, organizaciones y personas que entienden el valor de mostrar el territorio con cuidado.": "A regional platform grows better when it is supported by local participation: businesses, guides, lodging, producers, organizations, and people who understand the value of showing the territory with care.",
    "Descubra ofertas, paquetes y campañas especiales para disfrutar mejor su visita.": "Discover offers, packages, and special campaigns to enjoy your visit more.",
    "En la región, las distancias no se miden solo en kilómetros. También importan el clima, el estado del camino, la hora de salida, el tiempo para detenerse y la cercanía entre una poza, un mirador, una comida local o una experiencia guiada.": "In the region, distances are not measured only in kilometers. Weather, road conditions, departure time, time to stop, and the proximity between a pool, viewpoint, local meal, or guided experience also matter.",
    "Este mapa ayuda a imaginar el territorio como una ruta posible: una manera sencilla de ordenar el viaje y descubrir cómo cada punto se conecta con el volcán, las comunidades y el paisaje.": "This map helps imagine the territory as a possible route: a simple way to organize the trip and discover how each point connects with the volcano, the communities, and the landscape.",
    "Un mapa para conectar volcanes y comunidades": "A map to connect volcanoes and communities",
    "Miravalles, Tenorio y Rincón de la Vieja no son solo nombres en una lista de volcanes. En el mapa forman una red de caminos, ríos, termales, cataratas, miradores y comunidades que ayudan a entender el norte de Costa Rica.": "Miravalles, Tenorio, and Rincón de la Vieja are not just names on a list of volcanoes. On the map, they form a network of roads, rivers, hot springs, waterfalls, viewpoints, and communities that help explain northern Costa Rica.",
    "Ubicar Bijagua, Dos Ríos de Upala, Guanacaste y los puntos de interés cercanos permite planificar mejor: saber qué visitar primero, dónde detenerse y cómo combinar naturaleza con servicios locales.": "Locating Bijagua, Dos Ríos de Upala, Guanacaste, and nearby points of interest makes planning easier: knowing what to visit first, where to stop, and how to combine nature with local services.",
    "Planificar con más contexto y menos prisa": "Planning with more context and less hurry",
    "Un buen recorrido no siempre es el que suma más paradas, sino el que permite disfrutar cada lugar con tiempo suficiente. En caminos rurales, una ruta corta puede incluir paisaje, clima cambiante, conversación y descubrimientos inesperados.": "A good route is not always the one with the most stops, but the one that gives enough time to enjoy each place. On rural roads, a short route can include landscape, changing weather, conversation, and unexpected discoveries.",
    "Por eso el mapa funciona como una herramienta de viaje responsable: ayuda a distribuir visitas, reconocer distancias, elegir experiencias cercanas y apoyar negocios locales sin perder el sentido del territorio.": "That is why the map works as a responsible travel tool: it helps distribute visits, understand distances, choose nearby experiences, and support local businesses without losing the sense of territory.",
    "Bosques, aves, mamíferos y plantas tropicales hacen de la zona un aula viva para visitantes y comunidades.": "Forests, birds, mammals, and tropical plants make the area a living classroom for visitors and communities.",
    "La galería funciona como una ventana inicial: agua, bosque, montaña, caminos rurales y escenas que ayudan a imaginar el tipo de viaje que la región puede ofrecer. Pronto este espacio deberá llenarse con fotografías propias del territorio.": "The gallery works as an initial window: water, forest, mountains, rural roads, and scenes that help imagine the kind of trip the region can offer. Soon this space should be filled with photography from the territory itself.",
    "La intención no es mostrar postales perfectas, sino construir memoria visual: imágenes que permitan reconocer lugares, emprendimientos, especies y momentos reales de la experiencia local.": "The intention is not to show perfect postcards, but to build visual memory: images that help people recognize places, ventures, species, and real moments from the local experience.",
    "Imágenes para reconocer Miravalles y sus alrededores": "Images to recognize Miravalles and its surroundings",
    "Una buena fotografía puede ayudar a ubicar el carácter de Miravalles, Guanacaste, Bijagua y Dos Ríos de Upala: el verde de los caminos, la presencia del volcán, el agua clara, los cielos cambiantes y la vida cotidiana de la zona norte.": "A good photograph can help reveal the character of Miravalles, Guanacaste, Bijagua, and Dos Ríos de Upala: the green roads, the presence of the volcano, clear water, changing skies, and daily life in the northern zone.",
    "Al reunir imágenes del territorio, la galería también mejora la forma en que visitantes y buscadores entienden el destino: no como un punto aislado, sino como una región con identidad natural y comunitaria.": "By gathering images of the territory, the gallery also improves how visitors and search engines understand the destination: not as an isolated point, but as a region with natural and community identity.",
    "Del paisaje a la experiencia real": "From landscape to real experience",
    "Las imágenes deben contar lo que el visitante puede vivir: senderos, termales, ríos, cataratas, flora, fauna, hospedajes, comida local, guías, productores y momentos sencillos que hacen memorable el viaje.": "Images should tell what visitors can experience: trails, hot springs, rivers, waterfalls, flora, fauna, lodging, local food, guides, producers, and simple moments that make the trip memorable.",
    "Con el tiempo, este banco visual puede convertirse en una herramienta poderosa para mostrar el turismo del norte de Costa Rica con más verdad, más contexto y más presencia local.": "Over time, this visual bank can become a powerful tool for showing tourism in northern Costa Rica with more truth, more context, and stronger local presence.",
    "En la región, muchos encuentros silvestres no ocurren por casualidad, sino por paciencia: escuchar antes de avanzar, mirar hacia las copas, respetar distancia y entender que cada especie tiene su propio horario.": "In the region, many wildlife encounters do not happen by chance, but through patience: listening before moving ahead, looking into the canopy, keeping distance, and understanding that each species has its own schedule.",
    "Esta guía busca promover una observación responsable, donde ver un ave, un mono o una mariposa sea también una invitación a cuidar el bosque que los mantiene cerca.": "This guide seeks to promote responsible observation, where seeing a bird, a monkey, or a butterfly is also an invitation to care for the forest that keeps them nearby.",
    "La flora de la región no es solo fondo verde. Es sombra para los senderos, alimento para aves e insectos, protección para nacientes y una señal visible de cómo cambian la altura, la humedad y el uso de la tierra.": "The region's flora is not just a green backdrop. It is shade for trails, food for birds and insects, protection for springs, and a visible sign of how elevation, humidity, and land use change.",
    "Documentar estas especies ayuda a mirar con más atención: reconocer árboles, helechos, flores y zonas de bosque convierte una caminata sencilla en una lectura viva del territorio.": "Documenting these species helps people look more carefully: recognizing trees, ferns, flowers, and forest areas turns a simple walk into a living reading of the territory.",
    "Ficha inicial": "Initial profile",
    "Esta página funciona como base editorial para ampliar información específica del atractivo, agregar fotografías reales, recomendaciones de acceso, horarios sugeridos y buenas prácticas de visita.": "This page works as an editorial base for expanding specific attraction information, adding real photos, access recommendations, suggested hours, and good visit practices.",
    "En esta fase se deja lista la ruta estática para SEO y navegación. El contenido local detallado puede incorporarse conforme se valide con guías, comercios y comunidad.": "At this stage, the static route is ready for SEO and navigation. Detailed local content can be added as it is validated with guides, businesses, and the community.",
    "Consultas y alianzas": "Questions and partnerships",
    "Escríbanos y le orientamos": "Write to us and we will guide you",
    "Atendemos consultas de viaje, recomendaciones para visitar la zona y propuestas de negocios, tours, hospedajes, patrocinios o contenido regional.": "We handle travel questions, recommendations for visiting the area, and proposals for businesses, tours, lodging, sponsorships, or regional content.",
    "Orientación para visitantes": "Visitor guidance",
    "Registrar negocio": "Register business",
    "Patrocinios": "Sponsorships",
    "Promocionar experiencia": "Promote experience",
    "Contenido regional": "Regional content",
    "Consultar por WhatsApp": "Ask on WhatsApp",
    "Enviar correo": "Send email",
    "Información": "Information",
    "Contacto directo": "Direct contact",
    "Para consultas de viaje, alianzas, negocios o contenido regional, escríbanos por WhatsApp o correo. Así podemos responder con más contexto y darle seguimiento real a cada solicitud.": "For travel questions, partnerships, businesses, or regional content, write to us by WhatsApp or email. That way we can respond with more context and follow up properly on each request.",
    "Correo": "Email",
    "¿Quiere apoyar la plataforma?": "Would you like to support the platform?",
    "La sección de patrocinadores está lista para activarse con paquetes, niveles y beneficios editoriales en una fase posterior.": "The sponsors section is ready to be activated later with packages, levels, and editorial benefits.",
    "Ver opciones de alianza": "View partnership options",
    "Ver promoción": "View promotion",
    "Aún no hay promociones activas": "There are no active promotions yet",
    "Cuando se publiquen campañas promocionales, aparecerán aquí de forma independiente a los items potenciados del sitio.": "When promotional campaigns are published, they will appear here independently from boosted site items.",
    "Descripción": "Description",
    "Esta página está preparada para ampliar itinerario, recomendaciones, políticas, fotografías reales y proveedor local cuando la experiencia esté lista para comercializarse.": "This page is prepared to expand the itinerary, recommendations, policies, real photography, and local provider when the experience is ready to be marketed.",
    "Detalles": "Details",
    "Mejor época": "Best season",
    "Ubicación": "Location",
    "Proveedor": "Provider",
    "Por definir": "To be defined",
    "Experiencias relacionadas": "Related experiences",
    "Sobre el negocio": "About the business",
    "Servicios ofrecidos": "Services offered",
    "Contacto y ubicación": "Contact and location",
    "Sobre la propiedad": "About the property",
    "Esta ficha está preparada para ampliar información comercial, condiciones, fotografías reales, detalles de acceso y contacto del responsable cuando la oportunidad esté lista para publicarse.": "This profile is prepared to expand commercial information, conditions, real photos, access details, and the responsible contact when the opportunity is ready to publish.",
    "Área": "Area",
    "Terreno": "Land",
    "Ubicación referencial": "Reference location",
    "Propiedades relacionadas": "Related properties",
    "Negocio promocionado": "Promoted business",
    "Ver negocio": "View business",
    "Filtrar fauna": "Filter fauna",
    "Filtrar flora": "Filter flora",
    "Busca por nombre o selecciona una categoría.": "Search by name or choose a category.",
    "Buscar especie...": "Search species...",
    "Hábitat": "Habitat",
    "Estado de conservación": "Conservation status",
    "Conservación": "Conservation",
    "Imágenes de": "Images of",
    "Ampliar imagen": "Expand image",
    "Imagen anterior": "Previous image",
    "Imagen siguiente": "Next image",
    "Miniaturas de": "Thumbnails of",
    "Ver imagen": "View image",
    "Cerrar imagen": "Close image",
    "de": "of",
    "Ver experiencia": "View experience",
    "Ver propiedad": "View property",
    "Propiedad recomendada": "Recommended property",
    "Hospedaje recomendado": "Recommended lodging",
    "Restaurante recomendado": "Recommended restaurant",
    "Guía turística recomendada": "Recommended tour guide",
    "Termales recomendadas": "Recommended hot springs",
    "Tour operador recomendado": "Recommended tour operator",
    "Transporte recomendado": "Recommended transportation",
    "Artesanía recomendada": "Recommended crafts",
    "Producto local recomendado": "Recommended local product"
  }
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  tv: (value: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children, initialLocale = "es" }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((item) => item.startsWith("rv-locale="))
      ?.split("=")[1];
    const saved = cookieLocale || window.localStorage.getItem("rv-locale");
    if (saved === "es" || saved === "en") setLocaleState(saved);
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("rv-locale", nextLocale);
    document.cookie = `rv-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = nextLocale;
    window.location.reload();
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
