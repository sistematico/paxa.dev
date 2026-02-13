import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import AudioPlayer from "./AudioPlayer";

export default function Header() {
  return (
    <header className="sticky z-50 bg-background border-b-3 border-black/40 top-0">
      <div className="flex flex-wrap items-center justify-between container mx-auto px-2 py-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-4xl font-semibold text-foreground/80"
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
        <AudioPlayer />
        <Navbar />
      </div>
    </header>
  );
}
