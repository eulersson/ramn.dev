"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

import { Cloth } from "../cloth";

export function Hero() {
  const ref = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({ container: ref });
  const [foo, setFoo] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setFoo(latest);
  });

  return (
    <>
      <div
        className={`w-full h-screen bg-white overflow-y-scroll`}
        ref={ref}
      >
        <div className="h-[500vh]">
          <section className="sticky top-0 h-screen bg-white">
            <motion.div className="top-0 h-[20px] bg-black origin-left" style={{ scaleX: scrollYProgress}} />
            <h1 className="text-center text-[80px] sm:text-[70px] leading-none font-title">
              Ramon Blanquer
            </h1>
          </section>
        </div>
      </div>
    </>
  );
}
