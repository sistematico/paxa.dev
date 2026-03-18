// src/app/snippets/page.tsx
import Snippets from "@/components/Snippets";
import Breadcrumb from "@/components/Breadcrumb";
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
    <div className="px-4 py-6">
      <Breadcrumb items={[{ label: "Snippets" }]} />

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Filtros ativos */}
          {(params.category || params.tag) && (
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Filtros ativos</h3>
                <Link
                  href="/snippets"
                  className="text-xs text-muted hover:text-accent transition-colors"
                >
                  Limpar
                </Link>
              </div>
              <div className="space-y-2">
                {params.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">Categoria:</span>
                    <span className="px-2 py-0.5 bg-surface-alt text-xs rounded">
                      {params.category}
                    </span>
                  </div>
                )}
                {params.tag && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">Tag:</span>
                    <span className="px-2 py-0.5 bg-surface-alt text-xs rounded">
                      #{params.tag}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Categorias */}
          {categories.length > 0 && (
            <div className="bg-surface rounded-lg p-4">
              <h3 className="font-semibold mb-3">Categorias</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/snippets"
                    className={`block px-2 py-1.5 rounded text-sm transition-colors ${
                      !params.category
                        ? "bg-surface-alt font-medium"
                        : "hover:bg-surface-alt"
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
                          ? "bg-surface-alt font-medium"
                          : "hover:bg-surface-alt"
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
            <div className="bg-surface rounded-lg p-4">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Link
                    key={t}
                    href={`/snippets?${params.category ? `category=${encodeURIComponent(params.category)}&` : ""}tag=${encodeURIComponent(t)}`}
                    className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                      params.tag === t
                        ? "bg-accent text-background font-medium"
                        : "bg-surface-alt hover:bg-border"
                    }`}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Estatísticas */}
          <div className="bg-surface rounded-lg p-4">
            <h3 className="font-semibold mb-3">Estatísticas</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Total de snippets:</span>
                <span className="font-medium">{snippets.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Categorias:</span>
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
    </div>
  );
}
