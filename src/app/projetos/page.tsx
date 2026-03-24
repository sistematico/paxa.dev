// src/app/projetos/page.tsx
import ProjectsList from "@/components/ProjectsList";
import Breadcrumb from "@/components/Breadcrumb";
import { getProjects, getAllTechs } from "@/actions/projects";
import { ActiveFilters, PillCloud, Stats } from "@/components/FilterSidebar";

export const metadata = {
  title: "Projetos",
  description: "Veja meus projetos e trabalhos",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tech?: string }>;
}) {
  const params = await searchParams;
  const projects = getProjects();
  const techs = getAllTechs();

  const activeFilters = params.tech
    ? [{ label: "Tecnologia", value: params.tech, clearHref: "/projetos" }]
    : [];

  return (
    <div className="px-4 py-6">
      <Breadcrumb items={[{ label: "Projetos" }]} />

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4">
          <ActiveFilters filters={activeFilters} clearAllHref="/projetos" />

          <PillCloud
            title="Tecnologias"
            items={techs.map((tech) => ({
              label: tech,
              href: `/projetos?tech=${encodeURIComponent(tech)}`,
              active: params.tech === tech,
            }))}
          />

          <Stats
            items={[
              { label: "Total de projetos:", value: projects.length },
              { label: "Tecnologias:", value: techs.length },
            ]}
          />
        </aside>

        <section className="lg:col-span-3">
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
            Projetos
          </h1>
          <ProjectsList projects={projects} tech={params.tech} />
        </section>
      </div>
    </div>
  );
}
