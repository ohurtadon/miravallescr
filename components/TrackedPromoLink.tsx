"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { sendAnalyticsEvent } from "@/lib/analytics-client";
import { useI18n } from "@/lib/i18n";
import { ScrollReveal } from "./ScrollReveal";

type TrackedPromoLinkProps = {
  serveId?: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  image?: string;
  imageAlt?: string;
};

export function TrackedPromoLink(props: TrackedPromoLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { tv } = useI18n();

  useEffect(() => {
    if (!props.serveId || !linkRef.current) return;
    const element = linkRef.current;
    let sent = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (sent || !entries.some((entry) => entry.isIntersecting)) return;
        sent = true;
        void sendAnalyticsEvent({ eventType: "promo_impression", serveId: props.serveId });
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [props.serveId]);

  return (
    <ScrollReveal y={14}>
      <a
        ref={linkRef}
        href={props.href}
        onClick={() => {
          if (props.serveId) {
            void sendAnalyticsEvent({ eventType: "promo_click", serveId: props.serveId });
          }
        }}
        className={`rv-card-interactive group grid gap-5 rounded-lg bg-white p-6 ring-1 ring-canopy/10 md:min-h-40 md:items-center md:p-8 ${props.image ? "md:grid-cols-[128px_0.7fr_1.3fr_auto]" : "md:grid-cols-[0.7fr_1.3fr_auto]"}`}
      >
        {props.image ? (
          <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-mist md:size-32 md:aspect-auto">
            <Image
              src={props.image}
              alt={props.imageAlt || tv(props.title)}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.04] group-active:scale-[1.04]"
              sizes="(min-width: 768px) 128px, 100vw"
            />
          </span>
        ) : null}
        <p className="line-clamp-2 text-sm font-bold uppercase tracking-[0.18em] text-moss" title={tv(props.eyebrow)}>{tv(props.eyebrow)}</p>
        <div className="min-w-0">
          <h3 className="line-clamp-2 font-display text-3xl font-bold leading-tight text-canopy" title={tv(props.title)}>{tv(props.title)}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-7 text-volcanic" title={tv(props.description)}>{tv(props.description)}</p>
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-bold text-forest" title={tv(props.cta)}>
          {tv(props.cta)}
          <ArrowRight className="size-4 transition group-hover:translate-x-1 group-active:translate-x-1" aria-hidden="true" />
        </span>
      </a>
    </ScrollReveal>
  );
}
