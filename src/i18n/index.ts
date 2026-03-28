import { defaultLocale, locales, type Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries = {
  pt: () => import("./dictionaries/pt").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const safe = locales.includes(locale as Locale) ? locale : defaultLocale;
  return dictionaries[safe]();
}

export type { Dictionary };
