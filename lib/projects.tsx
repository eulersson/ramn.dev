// Node.js
import path from "path";
import { glob } from "glob";

// Project
import type { Project, ProjectsData } from "@/types";
import settings from "@/config/settings";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export async function getOneProjectData(slug: string): Promise<Project> {
  const { default: Component, metadata } = await import(
    `../content/projects/${slug}.mdx`
  );
  const featured = settings.featuredProjects.includes(slug);
  return { slug, featured, Component, metadata };
}

export async function getAllProjectsData(): Promise<ProjectsData> {
  const orderedSlugs = glob
    .sync("*.mdx", { cwd: projectsDirectory })
    .map((filename) => filename.replace(/\.mdx$/, ""))
    .sort((a, b) => {
      const orderA = settings.projects.indexOf(a);
      const orderB = settings.projects.indexOf(b);

      if (orderA === -1 && orderB === -1) {
        return a.localeCompare(b); // fallback to alphabetical if both not found
      }
      if (orderA === -1) return 1; // a not found, b found: a after b
      if (orderB === -1) return -1; // b not found, a found: a before b
      return orderA - orderB; // both found: sort by order in settings.projects
    });

  const projects = await Promise.all(
    orderedSlugs.map(async (slug) => {
      const { default: Component, metadata } = await import(
        `../content/projects/${slug}.mdx`
      );

      const featured = settings.featuredProjects.includes(slug);

      return {
        slug,
        featured,
        Component,
        metadata,
      };
    }),
  );

  return {
    projects,
    count: projects.length,
  };
}
