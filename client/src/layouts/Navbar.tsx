import {
  Home,
  Newspaper,
  SquareBottomDashedScissors,
  Bookmark,
  Mail
} from "lucide-react"
import { Link, useLocation } from "react-router"
import ThemeToggle from "../components/ThemeToggle"

const navLinks = [
  { href: "/", label: "Início", icon: Home },
  { href: "/posts", label: "Blog", icon: Newspaper },
  { href: "/snippets", label: "Snippets", icon: SquareBottomDashedScissors },
  { href: "/favoritos", label: "Favoritos", icon: Bookmark },
  { href: "/contato", label: "Contato", icon: Mail }
]

export function Navbar() {
  const location = useLocation()

  return (
    <ul className="hidden md:flex items-center gap-2 text-sm">
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            to={link.href}
            className={`flex items-center gap-2 p-2 transition hover:text-gray-500/75 ${
              location.pathname === link.href ||
              (
                location.pathname.startsWith("/post") &&
                  link.href.includes("/post")
              )
                ? "rounded-md border-2 border-orange-500 font-bold"
                : ""
            }`}
            viewTransition
          >
            <span className="navbar-icon">
              {link.icon && <link.icon size={16} />}
            </span>
            <span className="navbar-label group-hover:opacity-100 group-hover:translate-x-0">
              {link.label}
            </span>
          </Link>
        </li>
      ))}
      <li>
        <ThemeToggle />
      </li>
    </ul>
  )
}

export function NavbarMobile({
  setOpen
}: {
  setOpen: (open: boolean) => void
}) {
  return (
    <nav className="md:hidden border-t border-black/10 ">
      <ul className="flex flex-col gap-2 text-sm">
        {navLinks.map((link) => (
          <li key={link.href} className="bg-black/25 pl-3 py-2 rounded-md">
            <Link
              to={link.href}
              onClick={() => setOpen(false)}
              className="flex gap-2 transition"
              viewTransition
            >
              <span className="navbar-icon">
                {link.icon && <link.icon size={18} />}
              </span>
              <span className="navbar-label group-hover:opacity-100 group-hover:translate-x-0">
                {link.label}
              </span>
            </Link>
          </li>
        ))}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  )
}
