import Link from "next/link";
import { navLinks } from "../config";

export default function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between gap-3 my-2 md:my-0">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          className={`flex items-center gap-1 rounded bg-black/50 w-full px-2 py-1 transition-colors duration-300 ease-in-out ${link.className}`}
          href={link.href}
        >
          <link.icon className="size-5" />
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
