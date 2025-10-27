"use client";

import Link from "next/link";
import { Sun, Moon, Type, Home } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useFontSize } from "@/context/FontSizeContext";
import { navLinks } from "@/config";

// Componente apenas para os controles (tema e fonte)
export default function InlineMenu() {
  const { theme, toggleTheme } = useTheme();
  const { fontSize, increaseFontSize } = useFontSize();

  const getFontIcon = () => {
    // Alterna entre ícone pequeno e grande baseado no tamanho atual
    const isSmallFont = fontSize === "small" || fontSize === "medium";
    return <Type size={isSmallFont ? 15 : 21} />;
  };

  // Debug temporário
  console.log("Current fontSize:", fontSize);

  return (
    <div className="inline-menu">
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
  );
}

// Novo componente para os links de navegação
export function NavigationLinks() {
  return (
    <div className="navigation-links mb-4">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} className="inline-menu-btn">
          <span className="btn-icon">
            {link.icon && <link.icon size={18} />}
          </span>
          <span className="btn-label">{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
