import type { Metadata } from "next";
import { AboutUsCanvasPage } from "@/components/AboutUsCanvasPage";
import { getSiteData, withWhatsAppMessage } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre nosotros",
  description: "Conozca el proyecto Raíz Volcánica, sus pilares, fundadores y planes de afiliación para negocios locales.",
  path: "/sobre-nosotros",
  image: "/images/volcan-miravalles-arcoiris-guanacaste.webp"
});

export default async function AboutUsPage() {
  const { contact } = await getSiteData();
  const whatsappHref = withWhatsAppMessage(
    contact.whatsapp,
    "Hola, estoy interesado en conocer las tarifas de Raíz Volcánica."
  );

  return <AboutUsCanvasPage contactEmail={contact.email} whatsappHref={whatsappHref} />;
}
