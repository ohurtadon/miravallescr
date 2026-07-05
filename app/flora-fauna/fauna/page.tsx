import type { Metadata } from "next";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { SpeciesDirectory } from "@/components/SpeciesDirectory";
import { getSiteData } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Fauna",
  description: "Perezosos, tucanes, monos congo, mariposas y reptiles del corredor volcánico del norte de Costa Rica.",
  path: "/flora-fauna/fauna"
});

export default async function FaunaPage() {
  const { species } = await getSiteData();

  return (
    <SimplePage
      eyebrow="Fauna"
      title="Encuentros silvestres para observar con respeto"
      description="Una guía para ordenar avistamientos, especies emblemáticas y recomendaciones de conservación."
    >
      <NarrativeBlock title="La fauna aparece cuando el visitante baja el ritmo">
        <p>
          En la región, muchos encuentros silvestres no ocurren por casualidad, sino por paciencia: escuchar antes de avanzar, mirar hacia las copas, respetar distancia y entender que cada especie tiene su propio horario.
        </p>
        <p>
          Esta guía busca promover una observación responsable, donde ver un ave, un mono o una mariposa sea también una invitación a cuidar el bosque que los mantiene cerca.
        </p>
      </NarrativeBlock>
      <div className="mt-10">
        <SpeciesDirectory species={species} type="fauna" />
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="fauna" />
      </div>
    </SimplePage>
  );
}
