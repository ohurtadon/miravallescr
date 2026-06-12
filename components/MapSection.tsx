"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin } from "lucide-react";
import type { SiteMapPoint } from "@/lib/site-api";
import { SectionHeading } from "./SectionHeading";

const categories = ["Todos", "Naturaleza", "Aventura", "Relajación", "Gastronomía", "Negocios locales", "Experiencias"];

type MapSectionProps = {
  mapPoints: SiteMapPoint[];
  showHeading?: boolean;
};

export function MapSection({ mapPoints, showHeading = true }: MapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState("Todos");
  const [mapReady, setMapReady] = useState(false);
  const filtered = useMemo(
    () => mapPoints.filter((point) => selected === "Todos" || point.category === selected),
    [selected]
  );

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !mapRef.current) return;

    mapboxgl.accessToken = token;
    setMapReady(true);
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-85.15, 10.725],
      zoom: 10.3,
      interactive: true
    });

    mapPoints.forEach((point) => {
      new mapboxgl.Marker({ color: "#2F5D3A" })
        .setLngLat([point.lng, point.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${point.name}</strong><br />${point.category}`))
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  return (
    <section className={`${showHeading ? "bg-canopy text-white" : "bg-white text-canopy"} px-5 md:px-8 ${showHeading ? "py-20 md:py-28" : "py-12 md:py-14"}`}>
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow="Mapa interactivo"
            title="Ubica atractivos, experiencias y negocios locales"
            copy="Filtra puntos de interés para armar una ruta según el tipo de experiencia, servicio o aliado que buscas."
            light
          />
        ) : null}
        <div className={`${showHeading ? "mt-10" : ""} flex flex-wrap justify-center gap-3`}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelected(category)}
              className={`min-h-11 rounded-md px-4 py-2 text-sm font-bold transition ${
                selected === category
                  ? showHeading ? "bg-sand text-canopy" : "bg-canopy text-white"
                  : showHeading ? "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/16" : "bg-white text-canopy ring-1 ring-canopy/20 hover:bg-mist"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="relative min-h-[460px] overflow-hidden rounded-lg bg-[#dbe7d7] shadow-soft">
            <div ref={mapRef} className="absolute inset-0" />
            {!mapReady ? (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(62,126,168,0.35),transparent_26%),radial-gradient(circle_at_70%_58%,rgba(110,139,61,0.42),transparent_30%),linear-gradient(135deg,#dbe7d7,#f4f7f1)]" />
                <div className="absolute inset-x-10 top-1/2 h-8 -rotate-12 rounded-full bg-river/45 blur-sm" />
                {filtered.map((point, index) => (
                  <div
                    key={point.name}
                    className="absolute"
                    style={{
                      left: `${20 + index * 14}%`,
                      top: `${30 + (index % 3) * 18}%`
                    }}
                  >
                    <span className="flex size-11 items-center justify-center rounded-full bg-forest text-white shadow-soft ring-4 ring-white/80">
                      <MapPin className="size-5" aria-hidden="true" />
                    </span>
                    <span className="mt-2 block rounded-md bg-white px-3 py-1 text-xs font-bold text-canopy shadow">
                      {point.name}
                    </span>
                  </div>
                ))}
              </>
            ) : null}
          </div>
          <div className="rounded-lg bg-white p-6 text-canopy">
            <h3 className="font-display text-3xl font-bold">Puntos destacados</h3>
            <div className="mt-6 grid gap-3">
              {filtered.map((point) => (
                <div key={point.name} className="rounded-md bg-mist p-4">
                  <p className="font-bold">{point.name}</p>
                  <p className="mt-1 text-sm text-volcanic">{point.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
