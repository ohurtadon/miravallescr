import type { Metadata } from "next";
import Link from "next/link";
import { Handshake, Megaphone, PenLine, Store, TicketCheck } from "lucide-react";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Alianzas",
  description: "Opciones para registrar negocios, patrocinar la plataforma y promocionar experiencias turísticas en Miravalles."
};

const options = [
  {
    title: "Registrar mi negocio",
    description: "Prepare su ficha para aparecer en el directorio turístico local.",
    icon: Store
  },
  {
    title: "Patrocinar la plataforma",
    description: "Impulse la promoción turística sostenible con presencia editorial.",
    icon: Handshake
  },
  {
    title: "Promocionar una experiencia",
    description: "Destaque tours, rutas y servicios guiados alineados con Miravalles.",
    icon: TicketCheck
  },
  {
    title: "Colaborar con contenido",
    description: "Aporte fotografías, historias, datos locales o recomendaciones útiles.",
    icon: PenLine
  },
  {
    title: "Contactar al equipo",
    description: "Conversemos sobre una alianza turística responsable y gradual.",
    icon: Megaphone
  }
];

export default function PartnershipsPage() {
  return (
    <SimplePage
      eyebrow="Alianzas"
      title="Sea parte de la promoción turística de Miravalles"
      description="Esta plataforma busca impulsar el turismo sostenible de Miravalles conectando visitantes con experiencias, negocios y atractivos locales."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <article key={option.title} className="rounded-lg bg-white p-7 ring-1 ring-canopy/10">
              <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-forest text-white">
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <h2 className="font-display text-3xl font-bold text-canopy">{option.title}</h2>
              <p className="mt-3 text-sm leading-7 text-volcanic">{option.description}</p>
            </article>
          );
        })}
      </div>
      <div className="mt-10 rounded-lg bg-forest p-8 text-white">
        <div className="grid gap-6 md:grid-cols-[1.4fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sand">Activación futura</p>
            <h2 className="mt-3 font-display text-4xl font-bold">Quiero ser aliado</h2>
            <p className="mt-4 max-w-2xl text-white/78">
              Por ahora este flujo puede gestionarse por contacto directo. Más adelante puede evolucionar a formularios, CRM, pagos o panel de aliados.
            </p>
          </div>
          <Link href="/contacto" className="inline-flex justify-center rounded-md bg-sand px-6 py-4 text-sm font-bold text-canopy hover:bg-white">
            Quiero ser aliado
          </Link>
        </div>
      </div>
    </SimplePage>
  );
}
