import ProjectsList from "@/components/ProjectsList";
import Breadcrumb from "@/components/Breadcrumb";
import { getProjects, getAllTechs } from "@/actions/projects";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { ActiveFilters, PillCloud, Stats } from "@/components/FilterSidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);
  return {
    title: dict.projects.metaTitle,
    description: dict.projects.metaDesc,
  };
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tech?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const sp = await searchParams;
  const dict = await getDictionary(locale);
  const d = dict.common;
  const projects = getProjects();
  const techs = getAllTechs();

  const activeFilters = sp.tech
    ? [{ label: d.technologyLabel, value: sp.tech, clearHref: "/projetos" }]
    : [];

  return (
    <div className="px-4 py-6">
      <Breadcrumb
        items={[{ label: dict.projects.title }]}
        homeLabel={dict.breadcrumb.home}
        homeHref="/"
      />

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4">
          <ActiveFilters
            filters={activeFilters}
            clearAllHref="/projetos"
            title={d.activeFilters}
            clearLabel={d.clearFilters}
          />

          <PillCloud
            title={d.technologies}
            items={techs.map((tech) => ({
              label: tech,
              href: `/projetos?tech=${encodeURIComponent(tech)}`,
              active: sp.tech === tech,
            }))}
          />

          <Stats
            title={d.stats}
            items={[
              { label: dict.projects.totalProjects, value: projects.length },
              { label: `${d.technologies}:`, value: techs.length },
            ]}
          />
        </aside>

        <section className="lg:col-span-3">
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
            {dict.projects.title}
          </h1>
          <ProjectsList
            projects={projects}
            tech={sp.tech}
            dict={dict.projects}
          />
        </section>
      </div>
    </div>
  );
}
