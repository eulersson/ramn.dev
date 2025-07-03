import { SingleProject } from "@/components/single-project";
import { toBool } from "@/lib";
import { getAllProjectSlugs, getOneProjectData } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getOneProjectData(slug);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Project] Rendering /app/work/[slug]/page.tsx", slug);
  }

  return <SingleProject project={project} />;
}
