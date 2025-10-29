import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Header() {
  return (
    <div className="relative h-48 border-b-3 border-black/60">
      {/* Content */}
      <div className="relative flex items-center justify-between w-full h-full z-30 p-3 md:p-5">
        <div className="flex flex-col justify-between w-full h-full">
          <div>
            <h1 className="text-3xl font-bold -mt-1 md:mt-0">Paxá</h1>
          </div>
          <Navbar />
        </div>
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Paxá"
            className="block mx-auto sm:ml-auto sm:mr-0 hover:grayscale-0 sm:float-end"
            unoptimized
            width={160}
            height={160}
            priority
          />
        </Link>
      </div>
      {/* Background Image with Gradient Overlay */}
      <div className="absolute top-0 h-full w-full bg-linear-to-r from-transparent via-purple-500/5 to-purple-600/80 z-20 rounded-t-xl" />
      <div className="absolute inset-0 bg-[url(/images/urban_canvas.jpg)] opacity-20 bg-cover bg-center z-10 rounded-t-xl" />
    </div>
  );
}
