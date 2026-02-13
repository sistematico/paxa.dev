"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "../config";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button - Visible on mobile only */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded bg-black/50 hover:bg-black/70 transition-colors duration-300"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden w-full basis-full flex flex-col gap-3 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            className={`flex items-center gap-1 rounded bg-black/50 w-full px-2 py-1 transition-colors duration-300 ease-in-out ${link.className}`}
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
            className={`flex items-center gap-1 rounded bg-black/50 px-2 py-1 transition-colors duration-300 ease-in-out ${link.className}`}
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
