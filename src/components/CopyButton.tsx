"use client";

import React from "react";

interface CopyButtonProps {
  text: string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CopyButton({
  text,
  title = "Copiar código",
  className = "px-3 py-1 text-sm rounded transition-colors border border-[--border] bg-[--chip-bg] text-[--chip-fg] hover:bg-[--link] hover:text-[--accent-foreground]",
  children = "Copiar",
}: CopyButtonProps) {
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // Fallback: try using a temporary textarea
      try {
        const el = document.createElement("textarea");
        el.value = text;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      } catch {
        // Ignore
      }
    }
  };

  return (
    <button onClick={onClick} className={className} title={title}>
      {children}
    </button>
  );
}
