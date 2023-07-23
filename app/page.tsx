"use client";

// React
import { useEffect, useRef } from "react";

// Third-Party
import { motion, useInView, useMotionValue } from "framer-motion";

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

function Home() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

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

  const [section, setSection, sections, activeIdx] = useSection();
  const [cursorSize, setCursorSize] = useCursor();

  // TODO: Surely there must be a way to refactor these refs...
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef);

  useEffect(() => {
    if (heroInView) {
      if (section !== "home") {
        setSection("home");
      }
    }
  }, [heroInView]);

  const aboutRef = useRef(null);
  // const aboutInView = useInView(aboutRef, { margin: '0px 0px -800px 0px' });
  const aboutInView = useInView(aboutRef, { margin: "0px 0px -50% 0px" });

  useEffect(() => {
    if (aboutInView) {
      if (section !== "about") {
        setSection("about");
      }
    }
  }, [aboutInView]);

  const experienceRef = useRef(null);
  // const experienceInView = useInView(experienceRef, { margin: '0px 0px -800px 0px' });
  const experienceInView = useInView(experienceRef, {
    margin: "0px 0px -50% 0px",
  });

  useEffect(() => {
    if (experienceInView) {
      if (section !== "experience") {
        setSection("experience");
      }
    }
  }, [experienceInView]);

  const projectsRef = useRef(null);
  const projectsInView = useInView(projectsRef, { margin: "0px 0px -50% 0px" });

  useEffect(() => {
    if (projectsInView) {
      if (section !== "projects") {
        setSection("projects");
      }
    }
  }, [projectsInView]);

  return (
    <div>
      <PageWrapper heroRef={heroRef}>
        <motion.div
          className="cursor"
          style={{
            x: cursorX,
            y: cursorY,
            scale: cursorSize,
          }}
        ></motion.div>
        <div className="flex flex-col">
          <About ref={aboutRef} />
          <Experience ref={experienceRef} />
          <Projects ref={projectsRef} />
        </div>
      </PageWrapper>
    </div>
  );
}
