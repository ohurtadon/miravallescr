"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

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
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-sand">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
          className="flex size-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="mx-5 rounded-lg bg-canopy/95 p-4 text-white shadow-soft ring-1 ring-white/10 md:hidden">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
