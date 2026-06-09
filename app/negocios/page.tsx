import type { Metadata } from "next";
import { BusinessDirectory } from "@/components/BusinessDirectory";
import { PromoSlot } from "@/components/PromoSlot";
import { SimplePage } from "@/components/SimplePage";
import { SponsorSection } from "@/components/SponsorSection";

export const metadata: Metadata = {
  title: "Negocios locales",
  description:
    "Directorio de hospedajes, restaurantes, guías, termales, transporte, artesanos y productores locales de Miravalles."
};

export default function BusinessesPage() {
  return (
    <SimplePage
      eyebrow="Negocios locales"
      title="Directorio turístico de Miravalles"
      description="Una estructura inicial para conectar visitantes con servicios locales y preparar futuras alianzas comerciales de forma elegante."
    >
      <div className="-mx-5 -my-16 md:-mx-8 md:-my-20">
        <BusinessDirectory showHeading={false} showFilters />
        <PromoSlot index={2} />
        <SponsorSection compact />
      </div>
    </SimplePage>
  );
}
