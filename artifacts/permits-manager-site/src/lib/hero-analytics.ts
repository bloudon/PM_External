import type { HeroEventInput } from '@workspace/api-client-react';

/**
 * Anonymous event counts in the VPS API's structured logs, not visitor tracking.
 * Best effort: telemetry must never interrupt playback or navigation.
 */
export function trackHeroEvent(eventName: HeroEventInput['eventName']): void {
  if (typeof window === 'undefined') return;
  const url = `${import.meta.env.BASE_URL}api/hero-events`;
  const body = JSON.stringify({ eventName });
  try {
    if (typeof navigator.sendBeacon === 'function' &&
        navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }))) return;
    void fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    }).catch(() => {});
  } catch {
    // Ad blockers, network failures, or unavailable analytics cannot block the UI.
  }
}
