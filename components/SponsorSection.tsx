import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SiteSponsor } from "@/lib/site-api";
import { SectionHeading } from "./SectionHeading";

type SponsorSectionProps = {
  sponsors: SiteSponsor[];
  compact?: boolean;
  showHeading?: boolean;
};

export function SponsorSection({ sponsors, compact = false, showHeading = true }: SponsorSectionProps) {
  const activeSponsors = sponsors.filter((sponsor) => sponsor.active);

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
            eyebrow="Patrocinadores"
            title="Aliados que apoyan el desarrollo turístico de Miravalles"
            copy="Espacios preparados para reconocer a negocios, organizaciones y emprendimientos que impulsan una promoción turística responsable."
          />
        ) : null}
        <div className={`${compact || !showHeading ? "mt-0" : "mt-12"} grid gap-4 md:grid-cols-3`}>
          {activeSponsors.map((sponsor) => {
            const href = sponsor.website || "/alianzas";
            const external = /^https?:\/\//i.test(href);
            const content = (
              <div className="flex items-start gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-forest font-bold text-white">
                  {sponsor.logo}
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss">{sponsor.level}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-canopy">{sponsor.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-volcanic">{sponsor.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-forest">
                    Conocer aliado
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </div>
            );

            return external ? (
              <a key={sponsor.id} href={href} target="_blank" rel="noopener noreferrer" className="group rounded-lg bg-mist p-6 ring-1 ring-canopy/10 transition hover:-translate-y-1 hover:shadow-soft">
                {content}
              </a>
            ) : (
              <Link key={sponsor.id} href={href} className="group rounded-lg bg-mist p-6 ring-1 ring-canopy/10 transition hover:-translate-y-1 hover:shadow-soft">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
