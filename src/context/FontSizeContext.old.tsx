"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type FontSize = "small" | "medium" | "large" | "xlarge";

interface FontSizeContextType {
  fontSize: FontSize;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const fontSizes = {
  small: ".9rem",
  medium: "1rem",
  large: "1.8rem",
  xlarge: "2rem",
};

const lineHeights = {
  small: "1.6",
  medium: "1.5",
  large: "1.4",
  xlarge: "1.3",
};

export const FontSizeContext = createContext<FontSizeContextType | undefined>(
  undefined,
);

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>("medium");

  useEffect(() => {
    // Recupera tamanho de fonte do localStorage
    const savedFontSize = localStorage.getItem("paxa-font-size") as FontSize;
    if (savedFontSize && savedFontSize in fontSizes) {
      setFontSize(savedFontSize);
    }
  }, []);

  useEffect(() => {
    // Aplica tamanho de fonte e line-height ao documento
    const sizeInRem = fontSizes[fontSize];
    const lineHeight = lineHeights[fontSize];
    document.documentElement.style.setProperty("--base-font-size", sizeInRem);
    document.documentElement.style.setProperty(
      "--base-line-height",
      lineHeight,
    );
    localStorage.setItem("paxa-font-size", fontSize);
  }, [fontSize]);

  const increaseFontSize = () => {
    const sizes: FontSize[] = ["small", "medium", "large", "xlarge"];
    const currentIndex = sizes.indexOf(fontSize);
    // Cicla pelos tamanhos (volta ao início quando chega no final)
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSize(sizes[nextIndex]);
  };

  const decreaseFontSize = () => {
    const sizes: FontSize[] = ["small", "medium", "large", "xlarge"];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  const resetFontSize = () => {
    setFontSize("medium");
  };

  return (
    <FontSizeContext.Provider
      value={{
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
      }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
}
