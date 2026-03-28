import Link from "next/link";
import Navbar from "./Navbar";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import FontSwitcher from "./FontSwitcher";
import AnimatedLogo from "./AnimatedLogo";
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
    <header className="sticky z-50 top-0 bg-background/50 backdrop-blur-sm border-b border-border/50">
      <div className="relative flex items-center gap-2 container mx-auto px-4 py-3">
        <Link href={homeHref} className="mr-auto flex items-center gap-3 group">
          <AnimatedLogo alt={n?.title} />
          <span className="text-lg font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors">
            {n?.title}
          </span>
        </Link>
        <FontSwitcher />
        <ThemeSwitcher />
        <LocaleSwitcher locale={locale} />
        <Navbar dict={dict} />
      </div>
    </header>
  );
}
