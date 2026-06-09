# Proyecto: Portal Turístico, Ecológico y Comercial de Miravalles

## Resumen Ejecutivo

Desarrollar un sitio web moderno para promocionar la región de Miravalles, ubicada en Guanacaste, Costa Rica.

El objetivo principal es mostrar el valor ecológico, paisajístico y turístico de la zona, destacando su biodiversidad, ríos, aguas termales, senderos, volcanes y experiencias de turismo sostenible.

El sitio debe inspirar al visitante a conocer Miravalles y posicionarlo como uno de los principales destinos de naturaleza de Guanacaste.

Además de ser informativo, el sitio debe estar preparado desde el inicio para habilitar futuras formas de monetización alineadas con el desarrollo local, tales como directorio de negocios, experiencias promocionables, patrocinadores, alianzas turísticas y espacios discretos de promoción.

La monetización debe sentirse integrada al propósito ecológico y turístico del proyecto. Debe apoyar a negocios, guías, emprendimientos y aliados locales sin afectar la experiencia del visitante ni convertir el sitio en una plataforma publicitaria invasiva.

---

# Objetivos del Proyecto

## Objetivos de Negocio

* Promocionar la zona de Miravalles.
* Incrementar el interés turístico.
* Difundir información sobre flora y fauna local.
* Destacar atractivos naturales.
* Servir como fuente oficial de información para visitantes.
* Crear una plataforma preparada para monetizar mediante alianzas locales.
* Promover negocios turísticos, productores, guías y emprendimientos de la zona.
* Habilitar espacios para patrocinadores y socios estratégicos.
* Facilitar la promoción de tours, experiencias y servicios turísticos.

## Objetivos Técnicos

* Sitio rápido y optimizado para SEO.
* Compatible con dispositivos móviles.
* Fácil de mantener.
* Hosting de bajo costo.
* Arquitectura estática sin dependencia de servidores backend.
* Estructuras de datos reutilizables para negocios, experiencias y patrocinadores.
* Rutas estáticas preparadas para páginas individuales de negocios y experiencias.
* Componentes reutilizables para promociones discretas y aliados comerciales.

---

# Alcance Inicial (MVP)

## Incluye

* Página principal.
* Sección de atractivos turísticos.
* Sección de flora y fauna.
* Sección de experiencias turísticas destacadas.
* Directorio inicial de negocios locales.
* Sección inicial de propiedades en venta o alquiler.
* Página individual para cada negocio.
* Página individual para cada experiencia.
* Espacios visuales para patrocinadores y aliados.
* Componentes reutilizables de promoción discreta.
* Galería fotográfica.
* Mapa interactivo.
* Página de contacto.
* Página de alianzas.
* Página de patrocinadores.
* SEO básico.
* Diseño responsive.

## No Incluye (Fase 1)

* Login de usuarios.
* Reservas.
* E-commerce.
* Pagos en línea.
* Gestión inmobiliaria avanzada.
* Publicación directa de propiedades por usuarios.
* Administración propia.
* Base de datos.
* Sistema de autenticación.
* Automatización de cobros por patrocinio.
* Panel para negocios locales.

---

# Estrategia de Monetización

El sitio debe iniciar sin necesidad de monetización activa, pero su arquitectura visual y de contenido debe quedar lista para activarla en el futuro.

## Formas de monetización previstas

* Directorio de negocios locales.
* Negocios destacados.
* Patrocinios principales.
* Promoción de tours y experiencias.
* Promoción de propiedades en venta o alquiler.
* Espacios publicitarios discretos.
* Alianzas con emprendimientos turísticos.
* Comisiones por consultas, reservas externas o referidos en fases futuras.

## Principios

* La monetización es secundaria al valor turístico y ecológico.
* Los espacios comerciales deben sentirse como recomendaciones locales, no como anuncios genéricos.
* Las promociones deben reforzar el desarrollo sostenible de Miravalles.
* La experiencia del visitante debe mantenerse limpia, confiable y editorial.

## Evitar

* Banners grandes tipo publicidad genérica.
* Popups invasivos.
* Exceso de llamados comerciales.
* Diseño que rompa la identidad ecológica.
* Promociones que no estén relacionadas con turismo, naturaleza o comunidad local.

## Priorizar

* Tarjetas visuales elegantes.
* Secciones de aliados.
* Negocios recomendados.
* Experiencias destacadas.
* Promoción local con apariencia profesional.
* Mensajes de apoyo al turismo sostenible.

---

# Stack Tecnológico

## Frontend

* Next.js
* TypeScript
* Tailwind CSS

## Animaciones

* Framer Motion, cuando aporte valor y no afecte estabilidad visual.

## Mapas

* Mapbox

## Hosting

