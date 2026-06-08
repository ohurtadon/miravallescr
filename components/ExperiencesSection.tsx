import { Clock, Gauge, SunMedium } from "lucide-react";
import { experiences } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

export function ExperiencesSection() {
  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Experiencias"
          title="Actividades para viajar con intención"
          copy="Opciones de medio día o día completo para disfrutar la zona sin perder su ritmo natural."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {experiences.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-lg bg-mist p-7 ring-1 ring-canopy/10">
                <div className="mb-8 flex size-14 items-center justify-center rounded-full bg-forest text-white">
                  <Icon className="size-7" aria-hidden="true" />
                </div>
                <h3 className="font-display text-3xl font-bold text-canopy">{item.title}</h3>
                <dl className="mt-7 grid gap-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-river" aria-hidden="true" />
                    <div>
                      <dt className="font-bold text-canopy">Duración</dt>
                      <dd className="text-volcanic">{item.duration}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gauge className="size-5 text-river" aria-hidden="true" />
                    <div>
                      <dt className="font-bold text-canopy">Dificultad</dt>
                      <dd className="text-volcanic">{item.difficulty}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <SunMedium className="size-5 text-river" aria-hidden="true" />
                    <div>
                      <dt className="font-bold text-canopy">Mejor época</dt>
                      <dd className="text-volcanic">{item.season}</dd>
                    </div>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
