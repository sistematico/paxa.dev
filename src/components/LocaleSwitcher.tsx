"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { slugTranslations } from "@/data/slug-translations";

const STORAGE_KEY = "paxa-locale";

const localeLabels: Record<Locale, string> = {
  pt: "Português",
  en: "English",
};

function translatePath(pathname: string): string {
  const match = pathname.match(/^\/(posts|cheatsheets|snippets)\/(.+)$/);
  if (!match) return pathname;

  const [, contentType, currentSlug] = match;
  const translations = slugTranslations[contentType];
  if (!translations || !(currentSlug in translations)) return pathname;

  const translated = translations[currentSlug];
  return translated ? `/${contentType}/${translated}` : `/${contentType}`;
}

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const rawPathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const pathname = rawPathname.replace(/^\/(pt|en)/, "") || "/";

  function switchTo(target: Locale) {
    const resolvedPath = target === locale ? pathname : translatePath(pathname);

    if (process.env.NODE_ENV !== "production") {
      return `/${target}${resolvedPath === "/" ? "" : resolvedPath}`;
    }
    const host = target === "en" ? "en.paxa.dev" : "paxa.dev";
    return `https://${host}${resolvedPath}`;
  }

  function handleSwitch(target: Locale) {
    try {
      localStorage.setItem(STORAGE_KEY, target);
    } catch {}
    setOpen(false);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Trocar idioma"
        className="relative flex items-center justify-center size-9 rounded-md
          transition-colors duration-300 ease-in-out
          cursor-pointer"
      >
        <Globe strokeWidth={1.5} className="size-5 text-foreground" />
      </button>

      <div
        className={`absolute right-0 top-full mt-2 min-w-28 rounded-lg bg-surface border border-border
          shadow-lg py-1 origin-top-right transition-all duration-200 ease-in-out
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
      >
        {locales.map((l) => (
          <Link
            key={l}
            href={switchTo(l)}
            onClick={() => handleSwitch(l)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm transition-colors text-foreground 
              ${l === locale ? "font-semibold" : "hover:bg-surface-alt"}`}
          >
            <span className="uppercase text-xs font-mono w-5">{l}</span>
            {localeLabels[l]}
          </Link>
        ))}
      </div>
    </div>
  );
}
