import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData, withWhatsAppMessage } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Información de contacto para planificar una visita a Miravalles, Guanacaste."
};

export default async function ContactPage() {
  const { contact } = await getSiteData();
  const whatsappHref = withWhatsAppMessage(
    contact.whatsapp,
    "Hola, te descubrí en miravallescr.com y quiero recibir más información para visitar Miravalles."
  );

  return (
    <SimplePage
      eyebrow="Contacto"
      title="Planifica tu visita"
      description="Pronto se integrará información oficial de contacto, operadores locales y recomendaciones actualizadas."
    >
      <NarrativeBlock title="La mejor ruta empieza con una buena pregunta">
        <p>
          Cada visita a Miravalles puede ser distinta: algunas personas buscan termales y descanso, otras quieren caminar, observar aves, encontrar un guía o ubicar un negocio local antes de salir.
        </p>
        <p>
          Use este espacio para contar qué necesita. La idea es orientar mejor al visitante y conectar cada consulta con información útil, contactos locales o próximos contenidos de la guía regional.
        </p>
      </NarrativeBlock>
      <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div id="clima" className="rounded-lg bg-white p-7 shadow-sm ring-1 ring-canopy/10">
          <h2 className="font-display text-4xl font-bold text-canopy">Información</h2>
          <div className="mt-7 grid gap-4 text-volcanic">
            <p className="flex items-center gap-3">
              <MapPin className="size-5 text-river" aria-hidden="true" />
              Miravalles, Guanacaste, Costa Rica
            </p>
            <p className="flex items-center gap-3">
              <Mail className="size-5 text-river" aria-hidden="true" />
              {contact.email}
            </p>
            <p className="flex items-center gap-3">
              <Phone className="size-5 text-river" aria-hidden="true" />
              Contacto local por definir
            </p>
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-forest px-5 py-4 text-sm font-bold text-white transition hover:bg-canopy"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Contactar por WhatsApp
              </a>
            ) : null}
            <p className="rounded-md bg-mist p-4 text-sm leading-7">
              Clima: sección preparada para integrar recomendaciones por temporada y datos actualizados en fases futuras.
            </p>
          </div>
        </div>
        <form className="rounded-lg bg-white p-7 shadow-sm ring-1 ring-canopy/10">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-canopy">
              Nombre
              <input className="rounded-md border border-canopy/15 px-4 py-3 font-normal outline-none focus:border-river" placeholder="Tu nombre" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-canopy">
              Correo
              <input type="email" className="rounded-md border border-canopy/15 px-4 py-3 font-normal outline-none focus:border-river" placeholder="correo@ejemplo.com" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-canopy md:col-span-2">
              Mensaje
              <textarea className="min-h-36 rounded-md border border-canopy/15 px-4 py-3 font-normal outline-none focus:border-river" placeholder="Cuéntanos qué te gustaría conocer" />
            </label>
          </div>
          <button type="button" className="mt-5 rounded-md bg-forest px-6 py-4 text-sm font-bold text-white transition hover:bg-canopy">
            Enviar mensaje
          </button>
        </form>
      </div>
    </SimplePage>
  );
}
