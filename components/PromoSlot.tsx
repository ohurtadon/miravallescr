import { TrackedPromoLink } from "@/components/TrackedPromoLink";
import { getPromotion, type SiteBusiness } from "@/lib/site-api";

type PromoSlotProps = {
  placement: string;
  businesses?: SiteBusiness[];
};

export async function PromoSlot({ placement, businesses = [] }: PromoSlotProps) {
  const promotion = (await getPromotion(placement)) ?? fallbackPromotion(businesses);
  if (!promotion) return null;
  const trackedHref = "clickHref" in promotion && typeof promotion.clickHref === "string"
    ? promotion.clickHref
    : promotion.href;

  return (
    <section className="bg-mist px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <TrackedPromoLink
          {...promotion}
          href={trackedHref}
        />
      </div>
    </section>
  );
}

function fallbackPromotion(businesses: SiteBusiness[]) {
  if (!businesses.length) return null;
  const business = businesses[Math.floor(Math.random() * businesses.length)];
  return {
    href: `/negocios/${business.slug}`,
    eyebrow: recommendationLabel(business.category),
    title: business.name,
    description: business.description,
    cta: `Ver ${business.category.toLocaleLowerCase("es")}`
  };
}

function recommendationLabel(category: string) {
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
