import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Clock, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { PromoSlot } from "@/components/PromoSlot";
import { SimplePage } from "@/components/SimplePage";
import { businesses } from "@/data/site";

type BusinessPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return businesses.map((business) => ({ slug: business.slug }));
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = businesses.find((item) => item.slug === slug);
  if (!business) return {};

  return {
    title: business.name,
    description: business.description
  };
}

export default async function BusinessDetailPage({ params }: BusinessPageProps) {
  const { slug } = await params;
  const business = businesses.find((item) => item.slug === slug);
  if (!business) notFound();

  return (
    <SimplePage eyebrow={business.category} title={business.name} description={business.description}>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {business.images.map((image, index) => (
              <div key={image} className={`relative overflow-hidden rounded-lg ${index === 0 ? "aspect-[16/10] md:col-span-2" : "aspect-[4/3]"}`}>
                <Image src={image} alt={`${business.name} ${index + 1}`} fill className="object-cover" sizes="(min-width: 1024px) 60vw, 100vw" />
              </div>
            ))}
          </div>
          <article className="rounded-lg bg-white p-7 ring-1 ring-canopy/10">
            <div className="flex flex-wrap gap-2">
              {business.isFeatured ? (
                <span className="inline-flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-xs font-bold text-canopy">
                  <BadgeCheck className="size-4" aria-hidden="true" />
                  Socio destacado
                </span>
              ) : null}
              {business.isSponsor ? (
                <span className="rounded-md bg-mist px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-moss">
                  Patrocinador {business.sponsorLevel}
                </span>
              ) : null}
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold text-canopy">Sobre el negocio</h2>
            <p className="mt-4 text-lg leading-8 text-volcanic">{business.longDescription}</p>
            <h3 className="mt-8 font-display text-3xl font-bold text-canopy">Servicios ofrecidos</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {business.services.map((service) => (
                <span key={service} className="rounded-md bg-mist px-3 py-2 text-sm font-semibold text-volcanic">
                  {service}
                </span>
              ))}
            </div>
          </article>
        </div>
        <aside className="space-y-5">
          <div className="rounded-lg bg-white p-6 ring-1 ring-canopy/10">
            <h2 className="font-display text-3xl font-bold text-canopy">Contacto y ubicación</h2>
            <div className="mt-5 grid gap-4 text-sm text-volcanic">
              <p className="flex gap-3">
                <MapPin className="size-5 shrink-0 text-river" aria-hidden="true" />
                {business.location}
              </p>
              {business.openingHours ? (
                <p className="flex gap-3">
                  <Clock className="size-5 shrink-0 text-river" aria-hidden="true" />
                  {business.openingHours}
                </p>
              ) : null}
              {business.phone ? (
                <p className="flex gap-3">
                  <Phone className="size-5 shrink-0 text-river" aria-hidden="true" />
                  {business.phone}
                </p>
              ) : null}
            </div>
            <div className="mt-6 grid gap-2">
              <Link
                href={business.whatsapp || "/contacto"}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-forest px-5 py-4 text-sm font-bold text-white transition hover:bg-canopy"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Contactar por WhatsApp
              </Link>
              {business.website ? (
                <Link
                  href={business.website}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-mist px-5 py-4 text-sm font-bold text-canopy ring-1 ring-canopy/10 transition hover:bg-sand"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  Visitar sitio
                </Link>
              ) : null}
            </div>
          </div>
          <div className="rounded-lg bg-[#dbe7d7] p-6 ring-1 ring-canopy/10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">Mapa</p>
            <div className="mt-4 grid min-h-52 place-items-center rounded-lg bg-[radial-gradient(circle_at_30%_40%,rgba(62,126,168,0.35),transparent_28%),linear-gradient(135deg,#f4f7f1,#dbe7d7)] text-center">
              <div>
                <MapPin className="mx-auto size-9 text-forest" aria-hidden="true" />
                <p className="mt-2 text-sm font-bold text-canopy">{business.location}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <PromoSlot index={0} />
      </div>
    </SimplePage>
  );
}
