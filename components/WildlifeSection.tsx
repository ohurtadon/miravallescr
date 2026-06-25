import Image from "next/image";
import Link from "next/link";
import { Bird, Flower2 } from "lucide-react";
import type { SiteData } from "@/lib/site-api";
import { SectionHeading } from "./SectionHeading";

type WildlifeSectionProps = {
  wildlife: SiteData["wildlife"];
  showHeading?: boolean;
};

export function WildlifeSection({ wildlife, showHeading = true }: WildlifeSectionProps) {
  return (
    <section className={`${showHeading ? "bg-mist" : "bg-white"} px-5 md:px-8 ${showHeading ? "py-20 md:py-28" : "py-12 md:py-14"}`}>
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow="Flora y fauna"
            title="La biodiversidad que da vida a este territorio volcánico"
            copy="Bosques, aves, mamíferos y plantas tropicales hacen de la región un aula viva para visitantes y comunidades."
          />
        ) : null}
        <div className={`${showHeading ? "mt-12" : ""} grid gap-6 lg:grid-cols-2`}>
          <WildlifeCard
            title="Fauna"
            icon={<Bird className="size-6" aria-hidden="true" />}
            image="https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?auto=format&fit=crop&w=1100&q=65"
            items={wildlife.fauna}
            href="/flora-fauna/fauna"
          />
          <WildlifeCard
            title="Flora"
            icon={<Flower2 className="size-6" aria-hidden="true" />}
            image="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1100&q=65"
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
    <Link href={href} className="group grid h-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-canopy/10 md:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-72 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 24vw, 100vw"
        />
      </div>
      <div className="flex min-h-72 flex-col p-7">
        <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-river text-white">{icon}</div>
        <h3 className="line-clamp-2 font-display text-4xl font-bold leading-tight text-canopy" title={title}>{title}</h3>
        <div className="mt-6 flex flex-wrap gap-2">
          {items.slice(0, 8).map((item) => (
            <span key={item} className="line-clamp-1 rounded-md bg-mist px-3 py-2 text-sm font-semibold text-volcanic" title={item}>
              {item}
            </span>
          ))}
          {items.length > 8 ? (
            <span className="rounded-md bg-sand px-3 py-2 text-sm font-bold text-canopy" title={items.slice(8).join(", ")}>
              +{items.length - 8}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
