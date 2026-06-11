import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { WildlifeSection } from "@/components/WildlifeSection";
import { getSiteData } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Flora y fauna",
  description: "Conoce especies de fauna, flora tropical y bosque nuboso de Miravalles."
};

export default async function FloraFaunaPage() {
  const { wildlife } = await getSiteData();

  return (
    <SimplePage
      eyebrow="Flora y fauna"
      title="Un corredor de vida tropical"
      description="Miravalles reúne especies emblemáticas y paisajes vegetales que sostienen la experiencia ecológica del destino."
    >
      <div className="-mx-5 -my-16 md:-mx-8 md:-my-20">
        <WildlifeSection wildlife={wildlife} />
      </div>
    </SimplePage>
  );
}
