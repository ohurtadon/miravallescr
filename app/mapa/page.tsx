import type { Metadata } from "next";
import { MapSection } from "@/components/MapSection";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Mapa",
  description: "Mapa interactivo de ríos, termales, cataratas, miradores y senderos de Miravalles."
};

export default async function MapPage() {
  const { mapPoints } = await getSiteData();

  return (
    <SimplePage
      eyebrow="Mapa"
      title="Puntos de interés para planificar la ruta"
      description="Ubica atractivos por categoría y construye una visita equilibrada entre aventura, relajación y gastronomía."
    >
      <div className="-mx-5 -my-16 md:-mx-8 md:-my-20">
        <MapSection mapPoints={mapPoints} />
      </div>
    </SimplePage>
  );
}
