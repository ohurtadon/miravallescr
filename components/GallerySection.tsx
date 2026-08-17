"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { SiteGalleryItem } from "@/lib/site-api";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

type GallerySectionProps = {
  gallery: SiteGalleryItem[];
  showHeading?: boolean;
  galleryCtaHref?: string;
};

export function GallerySection({ gallery, showHeading = true, galleryCtaHref }: GallerySectionProps) {
  const [active, setActive] = useState<SiteGalleryItem | null>(null);
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeLightbox = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!active) return;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [active, closeLightbox]);

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
          {gallery.map((item, index) => (
            <ScrollReveal key={item.src} className={item.span} delay={(index % 3) * 0.06} y={16}>
              <button
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setActive(item);
                }}
                className="group relative h-full min-h-12 w-full overflow-hidden rounded-lg text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-river focus:ring-offset-2"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105 group-active:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-canopy/0 transition group-hover:bg-canopy/20 group-active:bg-canopy/20" />
                <GalleryMeta item={item} />
              </button>
            </ScrollReveal>
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
      <AnimatePresence>
        {active ? (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-canopy/90 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeLightbox();
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label={t("gallery.close")}
              onClick={closeLightbox}
              className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white text-canopy"
            >
              <X className="size-5" />
            </button>
            <motion.div
              className="relative h-[78vh] w-full max-w-5xl overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={active.src} alt={active.alt} fill className="object-contain" sizes="100vw" />
              <GalleryMeta item={active} large />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
