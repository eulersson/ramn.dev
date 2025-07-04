// Project
import { CursorSize } from "@/components/cursor";
import { ThemedImage } from "@/components/themed-image";
import { cn, toBool } from "@/lib";
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
    <>
      <article id="project" className="relative">
        {project.metadata["repo"] && (
          <div className="absolute top-0 right-0 z-60 h-full">
            <div
              className={cn(
                "sticky z-60",
                "top-(--header-height) group-[.is-open]/modal:top-0",
                "group-[.is-open]/modal:mt-0",
              )}
            >
              <CursorSize sizeOnHover={0.4}>
                <a
                  href={`https://github.com/${project.metadata["repo"]}`}
                  target="_blank"
                  className={cn(
                    "bg-fore text-back hover:text-fore hover:bg-back hover:border-fore hover:border-r-2 hover:border-b-2",
                    "h-[calc(6*var(--spacing))] w-[70px] text-[12px]",
                    "right-[calc(50%-2*var(--bg-grid-box-size)-1.5*var(--bg-grid-gap))]",
                    "origin-top-right translate-y-[70px] rotate-90",
                    "flex items-center justify-center gap-1",
                    "group",
                  )}
                >
                  <ThemedImage
                    className="block group-hover:hidden"
                    src="/github.svg"
                    alt="GitHub Logo"
                    width={15}
                    height={15}
                    invert
                  />
                  <ThemedImage
                    className="hidden group-hover:block"
                    src="/github.svg"
                    alt="GitHub Logo"
                    width={15}
                    height={15}
                  />
                  GitHub
                </a>
              </CursorSize>
            </div>
          </div>
        )}
        {/* The content is displayed at: w-g40y, which is 4 box grid units with
      the gaps included, so we take this into account to center the ribbon. */}
        {false && project.metadata["repo"] && (
          <CursorSize sizeOnHover={0.4}>
            <a
              href={`https://github.com/${project.metadata["repo"]}`}
              target="_blank"
              className={cn(
                "fixed top-(--header-height) z-60",
                "bg-fore text-back hover:text-fore hover:bg-back hover:border-fore hover:border-r-2 hover:border-b-2",
                "h-[calc(6*var(--spacing))] w-[70px] text-[12px]",
                "right-[calc(50%-2*var(--bg-grid-box-size)-1.5*var(--bg-grid-gap))]",
                "origin-top-right translate-y-[70px] rotate-90",
                "flex items-center justify-center gap-1",
                "group",
              )}
            >
              <ThemedImage
                className="block group-hover:hidden"
                src="/github.svg"
                alt="GitHub Logo"
                width={15}
                height={15}
                invert
              />
              <ThemedImage
                className="hidden group-hover:block"
                src="/github.svg"
                alt="GitHub Logo"
                width={15}
                height={15}
              />
              GitHub
            </a>
          </CursorSize>
        )}
        <SingleProjectHeader
          title={metadata.title}
          subtitle={metadata.description}
          imageSrc={metadata.headerImage || metadata.heroImage}
        />
        <SingleProjectBody repo={metadata.repo} readmeMarkdown={readmeMarkdown}>
          <Component />
        </SingleProjectBody>
      </article>
    </>
  );
};
