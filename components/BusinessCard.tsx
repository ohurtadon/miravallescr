import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, MapPin, MessageCircle } from "lucide-react";
import type { SiteBusiness } from "@/lib/site-api";

type BusinessCardProps = {
  business: SiteBusiness;
};

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-lg bg-white shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-soft ${
        business.isFeatured ? "ring-moss/35" : "ring-canopy/10"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={business.images[0]}
          alt={business.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
        />
        {business.isFeatured ? (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-xs font-bold text-canopy shadow">
            <BadgeCheck className="size-4" aria-hidden="true" />
            Destacado
          </span>
        ) : null}
      </div>
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-canopy">{business.category}</p>
        <h3 className="mt-3 font-display text-3xl font-bold text-canopy">{business.name}</h3>
        <p className="mt-3 text-sm leading-7 text-volcanic">{business.description}</p>
        <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-canopy">
          <MapPin className="size-4 text-river" aria-hidden="true" />
          {business.location}
        </p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <Link
            href={`/negocios/${business.slug}`}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-forest px-4 py-3 text-sm font-bold text-white transition hover:bg-canopy"
          >
            Ver más
          </Link>
          <Link
            href={business.whatsapp || "/contacto"}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-bold text-canopy ring-1 ring-canopy/25 transition hover:bg-sand"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Contactar
          </Link>
        </div>
      </div>
    </article>
  );
}
