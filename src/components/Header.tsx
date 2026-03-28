import Link from "next/link";
import Navbar from "./Navbar";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

interface HeaderProps {
  locale?: Locale;
  dict?: Dictionary;
}

export default function Header({ locale = "pt", dict }: HeaderProps) {
  const homeHref = "/";
  const n = dict?.base;

  return (
    <header className="sticky z-50 top-0 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="relative flex items-center gap-2 container mx-auto px-4 py-3">
        <Link href={homeHref} className="mr-auto flex items-center gap-3 group">
          <img
            className="w-9 h-9"
            src="/images/logo.svg"
            alt={n?.title!}
            width={36}
            height={36}
          />
          <span className="text-lg font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors">
            {n?.title}
          </span>
        </Link>
        <ThemeSwitcher />
        <LocaleSwitcher locale={locale} />
        <Navbar dict={dict} />
      </div>
    </header>
  );
}
