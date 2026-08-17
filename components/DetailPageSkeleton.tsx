export function DetailPageSkeleton() {
  return (
    <div role="status" aria-label="Cargando contenido" className="animate-pulse">
      <section className="relative bg-canopy px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <div className="relative mx-auto max-w-5xl">
          <div className="h-6 w-32 rounded-full bg-white/10" />
          <div className="mt-5 h-12 w-3/4 max-w-xl rounded-md bg-white/12" />
          <div className="mt-6 h-4 w-full max-w-2xl rounded bg-white/8" />
        </div>
      </section>
      <section className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="aspect-[16/10] w-full rounded-lg bg-mist" />
          <div className="mt-8 grid gap-8 rounded-lg bg-white p-7 ring-1 ring-canopy/10 md:grid-cols-[0.8fr_1.2fr] md:p-10">
            <div className="space-y-3">
              <div className="h-4 w-1/2 rounded bg-mist" />
              <div className="h-8 w-3/4 rounded bg-mist" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-mist" />
              <div className="h-4 w-full rounded bg-mist" />
              <div className="h-4 w-2/3 rounded bg-mist" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
