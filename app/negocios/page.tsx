import type { Metadata } from "next";
import { BusinessDirectory } from "@/components/BusinessDirectory";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { PromoSlot } from "@/components/PromoSlot";
import { SimplePage } from "@/components/SimplePage";
import { SponsorSection } from "@/components/SponsorSection";
import { getSiteData } from "@/lib/site-api";
import { PageViewTracker } from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "Negocios locales",
  description:
    "Directorio de hospedajes, restaurantes, guías, termales, transporte, artesanos y productores locales de Miravalles."
};

export default async function BusinessesPage() {
  const siteData = await getSiteData();

  return (
    <>
    <PageViewTracker targetType="category" targetId="negocios" targetCategory="Negocios locales" />
    <SimplePage
      eyebrow="Negocios locales"
      title="Directorio turístico de Miravalles"
      description="Te ayudamos a encontrar lo que necesitas, ya sea donde comer o hospedarte, incluso quien te lleve a tu destino."
    >
      <NarrativeBlock title="La experiencia también vive en los negocios locales">
        <p>
          Un destino se recuerda por sus paisajes, pero también por la comida después del camino, el hospedaje donde se descansa, la persona que recomienda una ruta y el emprendimiento que abre sus puertas con identidad propia.
        </p>
        <p>
          Este directorio busca ordenar esa red local para que el visitante encuentre servicios útiles y para que los emprendimientos de Miravalles ganen visibilidad dentro de una plataforma turística regional.
        </p>
      </NarrativeBlock>
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <BusinessDirectory businesses={siteData.businesses} businessCategories={siteData.businessCategories} showHeading={false} showFilters />
        <PromoSlot placement="business-directory" businesses={siteData.businesses} />
        <SponsorSection sponsors={siteData.sponsors} compact />
      </div>
    </SimplePage>
    </>
  );
}
