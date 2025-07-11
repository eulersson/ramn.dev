// Project
import { toBool } from "@/lib";
import { Project } from "@/types";

// Project - Local
import { SingleProjectBody } from "./body";
import { SingleProjectHeader } from "./header";
import { Ribbon } from "./ribbon";

export const SingleProject = async ({
  project,
  delayAnimation,
}: {
  project: Project;
  delayAnimation?: boolean;
}) => {
  const { metadata, Component, readmeMarkdown } = project;
  console.log("qrqrqr", metadata);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log(
      "[SingleProject] Rendering /components/single-project/index.tsx",
    );
  }

  return (
    <>
      <article id="project" className="relative">
        <Ribbon
          repo={project.metadata["repo"]}
          website={project.metadata["website"]}
        />
        <SingleProjectHeader
          delayAnimation={delayAnimation ? 3500 : 0}
          title={metadata.title}
          subtitle={metadata.description}
          imageSrc={metadata.headerImage || metadata.heroImage}
          skills={metadata.skills}
        />
        <SingleProjectBody repo={metadata.repo} readmeMarkdown={readmeMarkdown}>
          <Component />
        </SingleProjectBody>
      </article>
    </>
  );
};
