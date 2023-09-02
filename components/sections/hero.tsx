"use client";

// React
import { forwardRef, useEffect, useRef, useState } from "react";

// Third-Party
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

// Project
import { Cloth } from "@/components/cloth/cloth";

// Environment
import environment from "@/environment";

const Hero = forwardRef<HTMLHeadingElement>(function Hero({}, forwardedRef) {
  const ref = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({ container: ref });

  if (environment.printComponentRendering) {
    console.log("[Hero] Rendering");
  }

  return (
    <>
      <div>
        <div className={`w-full h-screen bg-white overflow-y-scroll`} ref={ref}>
          <div className="h-[500vh]">
            <section className="sticky top-0 h-screen bg-white">
              <div className="w-full h-full flex flex-col">
                <motion.div
                  className="h-[20px] bg-black"
                  style={{ scaleX: scrollYProgress }}
                />
                <h1
                  ref={forwardedRef}
                  className="text-center text-[80px] sm:text-[70px] leading-none font-title"
                >
                  Ramon Blanquer
                </h1>
                <div className="grow overflow-hidden">
                  {environment.disableGraphics ? "" : <Cloth scrollYProgress={scrollYProgress} />}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
});

export { Hero };
