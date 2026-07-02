import type { Metadata } from "next";
import { MapSection } from "@/components/MapSection";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Mapa",
  description: "Mapa interactivo de ríos, termales, cataratas, miradores y senderos del corredor volcánico del norte de Costa Rica."
};

export default async function MapPage() {
  const { mapPoints } = await getSiteData();

  return (
    <SimplePage
      eyebrow="Mapa"
      title="Puntos de interés para planificar la ruta"
      description="Ubica atractivos por categoría y construye una visita equilibrada entre aventura, relajación y gastronomía."
    >
      <NarrativeBlock
        title="La ruta empieza antes de salir"
        stories={[
          {
            title: "La ruta empieza antes de salir",
            content: (
              <>
                <p>
                  En la región, las distancias no se miden solo en kilómetros. También importan el clima, el estado del camino, la hora de salida, el tiempo para detenerse y la cercanía entre una poza, un mirador, una comida local o una experiencia guiada.
                </p>
                <p>
                  Este mapa ayuda a imaginar el territorio como una ruta posible: una manera sencilla de ordenar el viaje y descubrir cómo cada punto se conecta con el volcán, las comunidades y el paisaje.
                </p>
              </>
            )
          },
          {
            title: "Un mapa para conectar volcanes y comunidades",
            content: (
              <>
                <p>
                  Miravalles, Tenorio y Rincón de la Vieja no son solo nombres en una lista de volcanes. En el mapa forman una red de caminos, ríos, termales, cataratas, miradores y comunidades que ayudan a entender el norte de Costa Rica.
                </p>
                <p>
                  Ubicar Bijagua, Dos Ríos de Upala, Guanacaste y los puntos de interés cercanos permite planificar mejor: saber qué visitar primero, dónde detenerse y cómo combinar naturaleza con servicios locales.
                </p>
              </>
            )
          },
          {
            title: "Planificar con más contexto y menos prisa",
            content: (
              <>
                <p>
                  Un buen recorrido no siempre es el que suma más paradas, sino el que permite disfrutar cada lugar con tiempo suficiente. En caminos rurales, una ruta corta puede incluir paisaje, clima cambiante, conversación y descubrimientos inesperados.
                </p>
                <p>
                  Por eso el mapa funciona como una herramienta de viaje responsable: ayuda a distribuir visitas, reconocer distancias, elegir experiencias cercanas y apoyar negocios locales sin perder el sentido del territorio.
                </p>
              </>
            )
          }
        ]}
      />
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <MapSection mapPoints={mapPoints} showHeading={false} />
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="map" />
      </div>
    </SimplePage>
  );
}
