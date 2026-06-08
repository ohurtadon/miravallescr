import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="bg-forest px-5 py-20 text-white md:px-8 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-sand">Plan de viaje</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
            ¿Listo para descubrir Miravalles?
          </h2>
        </div>
        <Link
          href="/contacto"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-sand px-6 py-4 text-sm font-bold text-canopy transition hover:bg-white"
        >
          Planifica tu visita
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
