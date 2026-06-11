import type { SiteData } from "@/lib/site-api";

export function Stats({ stats }: { stats: SiteData["stats"] }) {
  return (
    <section className="bg-mist px-5 py-14 md:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-lg bg-canopy/10 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="bg-white p-6 text-center md:p-8">
            <p className="font-display text-4xl font-bold text-forest md:text-5xl">{item.value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-volcanic">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
