"use client";

import { useMemo, useState } from "react";
import type { SiteExperience } from "@/lib/site-api";
import { ExperienceCard } from "./ExperienceCard";
import { SectionHeading } from "./SectionHeading";

type ExperiencesSectionProps = {
  experiences: SiteExperience[];
  experienceCategories: string[];
  featuredOnly?: boolean;
  limit?: number;
  showHeading?: boolean;
  showFilters?: boolean;
};

export function ExperiencesSection({
  experiences,
  experienceCategories,
  featuredOnly = false,
  limit,
  showHeading = true,
  showFilters = false
}: ExperiencesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const items = useMemo(() => {
    return experiences
      .filter((experience) => (featuredOnly ? experience.isFeatured : true))
      .filter((experience) => selectedCategory === "Todos" || experience.category === selectedCategory)
      .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
      .slice(0, limit || experiences.length);
  }, [featuredOnly, limit, selectedCategory]);

  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow="Experiencias"
            title="Actividades para viajar con intención"
            copy="Opciones promocionables de medio día o día completo, listas para conectar visitantes con guías, operadores y emprendimientos locales."
          />
        ) : null}
        {showFilters ? (
          <div className="mb-10 rounded-lg bg-mist p-6 ring-1 ring-canopy/10">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">Filtrar experiencias</p>
                <p className="mt-2 text-sm text-volcanic">Selecciona una categoría para ver actividades relacionadas.</p>
              </div>
              <p className="text-sm font-bold text-canopy">
                {items.length} {items.length === 1 ? "resultado" : "resultados"}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Todos", ...experienceCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-md px-4 py-3 text-sm font-bold transition ${
                    selectedCategory === category
                      ? "bg-forest text-white"
                      : "bg-white text-volcanic ring-1 ring-canopy/10 hover:bg-sand hover:text-canopy"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}
