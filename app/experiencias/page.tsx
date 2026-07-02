import type { Metadata } from "next";
import { ExperiencesSection } from "@/components/ExperiencesSection";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";
import { PageViewTracker } from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "Experiencias",
  description: "Caminatas ecológicas, termales, observación de aves y senderismo en el corredor volcánico del norte de Costa Rica."
};

export default async function ExperiencesPage() {
  const siteData = await getSiteData();

  return (
    <>
    <PageViewTracker targetType="category" targetId="experiencias" targetCategory="Experiencias" />
    <SimplePage
      eyebrow="Experiencias"
      title="Actividades para viajar con intención"
      description="Si buscas naturaleza, bienestar y aventura responsable, estas en el lugar correcto."
    >
      <NarrativeBlock
        title="El viaje aquí se vive despacio"
        stories={[
          {
            title: "El viaje aquí se vive despacio",
            content: (
              <>
                <p>
                  Esta región no se descubre corriendo de un punto a otro. Se entiende en la caminata fresca de la mañana, en el vapor que sube de la tierra, en una conversación con un guía local y en el descanso después de una ruta entre bosque y agua.
                </p>
                <p>
                  Las experiencias de Raíz Volcánica conectan al visitante con el norte de Costa Rica desde lo esencial: naturaleza, bienestar, aventura responsable y contacto directo con las comunidades que conocen el territorio.
                </p>
              </>
            )
          },
          {
            title: "Miravalles, Tenorio y Rincón de la Vieja en una misma ruta",
            content: (
              <>
                <p>
                  Entre el Volcán Miravalles, el Volcán Tenorio y Rincón de la Vieja, el viaje puede cambiar de ritmo varias veces en un mismo día: senderos, termales, cataratas, miradores, bosque seco, bosque húmedo y caminos rurales.
                </p>
                <p>
                  Esa diversidad permite combinar experiencias para distintos intereses: caminatas ecológicas, observación de aves, fotografía, turismo rural, visitas familiares y pausas de descanso cerca de aguas termales.
                </p>
              </>
            )
          },
          {
            title: "Experiencias cerca de Bijagua y Dos Ríos de Upala",
            content: (
              <>
                <p>
                  Bijagua y Dos Ríos de Upala son puntos importantes para entender la conexión entre Guanacaste, Alajuela y la zona norte. Desde ahí se abren rutas hacia Río Celeste, Miravalles, fincas, ríos, cataratas y comunidades rurales.
                </p>
                <p>
                  Viajar por esta zona con guías, negocios y anfitriones locales ayuda a que la visita deje más valor en la región y a que cada experiencia tenga contexto, seguridad y sentido de lugar.
                </p>
              </>
            )
          }
        ]}
      />
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <ExperiencesSection
          experiences={siteData.experiences}
          experienceCategories={siteData.experienceCategories}
          showHeading={false}
          showFilters
        />
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="experiences" />
      </div>
    </SimplePage>
    </>
  );
}
