"use client";

import { useEffect, useRef, useState } from "react";
import { adSenseReadyEvent, consentChangedEvent } from "@/components/AdSenseLoader";
import { getAdvertisingConsent } from "@/components/CookieConsent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type GoogleAdProps = {
  slot: string;
  className?: string;
};

const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const isDevelopment = process.env.NODE_ENV === "development";

export function GoogleAd({ slot, className = "" }: GoogleAdProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const requested = useRef(false);

  useEffect(() => {
    const requestAd = () => {
      if (requested.current || getAdvertisingConsent() !== "accepted" || !window.adsbygoogle) return;
      window.adsbygoogle.push({});
      requested.current = true;
    };
    const syncConsent = () => {
      const accepted = getAdvertisingConsent() === "accepted";
      setHasConsent(accepted);
      if (accepted) requestAd();
    };

    syncConsent();
    window.addEventListener(consentChangedEvent, syncConsent);
    window.addEventListener(adSenseReadyEvent, requestAd);
    return () => {
      window.removeEventListener(consentChangedEvent, syncConsent);
      window.removeEventListener(adSenseReadyEvent, requestAd);
    };
  }, []);

  if (!clientId || !slot || !hasConsent) {
    if (!isDevelopment) return null;

    return (
      <section aria-label="Vista previa de publicidad" className={`my-10 ${className}`}>
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-moss">Publicidad · vista previa local</p>
        <div className="grid min-h-[120px] place-items-center rounded-lg border border-dashed border-moss/50 bg-mist px-6 text-center text-sm leading-6 text-volcanic">
          <div>
            <p className="font-bold text-canopy">Espacio reservado para Google AdSense</p>
            <p className="mt-1">Configure el cliente, el slot y el consentimiento para cargar un anuncio real.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Publicidad" className={`my-10 ${className}`}>
      <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-moss">Publicidad</p>
      <ins
        className="adsbygoogle block min-h-[120px] overflow-hidden rounded-lg bg-mist"
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </section>
  );
}
