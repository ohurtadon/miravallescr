"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
  ArrowRight,
  Binoculars,
  Bus,
  Coffee,
  Flame,
  HandHeart,
  Hotel,
  Leaf,
  MapPin,
  Mountain,
  Store,
  Utensils,
  Waves,
  X,
  type LucideIcon
} from "lucide-react";
import type { SiteMapPoint } from "@/lib/site-api";
import { SectionHeading } from "./SectionHeading";

type MapFilter = "all" | SiteMapPoint["kind"];

type MapSectionProps = {
  mapPoints: SiteMapPoint[];
  showHeading?: boolean;
};

type MapIconConfig = {
  key: string;
  label: string;
  markerClass: string;
  Icon: LucideIcon;
  svg: string;
};

const filters: Array<{ value: MapFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "attraction", label: "Atractivos" },
  { value: "business", label: "Negocios" }
];

const mapIconConfigs = {
  attraction: {
    key: "attraction",
    label: "Atractivo",
    markerClass: "map-marker--attraction",
    Icon: Mountain,
    svg: '<path d="m3 20 7-12 4 7 2-3 5 8H3Z"/>'
  },
  nature: {
    key: "nature",
    label: "Naturaleza",
    markerClass: "map-marker--nature",
    Icon: Leaf,
    svg: '<path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 12-9 2 8-2 12-7 12H7"/><path d="M9 15c1-3 3-5 6-7"/>'
  },
  water: {
    key: "water",
    label: "Agua / ríos",
    markerClass: "map-marker--water",
    Icon: Waves,
    svg: '<path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/>'
  },
  birding: {
    key: "birding",
    label: "Aves / miradores",
    markerClass: "map-marker--birding",
    Icon: Binoculars,
    svg: '<path d="M10 10 8 5H5l-2 7v5a3 3 0 0 0 6 0v-5h6v5a3 3 0 0 0 6 0v-5l-2-7h-3l-2 5"/><path d="M9 17h6"/>'
  },
  lodging: {
    key: "lodging",
    label: "Hospedaje",
    markerClass: "map-marker--lodging",
    Icon: Hotel,
    svg: '<path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16"/><path d="M9 21v-5h6v5"/><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01"/>'
  },
  restaurant: {
    key: "restaurant",
    label: "Restaurante",
    markerClass: "map-marker--restaurant",
    Icon: Utensils,
    svg: '<path d="M4 3v8"/><path d="M8 3v8"/><path d="M4 7h4"/><path d="M6 11v10"/><path d="M17 3v18"/><path d="M13 3c0 4 2 7 4 7"/>'
  },
  coffee: {
    key: "coffee",
    label: "Café / producto local",
    markerClass: "map-marker--coffee",
    Icon: Coffee,
    svg: '<path d="M3 8h13v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M16 10h2a3 3 0 0 1 0 6h-2"/><path d="M6 2v2M10 2v2M14 2v2"/>'
  },
  guide: {
    key: "guide",
    label: "Guía / tour",
    markerClass: "map-marker--guide",
    Icon: HandHeart,
    svg: '<path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.5.6L7 12"/><path d="m7 16 2 2c.5.5 1.2.8 2 .8h4c.8 0 1.5-.3 2-.8l3-3"/><path d="M5 11 2 14l6 6 3-3"/><path d="M19 8a3 3 0 0 0-6 0c0 2 3 4 3 4s3-2 3-4Z"/>'
  },
  thermal: {
    key: "thermal",
    label: "Termales",
    markerClass: "map-marker--thermal",
    Icon: Flame,
    svg: '<path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-9-.5 2-2 3-3 4-1.5-2-1-5-1-7-3 2-6 5-6 10a7 7 0 0 0 7 9Z"/>'
  },
  transport: {
    key: "transport",
    label: "Transporte",
    markerClass: "map-marker--transport",
    Icon: Bus,
    svg: '<path d="M6 17h12l1-5V6a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v6Z"/><path d="M6 17v2M18 17v2M5 9h14M8 13h.01M16 13h.01"/>'
  },
  business: {
    key: "business",
    label: "Negocio",
    markerClass: "map-marker--business",
    Icon: Store,
    svg: '<path d="M4 10h16l-1-5H5Z"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/><path d="M4 10c0 2 3 2 4 0 1 2 3 2 4 0 1 2 3 2 4 0 1 2 4 2 4 0"/>'
  }
} satisfies Record<string, MapIconConfig>;

const legendItems = [
  mapIconConfigs.attraction,
  mapIconConfigs.restaurant,
  mapIconConfigs.lodging,
  mapIconConfigs.guide,
  mapIconConfigs.thermal,
  mapIconConfigs.transport,
  mapIconConfigs.coffee,
  mapIconConfigs.business
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

            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 text-xs font-bold">
              {legendItems.map((item) => (
                <span key={item.key} className="rounded-md bg-white/95 px-3 py-2 text-canopy shadow">
                  <item.Icon className="mr-1 inline size-4 text-forest" /> {item.label}
                </span>
              ))}
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
                        <PointIcon point={point} className="mt-0.5 size-5 shrink-0 text-forest" />
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

function PointIcon({ point, className }: { point: SiteMapPoint; className?: string }) {
  const { Icon } = getMapIconConfig(point);
  return <Icon className={className} aria-hidden="true" />;
}

function MapPointCard({ point, onClose }: { point: SiteMapPoint; onClose: () => void }) {
  const icon = getMapIconConfig(point);

  return (
    <article>
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-moss">
          <icon.Icon className="size-4" aria-hidden="true" />
          {icon.label}
        </p>
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
  const icon = getMapIconConfig(point);
  const element = document.createElement("button");
  element.type = "button";
  element.className = `map-marker ${icon.markerClass}${selected ? " is-selected" : ""}`;
  element.setAttribute("aria-label", `Ver ${point.name}`);
  element.title = point.name;
  element.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icon.svg}</svg>`;
  return element;
}

function getMapIconConfig(point: SiteMapPoint): MapIconConfig {
  const value = normalizeIconText(`${point.category} ${point.name}`);

  if (point.kind === "attraction") {
    if (matchesAny(value, ["rio", "agua", "catarata", "poza"])) return mapIconConfigs.water;
    if (matchesAny(value, ["ave", "aves", "mirador", "observacion"])) return mapIconConfigs.birding;
    if (matchesAny(value, ["sendero", "bosque", "naturaleza"])) return mapIconConfigs.nature;
    if (matchesAny(value, ["termal", "termales", "relajacion"])) return mapIconConfigs.thermal;
    return mapIconConfigs.attraction;
  }

  if (matchesAny(value, ["restaurante", "comedor", "soda", "gastronomia", "cocina"])) return mapIconConfigs.restaurant;
  if (matchesAny(value, ["hospedaje", "hotel", "lodge", "cabina", "cabana", "alojamiento"])) return mapIconConfigs.lodging;
  if (matchesAny(value, ["guia", "tour", "operador", "experiencia"])) return mapIconConfigs.guide;
  if (matchesAny(value, ["termal", "termales", "spa"])) return mapIconConfigs.thermal;
  if (matchesAny(value, ["transporte", "traslado", "bus", "taxi"])) return mapIconConfigs.transport;
  if (matchesAny(value, ["cafe", "producto local", "artesania", "tienda", "recuerdo"])) return mapIconConfigs.coffee;

  return mapIconConfigs.business;
}

function matchesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function normalizeIconText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
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
