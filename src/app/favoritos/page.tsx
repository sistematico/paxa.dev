// src/app/favoritos/page.tsx
import Bookmarks from "@/components/Bookmarks";
import Breadcrumb from "@/components/Breadcrumb";
import {
  getBookmarks,
  getAllCategories,
  getAllTags,
} from "@/actions/bookmarks";
import {
  ActiveFilters,
  CategoryList,
  PillCloud,
  Stats,
} from "@/components/FilterSidebar";

export const metadata = {
  title: "Favoritos",
  description: "Links e recursos favoritos",
};

export default async function BookmarksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const params = await searchParams;
  const bookmarks = getBookmarks();
  const categories = getAllCategories();
  const tags = getAllTags();

  const activeFilters = [
    ...(params.category
      ? [
          {
            label: "Categoria",
            value: params.category,
            clearHref: params.tag
              ? `/favoritos?tag=${encodeURIComponent(params.tag)}`
              : "/favoritos",
          },
        ]
      : []),
    ...(params.tag
      ? [
          {
            label: "Tag",
            value: `#${params.tag}`,
            clearHref: params.category
              ? `/favoritos?category=${encodeURIComponent(params.category)}`
              : "/favoritos",
          },
        ]
      : []),
  ];

  return (
    <div className="px-4 py-6">
      <Breadcrumb items={[{ label: "Favoritos" }]} />

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4">
          <ActiveFilters filters={activeFilters} clearAllHref="/favoritos" />

          <CategoryList
            items={categories.map((cat) => ({
              label: cat,
              href: `/favoritos?category=${encodeURIComponent(cat)}${params.tag ? `&tag=${encodeURIComponent(params.tag)}` : ""}`,
              active: params.category === cat,
            }))}
            allHref="/favoritos"
            allActive={!params.category}
          />

          <PillCloud
            items={tags.map((t) => ({
              label: t,
              href: `/favoritos?${params.category ? `category=${encodeURIComponent(params.category)}&` : ""}tag=${encodeURIComponent(t)}`,
              active: params.tag === t,
            }))}
          />

          <Stats
            items={[
              { label: "Total de favoritos:", value: bookmarks.length },
              { label: "Categorias:", value: categories.length },
            ]}
          />
        </aside>

        <section className="lg:col-span-3">
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
            Favoritos
          </h1>
          <Bookmarks
            bookmarks={bookmarks}
            category={params.category}
            tag={params.tag}
          />
        </section>
      </div>
    </div>
  );
}
