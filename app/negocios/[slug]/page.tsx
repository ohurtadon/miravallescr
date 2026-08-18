import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Clock, ExternalLink, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { ImageCarousel } from "@/components/ImageCarousel";
import { PromoSlot } from "@/components/PromoSlot";
import { SimplePage } from "@/components/SimplePage";
import { getGoogleMapsDirectionsUrl } from "@/lib/google-maps";
import { getSiteData, withWhatsAppMessage } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";
import { buildBusinessJsonLd } from "@/lib/structured-data";
import { PageViewTracker } from "@/components/PageViewTracker";

type BusinessPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { businesses } = await getSiteData();
  const business = businesses.find((item) => item.slug === slug);
  if (!business) return {};

  return buildPageMetadata({
    title: business.name,
    description: business.description,
    path: `/negocios/${business.slug}`,
    image: business.images[0]
  });
}

export default async function BusinessDetailPage({ params }: BusinessPageProps) {
  const { slug } = await params;
  const siteData = await getSiteData();
  const { businesses } = siteData;
  const business = businesses.find((item) => item.slug === slug);
  if (!business) notFound();
  const whatsappHref = withWhatsAppMessage(
    business.whatsapp,
    `Hola, te descubrí en ${siteData.siteName} y quiero saber más...`
  );
  const businessBadgeLabel = getBusinessBadgeLabel(business);
  const jsonLd = buildBusinessJsonLd(business);

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <PageViewTracker targetType="business" targetId={business.id} targetCategory={business.category} />
    <SimplePage eyebrow={business.category} title={business.name} description={business.description}>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <ImageCarousel
            images={business.images}
            alt={business.name}
            aspectClass="aspect-[16/10]"
            sizes="(min-width: 1024px) 62vw, 100vw"
            priority
            viewTransitionName={`business-${business.slug}`}
          />
          <article className="rounded-lg bg-white p-7 ring-1 ring-canopy/10">
            <div className="flex flex-wrap gap-2">
              {businessBadgeLabel ? (
                <span className="inline-flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-xs font-bold text-canopy">
                  <BadgeCheck className="size-4" aria-hidden="true" />
                  {businessBadgeLabel}
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
              {business.email ? (
                <p className="flex gap-3">
                  <Mail className="size-5 shrink-0 text-river" aria-hidden="true" />
                  {business.email}
                </p>
              ) : null}
            </div>
            <div className="mt-6 grid gap-2">
              {whatsappHref ? (
                <Link
                  href={whatsappHref}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-forest px-5 py-4 text-sm font-bold text-white transition hover:bg-canopy"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Contactar por WhatsApp
                </Link>
              ) : null}
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">Cómo llegar</p>
            <div className="mt-4 grid min-h-40 place-items-center rounded-lg bg-white/70 p-5 text-center ring-1 ring-canopy/10">
              <div>
                <MapPin className="mx-auto size-9 text-forest" aria-hidden="true" />
                <p className="mt-2 text-sm font-bold text-canopy">{business.location}</p>
                <p className="mt-2 text-xs leading-5 text-volcanic">Abra la ruta en Google Maps para navegar hasta este destino.</p>
              </div>
            </div>
            <a
              href={getGoogleMapsDirectionsUrl({
                coordinates: business.coordinates,
                fallbackDestination: `${business.name}, ${business.location}`
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-5 py-4 text-sm font-bold text-white transition hover:bg-canopy"
            >
              <Navigation className="size-4" aria-hidden="true" />
              Cómo llegar en Google Maps
            </a>
          </div>
        </aside>
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <PromoSlot placement="business-detail" businesses={siteData.businesses.filter((item) => item.id !== business.id)} experiences={siteData.experiences} properties={siteData.properties} />
      </div>
    </SimplePage>
    </>
  );
}

function getBusinessBadgeLabel(business: { isFeatured: boolean; canShowRecommendedBadge?: boolean; isSponsor?: boolean; sponsorLevel?: string }) {
  const labels: string[] = [];

  if (business.canShowRecommendedBadge) return "Negocio recomendado";
  if (business.isFeatured) labels.push("Socio destacado");
  if (business.isSponsor) labels.push(formatSponsorLevel(business.sponsorLevel));

  return labels.filter(Boolean).join(" · ");
}

function formatSponsorLevel(level?: string) {
  const normalizedLevel = level?.trim();
  if (!normalizedLevel) return "Patrocinador";

  return `Patrocinador ${normalizedLevel.toLocaleLowerCase("es-CR")}`;
}
