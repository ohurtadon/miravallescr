"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
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
  const { t, tv } = useI18n();

  const items = useMemo(() => {
    return experiences
      .filter((experience) => (featuredOnly ? experience.isFeatured : true))
      .filter((experience) => selectedCategory === "Todos" || experience.category === selectedCategory)
      .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
      .slice(0, limit || experiences.length);
  }, [featuredOnly, limit, selectedCategory]);

  return (
    <section className={`bg-white px-5 md:px-8 ${showHeading ? "py-20 md:py-28" : "py-12 md:py-14"}`}>
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow={t("experiences.eyebrow")}
            title={t("experiences.title")}
            copy={t("experiences.copy")}
          />
        ) : null}
        {showFilters ? (
          <div className="mb-10 rounded-lg bg-mist p-6 ring-1 ring-canopy/10">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">{t("experiences.filterTitle")}</p>
                <p className="mt-2 text-sm text-volcanic">{t("experiences.filterCopy")}</p>
              </div>
              <p className="text-sm font-bold text-canopy">
                {items.length} {items.length === 1 ? t("results.singular") : t("results.plural")}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {["Todos", ...experienceCategories].map((category) => (
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
        <div className={`${showHeading || showFilters ? "mt-12" : ""} grid gap-5 md:grid-cols-3`}>
          {items.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}
