"use client";

import { SiReddit, SiX } from "@icons-pack/react-simple-icons";
import HomepageViewCounter from "@/components/HomepageViewCounter";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 text-muted text-xs py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center gap-2">
        <span>&copy; {new Date().getFullYear()} Paxá</span>
        <HomepageViewCounter />
        <div className="flex items-center gap-3">
          <a
            className="text-muted hover:text-foreground transition-colors"
            href="https://reddit.com/u/lsbrum"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiReddit className="w-3.5 h-3.5" />
          </a>
          <a
            className="text-muted hover:text-foreground transition-colors"
            href="https://x.com/sistematico"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiX className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
