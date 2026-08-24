"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getAdvertisingConsent } from "@/components/CookieConsent";

const consentChangedEvent = "rv-cookie-consent-change";
const adSenseReadyEvent = "rv-adsense-ready";
const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function AdSenseLoader() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => setHasConsent(getAdvertisingConsent() === "accepted");
    syncConsent();
    window.addEventListener(consentChangedEvent, syncConsent);
    return () => window.removeEventListener(consentChangedEvent, syncConsent);
  }, []);

  if (!clientId || !hasConsent) return null;

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      onLoad={() => window.dispatchEvent(new Event(adSenseReadyEvent))}
    />
  );
}

export { adSenseReadyEvent, consentChangedEvent };
