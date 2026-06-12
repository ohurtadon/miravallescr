import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type SimplePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function SimplePage({ eyebrow, title, description, children }: SimplePageProps) {
  return (
    <>
      <Header />
      <main>
        <section className="relative bg-canopy px-5 pb-16 pt-32 text-white md:px-8 md:pb-20">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=65')"
            }}
          />
          <div className="absolute inset-0 bg-canopy/60" />
          <div className="relative mx-auto max-w-5xl">
            <Link href="/" className="mb-7 inline-flex min-h-10 items-center gap-2 rounded-full bg-white/8 px-3 py-2 text-xs font-bold text-sand ring-1 ring-white/10 transition hover:bg-white/14 hover:text-white">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Inicio
            </Link>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-sand">{eyebrow}</p>
            <h1 className="font-display text-5xl font-bold leading-tight text-balance md:text-7xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">{description}</p>
          </div>
        </section>
        <section className="bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
