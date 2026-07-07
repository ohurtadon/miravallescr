import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgePercent, Store } from "lucide-react";
import { PromotionContent } from "@/components/PromotionContent";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { getPublicPromotion } from "@/lib/site-api";
import type { SitePromoContent } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";

type PromotionPageProps = {
  params: Promise<{
    key: string;
  }>;
};

export async function generateMetadata({ params }: PromotionPageProps): Promise<Metadata> {
  const { key } = await params;
  const promotion = await getPublicPromotion(key);
  if (!promotion) return {};

  return buildPageMetadata({
    title: promotion.title,
    description: plainText(promotion.description || promotionContentText(promotion.content)),
    path: `/promociones/${promotion.key || key}`,
    image: promotion.image
  });
}

export default async function PromotionDetailPage({ params }: PromotionPageProps) {
  const { key } = await params;
  const promotion = await getPublicPromotion(key);
  if (!promotion) notFound();

  return (
    <SimplePage eyebrow={promotion.eyebrow} title={promotion.title} description={plainText(promotion.description || promotionContentText(promotion.content))}>
      <Link href="/promociones" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-forest transition hover:text-canopy">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver a promociones
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="overflow-hidden rounded-lg bg-white ring-1 ring-canopy/10">
          <div className="relative aspect-[16/10] bg-mist">
            {promotion.image ? (
              <Image
                src={promotion.image}
                alt={promotion.imageAlt || promotion.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 62vw, 100vw"
                priority
              />
            ) : (
              <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_30%,rgba(62,126,168,0.25),transparent_30%),linear-gradient(135deg,#f4f7f1,#dbe7d7)] text-forest">
                <BadgePercent className="size-16" aria-hidden="true" />
              </div>
            )}
            <span className="absolute left-5 top-5 rounded-full bg-sand/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-canopy shadow">
              {promotion.eyebrow}
            </span>
          </div>
          <div className="p-7">
            <PromotionContent content={promotion.content} fallback={promotion.description} />
          </div>
        </article>

        <aside className="space-y-5">
          {promotion.targetBusiness ? (
            <div className="rounded-lg bg-white p-6 ring-1 ring-canopy/10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">Negocio promocionado</p>
              <div className="mt-4 flex gap-4">
                {promotion.targetBusiness.image ? (
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-mist">
                    <Image
                      src={promotion.targetBusiness.image}
                      alt={promotion.targetBusiness.imageAlt || promotion.targetBusiness.name || "Negocio promocionado"}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <span className="grid size-20 shrink-0 place-items-center rounded-lg bg-mist text-forest">
                    <Store className="size-8" aria-hidden="true" />
                  </span>
                )}
                <div>
                  <h2 className="font-display text-2xl font-bold text-canopy">{promotion.targetBusiness.name}</h2>
                  {promotion.targetBusiness.category ? <p className="mt-1 text-sm font-bold text-moss">{promotion.targetBusiness.category}</p> : null}
                  {promotion.targetBusiness.description ? <p className="mt-2 text-sm leading-6 text-volcanic">{promotion.targetBusiness.description}</p> : null}
                </div>
              </div>
              <Link href={promotion.targetBusiness.href} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-5 py-4 text-sm font-bold text-white transition hover:bg-canopy">
                {promotion.cta || "Ver negocio"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          ) : null}
        </aside>
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="promotion-detail" />
      </div>
    </SimplePage>
  );
}

function plainText(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function promotionContentText(content: SitePromoContent | undefined) {
  if (!content) return "";
  if (content.mode === "html") return content.html;
  return content.blocks.map((block) => block.text || block.label || block.items?.join(" ") || "").join(" ");
}
