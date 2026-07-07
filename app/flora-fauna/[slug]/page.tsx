import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Feather, ImageOff, Leaf, Microscope, Mountain, ShieldCheck } from "lucide-react";
import { ImageCarousel } from "@/components/ImageCarousel";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";

type SpeciesPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: SpeciesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { species } = await getSiteData();
  const item = species.find((speciesItem) => speciesItem.slug === slug);
  if (!item) return {};

  return buildPageMetadata({
    title: item.commonName,
    description: item.summary || item.description,
    path: `/flora-fauna/${item.slug}`,
    image: item.images[0] || item.image
  });
}

export default async function SpeciesDetailPage({ params }: SpeciesPageProps) {
  const { slug } = await params;
  const siteData = await getSiteData();
  const species = siteData.species.find((item) => item.slug === slug);
  if (!species) notFound();

  const related = siteData.species
    .filter((item) => item.slug !== species.slug && (item.type === species.type || item.category === species.category))
    .slice(0, 3);
  const listingHref = species.type === "flora" ? "/flora-fauna/flora" : "/flora-fauna/fauna";
  const listingLabel = species.type === "flora" ? "Ver más flora" : "Ver más fauna";

  return (
    <SimplePage eyebrow={species.category} title={species.commonName} description={species.summary || species.description}>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          {species.images.length ? (
            <ImageCarousel
              images={species.images}
              alt={species.commonName}
              aspectClass="aspect-[16/10]"
              sizes="(min-width: 1024px) 65vw, 100vw"
              priority
            />
          ) : (
            <div className="grid aspect-[16/10] place-items-center rounded-lg bg-mist text-center ring-1 ring-canopy/10">
              <div className="px-6">
                <ImageOff className="mx-auto size-12 text-forest" aria-hidden="true" />
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-moss">Sin fotografías publicadas</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-volcanic">
                  Esta ficha está lista para mostrar imágenes cuando se agreguen desde el portal administrativo.
                </p>
              </div>
            </div>
          )}

          <article className="rounded-lg bg-white p-7 ring-1 ring-canopy/10">
            <div className="flex flex-wrap gap-2">
              {species.isFeatured ? (
                <span className="inline-flex items-center gap-2 rounded-md bg-sand px-3 py-2 text-xs font-bold text-canopy">
                  <BadgeCheck className="size-4" aria-hidden="true" />
                  Especie destacada
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2 rounded-md bg-mist px-3 py-2 text-xs font-bold text-canopy">
                {species.type === "flora" ? <Leaf className="size-4" aria-hidden="true" /> : <Feather className="size-4" aria-hidden="true" />}
                {species.type === "flora" ? "Flora" : "Fauna"}
              </span>
            </div>

            <h2 className="mt-6 font-display text-4xl font-bold text-canopy">Descripción</h2>
            {species.scientificName ? <p className="mt-2 text-base italic text-volcanic">{species.scientificName}</p> : null}
            <p className="mt-5 text-lg leading-8 text-volcanic">{species.description || species.summary}</p>
          </article>
        </div>

        <aside className="space-y-5">
          <div className="rounded-lg bg-white p-6 ring-1 ring-canopy/10">
            <h2 className="font-display text-3xl font-bold text-canopy">Datos de la especie</h2>
            <dl className="mt-6 grid gap-4 text-sm">
              <Detail icon={<Leaf className="size-5" />} label="Categoría" value={species.category} />
              {species.scientificName ? <Detail icon={<Microscope className="size-5" />} label="Nombre científico" value={species.scientificName} /> : null}
              {species.habitat ? <Detail icon={<Mountain className="size-5" />} label="Hábitat" value={species.habitat} /> : null}
              {species.conservationStatus ? <Detail icon={<ShieldCheck className="size-5" />} label="Estado de conservación" value={species.conservationStatus} /> : null}
            </dl>
            <Link
              href={listingHref}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-5 py-4 text-sm font-bold text-white transition hover:bg-canopy"
            >
              {listingLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-lg bg-[#dbe7d7] p-6 ring-1 ring-canopy/10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-moss">Observación responsable</p>
            <p className="mt-4 text-sm leading-7 text-volcanic">
              Mantén distancia, evita alimentar animales, no extraigas plantas ni semillas y camina con guía local cuando el sendero o la especie lo requiera.
            </p>
          </div>
        </aside>
      </div>

      {related.length ? (
        <section className="mt-14">
          <h2 className="font-display text-4xl font-bold text-canopy">Especies relacionadas</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/flora-fauna/${item.slug}`}
                className="rv-card-interactive group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-canopy/10"
              >
                <div className="relative aspect-[4/3] bg-mist">
                  {item.image ? (
                    <Image src={item.image} alt={item.commonName} fill className="rv-media-zoom object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                  ) : (
                    <div className="grid h-full place-items-center text-forest">
                      <Leaf className="size-10" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss">{item.category}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-canopy">{item.commonName}</h3>
                  {item.scientificName ? <p className="mt-1 text-sm italic text-volcanic">{item.scientificName}</p> : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement={species.type === "flora" ? "flora" : "fauna"} />
      </div>
    </SimplePage>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-md bg-mist p-4">
      <span className="mt-1 text-river">{icon}</span>
      <div>
        <dt className="font-bold text-canopy">{label}</dt>
        <dd className="mt-1 leading-6 text-volcanic">{value}</dd>
      </div>
    </div>
  );
}
