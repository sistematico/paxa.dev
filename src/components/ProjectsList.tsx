// src/components/ProjectsList.tsx
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/actions/projects";

interface ProjectsListProps {
  projects: Project[];
  tech?: string;
}

export default function ProjectsList({ projects, tech }: ProjectsListProps) {
  // Filtrar por tech se especificado
  const filteredProjects = tech
    ? projects.filter((project) =>
        project.tech.some((t) => t.toLowerCase() === tech.toLowerCase()),
      )
    : projects;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {filteredProjects.map((project) => (
        <article
          key={project.id}
          className="group border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          {/* Imagem do projeto */}
          {project.image && (
            <div className="relative w-full h-48 bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="p-6">
            {/* Título */}
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
              {project.title}
            </h2>

            {/* Descrição */}
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              {project.description}
            </p>

            {/* Tecnologias */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((techItem) => (
                <Link
                  key={techItem}
                  href={`/projetos?tech=${encodeURIComponent(techItem)}`}
                  className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
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
                  className="text-sm text-neutral-900 dark:text-neutral-100 hover:underline"
                >
                  GitHub →
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-900 dark:text-neutral-100 hover:underline"
                >
                  Demo →
                </a>
              )}
            </div>
          </div>
        </article>
      ))}

      {filteredProjects.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400">
            Nenhum projeto encontrado
            {tech && (
              <>
                {" "}
                com <strong>{tech}</strong>
              </>
            )}
          </p>
          {tech && (
            <Link
              href="/projetos"
              className="text-sm text-neutral-900 dark:text-neutral-100 hover:underline mt-2 inline-block"
            >
              Ver todos os projetos →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
