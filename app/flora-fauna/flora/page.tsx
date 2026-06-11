import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { SpeciesDirectory } from "@/components/SpeciesDirectory";
import { getSiteData } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Flora",
  description: "Guanacaste, helechos, orquídeas y bosque nuboso en Miravalles."
};

export default async function FloraPage() {
  const { species } = await getSiteData();

  return (
    <SimplePage
      eyebrow="Flora"
      title="Verde que cuenta la historia del territorio"
      description="Una base para documentar especies vegetales, zonas de bosque y valor ecológico de la región."
    >
      <SpeciesDirectory species={species} type="flora" />
    </SimplePage>
  );
}
