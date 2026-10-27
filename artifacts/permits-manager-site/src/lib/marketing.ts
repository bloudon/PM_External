export type MarketingEventName =
  | 'cta_get_started'
  | 'cta_request_demo'
  | 'cta_sign_in'
  | 'signup_submitted'
  | 'demo_submitted'
  | 'contact_submitted';

/** Tracking is disabled: this static/SMTP site does not store marketing events. */
export function useMarketingEvent() {
  return (_eventName: MarketingEventName) => {};
}
