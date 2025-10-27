import {
  Home,
  SquareBottomDashedScissors,
  Newspaper,
  Bookmark,
} from "lucide-react";

export const site = {
  title: "Paxá",
  description: "Programador TypeScript",
};

export const navLinks = [
  { href: "/", label: "Início", icon: Home },
  { href: "/posts", label: "Blog", icon: Newspaper },
  { href: "/snippets", label: "Snippets", icon: SquareBottomDashedScissors },
  { href: "/favoritos", label: "Favoritos", icon: Bookmark },
];

export const tracks = [
  {
    id: 1,
    title: "Hackers",
    artist: "Karl Casey",
    src: "/audio/Karl Casey - Hackers.mp3",
  },
  {
    id: 2,
    title: "Just The Two Of Us",
    artist: "Grover Washington Jr",
    src: "/audio/Grover Washington Jr - Just The Two of Us.mp3",
  },
];
