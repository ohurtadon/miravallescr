"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { ViewTransition } from "./ViewTransition";

function MorphBoundary({ name, children }: { name?: string; children: ReactNode }) {
  if (!name) return <>{children}</>;
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}

type ImageCarouselProps = {
  images: string[];
  alt: string;
  aspectClass?: string;
  sizes?: string;
  priority?: boolean;
  viewTransitionName?: string;
};

export function ImageCarousel({
  images,
  alt,
  aspectClass = "aspect-[16/10]",
  sizes = "100vw",
  priority = false,
  viewTransitionName
}: ImageCarouselProps) {
  const items = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { tv } = useI18n();
  const reduceMotion = useReducedMotion();

  const goTo = (index: number) => {
    const nextIndex = (index + items.length) % items.length;
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTo({ left: scroller.clientWidth * nextIndex, behavior: "smooth" });
    setActiveIndex(nextIndex);
  };

  const updateActive = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const nextIndex = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), items.length - 1));
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    thumbnailRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }
      if (items.length > 1 && event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + items.length) % items.length);
        return;
      }
      if (items.length > 1 && event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % items.length);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, items.length, closeLightbox]);

  if (!items.length) return null;

  return (
    <>
      <div>
        <MorphBoundary name={viewTransitionName}>
        <div className={`group relative overflow-hidden rounded-lg bg-mist ${aspectClass}`}>
          <div
            ref={scrollerRef}
            onScroll={updateActive}
            className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label={`${tv("Imágenes de")} ${alt}`}
          >
            {items.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setActiveIndex(index);
                  setIsOpen(true);
                }}
                className="relative h-full min-w-full snap-center overflow-hidden text-left"
                aria-label={`${tv("Ampliar imagen")} ${index + 1} ${tv("de")} ${alt}`}
              >
                <Image
                  src={src}
                  alt={`${alt} ${index + 1}`}
                  fill
                  priority={priority && index === 0}
                  loading={priority && index === 0 ? undefined : "lazy"}
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  sizes={sizes}
                />
              </button>
            ))}
          </div>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-canopy text-white shadow-[0_10px_32px_rgba(18,52,39,0.38)] ring-2 ring-white/90 transition hover:scale-105 hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand md:left-4 md:size-14"
                aria-label={tv("Imagen anterior")}
              >
                <ChevronLeft className="size-6 md:size-7" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-canopy text-white shadow-[0_10px_32px_rgba(18,52,39,0.38)] ring-2 ring-white/90 transition hover:scale-105 hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand md:right-4 md:size-14"
                aria-label={tv("Imagen siguiente")}
              >
                <ChevronRight className="size-6 md:size-7" aria-hidden="true" />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-canopy/82 px-3 py-2 text-xs font-bold text-white shadow-sm backdrop-blur">
                <Images className="size-3.5" aria-hidden="true" />
                <span>{activeIndex + 1}/{items.length}</span>
              </div>
            </>
          ) : null}
        </div>
        </MorphBoundary>

        {items.length > 1 ? (
          <div
            className="mt-3 flex snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:thin] [scrollbar-color:#6E8B3D_transparent]"
            aria-label={`${tv("Miniaturas de")} ${alt}`}
          >
            {items.map((src, index) => (
              <button
                key={`${src}-thumb-${index}`}
                ref={(node) => {
                  thumbnailRefs.current[index] = node;
                }}
                type="button"
                onClick={() => goTo(index)}
                className={`relative h-16 min-w-24 snap-start overflow-hidden rounded-md bg-mist transition md:h-20 md:min-w-32 ${
                  activeIndex === index
                    ? "ring-4 ring-forest ring-offset-2 ring-offset-white"
                    : "opacity-75 ring-1 ring-canopy/12 hover:opacity-100 hover:ring-forest/50"
                }`}
                aria-label={`${tv("Ver imagen")} ${index + 1} ${tv("de")} ${alt}`}
                aria-current={activeIndex === index ? "true" : undefined}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="8rem" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-canopy/92 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeLightbox();
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white text-canopy shadow-sm"
              aria-label={tv("Cerrar imagen")}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            {items.length > 1 ? (
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)}
                className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-canopy shadow-[0_10px_32px_rgba(0,0,0,0.28)] ring-2 ring-canopy/10 transition hover:scale-105 md:size-14"
                aria-label={tv("Imagen anterior")}
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
            ) : null}
            <motion.div
              className="relative h-[78vh] w-full max-w-6xl overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={items[activeIndex]} alt={`${alt} ampliada`} fill className="object-contain" sizes="100vw" />
            </motion.div>
            {items.length > 1 ? (
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % items.length)}
                className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-canopy shadow-[0_10px_32px_rgba(0,0,0,0.28)] ring-2 ring-canopy/10 transition hover:scale-105 md:size-14"
                aria-label={tv("Imagen siguiente")}
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
            ) : null}
            {items.length > 1 ? (
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/12 px-4 py-3 backdrop-blur">
                {items.map((src, index) => (
                  <button
                    key={`${src}-modal-dot-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`size-2.5 rounded-full ${activeIndex === index ? "bg-white" : "bg-white/35"}`}
                    aria-label={`${tv("Ver imagen")} ${index + 1}`}
                  />
                ))}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
