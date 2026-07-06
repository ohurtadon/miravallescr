import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Home, MapPin, MessageCircle, Ruler, Search } from "lucide-react";
import { ImageCarousel } from "@/components/ImageCarousel";
import { PageViewTracker } from "@/components/PageViewTracker";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData, withWhatsAppMessage } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";
import { buildPropertyJsonLd } from "@/lib/structured-data";

type PropertyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { properties } = await getSiteData();
  const property = properties.find((item) => item.slug === slug);
  if (!property) return {};

  return buildPageMetadata({
    title: property.title,
    description: property.description,
    path: `/propiedades/${property.slug}`,
    image: property.images[0] || property.image
  });
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const { contact, properties } = await getSiteData();
  const property = properties.find((item) => item.slug === slug);
  if (!property) notFound();

  const related = properties.filter((item) => item.slug !== property.slug).slice(0, 3);
  const whatsappHref = withWhatsAppMessage(
    contact.whatsapp,
    `Hola, te descubrí en Raíz Volcánica y quiero consultar sobre la propiedad: ${property.title}.`
  );
  const jsonLd = buildPropertyJsonLd(property);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageViewTracker targetType="property" targetId={property.id} targetCategory={property.type} />
      <SimplePage eyebrow={`${property.operation} · ${property.type}`} title={property.title} description={property.description}>
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <ImageCarousel
              images={property.images}
              alt={property.title}
              aspectClass="aspect-[16/10]"
              sizes="(min-width: 1024px) 62vw, 100vw"
              priority
            />
            <article className="rounded-lg bg-white p-7 ring-1 ring-canopy/10">
              <div className="flex flex-wrap gap-2">
                {property.isFeatured ? (
                  <span className="inline-flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-xs font-bold text-canopy">
                    <BadgeCheck className="size-4" aria-hidden="true" />
                    Propiedad destacada
                  </span>
                ) : null}
                <span className="rounded-md bg-mist px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-moss">
                  {property.operation}
                </span>
              </div>
              <h2 className="mt-6 font-display text-4xl font-bold text-canopy">Sobre la propiedad</h2>
              <p className="mt-4 text-lg leading-8 text-volcanic">{property.description}</p>
              <p className="mt-4 text-lg leading-8 text-volcanic">
                Esta ficha reúne información comercial, condiciones generales, detalles de ubicación y contacto para valorar la oportunidad con mejor contexto.
              </p>
            </article>
          </div>
          <aside className="space-y-5">
            <div className="rounded-lg bg-white p-6 ring-1 ring-canopy/10">
              <h2 className="font-display text-3xl font-bold text-canopy">Detalles</h2>
              <dl className="mt-6 grid gap-4 text-sm">
                <Detail icon={<MapPin className="size-5" />} label="Ubicación" value={property.location} />
                <Detail icon={<Home className="size-5" />} label="Área" value={property.area} />
                <Detail icon={<Ruler className="size-5" />} label="Terreno" value={property.landSize} />
                <Detail icon={<Search className="size-5" />} label="Tipo" value={property.type} />
              </dl>
              <p className="mt-6 rounded-md bg-mist p-4 font-display text-2xl font-bold text-forest">{property.price}</p>
              <Link
                href={property.contactUrl}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-mist px-5 py-4 text-sm font-bold text-canopy ring-1 ring-canopy/10 transition hover:bg-sand"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Consultar propiedad
              </Link>
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-5 py-4 text-sm font-bold text-white transition hover:bg-canopy"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Contactar por WhatsApp
                </a>
              ) : null}
            </div>
          </aside>
        </div>
        {related.length ? (
          <section className="mt-14">
            <h2 className="font-display text-4xl font-bold text-canopy">Propiedades relacionadas</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.id} href={`/propiedades/${item.slug}`} className="rv-card-interactive overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-canopy/10">
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss">{item.type}</p>
                    <h3 className="mt-3 font-display text-3xl font-bold text-canopy">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-volcanic">{item.description}</p>
                    <p className="mt-5 font-display text-2xl font-bold text-forest">{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
        <div className="-mx-5 mt-12 md:-mx-8">
          <RecommendedSlot placement="property-detail" />
        </div>
      </SimplePage>
    </>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 text-river">{icon}</span>
      <div>
        <dt className="font-bold text-canopy">{label}</dt>
        <dd className="text-volcanic">{value}</dd>
      </div>
    </div>
  );
}
