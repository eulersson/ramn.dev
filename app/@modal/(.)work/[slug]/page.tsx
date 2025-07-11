// Next.js

import { Modal } from "@/components/modal";
import { SingleProject } from "@/components/single-project";
import { sleep, toBool } from "@/lib";
import { getAllProjectSlugs, getOneProjectData } from "@/lib/projects";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getOneProjectData(slug);

  // Modal gets a nicer flow.
  await sleep(1200);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log(
      "[ProjectModal] Rendering app/@modal/(.)work/[slug]/page.tsx",
      slug,
    );
  }

  return (
    <Modal key="modal">
      <SingleProject project={project} />
    </Modal>
  );
}
