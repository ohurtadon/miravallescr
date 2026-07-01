"use client";

import { cloneElement, isValidElement } from "react";
import { useI18n } from "@/lib/i18n";
import { BackButton } from "./BackButton";
import { Footer } from "./Footer";
import { Header } from "./Header";

type SimplePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function SimplePage({ eyebrow, title, description, children }: SimplePageProps) {
  const { tv } = useI18n();
  const translateNode = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string") return tv(node.trim()) || node;
    if (Array.isArray(node)) return node.map((child) => translateNode(child));
    if (!isValidElement<{ children?: React.ReactNode }>(node)) return node;
    return cloneElement(node, undefined, translateNode(node.props.children));
  };

  return (
    <>
      <Header />
      <main>
        <section className="relative bg-canopy px-5 pb-16 pt-32 text-white md:px-8 md:pb-20">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('/images/banner-miravalles.webp')"
            }}
          />
          <div className="absolute inset-0 bg-canopy/60" />
          <div className="relative mx-auto max-w-5xl">
            <BackButton />
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-sand">{tv(eyebrow)}</p>
            <h1 className="font-display text-5xl font-bold leading-tight text-balance md:text-7xl">{tv(title)}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">{tv(description)}</p>
          </div>
        </section>
        <section className="bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">{translateNode(children)}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
