"use client";

// React
import {
  CSSProperties,
  Dispatch,
  forwardRef,
  SetStateAction,
  useState,
  type ForwardedRef,
} from "react";

// Next.js
import Image from "next/image";
import Link from "next/link";

// Third-Party
import { AnimatePresence, motion } from "motion/react";

// Project
import { CursorSize } from "@/components/cursor";
import { cn, toRoman } from "@/lib";
import type { ProjectInfo, ProjectMetadata } from "@/types";

export const ProjectCarousel = ({ projects }: { projects: ProjectInfo[] }) => {
  const [selectedProject, setSelectedProject] = useState(0);

  if (projects.length == 0) {
    return;
  }

  const project = projects[selectedProject];
  if (!project) {
    return;
  }

  return (
    <div
      className={cn(
        "pointer-events-auto",
        "bg-back border-2-fore mb-g10n",
        "h-g30y xs:h-g20y",
        "md:p-[10px] ",
      )}
    >
      <div className="relative h-full w-full border-2-fore flex">
        <ProjectSelector
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <div className="grow relative overflow-hidden">
          <AnimatePresence>
            <motion.div
              className="h-full absolute inset-0 flex flex-col"
              key={project.slug}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "linear", duration: 0.4 }} // Remove spring/bounce, use linear tween
            >
              <div
                className="w-full h-[20px] bg-fore flex-shrink-0"
                style={filmStripeStyle}
              ></div>
              <div className="flex-1 min-h-0 relative bg-fore px-[60px]">
                <ProjectSummary
                  className="h-full"
                  slug={project.slug}
                  project={project.metadata}
                />
              </div>
              <div
                className="w-full h-[20px] bg-fore flex-shrink-0"
                style={filmStripeStyle}
              ></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ProjectSelector = ({
  projects,
  selectedProject,
  setSelectedProject,
}: {
  projects: ProjectInfo[];
  selectedProject: number;
  setSelectedProject: Dispatch<SetStateAction<number>>;
}) => (
  <CursorSize sizeOnHover={0.2}>
    <div
      className={cn(
        "absolute w-full h-[20px] -top-[21px] z-10",
        "flex gap-1 items-center justify-center",
      )}
    >
      {projects.map((_, i) => (
        <div
          key={i}
          className={cn(
            "pointer-events-auto",
            "w-[45px] h-[45px]",
            "font-serif text-[30px] flex items-center justify-center border-2-fore",
            "hover:w-[70px]",
            "transition-[width] duration-150 ease-in-out",
            i == selectedProject ? "text-back bg-fore" : "text-fore bg-back",
          )}
          onClick={() => setSelectedProject(i)}
        >
          {toRoman(i + 1)}
        </div>
      ))}
    </div>
  </CursorSize>
);

const ProjectSummary = forwardRef<
  HTMLDivElement,
  { project: ProjectMetadata; slug: string; className: string }
>(function ProjectSummary(
  { project, slug, className },
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { title, name, description, heroImage } = project;
  const displayTitle = title || name || slug;

  const blackTextOutline: CSSProperties = {
    textShadow:
      "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
  };

  return (
    <div ref={ref} className={cn("relative flex", className)}>
      <div className="absolute w-full h-full flex flex-col justify-between">
        <motion.span
          initial={{ x: -150 }}
          animate={{ x: 5 }}
          transition={{ delay: 0.5 }}
          className={cn(
            "font-mono text-back",
            "origin-top-left rotate-90",
            "text-[24px]",
          )}
        >
          {displayTitle}
        </motion.span>
        {description && (
          <motion.p
            className={cn(
              "text-center text-[#ff0] text-ellipsis",

              "text-[14px] leading-[18px] max-h-[36px]",
              "xs:text-[14px] xs:leading-[18px] xs:max-h-[36px]",
              "md:text-[20px] md:leading-[26px] md:max-xl:max-h-[52px]",

              "md:mb-[20px] md:px-[40px]",

              "max-xl:line-clamp-2",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.01, delay: 0 } }}
            transition={{ delay: 1.2, duration: 0.01 }}
            style={blackTextOutline}
          >
            {description}
          </motion.p>
        )}
      </div>
      <CursorSize sizeOnHover={0.4} className="w-full">
        <Link href={`/work/${slug}`} className="w-full">
          <Image
            className="w-full h-full rounded-xl xs:rounded-2xl sm:rounded-4xl"
            src={heroImage}
            width={900}
            height={900}
            style={{ objectFit: "cover" }}
            alt={slug}
          />
        </Link>
      </CursorSize>
    </div>
  );
});

const filmStripeStyle: CSSProperties = {
  height: "20px",
  backgroundColor: "black",
  backgroundImage:
    "repeating-linear-gradient(to right, black 0px, black 6px, white 6px, white 13px, black 13px, black 19px)",
  backgroundPosition: "0 4px",
  backgroundSize: "19px 12px",
  backgroundRepeat: "repeat-x",
};
