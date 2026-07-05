import type { Metadata } from "next";
import { AttractionsGrid } from "@/components/AttractionsGrid";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";
import { PageViewTracker } from "@/components/PageViewTracker";

export const metadata: Metadata = buildPageMetadata({
  title: "Atractivos turísticos",
  description: "Explora ríos, termales, senderos, miradores y rutas naturales del corredor volcánico del norte de Costa Rica.",
  path: "/atractivos"
});

export default async function AttractionsPage() {
  const siteData = await getSiteData();

  return (
    <>
    <PageViewTracker targetType="category" targetId="atractivos" targetCategory="Atractivos" />
    <SimplePage
      eyebrow="Atractivos"
      title="Naturaleza, agua y paisaje volcánico"
      description="Puntos de interés para descubrir la región con rutas de baja huella y mucho valor escénico."
    >
      <NarrativeBlock
        title="Un volcán que todavía conversa con el agua"
        stories={[
          {
            title: "Un volcán que todavía conversa con el agua",
            content: (
              <>
                <p>
                  Mucho antes de que estos volcanes fueran rutas para visitantes, ya habían moldeado el paisaje con calor, roca y agua subterránea. Esa memoria geológica sigue apareciendo en fumarolas, barros calientes, nacientes minerales y aguas termales.
                </p>
                <p>
                  Caminar por esta zona es notar cómo la tierra sigue respirando: en el vapor, en las nacientes tibias, en los barros minerales y en ese contraste entre bosque fresco y energía profunda.
                </p>
              </>
            )
          },
          {
            title: "De paisaje volcánico a energía limpia",
            content: (
              <>
                <p>
                  A finales de los años setenta, el ICE empezó a estudiar y desarrollar el potencial geotérmico de la zona. Desde entonces, el paisaje volcánico no solo se mira como montaña: también se entiende como una fuente viva de energía limpia.
                </p>
                <p>
                  Esa historia suma otra capa al viaje: aquí conviven turismo, ciencia, comunidad rural y una forma muy costarricense de transformar el calor del volcán en desarrollo.
                </p>
              </>
            )
          },
          {
            title: "Rincón de la Vieja y la fuerza visible del volcán",
            content: (
              <>
                <p>
                  En Rincón de la Vieja, la energía volcánica aparece de forma directa: fumarolas, vapores, barros calientes, nacientes y senderos donde el suelo recuerda que la montaña sigue activa bajo los pies.
                </p>
                <p>
                  Sus atractivos combinan aventura y lectura del paisaje. Caminar por esta zona es ver cómo el bosque seco, las quebradas y los puntos geotérmicos forman una experiencia distinta, más áspera, luminosa y profundamente volcánica.
                </p>
              </>
            )
          },
          {
            title: "Tenorio, Río Celeste y el agua como destino",
            content: (
              <>
                <p>
                  Hacia el Volcán Tenorio, el agua se vuelve protagonista. Río Celeste, sus senderos húmedos, cataratas, pozas y bosques cercanos muestran una versión más fresca y misteriosa del corredor natural.
                </p>
                <p>
                  Aquí el atractivo no está solo en llegar a un punto famoso, sino en el cambio de ambiente: la temperatura baja, el bosque se cierra, los sonidos se multiplican y el viaje empieza a sentirse más pausado.
                </p>
              </>
            )
          },
          {
            title: "Un corredor de rutas, comunidades y termales",
            content: (
              <>
                <p>
                  Entre Miravalles, Tenorio y Rincón de la Vieja, los atractivos no funcionan como islas. Se conectan por caminos rurales, miradores, termales, cataratas, restaurantes, fincas y comunidades que dan sentido al recorrido.
                </p>
                <p>
                  Planificar la visita como un corredor permite viajar mejor: combinar descanso y caminata, detenerse en negocios locales, elegir rutas de baja huella y entender que cada parada suma una parte distinta de la región.
                </p>
              </>
            )
          }
        ]}
      />
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <AttractionsGrid attractions={siteData.attractions} showHeading={false} />
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="attractions" />
      </div>
    </SimplePage>
    </>
  );
}
