"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/actions/headings";

interface Props {
  headings: Heading[];
  title: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function TocList({
  headings,
  activeId,
  onLinkClick,
}: {
  headings: Heading[];
  activeId: string;
  onLinkClick?: () => void;
}) {
  return (
    <nav aria-label="Table of contents">
      <ul className="space-y-0.5 text-sm">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: `${(level - 2) * 10}px` }}>
            <a
              href={`#${id}`}
              onClick={onLinkClick}
              className={`flex items-center gap-2 py-1 leading-snug transition-colors duration-150 group ${
                activeId === id
                  ? "text-accent font-medium"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <span
                className={`shrink-0 w-0.5 h-3.5 rounded-full transition-colors duration-150 ${
                  activeId === id
                    ? "bg-accent"
                    : "bg-border/0 group-hover:bg-border"
                }`}
              />
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function TableOfContents({ headings, title }: Props) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const aboveViewport = new Set<string>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            aboveViewport.delete(entry.target.id);
            setActiveId(entry.target.id);
          } else if (entry.boundingClientRect.top < 0) {
            aboveViewport.add(entry.target.id);
            const ids = headings.map((h) => h.id);
            const passed = ids.filter((id) => aboveViewport.has(id));
            if (passed.length > 0) {
              setActiveId(passed[passed.length - 1]);
            }
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    for (const el of elements) {
      observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile: collapsible panel */}
      <div className="lg:hidden border border-border/30 rounded-lg overflow-hidden mb-6 bg-background-alt">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground"
          aria-expanded={isOpen}
        >
          <span>{title}</span>
          <ChevronIcon open={isOpen} />
        </button>
        {isOpen && (
          <div className="px-4 py-3 border-t border-border/30">
            <TocList
              headings={headings}
              activeId={activeId}
              onLinkClick={() => setIsOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <aside
        className="hidden lg:block sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto bg-background-alt border border-border/30 rounded-lg p-4"
        aria-label="Table of contents"
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest text-accent/60 mb-3">
          {title}
        </p>
        <TocList headings={headings} activeId={activeId} />
      </aside>
    </>
  );
}
