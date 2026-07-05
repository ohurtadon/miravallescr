import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://raizvolcanica.com";
const DEFAULT_OG_IMAGE = "/images/volcan-miravalles-arcoiris-guanacaste.webp";

export const siteName = "Raíz Volcánica";

export function getPublicSiteUrl() {
  const configuredUrl = process.env.SITE_URL || process.env.PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  const siteUrl = (configuredUrl || DEFAULT_SITE_URL).replace(/\/$/, "");

  if (siteUrl.includes(".vercel.app")) {
    return DEFAULT_SITE_URL;
  }

  return siteUrl;
}

export function absoluteSiteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getPublicSiteUrl()}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function localizedSiteUrl(path: string, locale: "es" | "en") {
  const url = new URL(absoluteSiteUrl(path));
  url.searchParams.set("lang", locale);
  return url.toString();
}

export function buildLanguageAlternates(path: string) {
  return {
    es: localizedSiteUrl(path, "es"),
    en: localizedSiteUrl(path, "en"),
    "x-default": absoluteSiteUrl(path)
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website"
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteSiteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path)
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "es_CR",
      type,
      images: [
        {
          url: image,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}
