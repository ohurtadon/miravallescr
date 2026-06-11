import type { Metadata } from "next";
import { ExperiencesSection } from "@/components/ExperiencesSection";
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
      title="Formas de vivir Miravalles"
      description="Actividades iniciales pensadas para visitantes que buscan naturaleza, bienestar y aventura responsable."
    >
      <div className="-mx-5 -my-16 md:-mx-8 md:-my-20">
        <ExperiencesSection experiences={siteData.experiences} experienceCategories={siteData.experienceCategories} showFilters />
      </div>
    </SimplePage>
  );
}
