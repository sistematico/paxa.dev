import Posts from "@/components/Posts";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllCategories, getAllTags, getPosts } from "@/actions/posts";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import {
  ActiveFilters,
  CategoryList,
  PillCloud,
  Stats,
} from "@/components/FilterSidebar";

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
  const allPosts = getPosts(locale);

  const activeFilters = [
    ...(sp.category
      ? [
          {
            label: d.categoryLabel,
            value: sp.category,
            clearHref: sp.tag
              ? `/posts?tag=${encodeURIComponent(sp.tag)}`
              : "/posts",
          },
        ]
      : []),
    ...(sp.tag
      ? [
          {
            label: d.tagLabel,
            value: `#${sp.tag}`,
            clearHref: sp.category
              ? `/posts?category=${encodeURIComponent(sp.category)}`
              : "/posts",
          },
        ]
      : []),
  ];

  return (
    <div className="px-4 py-6">
      <Breadcrumb
        items={[{ label: dict.posts.title }]}
        homeLabel={dict.breadcrumb.home}
        homeHref="/"
      />

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4">
          <ActiveFilters
            filters={activeFilters}
            clearAllHref="/posts"
            title={d.activeFilters}
            clearLabel={d.clearFilters}
          />

          <CategoryList
            title={d.categories}
            allLabel={d.all}
            items={categories.map((cat) => ({
              label: cat,
              href: `/posts?category=${encodeURIComponent(cat)}${sp.tag ? `&tag=${encodeURIComponent(sp.tag)}` : ""}`,
              active: sp.category === cat,
            }))}
            allHref="/posts"
            allActive={!sp.category}
          />

          <PillCloud
            title={d.tags}
            items={tags.map((t) => ({
              label: t,
              href: `/posts?${sp.category ? `category=${encodeURIComponent(sp.category)}&` : ""}tag=${encodeURIComponent(t)}`,
              active: sp.tag === t,
            }))}
          />

          <Stats
            title={d.stats}
            items={[
              { label: "Total:", value: allPosts.length },
              { label: `${d.categories}:`, value: categories.length },
              { label: `${d.tags}:`, value: tags.length },
            ]}
          />
        </aside>

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
