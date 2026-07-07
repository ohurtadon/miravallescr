import Link from "next/link";
import type { SitePromoContent, SitePromoContentBlock } from "@/lib/site-api";

type PromotionContentProps = {
  content?: SitePromoContent;
  fallback: string;
};

export function PromotionContent({ content, fallback }: PromotionContentProps) {
  if (content?.mode === "html" && content.html) {
    return (
      <div
        className={`rich-content space-y-4 rounded-lg p-5 text-lg leading-8 ${themeSurface(content.theme)}`}
        dangerouslySetInnerHTML={{ __html: sanitizeRichText(content.html) }}
      />
    );
  }

  if (content?.mode === "blocks" && content.blocks.length) {
    return (
      <div className={`space-y-5 rounded-lg p-5 ${themeSurface(content.theme)}`}>
        {content.blocks.map((block, index) => <PromotionContentBlock key={index} block={block} fallbackTheme={content.theme} />)}
      </div>
    );
  }

  return (
    <div
      className="rich-content space-y-4 text-lg leading-8 text-volcanic"
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(fallback) }}
    />
  );
}

function PromotionContentBlock({ block, fallbackTheme }: { block: SitePromoContentBlock; fallbackTheme?: string }) {
  const align = block.align === "center" ? "text-center" : "text-left";
  const theme = block.theme || fallbackTheme || "forest";

  if (block.type === "divider") return <hr className="border-canopy/15" />;
  if (block.type === "heading") return <h2 className={`font-display text-3xl font-bold leading-tight text-canopy md:text-4xl ${align}`}>{block.text}</h2>;
  if (block.type === "highlight") return <p className={`rounded-lg px-5 py-4 text-xl font-bold leading-8 ${themeBadge(theme)} ${align}`}>{block.text}</p>;
  if (block.type === "note") return <p className={`border-l-4 border-sand bg-mist px-5 py-4 text-base leading-8 text-volcanic ${align}`}>{block.text}</p>;
  if (block.type === "list") {
    return (
      <ul className={`grid gap-3 text-lg leading-8 text-volcanic ${align}`}>
        {(block.items ?? []).map((item, index) => <li key={index}>• {item}</li>)}
      </ul>
    );
  }
  if (block.type === "cta" && block.label) {
    const className = `inline-flex items-center justify-center rounded-md px-5 py-4 text-sm font-bold transition ${themeBadge(theme)}`;
    if (block.href) {
      return <Link href={block.href} className={className}>{block.label}</Link>;
    }
    return <span className={className}>{block.label}</span>;
  }

  return <p className={`text-lg leading-8 text-volcanic ${align}`}>{block.text}</p>;
}

function themeSurface(theme?: string) {
  const classes: Record<string, string> = {
    forest: "bg-[#f4f7f1]",
    sand: "bg-[#f8f0dc]",
    river: "bg-[#eef6fa]",
    volcanic: "bg-[#f5f1ed]",
    light: "bg-white"
  };
  return classes[theme || ""] ?? "bg-white";
}

function themeBadge(theme?: string) {
  const classes: Record<string, string> = {
    forest: "bg-forest text-white hover:bg-canopy",
    sand: "bg-sand text-canopy hover:bg-sand/80",
    river: "bg-river text-white hover:bg-river/85",
    volcanic: "bg-volcanic text-white hover:bg-volcanic/85",
    light: "bg-white text-canopy ring-1 ring-canopy/10 hover:bg-mist"
  };
  return classes[theme || ""] ?? classes.forest;
}

function sanitizeRichText(value: string) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?(iframe|object|embed|form|input|button|link|meta|base)[^>]*>/gi, "")
    .replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\sstyle=("[^"]*"|'[^']*'|[^\s>]+)/gi, (match) => sanitizeStyleAttribute(match))
    .replace(/javascript:/gi, "")
    .replace(/<(?!\/?(p|br|strong|b|em|i|u|ul|ol|li|h2|h3|h4|a|blockquote|hr|div|span)\b)[^>]*>/gi, "")
    .replace(/<a\b(?![^>]*\btarget=)/gi, '<a target="_blank" rel="noopener noreferrer"');
}

function sanitizeStyleAttribute(value: string) {
  const quote = value.includes("'") && !value.includes('"') ? "'" : '"';
  const raw = value.replace(/^\sstyle=/i, "").replace(/^["']|["']$/g, "");
  const allowed = raw
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [property, ...rest] = part.split(":");
      const name = property.trim().toLowerCase();
      const styleValue = rest.join(":").trim();
      if (!["color", "background-color", "text-align", "border", "border-left", "border-radius", "padding", "margin", "font-weight"].includes(name)) return "";
      if (/url\s*\(|expression\s*\(|javascript:/i.test(styleValue)) return "";
      if (!/^#[0-9a-f]{3,8}$/i.test(styleValue) && !/^rgba?\([\d\s.,%]+\)$/i.test(styleValue) && !/^[a-z\s-]+$/i.test(styleValue) && !/^[\d.\s]+(px|rem|em|%)?$/i.test(styleValue) && !/^[\d.\s]+(px|rem|em|%)?\s+[\d.\s]+(px|rem|em|%)?(\s+[\d.\s]+(px|rem|em|%)?){0,2}$/i.test(styleValue) && !/^\d+px\s+solid\s+#[0-9a-f]{3,8}$/i.test(styleValue)) return "";
      return `${name}: ${styleValue}`;
    })
    .filter(Boolean)
    .join("; ");

  return allowed ? ` style=${quote}${allowed}${quote}` : "";
}
