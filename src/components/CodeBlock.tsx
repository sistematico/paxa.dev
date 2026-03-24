"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({
  html,
  code,
  language,
}: {
  html: string;
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="group relative rounded-lg border border-border bg-[#1e2429] overflow-hidden">
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
      <div
        className="shiki-wrapper overflow-x-auto [&>pre]:p-4 [&>pre]:text-sm [&>pre]:leading-relaxed [&>pre]:!bg-transparent [&>pre]:m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
