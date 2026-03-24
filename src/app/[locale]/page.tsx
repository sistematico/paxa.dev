import Link from "next/link";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  const d = dict.home;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-16">
      <div className="mb-8">
        <div className="text-xl md:text-2xl text-foreground font-semibold mb-1">
          {d.tagline}
        </div>
      </div>

      <div className="space-y-6 text-foreground">
        <p className="md:text-xl leading-relaxed">
          {locale === "pt" ? (
            <>
              Como um{" "}
              <span className="text-accent font-semibold">{d.p1Nomad}</span>{" "}
              atravessando as dunas infinitas da web desde 1997, transformo
              linhas de código em oásis de funcionalidade.
            </>
          ) : (
            <>
              Like a{" "}
              <span className="text-accent font-semibold">{d.p1Nomad}</span>{" "}
              crossing the infinite dunes of the web since 1997, I transform
              lines of code into oases of functionality.
            </>
          )}
        </p>

        <p className="md:text-lg leading-relaxed">
          {locale === "pt" ? (
            <>
              Há mais de{" "}
              <span className="font-bold text-accent">{d.p2Decades}</span>,
              navego pelos desertos do Linux (desde 1999), dominando tempestades
              de servidores e arquitetando caravanas de aplicações que cruzam do
              frontend ao backend sem perder uma gota de performance.
            </>
          ) : (
            <>
              For over{" "}
              <span className="font-bold text-accent">{d.p2Decades}</span>,
              I&apos;ve navigated the Linux deserts (since 1999), mastering
              server storms and architecting application caravans that cross
              from frontend to backend without losing a drop of performance.
            </>
          )}
        </p>

        <p className="md:text-lg leading-relaxed">
          {locale === "pt" ? (
            <>
              Minha jornada através das areias tecnológicas me fez mestre em{" "}
              <span className="text-accent font-semibold">
                TypeScript, React, Next.js
              </span>
              , e guardião de segredos em{" "}
              <span className="text-accent font-semibold">
                Docker, Git, Node.js e Bun
              </span>
              . Como um verdadeiro Paxá do código, comando meus domínios com
              Shell Script, Python, e até mesmo exploro as terras de Rust e Go.
            </>
          ) : (
            <>
              My journey through the technological sands has made me a master of{" "}
              <span className="text-accent font-semibold">
                TypeScript, React, Next.js
              </span>
              , and a keeper of secrets in{" "}
              <span className="text-accent font-semibold">
                Docker, Git, Node.js and Bun
              </span>
              . Like a true Paxá of code, I command my domains with Shell
              Script, Python, and even explore the lands of Rust and Go.
            </>
          )}
        </p>

        <p className="md:text-lg leading-relaxed">{d.p4}</p>

        <p className="text-muted italic mt-8">{d.p5}</p>
      </div>

      <div className="mt-12 flex gap-4 justify-center flex-wrap">
        <Link
          href={`/${locale}/projetos`}
          className="px-8 py-3 bg-accent text-background rounded-lg font-semibold hover:bg-accent-hover transition-colors"
        >
          {d.exploreProjects}
        </Link>
        <Link
          href={`/${locale}/contato`}
          className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:border-accent/40 transition-colors"
        >
          {d.sendMessage}
        </Link>
      </div>
    </div>
  );
}
