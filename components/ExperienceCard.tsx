import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Clock, Gauge } from "lucide-react";
import type { SiteExperience } from "@/lib/site-api";

type ExperienceCardProps = {
  experience: SiteExperience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-canopy/10 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
        />
        {experience.isFeatured ? (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-xs font-bold text-canopy shadow">
            <BadgeCheck className="size-4" aria-hidden="true" />
            Recomendada
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="line-clamp-1 text-xs font-bold uppercase tracking-[0.18em] text-canopy" title={experience.category}>{experience.category}</p>
        <h3 className="mt-3 line-clamp-2 min-h-[4.5rem] font-display text-3xl font-bold leading-tight text-canopy" title={experience.title}>{experience.title}</h3>
        <p className="mt-3 line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-volcanic" title={experience.description}>{experience.description}</p>
        <dl className="mt-5 grid min-h-[4rem] gap-3 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0 text-river" aria-hidden="true" />
            <div className="min-w-0">
              <dt className="font-bold text-canopy">Duración</dt>
              <dd className="line-clamp-1 text-volcanic" title={experience.duration}>{experience.duration}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="size-4 shrink-0 text-river" aria-hidden="true" />
            <div className="min-w-0">
              <dt className="font-bold text-canopy">Dificultad</dt>
              <dd className="line-clamp-1 text-volcanic" title={experience.difficulty}>{experience.difficulty}</dd>
            </div>
          </div>
        </dl>
        <p className="mt-5 line-clamp-1 text-sm font-bold text-canopy" title={experience.price || "Precio por definir"}>{experience.price || "Precio por definir"}</p>
        <div className="mt-auto pt-6">
          <Link
            href={`/experiencias/${experience.slug}`}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-forest px-4 py-3 text-sm font-bold text-white transition hover:bg-canopy"
          >
            Ver más
          </Link>
        </div>
      </div>
    </article>
  );
}
