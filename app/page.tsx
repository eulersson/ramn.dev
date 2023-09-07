"use client";

// React
import { useEffect, useRef } from "react";

// Third-Party
import { animate, useInView, useMotionValue } from "framer-motion";

// Components
import { SectionProvider, useSection } from "@/contexts/section";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { PageWrapper } from "@/app/page-wrapper";
import { Projects } from "@/components/sections/projects";

// Environment
import environment from "@/environment";

export default function Page() {
  return (
    <SectionProvider>
      <Home></Home>
    </SectionProvider>
  );
}

function Home() {
  const { section, setSection, navigationRunning } = useSection();

  // TODO: Surely there must be a way to refactor these refs...
  const heroRef = useRef<HTMLHeadingElement>(null);
  const heroInView = useInView(heroRef);

  useEffect(() => {
    if (heroInView && !navigationRunning.current) {
      if (section !== "home") {
        console.log("[page.tsx] heroInView", "home");
        setSection("home");
      }
    }
  }, [heroInView]);

  const aboutRef = useRef<HTMLHeadingElement>(null);
  const aboutInView = useInView(aboutRef);

  useEffect(() => {
    if (aboutInView && !navigationRunning.current) {
      if (section !== "about") {
        console.log("[page.tsx] aboutInView", "about");
        setSection("about");
      }
    }
  }, [aboutInView]);

  const experienceRef = useRef<HTMLHeadingElement>(null);
  const experienceInView = useInView(experienceRef);

  useEffect(() => {
    if (experienceInView && !navigationRunning.current) {
      if (section !== "experience") {
        console.log("[page.tsx] experienceInView", "experience");
        setSection("experience");
      }
    }
  }, [experienceInView]);

  const projectsRef = useRef<HTMLHeadingElement>(null);
  const projectsInView = useInView(projectsRef);

  useEffect(() => {
    if (projectsInView && !navigationRunning.current) {
      if (section !== "projects") {
        console.log("[page.tsx] projectsInView", "projects");
        setSection("projects");
      }
    }
  }, [projectsInView]);

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
              windowScrollY + experienceRef.current.getBoundingClientRect().top;
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
  if (environment.printComponentRendering) {
    console.log("[Home] Rendering.");
  }

  return (
    <div>
      <PageWrapper heroRef={heroRef}>
        <div className="flex flex-col drill-mouse-hover">
          <About ref={aboutRef} />
          <Experience ref={experienceRef} />
          <Projects ref={projectsRef} />
        </div>
      </PageWrapper>
    </div>
  );
}
