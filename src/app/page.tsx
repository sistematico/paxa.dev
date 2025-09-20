import Link from "next/link";
import Image from "next/image";
import AudioPlayer from "@/components/AudioPlayer";
import TextSwitcher from "@/components/TextSwitcher";
import InlineMenu from "@/components/InlineMenu";
import { tracks } from "@/config";

export default function Home() {
  return (
    <div className="main-container">
      <section className="relative mb-12">
        <div className="mb-8 sm:mb-6">
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
          <InlineMenu />
        </div>
        
        <div className="prose-neutral dark:prose-invert mb-5">
          <h1 className="text-4xl font-bold">Paxá</h1>
          <TextSwitcher />
        </div>
        
        {/* <div className="clear-both"></div> */}
        
        <AudioPlayer tracks={tracks} autoPlay={false} />
      </section>
    </div>
  );
}
