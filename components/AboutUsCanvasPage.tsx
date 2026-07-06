"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Copy,
  ExternalLink,
  Eye,
  Globe2,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Mountain,
  Sprout
} from "lucide-react";
import { useState } from "react";

const siteUrl = "https://www.raizvolcanica.com";

const platformItems = [
  {
    icon: "🌋",
    title: "Atractivos naturales",
    copy: "volcanes, cataratas, ríos, aguas termales, miradores, senderos y otros destinos de interés."
  },
  {
    icon: "🥾",
    title: "Experiencias",
    copy: "caminatas, tours, observación de aves, actividades de aventura, bienestar, gastronomía y experiencias auténticas ofrecidas por las comunidades locales."
  },
  {
    icon: "🏨",
    title: "Negocios locales",
    copy: "hoteles, cabinas, restaurantes, cafeterías, operadores turísticos, fincas, emprendimientos y servicios que forman parte de la oferta turística de la región."
  },
  {
    icon: "🗺️",
    title: "Mapa interactivo",
    copy: "una herramienta para localizar fácilmente atractivos, negocios, rutas y experiencias, facilitando la planificación del viaje."
  },
  {
    icon: "🦜",
    title: "Flora y fauna",
    copy: "un catálogo de especies representativas del territorio, promoviendo la educación ambiental y el turismo responsable."
  },
  {
    icon: "🏡",
    title: "Propiedades",
    copy: "opciones para vivir, invertir o desarrollar proyectos responsables cerca del corredor volcánico y natural."
  }
];

const plans = [
  {
    icon: "🌱",
    level: "Nivel 1",
    name: "Semilla",
    ideal: "Negocios que quieren aparecer en la plataforma.",
    features: ["Perfil básico, categoría, ubicación y contacto", "Horarios", "Hasta 5 fotografías", "1 experiencia"]
  },
  {
    icon: "🌳",
    level: "Nivel 2",
    name: "Raíz",
    ideal: "Negocios que buscan una presentación más completa.",
    features: [
      "Todo lo del Plan Semilla",
      "Galería ampliada",
      "Descripción optimizada",
      "Enlaces a WhatsApp, redes o sitio web",
      "Aparición destacada dentro de su categoría",
      "5 Experiencias"
    ]
  },
  {
    icon: "🏔️",
    level: "Nivel 3",
    name: "Cima",
    ideal: "Negocios que quieren mayor visibilidad.",
    recommended: true,
    features: [
      "Todo lo del Plan Raíz",
      "Etiqueta de negocio recomendado",
      "Prioridad visual",
      "Espacios destacados cuando aplique",
      "Publicación de promociones",
      "Reportes de rendimiento bajo solicitud",
      "Acceso a reporte de visualizaciones",
      "Experiencias ilimitadas"
    ]
  }
];

const founders = [
  {
    name: "Oscar Hurtado",
    role: "Ingeniero de Software",
    Icon: Globe2
  },
  {
    name: "Deivis Arias",
    role: "Ingeniero Ambiental",
    Icon: Leaf
  }
];

type AboutUsCanvasPageProps = {
  contactEmail: string;
  whatsappHref: string;
};

