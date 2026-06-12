import Image from "next/image";
import { ArrowDown, MapPin, Store } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-canopy text-white">
      <Image
        src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=65"
        alt="Bosque tropical en la region del Volcan Miravalles, Guanacaste"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,20,0.94),rgba(18,52,39,0.74),rgba(18,52,39,0.38))]" />
      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-end px-5 pb-20 pt-32 md:px-8 md:pb-24">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-semibold ring-1 ring-white/25 backdrop-blur">
            <MapPin className="size-4" aria-hidden="true" />
            Guia regional y plataforma turistica
          </div>
          <h1 className="font-display text-5xl font-bold leading-[0.98] text-white text-balance drop-shadow-[0_3px_18px_rgba(0,0,0,0.45)] md:text-7xl lg:text-8xl">
            Miravalles CR: naturaleza, termales y aventura local
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white md:text-xl">
            Explora atractivos, experiencias y negocios locales alrededor del Volcan Miravalles, en Guanacaste.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#atractivos"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-sand px-6 py-4 text-sm font-bold text-canopy transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-canopy"
            >
              Explorar Miravalles
              <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/alianzas"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white/14 px-6 py-4 text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/24 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-canopy"
            >
              Registrar mi negocio
              <Store className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-mist to-transparent" />
    </section>
  );
}
