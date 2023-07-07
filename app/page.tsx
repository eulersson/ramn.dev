"use client";

// React
import { useEffect } from "react";

// Third-Party
import { motion, useMotionValue } from "framer-motion";

// Components
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { PageWrapper } from "@/app/page-wrapper";

export default function Home() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  useEffect(() => {
    const mouseMove = (e) => {
      console.log(e);
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [cursorX, cursorY]);

  return (
    <PageWrapper>
      <motion.div
        className="cursor"
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
      ></motion.div>
      <div className="flex flex-col">
        <About />
        <Experience />
      </div>
    </PageWrapper>
  );
}
