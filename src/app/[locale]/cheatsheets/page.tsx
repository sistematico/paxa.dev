import CheatSheets from "@/components/CheatSheets";
import Breadcrumb from "@/components/Breadcrumb";
import {
  getCheatSheets,
  getAllCategories,
  getAllTags,
} from "@/actions/cheatsheets";
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
    title: dict.cheatsheets.metaTitle,
    description: dict.cheatsheets.metaDesc,
  };
}

export default async function CheatSheetsPage({
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

  const cheatsheets = getCheatSheets(locale);
  const categories = getAllCategories(locale);
  const tags = getAllTags(locale);

  const activeFilters = [
    ...(sp.category
      ? [
          {
            label: d.categoryLabel,
            value: sp.category,
            clearHref: sp.tag
              ? `/cheatsheets?tag=${encodeURIComponent(sp.tag)}`
              : "/cheatsheets",
          },
        ]
      : []),
    ...(sp.tag
      ? [
          {
            label: d.tagLabel,
            value: `#${sp.tag}`,
            clearHref: sp.category
              ? `/cheatsheets?category=${encodeURIComponent(sp.category)}`
              : "/cheatsheets",
          },
        ]
      : []),
  ];

  return (
    <div className="px-4 py-6">
      <Breadcrumb
        items={[{ label: dict.cheatsheets.title }]}
        homeLabel={dict.breadcrumb.home}
        homeHref="/"
      />

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4">
          <ActiveFilters
            filters={activeFilters}
            clearAllHref="/cheatsheets"
            title={d.activeFilters}
            clearLabel={d.clearFilters}
          />

          <CategoryList
            title={d.categories}
            allLabel={d.all}
            items={categories.map((cat) => ({
              label: cat,
              href: `/cheatsheets?category=${encodeURIComponent(cat)}${sp.tag ? `&tag=${encodeURIComponent(sp.tag)}` : ""}`,
              active: sp.category === cat,
            }))}
            allHref="/cheatsheets"
            allActive={!sp.category}
          />

          <PillCloud
            title={d.tags}
            items={tags.map((t) => ({
              label: t,
              href: `/cheatsheets?${sp.category ? `category=${encodeURIComponent(sp.category)}&` : ""}tag=${encodeURIComponent(t)}`,
              active: sp.tag === t,
            }))}
          />

          <Stats
            title={d.stats}
            items={[
              {
                label: dict.cheatsheets.totalCheatSheets,
                value: cheatsheets.length,
              },
              { label: `${d.categories}:`, value: categories.length },
            ]}
          />
        </aside>

        <section className="lg:col-span-3">
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
            {dict.cheatsheets.title}
          </h1>
          <CheatSheets
            cheatsheets={cheatsheets}
            category={sp.category}
            tag={sp.tag}
            locale={locale}
            dict={dict.cheatsheets}
          />
        </section>
      </div>
    </div>
  );
}
