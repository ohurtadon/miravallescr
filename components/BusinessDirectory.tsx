"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { SiteBusiness } from "@/lib/site-api";
import { BusinessCard } from "./BusinessCard";
import { SectionHeading } from "./SectionHeading";

type BusinessDirectoryProps = {
  businesses: SiteBusiness[];
  businessCategories: string[];
  featuredOnly?: boolean;
  limit?: number;
  showHeading?: boolean;
  showFilters?: boolean;
};

export function BusinessDirectory({
  businesses,
  businessCategories,
  featuredOnly = false,
  limit,
  showHeading = true,
  showFilters = false
}: BusinessDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const items = useMemo(() => {
    return businesses
      .filter((business) => (featuredOnly ? business.isFeatured : true))
      .filter((business) => selectedCategory === "Todos" || business.category === selectedCategory)
      .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
      .slice(0, limit || businesses.length);
  }, [featuredOnly, limit, selectedCategory]);

  return (
    <section className="bg-mist px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow="Negocios locales"
            title="Servicios turísticos con raíz local"
            copy="Un directorio preparado para conectar visitantes con hospedajes, restaurantes, guías, termales, transporte y productores de la zona."
          />
        ) : null}
        {showFilters ? (
          <div className="mb-10 rounded-lg bg-white p-6 ring-1 ring-canopy/10">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">Filtrar negocios</p>
                <p className="mt-2 text-sm text-volcanic">Selecciona una categoría para ajustar el directorio.</p>
              </div>
              <p className="text-sm font-bold text-canopy">
                {items.length} {items.length === 1 ? "resultado" : "resultados"}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Todos", ...businessCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-md px-4 py-3 text-sm font-bold transition ${
                    selectedCategory === category
                      ? "bg-forest text-white"
                      : "bg-mist text-volcanic ring-1 ring-canopy/10 hover:bg-sand hover:text-canopy"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
        {featuredOnly ? (
          <div className="mt-10 text-center">
            <Link
              href="/negocios"
              className="inline-flex items-center gap-2 rounded-md bg-forest px-6 py-4 text-sm font-bold text-white transition hover:bg-canopy"
            >
              Ver directorio completo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
