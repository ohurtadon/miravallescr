"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import type { SiteGalleryItem } from "@/lib/site-api";
import { SectionHeading } from "./SectionHeading";

type GallerySectionProps = {
  gallery: SiteGalleryItem[];
  showHeading?: boolean;
};

export function GallerySection({ gallery, showHeading = true }: GallerySectionProps) {
  const [active, setActive] = useState<SiteGalleryItem | null>(null);

  return (
    <section className={`${showHeading ? "bg-mist" : "bg-white"} px-5 md:px-8 ${showHeading ? "py-20 md:py-28" : "py-12 md:py-14"}`}>
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow="Galería"
            title="Primeras postales de un territorio donde la naturaleza es protagonista"
            copy="Estas imágenes son referenciales y serán reemplazadas por material real de la región en próximas iteraciones."
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
            </button>
          ))}
        </div>
      </div>
      {active ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-canopy/90 p-5" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Cerrar galería"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white text-canopy"
          >
            <X className="size-5" />
          </button>
          <div className="relative h-[78vh] w-full max-w-5xl overflow-hidden rounded-lg">
            <Image src={active.src} alt={active.alt} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      ) : null}
    </section>
  );
}
