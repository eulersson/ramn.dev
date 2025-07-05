import { SingleProject } from "@/components/single-project";
import { ThemeSwitch } from "@/components/theme-switch";
import { cn, toBool } from "@/lib";
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

  return (
    <>
      <div
        className={cn(
          "absolute z-40",
          "top-[calc(var(--header-height)+4px)] left-[calc(50%-35px)]",
          "xs:top-[calc(var(--header-height)+12px)]",
          "sm:top-[calc(var(--header-height)+0.1*var(--bg-grid-box-size))] sm:left-[calc(50%-1.9*var(--bg-grid-box-size))]",
        )}
      >
        <ThemeSwitch yInitial={-100} />
      </div>
      <SingleProject project={project} />
    </>
  );
}
