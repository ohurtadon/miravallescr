"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { SiteBusiness } from "@/lib/site-api";
import { BusinessCard } from "./BusinessCard";
import { CherengaWalk } from "./CherengaWalk";
import { SectionHeading } from "./SectionHeading";

type BusinessDirectoryProps = {
  businesses: SiteBusiness[];
  businessCategories: string[];
  featuredOnly?: boolean;
  limit?: number;
  showHeading?: boolean;
  showFilters?: boolean;
  carousel?: boolean;
};

export function BusinessDirectory({
  businesses,
  businessCategories,
  featuredOnly = false,
  limit,
  showHeading = true,
  showFilters = false,
  carousel = false
}: BusinessDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { t, tv } = useI18n();
  const carouselRef = useRef<HTMLDivElement>(null);
  const walkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [carouselState, setCarouselState] = useState({ endProgress: 0, scrollProgress: 0, atEnd: false });
  const [isWalking, setIsWalking] = useState(false);

  const items = useMemo(() => {
    return businesses
      .filter((business) => (featuredOnly ? business.isFeatured : true))
      .filter((business) => selectedCategory === "Todos" || business.category === selectedCategory)
      .sort((a, b) => (b.planPriority ?? 1) - (a.planPriority ?? 1) || Number(b.isFeatured) - Number(a.isFeatured))
      .slice(0, limit || businesses.length);
  }, [businesses, featuredOnly, limit, selectedCategory]);

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
  }, [businesses, carousel, items, syncCarouselState]);

  useEffect(() => {
    return () => {
      if (walkTimeoutRef.current) clearTimeout(walkTimeoutRef.current);
    };
  }, []);

  return (
    <section className={`${showHeading ? "bg-mist" : "bg-white"} px-5 md:px-8 ${showHeading ? "py-20 md:py-28" : "py-12 md:py-14"}`}>
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow={t("businesses.eyebrow")}
            title={t("businesses.title")}
            copy={t("businesses.copy")}
          />
        ) : null}
        {showFilters ? (
          <div className="mb-10 rounded-lg bg-white p-6 ring-1 ring-canopy/10">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">{t("businesses.filterTitle")}</p>
                <p className="mt-2 text-sm text-volcanic">{t("businesses.filterCopy")}</p>
              </div>
              <p className="text-sm font-bold text-canopy">
                {items.length} {items.length === 1 ? t("results.singular") : t("results.plural")}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {["Todos", ...businessCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-12 rounded-md px-4 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-river focus:ring-offset-2 ${
                    selectedCategory === category
                      ? "bg-canopy text-white"
                      : "bg-white text-canopy ring-1 ring-canopy/25 hover:bg-sand"
                  }`}
                >
                  {category === "Todos" ? t("filters.all") : tv(category)}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className={carousel ? `${showHeading || showFilters ? "mt-12" : ""} relative` : showHeading || showFilters ? "mt-12" : ""}>
          {carousel ? <SwipeHint hidden={carouselState.atEnd || carouselState.scrollProgress > 0.02} /> : null}
          {carousel ? <CherengaWalk active={isWalking} /> : null}
          <div
            ref={carouselRef}
            onScroll={carousel ? () => syncCarouselState(true) : undefined}
            className={
              carousel
                ? "site-carousel flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 pr-24"
                : "grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            }
          >
            {items.map((business) => (
              <div key={business.id} className={carousel ? "w-[82vw] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]" : ""}>
                <BusinessCard
                  business={business}
                  imageSizes={carousel ? "(max-width: 639px) 82vw, 24rem" : undefined}
                />
              </div>
            ))}
            {carousel ? <CarouselMoreCard href="/negocios" label={t("card.more")} progress={carouselState.endProgress} /> : null}
          </div>
        </div>
        {featuredOnly && !carousel ? (
          <div className="mt-10 text-center">
            <Link
              href="/negocios"
              className="inline-flex items-center gap-2 rounded-md bg-forest px-6 py-4 text-sm font-bold text-white transition hover:bg-canopy"
            >
              {t("businesses.directoryCta")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
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

function CarouselMoreCard({ href, label, progress }: { href: string; label: string; progress: number }) {
  return (
    <Link
      href={href}
      className="group flex min-h-[32rem] w-36 shrink-0 snap-end items-center justify-center px-4 text-canopy transition hover:-translate-y-1"
      style={{ transform: `translateX(${Math.round((1 - progress) * 18)}px)` }}
    >
      <span className="flex items-center gap-3 rounded-full bg-canopy px-4 py-3 text-sm font-bold text-white shadow-sm">
        {label}
        <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
