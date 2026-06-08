import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { wildlife } from "@/data/site";

export const metadata: Metadata = {
  title: "Fauna",
  description: "Perezosos, tucanes, monos congo, mariposas y reptiles de Miravalles."
};

export default function FaunaPage() {
  return (
    <SimplePage
      eyebrow="Fauna"
      title="Encuentros silvestres para observar con respeto"
      description="Una guía inicial para ordenar avistamientos, especies emblemáticas y recomendaciones de conservación."
    >
      <div className="grid gap-4 md:grid-cols-5">
        {wildlife.fauna.map((item) => (
          <article key={item} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-canopy/10">
            <h2 className="font-display text-3xl font-bold text-canopy">{item}</h2>
            <p className="mt-3 text-sm leading-7 text-volcanic">Contenido ampliable con fotografías y datos locales.</p>
          </article>
        ))}
      </div>
    </SimplePage>
  );
}
