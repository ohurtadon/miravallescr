"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { SiteBusiness } from "@/lib/site-api";
import { ScrollReveal } from "./ScrollReveal";

type BusinessCardProps = {
  business: SiteBusiness;
  imageSizes?: string;
};

export function BusinessCard({
  business,
  imageSizes = "(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
}: BusinessCardProps) {
  const { t, tv } = useI18n();
  const href = `/negocios/${business.slug}`;
  const cardClassName = `rv-card-interactive flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ${
    business.isFeatured ? "ring-moss/35" : "ring-canopy/10"
  }`;
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={business.images[0]}
          alt={business.name}
          fill
          className="rv-media-zoom object-cover"
          sizes={imageSizes}
          loading="lazy"
        />
        {business.isFeatured ? (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-xs font-bold text-canopy shadow">
            <BadgeCheck className="size-4" aria-hidden="true" />
            {t("card.featured")}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="line-clamp-1 text-xs font-bold uppercase tracking-[0.18em] text-canopy" title={tv(business.category)}>{tv(business.category)}</p>
        <h3 className="mt-3 line-clamp-2 min-h-[4.5rem] font-display text-3xl font-bold leading-tight text-canopy" title={business.name}>{business.name}</h3>
        <p className="mt-3 line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-volcanic" title={business.description}>{business.description}</p>
        <p className="mt-5 flex min-h-5 items-center gap-2 text-sm font-semibold text-canopy" title={business.location}>
          <MapPin className="size-4 shrink-0 text-river" aria-hidden="true" />
          <span className="line-clamp-1">{business.location}</span>
        </p>
      </div>
    </>
  );

  return (
    <ScrollReveal className="h-full" y={14}>
      <Link href={href} className={`group ${cardClassName}`} aria-label={`${t("card.more")}: ${business.name}`}>
        {content}
      </Link>
    </ScrollReveal>
  );
}
