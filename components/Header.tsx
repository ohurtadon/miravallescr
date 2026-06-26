"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { translatedNavItems, useI18n } from "@/lib/i18n";

export function Header() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="absolute left-0 right-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-white md:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-white/95 ring-1 ring-white/35 backdrop-blur">
            <Image
              src="/images/raiz-volcanica-logo.webp"
              alt="Raíz Volcanica"
              fill
              sizes="48px"
              className="object-contain p-1"
              priority
            />
          </span>
          <span className="text-lg tracking-wide">Raíz Volcanica</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {translatedNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-sand">
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center rounded-full bg-white/12 p-1 text-xs font-bold ring-1 ring-white/25 backdrop-blur md:flex" aria-label={t("language.label")}>
          {(["es", "en"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLocale(item)}
              className={`min-h-8 min-w-10 rounded-full px-3 transition ${locale === item ? "bg-white text-canopy" : "text-white hover:bg-white/12"}`}
              aria-pressed={locale === item}
            >
              {t(item === "es" ? "language.es" : "language.en")}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label={open ? t("header.closeMenu") : t("header.openMenu")}
          onClick={() => setOpen((value) => !value)}
          className="flex size-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="mx-5 rounded-lg bg-canopy/95 p-4 text-white shadow-soft ring-1 ring-white/10 md:hidden">
          <nav className="grid gap-2">
            {translatedNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center rounded-full bg-white/10 p-1 text-xs font-bold" aria-label={t("language.label")}>
            {(["es", "en"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLocale(item)}
                className={`min-h-9 flex-1 rounded-full px-3 transition ${locale === item ? "bg-white text-canopy" : "text-white hover:bg-white/12"}`}
                aria-pressed={locale === item}
              >
                {t(item === "es" ? "language.es" : "language.en")}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
