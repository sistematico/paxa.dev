"use client";

import { useState, useEffect, useRef } from "react";
import { AArrowUp } from "lucide-react";

const STORAGE_KEY = "paxa-font-size";

const fontSizes = [
  { label: "XS", value: "14px" },
  { label: "S", value: "15px" },
  { label: "M", value: "16px" },
  { label: "L", value: "18px" },
  { label: "XL", value: "20px" },
] as const;

type FontSize = (typeof fontSizes)[number]["value"];

const DEFAULT_SIZE: FontSize = "16px";

export default function FontSwitcher() {
  const [size, setSize] = useState<FontSize>(DEFAULT_SIZE);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as FontSize | null;
      if (stored && fontSizes.some((f) => f.value === stored)) {
        setSize(stored);
        document.documentElement.style.fontSize = stored;
      }
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.fontSize = size;
    try {
      localStorage.setItem(STORAGE_KEY, size);
    } catch {}
  }, [size, mounted]);

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
        aria-label="Alterar tamanho da fonte"
        className="relative flex items-center justify-center size-9 rounded-md
          transition-colors duration-300 ease-in-out cursor-pointer"
      >
        <AArrowUp strokeWidth={1.5} className="size-5 text-foreground" />
      </button>

      <div
        className={`absolute right-0 top-full mt-2 rounded-lg bg-surface border border-border
          shadow-lg p-2 origin-top-right transition-all duration-200 ease-in-out
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
      >
        <div className="flex gap-1">
          {fontSizes.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => {
                setSize(f.value);
                setOpen(false);
              }}
              className={`flex items-center justify-center w-9 h-8 rounded text-xs font-mono transition-colors
                ${
                  size === f.value
                    ? "bg-accent text-background font-semibold"
                    : "text-foreground hover:bg-surface-alt"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
