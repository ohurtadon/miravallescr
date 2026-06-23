import type { Metadata } from "next";
import { GallerySection } from "@/components/GallerySection";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Galería",
  description: "Galería fotográfica referencial del paisaje natural y ecológico de Miravalles."
};

export default async function GalleryPage() {
  const { gallery } = await getSiteData();

  return (
    <SimplePage
      eyebrow="Galería"
      title="Imágenes para imaginar la visita"
      description="Banco visual temporal con fotografías referenciales hasta incorporar material real de la zona."
    >
      <NarrativeBlock title="Una primera mirada al carácter del paisaje">
        <p>
          La galería funciona como una ventana inicial: agua, bosque, montaña, caminos rurales y escenas que ayudan a imaginar el tipo de viaje que Miravalles puede ofrecer. Pronto este espacio deberá llenarse con fotografías propias de la zona.
        </p>
        <p>
          La intención no es mostrar postales perfectas, sino construir memoria visual: imágenes que permitan reconocer lugares, emprendimientos, especies y momentos reales de la experiencia local.
        </p>
      </NarrativeBlock>
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <GallerySection gallery={gallery} showHeading={false} />
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="gallery" />
      </div>
    </SimplePage>
  );
}
