import Link from "next/link";
import { ThemeSwitch } from "./theme";
// import { metaData } from "../config";

const navItems = {
  "/posts": { name: "Blog" },
  "/projetos": { name: "Projetos" },
};

export function Navbar() {
  return (
    <nav className="lg:mb-4 mb-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="logo text-3xl font-semibold tracking-tight">
            {/* {metaData.title} */}
            Paxá
          </Link>
        </div>
        <div className="flex flex-row gap-4 mt-6 md:mt-0 md:ml-auto items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
            >
              {name}
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}