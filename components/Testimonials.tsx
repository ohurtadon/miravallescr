import { Star } from "lucide-react";
import { testimonials } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Testimonios" title="Lo que inspira a quienes llegan" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-lg bg-mist p-7 ring-1 ring-canopy/10">
              <div className="mb-5 flex gap-1 text-sand">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-5 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="text-lg leading-8 text-canopy">“{item.quote}”</p>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-moss">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
