import type { Metadata } from 'next';
import CopyButton from "@/components/CopyButton";
import { getAllSnippets } from '@/lib/snippets';

export const metadata: Metadata = {
  title: 'Snippets - paxa.dev',
  description: 'Coleção de snippets de código úteis organizados por categoria',
};

export default async function SnippetsPage() {
  const snippets = await getAllSnippets();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Snippets de Código</h1>
          <p className="text-lg text-[--muted]">
            Coleção de snippets úteis para desenvolvimento web
          </p>
        </header>

        <div className="space-y-12">
          {snippets.map((category) => (
            <section key={category.category} id={category.category.toLowerCase()}>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-[--border]">
                {category.category}
              </h2>

              <div className="space-y-8">
                {category.items.map((snippet) => (
                  <article
                    key={snippet.id}
                    className="rounded-lg shadow-md overflow-hidden bg-[--surface] border border-[--border]"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {snippet.metadata.title}
                      </h3>
                      <p className="text-[--muted] mb-4">
                        {snippet.metadata.description}
                      </p>

                      <div className="relative">
                        <div className="absolute top-2 right-2 flex gap-2">
                          <CopyButton text={snippet.code} />
                        </div>
                        <pre className="rounded-lg p-4 overflow-x-auto bg-[--code-bg] text-[--code-fg]">
                          <code className="text-sm font-mono">
                            {snippet.code}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <nav className="mt-12 p-6 rounded-lg bg-[--surface] border border-[--border]">
          <h3 className="text-lg font-semibold mb-4">Categorias</h3>
          <ul className="space-y-2">
            {snippets.map((category) => (
              <li key={category.category}>
                <a
                  href={`#${category.category.toLowerCase()}`}
                  className="text-[--link] hover:underline"
                >
                  {category.category} ({category.items.length})
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
