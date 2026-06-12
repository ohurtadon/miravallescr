import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";

export function CallToAction() {
  return (
    <section className="bg-forest px-5 py-20 text-white md:px-8 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-sand">Plan de viaje</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
            Explore Miravalles o sume su negocio local
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
            Conectamos visitantes con atractivos, experiencias y emprendimientos de la region mediante contacto directo.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/contacto"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-sand px-6 py-4 text-sm font-bold text-canopy transition hover:bg-white"
          >
            Planificar visita
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/alianzas"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white/10 px-6 py-4 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-white/18"
          >
            Registrar negocio
            <Store className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