* Vercel
  o
* Cloudflare Pages
  o
* GitHub Pages mediante exportación estática

## Arquitectura

Static Site Generation (SSG)

Exportación:

```bash
next build
```

Configuración base:

```javascript
const nextConfig = {
  output: 'export'
}

export default nextConfig
```

Para GitHub Pages, el sitio debe contemplar `basePath` cuando se publique bajo un subdirectorio del repositorio.

---

# Identidad Visual

## Concepto

Naturaleza, agua, bosque, comunidad local y origen volcánico.

El sitio debe transmitir:

* Aventura
* Conservación
* Ecoturismo
* Tranquilidad
* Biodiversidad
* Desarrollo local
* Confianza turística

---

## Paleta de Colores

Verde Bosque

```css
#2F5D3A
```

Verde Musgo

```css
#6E8B3D
```

Beige Arena

```css
#D9C7A2
```

Azul Río

```css
#3E7EA8
```

Gris Volcánico

```css
#4E4E4E
```

---

# Estructura del Sitio

## Home

La página principal debe incluir:

1. Hero principal de Miravalles.
2. Introducción ecológica y turística.
3. Principales atractivos.
4. Experiencias destacadas.
5. Negocios locales destacados.
6. Propiedades destacadas o enlace a propiedades.
7. Mapa interactivo.
8. Flora y fauna.
9. Patrocinadores o aliados.
10. Galería.
11. Llamado a la acción.

### Hero

Video o imagen de fondo.

Elementos:

* Logo
* Menú principal
* Botón CTA

Título:

"Descubre el corazón ecológico de Guanacaste"

Subtítulo:

"Bosques, ríos, aguas termales y biodiversidad en las faldas del Volcán Miravalles."

Botón:

"Explorar Miravalles"

---

### Estadísticas

Cards con datos relevantes.

Ejemplos:

* Especies de aves
* Senderos
* Ríos
* Días para visitar

---

### Descubre Miravalles

Bloque descriptivo.

Imagen panorámica del volcán.

Texto introductorio.

Botón:

"Conocer más"

---

### Principales Atractivos

Grid de tarjetas.

Categorías:

* Río Blanco
* Termales
* Volcán Miravalles
* Senderos
* Observación de aves
* Miradores

Cada tarjeta debe incluir:

* Imagen
* Nombre
* Resumen
* Enlace

---

### Experiencias Destacadas

Sección preparada para experiencias turísticas promocionables.

Ejemplos:

* Caminata ecológica
* Observación de aves
* Día de termales
* Tour fotográfico
* Ruta rural
* Tour gastronómico
* Visita a emprendimientos locales

Cada experiencia debe incluir:

* Nombre
* Imagen
* Descripción
* Duración
* Dificultad
* Precio opcional
* Proveedor o guía
* Botón: "Consultar disponibilidad"
* Botón: "Contactar por WhatsApp"

Estas experiencias podrían monetizarse por comisión, patrocinio o promoción destacada.

---

### Negocios Locales Destacados

Sección para mostrar negocios relacionados con turismo en Miravalles.

Categorías iniciales:

* Hospedajes
* Restaurantes
* Guías turísticos
* Tours
* Termales
* Transporte
* Cafeterías
* Artesanos
* Productores locales

Cada negocio debe tener una tarjeta con:

* Nombre
* Categoría
* Imagen
* Descripción corta
* Ubicación
* Botón: "Ver más"
* Botón: "Contactar"

Debe existir la posibilidad de marcar algunos negocios como:

**Destacado**

Los negocios destacados deben aparecer primero y con diseño visual más llamativo, sin romper la identidad ecológica del sitio.

---

### Propiedades

Sección orientada a visitantes que desean vivir, invertir o alquilar en Miravalles.

Texto sugerido:

"Te gustó la zona, quieres vivir acá. Te ofrecemos las siguientes propiedades."

Filtros:

* Venta
* Alquiler
* Casa
* Finca
* Lote
* Comercio

Cada propiedad debe incluir:

* Título
* Operación
* Tipo
* Imagen
* Descripción corta
* Ubicación
* Área o tamaño
* Precio o "Consultar"
* Botón de consulta

Esta sección debe mantenerse discreta y alineada con el posicionamiento del destino. No debe desplazar el foco turístico/ecológico principal.

---

### Mapa Interactivo

Mapa de Miravalles utilizando Mapbox.

Categorías filtrables:

* Naturaleza
* Aventura
* Relajación
* Gastronomía
* Negocios locales

Marcadores:

* Ríos
* Termales
* Cataratas
* Miradores
* Senderos
* Negocios locales
* Experiencias

---

### Flora y Fauna

Dos subsecciones:

#### Fauna

