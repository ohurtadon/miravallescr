"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Clock, Gauge } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { SiteExperience } from "@/lib/site-api";
import { ScrollReveal } from "./ScrollReveal";
import { ViewTransition } from "./ViewTransition";

type ExperienceCardProps = {
  experience: SiteExperience;
  imageSizes?: string;
  delay?: number;
};

export function ExperienceCard({
  experience,
  imageSizes = "(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw",
  delay = 0
}: ExperienceCardProps) {
  const { t, tv } = useI18n();
  const fallbackPrice = t("card.fallbackPrice");
  const href = `/experiencias/${experience.slug}`;
  const cardClassName = "rv-card-interactive flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-canopy/10";
  const content = (
    <>
      <ViewTransition name={`experience-${experience.slug}`} share="morph" default="none">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            className="rv-media-zoom object-cover"
            sizes={imageSizes}
            loading="lazy"
          />
          {experience.isFeatured ? (
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-xs font-bold text-canopy shadow">
              <BadgeCheck className="size-4" aria-hidden="true" />
              {t("card.recommended")}
            </span>
          ) : null}
        </div>
      </ViewTransition>
      <div className="flex flex-1 flex-col p-6">
        <p className="line-clamp-1 text-xs font-bold uppercase tracking-[0.18em] text-canopy" title={tv(experience.category)}>{tv(experience.category)}</p>
        <h3 className="mt-3 line-clamp-2 min-h-[4.5rem] font-display text-3xl font-bold leading-tight text-canopy" title={experience.title}>{experience.title}</h3>
        <p className="mt-3 line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-volcanic" title={experience.description}>{experience.description}</p>
        <dl className="mt-5 grid min-h-[4rem] gap-3 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0 text-river" aria-hidden="true" />
            <div className="min-w-0">
              <dt className="font-bold text-canopy">{t("card.duration")}</dt>
              <dd className="line-clamp-1 text-volcanic" title={experience.duration}>{experience.duration}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="size-4 shrink-0 text-river" aria-hidden="true" />
            <div className="min-w-0">
              <dt className="font-bold text-canopy">{t("card.difficulty")}</dt>
              <dd className="line-clamp-1 text-volcanic" title={tv(experience.difficulty)}>{tv(experience.difficulty)}</dd>
            </div>
          </div>
        </dl>
        <p className="mt-5 line-clamp-1 text-sm font-bold text-canopy" title={experience.price || fallbackPrice}>{experience.price || fallbackPrice}</p>
      </div>
    </>
  );

  return (
    <ScrollReveal className="h-full" y={14} delay={delay}>
      <Link href={href} className={`group ${cardClassName}`} aria-label={`${t("card.more")}: ${experience.title}`}>
        {content}
      </Link>
    </ScrollReveal>
  );
}