export function AboutUsCanvasPage({ contactEmail, whatsappHref }: AboutUsCanvasPageProps) {
  const [toastVisible, setToastVisible] = useState(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(siteUrl);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2800);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#121c17] text-white">
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#121c17] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/volcan-miravalles-arcoiris-guanacaste.webp"
            alt="Volcán Miravalles con paisaje natural"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/45 via-[#121c17]/55 to-[#121c17]" />

        <nav className="relative z-20 flex w-full items-center justify-between bg-gradient-to-b from-black/50 to-transparent px-6 py-6 md:px-12">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-[#c5b49a]">
              <Image
                src="/images/raiz-volcanica-logo.webp"
                alt="Raíz Volcánica"
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            </span>
            <span className="font-display text-xl font-bold text-white md:text-2xl">Raíz Volcánica</span>
          </Link>
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#c5b49a]/40 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#c5b49a] transition hover:border-[#c5b49a] hover:bg-black/50"
          >
            Visitar Sitio Web
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </nav>

        <div className="relative z-20 flex flex-grow flex-col justify-center px-6 py-12 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#c5b49a]/60 bg-[#1c2d24]/40 px-4 py-2 text-xs tracking-wide text-[#c5b49a] backdrop-blur-md md:text-sm">
              <MapPin className="size-4" aria-hidden="true" />
              <span>Guía regional y plataforma turística</span>
            </div>
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Raíz Volcánica: naturaleza, termales y aventura local
            </h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-2xl">
              Explora atractivos, experiencias y negocios locales de la Cordillera Volcánica de Guanacaste.
            </p>
          </div>
        </div>

        <div className="relative z-20 flex w-full flex-col items-start justify-between gap-4 border-t border-white/10 bg-black/35 px-6 py-6 backdrop-blur-sm sm:flex-row sm:items-center md:px-16 lg:px-24">
          <div className="font-display text-xs uppercase tracking-wider text-[#c5b49a] md:text-sm">
            CORREDOR VOLCÁNICO DEL NORTE DE COSTA RICA - Guanacaste / Alajuela
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span>Plataforma activa para el desarrollo sostenible</span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1c2d24] px-6 py-24 md:px-16 lg:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(197,180,154,0.1),transparent_40%)]" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-2 block font-display text-lg font-semibold tracking-wider text-[#c5b49a]">El Ecosistema Digital</span>
              <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                Conectando el corredor natural de Costa Rica
              </h2>
              <p className="text-justify text-base leading-relaxed text-white/80 md:text-lg">
                Raíz Volcánica es una plataforma digital creada para promover la Cordillera Volcánica de Guanacaste, la cual actúa como un punto de referencia para conectar a los visitantes con los principales atractivos, experiencias y negocios locales de la región. Con el propósito de entrelazar la naturaleza, la comunidad y el turismo, este ecosistema busca impulsar el desarrollo sostenible y dar mayor visibilidad a las comunidades y emprendimientos que conforman este territorio.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-[#c5b49a]/20 bg-[#121c17]/60 p-8 shadow-2xl backdrop-blur-md lg:col-span-5">
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-[#c5b49a]/10 blur-2xl" />
              <div className="relative z-10 space-y-6">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#c5b49a]/10 text-[#c5b49a]">
                  <Eye className="size-7" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Visibilidad Primordial</h3>
                <p className="text-justify text-sm leading-relaxed text-white/70">
                  Impulsamos la visibilidad de los negocios locales y emprendimientos, proyectando la riqueza del corredor natural para que más personas descubran el destino y conecten directamente con cada propuesta local.
                </p>
                <div className="flex justify-between border-t border-[#c5b49a]/20 pt-4 text-xs font-semibold text-[#c5b49a]">
                  <span>Guanacaste</span>
                  <span>Alajuela</span>
                  <span>Costa Rica</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#121c17] px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-2 block font-display text-lg font-semibold tracking-wider text-[#c5b49a]">Nuestros Pilares</span>
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">Dirección Estratégica</h2>
            <p className="mt-2 text-sm text-white/60 md:text-base">
              La ruta que guía nuestro ecosistema hacia un impacto ambiental, social y comercial positivo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <PillarCard
              Icon={Compass}
              label="Misión"
              title="Motor de Desarrollo"
              copy="Conectar la naturaleza, la comunidad y el turismo, operando como un motor de desarrollo sostenible que dinamiza la economía local y enlaza eficientemente a los visitantes con la riqueza patrimonial, comercial y biológica de la región."
            />
            <PillarCard
              Icon={Eye}
              label="Visión"
              title="Sostenibilidad a Futuro"
              copy="Convertirse en una plataforma que fortalezca el turismo sostenible, dé mayor visibilidad a los negocios locales y promueva el desarrollo de las comunidades que conforman el corredor natural del norte de Costa Rica. Su meta es centralizar la información de la región para facilitar que más personas descubran el destino, prolonguen su estadía y distribuyan su gasto económico de manera equitativa entre una mayor cantidad de emprendimientos locales."
            />
          </div>
        </div>
      </section>

      <section className="relative border-t border-[#c5b49a]/10 bg-[#1c2d24]/50 px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-2 block font-display text-lg font-semibold tracking-wider text-[#c5b49a]">Fundadores</span>
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">El equipo que impulsa la raíz</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {founders.map((founder) => (
              <div key={founder.name} className="rounded-3xl border border-[#c5b49a]/10 bg-[#121c17]/80 p-8 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-[#c5b49a]/35">
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#c5b49a]/10 text-[#c5b49a]">
                  <founder.Icon className="size-7" aria-hidden="true" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white">{founder.name}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#c5b49a]">{founder.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-[#c5b49a]/10 bg-[#1c2d24]/50 px-6 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <span className="mb-2 block font-display text-lg font-semibold tracking-wider text-[#c5b49a]">Servicios Integrados</span>
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">La plataforma incluye:</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {platformItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#121c17]/80 p-8 transition duration-300 hover:border-[#c5b49a]/30"
              >
                <div>
                  <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#c5b49a]/10 text-3xl">
                    {item.icon}
                  </div>
                  <h4 className="mb-3 font-display text-2xl font-bold text-white">{item.title}</h4>
                  <p className="text-justify text-sm leading-relaxed text-white/70">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planes" className="relative overflow-hidden border-t border-[#c5b49a]/10 bg-[#121c17] px-6 py-24 md:px-16 lg:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,180,154,0.05),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-2 block font-display text-lg font-semibold tracking-wider text-[#c5b49a]">Planes de Afiliación</span>
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">Impulsa tu Negocio con Nosotros</h2>
            <p className="mt-2 text-sm text-white/60 md:text-base">
              Selecciona el plan que mejor se adapte a tus necesidades de crecimiento y proyecta tu marca ante miles de visitantes.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-3xl p-8 backdrop-blur-sm transition duration-300 ${
                  plan.recommended
                    ? "z-10 border-2 border-[#c5b49a] bg-[#1c2d24]/40 shadow-2xl md:scale-105"
                    : "border border-[#c5b49a]/10 bg-[#1c2d24]/20 hover:border-[#c5b49a]/30"
                }`}
              >
                {plan.recommended ? (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#c5b49a] px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-[#121c17] shadow">
                    Más Recomendado
                  </div>
                ) : null}
                <div>
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#c5b49a]/10 text-2xl">{plan.icon}</div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${plan.recommended ? "text-[#c5b49a]" : "text-[#c5b49a]/60"}`}>
                      {plan.level}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-3xl font-bold text-white">{plan.name}</h3>
                  <p className="mb-6 text-xs font-medium uppercase tracking-wide text-[#c5b49a]">Ideal para:</p>
                  <p className={`mb-6 text-sm italic leading-relaxed ${plan.recommended ? "text-white/90" : "text-white/80"}`}>
                    "{plan.ideal}"
                  </p>
                  <div className="border-t border-[#c5b49a]/20 pt-6">
                    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#c5b49a]">Incluye:</p>
                    <ul className={`space-y-3 text-xs ${plan.recommended ? "text-white/80" : "text-white/70"}`}>
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#c5b49a]" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-[#c5b49a]/25 bg-[#1c2d24]/50 p-8 text-center shadow-2xl backdrop-blur-sm">
            <h3 className="font-display text-3xl font-bold text-white">¿Interesado en conocer nuestras tarifas?</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              Contáctanos y te compartimos más información sobre los planes disponibles para negocios, experiencias y aliados de la región.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c5b49a] px-5 py-3 text-sm font-bold text-[#121c17] transition hover:bg-[#d1c0a5]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Contactar por WhatsApp
                </a>
              ) : null}
              <a
                href={`mailto:${contactEmail}?subject=Consulta%20sobre%20tarifas%20Ra%C3%ADz%20Volc%C3%A1nica`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                <Mail className="size-4" aria-hidden="true" />
                Escribir por correo
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-[#c5b49a]/20 bg-[#121c17] px-6 py-20 text-center text-white md:px-16 lg:px-24">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1c2d24]/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl space-y-8">
          <div className="relative mx-auto flex size-20 items-center justify-center overflow-hidden rounded-full border-2 border-[#c5b49a] bg-white p-1.5 shadow-2xl transition duration-300 hover:scale-105">
            <Image
              src="/images/raiz-volcanica-logo.webp"
              alt="Raíz Volcánica"
              fill
              sizes="80px"
              className="object-contain p-1"
            />
          </div>
          <h3 className="font-display text-3xl font-bold md:text-5xl">Sé parte del desarrollo local</h3>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Conecta tu marca o planifica tu viaje a través de la guía del corredor volcánico. Descubre Costa Rica desde la raíz.
          </p>

          <div className="mx-auto flex max-w-lg flex-col items-center justify-between gap-4 rounded-2xl border border-[#c5b49a]/30 bg-[#1c2d24]/50 p-6 shadow-xl sm:flex-row">
            <div className="text-left">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#c5b49a]">Sitio Oficial</span>
              <span className="font-display text-lg font-bold text-white">www.raizvolcanica.com</span>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <button
                type="button"
                onClick={copyToClipboard}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 sm:flex-initial"
              >
                <Copy className="size-4" aria-hidden="true" />
                Copiar
              </button>
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#c5b49a] px-5 py-2.5 text-sm font-bold text-[#121c17] transition hover:bg-[#d1c0a5] sm:flex-initial"
              >
                Visitar
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
            <p>© 2026 Raíz Volcánica. Todos los derechos reservados. Guanacaste, Costa Rica.</p>
            <p className="flex gap-4">
              <Link href="/politica-de-privacidad" className="hover:text-[#c5b49a]">Privacidad</Link>
            </p>
          </div>
        </div>
      </footer>

      <div
        className={`fixed left-1/2 top-6 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[#c5b49a] px-6 py-3.5 font-bold text-[#121c17] shadow-2xl transition duration-300 ${
          toastVisible ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
        }`}
      >
        <CheckCircle2 className="size-5" aria-hidden="true" />
        <span>Enlace copiado al portapapeles</span>
      </div>
    </main>
  );
}

function PillarCard({
  Icon,
  label,
  title,
  copy
}: {
  Icon: typeof Compass;
  label: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="group relative rounded-3xl border border-[#c5b49a]/10 bg-[#1c2d24]/30 p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#c5b49a]/40 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[#c5b49a]/10 text-[#c5b49a] transition duration-300 group-hover:bg-[#c5b49a] group-hover:text-[#121c17]">
          <Icon className="size-7" aria-hidden="true" />
        </div>
        <span className="font-display text-sm uppercase tracking-wider text-[#c5b49a]/70">{label}</span>
      </div>
      <h3 className="mb-4 font-display text-2xl font-bold text-white">{title}</h3>
      <p className="text-justify leading-relaxed text-white/80">{copy}</p>
    </div>
  );
}
