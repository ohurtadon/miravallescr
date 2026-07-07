import type { Metadata } from "next";
import { getBusinessPlanPricing, type BillingPeriod, type PlanPeriodPricing, type PublicPlanPricing } from "@/lib/site-api";

type PriceGroup = {
  label?: string;
  prices: PlanPeriodPricing;
};

type Plan = {
  key: "semilla" | "raiz" | "cima";
  name: string;
  level: string;
  icon: string;
  tag: string;
  ideal: string;
  recommended?: boolean;
  includes: string[];
};

const plans: Plan[] = [
  {
    key: "semilla",
    name: "Semilla",
    level: "Nivel 1",
    icon: "🌱",
    tag: "PYME",
    ideal: "Negocios que quieren aparecer en la plataforma.",
    includes: ["Perfil básico, categoría, ubicación y contacto", "Horarios", "Hasta 5 fotografías", "1 experiencia"]
  },
  {
    key: "raiz",
    name: "Raíz",
    level: "Nivel 2",
    icon: "🌳",
    tag: "PYME",
    ideal: "Negocios que buscan una presentación más completa.",
    includes: [
      "Todo lo del Plan Semilla",
      "Galería ampliada",
      "Descripción optimizada",
      "Enlaces a WhatsApp, redes o sitio web",
      "Aparición destacada dentro de su categoría",
      "5 experiencias"
    ]
  },
  {
    key: "cima",
    name: "Cima",
    level: "Nivel 3",
    icon: "🏔️",
    tag: "PYME / Corporativo",
    ideal: "Negocios que quieren mayor visibilidad, con tarifas para PYMES y empresas grandes.",
    recommended: true,
    includes: [
      "Todo lo del Plan Raíz",
      "Etiqueta de negocio recomendado",
      "Prioridad visual",
      "Espacios destacados cuando aplique",
      "Publicación de promociones",
      "Reportes bajo solicitud",
      "Reporte de visualizaciones",
      "Experiencias ilimitadas"
    ]
  }
];

const periodLabels: Record<BillingPeriod, string> = {
  monthly: "Mensual",
  semiannual: "Semestral",
  annual: "Anual"
};

const periodOrder: BillingPeriod[] = ["monthly", "semiannual", "annual"];

export const metadata: Metadata = {
  title: "Precios de planes",
  description: "Tarifas de afiliación de Raíz Volcánica para PYMES y empresas corporativas.",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function PricesPage() {
  const pricing = await getBusinessPlanPricing();

  return (
    <main className="grid min-h-screen place-items-center bg-[#121c17] px-4 py-6 text-white sm:px-7">
      <section
        className="w-full max-w-7xl overflow-hidden rounded-[2rem] border border-[#c5b49a]/20 bg-[#121c17]/95 shadow-[0_32px_90px_rgba(0,0,0,0.34)]"
        aria-label="Tarifas de planes Raíz Volcánica"
      >
        <header className="border-b border-[#c5b49a]/15 px-5 py-8 text-center sm:px-12">
          <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c5b49a]">
            Planes de Afiliación
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[0.95]">
            Impulsa tu negocio con nosotros
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-white/70">
            Tarifas para negocios, experiencias y aliados que desean formar parte de Raíz Volcánica.
          </p>
        </header>

        <div className="grid gap-5 px-5 py-8 sm:px-12 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex min-h-[570px] flex-col rounded-3xl border bg-gradient-to-b from-[#1c2d24]/75 to-[#121c17]/90 p-6 ${
                plan.recommended
                  ? "border-[3px] border-[#c5b49a] shadow-[0_20px_58px_rgba(197,180,154,0.15)] lg:-translate-y-2"
                  : "border-[#c5b49a]/20"
              }`}
            >
              {plan.recommended ? (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#c5b49a] px-5 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#121c17]">
                  Más recomendado
                </span>
              ) : null}

              <div className="min-h-[215px]">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="grid size-14 place-items-center rounded-[18px] bg-[#c5b49a]/15 text-3xl" aria-hidden="true">
                    {plan.icon}
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#c5b49a]/80">{plan.level}</span>
                </div>
                <h2 className="font-display text-[2.5rem] font-bold leading-none">{plan.name}</h2>
                <span
                  className="mt-3 inline-flex rounded-full border border-[#c5b49a]/45 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#d8cab4]"
                  title="Pequeñas y Medianas Empresas (PYMES)"
                >
                  {plan.tag}
                </span>
                <p className="mt-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#c5b49a]">Ideal para:</p>
                <p className="mt-2 min-h-[54px] text-sm font-semibold italic leading-relaxed text-white/80">{plan.ideal}</p>
              </div>

              <div className="grid gap-3">
                {pricing ? getPriceGroups(plan, pricing).map((group) => (
                  <div key={group.label ?? plan.name} className="grid gap-2 border-t border-[#c5b49a]/25 pt-3">
                    {group.label ? (
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#c5b49a]">{group.label}</p>
                    ) : null}
                    {periodOrder.map((period) => (
                      <div key={`${group.label ?? plan.name}-${period}`} className="grid grid-cols-[1fr_7.25rem] items-center gap-3 rounded-[13px] bg-white/5 px-3 py-2.5">
                        <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/70">{periodLabels[period]}</span>
                        <span className="text-right text-lg font-black tabular-nums text-[#d8cab4]">{formatPlanPrice(group.prices[period])}</span>
                      </div>
                    ))}
                  </div>
                )) : (
                  <div className="rounded-[13px] border border-[#c5b49a]/25 bg-white/5 px-4 py-5 text-sm font-bold leading-relaxed text-white/75">
                    Las tarifas no están disponibles en este momento.
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-[#c5b49a]/20 pt-4">
                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#c5b49a]">Incluye:</p>
                <ul className="grid gap-2 text-[11px] font-bold leading-snug text-white/70">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="grid size-[15px] shrink-0 place-items-center rounded-full border border-[#c5b49a] text-[10px] leading-none text-[#c5b49a]">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[#c5b49a]/15 bg-black/20 px-5 py-5 text-center text-sm font-bold text-white/65 sm:flex-row sm:px-12 sm:text-left">
          <span className="font-display text-2xl font-bold text-[#c5b49a]">Raíz Volcánica</span>
          <span>Guanacaste, Costa Rica · www.raizvolcanica.com</span>
        </footer>
      </section>
    </main>
  );
}

function getPriceGroups(plan: Plan, pricing: PublicPlanPricing): PriceGroup[] {
  if (plan.key !== "cima") return [{ prices: pricing[plan.key] }];
  return [
    { label: "Tarifa PYME", prices: pricing.cima },
    { label: "Tarifa Corporativo", prices: pricing.cima.corporate }
  ];
}

function formatPlanPrice(value: number) {
  return `₡${Math.round(value).toLocaleString("en-US").replace(/,/g, ".")}`;
}
