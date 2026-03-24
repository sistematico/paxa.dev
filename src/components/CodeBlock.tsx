"use client";

import { useState, useRef, useCallback } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({
  children,
  language,
}: {
  children: React.ReactNode;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = useCallback(() => {
    const text = preRef.current?.textContent ?? "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="group relative rounded-lg border border-border bg-[#1e2429] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-[#1a1f24]">
        <span className="text-xs font-mono text-muted select-none">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
          aria-label="Copiar código"
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span className="hidden sm:inline">Copiar</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre ref={preRef} className="overflow-x-auto p-4 text-sm leading-relaxed">
        {children}
      </pre>
    </div>
  );
}
