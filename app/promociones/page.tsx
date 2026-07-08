import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent } from "lucide-react";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SimplePage } from "@/components/SimplePage";
import { getPublicPromotions } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Promociones",
  description: "Anuncios y campañas promocionales activas de negocios, experiencias y aliados de la región.",
  path: "/promociones"
});

export default async function PromotionsPage() {
  const promotions = await getPublicPromotions();

  return (
    <SimplePage
      eyebrow="Promociones"
      title="Ofertas y campañas activas"
      description="Un espacio separado para anuncios promocionales independientes de los recomendados editoriales del sitio."
    >
      <NarrativeBlock title="Aproveche las promociones de la región">
        <p>
          Descubra ofertas, paquetes y campañas especiales para disfrutar mejor su visita.
        </p>
      </NarrativeBlock>

      {promotions.length ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {promotions.map((promotion, index) => (
            <ScrollReveal key={promotion.id || promotion.title} className="h-full" delay={(index % 3) * 0.04} y={14}>
              <Link href={`/promociones/${promotion.key}`} className="rv-card-interactive group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-canopy/10">
                <article className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] bg-mist">
                    {promotion.image ? (
                      <Image
                        src={promotion.image}
                        alt={promotion.imageAlt || promotion.title}
                        fill
                        className="rv-media-zoom object-cover"
                        sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_30%,rgba(62,126,168,0.25),transparent_30%),linear-gradient(135deg,#f4f7f1,#dbe7d7)] text-forest">
                        <BadgePercent className="size-12" aria-hidden="true" />
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-md bg-sand px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-canopy shadow">
                      {promotion.eyebrow}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="line-clamp-2 min-h-[4.5rem] font-display text-3xl font-bold leading-tight text-canopy" title={promotion.title}>{promotion.title}</h2>
                    <p className="mt-3 line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-volcanic" title={promotion.description}>{promotion.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-forest transition group-hover:text-canopy">
                      Promoción activa
                      <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-lg bg-white p-8 text-center ring-1 ring-canopy/10">
          <BadgePercent className="mx-auto size-10 text-moss" aria-hidden="true" />
          <h2 className="mt-4 font-display text-3xl font-bold text-canopy">No hay promociones activas en este momento</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-volcanic">
            Las campañas promocionales activas se muestran aquí de forma independiente a los ítems potenciados del sitio.
          </p>
        </div>
      )}
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="promotions" />
      </div>
    </SimplePage>
  );
}
