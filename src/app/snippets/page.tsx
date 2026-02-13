// src/app/snippets/page.tsx
import Snippets from "@/components/Snippets";
import { getSnippets, getAllCategories, getAllTags } from "@/actions/snippets";
import Link from "next/link";

export const metadata = {
  title: "Snippets",
  description: "Coleção de snippets de código úteis",
};

export default async function SnippetsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const params = await searchParams;
  const snippets = getSnippets();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <aside className="lg:col-span-1 space-y-6">
        {/* Filtros ativos */}
        {(params.category || params.tag) && (
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Filtros ativos</h3>
              <Link
                href="/snippets"
                className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Limpar
              </Link>
            </div>
            <div className="space-y-2">
              {params.category && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">
                    Categoria:
                  </span>
                  <span className="px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-xs rounded">
                    {params.category}
                  </span>
                </div>
              )}
              {params.tag && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">
                    Tag:
                  </span>
                  <span className="px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-xs rounded">
                    #{params.tag}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categorias */}
        {categories.length > 0 && (
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Categorias</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/snippets"
                  className={`block px-2 py-1.5 rounded text-sm transition-colors ${
                    !params.category
                      ? "bg-neutral-200 dark:bg-neutral-800 font-medium"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  Todas
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/snippets?category=${encodeURIComponent(cat)}${params.tag ? `&tag=${encodeURIComponent(params.tag)}` : ""}`}
                    className={`block px-2 py-1.5 rounded text-sm transition-colors ${
                      params.category === cat
                        ? "bg-neutral-200 dark:bg-neutral-800 font-medium"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <Link
                  key={t}
                  href={`/snippets?${params.category ? `category=${encodeURIComponent(params.category)}&` : ""}tag=${encodeURIComponent(t)}`}
                  className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                    params.tag === t
                      ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black font-medium"
                      : "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                  }`}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Estatísticas */}
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Estatísticas</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">
                Total de snippets:
              </span>
              <span className="font-medium">{snippets.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">
                Categorias:
              </span>
              <span className="font-medium">{categories.length}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Snippets */}
      <section className="lg:col-span-3">
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
          Snippets
        </h1>
        <Snippets
          snippets={snippets}
          category={params.category}
          tag={params.tag}
        />
      </section>
    </div>
  );
}
