// Node.js
import fs from "fs";
import path from "path";

// Next.js
import dynamic from "next/dynamic";
import environment from "@/environment";

const projectsPath = path.join(process.cwd(), "content", "projects");

export const dynamicParams = false;

export function generateStaticParams() {
  const projects = fs.readdirSync(projectsPath);
  return projects.map((name) => ({ slug: name.replace(".mdx", "") }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (environment.printComponentRendering) {
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
