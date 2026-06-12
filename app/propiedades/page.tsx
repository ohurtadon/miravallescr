import type { Metadata } from "next";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { PropertiesSection } from "@/components/PropertiesSection";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Propiedades",
  description:
    "Propiedades en venta y alquiler en Miravalles: casas, fincas, lotes y comercios para quienes desean vivir o invertir en la zona."
};

export default async function PropertiesPage() {
  const siteData = await getSiteData();

  return (
    <SimplePage
      eyebrow="Propiedades"
      title="Vivir o invertir en Miravalles"
      description="¿Te gustó la zona, quieres vivir acá? Tenemos ese lugar perfecto para vos."
    >
      <NarrativeBlock title="Quedarse también es una forma de conocer">
        <p>
          Hay visitantes que llegan por una caminata, unas termales o una vista al volcán, y terminan preguntándose cómo sería despertar más cerca de este paisaje. Miravalles tiene esa mezcla de calma rural, naturaleza cercana y acceso a servicios que despierta ganas de quedarse.
        </p>
        <p>
          Esta sección prepara un espacio ordenado para propiedades, fincas y oportunidades vinculadas a vivir, invertir o desarrollar proyectos responsables en la zona.
        </p>
      </NarrativeBlock>
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <PropertiesSection
          properties={siteData.properties}
          propertyOperations={siteData.propertyOperations}
          propertyTypes={siteData.propertyTypes}
          showHeading={false}
        />
      </div>
    </SimplePage>
  );
}
