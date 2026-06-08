import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DiscoverSection() {
  return (
    <section className="bg-mist px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-soft">
          <Image
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1300&q=80"
            alt="Panorama verde de montaña"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 52vw, 100vw"
          />
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-moss">Descubre Miravalles</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-canopy text-balance md:text-6xl">
            Un territorio vivo entre volcán, agua y bosque.
          </h2>
          <p className="mt-6 text-lg leading-8 text-volcanic">
            Miravalles reúne rutas de montaña, aguas termales, ríos frescos y una biodiversidad que invita a
            viajar con calma. Es una puerta a la naturaleza de Guanacaste para quienes buscan aventura,
            descanso y turismo sostenible.
          </p>
          <Link
            href="/atractivos"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-forest px-6 py-4 text-sm font-bold text-white transition hover:bg-canopy"
          >
            Conocer más
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
