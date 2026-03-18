import Link from "next/link";
import { Calculator, Radio, FolderGit2 } from "lucide-react";
import projects from "@/data/projects.json";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Radio,
  FolderGit2,
};

export default function Projects() {
  const featuredProjects = projects.projects.filter((p) => p.featured);

  return (
    <section id="projetos" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Projetos em Destaque
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => {
            const Icon = iconMap[project.icon || ""] || FolderGit2;

            return (
              <div
                key={project.id}
                className="group border border-border rounded-lg p-6 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-14 h-14 rounded-lg bg-surface-alt flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="size-7 text-accent" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-surface text-foreground text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:text-accent-hover transition-colors"
                      >
                        GitHub →
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-accent hover:text-accent-hover transition-colors"
                        >
                          Demo →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/projetos"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            Ver todos os projetos →
          </Link>
        </div>
      </div>
    </section>
  );
}
