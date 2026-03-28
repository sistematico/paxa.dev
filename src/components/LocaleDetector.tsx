"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

const STORAGE_KEY = "paxa-locale";

const ptCountries = new Set(["BR", "PT", "AO", "MZ", "CV", "GW", "ST", "TL"]);

export default function LocaleDetector({ locale }: { locale: Locale }) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return;
    } catch {
      return;
    }

    const controller = new AbortController();

    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const country: string = data?.country_code || "";
        const detected: Locale = ptCountries.has(country) ? "pt" : "en";

        try {
          localStorage.setItem(STORAGE_KEY, detected);
        } catch {}

        if (detected !== locale) {
          const pathname =
            window.location.pathname.replace(/^\/(pt|en)/, "") || "/";
          if (process.env.NODE_ENV !== "production") {
            window.location.href = `/${detected}${pathname === "/" ? "" : pathname}`;
          } else {
            const host = detected === "en" ? "en.paxa.dev" : "paxa.dev";
            window.location.href = `https://${host}${pathname}`;
          }
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [locale]);

  return null;
}
