"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0px", "48px"]);

  return (
    <section ref={sectionRef} className="relative min-h-[92vh] overflow-hidden bg-canopy text-white">
      <motion.div className="absolute -inset-4 md:-inset-8" style={reduceMotion ? undefined : { y: imageY }}>
        <Image
          src="/images/volcan-miravalles-arcoiris-guanacaste.webp"
          alt="Paisaje volcánico y natural del norte de Costa Rica"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,20,0.94),rgba(18,52,39,0.74),rgba(18,52,39,0.38))]" />
      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-end px-5 pb-20 pt-32 md:px-8 md:pb-24">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-semibold ring-1 ring-white/25 backdrop-blur">
            <MapPin className="size-4" aria-hidden="true" />
            {t("hero.badge")}
          </div>
          <h1 className="font-display text-5xl font-bold leading-[0.98] text-white text-balance drop-shadow-[0_3px_18px_rgba(0,0,0,0.45)] md:text-7xl lg:text-8xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white md:text-xl">
            {t("hero.copy")}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#atractivos"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-sand px-6 py-4 text-sm font-bold text-canopy transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-canopy"
            >
              {t("hero.cta")}
              <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-mist to-transparent" />
    </section>
  );
}
