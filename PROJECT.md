# Proyecto: Portal Turístico y Ecológico de Miravalles

## Resumen Ejecutivo

Desarrollar un sitio web moderno para promocionar la región de Miravalles, ubicada en Guanacaste, Costa Rica.

El objetivo principal es mostrar el valor ecológico, paisajístico y turístico de la zona, destacando su biodiversidad, ríos, aguas termales, senderos, volcanes y experiencias de turismo sostenible.

El sitio debe inspirar al visitante a conocer Miravalles y posicionarlo como uno de los principales destinos de naturaleza de Guanacaste.

---

# Objetivos del Proyecto

## Objetivos de Negocio

* Promocionar la zona de Miravalles.
* Incrementar el interés turístico.
* Difundir información sobre flora y fauna local.
* Destacar atractivos naturales.
* Servir como fuente oficial de información para visitantes.

## Objetivos Técnicos

* Sitio rápido y optimizado para SEO.
* Compatible con dispositivos móviles.
* Fácil de mantener.
* Hosting de bajo costo.
* Arquitectura estática sin dependencia de servidores backend.

---

# Alcance Inicial (MVP)

## Incluye

* Página principal.
* Sección de atractivos turísticos.
* Sección de flora y fauna.
* Galería fotográfica.
* Mapa interactivo.
* Página de contacto.
* SEO básico.
* Diseño responsive.

## No Incluye (Fase 1)

* Login de usuarios.
* Reservas.
* E-commerce.
* Administración propia.
* Base de datos.
* Sistema de autenticación.

---

# Stack Tecnológico

## Frontend

* Next.js
* TypeScript
* Tailwind CSS

## Animaciones

* Framer Motion

## Mapas

* Mapbox

## Hosting

* Vercel
  o
* Cloudflare Pages

## Arquitectura

Static Site Generation (SSG)

Exportación:

```bash
next build
```

Configuración:

```javascript
const nextConfig = {
  output: 'export'
}

export default nextConfig
```

---

# Identidad Visual

## Concepto

Naturaleza, agua, bosque y origen volcánico.

El sitio debe transmitir:

* Aventura
* Conservación
* Ecoturismo
* Tranquilidad
* Biodiversidad

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

### Mapa Interactivo

Mapa de Miravalles utilizando Mapbox.

Categorías filtrables:

* Naturaleza
* Aventura
* Relajación
* Gastronomía

Marcadores:

* Ríos
* Termales
* Cataratas
* Miradores
* Senderos

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

### Experiencias

Tarjetas destacadas.

Ejemplos:

* Caminata ecológica
* Termales
* Observación de aves
* Senderismo
* Fotografía de naturaleza

Cada experiencia mostrará:

* Duración
* Dificultad
* Mejor época

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

---

### Footer

Secciones:

Explorar

* Atractivos
* Flora y fauna
* Experiencias

Información

* Cómo llegar
* Contacto
* Clima

Redes Sociales

* Facebook
* Instagram
* YouTube

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

|-- /galeria

|-- /mapa

|-- /contacto
```

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

---

# Optimización

Objetivos:

* Lighthouse > 90
* Mobile First
* Lazy Loading
* Imágenes WebP
* Componentes reutilizables

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

## Fase 3

* Integración con negocios locales
* Directorio turístico
* Calendario de actividades

## Fase 4

* Datos en tiempo real
* Clima
* Estado de senderos
* Avistamientos recientes de fauna

---

# Referencias de Diseño

Inspiración:

* Visit Iceland
* Visit North Iceland
* Visit Reykjavik
* Conservation International

Características a replicar:

* Hero visual impactante
* Fotografías de alta calidad
* Diseño limpio
* Mucho espacio visual
* Navegación simple
* Storytelling visual

---

# Resultado Esperado

Un sitio web moderno, rápido, visualmente atractivo y optimizado para SEO que represente a Miravalles como uno de los principales destinos ecológicos y turísticos de Costa Rica.
