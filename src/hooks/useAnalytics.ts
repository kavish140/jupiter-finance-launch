/**
 * GA4 Analytics utility for tracking conversion events.
 *
 * Provides a thin wrapper around window.gtag so components can fire
 * custom events without worrying about whether GA4 has loaded yet.
 */

// Extend Window to include gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track a custom GA4 event.
 *
 * @param eventName - The event name (e.g. 'phone_click', 'whatsapp_click', 'form_submit')
 * @param params    - Optional key/value parameters (e.g. { location: 'hero' })
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, string>,
): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};
