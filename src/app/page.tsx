import Link from "next/link";
import Image from "next/image";
import AudioPlayer from "@/components/AudioPlayer";
import { tracks } from "@/config";

export default function Home() {
  return (
    <div className="p-5 bg-[#252529] rounded-md border border-black/30">
      {/* <div className="flex">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Paxá
          </h1>
          <p className="text-lg md:text-xl text-foreground/80">
            Desenvolvedor Web
          </p>
        </header>
        <div className="space-y-6">
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
            Bem-vindo ao meu espaço digital. Aqui você encontra projetos,
            experiências e paixão por desenvolvimento web.
          </p>
        </div>
      </div> */}

      <section>
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Paxá"
            className="block mx-auto mt-0 mb-10 sm:ml-5 sm:mb-5 sm:float-right hover:grayscale-0"
            unoptimized
            width={160}
            height={160}
            priority
          />
        </Link>
        <div className="prose prose-neutral dark:prose-invert">
          <h1 className="text-4xl font-bold">
            Paxá
          </h1>
          <p className="mb-2">
            Meu nome é Lucas, sou especialista em TypeScript, uso frameworks
            como Vue.js, Astro, React, Next.js e runtimes como Bun e Node.js
            para criar aplicações web de visual refinado e alta performance.
          </p>
          <p className="mb-2">
            Sou usuário de Linux desde 1999 e tenho vasta experiência em
            administração de sistemas, garantindo soluções robustas, estáveis e
            seguras.
          </p>
          <p className="mb-2">Vamos juntos construir soluções inovadoras e impactantes!</p>
        </div>
      </section>

      <AudioPlayer tracks={tracks} autoPlay={false} />
    </div>
  );
}
