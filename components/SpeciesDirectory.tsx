"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { SiteSpecies } from "@/lib/site-api";
import { ScrollReveal } from "./ScrollReveal";

type SpeciesDirectoryProps = {
  species: SiteSpecies[];
  type: "flora" | "fauna";
};

export function SpeciesDirectory({ species, type }: SpeciesDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const { t, tv } = useI18n();

  const items = useMemo(() => species.filter((item) => item.type === type), [species, type]);
  const categories = useMemo(() => ["Todos", ...new Set(items.map((item) => item.category).filter(Boolean))], [items]);
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items
      .filter((item) => selectedCategory === "Todos" || item.category === selectedCategory)
      .filter((item) => {
        if (!query) return true;
        return [item.commonName, item.scientificName, item.category, item.summary]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(query));
      })
      .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || a.commonName.localeCompare(b.commonName));
  }, [items, search, selectedCategory]);

  return (
    <>
      <section className="rounded-lg bg-white p-6 ring-1 ring-canopy/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">{tv(`Filtrar ${type === "fauna" ? "fauna" : "flora"}`)}</p>
            <p className="mt-2 text-sm text-volcanic">{tv("Busca por nombre o selecciona una categoría.")}</p>
          </div>
          <p className="text-sm font-bold text-canopy">
            {filtered.length} {filtered.length === 1 ? t("results.singular") : t("results.plural")}
          </p>
        </div>
        <label className="relative mt-5 block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-river" aria-hidden="true" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={tv("Buscar especie...")}
            className="h-12 w-full rounded-md border border-canopy/15 bg-mist pl-10 pr-3 text-sm outline-none transition focus:border-river focus:bg-white"
          />
        </label>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((category) => (
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
              {tv(category)}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <ScrollReveal key={item.id} className="h-full" delay={(index % 3) * 0.04} y={14}>
            <Link
              href={`/flora-fauna/${item.slug}`}
              className="rv-card-interactive group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-canopy/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.commonName}
                    fill
                    className="rv-media-zoom object-cover"
                    sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-forest">
                    <Leaf className="size-12" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="line-clamp-1 text-xs font-bold uppercase tracking-[0.18em] text-moss" title={tv(item.category)}>{tv(item.category)}</p>
                <h2 className="mt-3 line-clamp-2 min-h-[4.5rem] font-display text-3xl font-bold leading-tight text-canopy" title={item.commonName}>{item.commonName}</h2>
                {item.scientificName ? <p className="mt-1 line-clamp-1 text-sm italic text-volcanic" title={item.scientificName}>{item.scientificName}</p> : <p className="mt-1 min-h-5 text-sm italic text-volcanic" aria-hidden="true">&nbsp;</p>}
                <p className="mt-3 line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-volcanic" title={item.summary || item.description}>{item.summary || item.description}</p>
                {item.habitat || item.conservationStatus ? (
                  <dl className="mt-5 grid gap-3 text-sm">
                    {item.habitat ? (
                      <div className="rounded-md bg-mist p-4">
                        <dt className="font-bold text-canopy">{tv("Hábitat")}</dt>
                        <dd className="mt-1 line-clamp-2 text-volcanic" title={item.habitat}>{item.habitat}</dd>
                      </div>
                    ) : null}
                    {item.conservationStatus ? (
                      <div className="rounded-md bg-mist p-4">
                        <dt className="font-bold text-canopy">{tv("Estado de conservación")}</dt>
                        <dd className="mt-1 line-clamp-2 text-volcanic" title={item.conservationStatus}>{item.conservationStatus}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : null}
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-forest transition group-hover:text-canopy">
                  {tv("Ver ficha completa")}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
