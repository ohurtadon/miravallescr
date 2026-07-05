import type { Metadata } from "next";
import { GallerySection } from "@/components/GallerySection";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Galería",
  description: "Galería fotográfica del paisaje natural, ecológico y comunitario de la región.",
  path: "/galeria"
});

export default async function GalleryPage() {
  const { gallery } = await getSiteData();

  return (
    <SimplePage
      eyebrow="Galería"
      title="Imágenes para imaginar la visita"
      description="Una mirada visual al paisaje, el agua, los caminos y la vida local de la región."
    >
      <NarrativeBlock
        title="Una primera mirada al carácter del paisaje"
        stories={[
          {
            title: "Una primera mirada al carácter del paisaje",
            content: (
              <>
                <p>
                  La galería funciona como una ventana al territorio: agua, bosque, montaña, caminos rurales y escenas que ayudan a imaginar el tipo de viaje que la región puede ofrecer.
                </p>
                <p>
                  La intención no es mostrar postales perfectas, sino construir memoria visual: imágenes que permitan reconocer lugares, emprendimientos, especies y momentos reales de la experiencia local.
                </p>
              </>
            )
          },
          {
            title: "Imágenes para reconocer Miravalles y sus alrededores",
            content: (
              <>
                <p>
                  Una buena fotografía puede ayudar a ubicar el carácter de Miravalles, Guanacaste, Bijagua y Dos Ríos de Upala: el verde de los caminos, la presencia del volcán, el agua clara, los cielos cambiantes y la vida cotidiana de la zona norte.
                </p>
                <p>
                  Al reunir imágenes del territorio, la galería también mejora la forma en que visitantes y buscadores entienden el destino: no como un punto aislado, sino como una región con identidad natural y comunitaria.
                </p>
              </>
            )
          },
          {
            title: "Del paisaje a la experiencia real",
            content: (
              <>
                <p>
                  Las imágenes deben contar lo que el visitante puede vivir: senderos, termales, ríos, cataratas, flora, fauna, hospedajes, comida local, guías, productores y momentos sencillos que hacen memorable el viaje.
                </p>
                <p>
                  Este recorrido visual muestra el turismo del norte de Costa Rica con contexto, identidad y presencia local.
                </p>
              </>
            )
          }
        ]}
      />
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <GallerySection gallery={gallery} showHeading={false} />
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="gallery" />
      </div>
    </SimplePage>
  );
}
