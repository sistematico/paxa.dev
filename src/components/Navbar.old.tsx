"use client";

import Link from "next/link";
import { Sun, Moon, Type } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useFontSize } from "@/context/FontSizeContext";
import { navLinks } from "@/config";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { fontSize, increaseFontSize } = useFontSize();

  const getFontIcon = () => {
    // Alterna entre ícone pequeno e grande baseado no tamanho atual
    const isSmallFont = fontSize === "small" || fontSize === "medium";
    return <Type size={isSmallFont ? 15 : 21} />;
  };

  return (
    <div className="flex items-center">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} className="flex items-center gap-2">
          <span className="btn-icon">
            {link.icon && <link.icon size={18} />}
          </span>
          <span className="btn-label">{link.label}</span>
        </Link>
      ))}

      <div>
        {/* Font Size Toggle */}
        <button
          onClick={increaseFontSize}
          className="inline-menu-btn"
          title={`Tamanho da fonte: ${fontSize}`}
          type="button"
        >
          <span className="btn-icon">{getFontIcon()}</span>
          <span className="btn-label">Fonte</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="inline-menu-btn"
          title={theme === "light" ? "Modo escuro" : "Modo claro"}
          type="button"
        >
        <span className="btn-icon">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </span>
          <span className="btn-label">
          {theme === "light" ? "Escuro" : "Claro"}
        </span>
        </button>
      </div>
    </div>
  );
}
