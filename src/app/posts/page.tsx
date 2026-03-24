// src/app/posts/page.tsx
import Posts from "@/components/Posts";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllCategories, getAllTags, getPosts } from "@/actions/posts";
import {
  ActiveFilters,
  CategoryList,
  PillCloud,
  Stats,
} from "@/components/FilterSidebar";

export const metadata = {
  title: "Blog - Paxá",
  description: "Leia meu blog",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const params = await searchParams;
  const categories = getAllCategories();
  const tags = getAllTags();
  const allPosts = getPosts();

  const activeFilters = [
    ...(params.category
      ? [
          {
            label: "Categoria",
            value: params.category,
            clearHref: params.tag
              ? `/posts?tag=${encodeURIComponent(params.tag)}`
              : "/posts",
          },
        ]
      : []),
    ...(params.tag
      ? [
          {
            label: "Tag",
            value: `#${params.tag}`,
            clearHref: params.category
              ? `/posts?category=${encodeURIComponent(params.category)}`
              : "/posts",
          },
        ]
      : []),
  ];

  return (
    <div className="px-4 py-6">
      <Breadcrumb items={[{ label: "Blog" }]} />

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4">
          <ActiveFilters filters={activeFilters} clearAllHref="/posts" />

          <CategoryList
            items={categories.map((cat) => ({
              label: cat,
              href: `/posts?category=${encodeURIComponent(cat)}${params.tag ? `&tag=${encodeURIComponent(params.tag)}` : ""}`,
              active: params.category === cat,
            }))}
            allHref="/posts"
            allActive={!params.category}
          />

          <PillCloud
            items={tags.map((t) => ({
              label: t,
              href: `/posts?${params.category ? `category=${encodeURIComponent(params.category)}&` : ""}tag=${encodeURIComponent(t)}`,
              active: params.tag === t,
            }))}
          />

          <Stats
            items={[
              { label: "Total de posts:", value: allPosts.length },
              { label: "Categorias:", value: categories.length },
              { label: "Tags:", value: tags.length },
            ]}
          />
        </aside>

        <section className="lg:col-span-3">
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Blog</h1>
          <Posts category={params.category} tag={params.tag} />
        </section>
      </div>
    </div>
  );
}
