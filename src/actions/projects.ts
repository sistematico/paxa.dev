// src/actions/projects.ts
import fs from "node:fs";
import path from "node:path";

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
};

type ProjectsData = {
  projects: Project[];
};

export function getProjects(): Project[] {
  const filePath = path.join(process.cwd(), "src", "data", "projects.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data: ProjectsData = JSON.parse(fileContent);
  return data.projects;
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured);
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((project) => project.id === id);
}

export function getProjectsByTech(tech: string): Project[] {
  return getProjects().filter((project) =>
    project.tech.some((t) => t.toLowerCase() === tech.toLowerCase()),
  );
}

export function getAllTechs(): string[] {
  const projects = getProjects();
  const allTechs = projects.flatMap((project) => project.tech);
  return [...new Set(allTechs)].sort();
}
