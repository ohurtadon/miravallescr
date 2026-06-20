"use client";

import { useEffect } from "react";
import { type AnalyticsTargetType, sendAnalyticsEvent } from "@/lib/analytics-client";

type PageViewTrackerProps = {
  targetType: AnalyticsTargetType;
  targetId: string;
  targetCategory?: string;
};

export function PageViewTracker({ targetType, targetId, targetCategory }: PageViewTrackerProps) {
  useEffect(() => {
    const serveId = new URLSearchParams(window.location.search).get("promo") || undefined;
    void sendAnalyticsEvent({ eventType: "page_view", targetType, targetId, targetCategory, serveId });
  }, [targetType, targetId, targetCategory]);

  return null;
}
