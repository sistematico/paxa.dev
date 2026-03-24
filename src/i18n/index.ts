import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries = {
  pt: () => import("./dictionaries/pt").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export type { Dictionary };
