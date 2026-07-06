"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { SiteData } from "@/lib/site-api";
import { ScrollReveal } from "./ScrollReveal";

export function Stats({ stats }: { stats: SiteData["stats"] }) {
  return (
    <section className="bg-mist px-5 py-14 md:px-8">
      <ScrollReveal className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-lg bg-canopy/10 md:grid-cols-4" y={14}>
        {stats.map((item) => (
          <div key={item.label} className="bg-white p-6 text-center md:p-8">
            <p className="font-display text-4xl font-bold text-forest md:text-5xl">
              <AnimatedStatValue value={item.value} />
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-volcanic">{item.label}</p>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}

function AnimatedStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsedValue = useMemo(() => parseStatValue(value), [value]);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const [currentValue, setCurrentValue] = useState(() => (prefersReducedMotion || !parsedValue ? parsedValue?.target ?? 0 : 0));

  useEffect(() => {
    if (!parsedValue) return;

    if (prefersReducedMotion) {
      setCurrentValue(parsedValue.target);
      return;
    }

    if (!isInView) return;

    let frameId = 0;
    const duration = 920;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(parsedValue.target * eased);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, parsedValue, prefersReducedMotion]);

  if (!parsedValue) return <span>{value}</span>;

  return (
    <span ref={ref} aria-label={value}>
      {parsedValue.prefix}
      {formatStatNumber(currentValue, parsedValue.decimals)}
      {parsedValue.suffix}
    </span>
  );
}

function parseStatValue(value: string) {
  const match = value.trim().match(/^([^0-9-]*)(-?\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, numberPart, suffix] = match;
  const normalizedNumber = numberPart.replace(",", ".");
  const target = Number(normalizedNumber);
  if (!Number.isFinite(target)) return null;

  const decimals = normalizedNumber.includes(".") ? normalizedNumber.split(".")[1].length : 0;
  return { prefix, target, suffix, decimals };
}

function formatStatNumber(value: number, decimals: number) {
  const roundedValue = decimals ? Number(value.toFixed(decimals)) : Math.round(value);
  return roundedValue.toLocaleString("es-CR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}
