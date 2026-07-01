import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { cookies } from "next/headers";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
  display: "swap"
});

const DEFAULT_SITE_URL = "https://raizvolcanica.com";

function getPublicSiteUrl() {
  const configuredUrl = process.env.SITE_URL || process.env.PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  const siteUrl = (configuredUrl || DEFAULT_SITE_URL).replace(/\/$/, "");

  if (siteUrl.includes(".vercel.app")) {
    return DEFAULT_SITE_URL;
  }

  return siteUrl;
}

const siteUrl = getPublicSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Raíz Volcanica | Guia Regional y Plataforma Turistica en Guanacaste",
    template: "%s | Raíz Volcanica"
  },
  description:
    "Guia regional y plataforma turistica para descubrir el corredor volcanico y natural del norte de Costa Rica: atractivos naturales, aguas termales, senderos, biodiversidad, experiencias y negocios locales.",
  keywords: [
    "Raíz Volcanica",
    "Miravalles Costa Rica",
    "Rincon de la Vieja",
    "Volcan Tenorio",
    "turismo Miravalles",
    "Volcan Miravalles",
    "Volcan Rincon de la Vieja",
    "Guanacaste ecoturismo",
    "aguas termales Costa Rica",
    "senderismo Guanacaste",
    "regional travel guide Costa Rica",
    "hiking Guanacaste",
    "sustainable tourism Costa Rica"
  ],
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "Raíz Volcanica | Guia Regional y Plataforma Turistica",
    description:
      "Descubre atractivos, experiencias y negocios locales del corredor volcanico y natural del norte de Costa Rica.",
    url: siteUrl,
    siteName: "Raíz Volcanica",
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: "/images/volcan-miravalles-arcoiris-guanacaste.webp",
        width: 2752,
        height: 1536,
        alt: "Paisaje volcánico y natural del norte de Costa Rica"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Raíz Volcanica | Guia Regional y Plataforma Turistica",
    description:
      "Explora atractivos, negocios locales, termales, senderos y ecoturismo en Guanacaste."
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Raíz Volcanica",
  description:
    "Guia regional y plataforma turistica para descubrir atractivos naturales, experiencias, negocios locales y biodiversidad del corredor volcanico y natural del norte de Costa Rica.",
  url: siteUrl,
  touristType: ["Ecoturistas", "Familias", "Viajeros de aventura", "Turismo rural"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "CR",
    addressRegion: "Guanacaste"
  },
  containsPlace: [
    {
      "@type": "TouristAttraction",
      name: "Volcan Miravalles",
      address: {
        "@type": "PostalAddress",
        addressCountry: "CR",
        addressRegion: "Guanacaste"
      }
    },
    {
      "@type": "TouristAttraction",
      name: "Volcan Rincon de la Vieja"
    },
    {
      "@type": "TouristAttraction",
      name: "Volcan Tenorio"
    },
    {
      "@type": "TouristAttraction",
      name: "Aguas termales del corredor volcánico"
    },
    {
      "@type": "TouristAttraction",
      name: "Senderos, rios y termales del norte de Costa Rica"
    }
  ]
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("rv-locale")?.value === "en" ? "en" : "es";

  return (
    <html lang={locale} className={`${inter.variable} ${display.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider initialLocale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
