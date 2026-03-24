import ProjectsList from "@/components/ProjectsList";
import Breadcrumb from "@/components/Breadcrumb";
import { getProjects, getAllTechs } from "@/actions/projects";
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

  return (
    <div className="px-4 py-6">
      <Breadcrumb
        items={[{ label: dict.projects.title }]}
        homeLabel={dict.breadcrumb.home}
        homeHref={`/${locale}`}
      />

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          {sp.tech && (
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{d.activeFilters}</h3>
                <Link
                  href={`/${locale}/projetos`}
                  className="text-xs text-muted hover:text-accent transition-colors"
                >
                  {d.clearFilters}
                </Link>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">
                    {d.technologyLabel}
                  </span>
                  <span className="px-2 py-0.5 bg-surface-alt text-xs rounded">
                    {sp.tech}
                  </span>
                </div>
              </div>
            </div>
          )}

          {techs.length > 0 && (
            <div className="bg-surface rounded-lg p-4">
              <h3 className="font-semibold mb-3">{d.technologies}</h3>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <Link
                    key={tech}
                    href={`/${locale}/projetos?tech=${encodeURIComponent(tech)}`}
                    className={`px-2.5 py-1 rounded-full text-xs transition-colors ${sp.tech === tech ? "bg-accent text-background font-medium" : "bg-surface-alt hover:bg-border"}`}
                  >
                    {tech}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-surface rounded-lg p-4">
            <h3 className="font-semibold mb-3">{d.stats}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">
                  {dict.projects.totalProjects}
                </span>
                <span className="font-medium">{projects.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">{d.technologies}:</span>
                <span className="font-medium">{techs.length}</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-3">
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
            {dict.projects.title}
          </h1>
          <ProjectsList
            projects={projects}
            tech={sp.tech}
            locale={locale}
            dict={dict.projects}
          />
        </section>
      </div>
    </div>
  );
}
