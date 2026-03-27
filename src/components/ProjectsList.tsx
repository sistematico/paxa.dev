// src/components/ProjectsList.tsx
"use client";

import Link from "next/link";
import { Calculator, Radio, FolderGit2 } from "lucide-react";
import type { Project } from "@/actions/projects";
import type { Dictionary } from "@/i18n";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Radio,
  FolderGit2,
};

interface ProjectsListProps {
  projects: Project[];
  tech?: string;
  dict?: Dictionary["projects"];
}

export default function ProjectsList({
  projects,
  tech,
  dict,
}: ProjectsListProps) {
  const filteredProjects = tech
    ? projects.filter((project) =>
        project.tech.some((t) => t.toLowerCase() === tech.toLowerCase()),
      )
    : projects;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {filteredProjects.map((project) => {
        const Icon = iconMap[project.icon || ""] || FolderGit2;

        return (
          <article
            key={project.id}
            className="group border border-border rounded-lg p-6 hover:border-accent/40 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Ícone */}
              <div className="shrink-0 w-12 h-12 rounded-lg bg-surface-alt flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Icon className="size-6 text-accent" />
              </div>

              <div className="flex-1 min-w-0">
                {/* Título */}
                <h2 className="text-xl font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                  {project.title}
                </h2>

                {/* Descrição */}
                <p className="text-sm text-muted mb-4">{project.description}</p>

                {/* Tecnologias */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((techItem) => (
                    <Link
                      key={techItem}
                      href={`/projetos?tech=${encodeURIComponent(techItem)}`}
                      className="px-2 py-0.5 bg-surface text-foreground text-xs rounded hover:bg-surface-alt transition-colors"
                    >
                      {techItem}
                    </Link>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-accent-hover transition-colors"
                    >
                      GitHub →
                    </a>
                  )}
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
          </article>
        );
      })}

      {filteredProjects.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted">
            {dict?.noProjectsFound ?? "Nenhum projeto encontrado"}
            {tech && (
              <>
                {" "}
                {dict?.noProjectsFor ?? "com"} <strong>{tech}</strong>
              </>
            )}
          </p>
          {tech && (
            <Link
              href="/projetos"
              className="text-sm text-accent hover:text-accent-hover mt-2 inline-block"
            >
              {dict?.seeAllProjects ?? "Ver todos os projetos →"}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
