/* ═══════════════════════════════════════════════════════════════
   Google Analytics 4 — only active in production builds.
   All functions are safe no-ops in development.
═══════════════════════════════════════════════════════════════ */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const MID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const PROD = import.meta.env.PROD;

/** Call once at app start (e.g. main.tsx). Injects the gtag script. */
export function initGA(): void {
  if (!PROD || !MID) return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', MID, { send_page_view: false });
}

/** Call on every route change. */
export function trackPageView(path: string): void {
  if (!PROD || !MID || typeof window.gtag !== 'function') return;
  window.gtag('config', MID, { page_path: path });
}

/**
 * Track a custom event.
 * @example trackEvent('simulator_circuit_change', { circuit: 'inverting' })
 */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!PROD || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params ?? {});
}

/*
  Supported event names (for reference):
  - simulator_circuit_change
  - theory_chapter_complete
  - share_url_copied
  - scope_screenshot_downloaded
  - language_switch
  - donation_click
  - feedback_submitted
*/
