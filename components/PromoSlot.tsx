import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { promoSlots } from "@/data/site";

type PromoSlotProps = {
  index?: number;
};

export function PromoSlot({ index = 0 }: PromoSlotProps) {
  const promo = promoSlots[index % promoSlots.length];

  return (
    <section className="bg-mist px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href={promo.href}
          className="grid gap-5 rounded-lg bg-white p-6 ring-1 ring-canopy/10 transition hover:-translate-y-1 hover:shadow-soft md:grid-cols-[0.7fr_1.3fr_auto] md:items-center md:p-8"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">{promo.eyebrow}</p>
          <div>
            <h3 className="font-display text-3xl font-bold text-canopy">{promo.title}</h3>
            <p className="mt-2 text-sm leading-7 text-volcanic">{promo.description}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-forest">
            {promo.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
