import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { attractions } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

export function AttractionsGrid() {
  return (
    <section id="atractivos" className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Principales atractivos"
          title="Rutas naturales para cada ritmo de viaje"
          copy="Agua, bosque, miradores y experiencias termales se combinan en un destino compacto y lleno de contrastes."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.slug}
                href={`/atractivos/${item.slug}`}
                className="group overflow-hidden rounded-lg bg-mist shadow-sm ring-1 ring-canopy/10 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-full bg-forest text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight className="size-5 text-moss transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-canopy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-volcanic">{item.summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
