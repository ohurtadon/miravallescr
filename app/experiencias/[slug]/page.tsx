import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Gauge, MapPin, MessageCircle, SunMedium, UserRound } from "lucide-react";
import { ExperienceCard } from "@/components/ExperienceCard";
import { SimplePage } from "@/components/SimplePage";
import { experiences } from "@/data/site";

type ExperiencePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return experiences.map((experience) => ({ slug: experience.slug }));
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) return {};

  return {
    title: experience.title,
    description: experience.description
  };
}

export default async function ExperienceDetailPage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) notFound();

  const related = experiences.filter((item) => item.slug !== experience.slug).slice(0, 3);

  return (
    <SimplePage eyebrow={experience.category} title={experience.title} description={experience.description}>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-lg bg-white p-6 ring-1 ring-canopy/10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            <Image src={experience.image} alt={experience.title} fill className="object-cover" sizes="(min-width: 1024px) 65vw, 100vw" />
          </div>
          <h2 className="mt-8 font-display text-4xl font-bold text-canopy">Descripción</h2>
          <p className="mt-4 text-lg leading-8 text-volcanic">{experience.description}</p>
          <p className="mt-4 text-lg leading-8 text-volcanic">
            Esta página está preparada para ampliar itinerario, recomendaciones, políticas, fotografías reales y proveedor local cuando la experiencia esté lista para comercializarse.
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
          <p className="mt-6 rounded-md bg-mist p-4 text-sm font-bold text-canopy">{experience.price || "Precio por definir"}</p>
          <div className="mt-6 grid gap-2">
            <Link
              href={experience.contactUrl}
              className="inline-flex items-center justify-center rounded-md bg-forest px-5 py-4 text-sm font-bold text-white transition hover:bg-canopy"
            >
              Consultar disponibilidad
            </Link>
            <Link
              href={experience.whatsapp || experience.contactUrl}
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
    </SimplePage>
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
