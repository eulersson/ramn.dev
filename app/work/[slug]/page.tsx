// Node.js
import fs from "fs";
import path from "path";

// Project
import { SingleProject } from "@/components/single-project";
import { toBool } from "@/lib";
import { getOneProjectData } from "@/lib/projects";

const projectsPath = path.join(process.cwd(), "content", "projects");

export const dynamicParams = false;

export function generateStaticParams() {
  const projects = fs.readdirSync(projectsPath);
  return projects.map((name) => ({ slug: name.replace(".mdx", "") }));
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const { metadata, Component } = await getOneProjectData(slug);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[ProjectPage] Rendering app/work/[slug]/page.ts", slug);
  }
  return (
    <SingleProject project={metadata}>
      <Component />
    </SingleProject>
  );
}
