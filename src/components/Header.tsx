import Link from "next/link";
import Image from "next/image";
import InlineMenu, {NavigationLinks} from "@/components/InlineMenu";

export default function Header() {
  return (
    <div
      className="relative w-full min-h-50 rounded-lg border-2 shadow-md border-blue-500 mb-4 sm:mb-2"
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 mask-alpha mask-r-from-black mask-r-from-1% mask-r-to-transparent bg-[url(/images/urban_canvas.jpg)] bg-cover bg-center bg-no-repeat">
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

        <InlineMenu/>

        <div className="prose-neutral dark:prose-invert mb-4">
          <h1 className="text-4xl font-bold">Paxá</h1>
        </div>

        <NavigationLinks/>
      </div>
    </div>
  );
}
