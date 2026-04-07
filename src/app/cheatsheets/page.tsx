import CheatSheets from "@/components/CheatSheets";
import Breadcrumb from "@/components/Breadcrumb";
import {
  getCheatSheets,
  getAllCategories,
  getAllTags,
} from "@/actions/cheatsheets";
import {
  ActiveFilters,
  CategoryList,
  PillCloud,
  Stats,
} from "@/components/FilterSidebar";

export const metadata = {
  title: "CheatSheets",
  description: "Referências rápidas para terminal, Linux e ferramentas",
};

export default async function CheatSheetsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const params = await searchParams;
  const cheatsheets = getCheatSheets();
  const categories = getAllCategories();
  const tags = getAllTags();

  const activeFilters = [
    ...(params.category
      ? [
          {
            label: "Categoria",
            value: params.category,
            clearHref: params.tag
              ? `/cheatsheets?tag=${encodeURIComponent(params.tag)}`
              : "/cheatsheets",
          },
        ]
      : []),
    ...(params.tag
      ? [
          {
            label: "Tag",
            value: `#${params.tag}`,
            clearHref: params.category
              ? `/cheatsheets?category=${encodeURIComponent(params.category)}`
              : "/cheatsheets",
          },
        ]
      : []),
  ];

  return (
    <div className="px-4 py-6">
      <Breadcrumb items={[{ label: "CheatSheets" }]} />

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4">
          <ActiveFilters filters={activeFilters} clearAllHref="/cheatsheets" />

          <CategoryList
            items={categories.map((cat) => ({
              label: cat,
              href: `/cheatsheets?category=${encodeURIComponent(cat)}${params.tag ? `&tag=${encodeURIComponent(params.tag)}` : ""}`,
              active: params.category === cat,
            }))}
            allHref="/cheatsheets"
            allActive={!params.category}
          />

          <PillCloud
            items={tags.map((t) => ({
              label: t,
              href: `/cheatsheets?${params.category ? `category=${encodeURIComponent(params.category)}&` : ""}tag=${encodeURIComponent(t)}`,
              active: params.tag === t,
            }))}
          />

          <Stats
            items={[
              { label: "Total de cheatsheets:", value: cheatsheets.length },
              { label: "Categorias:", value: categories.length },
            ]}
          />
        </aside>

        <section className="lg:col-span-3">
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
            CheatSheets
          </h1>
          <CheatSheets
            cheatsheets={cheatsheets}
            category={params.category}
            tag={params.tag}
          />
        </section>
      </div>
    </div>
  );
}
