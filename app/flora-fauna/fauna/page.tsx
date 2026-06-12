import type { Metadata } from "next";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { SimplePage } from "@/components/SimplePage";
import { SpeciesDirectory } from "@/components/SpeciesDirectory";
import { getSiteData } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Fauna",
  description: "Perezosos, tucanes, monos congo, mariposas y reptiles de Miravalles."
};

export default async function FaunaPage() {
  const { species } = await getSiteData();

  return (
    <SimplePage
      eyebrow="Fauna"
      title="Encuentros silvestres para observar con respeto"
      description="Una guía inicial para ordenar avistamientos, especies emblemáticas y recomendaciones de conservación."
    >
      <NarrativeBlock title="La fauna aparece cuando el visitante baja el ritmo">
        <p>
          En Miravalles, muchos encuentros silvestres no ocurren por casualidad, sino por paciencia: escuchar antes de avanzar, mirar hacia las copas, respetar distancia y entender que cada especie tiene su propio horario.
        </p>
        <p>
          Esta guía busca promover una observación responsable, donde ver un ave, un mono o una mariposa sea también una invitación a cuidar el bosque que los mantiene cerca.
        </p>
      </NarrativeBlock>
      <div className="mt-10">
        <SpeciesDirectory species={species} type="fauna" />
      </div>
    </SimplePage>
  );
}
