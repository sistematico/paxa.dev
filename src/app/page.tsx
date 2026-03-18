import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-16">
      <div className="mb-8">
        <div className="text-xl md:text-2xl text-foreground font-semibold mb-1">
          Onde o código encontra o deserto digital
        </div>
      </div>

      <div className="space-y-6 text-foreground">
        <p className="md:text-xl leading-relaxed">
          Como um{" "}
          <span className="text-accent font-semibold">nômade digital</span>{" "}
          atravessando as dunas infinitas da web desde 1997, transformo linhas
          de código em oásis de funcionalidade.
        </p>

        <p className="md:text-lg leading-relaxed">
          Há mais de <span className="font-bold text-accent">duas décadas</span>
          , navego pelos desertos do Linux (desde 1999), dominando tempestades
          de servidores e arquitetando caravanas de aplicações que cruzam do
          frontend ao backend sem perder uma gota de performance.
        </p>

        <p className="md:text-lg leading-relaxed">
          Minha jornada através das areias tecnológicas me fez mestre em{" "}
          <span className="text-accent font-semibold">
            TypeScript, React, Next.js
          </span>
          , e guardião de segredos em{" "}
          <span className="text-accent font-semibold">
            Docker, Git, Node.js e Bun
          </span>
          . Como um verdadeiro Paxá do código, comando meus domínios com Shell
          Script, Python, e até mesmo exploro as terras de Rust e Go.
        </p>

        <p className="md:text-lg leading-relaxed">
          Neste oásis digital, você encontrará tesouros escondidos: snippets
          preciosos como especiarias raras, projetos que brilham como estrelas
          no céu noturno do deserto, e conhecimentos ancestrais (bem, desde os
          anos 90) sobre administração de sistemas e desenvolvimento web.
        </p>

        <p className="text-muted italic mt-8">
          Bem-vindo à tenda digital do Paxá — onde cada linha de código conta
          uma história.
        </p>
      </div>

      <div className="mt-12 flex gap-4 justify-center flex-wrap">
        <Link
          href="/projetos"
          className="px-8 py-3 bg-accent text-background rounded-lg font-semibold hover:bg-accent-hover transition-colors"
        >
          Explorar Projetos
        </Link>
        <Link
          href="/contato"
          className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:border-accent/40 transition-colors"
        >
          Enviar Mensagem
        </Link>
      </div>
    </div>
  );
}
