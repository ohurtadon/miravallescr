import { TrackedPromoLink } from "@/components/TrackedPromoLink";
import { getPromotion, type SiteBusiness, type SiteExperience, type SiteProperty } from "@/lib/site-api";

type PromoSlotProps = {
  placement: string;
  businesses?: SiteBusiness[];
  experiences?: SiteExperience[];
  properties?: SiteProperty[];
};

export async function PromoSlot({ placement, businesses = [], experiences = [] }: PromoSlotProps) {
  const promotion = (await getPromotion(placement)) ?? fallbackPromotion({ businesses, experiences });
  if (!promotion) return null;

  return (
    <section className="bg-mist px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <TrackedPromoLink {...promotion} />
      </div>
    </section>
  );
}

function fallbackPromotion({ businesses, experiences }: { businesses: SiteBusiness[]; experiences: SiteExperience[] }) {
  const candidates = [
    ...businesses
      .filter((item) => item.canPublishPromotions || item.canShowRecommendedBadge)
      .map((item) => ({ weight: item.isBoosted ? item.boostWeight ?? 5 : 1, href: `/negocios/${item.slug}`, eyebrow: recommendationLabel("business", item.category), title: item.name, description: item.description, cta: `Ver ${item.category.toLocaleLowerCase("es")}` })),
    ...experiences
      .filter((item) => item.providerPlan === "cima" && item.providerPlanStatus === "active")
      .map((item) => ({ weight: Math.max(Number(item.providerBoostWeight ?? 5), 5), href: `/experiencias/${item.slug}`, eyebrow: recommendationLabel("experience", item.category), title: item.title, description: item.description, cta: "Ver experiencia" }))
  ];
  const selected = weightedRandom(candidates);
  return selected ? { href: selected.href, eyebrow: selected.eyebrow, title: selected.title, description: selected.description, cta: selected.cta } : null;
}

function recommendationLabel(type: "business" | "experience" | "property", category: string) {
  if (type === "experience") return `${category} recomendada`;
  if (type === "property") return "Propiedad recomendada";
  const normalized = category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
  const labels: Record<string, string> = {
    hospedaje: "Hospedaje recomendado",
    restaurante: "Restaurante recomendado",
    "guia turistico": "Guía turística recomendada",
    termales: "Termales recomendadas",
    "tour operador": "Tour operador recomendado",
    transporte: "Transporte recomendado",
    artesania: "Artesanía recomendada",
    "producto local": "Producto local recomendado"
  };
  return labels[normalized] ?? `${category} recomendado`;
}

function weightedRandom<T extends { weight: number }>(items: T[]) {
  const eligible = items.filter((item) => item.weight > 0);
  const total = eligible.reduce((sum, item) => sum + item.weight, 0);
  if (!total) return undefined;
  let cursor = Math.random() * total;
  for (const item of eligible) {
    cursor -= item.weight;
    if (cursor <= 0) return item;
  }
  return eligible.at(-1);
}
