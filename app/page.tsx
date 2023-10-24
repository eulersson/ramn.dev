"use client";

// Third-Party
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
} from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { debug } from "debug";

// Project
import { SectionProvider, useSection } from "@/contexts/section";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { PageWrapper } from "@/app/page-wrapper";
import { Projects } from "@/components/sections/projects";
import { toBool } from "@/utils";
import { usePrevious } from "@/hooks/previous";

// Loggers
const log = debug("page");
const sectionsLog = debug("sections");

export default function Page() {
  return (
    <SectionProvider>
      <Home></Home>
    </SectionProvider>
  );
}

function Home() {
  const { section, setSection, navigationRunning } = useSection();
  const previousSection = usePrevious(section);

  const { scrollYProgress } = useScroll();

  const heroRef = useRef<HTMLHeadingElement>(null);
  const heroInView = useInView(heroRef);

  useEffect(() => {
    handleSectionInViewChange("home", heroInView);
  }, [heroInView]);

  const aboutRef = useRef<HTMLHeadingElement>(null);
  const aboutInView = useInView(aboutRef);

  useEffect(() => {
    handleSectionInViewChange("about", aboutInView);
  }, [aboutInView]);

  const experienceRef = useRef<HTMLHeadingElement>(null);
  const experienceInView = useInView(experienceRef);

  useEffect(() => {
    handleSectionInViewChange("experience", experienceInView);
  }, [experienceInView]);

  const projectsRef = useRef<HTMLHeadingElement>(null);
  const projectsInView = useInView(projectsRef);

  useEffect(() => {
    handleSectionInViewChange("projects", projectsInView);
  }, [projectsInView]);

  /**
   * Changes the current section depending on whether the container from a section has
   * come into view or left the viewport.
   * @param sectionChange New section that has either come into view or left from view.
   * @param inView Whether it came into view or left.
   */
  const handleSectionInViewChange = useCallback(
    (sectionChange: string, inView: boolean) => {
      sectionsLog(
        `[inView] [${sectionChange}] navigationRunning: ${navigationRunning.current} ` +
          `inView: ${inView}`
      );
      if (navigationRunning.current) {
        sectionsLog(
          "Returning because an animation resulting from a nav item click is running."
        );
        return;
      }

      if (inView && section !== sectionChange) {
        sectionsLog(
          `[inView] [${sectionChange}:ON] setting section to new '${sectionChange}'.`
        );
        setSection(sectionChange);
      } else if (!inView && previousSection && section === sectionChange) {
        sectionsLog(
          `[inView] [${sectionChange}:OFF] setting section to previous '${previousSection}'.`
        );
        setSection(previousSection);
      }
    },
    [section, heroInView, aboutInView, experienceInView, projectsInView]
  );

  const windowSpring = useMotionValue(0);
  useEffect(() => {
    if (navigationRunning.current) {
      const headerHeightOffset = 155;

      let positionToScrollTo: number | undefined;
      const windowScrollY = window.scrollY;
      windowSpring.jump(windowScrollY);

      switch (section) {
        case "home": {
          if (!heroInView && heroRef.current) {
            positionToScrollTo =
              windowScrollY + heroRef.current.getBoundingClientRect().top;
          }
          break;
        }
        case "about": {
          if (!aboutInView && aboutRef.current) {
            positionToScrollTo =
              windowScrollY +
              aboutRef.current.getBoundingClientRect().top -
              headerHeightOffset;
          }
          break;
        }
        case "experience": {
          if (!experienceInView && experienceRef.current) {
            positionToScrollTo =
              windowScrollY +
              experienceRef.current.getBoundingClientRect().top -
              headerHeightOffset;
          }
          break;
        }
        case "projects": {
          if (!projectsInView && projectsRef.current) {
            positionToScrollTo =
              windowScrollY +
              projectsRef.current.getBoundingClientRect().top -
              headerHeightOffset;
          }
          break;
        }
      }
      if (positionToScrollTo !== undefined) {
        const scrollUnsubscribe = windowSpring.on("change", (v) => {
          window.scrollTo(window.scrollX, v);
        });
        const animationCompleteUnsubscribe = windowSpring.on(
          "animationComplete",
          () => {
            navigationRunning.current = false;
            animationCompleteUnsubscribe();
            scrollUnsubscribe();
          }
        );

        animate(windowSpring, positionToScrollTo, {
          duration: 0.5,
          ease: "easeInOut",
        });
      }
    }
  }, [section]);

  // TODO: Home is rendering too many times. Isolate the parts that are dynamic, such
  //   as the cursor.
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    log("[Home] Rendering.");
  }

  return (
    <div>
      <PageWrapper heroRef={heroRef}>
        <div className="flex flex-col drill-mouse-hover">
          <About ref={aboutRef} />
          <Experience ref={experienceRef} />
          <Projects ref={projectsRef} />
          {/* Progress bar. */}
          <div className="sticky bottom-0 w-full border-2-fore bg-back">
            <motion.div
              initial={{ y: 0, scaleX: 0 }}
              animate={{ y: 0, scaleX: 1 }}
              className="h-[20px] bg-fore"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
