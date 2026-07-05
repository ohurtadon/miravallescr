import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de privacidad",
  description: "Información básica sobre el uso de datos de contacto, enlaces externos, cookies y analítica en Raíz Volcánica.",
  path: "/politica-de-privacidad"
});

const sections = [
  {
    title: "Datos que podemos recibir",
    items: [
      "Datos de contacto que usted decida enviar por WhatsApp, correo electrónico o formularios externos vinculados desde el sitio.",
      "Información técnica básica de navegación, como páginas visitadas, origen de la visita, dispositivo, navegador y fecha aproximada de acceso.",
      "Datos publicados por negocios, propiedades, experiencias o aliados cuando solicitan aparecer en la plataforma."
    ]
  },
  {
    title: "Cómo usamos esa información",
    items: [
      "Responder consultas de visitantes, negocios locales, operadores, propietarios y aliados.",
      "Dar seguimiento a solicitudes comerciales o de publicación dentro de Raíz Volcánica.",
      "Mejorar el contenido, navegación, seguridad y rendimiento del sitio."
    ]
  },
  {
    title: "WhatsApp y enlaces externos",
    items: [
      "Al usar botones de WhatsApp, redes sociales, mapas o sitios externos, la interacción ocurre bajo las políticas de esas plataformas.",
      "Raíz Volcánica no controla las prácticas de privacidad de servicios externos enlazados desde el sitio."
    ]
  },
  {
    title: "Cookies y preferencias",
    items: [
      "El sitio puede guardar preferencias básicas, como idioma, para mejorar la experiencia de navegación.",
      "También puede usarse medición agregada para entender qué secciones del sitio funcionan mejor."
    ]
  },
  {
    title: "Contacto",
    items: [
      "Para consultas sobre privacidad, actualización o retiro de información publicada, puede contactarnos desde la página de contacto."
    ]
  }
];

export default function PrivacyPolicyPage() {
  return (
    <SimplePage
      eyebrow="Privacidad"
      title="Política de privacidad"
      description="Esta página resume cómo Raíz Volcánica maneja información básica relacionada con consultas, enlaces externos, preferencias y contenido publicado."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title} className="rounded-lg bg-white p-7 ring-1 ring-canopy/10">
            <h2 className="font-display text-3xl font-bold text-canopy">{section.title}</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-volcanic">
              {section.items.map((item) => (
                <li key={item} className="rounded-md bg-mist px-4 py-3">{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SimplePage>
  );
}
