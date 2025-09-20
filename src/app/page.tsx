import Link from "next/link";
import Image from "next/image";
import AudioPlayer from "@/components/AudioPlayer";
import TextSwitcher from "@/components/TextSwitcher";
import { tracks } from "@/config";

export default function Home() {
  return (
    <div className="p-5 bg-[#252529] rounded-md border border-black/30">
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
        </div>
        
        <div className="prose prose-neutral dark:prose-invert sm:pr-44">
          <h1 className="text-4xl font-bold mb-6">Paxá</h1>
          
          <TextSwitcher />
          
          <div>
            <a
              href="mailto:"
              className="synthwave-glow inline-block text-xl"
            >
              Entre em contato
            </a>
          </div>
        </div>
        
        <div className="clear-both"></div>
      </section>

      <section className="pt-8 border-t border-white/10">
        <AudioPlayer tracks={tracks} autoPlay={false} />
      </section>
    </div>
  );
}
