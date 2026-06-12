import type { Metadata } from "next";
import { NarrativeBlock } from "@/components/NarrativeBlock";
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
      title="Biodiversidad que marca el carácter de Miravalles"
      description="Bosques, aves, mamíferos y plantas tropicales hacen de la zona un aula viva para visitantes y comunidades."
    >
      <NarrativeBlock
        title="Un corredor vivo entre montaña y llanura"
        stories={[
          {
            title: "Un corredor vivo entre montaña y llanura",
            content: (
              <>
                <p>
                  La biodiversidad de Miravalles aparece en capas: árboles que sostienen sombra y humedad, aves que cruzan entre fincas y bosque, insectos que anuncian la tarde y mamíferos que recuerdan que el territorio sigue siendo casa para muchas especies.
                </p>
                <p>
                  Mirar flora y fauna aquí no es solo marcar nombres en una lista. Es aprender a leer señales del paisaje y viajar con más respeto por los ritmos naturales de la región.
                </p>
              </>
            )
          },
          {
            title: "Cuipilapa y la rana celeste",
            content: (
              <>
                <p>
                  Antes de llamarse Miravalles, el macizo fue asociado con el nombre Cuipilapa, una palabra de origen náhuatl vinculada a la idea de un río de varios colores. Esa imagen todavía calza con una zona donde el agua, el bosque y el suelo volcánico parecen cambiar de tono a cada paso.
                </p>
                <p>
                  Entre los volcanes Tenorio y Miravalles también se descubrió la rana arborícola Tlalocohyla celeste, dada a conocer científicamente en 2022. Su presencia recuerda que la región todavía guarda especies pequeñas, discretas y valiosas que dependen de hábitats húmedos bien conservados.
                </p>
              </>
            )
          },
          {
            title: "Parques nacionales para observar vida silvestre",
            content: (
              <>
                <p>
                  El Parque Nacional Miravalles-Jorge Manuel Dengo protege parte del entorno volcánico de Miravalles, mientras que Río Celeste forma parte del Parque Nacional Volcán Tenorio. Juntos dibujan una ruta natural donde el visitante puede pasar de fumarolas y bosque montano a aguas celestes y senderos húmedos.
                </p>
                <p>
                  En estos paisajes la observación de animales pide paciencia: aves en las copas, rastros en el barro, mariposas en claros de luz y, con suerte, mamíferos que se mueven lejos del ruido. La mejor experiencia ocurre cuando se camina despacio y se respeta la distancia.
                </p>
              </>
            )
          }
        ]}
      />
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <WildlifeSection wildlife={wildlife} showHeading={false} />
      </div>
    </SimplePage>
  );
}
