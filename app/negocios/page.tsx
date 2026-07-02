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
    "Directorio de hospedajes, restaurantes, guías, termales, transporte, artesanos y productores locales de la región."
};

export default async function BusinessesPage() {
  const siteData = await getSiteData();

  return (
    <>
    <PageViewTracker targetType="category" targetId="negocios" targetCategory="Negocios locales" />
    <SimplePage
      eyebrow="Negocios locales"
      title="Directorio turístico regional"
      description="Te ayudamos a encontrar lo que necesitas, ya sea donde comer o hospedarte, incluso quien te lleve a tu destino."
    >
      <NarrativeBlock
        title="La experiencia también vive en los negocios locales"
        stories={[
          {
            title: "La experiencia también vive en los negocios locales",
            content: (
              <>
                <p>
                  Un destino se recuerda por sus paisajes, pero también por la comida después del camino, el hospedaje donde se descansa, la persona que recomienda una ruta y el emprendimiento que abre sus puertas con identidad propia.
                </p>
                <p>
                  Este directorio busca ordenar esa red local para que el visitante encuentre servicios útiles y para que los emprendimientos de Miravalles, Guanacaste y la zona norte ganen visibilidad dentro de una plataforma turística regional.
                </p>
              </>
            )
          },
          {
            title: "Hospedaje, comida y guías para recorrer mejor",
            content: (
              <>
                <p>
                  Cerca del Volcán Miravalles, Bijagua, Dos Ríos de Upala y las rutas hacia Tenorio, los negocios locales cumplen un papel clave: hospedan, alimentan, orientan, transportan y acompañan a quienes llegan a descubrir la región.
                </p>
                <p>
                  Encontrar restaurantes, termales, guías turísticos, productores, artesanos y transporte local en un solo lugar facilita planificar una visita más cómoda y más conectada con la comunidad.
                </p>
              </>
            )
          },
          {
            title: "Comprar local también protege el destino",
            content: (
              <>
                <p>
                  Cuando una persona elige un negocio local, el viaje deja una huella más positiva. Parte del valor se queda en familias, empleos, servicios comunitarios y emprendimientos que sostienen la identidad del territorio.
                </p>
                <p>
                  Por eso, el turismo en Raíz Volcánica no termina en el atractivo natural: también incluye cafés, sodas, hospedajes, fincas, tours y proyectos que hacen posible visitar el norte de Costa Rica con más cercanía.
                </p>
              </>
            )
          }
        ]}
      />
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <BusinessDirectory businesses={siteData.businesses} businessCategories={siteData.businessCategories} showHeading={false} showFilters />
        <PromoSlot placement="business-directory" businesses={siteData.businesses} experiences={siteData.experiences} properties={siteData.properties} />
        <SponsorSection sponsors={siteData.sponsors} compact />
      </div>
    </SimplePage>
    </>
  );
}
