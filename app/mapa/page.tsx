import type { Metadata } from "next";
import { MapSection } from "@/components/MapSection";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { RecommendedSlot } from "@/components/RecommendedSlot";
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
      <NarrativeBlock title="La ruta empieza antes de salir">
        <p>
          En Miravalles, las distancias no se miden solo en kilómetros. También importan el clima, el estado del camino, la hora de salida, el tiempo para detenerse y la cercanía entre una poza, un mirador, una comida local o una experiencia guiada.
        </p>
        <p>
          Este mapa ayuda a imaginar el territorio como una ruta posible: una manera sencilla de ordenar el viaje y descubrir cómo cada punto se conecta con el volcán, las comunidades y el paisaje.
        </p>
      </NarrativeBlock>
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <MapSection mapPoints={mapPoints} showHeading={false} />
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="map" />
      </div>
    </SimplePage>
  );
}
