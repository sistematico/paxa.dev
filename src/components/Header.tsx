import Image from "next/image";
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

  return (
    <header className="sticky z-50 bg-surface border-b border-border top-0">
      <div className="relative flex items-center gap-2 container mx-auto px-2 md:px-4 py-2">
        <Link
          href={homeHref}
          className="mr-auto flex items-center gap-2 text-4xl font-semibold text-foreground/80"
        >
          <Image
            className="w-12 h-12"
            src="/images/logo.svg"
            alt="Paxá Logo"
            width={50}
            height={50}
          />
          <span className="mt-1">Paxá</span>
        </Link>
        <ThemeSwitcher />
        <LocaleSwitcher locale={locale} />
        <Navbar dict={dict} />
      </div>
    </header>
  );
}
