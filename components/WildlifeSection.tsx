import Image from "next/image";
import Link from "next/link";
import { Bird, Flower2 } from "lucide-react";
import type { SiteData } from "@/lib/site-api";
import { SectionHeading } from "./SectionHeading";

export function WildlifeSection({ wildlife }: { wildlife: SiteData["wildlife"] }) {
  return (
    <section className="bg-mist px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Flora y fauna"
          title="Biodiversidad que marca el carácter de Miravalles"
          copy="Bosques, aves, mamíferos y plantas tropicales hacen de la zona un aula viva para visitantes y comunidades."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <WildlifeCard
            title="Fauna"
            icon={<Bird className="size-6" aria-hidden="true" />}
            image="https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?auto=format&fit=crop&w=1100&q=80"
            items={wildlife.fauna}
            href="/flora-fauna/fauna"
          />
          <WildlifeCard
            title="Flora"
            icon={<Flower2 className="size-6" aria-hidden="true" />}
            image="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1100&q=80"
            items={wildlife.flora}
            href="/flora-fauna/flora"
          />
        </div>
      </div>
    </section>
  );
}

type WildlifeCardProps = {
  title: string;
  icon: React.ReactNode;
  image: string;
  items: string[];
  href: string;
};

function WildlifeCard({ title, icon, image, items, href }: WildlifeCardProps) {
  return (
    <Link href={href} className="group grid overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-canopy/10 md:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-72 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 24vw, 100vw"
        />
      </div>
      <div className="p-7">
        <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-river text-white">{icon}</div>
        <h3 className="font-display text-4xl font-bold text-canopy">{title}</h3>
        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="rounded-md bg-mist px-3 py-2 text-sm font-semibold text-volcanic">
              {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
