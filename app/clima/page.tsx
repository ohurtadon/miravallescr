import type { Metadata } from "next";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Clima",
  description: "Guía general del clima durante el año en el corredor volcánico del norte de Costa Rica."
};

export default function WeatherPage() {
  return (
    <SimplePage
      eyebrow="Clima"
      title="Clima de montaña, bosque y llanura"
      description="Una guía general para entender cómo cambia el tiempo durante el año en el corredor volcánico del norte de Costa Rica."
    >
      <NarrativeBlock title="Un clima que cambia con la altura y el volcán">
        <p>
          La región combina llanuras cálidas, caminos rurales, zonas termales, bosques húmedos y sectores de montaña. Por eso el clima puede cambiar bastante en distancias cortas: una mañana soleada cerca de comunidades bajas puede sentirse fresca y nublada al acercarse a Tenorio, Miravalles o Rincón de la Vieja.
        </p>
        <p>
          En general, la época más seca se concentra entre diciembre y abril, con días más despejados, mejores condiciones para miradores y caminos más estables. La época lluviosa suele ir de mayo a noviembre; trae paisajes más verdes, ríos con más fuerza y tardes de lluvia, especialmente en áreas boscosas y de mayor elevación.
        </p>
        <p>
          Las zonas más frescas suelen estar hacia las partes altas, senderos de bosque, alrededores de Río Celeste y sectores montañosos cercanos a los volcanes. Las áreas más cálidas aparecen en comunidades bajas, rutas abiertas y zonas con menor cobertura boscosa. Rincón de la Vieja puede sentirse más seco y soleado en algunos sectores, mientras que Tenorio tiende a ofrecer ambientes más húmedos y frescos.
        </p>
        <p>
          Para viajar cómodo conviene salir temprano, llevar capa ligera para lluvia, zapatos con buen agarre y una muda seca si se visitan cataratas, termales o senderos. El mejor plan es pensar el clima como parte de la experiencia: luz limpia por la mañana, nubes sobre la montaña, lluvia que refresca el bosque y atardeceres que cambian rápido.
        </p>
      </NarrativeBlock>
    </SimplePage>
  );
}
