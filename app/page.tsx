"use client";

// Third-Party
import { debug } from "debug";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
} from "motion/react";
import { useCallback, useEffect, useRef } from "react";

// Project
import { PageWrapper } from "@/app/page-wrapper";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { SectionProvider, useSection } from "@/contexts/section";
import { useDebounce } from "@/hooks/debounce";
import { usePrevious } from "@/hooks/previous";
import { toBool } from "@/utils";
import { useBreakpoint } from "@/hooks/breakpoint";
import settings from "@/config/settings";

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
  const { activeSectionIdx, sections, section, setSection, navigationRunning } =
    useSection();
  const previousSection = usePrevious(section);

  // Handle a user scrolling so fast between sections. It's important for this value to
  // not exceed the time of the animation in the Navbar.
  const debouncedSetSection = useDebounce(setSection, 500);

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
   */ const handleSectionInViewChange = useCallback(
    (sectionChange: string, inView: boolean) => {
      sectionsLog(
        `[inView] [${sectionChange}] navigationRunning: ${navigationRunning.current} ` +
          `inView: ${inView}`,
      );
      if (navigationRunning.current) {
        sectionsLog(
          "Returning because an animation resulting from a nav item click is running.",
        );
        return;
      }

      if (inView && section !== sectionChange) {
        sectionsLog(
          `[inView] [${sectionChange}:ON] setting section to new '${sectionChange}'.`,
        );
        debouncedSetSection(sectionChange);
      } else if (!inView && previousSection && section === sectionChange) {
        sectionsLog(
          `[inView] [${sectionChange}:OFF] setting section to previous '${previousSection}'.`,
        );
        debouncedSetSection(previousSection);
      }
    },
    [section, previousSection, debouncedSetSection, navigationRunning],
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
          },
        );

        animate(windowSpring, positionToScrollTo, {
          duration: 0.5,
          ease: "easeInOut",
        });
      }
    }
  }, [section]);

  // -- Sticky bottom progress bar
  const { scrollYProgress } = useScroll();
  const bottomProgressTranslateY = useMotionValue(0);
  const bottomProgressYSpring = useSpring(bottomProgressTranslateY);

  const { isSmaller } = useBreakpoint(settings.navBarHorizontalAtBreakpoint);
  const navbarVertical = isSmaller;

  useEffect(() => {
    if (navbarVertical) {
      bottomProgressTranslateY.set(
        (sections.length - activeSectionIdx - 1) * 28,
      );
    } else {
      bottomProgressTranslateY.set(0);
    }
  }, [activeSectionIdx, navbarVertical]);

  // TODO: Home is rendering too many times. Isolate the parts that are dynamic, such
  //   as the cursor.
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    log("[Home] Rendering.");
  }

  return (
    <PageWrapper heroRef={heroRef}>
      <div className="drill-mouse-hover">
        <About ref={aboutRef} />
        {/* <Experience ref={experienceRef} /> */}
        {/* <Projects ref={projectsRef} /> */}

        {/* NOTE: Turning this mb into a negative -mb produces an interesting inset effect */}
        <div className="mb-[24px]"></div>

        {/* Progress bar. */}
        <div className="sticky bottom-0 ">
          <div className="w-full border-2-fore bg-back">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="h-[20px] bg-fore"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <motion.div style={{ height: bottomProgressYSpring }} />
        </div>
      </div>
    </PageWrapper>
  );
}
