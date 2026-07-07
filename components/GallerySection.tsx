"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { SiteGalleryItem } from "@/lib/site-api";
import { SectionHeading } from "./SectionHeading";

type GallerySectionProps = {
  gallery: SiteGalleryItem[];
  showHeading?: boolean;
  galleryCtaHref?: string;
};

export function GallerySection({ gallery, showHeading = true, galleryCtaHref }: GallerySectionProps) {
  const [active, setActive] = useState<SiteGalleryItem | null>(null);
  const { t } = useI18n();

  return (
    <section className={`${showHeading ? "bg-mist" : "bg-white"} px-5 md:px-8 ${showHeading ? "py-20 md:py-28" : "py-12 md:py-14"}`}>
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow={t("gallery.eyebrow")}
            title={t("gallery.title")}
            copy={t("gallery.copy")}
          />
        ) : null}
        <div className={`${showHeading ? "mt-12" : ""} grid auto-rows-[260px] gap-4 md:grid-cols-3`}>
          {gallery.map((item) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(item)}
              className={`group relative min-h-12 overflow-hidden rounded-lg text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-river focus:ring-offset-2 ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-canopy/0 transition group-hover:bg-canopy/20" />
              <GalleryMeta item={item} />
            </button>
          ))}
        </div>
        {galleryCtaHref ? (
          <div className="mt-8 flex justify-center">
            <Link
              href={galleryCtaHref}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-forest px-6 py-4 text-sm font-bold text-white transition hover:bg-canopy focus:outline-none focus:ring-2 focus:ring-river focus:ring-offset-2"
            >
              {t("gallery.moreImages")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
      {active ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-canopy/90 p-5" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label={t("gallery.close")}
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white text-canopy"
          >
            <X className="size-5" />
          </button>
          <div className="relative h-[78vh] w-full max-w-5xl overflow-hidden rounded-lg">
            <Image src={active.src} alt={active.alt} fill className="object-contain" sizes="100vw" />
            <GalleryMeta item={active} large />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function GalleryMeta({ item, large = false }: { item: SiteGalleryItem; large?: boolean }) {
  const hasMeta = Boolean(item.credit || item.relatedName || item.relatedLabel);
  if (!hasMeta) return null;

  return (
    <span className={`pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 bg-gradient-to-t from-canopy/75 via-canopy/35 to-transparent text-white ${large ? "p-5" : "p-3"}`}>
      <span className="min-w-0">
        {item.credit ? (
          <span className={`${large ? "text-sm" : "text-xs"} block truncate font-medium text-white/88`}>
            Foto: {item.credit}
          </span>
        ) : null}
        {item.relatedName ? (
          <span className={`${large ? "mt-1 text-sm" : "mt-0.5 text-[11px]"} flex min-w-0 items-center gap-1.5 font-bold text-white/90`}>
            <MapPin className={`${large ? "size-4" : "size-3"} shrink-0`} aria-hidden="true" />
            <span className="truncate">{item.relatedName}</span>
          </span>
        ) : item.relatedLabel ? (
          <span className={`${large ? "mt-1 text-xs" : "mt-0.5 text-[10px]"} block font-bold uppercase tracking-[0.16em] text-white/72`}>
            {item.relatedLabel}
          </span>
        ) : null}
      </span>
    </span>
  );
}
