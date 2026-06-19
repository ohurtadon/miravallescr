"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { ArrowRight, Building2, MapPin, Mountain, X } from "lucide-react";
import type { SiteMapPoint } from "@/lib/site-api";
import { SectionHeading } from "./SectionHeading";

type MapFilter = "all" | SiteMapPoint["kind"];

type MapSectionProps = {
  mapPoints: SiteMapPoint[];
  showHeading?: boolean;
};

const filters: Array<{ value: MapFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "attraction", label: "Atractivos" },
  { value: "business", label: "Negocios" }
];

export function MapSection({ mapPoints, showHeading = true }: MapSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const [filter, setFilter] = useState<MapFilter>("all");
  const [selectedPoint, setSelectedPoint] = useState<SiteMapPoint | null>(null);
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">("loading");

  const filteredPoints = useMemo(
    () => mapPoints.filter((point) => filter === "all" || point.kind === filter),
    [filter, mapPoints]
  );

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !containerRef.current) {
      setMapStatus("error");
      return;
    }

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-85.2333, 10.7167],
      zoom: 10.3,
      cooperativeGestures: true
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), "top-right");
    map.addControl(new mapboxgl.FullscreenControl(), "top-right");
    map.on("load", () => {
      setMapStatus("ready");
      fitMapToPoints(map, mapPoints);
    });
    map.on("error", (event) => {
      if (event.error) setMapStatus((current) => current === "ready" ? current : "error");
    });
    mapInstanceRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current.clear();
      mapInstanceRef.current = null;
      map.remove();
    };
  }, [mapPoints]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    filteredPoints.forEach((point) => {
      const element = createMarkerElement(point, selectedPoint?.id === point.id);
      element.addEventListener("click", () => {
        setSelectedPoint(point);
        map.flyTo({ center: [point.lng, point.lat], zoom: Math.max(map.getZoom(), 13), essential: true });
      });

      const marker = new mapboxgl.Marker({ element, anchor: "bottom" })
        .setLngLat([point.lng, point.lat])
        .addTo(map);
      markersRef.current.set(point.id, marker);
    });
  }, [filteredPoints, selectedPoint?.id]);

  function changeFilter(nextFilter: MapFilter) {
    setFilter(nextFilter);
    setSelectedPoint(null);
    const map = mapInstanceRef.current;
    if (map) {
      const nextPoints = mapPoints.filter((point) => nextFilter === "all" || point.kind === nextFilter);
      fitMapToPoints(map, nextPoints);
    }
  }

  function selectPoint(point: SiteMapPoint) {
    setSelectedPoint(point);
    mapInstanceRef.current?.flyTo({ center: [point.lng, point.lat], zoom: 13, essential: true });
  }

  return (
    <section className={`${showHeading ? "bg-canopy text-white" : "bg-white text-canopy"} px-5 md:px-8 ${showHeading ? "py-20 md:py-28" : "py-12 md:py-14"}`}>
      <div className="mx-auto max-w-7xl">
        {showHeading ? (
          <SectionHeading
            eyebrow="Mapa interactivo"
            title="Ubica atractivos y negocios locales"
            copy="Explora el territorio en un mapa real y abre la ficha de cada lugar para conocerlo mejor."
            light
          />
        ) : null}

        <div className={`${showHeading ? "mt-10" : ""} flex flex-wrap justify-center gap-3`} aria-label="Filtrar puntos del mapa">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => changeFilter(item.value)}
              aria-pressed={filter === item.value}
              className={`min-h-11 rounded-md px-5 py-2 text-sm font-bold transition ${
                filter === item.value
                  ? showHeading ? "bg-sand text-canopy" : "bg-canopy text-white"
                  : showHeading ? "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/16" : "bg-white text-canopy ring-1 ring-canopy/20 hover:bg-mist"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-[#dbe7d7] shadow-soft" aria-label="Mapa interactivo de Miravalles">
            <div ref={containerRef} className="absolute inset-0" />
            {mapStatus === "loading" ? (
              <div className="absolute inset-0 grid place-items-center bg-mist text-center text-canopy">
                <p className="font-bold">Cargando mapa de Miravalles…</p>
              </div>
            ) : null}
            {mapStatus === "error" ? (
              <div className="absolute inset-0 grid place-items-center bg-mist p-8 text-center text-canopy">
                <div>
                  <MapPin className="mx-auto size-10 text-forest" aria-hidden="true" />
                  <p className="mt-4 font-bold">No fue posible cargar el mapa.</p>
                  <p className="mt-2 text-sm text-volcanic">Revisa la conexión o la configuración del token de Mapbox.</p>
                </div>
              </div>
            ) : null}

            <div className="pointer-events-none absolute bottom-4 left-4 flex gap-2 text-xs font-bold">
              <span className="rounded-md bg-white/95 px-3 py-2 text-canopy shadow"><Mountain className="mr-1 inline size-4 text-river" /> Atractivo</span>
              <span className="rounded-md bg-white/95 px-3 py-2 text-canopy shadow"><Building2 className="mr-1 inline size-4 text-forest" /> Negocio</span>
            </div>
          </div>

          <aside className="min-h-[300px] rounded-lg bg-white p-5 text-canopy ring-1 ring-canopy/10 lg:max-h-[520px] lg:overflow-y-auto">
            {selectedPoint ? (
              <MapPointCard point={selectedPoint} onClose={() => setSelectedPoint(null)} />
            ) : (
              <>
                <h3 className="font-display text-3xl font-bold">Lugares en el mapa</h3>
                <p className="mt-2 text-sm leading-6 text-volcanic">Selecciona un marcador o un lugar para ver su resumen.</p>
                <div className="mt-5 grid gap-3">
                  {filteredPoints.map((point) => (
                    <button
                      key={point.id}
                      type="button"
                      onClick={() => selectPoint(point)}
                      className="rounded-md bg-mist p-4 text-left transition hover:bg-sand/60 focus:outline-none focus:ring-2 focus:ring-river"
                    >
                      <span className="flex items-start gap-3">
                        {point.kind === "business" ? <Building2 className="mt-0.5 size-5 shrink-0 text-forest" /> : <Mountain className="mt-0.5 size-5 shrink-0 text-river" />}
                        <span>
                          <span className="block font-bold">{point.name}</span>
                          <span className="mt-1 block text-xs text-volcanic">{point.category}</span>
                        </span>
                      </span>
                    </button>
                  ))}
                  {!filteredPoints.length ? <p className="rounded-md bg-mist p-4 text-sm text-volcanic">No hay ubicaciones publicadas en esta categoría.</p> : null}
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

function MapPointCard({ point, onClose }: { point: SiteMapPoint; onClose: () => void }) {
  return (
    <article>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-moss">{point.kind === "business" ? "Negocio local" : "Atractivo"}</p>
        <button type="button" onClick={onClose} className="rounded-full p-2 text-canopy transition hover:bg-mist" aria-label="Cerrar resumen">
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      {point.image ? (
        <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-md bg-mist">
          <Image src={point.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 24vw, 100vw" />
        </div>
      ) : null}
      <h3 className="mt-5 font-display text-3xl font-bold">{point.name}</h3>
      <p className="mt-2 text-sm font-semibold text-moss">{point.category}</p>
      <p className="mt-4 text-sm leading-7 text-volcanic">{point.summary}</p>
      <p className="mt-4 flex gap-2 text-sm text-volcanic">
        <MapPin className="mt-0.5 size-4 shrink-0 text-river" />
        <span>{point.location}<span className="mt-1 block text-xs font-semibold text-moss">Ubicación aproximada en Mogote</span></span>
      </p>
      <Link href={point.href} className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-canopy">
        Ver página del lugar
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

function createMarkerElement(point: SiteMapPoint, selected: boolean) {
  const element = document.createElement("button");
  element.type = "button";
  element.className = `map-marker map-marker--${point.kind}${selected ? " is-selected" : ""}`;
  element.setAttribute("aria-label", `Ver ${point.name}`);
  element.title = point.name;
  element.innerHTML = point.kind === "business"
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21h18M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 20 7-12 4 7 2-3 5 8H3Z"/></svg>';
  return element;
}

function fitMapToPoints(map: mapboxgl.Map, points: SiteMapPoint[]) {
  if (!points.length) return;
  if (points.length === 1) {
    map.easeTo({ center: [points[0].lng, points[0].lat], zoom: 13 });
    return;
  }

  const bounds = points.reduce(
    (result, point) => result.extend([point.lng, point.lat]),
    new mapboxgl.LngLatBounds([points[0].lng, points[0].lat], [points[0].lng, points[0].lat])
  );
  map.fitBounds(bounds, { padding: 60, maxZoom: 12.5, duration: 700 });
}
