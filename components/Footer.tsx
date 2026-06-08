import Link from "next/link";
import { Facebook, Instagram, Mountain, Youtube } from "lucide-react";

const groups = [
  {
    title: "Explorar",
    links: [
      { label: "Atractivos", href: "/atractivos" },
      { label: "Flora y fauna", href: "/flora-fauna" },
      { label: "Experiencias", href: "/experiencias" }
    ]
  },
  {
    title: "Información",
    links: [
      { label: "Cómo llegar", href: "/mapa" },
      { label: "Contacto", href: "/contacto" },
      { label: "Clima", href: "/contacto#clima" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-canopy px-5 py-14 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="flex size-10 items-center justify-center rounded-full bg-white/10">
              <Mountain className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg">Miravalles</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
            Portal turístico y ecológico de Miravalles, Guanacaste. Naturaleza, termales, aventura y conservación.
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
