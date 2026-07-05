import type { Metadata } from "next";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { WildlifeSection } from "@/components/WildlifeSection";
import { getSiteData } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Flora y fauna",
  description: "Conoce especies de fauna, flora tropical y bosque nuboso del corredor volcánico del norte de Costa Rica.",
  path: "/flora-fauna"
});

export default async function FloraFaunaPage() {
  const { wildlife } = await getSiteData();

  return (
    <SimplePage
      eyebrow="Flora y fauna"
      title="La biodiversidad que da vida a este territorio volcánico"
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
                  La biodiversidad de este territorio aparece en capas: árboles que sostienen sombra y humedad, aves que cruzan entre fincas y bosque, insectos que anuncian la tarde y mamíferos que recuerdan que la región sigue siendo casa para muchas especies.
                </p>
                <p>
                  Mirar flora y fauna aquí no es solo marcar nombres en una lista. Es aprender a leer señales del paisaje y viajar con más respeto por los ritmos naturales de la región.
                </p>
              </>
            )
          },
          {
            title: "Nombres antiguos, agua y especies únicas",
            content: (
              <>
                <p>
                  En este territorio, los nombres antiguos, los ríos de colores, el bosque húmedo y el suelo volcánico cuentan una historia que cambia de tono a cada paso.
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
                  El Parque Nacional Miravalles-Jorge Manuel Dengo protege parte del entorno volcánico, mientras que Río Celeste forma parte del Parque Nacional Volcán Tenorio. Juntos dibujan una ruta natural donde el visitante puede pasar de fumarolas y bosque montano a aguas celestes y senderos húmedos.
                </p>
                <p>
                  En estos paisajes la observación de animales pide paciencia: aves en las copas, rastros en el barro, mariposas en claros de luz y, con suerte, mamíferos que se mueven lejos del ruido. La mejor experiencia ocurre cuando se camina despacio y se respeta la distancia.
                </p>
              </>
            )
          },
          {
            title: "Rincón de la Vieja: calor, bosque y transición",
            content: (
              <>
                <p>
                  Hacia Rincón de la Vieja, el paisaje muestra otra cara del territorio volcánico: suelos calientes, fumarolas, quebradas, bosque seco, zonas húmedas y senderos donde la vegetación cambia con la altura y la exposición al viento.
                </p>
                <p>
                  Esa mezcla crea refugios distintos para aves, mamíferos pequeños, reptiles, insectos y plantas resistentes. Visitarlo ayuda a entender que la biodiversidad regional no vive en un solo tipo de bosque, sino en la transición entre muchos ambientes.
                </p>
              </>
            )
          },
          {
            title: "Corredores que conectan fincas, ríos y montaña",
            content: (
              <>
                <p>
                  Entre Miravalles, Tenorio y Rincón de la Vieja, la vida silvestre depende también de los espacios intermedios: cercas vivas, riberas, parches de bosque, cafetales, potreros arbolados y caminos rurales que todavía guardan sombra.
                </p>
                <p>
                  Estos corredores permiten que las especies se muevan, encuentren alimento y mantengan ciclos naturales. Por eso, la conservación no ocurre solo dentro de los parques: también se construye en las decisiones cotidianas de las comunidades.
                </p>
              </>
            )
          },
          {
            title: "Agua que sostiene la vida del norte",
            content: (
              <>
                <p>
                  Ríos, nacientes, cataratas, humedales pequeños y quebradas frescas enlazan el territorio como una red viva. Donde aparece el agua, cambian los sonidos: llegan aves, anfibios, insectos, helechos y árboles que necesitan humedad constante.
                </p>
                <p>
                  Cuidar esas fuentes es cuidar la experiencia completa del visitante y la vida diaria de la región. El agua no solo embellece el paisaje: sostiene bosques, cultivos, comunidades y muchas especies que rara vez se dejan ver a simple vista.
                </p>
              </>
            )
          }
        ]}
      />
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <WildlifeSection wildlife={wildlife} showHeading={false} />
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="wildlife" />
      </div>
    </SimplePage>
  );
}
