import type { MetadataRoute } from "next";

const SITE_URL = "https://raizvolcanica.com";

const routes = [
  "",
  "/alianzas/",
  "/atractivos/",
  "/clima/",
  "/contacto/",
  "/experiencias/",
  "/flora-fauna/",
  "/flora-fauna/fauna/",
  "/flora-fauna/flora/",
  "/galeria/",
  "/mapa/",
  "/negocios/",
  "/patrocinadores/",
  "/politica-de-privacidad/",
  "/promociones/",
  "/propiedades/"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
