import Link from "next/link";
import Image from "next/image";
import AudioPlayer from "@/components/AudioPlayer";
import TextSwitcher, { ContactLink } from "@/components/TextSwitcher";
import InlineMenu, { NavigationLinks } from "@/components/InlineMenu";
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
        
        <div className="prose-neutral dark:prose-invert mb-4">
          <h1 className="text-4xl font-bold">Paxá</h1>
        </div>
        
        <NavigationLinks />
        
        <div className="prose-neutral dark:prose-invert">
          <TextSwitcher />
        </div>
        
        <ContactLink />
        
        {/* <div className="clear-both"></div> */}
        
        <div className="mt-4">
          <AudioPlayer tracks={tracks} autoPlay={false} />
        </div>
      </section>
    </div>
  );
}
