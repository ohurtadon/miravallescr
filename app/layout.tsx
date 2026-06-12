import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://miravallescr.com"),
  title: {
    default: "Miravalles CR | Guia Regional y Plataforma Turistica en Guanacaste",
    template: "%s | Miravalles CR"
  },
  description:
    "Guia regional y plataforma turistica para descubrir Miravalles, Guanacaste: atractivos naturales, aguas termales, senderos, biodiversidad, experiencias y negocios locales.",
  keywords: [
    "Miravalles Costa Rica",
    "turismo Miravalles",
    "Volcan Miravalles",
    "Guanacaste ecoturismo",
    "aguas termales Miravalles",
    "senderismo Guanacaste",
    "regional travel guide Costa Rica",
    "hiking Guanacaste",
    "sustainable tourism Miravalles"
  ],
  alternates: {
    canonical: "https://miravallescr.com"
  },
  openGraph: {
    title: "Miravalles CR | Guia Regional y Plataforma Turistica",
    description:
      "Descubre atractivos, experiencias y negocios locales alrededor del Volcan Miravalles, Guanacaste.",
    url: "https://miravallescr.com",
    siteName: "Miravalles CR",
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=65",
        width: 1600,
        height: 900,
        alt: "Paisaje natural de montaña y bosque tropical"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Miravalles CR | Guia Regional y Plataforma Turistica",
    description:
      "Explora atractivos, negocios locales, termales, senderos y ecoturismo en Guanacaste."
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Miravalles CR",
  description:
    "Guia regional y plataforma turistica para descubrir atractivos naturales, experiencias, negocios locales y biodiversidad alrededor del Volcan Miravalles.",
  url: "https://miravallescr.com",
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
      name: "Aguas termales de Miravalles"
    },
    {
      "@type": "TouristAttraction",
      name: "Senderos y rios de Miravalles"
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
