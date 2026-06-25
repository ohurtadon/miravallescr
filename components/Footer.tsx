import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

const groups = [
  {
    title: "Explorar",
    links: [
      { label: "Atractivos", href: "/atractivos" },
      { label: "Flora y fauna", href: "/flora-fauna" },
      { label: "Experiencias", href: "/experiencias" },
      { label: "Negocios locales", href: "/negocios" },
      { label: "Propiedades", href: "/propiedades" }
    ]
  },
  {
    title: "Información",
    links: [
      { label: "Cómo llegar", href: "/mapa" },
      { label: "Contacto", href: "/contacto" },
      { label: "Clima", href: "/clima" },
      { label: "Alianzas", href: "/contacto#alianzas" }
    ]
  },
  {
    title: "Comercial",
    links: [
      { label: "Patrocinadores", href: "/patrocinadores" },
      { label: "Registrar mi negocio", href: "/contacto#alianzas" },
      { label: "Promocionar experiencia", href: "/contacto#alianzas" },
      { label: "Publicar propiedad", href: "/contacto#alianzas" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-canopy px-5 py-14 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image
                src="/images/raiz-volcanica-logo.webp"
                alt="Raíz Volcanica"
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            </span>
            <span className="text-lg">Raíz Volcanica</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
            La plataforma que conecta volcanes, bosques, ríos, termales, comunidades y experiencias del norte de Costa Rica.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="font-bold text-sand">{group.title}</h3>
            <nav className="mt-4 grid gap-3 text-sm text-white/72">
              {group.links.map((link) => (
                <Link key={`${link.label}-${link.href}`} href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
        <div>
          <h3 className="font-bold text-sand">Redes sociales</h3>
          <div className="mt-4 flex gap-3">
            <Link href="#" aria-label="Facebook" className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <Facebook className="size-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <Instagram className="size-5" />
            </Link>
            <Link href="#" aria-label="YouTube" className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <Youtube className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
