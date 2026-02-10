export default function Home() {
  return (
    // <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
    <div className="max-w-4xl mx-auto text-sm sm:text-md px-1 py-4 md:px-6 md:py-16">
      <div className="mb-8">
        {/* <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-red-600 bg-clip-text text-transparent mb-4">
            Paxá.dev
          </h1> */}
        <div className="text-xl md:text-2xl text-amber-800 dark:text-amber-200 font-semibold mb-1">
          Onde o código encontra o deserto digital
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert mx-auto text-slate-700 dark:text-slate-300 space-y-6">
        <p className="md:text-xl leading-relaxed">
          Como um{" "}
          <span className="text-amber-600 dark:text-amber-400 font-semibold">
            nômade digital
          </span>{" "}
          atravessando as dunas infinitas da web desde 1997, transformo linhas
          de código em oásis de funcionalidade.
        </p>

        <p className="md:text-lg leading-relaxed">
          Há mais de{" "}
          <span className="font-bold text-orange-600 dark:text-orange-400">
            duas décadas
          </span>
          , navego pelos desertos do Linux (desde 1999), dominando tempestades
          de servidores e arquitetando caravanas de aplicações que cruzam do
          frontend ao backend sem perder uma gota de performance.
        </p>

        <p className="md:text-lg leading-relaxed">
          Minha jornada através das areias tecnológicas me fez mestre em{" "}
          <span className="text-amber-700 dark:text-amber-300 font-semibold">
            TypeScript, React, Next.js
          </span>
          , e guardião de segredos em{" "}
          <span className="text-orange-600 dark:text-orange-400 font-semibold">
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

        <p className="text-foreground/80 italic mt-8">
          {/* 🌙 Bem-vindo à tenda digital do Paxá — onde cada linha de código conta uma história. */}
          Bem-vindo à tenda digital do Paxá — onde cada linha de código conta
          uma história.
        </p>
      </div>

      <div className="mt-12 flex gap-4 justify-center flex-wrap">
        <a
          href="#projetos"
          className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
        >
          Explorar Projetos
        </a>
        <a
          href="#contato"
          className="px-8 py-3 bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border-2 border-amber-600 dark:border-amber-400 rounded-lg font-semibold hover:bg-amber-50 dark:hover:bg-slate-700 transition-all"
        >
          Enviar Mensagem
        </a>
      </div>
    </div>
    // </section>
  );
}
