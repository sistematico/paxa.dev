"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Sun, Moon, Type, Home } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useFontSize } from "@/contexts/FontSizeContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { fontSize, increaseFontSize } = useFontSize();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getFontIcon = () => {
    // Alterna entre ícone pequeno e grande baseado no tamanho atual
    const isSmallFont = fontSize === "small" || fontSize === "medium";
    return <Type size={isSmallFont ? 14 : 20} />;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/images/logo.svg"
            alt="Paxá"
            width={40}
            height={40}
            className="logo-image"
          />
          <span className="logo-text">Paxá</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          <Link href="/" className="navbar-link">
            <Home size={18} />
            <span>Início</span>
          </Link>

          {/* Controls - movido para dentro do menu */}
          <div className="navbar-controls">
            {/* Font Size Toggle */}
            <button
              onClick={increaseFontSize}
              className="control-btn"
              title={`Tamanho da fonte: ${fontSize}`}
              type="button"
            >
              {getFontIcon()}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="control-btn theme-toggle"
              title={theme === "light" ? "Modo escuro" : "Modo claro"}
              type="button"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="mobile-menu-btn"
          title="Menu"
          type="button"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <Link
              href="/"
              className="mobile-menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              <span>Início</span>
            </Link>

            {/* Mobile Controls */}
            <div className="mobile-controls">
              <button
                onClick={increaseFontSize}
                className="control-btn"
                title={`Tamanho da fonte: ${fontSize}`}
                type="button"
              >
                {getFontIcon()}
                <span>Tamanho da fonte</span>
              </button>

              <button
                onClick={toggleTheme}
                className="control-btn"
                title={theme === "light" ? "Modo escuro" : "Modo claro"}
                type="button"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                <span>{theme === "light" ? "Modo escuro" : "Modo claro"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
