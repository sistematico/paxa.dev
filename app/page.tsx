import Image from "next/image";

export default function Home() {
  return (
    <section>
      <a href="/" target="_blank">
        <Image
          src="/images/logo.svg"
          alt="Paxá"
          className="block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Meu nome é Lucas, sou especialista em TypeScript, uso frameworks como Vue.js, Astro, React, Next.js e runtimes como Bun e Node.js para criar aplicações web de visual refinado e alta performance.
        </p>
        <p>
          Sou usuário de Linux desde 1999 e tenho vasta experiência em administração de sistemas, garantindo soluções robustas, estáveis e seguras.
        </p>
        <p>
          Vamos juntos construir soluções inovadoras e impactantes!
        </p>
      </div>
    </section>
  );
}
