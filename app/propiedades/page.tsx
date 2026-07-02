import type { Metadata } from "next";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { PropertiesSection } from "@/components/PropertiesSection";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";
import { PageViewTracker } from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "Propiedades",
  description:
    "Propiedades en venta y alquiler en la región: casas, fincas, lotes y comercios para quienes desean vivir o invertir cerca del corredor volcánico."
};

export default async function PropertiesPage() {
  const siteData = await getSiteData();

  return (
    <>
    <PageViewTracker targetType="category" targetId="propiedades" targetCategory="Propiedades" />
    <SimplePage
      eyebrow="Propiedades"
      title="Vivir o invertir en la región"
      description="¿Te gustó la zona, quieres vivir acá? Tenemos ese lugar perfecto para vos."
    >
      <NarrativeBlock
        title="Quedarse también es una forma de conocer"
        stories={[
          {
            title: "Quedarse también es una forma de conocer",
            content: (
              <>
                <p>
                  Hay visitantes que llegan por una caminata, unas termales o una vista al volcán, y terminan preguntándose cómo sería despertar más cerca de este paisaje. La región tiene esa mezcla de calma rural, naturaleza cercana y acceso a servicios que despierta ganas de quedarse.
                </p>
                <p>
                  Esta sección prepara un espacio ordenado para propiedades, fincas y oportunidades vinculadas a vivir, invertir o desarrollar proyectos responsables en la zona.
                </p>
              </>
            )
          },
          {
            title: "Vivir cerca de Miravalles, Bijagua y la zona norte",
            content: (
              <>
                <p>
                  El entorno de Miravalles, Bijagua, Dos Ríos de Upala y el norte de Guanacaste ofrece una combinación difícil de encontrar: montaña, agua, termales, comunidades rurales, rutas turísticas y conexión con servicios cotidianos.
                </p>
                <p>
                  Para algunas personas, una casa, lote o finca en esta región representa descanso. Para otras, puede ser una oportunidad de inversión ligada al turismo rural, al ecoturismo o a proyectos de vida más cercanos a la naturaleza.
                </p>
              </>
            )
          },
          {
            title: "Inversión con sentido de territorio",
            content: (
              <>
                <p>
                  Comprar o alquilar en una zona turística no debería verse solo como una transacción. Aquí importan el acceso, el agua, el paisaje, las comunidades vecinas y la relación entre cada propiedad y el corredor volcánico.
                </p>
                <p>
                  Raíz Volcánica busca mostrar oportunidades con contexto para que quienes miran propiedades entiendan mejor el lugar: su cercanía a volcanes, rutas naturales, negocios locales y atractivos del norte de Costa Rica.
                </p>
              </>
            )
          }
        ]}
      />
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <PropertiesSection
          properties={siteData.properties}
          propertyOperations={siteData.propertyOperations}
          propertyTypes={siteData.propertyTypes}
          showHeading={false}
        />
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="properties" />
      </div>
    </SimplePage>
    </>
  );
}
