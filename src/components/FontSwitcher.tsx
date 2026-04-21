"use client";

import { useState, useEffect } from "react";
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
  const [mounted, setMounted] = useState(false);

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

  function cycle() {
    setSize((current) => {
      const idx = fontSizes.findIndex((f) => f.value === current);
      const next = (idx + 1) % fontSizes.length;
      return fontSizes[next].value;
    });
  }

  const currentLabel = fontSizes.find((f) => f.value === size)?.label ?? "M";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Tamanho da fonte: ${currentLabel}`}
      title={`Fonte: ${currentLabel}`}
      className="relative flex items-center justify-center size-9 rounded-md
        transition-colors duration-300 ease-in-out cursor-pointer"
    >
      <AArrowUp strokeWidth={1.5} className="size-5 text-foreground" />
    </button>
  );
}
