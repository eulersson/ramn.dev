// Node.js
import path from "path";
import { glob } from "glob";

// Project
import type { Project, ProjectsData } from "@/types";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export async function getOneProjectData(slug: string): Promise<Project> {
  // Dynamically import the MDX file and its metadata
  const { default: Component, metadata } = await import(
    `../content/projects/${slug}.mdx`
  );
  return { slug, Component, metadata };
}

export async function getAllProjectsData(): Promise<ProjectsData> {
  // Get all MDX files in the projects directory
  const files = glob.sync("*.mdx", { cwd: projectsDirectory });

  const projects = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");

      // Dynamically import the MDX file and its metadata
      const { default: Component, metadata } = await import(
        `../content/projects/${filename}`
      );

      return {
        slug,
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
