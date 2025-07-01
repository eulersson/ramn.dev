"use server";

import { getAllProjectsData } from "@/lib/projects";
import type { ProjectInfo } from "@/types";

export async function getAllProjects(): Promise<ProjectInfo[]> {
  try {
    const { projects } = await getAllProjectsData();
    return projects.map((project) => ({
      slug: project.slug,
      featured: project.featured,
      metadata: project.metadata,
    }));
  } catch (error) {
    console.error("Failed to load featured projects:", error);
    return [];
  }
}
