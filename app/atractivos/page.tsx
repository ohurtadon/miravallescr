import type { Metadata } from "next";
import { AttractionsGrid } from "@/components/AttractionsGrid";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Atractivos turísticos",
  description: "Explora ríos, termales, senderos, miradores y rutas naturales de Miravalles."
};

export default function AttractionsPage() {
  return (
    <SimplePage
      eyebrow="Atractivos"
      title="Naturaleza, agua y paisaje volcánico"
      description="Una selección inicial de puntos de interés para descubrir Miravalles con rutas de baja huella y mucho valor escénico."
    >
      <div className="-mx-5 -my-16 md:-mx-8 md:-my-20">
        <AttractionsGrid />
      </div>
    </SimplePage>
  );
}