* Perezoso
* Tucán
* Mono Congo
* Mariposas
* Reptiles

#### Flora

* Guanacaste
* Helechos
* Orquídeas
* Bosque Nuboso

---

### Patrocinadores y Aliados

Sección visual no invasiva para mostrar aliados que apoyan el desarrollo turístico de Miravalles.

Texto sugerido:

**Aliados que apoyan el desarrollo turístico de Miravalles**

Cada patrocinador debe mostrar:

* Logo
* Nombre
* Descripción corta
* Enlace o botón

Ubicaciones sugeridas:

* Home, antes del footer.
* Página de atractivos.
* Página de negocios locales.

---

### Galería

Diseño tipo Masonry.

Funcionalidades:

* Lightbox
* Navegación por imágenes

---

### Testimonios

Tres tarjetas.

Calificación visual.

Comentario breve.

---

### CTA Final

Título:

"¿Listo para descubrir Miravalles?"

Botón:

"Planifica tu visita"

CTA alternativo para socios:

"Sea parte de la promoción turística de Miravalles"

Botón:

"Quiero ser aliado"

---

### Footer

Secciones:

Explorar

* Atractivos
* Flora y fauna
* Experiencias
* Negocios locales

Información

* Cómo llegar
* Contacto
* Clima
* Alianzas

Comercial

* Patrocinadores
* Registrar mi negocio
* Promocionar una experiencia

Redes Sociales

* Facebook
* Instagram
* YouTube

---

# Páginas Nuevas y Actualizadas

## Negocios Locales

Ruta:

```text
/negocios
```

Debe mostrar un directorio de negocios relacionados con turismo en Miravalles.

Funciones iniciales:

* Listado de negocios.
* Filtro por categoría.
* Negocios destacados primero.
* Tarjetas visuales con imagen, categoría, ubicación y botones.
* Espacio para destacar socios o patrocinadores.

## Página Individual de Negocio

Ruta:

```text
/negocios/[slug]
```

Contenido sugerido:

* Nombre del negocio.
* Galería de fotos.
* Descripción.
* Servicios ofrecidos.
* Horarios.
* Ubicación.
* Teléfono o WhatsApp.
* Redes sociales.
* Botón de contacto.
* Mapa.
* Etiqueta de "Socio destacado", si aplica.

## Experiencias

Ruta:

```text
/experiencias
```

Debe mostrar experiencias turísticas, algunas de ellas promocionables.

Categorías iniciales:

* Naturaleza
* Aventura
* Relajación
* Familiar
* Fotografía
* Observación de aves
* Turismo rural

## Página Individual de Experiencia

Ruta:

```text
/experiencias/[slug]
```

Contenido sugerido:

* Nombre de la experiencia.
* Imagen o galería.
* Descripción.
* Duración.
* Dificultad.
* Precio opcional.
* Proveedor o guía.
* Ubicación.
* Botón: "Consultar disponibilidad".
* Botón: "Contactar por WhatsApp".
* Experiencias relacionadas.

## Patrocinadores

Ruta:

```text
/patrocinadores
```

Debe presentar aliados activos, patrocinadores principales y socios que apoyan la plataforma.

## Alianzas

Ruta:

```text
/alianzas
```

Página orientada a posibles socios comerciales.

Título:

**Sea parte de la promoción turística de Miravalles**

Texto sugerido:

"Esta plataforma busca impulsar el turismo sostenible de Miravalles conectando visitantes con experiencias, negocios y atractivos locales."

Opciones:

* Registrar mi negocio.
* Patrocinar la plataforma.
* Promocionar una experiencia.
* Colaborar con contenido.
* Contactar al equipo.

Botón principal:

**Quiero ser aliado**

---

# Espacios Publicitarios Discretos

Crear componentes reutilizables para promociones internas.

No deben parecer banners agresivos.

Ejemplos:

* Hospedaje recomendado.
* Tour destacado.
* Restaurante aliado.
* Experiencia recomendada.

Ubicaciones sugeridas:

* Entre secciones del home.
* Sidebar o bloque inferior en páginas de atractivos.
* Final de artículos o páginas informativas.
* Página de mapa.
* Página de negocios locales.

Los componentes deben usar lenguaje editorial y visual sobrio. Deben sentirse como recomendaciones útiles para el visitante.

---

# Estructura de Rutas

```text
/
|-- /atractivos
|-- /atractivos/rio-blanco
|-- /atractivos/termales
|-- /atractivos/volcan-miravalles

|-- /flora-fauna
|-- /flora-fauna/flora
|-- /flora-fauna/fauna

|-- /experiencias
|-- /experiencias/[slug]

|-- /negocios
|-- /negocios/[slug]

|-- /propiedades

|-- /patrocinadores
|-- /alianzas

|-- /galeria
|-- /mapa
|-- /contacto
```

