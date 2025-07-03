// Node.js
import path from "path";
import fs from "fs";

// Third-Party
import { glob } from "glob";

// Project
import settings from "@/config/settings";
import type { Project, ProjectsData } from "@/types";

const projectsDirectory = path.join(process.cwd(), "content/projects");

//  export function getAllProjectSlugs() {
//    const projects = fs.readdirSync(projectsDirectory);
//    return projects.map((name) => (name.replace(".mdx", "")));
//  }
export function getAllProjectSlugs() {
  return glob
    .sync("*.mdx", { cwd: projectsDirectory })
    .map((filename) => filename.replace(/\.mdx$/, ""));
}

export async function getOneProjectData(slug: string): Promise<Project> {
  const { default: Component, metadata } = await import(
    `../content/projects/${slug}.mdx`
  );
  const featured = settings.featuredProjects.includes(slug);

  let readmeMarkdown;
  if (metadata.repo) {
    const [owner, repo] = metadata.repo.split("/");
    const filePath = "README.md";

    // Try both "main" and "master" branches
    const branches = ["main", "master"];
    let res: Response | null = null;
    let usedBranch = "";

    for (const branch of branches) {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
      try {
        res = await fetch(rawUrl);
        if (res.ok) {
          usedBranch = branch;
          break;
        }
      } catch {
        // Continue to next branch
        continue;
      }
    }

    if (!res || !res.ok) {
      throw Error(
        `Cannot GET README.md from ${owner}/${repo} (tried main and master branches)`,
      );
    }

    readmeMarkdown = await res.text();

    // Convert relative image paths to absolute GitHub URLs
    readmeMarkdown = readmeMarkdown.replace(
      /!\[([^\]]*)\]\((?!http)(.*?)\)/g,
      (_, alt, path) =>
        `![${alt}](https://raw.githubusercontent.com/${owner}/${repo}/${usedBranch}/${path})`,
    );

    // Remove the main project title heading that matches the slug
    readmeMarkdown = readmeMarkdown.replace(
      new RegExp(`^# ${slug}$`, "mi"),
      "",
    );
  }
  return { slug, featured, Component, metadata, readmeMarkdown };
}

export async function getAllProjectsData(): Promise<ProjectsData> {
  const orderedSlugs = getAllProjectSlugs().sort((a, b) => {
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
