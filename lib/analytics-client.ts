const analyticsBaseUrl = (
  process.env.NEXT_PUBLIC_MIRAVALLESGTE_API_URL || "https://miravallesgte-api.onrender.com"
).replace(/\/$/, "");

export type AnalyticsTargetType = "business" | "attraction" | "experience" | "category";

export function getAnalyticsIdentity() {
  return {
    visitorId: getOrCreateId("miravalles_visitor_id", localStorage),
    sessionId: getOrCreateId("miravalles_session_id", sessionStorage)
  };
}

export function sendAnalyticsEvent(payload: Record<string, unknown>) {
  const identity = getAnalyticsIdentity();
  return fetch(`${analyticsBaseUrl}/api/public/analytics/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, ...identity }),
    keepalive: true,
    credentials: "omit"
  }).catch(() => undefined);
}

function getOrCreateId(key: string, storage: Storage) {
  try {
    const current = storage.getItem(key);
    if (current) return current;
    const value = crypto.randomUUID();
    storage.setItem(key, value);
    return value;
  } catch {
    return crypto.randomUUID();
  }
}
