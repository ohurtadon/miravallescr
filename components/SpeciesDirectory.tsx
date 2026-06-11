"use client";

import Image from "next/image";
import { Leaf, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { SiteSpecies } from "@/lib/site-api";

type SpeciesDirectoryProps = {
  species: SiteSpecies[];
  type: "flora" | "fauna";
};

export function SpeciesDirectory({ species, type }: SpeciesDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<SiteSpecies | null>(null);

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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">Filtrar {type === "fauna" ? "fauna" : "flora"}</p>
            <p className="mt-2 text-sm text-volcanic">Busca por nombre o selecciona una categoría.</p>
          </div>
          <p className="text-sm font-bold text-canopy">
            {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
          </p>
        </div>
        <label className="relative mt-5 block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-river" aria-hidden="true" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar especie..."
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
              {category}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="group overflow-hidden rounded-lg bg-white text-left shadow-sm ring-1 ring-canopy/10 transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-mist">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.commonName}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              ) : (
                <div className="grid h-full place-items-center text-forest">
                  <Leaf className="size-12" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss">{item.category}</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-canopy">{item.commonName}</h2>
              {item.scientificName ? <p className="mt-1 text-sm italic text-volcanic">{item.scientificName}</p> : null}
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-volcanic">{item.summary}</p>
            </div>
          </button>
        ))}
      </div>

      {active ? <SpeciesModal species={active} onClose={() => setActive(null)} /> : null}
    </>
  );
}

function SpeciesModal({ species, onClose }: { species: SiteSpecies; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-canopy/85 p-5" role="dialog" aria-modal="true" onClick={onClose}>
      <article className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-lg bg-white shadow-soft" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-canopy/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss">{species.category}</p>
          <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-md bg-mist text-canopy" aria-label="Cerrar">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-80 bg-mist">
            {species.image ? (
              <Image src={species.image} alt={species.commonName} fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
            ) : (
              <div className="grid h-full place-items-center text-forest">
                <Leaf className="size-16" aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="p-7">
            <h2 className="font-display text-5xl font-bold text-canopy">{species.commonName}</h2>
            {species.scientificName ? <p className="mt-2 text-lg italic text-volcanic">{species.scientificName}</p> : null}
            <p className="mt-5 text-lg leading-8 text-volcanic">{species.description}</p>
            <dl className="mt-7 grid gap-4 text-sm">
              {species.habitat ? (
                <div className="rounded-md bg-mist p-4">
                  <dt className="font-bold text-canopy">Hábitat</dt>
                  <dd className="mt-1 text-volcanic">{species.habitat}</dd>
                </div>
              ) : null}
              {species.conservationStatus ? (
                <div className="rounded-md bg-mist p-4">
                  <dt className="font-bold text-canopy">Estado de conservación</dt>
                  <dd className="mt-1 text-volcanic">{species.conservationStatus}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </article>
    </div>
  );
}
