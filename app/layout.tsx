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
const siteTitle = "Raíz Volcánica | Turismo, naturaleza y experiencias del norte de Costa Rica";
const siteDescription =
  "Plataforma turística y ecológica que conecta volcanes, bosques, ríos, termales, biodiversidad, negocios locales y experiencias del norte de Costa Rica.";
const siteName = "Raíz Volcánica";
const ogImage = "/images/volcan-miravalles-arcoiris-guanacaste.webp";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Raíz Volcánica"
  },
  description: siteDescription,
  keywords: [
    "Raíz Volcánica",
    "Miravalles Costa Rica",
    "Rincón de la Vieja",
    "Volcán Tenorio",
    "turismo Miravalles",
    "Volcán Miravalles",
    "Volcán Rincón de la Vieja",
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
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1920,
        height: 1440,
        alt: "Paisaje volcánico y natural del norte de Costa Rica"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage]
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: siteName,
  description: siteDescription,
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
      name: "Volcán Miravalles",
      address: {
        "@type": "PostalAddress",
        addressCountry: "CR",
        addressRegion: "Guanacaste"
      }
    },
    {
      "@type": "TouristAttraction",
      name: "Volcán Rincón de la Vieja"
    },
    {
      "@type": "TouristAttraction",
      name: "Volcán Tenorio"
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
