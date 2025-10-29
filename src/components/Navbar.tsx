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
    const isSmallFont = fontSize === "small" || fontSize === "medium";
    return <Type size={18} />; // Tamanho fixo do ícone
  };

  return (
    <nav className="navbar-container">
      {/* Navigation Links */}
      <div className="navbar-links">
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className="navbar-button group"
          >
            <span className="navbar-icon">
              {link.icon && <link.icon size={18} />}
            </span>
            <span className="navbar-label group-hover:opacity-100 group-hover:translate-x-0">
              {link.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Theme and Font Controls */}
      <div className="navbar-controls">
        {/* Font Size Toggle */}
        <button
          onClick={increaseFontSize}
          className="navbar-button group"
          title={`Tamanho da fonte: ${fontSize}`}
          type="button"
        >
          <span className="navbar-icon">
            {getFontIcon()}
          </span>
          <span className="navbar-label group-hover:opacity-100 group-hover:translate-x-0">
            Fonte
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="navbar-button group"
          title={theme === "light" ? "Modo escuro" : "Modo claro"}
          type="button"
        >
          <span className="navbar-icon">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </span>
          <span className="navbar-label group-hover:opacity-100 group-hover:translate-x-0">
            {theme === "light" ? "Escuro" : "Claro"}
          </span>
        </button>
      </div>
    </nav>
  );
}