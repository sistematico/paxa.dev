import { Home, ScrollText } from "lucide-react";

export const navLinks = [
  {
    name: "Início",
    href: "/",
    icon: Home,
    className: "hover:text-blue-500/80",
  },
  {
    name: "Blog",
    href: "/posts",
    icon: ScrollText,
    className: "hover:text-red-500/80",
  },
  {
    name: "Contato",
    href: "/contato",
    icon: ScrollText,
    className: "hover:text-yellow-500/80",
  },
];
