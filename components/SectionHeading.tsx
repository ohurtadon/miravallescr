import { ScrollReveal } from "./ScrollReveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, copy, light = false }: SectionHeadingProps) {
  return (
    <ScrollReveal className="mx-auto max-w-3xl text-center" y={16}>
      <p className={`mb-3 text-sm font-bold uppercase tracking-[0.22em] ${light ? "text-sand" : "text-moss"}`}>
        {eyebrow}
      </p>
      <h2 className={`font-display text-4xl font-bold leading-tight text-balance md:text-6xl ${light ? "text-white" : "text-canopy"}`}>
        {title}
      </h2>
      {copy ? (
        <p className={`mt-5 text-base leading-8 md:text-lg ${light ? "text-white/78" : "text-volcanic"}`}>
          {copy}
        </p>
      ) : null}
    </ScrollReveal>
  );
}
