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
    default: "Miravalles Guanacaste | Naturaleza, Termales y Aventura",
    template: "%s | Miravalles Guanacaste"
  },
  description:
    "Descubre Miravalles en Guanacaste, Costa Rica. Explora ríos, senderos, biodiversidad, aguas termales y experiencias únicas de ecoturismo.",
  openGraph: {
    title: "Miravalles Guanacaste | Naturaleza, Termales y Aventura",
    description:
      "Bosques, ríos, aguas termales y biodiversidad en las faldas del Volcán Miravalles.",
    url: "https://miravallescr.com",
    siteName: "Miravalles Guanacaste",
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "Paisaje natural de montaña y bosque tropical"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Miravalles Guanacaste | Naturaleza, Termales y Aventura",
    description:
      "Explora ríos, senderos, biodiversidad, aguas termales y ecoturismo en Guanacaste."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
