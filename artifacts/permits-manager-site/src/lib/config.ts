// Central configuration. Override with VITE_APP_URL at build time.
export const APP_URL: string =
  (import.meta.env.VITE_APP_URL as string | undefined) || 'https://app.permitsmanager.com';
export const LOGO = `${import.meta.env.BASE_URL}permits-manager-logo.png`;
