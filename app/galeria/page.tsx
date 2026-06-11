import type { Metadata } from "next";
import { GallerySection } from "@/components/GallerySection";
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
      <div className="-mx-5 -my-16 md:-mx-8 md:-my-20">
        <GallerySection gallery={gallery} />
      </div>
    </SimplePage>
  );
}
