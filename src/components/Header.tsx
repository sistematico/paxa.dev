import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Header() {
  return (
    <div className="relative w-full rounded-lg border-2 border-blue-500 shadow-md mb-4 sm:mb-2 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 bg-[url(/images/urban_canvas.jpg)] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-pink-500/20" />
      </div>

      {/* Content */}
      <div className="relative p-6 h-full">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Paxá"
            className="block mx-auto sm:ml-auto sm:mr-0 hover:grayscale-0 sm:float-right"
            unoptimized
            width={160}
            height={160}
            priority
          />
        </Link>

        {/*<InlineMenu/>*/}

        <div className="mb-4">
          <h1 className="text-4xl font-bold">Paxá</h1>
        </div>

        <Navbar/>
      </div>
    </div>
  );
}
