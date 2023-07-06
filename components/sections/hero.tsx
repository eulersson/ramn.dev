"use client";

// React
import { useRef, useState } from "react";

// Third-Party
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

// Project
import { Cloth } from "@/components/cloth/cloth";

export function Hero() {
  const ref = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({ container: ref });
  const [foo, setFoo] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setFoo(latest);
  });

  return (
    <>
      <div className={`w-full h-screen bg-white overflow-y-scroll`} ref={ref}>
        <div className="h-[500vh]">
          <section className="sticky top-0 h-screen bg-white">
            <div className="w-full h-full flex flex-col">
              <motion.div
                className="h-[20px] bg-black"
                style={{ scaleX: scrollYProgress }}
              />
              <h1 className="text-center text-[80px] sm:text-[70px] leading-none font-title">
                Ramon Blanquer
              </h1>
              <h1 className="text-center text-[60px] leading-none font-serif ">
                Playfair Display
              </h1>
              <div className="grow">
                {/* <Cloth /> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
