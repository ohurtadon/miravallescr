"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { SiteBusiness } from "@/lib/site-api";

type BusinessCardProps = {
  business: SiteBusiness;
};

export function BusinessCard({ business }: BusinessCardProps) {
  const { t, tv } = useI18n();

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-soft ${
        business.isFeatured ? "ring-moss/35" : "ring-canopy/10"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={business.images[0]}
          alt={business.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
        <div className="mt-auto pt-6">
          <Link
            href={`/negocios/${business.slug}`}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-forest px-4 py-3 text-sm font-bold text-white transition hover:bg-canopy"
          >
            {t("card.more")}
          </Link>
        </div>
      </div>
    </article>
  );
}
