export function PageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div role="status" aria-label="Cargando contenido" className="animate-pulse">
      <section className="relative bg-canopy px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <div className="relative mx-auto max-w-5xl">
          <div className="h-6 w-32 rounded-full bg-white/10" />
          <div className="mt-5 h-12 w-3/4 max-w-xl rounded-md bg-white/12" />
          <div className="mt-6 h-4 w-full max-w-2xl rounded bg-white/8" />
          <div className="mt-2 h-4 w-2/3 max-w-lg rounded bg-white/8" />
        </div>
      </section>
      <section className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-lg bg-mist ring-1 ring-canopy/10">
              <div className="aspect-[4/3] bg-canopy/10" />
              <div className="space-y-3 p-6">
                <div className="h-5 w-2/3 rounded bg-canopy/10" />
                <div className="h-3 w-full rounded bg-canopy/10" />
                <div className="h-3 w-4/5 rounded bg-canopy/10" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
