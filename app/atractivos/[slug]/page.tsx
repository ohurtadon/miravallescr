import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageCarousel } from "@/components/ImageCarousel";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";
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

  return {
    title: attraction.title,
    description: attraction.summary
  };
}

export default async function AttractionDetailPage({ params }: AttractionPageProps) {
  const { slug } = await params;
  const { attractions } = await getSiteData();
  const attraction = attractions.find((item) => item.slug === slug);
  if (!attraction) notFound();

  return (
    <>
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
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">Ficha inicial</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-canopy">{attraction.title}</h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-volcanic">
          <p>
            Esta página funciona como base editorial para ampliar información específica del atractivo, agregar
            fotografías reales, recomendaciones de acceso, horarios sugeridos y buenas prácticas de visita.
          </p>
          <p>
            En esta fase se deja lista la ruta estática para SEO y navegación. El contenido local detallado puede
            incorporarse conforme se valide con guías, comercios y comunidad.
          </p>
        </div>
      </div>
    </SimplePage>
    </>
  );
}
