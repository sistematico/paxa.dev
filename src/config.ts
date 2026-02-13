import {
  Home,
  ScrollText,
  Mail,
  HardHat,
  Bookmark,
  SquareBottomDashedScissors,
} from "lucide-react";

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
    name: "Projetos",
    href: "/projetos",
    icon: HardHat,
    className: "hover:text-cyan-500/80",
  },
  {
    name: "Snippets",
    href: "/snippets",
    icon: SquareBottomDashedScissors,
    className: "hover:text-green-500/80",
  },
  {
    name: "Favoritos",
    href: "/favoritos",
    icon: Bookmark,
    className: "hover:text-indigo-500/80",
  },
  {
    name: "Contato",
    href: "/contato",
    icon: Mail,
    className: "hover:text-yellow-500/80",
  },
];
