// Project
import { toBool } from "@/lib";
import { Project } from "@/types";

// Project - Local
import { SingleProjectBody } from "./body";
import { SingleProjectHeader } from "./header";

export const SingleProject = async ({ project }: { project: Project }) => {
  const { metadata, Component, readmeMarkdown } = project;

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log(
      "[SingleProject] Rendering /components/single-project/index.tsx",
    );
  }

  return (
    <article id="project">
      <SingleProjectHeader
        title={metadata.title}
        subtitle={metadata.description}
        imageSrc={metadata.headerImage || metadata.heroImage}
      />
      <SingleProjectBody readmeMarkdown={readmeMarkdown}>
        <Component />
      </SingleProjectBody>
    </article>
  );
};
