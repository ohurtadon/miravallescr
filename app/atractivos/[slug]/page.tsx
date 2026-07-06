import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Navigation } from "lucide-react";
import { ImageCarousel } from "@/components/ImageCarousel";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { getGoogleMapsDirectionsUrl } from "@/lib/google-maps";
import { getSiteData } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";
import { buildAttractionJsonLd } from "@/lib/structured-data";
import { PageViewTracker } from "@/components/PageViewTracker";

type AttractionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: AttractionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { attractions } = await getSiteData();
  const attraction = attractions.find((item) => item.slug === slug);
  if (!attraction) return {};

  return buildPageMetadata({
    title: attraction.title,
    description: attraction.summary,
    path: `/atractivos/${attraction.slug}`,
    image: attraction.images[0] || attraction.image
  });
}

export default async function AttractionDetailPage({ params }: AttractionPageProps) {
  const { slug } = await params;
  const { attractions } = await getSiteData();
  const attraction = attractions.find((item) => item.slug === slug);
  if (!attraction) notFound();
  const jsonLd = buildAttractionJsonLd(attraction);

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <PageViewTracker targetType="attraction" targetId={attraction.id} targetCategory={attraction.category} />
    <SimplePage eyebrow="Atractivo" title={attraction.title} description={attraction.summary}>
      <div className="mb-8">
        <ImageCarousel
          images={attraction.images}
          alt={attraction.title}
          aspectClass="aspect-[16/10]"
          sizes="(min-width: 1024px) 70vw, 100vw"
          priority
        />
      </div>
      <div className="grid gap-8 rounded-lg bg-white p-7 shadow-sm ring-1 ring-canopy/10 md:grid-cols-[0.8fr_1.2fr] md:p-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">Resumen del atractivo</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-canopy">{attraction.title}</h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-volcanic">
          <p>
            Esta ficha reúne información general del atractivo, su contexto natural y una primera guía para planificar
            una visita responsable.
          </p>
          <p>
            Use esta página para ubicar el lugar, revisar imágenes y conectar este punto con otras rutas, comunidades
            y experiencias cercanas.
          </p>
        </div>
      </div>
      <section className="mt-6 rounded-lg bg-[#dbe7d7] p-6 ring-1 ring-canopy/10 md:p-7">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">Cómo llegar</p>
            <p className="mt-3 flex gap-3 text-sm font-bold text-canopy">
              <MapPin className="size-5 shrink-0 text-forest" aria-hidden="true" />
              {attraction.location}
            </p>
            <p className="mt-2 text-sm leading-6 text-volcanic">Abra la ruta en Google Maps para navegar hasta este atractivo.</p>
          </div>
          <a
            href={getGoogleMapsDirectionsUrl({
              coordinates: attraction.coordinates,
              fallbackDestination: `${attraction.title}, ${attraction.location}`
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-canopy md:w-auto"
          >
            <Navigation className="size-4" aria-hidden="true" />
            Cómo llegar en Google Maps
          </a>
        </div>
      </section>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="attraction-detail" />
      </div>
    </SimplePage>
    </>
  );
}
