import type { Metadata } from "next";
import Link from "next/link";
import { NarrativeBlock } from "@/components/NarrativeBlock";
import { RecommendedSlot } from "@/components/RecommendedSlot";
import { SponsorSection } from "@/components/SponsorSection";
import { SimplePage } from "@/components/SimplePage";
import { getSiteData } from "@/lib/site-api";

export const metadata: Metadata = {
  title: "Patrocinadores",
  description: "Aliados y patrocinadores que apoyan la promoción turística sostenible de Miravalles."
};

export default async function SponsorsPage() {
  const { sponsors } = await getSiteData();

  return (
    <SimplePage
      eyebrow="Patrocinadores"
      title="Aliados que impulsan Miravalles"
      description="Espacio preparado para reconocer a negocios, organizaciones y emprendimientos que apoyan la promoción turística responsable."
    >
      <NarrativeBlock title="Promover un destino también requiere aliados">
        <p>
          Una plataforma regional crece mejor cuando se sostiene con participación local: comercios, guías, hospedajes, productores, organizaciones y personas que entienden el valor de mostrar Miravalles con cuidado.
        </p>
      </NarrativeBlock>
      <div className="-mx-5 -mb-16 mt-10 md:-mx-8 md:-mb-20">
        <SponsorSection sponsors={sponsors} showHeading={false} />
      </div>
      <div className="mt-12 rounded-lg bg-white p-7 text-center ring-1 ring-canopy/10">
        <h2 className="font-display text-4xl font-bold text-canopy">¿Quiere apoyar la plataforma?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-volcanic">
          La sección de patrocinadores está lista para activarse con paquetes, niveles y beneficios editoriales en una fase posterior.
        </p>
        <Link href="/alianzas" className="mt-6 inline-flex rounded-md bg-forest px-6 py-4 text-sm font-bold text-white hover:bg-canopy">
          Ver opciones de alianza
        </Link>
      </div>
      <div className="-mx-5 mt-12 md:-mx-8">
        <RecommendedSlot placement="sponsors" />
      </div>
    </SimplePage>
  );
}
