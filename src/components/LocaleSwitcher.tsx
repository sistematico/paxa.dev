"use client";

import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const rawPathname = usePathname();

  // Strip the locale prefix added by the middleware rewrite (e.g. /pt/posts → /posts)
  const pathname = rawPathname.replace(/^\/(pt|en)/, "") || "/";

  function switchTo(target: Locale) {
    if (process.env.NODE_ENV !== "production") {
      return `/${target}${pathname === "/" ? "" : pathname}`;
    }
    const host = target === "en" ? "en.paxa.dev" : "paxa.dev";
    return `https://${host}${pathname}`;
  }

  return (
    <div className="flex items-center gap-1 rounded-lg bg-surface-alt p-1">
      <Globe className="size-3.5 text-muted" />
      {locales.map((l) =>
        l === locale ? (
          <span
            key={l}
            className="rounded-lg bg-accent/20 text-accent px-2 py-0.5 text-xs font-semibold uppercase leading-none"
          >
            {l}
          </span>
        ) : (
          <a
            key={l}
            href={switchTo(l)}
            className="rounded-lg px-2 py-0.5 text-xs font-medium uppercase leading-none text-muted hover:text-foreground transition-colors"
          >
            {l}
          </a>
        ),
      )}
    </div>
  );
}
