export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/** Base URL for a given locale (domain-based routing) */
export function getBaseUrl(locale: Locale): string {
  return locale === "en" ? "https://en.paxa.dev" : "https://paxa.dev";
}
