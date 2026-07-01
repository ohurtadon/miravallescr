"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { SiteSponsor } from "@/lib/site-api";
import { SectionHeading } from "./SectionHeading";

type SponsorSectionProps = {
  sponsors: SiteSponsor[];
  compact?: boolean;
  showHeading?: boolean;
};

export function SponsorSection({ sponsors, compact = false, showHeading = true }: SponsorSectionProps) {
  const activeSponsors = sponsors.filter((sponsor) => sponsor.active);
  const { t } = useI18n();

  return (
    <section
      className={`${
        compact
          ? "bg-white py-14"
          : `bg-white px-5 md:px-8 ${showHeading ? "py-20 md:py-28" : "py-12 md:py-14"}`
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {!compact && showHeading ? (
          <SectionHeading
            eyebrow={t("sponsors.eyebrow")}
            title={t("sponsors.title")}
            copy={t("sponsors.copy")}
          />
        ) : null}
        <div className={`${compact || !showHeading ? "mt-0" : "mt-12"} grid gap-4 md:grid-cols-3`}>
          {activeSponsors.map((sponsor) => {
            const href = sponsor.website || "/contacto#alianzas";
            const external = /^https?:\/\//i.test(href);
            const logoIsImage = /^https?:\/\//i.test(sponsor.logo) || sponsor.logo.startsWith("/");
            const content = (
              <div className="flex h-full items-start gap-4">
                <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white font-bold text-forest ring-1 ring-canopy/10">
                  {logoIsImage ? (
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      fill
                      className="object-contain p-1.5"
                      sizes="56px"
                    />
                  ) : (
                    sponsor.logo
                  )}
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="line-clamp-1 text-xs font-bold uppercase tracking-[0.18em] text-moss" title={sponsor.level}>{sponsor.level}</p>
                  <h3 className="mt-2 line-clamp-2 min-h-[4rem] font-display text-2xl font-bold leading-tight text-canopy" title={sponsor.name}>{sponsor.name}</h3>
                  <p className="mt-3 line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-volcanic" title={sponsor.description}>{sponsor.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-forest">
                    {t("sponsors.cta")}
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </div>
            );

            return external ? (
              <a key={sponsor.id} href={href} target="_blank" rel="noopener noreferrer" className="group flex h-full rounded-lg bg-mist p-6 ring-1 ring-canopy/10 transition hover:-translate-y-1 hover:shadow-soft">
                {content}
              </a>
            ) : (
              <Link key={sponsor.id} href={href} className="group flex h-full rounded-lg bg-mist p-6 ring-1 ring-canopy/10 transition hover:-translate-y-1 hover:shadow-soft">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
