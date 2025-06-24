// Node.js
import fs from "fs";
import path from "path";

// Next.js
import dynamic from "next/dynamic";

// Project
import { toBool } from "@/lib";

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

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[ProjectPage] Rendering app/work/[slug]/page.ts", slug);
  }
  const Project = dynamic(() => import(`@/content/projects/${slug}.mdx`));
  return (
    <section>
      <h1>Slug: {slug}</h1>
      <Project />
    </section>
  );
}
