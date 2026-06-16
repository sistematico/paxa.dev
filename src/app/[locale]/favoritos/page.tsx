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
    title: dict.bookmarks.metaTitle,
    description: dict.bookmarks.metaDesc,
  };
}

export default async function BookmarksPage({
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

  const bookmarks = getBookmarks();
  const categories = getAllCategories();
  const tags = getAllTags();

  const activeFilters = [
    ...(sp.category
      ? [
          {
            label: d.categoryLabel,
            value: sp.category,
            clearHref: sp.tag
              ? `/${locale}/favoritos?tag=${encodeURIComponent(sp.tag)}`
              : `/${locale}/favoritos`,
          },
        ]
      : []),
    ...(sp.tag
      ? [
          {
            label: d.tagLabel,
            value: `#${sp.tag}`,
            clearHref: sp.category
              ? `/${locale}/favoritos?category=${encodeURIComponent(sp.category)}`
              : `/${locale}/favoritos`,
          },
        ]
      : []),
  ];

  return (
    <div className="px-4 py-6">
      <Breadcrumb
        items={[{ label: dict.bookmarks.title }]}
        homeLabel={dict.breadcrumb.home}
        homeHref="/"
      />

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4">
          <ActiveFilters
            filters={activeFilters}
            clearAllHref={`/${locale}/favoritos`}
            title={d.activeFilters}
            clearLabel={d.clearFilters}
          />

          <CategoryList
            items={categories.map((cat) => ({
              label: cat,
              href: `/${locale}/favoritos?category=${encodeURIComponent(cat)}${sp.tag ? `&tag=${encodeURIComponent(sp.tag)}` : ""}`,
              active: sp.category === cat,
            }))}
            title={d.categories}
            allLabel={d.all}
            allHref={`/${locale}/favoritos`}
            allActive={!sp.category}
          />

          <PillCloud
            items={tags.map((t) => ({
              label: t,
              href: `/${locale}/favoritos?${sp.category ? `category=${encodeURIComponent(sp.category)}&` : ""}tag=${encodeURIComponent(t)}`,
              active: sp.tag === t,
            }))}
            title={d.tags}
          />

          <Stats
            items={[
              { label: dict.bookmarks.totalBookmarks, value: bookmarks.length },
              { label: `${d.categories}:`, value: categories.length },
            ]}
            title={d.stats}
          />
        </aside>

        <section className="lg:col-span-3">
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
            {dict.bookmarks.title}
          </h1>
          <Bookmarks
            bookmarks={bookmarks}
            category={sp.category}
            tag={sp.tag}
            dict={dict.bookmarks}
          />
        </section>
      </div>
    </div>
  );
}
