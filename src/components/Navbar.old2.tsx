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
    return <Type size={isSmallFont ? 15 : 21} />;
  };

  // Classes base para os botões (reutilizáveis)
  const buttonBaseClasses = "flex items-center justify-start min-w-10 w-10 h-10 border rounded-md cursor-pointer transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap group";
  const buttonThemeClasses = theme === 'light' 
    ? "border-black/15 bg-black/5 text-black/70 hover:bg-black/10 hover:border-black/25 hover:text-black/90"
    : "border-white/15 bg-black/10 text-white/80 hover:bg-black/20 hover:border-white/25 hover:text-white/95";
  
  const iconClasses = "flex items-center justify-center w-10 h-10 flex-shrink-0";
  const labelClasses = "opacity-0 -translate-x-2.5 transition-all duration-300 ease-in-out text-sm font-medium ml-1 whitespace-nowrap group-hover:opacity-100 group-hover:translate-x-0";

  // Classes responsivas
  const responsiveButton = "md:min-w-9 md:w-9 md:h-9 md:hover:min-w-22 md:hover:pr-2";
  const responsiveIcon = "md:w-9 md:h-9";
  const responsiveLabel = "navbar md:text-xs md:ml-0.5";

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center md:mr-40">
      {/* Navigation Links */}
      <div className="flex items-center gap-2 justify-start mb-2 sm:mb-0 flex-wrap">
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className={`${buttonBaseClasses} ${buttonThemeClasses} ${responsiveButton} md:hover:min-w-24 md:hover:pr-3`}
          >
            <span className={`${iconClasses} ${responsiveIcon}`}>
              {link.icon && <link.icon size={18} />}
            </span>
            <span className={`${labelClasses} ${responsiveLabel}`}>
              {link.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Theme and Font Controls */}
      <div className="flex items-center gap-2">
        {/* Font Size Toggle */}
        <button
          onClick={increaseFontSize}
          className={`${buttonBaseClasses} ${buttonThemeClasses} ${responsiveButton} md:hover:min-w-24 md:hover:pr-3`}
          title={`Tamanho da fonte: ${fontSize}`}
          type="button"
        >
          <span className={`${iconClasses} ${responsiveIcon}`}>
            {getFontIcon()}
          </span>
          <span className={`${labelClasses} ${responsiveLabel}`}>
            Fonte
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`${buttonBaseClasses} ${buttonThemeClasses} ${responsiveButton} md:hover:min-w-24 md:hover:pr-3`}
          title={theme === "light" ? "Modo escuro" : "Modo claro"}
          type="button"
        >
          <span className={`${iconClasses} ${responsiveIcon}`}>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </span>
          <span className={`${labelClasses} ${responsiveLabel}`}>
            {theme === "light" ? "Escuro" : "Claro"}
          </span>
        </button>
      </div>
    </div>
  );
}