import type { Metadata } from "next";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { SpeciesDirectory } from "@/components/SpeciesDirectory";
import { getSiteData } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Flora",
  description: "Guanacaste, helechos, orquídeas y bosque nuboso en el corredor volcánico del norte de Costa Rica.",
  path: "/flora-fauna/flora"
});

export default async function FloraPage() {
  const { species } = await getSiteData();

  return (
    <SimplePage
      eyebrow="Flora"
      title="Verde que cuenta la historia del territorio"
      description="Una guía para reconocer especies vegetales, zonas de bosque y valor ecológico de la región."
    >
      <NarrativeBlock title="Cada planta sostiene una parte del paisaje">
        <p>
          La flora de la región no es solo fondo verde. Es sombra para los senderos, alimento para aves e insectos, protección para nacientes y una señal visible de cómo cambian la altura, la humedad y el uso de la tierra.
        </p>
        <p>
          Documentar estas especies ayuda a mirar con más atención: reconocer árboles, helechos, flores y zonas de bosque convierte una caminata sencilla en una lectura viva del territorio.
        </p>
      </NarrativeBlock>
      <div className="mt-10">
        <SpeciesDirectory species={species} type="flora" />
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="flora" />
      </div>
    </SimplePage>
  );
}
