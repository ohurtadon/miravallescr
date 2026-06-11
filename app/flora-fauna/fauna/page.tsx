import type { Metadata } from "next";
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
      <SpeciesDirectory species={species} type="fauna" />
    </SimplePage>
  );
}
