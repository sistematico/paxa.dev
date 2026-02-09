import Link from "next/link";
import { Home, ScrollText } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-2">
      <Link className="flex items-center gap-1" href="/">
        <Home className="size-5" />
        Início
      </Link>
      <Link className="flex items-center gap-1" href="/posts">
        <ScrollText className="size-5" />
        Blog
      </Link>
    </nav>
  );
}
