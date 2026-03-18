// src/app/projetos/page.tsx
import ProjectsList from "@/components/ProjectsList";
import Breadcrumb from "@/components/Breadcrumb";
import { getProjects, getAllTechs } from "@/actions/projects";
import Link from "next/link";

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

  return (
    <div className="px-4 py-6">
      <Breadcrumb items={[{ label: "Projetos" }]} />

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Filtros ativos */}
          {params.tech && (
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Filtros ativos</h3>
                <Link
                  href="/projetos"
                  className="text-xs text-muted hover:text-accent transition-colors"
                >
                  Limpar
                </Link>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">Tecnologia:</span>
                  <span className="px-2 py-0.5 bg-surface-alt text-xs rounded">
                    {params.tech}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tecnologias */}
          {techs.length > 0 && (
            <div className="bg-surface rounded-lg p-4">
              <h3 className="font-semibold mb-3">Tecnologias</h3>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <Link
                    key={tech}
                    href={`/projetos?tech=${encodeURIComponent(tech)}`}
                    className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                      params.tech === tech
                        ? "bg-accent text-background font-medium"
                        : "bg-surface-alt hover:bg-border"
                    }`}
                  >
                    {tech}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Estatísticas */}
          <div className="bg-surface rounded-lg p-4">
            <h3 className="font-semibold mb-3">Estatísticas</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Total de projetos:</span>
                <span className="font-medium">{projects.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Tecnologias:</span>
                <span className="font-medium">{techs.length}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Projetos */}
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
