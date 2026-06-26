"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function DiscoverSection() {
  const { t } = useI18n();

  return (
    <section className="bg-mist px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-soft">
          <Image
            src="/images/sitio-atardecer.webp"
            alt="Atardecer en el corredor volcánico del norte de Costa Rica"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 52vw, 100vw"
          />
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
