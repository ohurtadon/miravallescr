import type { Metadata } from "next";
import { BusinessDirectory } from "@/components/BusinessDirectory";
import { PromoSlot } from "@/components/PromoSlot";
import { SimplePage } from "@/components/SimplePage";
import { SponsorSection } from "@/components/SponsorSection";
import { getSiteData } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Negocios locales",
  description:
    "Directorio de hospedajes, restaurantes, guías, termales, transporte, artesanos y productores locales de Miravalles."
};

export default async function BusinessesPage() {
  const siteData = await getSiteData();

  return (
    <SimplePage
      eyebrow="Negocios locales"
      title="Directorio turístico de Miravalles"
      description="Una estructura inicial para conectar visitantes con servicios locales y preparar futuras alianzas comerciales de forma elegante."
    >
      <div className="-mx-5 -my-16 md:-mx-8 md:-my-20">
        <BusinessDirectory businesses={siteData.businesses} businessCategories={siteData.businessCategories} showHeading={false} showFilters />
        <PromoSlot promoSlots={siteData.promoSlots} index={2} />
        <SponsorSection sponsors={siteData.sponsors} compact />
      </div>
    </SimplePage>
  );
}
