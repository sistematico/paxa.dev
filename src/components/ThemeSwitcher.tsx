"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Ativar tema escuro" : "Ativar tema claro"}
      className="relative flex items-center justify-center size-7 rounded-lg
        bg-surface-alt hover:bg-border
        transition-colors duration-300 ease-in-out
        cursor-pointer overflow-hidden"
    >
      <Sun
        strokeWidth={1.5}
        className={`absolute size-3.5 text-amber-400 transition-all duration-400 ease-in-out
          ${isLight ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`}
      />
      <Moon
        strokeWidth={1.5}
        className={`absolute size-3.5 text-blue-300 transition-all duration-400 ease-in-out
          ${isLight ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
      />
    </button>
  );
}
