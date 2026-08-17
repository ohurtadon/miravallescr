import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Gauge, MapPin, MessageCircle, SunMedium, UserRound } from "lucide-react";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ImageCarousel } from "@/components/ImageCarousel";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData, withWhatsAppMessage } from "@/lib/site-api";
import { buildPageMetadata } from "@/lib/seo";
import { PageViewTracker } from "@/components/PageViewTracker";

type ExperiencePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { experiences } = await getSiteData();
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) return {};

  return buildPageMetadata({
    title: experience.title,
    description: experience.description,
    path: `/experiencias/${experience.slug}`,
    image: experience.images[0] || experience.image
  });
}

export default async function ExperienceDetailPage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const { experiences } = await getSiteData();
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) notFound();

  const related = experiences.filter((item) => item.slug !== experience.slug).slice(0, 3);
  const whatsappHref = withWhatsAppMessage(
    experience.whatsapp,
    `Hola, te descubrí en Raíz Volcánica y quiero saber más sobre la experiencia: ${experience.title}.`
  );

  return (
    <>
    <PageViewTracker targetType="experience" targetId={experience.id} targetCategory={experience.category} />
    <SimplePage eyebrow={experience.category} title={experience.title} description={experience.description}>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-lg bg-white p-6 ring-1 ring-canopy/10">
          <ImageCarousel
            images={experience.images}
            alt={experience.title}
            aspectClass="aspect-[16/10]"
            sizes="(min-width: 1024px) 65vw, 100vw"
            priority
            viewTransitionName={`experience-${experience.slug}`}
          />
          <h2 className="mt-8 font-display text-4xl font-bold text-canopy">Descripción</h2>
          <p className="mt-4 text-lg leading-8 text-volcanic">{experience.description}</p>
          <p className="mt-4 text-lg leading-8 text-volcanic">
            Esta ficha ayuda a revisar el tipo de actividad, duración, dificultad, ubicación y canal de contacto antes de planificar la visita.
          </p>
        </div>
        <aside className="rounded-lg bg-white p-6 ring-1 ring-canopy/10">
          <h2 className="font-display text-3xl font-bold text-canopy">Detalles</h2>
          <dl className="mt-6 grid gap-4 text-sm">
            <Detail icon={<Clock className="size-5" />} label="Duración" value={experience.duration} />
            <Detail icon={<Gauge className="size-5" />} label="Dificultad" value={experience.difficulty} />
            <Detail icon={<SunMedium className="size-5" />} label="Mejor época" value={experience.season} />
            <Detail icon={<MapPin className="size-5" />} label="Ubicación" value={experience.location} />
            <Detail icon={<UserRound className="size-5" />} label="Proveedor" value={experience.provider || "Por definir"} />
          </dl>
          <p className="mt-6 rounded-md bg-mist p-4 text-sm font-bold text-canopy">{experience.price || "Consultar precio"}</p>
          <div className="mt-6 grid gap-2">
            <Link
              href={experience.contactUrl}
              className="inline-flex items-center justify-center rounded-md bg-forest px-5 py-4 text-sm font-bold text-white transition hover:bg-canopy"
            >
              Consultar disponibilidad
            </Link>
            <Link
              href={whatsappHref || experience.contactUrl}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-mist px-5 py-4 text-sm font-bold text-canopy ring-1 ring-canopy/10 transition hover:bg-sand"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Contactar por WhatsApp
            </Link>
          </div>
        </aside>
      </div>
      <section className="mt-14">
        <h2 className="font-display text-4xl font-bold text-canopy">Experiencias relacionadas</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <ExperienceCard key={item.id} experience={item} />
          ))}
        </div>
      </section>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="experience-detail" />
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
