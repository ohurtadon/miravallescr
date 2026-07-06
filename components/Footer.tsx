"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const groups = [
  {
    titleKey: "footer.explore",
    links: [
      { labelKey: "nav.attractions", href: "/atractivos" },
      { labelKey: "nav.wildlife", href: "/flora-fauna" },
      { labelKey: "nav.experiences", href: "/experiencias" },
      { labelKey: "businesses.eyebrow", href: "/negocios" },
      { labelKey: "nav.properties", href: "/propiedades" }
    ]
  },
  {
    titleKey: "footer.info",
    links: [
      { labelKey: "footer.directions", href: "/mapa" },
      { labelKey: "nav.contact", href: "/contacto" },
      { labelKey: "footer.weather", href: "/clima" },
      { labelKey: "nav.about", href: "/sobre-nosotros" },
      { labelKey: "footer.partnerships", href: "/contacto#alianzas" },
      { labelKey: "footer.privacy", href: "/politica-de-privacidad" }
    ]
  },
  {
    titleKey: "footer.commercial",
    links: [
      { labelKey: "sponsors.eyebrow", href: "/patrocinadores" },
      { labelKey: "cta.business", href: "/contacto#alianzas" },
      { labelKey: "footer.promoteExperience", href: "/contacto#alianzas" },
      { labelKey: "footer.publishProperty", href: "/contacto#alianzas" }
    ]
  }
] as const;

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-canopy px-5 py-14 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="relative flex size-14 items-center justify-center overflow-hidden rounded-full bg-[#e8e4d4]">
              <Image
                src="/images/raiz-volcanica-logo.webp?v=20260706"
                alt="Raíz Volcánica"
                fill
                sizes="56px"
                className="object-contain p-0.5"
              />
            </span>
            <span className="text-lg">Raíz Volcánica</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
            {t("footer.copy")}
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.titleKey}>
            <h3 className="font-bold text-sand">{t(group.titleKey)}</h3>
            <nav className="mt-4 grid gap-3 text-sm text-white/72">
              {group.links.map((link) => (
                <Link key={`${link.labelKey}-${link.href}`} href={link.href} className="hover:text-white">
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>
        ))}
        <div>
          <h3 className="font-bold text-sand">{t("footer.social")}</h3>
          <div className="mt-4 flex gap-3">
            <Link href="https://www.facebook.com/raizvolcanicacr" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <Facebook className="size-5" />
            </Link>
            <Link href="https://www.instagram.com/raizvolcanica" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <Instagram className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
