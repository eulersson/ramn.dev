// Project
import { SingleProject } from "@/components/single-project";
import { ThemeSwitch } from "@/components/theme-switch";
import { cn, isUpwork, toBool } from "@/lib";
import { getAllProjectSlugs, getOneProjectData } from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

const name = isUpwork ? "Ramon B." : "Ramon Blanquer";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getOneProjectData(slug);
  return {
    title: name + " | " + project.metadata.title,
    description: project.metadata.description,
  };
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getOneProjectData(slug);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[ProjectPage] Rendering /app/work/[slug]/page.tsx", slug);
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
      <SingleProject project={project} delayAnimation />
    </>
  );
}
