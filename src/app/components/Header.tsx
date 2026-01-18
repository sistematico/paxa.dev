import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const links = [{ href: "/", label: "Início" }];

  return (
    <header className="sticky z-50 bg-background border-b-2 border-black/50 top-0">
      <div className="md:flex items-center justify-between container mx-auto">
        <div className="flex items-center gap-2 text-2xl font-bold md:px-0">
          <Image src="/images/logo.svg" alt="Paxá" width={42} height={42} />
          Paxá
        </div>
        <nav>
          <ul className="flex space-x-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
