import {
  Home,
  ScrollText,
  Mail,
  HardHat,
  Bookmark,
  SquareBottomDashedScissors,
} from "lucide-react";

export const navLinks = [
  { name: "Início", href: "/", icon: Home },
  { name: "Blog", href: "/posts", icon: ScrollText },
  { name: "Projetos", href: "/projetos", icon: HardHat },
  {
    name: "Snippets",
    href: "/snippets",
    icon: SquareBottomDashedScissors,
  },
  { name: "Favoritos", href: "/favoritos", icon: Bookmark },
  { name: "Contato", href: "/contato", icon: Mail },
];
