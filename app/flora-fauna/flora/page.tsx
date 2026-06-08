import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";
import { wildlife } from "@/data/site";

export const metadata: Metadata = {
  title: "Flora",
  description: "Guanacaste, helechos, orquídeas y bosque nuboso en Miravalles."
};

export default function FloraPage() {
  return (
    <SimplePage
      eyebrow="Flora"
      title="Verde que cuenta la historia del territorio"
      description="Una base para documentar especies vegetales, zonas de bosque y valor ecológico de la región."
    >
      <div className="grid gap-4 md:grid-cols-4">
        {wildlife.flora.map((item) => (
          <article key={item} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-canopy/10">
            <h2 className="font-display text-3xl font-bold text-canopy">{item}</h2>
            <p className="mt-3 text-sm leading-7 text-volcanic">Contenido ampliable con fotografías y datos locales.</p>
          </article>
        ))}
      </div>
    </SimplePage>
  );
}
