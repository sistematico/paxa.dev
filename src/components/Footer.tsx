"use client";

import { SiReddit, SiX } from "@icons-pack/react-simple-icons";
import HomepageViewCounter from "@/components/HomepageViewCounter";

export default function Footer() {
  return (
    <footer className="sticky z-50 bg-surface bottom-0 border-t border-border text-muted text-sm p-3">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center gap-2 text-center md:text-left">
        <div className="flex items-center gap-4">
          &copy; {new Date().getFullYear()} Paxá
        </div>
        <HomepageViewCounter />
        <div className="flex items-center gap-2 justify-center md:justify-end">
          <a
            className="flex items-center gap-1"
            href="https://reddit.com/u/sistematico"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiReddit className="w-4 h-4" />
            {/* Reddit */}
          </a>
          <a
            className="flex items-center gap-1"
            href="https://x.com/sistematico"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiX className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
