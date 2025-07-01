"use client";

// React
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ForwardedRef,
} from "react";

// Third-Party
import debug from "debug";
import { motion, useInView } from "motion/react";

// Project
import {
  Spinner,
  SPINNER_CYCLE_DURATION_SECONDS,
} from "@/components/layout/spinner";
import { ProjectCarousel } from "@/components/project-carousel";
import { ProjectGrid } from "@/components/project-grid";
import { Title } from "@/components/title";
import { cn, toBool } from "@/lib";
import { getAllProjects } from "@/lib/actions/projects";
import { ProjectInfo } from "@/types";

const log = debug("projects");

const Projects = forwardRef<HTMLElement, {}>(function Projects(
  {},
  ref: ForwardedRef<HTMLElement>,
) {
  const disableSpinner = toBool(process.env.NEXT_PUBLIC_DISABLE_SPINNERS);

  const [loading, setLoading] = useState(true);
  const [featuredProjects, setFeaturedProjects] = useState<ProjectInfo[]>([]);
  const [projects, setProjects] = useState<ProjectInfo[]>([]);

  const localRef = useRef<HTMLElement>(null);

  // Allow both local usage and parent access
  useImperativeHandle(ref, () => localRef.current as HTMLElement);

  const sectionInView = useInView(localRef);

  useEffect(() => {
    if (disableSpinner) {
      return;
    }

    if (sectionInView) {
      setTimeout(() => setLoading(false), SPINNER_CYCLE_DURATION_SECONDS * 500);
    }
  }, [sectionInView]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const projects = await getAllProjects();
        log("[section.Projects]", projects);
        setProjects(projects);
        setFeaturedProjects(projects.filter((project) => project.featured));
        disableSpinner && setLoading(false);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
      }
    }

    loadProjects();
  }, []);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Projects] Rendering");
  }

  return (
    <section ref={localRef} className="flex flex-col justify-center">
      <Title
        className={cn(
          // Upper spacing
          "mt-[calc(var(--bg-grid-box-size)+1*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",
          "sm:mt-[calc(var(--bg-grid-box-size)+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",
          "md:mt-[calc(var(--bg-grid-box-size)/2+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",

          // Lower spacing
          "mb-[calc(var(--bg-grid-box-size)-var(--title-tag-size)/2-var(--title-tag-padding))]",
        )}
      >
        Projects
      </Title>

      {loading && !disableSpinner ? (
        <>
          <Spinner className="h-g30y xs:h-g20y mb-g10n" />
          <Spinner className="h-g20y xs:h-g10y" />
        </>
      ) : (
        featuredProjects.length > 0 &&
        projects.length > 0 && (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <ProjectCarousel projects={featuredProjects} />
            </motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <ProjectGrid projects={projects} />
            </motion.div>
          </>
        )
      )}
    </section>
  );
});

export { Projects };
