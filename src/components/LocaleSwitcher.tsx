"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function switchTo(target: Locale) {
    // Same path, different domain
    const host = target === "en" ? "en.paxa.dev" : "paxa.dev";
    return `https://${host}${pathname}`;
  }

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-border">|</span>}
          {l === locale ? (
            <span className="text-accent uppercase">{l}</span>
          ) : (
            <a
              href={switchTo(l)}
              className="text-muted hover:text-accent transition-colors uppercase"
            >
              {l}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
