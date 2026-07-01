# Raiz Volcanica Sitio Publico

Sitio publico de Raiz Volcanica construido con Next.js. Consume contenido publicado desde la API del monorepo `miravallesgte` y mantiene fallbacks estaticos en `data/site.ts`.

## Repositorio

- GitHub: `https://github.com/ohurtadon/miravallescr`
- Rama principal: `main`
- Plataforma de despliegue: Vercel

## Despliegue

- Proyecto Vercel: `miravallescr`
- URL de produccion: `https://raizvolcanica.com`
- Dominio `www`: `https://www.raizvolcanica.com`
- API consumida: `https://miravallesgte-api.onrender.com`
- Healthcheck API: `https://miravallesgte-api.onrender.com/health`

`www.raizvolcanica.com` y `raizvolcanica.com` son origenes distintos para CORS. La API en Render debe permitir ambos si el dominio `www` puede cargar el sitio.

## Variables de Entorno

Variables recomendadas en Vercel:

```bash
SITE_URL=https://raizvolcanica.com
PUBLIC_SITE_URL=https://raizvolcanica.com
NEXT_PUBLIC_SITE_URL=https://raizvolcanica.com

RAIZ_VOLCANICA_API_URL=https://miravallesgte-api.onrender.com
NEXT_PUBLIC_RAIZ_VOLCANICA_API_URL=https://miravallesgte-api.onrender.com

MIRAVALLESGTE_API_URL=https://miravallesgte-api.onrender.com
NEXT_PUBLIC_MIRAVALLESGTE_API_URL=https://miravallesgte-api.onrender.com
```

Las variables `RAIZ_VOLCANICA_*` son las preferidas. Las variables `MIRAVALLESGTE_*` se pueden mantener por compatibilidad.

No agregar `/api/admin` en las variables de este sitio publico; deben apuntar al root de la API.

## CORS en Render

En el servicio Render `miravallesgte-api`, configurar:

```bash
CORS_ORIGIN=https://raizvolcanica.com,https://www.raizvolcanica.com,https://portal.raizvolcanica.com
PUBLIC_SITE_URL=https://raizvolcanica.com
```

## Desarrollo Local

Instalar dependencias:

```bash
npm install
```

Levantar el sitio:

```bash
npm run dev
```

URL local:

```txt
http://localhost:3000
```

Para apuntar a una API local:

```bash
RAIZ_VOLCANICA_API_URL=http://localhost:4000 npm run dev
```

## Comandos

```bash
npm run dev
npm run build
npm run start
npm run lint
```

