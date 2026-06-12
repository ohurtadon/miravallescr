import type { Metadata } from "next";
import { AttractionsGrid } from "@/components/AttractionsGrid";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Atractivos turísticos",
  description: "Explora ríos, termales, senderos, miradores y rutas naturales de Miravalles."
};

export default async function AttractionsPage() {
  const siteData = await getSiteData();

  return (
    <SimplePage
      eyebrow="Atractivos"
      title="Naturaleza, agua y paisaje volcánico"
      description="Una selección inicial de puntos de interés para descubrir Miravalles con rutas de baja huella y mucho valor escénico."
    >
      <NarrativeBlock
        title="Un volcán que todavía conversa con el agua"
        stories={[
          {
            title: "Un volcán que todavía conversa con el agua",
            content: (
              <>
                <p>
                  Mucho antes de que Miravalles fuera una ruta para visitantes, el volcán ya había moldeado el paisaje con calor, roca y agua subterránea. Su caldera se formó hace cientos de miles de años, y esa memoria geológica sigue apareciendo en fumarolas, barros calientes, nacientes minerales y aguas termales.
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
                  A finales de los años setenta, el ICE empezó a estudiar y desarrollar el potencial geotérmico de la zona. Desde entonces, Miravalles no solo se mira como montaña: también se entiende como una fuente viva de energía limpia.
                </p>
                <p>
                  Esa historia suma otra capa al viaje: aquí conviven turismo, ciencia, comunidad rural y una forma muy costarricense de transformar el calor del volcán en desarrollo.
                </p>
              </>
            )
          }
        ]}
      />
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <AttractionsGrid attractions={siteData.attractions} showHeading={false} />
      </div>
    </SimplePage>
  );
}
