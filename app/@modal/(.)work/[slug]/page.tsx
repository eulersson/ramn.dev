import { Modal } from "@/components/modal";
import { SingleProject } from "@/components/single-project";
import { toBool } from "@/lib";
import { getOneProjectData } from "@/lib/projects";

export default async function ProjectModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const projectSlug = (await params).slug;

  const { metadata, Component } = await getOneProjectData(projectSlug);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log(
      "[Modal] [ProjectPage] Rendering app/@modal/.(work)/[slug]/page.ts",
      projectSlug,
    );
  }
  return (
    <Modal>
      <SingleProject project={metadata}>
        <Component />
      </SingleProject>
    </Modal>
  );
}
