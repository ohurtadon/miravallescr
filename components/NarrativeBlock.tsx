"use client";

import { useMemo, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

type NarrativeStory = {
  title: string;
  content: React.ReactNode;
};

type NarrativeBlockProps = {
  title: string;
  children?: React.ReactNode;
  stories?: NarrativeStory[];
};

export function NarrativeBlock({ title, children, stories }: NarrativeBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { tv } = useI18n();
  const slides = useMemo(
    () => stories && stories.length > 0 ? stories : [{ title, content: children }],
    [children, stories, title]
  );

  const goToSlide = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({ left: scroller.clientWidth * index, behavior: "smooth" });
    setActiveIndex(index);
  };

  const updateActiveSlide = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setActiveIndex(Math.round(scroller.scrollLeft / scroller.clientWidth));
  };

  return (
    <section className="text-center">
      <div
        ref={scrollerRef}
        onScroll={updateActiveSlide}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={tv("Relatos de la pagina")}
      >
        {slides.map((slide, index) => (
          <article key={`${slide.title}-${index}`} className="min-w-full snap-center px-1">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-moss">{tv(slide.title)}</p>
            <div className="mx-auto mt-6 max-w-4xl space-y-4 text-lg leading-9 text-volcanic md:text-xl md:leading-10">
              {slide.content}
            </div>
          </article>
        ))}
      </div>
      {slides.length > 1 ? (
        <div className="mt-7 flex items-center justify-center gap-2" aria-label={tv("Controles de relatos")}>
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => goToSlide(index)}
              className={`size-2.5 rounded-full transition ${
                activeIndex === index ? "bg-canopy" : "bg-canopy/20 hover:bg-canopy/40"
              }`}
              aria-label={`${tv("Ver relato")} ${index + 1}`}
              aria-current={activeIndex === index}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