---

# Modelo de Datos Sugerido

## Business

```typescript
type Business = {
  id: string
  name: string
  slug: string
  category: string
  description: string
  longDescription: string
  images: string[]
  location: string
  coordinates?: {
    lat: number
    lng: number
  }
  phone?: string
  whatsapp?: string
  website?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    youtube?: string
    tiktok?: string
  }
  isFeatured: boolean
  isSponsor: boolean
  sponsorLevel?: 'principal' | 'destacado' | 'aliado'
  services: string[]
  openingHours?: string
}
```

## Experience

```typescript
type Experience = {
  id: string
  title: string
  slug: string
  category: string
  description: string
  image: string
  duration: string
  difficulty: string
  price?: string
  provider?: string
  location: string
  contactUrl?: string
  whatsapp?: string
  isFeatured: boolean
}
```

## Sponsor

```typescript
type Sponsor = {
  id: string
  name: string
  logo: string
  description: string
  website?: string
  level: 'principal' | 'destacado' | 'aliado'
  active: boolean
}
```

## Property

```typescript
type Property = {
  id: string
  title: string
  slug: string
  operation: 'Venta' | 'Alquiler'
  type: 'Casa' | 'Finca' | 'Lote' | 'Comercio'
  price?: string
  image: string
  description: string
  location: string
  area?: string
  landSize?: string
  contactUrl: string
  isFeatured: boolean
}
```

---

# Categorías Iniciales

## Negocios

* Hospedaje
* Restaurante
* Guía turístico
* Termales
* Tour operador
* Transporte
* Artesanía
* Producto local

## Experiencias

* Naturaleza
* Aventura
* Relajación
* Familiar
* Fotografía
* Observación de aves
* Turismo rural

---

# SEO

Cada página debe incluir:

* title
* description
* Open Graph
* Twitter Card

Ejemplo Home:

Title:

Miravalles Guanacaste | Naturaleza, Termales y Aventura

Description:

Descubre Miravalles en Guanacaste, Costa Rica. Explora ríos, senderos, biodiversidad, aguas termales y experiencias únicas de ecoturismo.

## SEO para Monetización Local

Las páginas de negocios y experiencias deben estar preparadas para posicionar búsquedas locales.

Ejemplos:

* Aguas termales en Miravalles.
* Tours en Miravalles Guanacaste.
* Hospedaje cerca del Volcán Miravalles.
* Restaurantes en Miravalles.
* Guías turísticos en Miravalles.

---

# Optimización

Objetivos:

* Lighthouse > 90
* Mobile First
* Lazy Loading
* Imágenes WebP
* Componentes reutilizables
* Datos organizados en estructuras fáciles de mantener
* Exportación estática compatible con hosting de bajo costo

---

# Estructura de Componentes

```text
components/

Header
Hero
Stats
DiscoverSection
AttractionsGrid
MapSection
WildlifeSection
ExperiencesSection
ExperienceCard
FeaturedExperiences
BusinessDirectory
BusinessCard
FeaturedBusinesses
SponsorSection
SponsorCard
PromoSlot
GallerySection
Testimonials
CallToAction
Footer
```

---

# Futuras Fases

## Fase 2

* Blog
* Noticias
* CMS Headless
* Contenido ampliado para atractivos y experiencias

## Fase 3

* Integración con negocios locales
* Directorio turístico completo
* Calendario de actividades
* Formularios para registrar negocios
* Formularios para proponer experiencias
* Gestión editorial de patrocinadores

## Fase 4

* Datos en tiempo real
* Clima
* Estado de senderos
* Avistamientos recientes de fauna
* Integración con WhatsApp o CRM ligero
* Métricas de clics en negocios y experiencias
* Monetización por referidos o leads

---

# Referencias de Diseño

Inspiración:

* Visit Iceland
* Visit North Iceland
* Visit Reykjavik
* Conservation International
* Directorios turísticos editoriales de alta calidad

Características a replicar:

* Hero visual impactante
* Fotografías de alta calidad
* Diseño limpio
* Mucho espacio visual
* Navegación simple
* Storytelling visual
* Tarjetas comerciales elegantes
* Promoción local integrada de forma natural

---

# Resultado Esperado

Un sitio web moderno, rápido, visualmente atractivo y optimizado para SEO que represente a Miravalles como uno de los principales destinos ecológicos y turísticos de Costa Rica.

El sitio debe quedar preparado para crecer hacia una plataforma sostenible de promoción turística local, donde visitantes puedan descubrir atractivos, experiencias, negocios y aliados de la región sin que la monetización opaque el propósito ecológico y comunitario del proyecto.
