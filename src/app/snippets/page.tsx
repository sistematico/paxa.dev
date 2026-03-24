// src/app/snippets/page.tsx
import Snippets from "@/components/Snippets";
import Breadcrumb from "@/components/Breadcrumb";
import { getSnippets, getAllCategories, getAllTags } from "@/actions/snippets";
import {
  ActiveFilters,
  CategoryList,
  PillCloud,
  Stats,
} from "@/components/FilterSidebar";

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

  const activeFilters = [
    ...(params.category
      ? [
          {
            label: "Categoria",
            value: params.category,
            clearHref: params.tag
              ? `/snippets?tag=${encodeURIComponent(params.tag)}`
              : "/snippets",
          },
        ]
      : []),
    ...(params.tag
      ? [
          {
            label: "Tag",
            value: `#${params.tag}`,
            clearHref: params.category
              ? `/snippets?category=${encodeURIComponent(params.category)}`
              : "/snippets",
          },
        ]
      : []),
  ];

  return (
    <div className="px-4 py-6">
      <Breadcrumb items={[{ label: "Snippets" }]} />

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4">
          <ActiveFilters filters={activeFilters} clearAllHref="/snippets" />

          <CategoryList
            items={categories.map((cat) => ({
              label: cat,
              href: `/snippets?category=${encodeURIComponent(cat)}${params.tag ? `&tag=${encodeURIComponent(params.tag)}` : ""}`,
              active: params.category === cat,
            }))}
            allHref="/snippets"
            allActive={!params.category}
          />

          <PillCloud
            items={tags.map((t) => ({
              label: t,
              href: `/snippets?${params.category ? `category=${encodeURIComponent(params.category)}&` : ""}tag=${encodeURIComponent(t)}`,
              active: params.tag === t,
            }))}
          />

          <Stats
            items={[
              { label: "Total de snippets:", value: snippets.length },
              { label: "Categorias:", value: categories.length },
            ]}
          />
        </aside>

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
