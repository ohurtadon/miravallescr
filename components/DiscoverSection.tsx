"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function DiscoverSection() {
  const { t } = useI18n();
  const collageImages = [
    {
      src: "/images/sitio-atardecer.webp",
      alt: "Atardecer con turbinas eólicas en el corredor volcánico",
      className: "col-span-8 row-span-7"
    },
    {
      src: "/images/tucanes.webp",
      alt: "Tucanes entre hojas tropicales",
      className: "col-span-4 row-span-12"
    },
    {
      src: "/images/volcan.webp",
      alt: "Volcán sobre el bosque del norte de Costa Rica",
      className: "col-span-4 row-span-5"
    },
    {
      src: "/images/mono.webp",
      alt: "Mono cariblanco en el bosque",
      className: "col-span-4 row-span-5"
    }
  ];

  return (
    <section className="bg-mist px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="w-full">
          <div className="grid h-[360px] grid-cols-12 grid-rows-12 gap-2 sm:h-[440px] sm:gap-3 lg:h-[500px]">
            {collageImages.map((image) => (
              <div key={image.src} className={`group relative overflow-hidden rounded-lg shadow-soft ${image.className}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-moss">{t("discover.eyebrow")}</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-canopy text-balance md:text-6xl">
            {t("discover.title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-volcanic">
            {t("discover.copy")}
          </p>
          <Link
            href="/atractivos"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-forest px-6 py-4 text-sm font-bold text-white transition hover:bg-canopy"
          >
            {t("discover.cta")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
