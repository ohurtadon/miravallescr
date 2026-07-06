"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Binoculars, Flame, Leaf, MapPin, Mountain, Sparkles, Waves } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { SiteAttraction } from "@/lib/site-api";
import { CherengaWalk } from "./CherengaWalk";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeading } from "./SectionHeading";

const icons = {
  Binoculars,
  Flame,
  Leaf,
  MapPin,
  Mountain,
  Sparkles,
  Waves
};

type AttractionsGridProps = {
  attractions: SiteAttraction[];
  showHeading?: boolean;
  carousel?: boolean;
};

export function AttractionsGrid({ attractions, showHeading = true, carousel = false }: AttractionsGridProps) {
  const { t } = useI18n();
  const carouselRef = useRef<HTMLDivElement>(null);
  const walkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [carouselState, setCarouselState] = useState({ endProgress: 0, scrollProgress: 0, atEnd: false });
  const [isWalking, setIsWalking] = useState(false);
  const itemClassName = carousel ? "w-[82vw] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]" : "";
  const imageSizes = carousel ? "(max-width: 639px) 82vw, 24rem" : "(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw";
  const syncCarouselState = useCallback((activateWalk = false) => {
    const node = carouselRef.current;
    if (!node || !carousel) return;
    const maxScroll = Math.max(node.scrollWidth - node.clientWidth, 0);
    const distanceToEnd = Math.max(maxScroll - node.scrollLeft, 0);
    const threshold = Math.min(420, Math.max(180, node.clientWidth * 0.38));
    const endProgress = maxScroll === 0 ? 1 : Math.max(0, Math.min(1, 1 - distanceToEnd / threshold));
    const scrollProgress = maxScroll === 0 ? 0 : Math.max(0, Math.min(1, node.scrollLeft / maxScroll));
    const atEnd = distanceToEnd <= 8;

    setCarouselState((current) =>
      Math.abs(current.endProgress - endProgress) < 0.01 &&
      Math.abs(current.scrollProgress - scrollProgress) < 0.01 &&
      current.atEnd === atEnd
        ? current
        : { endProgress, scrollProgress, atEnd }
    );

    if (activateWalk) {
      setIsWalking(true);
      if (walkTimeoutRef.current) clearTimeout(walkTimeoutRef.current);
      walkTimeoutRef.current = setTimeout(() => setIsWalking(false), 700);
    }
  }, [carousel]);

  useEffect(() => {
    if (!carousel) return;
    carouselRef.current?.scrollTo({ left: 0 });
    syncCarouselState();
  }, [attractions, carousel, syncCarouselState]);

  useEffect(() => {
    return () => {
      if (walkTimeoutRef.current) clearTimeout(walkTimeoutRef.current);
    };
  }, []);

  return (
    <section id="atractivos" className={`bg-white px-5 md:px-8 ${showHeading ? "py-20 md:py-28" : "py-12 md:py-14"}`}>
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow={t("attractions.eyebrow")}
            title={t("attractions.title")}
            copy={t("attractions.copy")}
          />
        ) : null}
        <div className={carousel ? `${showHeading ? "mt-12" : ""} relative` : showHeading ? "mt-12" : ""}>
          {carousel ? <SwipeHint hidden={carouselState.atEnd} /> : null}
          {carousel ? <CherengaWalk active={isWalking} /> : null}
          <div
            ref={carouselRef}
            onScroll={carousel ? () => syncCarouselState(true) : undefined}
            className={
              carousel
                ? "site-carousel flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 pr-24"
                : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {attractions.map((item, index) => {
              const Icon = icons[item.icon as keyof typeof icons] ?? Leaf;
              return (
                <ScrollReveal
                  key={item.slug}
                  className={carousel ? itemClassName : "h-full"}
                  delay={carousel ? 0 : (index % 3) * 0.04}
                  y={14}
                >
                  <Link
                    href={`/atractivos/${item.slug}`}
                    className="rv-card-interactive group flex h-full flex-col overflow-hidden rounded-lg bg-mist shadow-sm ring-1 ring-canopy/10"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="rv-media-zoom object-cover"
                        sizes={imageSizes}
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <span className="flex size-10 items-center justify-center rounded-full bg-forest text-white">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <ArrowUpRight className="size-5 text-canopy transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                      <h3 className="line-clamp-2 min-h-[4rem] font-display text-2xl font-bold leading-tight text-canopy" title={item.title}>{item.title}</h3>
                      <p className="mt-3 line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-volcanic" title={item.summary}>{item.summary}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
            {carousel ? <ViewMoreCard href="/atractivos" label={t("card.more")} progress={carouselState.endProgress} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function SwipeHint({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-y-0 right-2 z-10 flex items-center text-canopy drop-shadow-lg transition duration-300 ${
        hidden ? "translate-x-3 opacity-0" : "opacity-90"
      }`}
    >
      <ArrowRight className="size-9" aria-hidden="true" />
    </div>
  );
}

function ViewMoreCard({ href, label, progress }: { href: string; label: string; progress: number }) {
  return (
    <Link
      href={href}
      className="rv-card-interactive group flex min-h-[30rem] w-36 shrink-0 snap-end items-center justify-center px-4 text-canopy"
      style={{ opacity: progress, transform: `translateX(${Math.round((1 - progress) * 18)}px)` }}
    >
      <span className="flex items-center gap-3 rounded-full bg-canopy/90 px-4 py-3 text-sm font-bold text-white shadow-sm">
        {label}
        <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
