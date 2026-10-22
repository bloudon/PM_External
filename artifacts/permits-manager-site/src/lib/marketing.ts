import { useTrackMarketingEvent } from '@workspace/api-client-react';

export type MarketingEventName =
  | 'cta_get_started'
  | 'cta_request_demo'
  | 'cta_sign_in'
  | 'signup_submitted'
  | 'demo_submitted'
  | 'contact_submitted';

/** Only approved event names and the current pathname are sent. */
export function useMarketingEvent() {
  const { mutate } = useTrackMarketingEvent();
  return (eventName: MarketingEventName) => {
    mutate({ data: { eventName, path: window.location.pathname } });
  };
}
