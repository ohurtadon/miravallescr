import type { Metadata } from "next";
import { ExperiencesSection } from "@/components/ExperiencesSection";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Experiencias",
  description: "Caminatas ecológicas, termales, observación de aves y senderismo en Miravalles."
};

export default async function ExperiencesPage() {
  const siteData = await getSiteData();

  return (
    <SimplePage
      eyebrow="Experiencias"
      title="Actividades para viajar con intención"
      description="Si buscas naturaleza, bienestar y aventura responsable, estas en el lugar correcto."
    >
      <NarrativeBlock title="El viaje aquí se vive despacio">
        <p>
          Miravalles no se descubre corriendo de un punto a otro. Se entiende en la caminata fresca de la mañana, en el vapor que sube de la tierra, en una conversación con un guía local y en el descanso después de una ruta entre bosque y agua.
        </p>
        <p>
          Estas experiencias están pensadas como puertas de entrada: algunas invitan a moverse, otras a bajar el ritmo, pero todas buscan conectar al visitante con la naturaleza y con quienes conocen el territorio desde adentro.
        </p>
      </NarrativeBlock>
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <ExperiencesSection
          experiences={siteData.experiences}
          experienceCategories={siteData.experienceCategories}
          showHeading={false}
          showFilters
        />
      </div>
    </SimplePage>
  );
}
