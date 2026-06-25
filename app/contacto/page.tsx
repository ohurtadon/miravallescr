import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData, withWhatsAppMessage } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Información de contacto para planificar una visita, registrar negocios o crear alianzas en la región."
};

const contactTopics = [
  "Orientación para visitantes",
  "Registrar negocio",
  "Patrocinios",
  "Promocionar experiencia",
  "Contenido regional"
];

export default async function ContactPage() {
  const { contact } = await getSiteData();
  const whatsappHref = withWhatsAppMessage(
    contact.whatsapp,
    "Hola, te descubrí en Raíz Volcanica y quiero recibir más información para visitar la región."
  );

  return (
    <SimplePage
      eyebrow="Contacto"
      title="Planifica tu visita o alianza"
      description="Un mismo punto de contacto para visitantes, negocios locales, operadores, patrocinadores y personas que quieran sumar valor a la región."
    >
      <NarrativeBlock title="La mejor ruta empieza con una buena pregunta">
        <p>
          Cada visita a la región puede ser distinta: algunas personas buscan termales y descanso, otras quieren caminar, observar aves, encontrar un guía o ubicar un negocio local antes de salir. También apoyamos a turistas con consultas para orientar mejor su recorrido.
        </p>
      </NarrativeBlock>
      <section id="alianzas" className="mt-10">
        <div className="rounded-lg bg-forest p-8 text-white">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sand">Consultas y alianzas</p>
              <h2 className="mt-3 font-display text-4xl font-bold">Escríbanos y le orientamos</h2>
              <p className="mt-4 max-w-2xl text-white/78">
                Atendemos consultas de viaje, recomendaciones para visitar la zona y propuestas de negocios, tours, hospedajes, patrocinios o contenido regional.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {contactTopics.map((topic) => (
                <span key={topic} className="rounded-md bg-white/10 px-3 py-2 text-xs font-bold text-white ring-1 ring-white/15">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-sand px-5 py-4 text-sm font-bold text-canopy transition hover:bg-white"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Consultar por WhatsApp
              </a>
            ) : null}
            <a href={`mailto:${contact.email}?subject=Consulta%20desde%20Raiz%20Volcanica`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white/10 px-5 py-4 text-sm font-bold text-white ring-1 ring-white/25 hover:bg-white/18">
              <Mail className="size-4" aria-hidden="true" />
              Enviar correo
            </a>
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-7 shadow-sm ring-1 ring-canopy/10">
          <h2 className="font-display text-4xl font-bold text-canopy">Información</h2>
          <div className="mt-7 grid gap-4 text-volcanic">
            <p className="flex items-center gap-3">
              <MapPin className="size-5 text-river" aria-hidden="true" />
              Guayabo, Mogote, Guanacaste, Costa Rica
            </p>
            <p className="flex items-center gap-3">
              <Mail className="size-5 text-river" aria-hidden="true" />
              {contact.email}
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-white p-7 shadow-sm ring-1 ring-canopy/10">
          <h2 className="font-display text-4xl font-bold text-canopy">Contacto directo</h2>
          <p className="mt-4 text-sm leading-7 text-volcanic">
            Para consultas de viaje, alianzas, negocios o contenido regional, escríbanos por WhatsApp o correo. Así podemos responder con más contexto y darle seguimiento real a cada solicitud.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-forest px-5 py-4 text-sm font-bold text-white transition hover:bg-canopy"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
            ) : null}
            <a
              href={`mailto:${contact.email}?subject=Consulta%20desde%20Raiz%20Volcanica`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-mist px-5 py-4 text-sm font-bold text-forest transition hover:text-canopy"
            >
              <Mail className="size-4" aria-hidden="true" />
              Correo
            </a>
          </div>
        </div>
      </div>
    </SimplePage>
  );
}
