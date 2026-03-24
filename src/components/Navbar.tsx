"use client";

import Link from "next/link";
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
  const n = dict?.nav;

  const navLinks = [
    {
      name: n?.home ?? "Início",
      href: "/",
      icon: Home,
      className: "hover:text-blue-500/80",
    },
    {
      name: n?.blog ?? "Blog",
      href: "/posts",
      icon: ScrollText,
      className: "hover:text-red-500/80",
    },
    {
      name: n?.projects ?? "Projetos",
      href: "/projetos",
      icon: HardHat,
      className: "hover:text-cyan-500/80",
    },
    {
      name: n?.snippets ?? "Snippets",
      href: "/snippets",
      icon: SquareBottomDashedScissors,
      className: "hover:text-green-500/80",
    },
    {
      name: n?.bookmarks ?? "Favoritos",
      href: "/favoritos",
      icon: Bookmark,
      className: "hover:text-indigo-500/80",
    },
    {
      name: n?.contact ?? "Contato",
      href: "/contato",
      icon: Mail,
      className: "hover:text-yellow-500/80",
    },
  ];

  return (
    <>
      {/* Hamburger Button - Visible on mobile only */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded bg-surface hover:bg-border transition-colors duration-300"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-foreground my-1 transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden absolute left-0 right-0 top-full z-40 bg-surface border-b border-border px-4 flex flex-col gap-3 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0 py-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            className={`flex items-center gap-1 rounded bg-background-alt/50 hover:bg-surface-alt/50 w-full px-2 py-1 transition-colors duration-300 ease-in-out ${link.className}`}
            href={link.href}
            onClick={() => setIsOpen(false)}
          >
            <link.icon className="size-5" />
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Desktop Menu */}
      <nav className="hidden md:flex flex-row items-center justify-between gap-3">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            className={`flex items-center gap-1 rounded bg-background-alt hover:bg-surface-alt px-2 py-1 transition-colors duration-300 ease-in-out ${link.className}`}
            href={link.href}
          >
            <link.icon className="size-5" />
            {link.name}
          </Link>
        ))}
      </nav>
    </>
  );
}
