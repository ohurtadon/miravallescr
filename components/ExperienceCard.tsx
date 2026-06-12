import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Clock, Gauge, MessageCircle } from "lucide-react";
import type { SiteExperience } from "@/lib/site-api";

type ExperienceCardProps = {
  experience: SiteExperience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-canopy/10 transition hover:-translate-y-1 hover:shadow-soft">
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
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-canopy">{experience.category}</p>
        <h3 className="mt-3 font-display text-3xl font-bold text-canopy">{experience.title}</h3>
        <p className="mt-3 text-sm leading-7 text-volcanic">{experience.description}</p>
        <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-river" aria-hidden="true" />
            <div>
              <dt className="font-bold text-canopy">Duración</dt>
              <dd className="text-volcanic">{experience.duration}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="size-4 text-river" aria-hidden="true" />
            <div>
              <dt className="font-bold text-canopy">Dificultad</dt>
              <dd className="text-volcanic">{experience.difficulty}</dd>
            </div>
          </div>
        </dl>
        <p className="mt-5 text-sm font-bold text-canopy">{experience.price || "Precio por definir"}</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <Link
            href={`/experiencias/${experience.slug}`}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-forest px-4 py-3 text-sm font-bold text-white transition hover:bg-canopy"
          >
            Consultar disponibilidad
          </Link>
          <Link
            href={experience.whatsapp || experience.contactUrl}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-bold text-canopy ring-1 ring-canopy/25 transition hover:bg-sand"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </Link>
        </div>
      </div>
    </article>
  );
}
