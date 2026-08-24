"use client";

import { useEffect, useState } from "react";

export type AdvertisingConsent = "accepted" | "rejected";

const consentKey = "rv-advertising-consent";
const openSettingsEvent = "rv-open-cookie-settings";
const consentChangedEvent = "rv-cookie-consent-change";

export function getAdvertisingConsent(): AdvertisingConsent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(consentKey);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function CookieConsent() {
  const [consent, setConsent] = useState<AdvertisingConsent | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setConsent(getAdvertisingConsent());
    setIsOpen(getAdvertisingConsent() === null);

    const openSettings = () => setIsOpen(true);
    window.addEventListener(openSettingsEvent, openSettings);
    return () => window.removeEventListener(openSettingsEvent, openSettings);
  }, []);

  function saveConsent(value: AdvertisingConsent) {
    window.localStorage.setItem(consentKey, value);
    document.cookie = `${consentKey}=${value}; path=/; max-age=31536000; samesite=lax`;
    setConsent(value);
    setIsOpen(false);
    window.dispatchEvent(new Event(consentChangedEvent));
  }

  if (!isOpen) return null;

  const isEnglish = document.documentElement.lang === "en";
  const copy = isEnglish
    ? "We use essential cookies to remember your language. With your permission, we also load Google AdSense to show advertising and measure its performance."
    : "Usamos cookies esenciales para recordar su idioma. Con su autorización, también cargamos Google AdSense para mostrar publicidad y medir su rendimiento.";

  return (
    <section
      aria-label={isEnglish ? "Cookie preferences" : "Preferencias de cookies"}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-xl bg-canopy p-5 text-white shadow-[0_18px_46px_-18px_rgba(18,52,39,0.75)] ring-1 ring-white/15 sm:p-6"
    >
      <p className="text-base font-bold">{isEnglish ? "Your privacy choices" : "Sus opciones de privacidad"}</p>
      <p className="mt-2 max-w-prose text-sm leading-6 text-white/80">{copy}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="button" onClick={() => saveConsent("accepted")} className="inline-flex justify-center rounded-md bg-sand px-4 py-3 text-sm font-bold text-canopy transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          {isEnglish ? "Accept advertising cookies" : "Aceptar cookies publicitarias"}
        </button>
        <button type="button" onClick={() => saveConsent("rejected")} className="inline-flex justify-center rounded-md px-4 py-3 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          {isEnglish ? "Reject" : "Rechazar"}
        </button>
        <a href="/politica-de-privacidad" className="text-center text-sm font-semibold text-sand underline underline-offset-4 sm:ml-auto">
          {isEnglish ? "Privacy policy" : "Política de privacidad"}
        </a>
      </div>
      {consent ? <p className="sr-only">{consent}</p> : null}
    </section>
  );
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(openSettingsEvent));
}
