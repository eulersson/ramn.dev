"use client";

// React
import { useEffect, useRef } from "react";

// Third-Party
import { animate, motion, useInView, useMotionValue } from "framer-motion";

// Components
import { CursorProvider, useCursor } from "@/contexts/cursor";
import { SectionProvider, useSection } from "@/contexts/section";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { PageWrapper } from "@/app/page-wrapper";
import { Projects } from "@/components/sections/projects";

export default function Page() {
  return (
    <SectionProvider>
      <CursorProvider>
        <Home></Home>
      </CursorProvider>
    </SectionProvider>
  );
}

function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [cursorSize, setCursorSize] = useCursor();

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="cursor z-50"
      style={{
        x: cursorX,
        y: cursorY,
        scale: cursorSize,
      }}
    ></motion.div>
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
  // const aboutInView = useInView(aboutRef, { margin: '0px 0px -800px 0px' });
  const aboutInView = useInView(aboutRef, { margin: "0px 0px -50% 0px" });

  useEffect(() => {
    if (aboutInView && !navigationRunning.current) {
      if (section !== "about") {
        console.log("[page.tsx] aboutInView", "about");
        setSection("about");
      }
    }
  }, [aboutInView]);

  const experienceRef = useRef<HTMLHeadingElement>(null);
  // const experienceInView = useInView(experienceRef, { margin: '0px 0px -800px 0px' });
  const experienceInView = useInView(experienceRef, {
    // margin: "0px 0px -50% 0px",
  });

  useEffect(() => {
    if (experienceInView && !navigationRunning.current) {
      if (section !== "experience") {
        console.log("[page.tsx] experienceInView", "experience");
        setSection("experience");
      }
    }
  }, [experienceInView]);

  const projectsRef = useRef<HTMLHeadingElement>(null);
  const projectsInView = useInView(projectsRef, { margin: "0px 0px -50% 0px" });

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
              windowScrollY + aboutRef.current.getBoundingClientRect().top;
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
              windowScrollY + projectsRef.current.getBoundingClientRect().top;
          }
          break;
        }
      }
      if (positionToScrollTo) {
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
  console.log("[Home] Rendering.");

  return (
    <div>
      <PageWrapper heroRef={heroRef}>
        <Cursor />
        <div className="flex flex-col">
          <About ref={aboutRef} />
          <Experience ref={experienceRef} />
          <Projects ref={projectsRef} />
        </div>
      </PageWrapper>
    </div>
  );
}
