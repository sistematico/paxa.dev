"use client";

import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

const localeLabels: Record<Locale, string> = {
  pt: "Português",
  en: "English",
};

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const rawPathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const pathname = rawPathname.replace(/^\/(pt|en)/, "") || "/";

  function switchTo(target: Locale) {
    if (process.env.NODE_ENV !== "production") {
      return `/${target}${pathname === "/" ? "" : pathname}`;
    }
    const host = target === "en" ? "en.paxa.dev" : "paxa.dev";
    return `https://${host}${pathname}`;
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
        className="relative flex items-center justify-center size-7 rounded-lg
          bg-surface-alt hover:bg-border
          transition-colors duration-300 ease-in-out
          cursor-pointer"
      >
        <Globe strokeWidth={1.5} className="size-3.5 text-foreground" />
      </button>

      <div
        className={`absolute right-0 top-full mt-2 min-w-28 rounded-lg bg-surface border border-border
          shadow-lg py-1 origin-top-right transition-all duration-200 ease-in-out
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
      >
        {locales.map((l) => (
          <a
            key={l}
            href={switchTo(l)}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm transition-colors
              ${l === locale ? "text-white font-semibold" : "text-foreground hover:bg-surface-alt"}`}
          >
            <span className="uppercase text-xs font-mono w-5">{l}</span>
            {localeLabels[l]}
          </a>
        ))}
      </div>
    </div>
  );
}
