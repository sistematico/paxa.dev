"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  ScrollText,
  Mail,
  HardHat,
  Bookmark,
  SquareBottomDashedScissors,
} from "lucide-react";
import type { Dictionary } from "@/i18n";

interface NavbarProps {
  dict?: Dictionary;
}

export default function Navbar({ dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const n = dict?.nav;

  const navLinks = [
    { name: n?.home ?? "Início", href: "/", icon: Home },
    { name: n?.blog ?? "Blog", href: "/posts", icon: ScrollText },
    { name: n?.projects ?? "Projetos", href: "/projetos", icon: HardHat },
    {
      name: n?.snippets ?? "Snippets",
      href: "/snippets",
      icon: SquareBottomDashedScissors,
    },
    { name: n?.bookmarks ?? "Favoritos", href: "/favoritos", icon: Bookmark },
    { name: n?.contact ?? "Contato", href: "/contato", icon: Mail },
  ];

  // Strip locale prefix for matching (e.g. /en/posts -> /posts)
  const cleanPath = pathname.replace(/^\/(pt|en)/, "") || "/";

  function isActive(href: string) {
    if (href === "/") return cleanPath === "/";
    return cleanPath.startsWith(href);
  }

  return (
    <>
      {/* Hamburger Button - Visible on mobile only */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-md hover:bg-surface-alt/50 transition-colors"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 rounded-full bg-foreground transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 rounded-full bg-foreground my-1.5 transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 rounded-full bg-foreground transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden absolute left-0 right-0 top-full z-40 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0 py-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            className={`flex items-center gap-2 rounded-md w-full px-3 py-2 text-sm transition-colors ${
              isActive(link.href)
                ? "text-accent font-medium"
                : "text-nav-link hover:text-foreground hover:bg-surface-alt/50"
            }`}
            href={link.href}
            onClick={() => setIsOpen(false)}
          >
            <link.icon className="size-4" />
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Desktop Menu */}
      <nav className="hidden md:flex flex-row items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            className={`nav-glow flex items-center gap-1.5 rounded-md text-sm px-2.5 py-1.5 transition-colors ${
              isActive(link.href)
                ? "text-accent font-medium"
                : "text-nav-link hover:text-foreground"
            }`}
            href={link.href}
          >
            <link.icon className="size-4" />
            {link.name}
          </Link>
        ))}
      </nav>
    </>
  );
}
