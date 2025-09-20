'use client';

import Link from 'next/link';
import { Sun, Moon, Type, Home } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useFontSize } from '@/contexts/FontSizeContext';

export default function InlineMenu() {
  const { theme, toggleTheme } = useTheme();
  const { fontSize, increaseFontSize } = useFontSize();

  const getFontIcon = () => {
    // Alterna entre ícone pequeno e grande baseado no tamanho atual
    const isSmallFont = fontSize === 'small' || fontSize === 'medium';
    return <Type size={isSmallFont ? 15 : 21} />;
  };

  // Debug temporário
  console.log('Current fontSize:', fontSize);

  return (
    <div className="inline-menu">
      {/* Home Link */}
      <Link href="/" className="inline-menu-btn" title="Início">
        <Home size={18} />
      </Link>

      {/* Font Size Toggle */}
      <button
        onClick={increaseFontSize}
        className="inline-menu-btn"
        title={`Tamanho da fonte: ${fontSize}`}
        type="button"
      >
        {getFontIcon()}
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="inline-menu-btn"
        title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
        type="button"
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </div>
  );
}