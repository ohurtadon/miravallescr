"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Home, MapPin, Ruler } from "lucide-react";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { SiteProperty } from "@/lib/site-api";
import { SectionHeading } from "./SectionHeading";

type PropertiesSectionProps = {
  properties: SiteProperty[];
  propertyOperations: string[];
  propertyTypes: string[];
  showHeading?: boolean;
};

export function PropertiesSection({ properties, propertyOperations, propertyTypes, showHeading = true }: PropertiesSectionProps) {
  const [selectedOperation, setSelectedOperation] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");
  const { t, tv } = useI18n();

  const filteredProperties = useMemo(() => {
    return properties
      .filter((property) => selectedOperation === "Todos" || property.operation === selectedOperation)
      .filter((property) => selectedType === "Todos" || property.type === selectedType)
      .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }, [selectedOperation, selectedType]);

  return (
    <section className={`${showHeading ? "bg-mist" : "bg-white"} px-5 md:px-8 ${showHeading ? "py-20 md:py-28" : "py-12 md:py-14"}`}>
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow={t("properties.eyebrow")}
            title={t("properties.title")}
            copy={t("properties.copy")}
          />
        ) : null}

        <div className={`${showHeading ? "mt-12" : ""} rounded-lg bg-white p-6 ring-1 ring-canopy/10`}>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">{t("properties.filterTitle")}</p>
              <p className="mt-2 text-sm text-volcanic">{t("properties.filterCopy")}</p>
            </div>
            <p className="text-sm font-bold text-canopy">
              {filteredProperties.length} {filteredProperties.length === 1 ? t("results.singular") : t("results.plural")}
            </p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <FilterGroup
              label={t("properties.operation")}
              options={["Todos", ...propertyOperations]}
              selected={selectedOperation}
              onSelect={setSelectedOperation}
            />
            <FilterGroup
              label={t("properties.type")}
              options={["Todos", ...propertyTypes]}
              selected={selectedType}
              onSelect={setSelectedType}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <article key={property.id} className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-canopy/10 transition hover:-translate-y-1 hover:shadow-soft">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  loading="lazy"
                />
                {property.isFeatured ? (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-xs font-bold text-canopy shadow">
                    <BadgeCheck className="size-4" aria-hidden="true" />
                    {t("properties.featured")}
                  </span>
                ) : null}
                <span className="absolute right-4 top-4 rounded-md bg-canopy/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
                  {tv(property.operation)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="line-clamp-1 text-xs font-bold uppercase tracking-[0.18em] text-moss" title={tv(property.type)}>{tv(property.type)}</p>
                <h3 className="mt-3 line-clamp-2 min-h-[4.5rem] font-display text-3xl font-bold leading-tight text-canopy" title={property.title}>{property.title}</h3>
                <p className="mt-3 line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-volcanic" title={property.description}>{property.description}</p>
                <div className="mt-5 grid min-h-[5.25rem] gap-3 text-sm text-volcanic">
                  <p className="flex min-w-0 items-center gap-2" title={property.location}>
                    <MapPin className="size-4 shrink-0 text-river" aria-hidden="true" />
                    <span className="line-clamp-1">{property.location}</span>
                  </p>
                  <p className="flex min-w-0 items-center gap-2" title={property.area}>
                    <Home className="size-4 shrink-0 text-river" aria-hidden="true" />
                    <span className="line-clamp-1">{property.area}</span>
                  </p>
                  <p className="flex min-w-0 items-center gap-2" title={property.landSize}>
                    <Ruler className="size-4 shrink-0 text-river" aria-hidden="true" />
                    <span className="line-clamp-1">{property.landSize}</span>
                  </p>
                </div>
                <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="line-clamp-1 font-display text-2xl font-bold text-forest" title={property.price}>{property.price}</p>
                  <Link
                    href={`/propiedades/${property.slug}`}
                    className="inline-flex items-center justify-center rounded-md bg-forest px-4 py-3 text-sm font-bold text-white transition hover:bg-canopy"
                  >
                    {t("card.more")}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  options,
  selected,
  onSelect
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  const { t, tv } = useI18n();

  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-canopy">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`rounded-md px-4 py-3 text-sm font-bold transition ${
              selected === option
                ? "bg-forest text-white"
                : "bg-mist text-volcanic ring-1 ring-canopy/10 hover:bg-sand hover:text-canopy"
            }`}
          >
            {option === "Todos" ? t("filters.all") : tv(option)}
          </button>
        ))}
      </div>
    </div>
  );
}
