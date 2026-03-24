import Posts from "@/components/Posts";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllCategories, getAllTags } from "@/actions/posts";
import Link from "next/link";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.posts.metaTitle,
    description: dict.posts.metaDesc,
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const sp = await searchParams;
  const dict = await getDictionary(locale);
  const d = dict.common;
  const categories = getAllCategories(locale);
  const tags = getAllTags(locale);

  return (
    <div className="px-4 py-6">
      <Breadcrumb
        items={[{ label: dict.posts.title }]}
        homeLabel={dict.breadcrumb.home}
        homeHref={`/${locale}`}
      />

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Filtros ativos */}
          {(sp.category || sp.tag) && (
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{d.activeFilters}</h3>
                <Link
                  href={`/${locale}/posts`}
                  className="text-xs text-muted hover:text-accent transition-colors"
                >
                  {d.clearFilters}
                </Link>
              </div>
              <div className="space-y-2">
                {sp.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">
                      {d.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 bg-surface-alt text-xs rounded">
                      {sp.category}
                    </span>
                  </div>
                )}
                {sp.tag && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">{d.tagLabel}</span>
                    <span className="px-2 py-0.5 bg-surface-alt text-xs rounded">
                      #{sp.tag}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Categorias */}
          {categories.length > 0 && (
            <div className="bg-surface rounded-lg p-4">
              <h3 className="font-semibold mb-3">{d.categories}</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={`/${locale}/posts`}
                    className={`block px-2 py-1.5 rounded text-sm transition-colors ${
                      !sp.category
                        ? "bg-surface-alt font-medium"
                        : "hover:bg-surface-alt"
                    }`}
                  >
                    {d.all}
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/${locale}/posts?category=${encodeURIComponent(cat)}${sp.tag ? `&tag=${encodeURIComponent(sp.tag)}` : ""}`}
                      className={`block px-2 py-1.5 rounded text-sm transition-colors ${
                        sp.category === cat
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
              <h3 className="font-semibold mb-3">{d.tags}</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Link
                    key={t}
                    href={`/${locale}/posts?${sp.category ? `category=${encodeURIComponent(sp.category)}&` : ""}tag=${encodeURIComponent(t)}`}
                    className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                      sp.tag === t
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
        </aside>

        {/* Posts agrupados por ano */}
        <section className="lg:col-span-3">
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
            {dict.posts.title}
          </h1>
          <Posts
            category={sp.category}
            tag={sp.tag}
            locale={locale}
            dict={dict.posts}
          />
        </section>
      </div>
    </div>
  );
}
