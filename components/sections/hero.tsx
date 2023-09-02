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

  // TODO: Do animation of the scrollYProgress bar and then swap it with the scrollYProgress.
  // TODO: Automatically scroll a little?
  // TODO: LFO gravity?

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
                <motion.div
                  className="h-g2 flex justify-center overflow-visible"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.001,
                        delayChildren: 0,
                        staggerChildren: 0.05,
                      },
                    },
                    hidden: {
                      opacity: 0,
                    },
                  }}
                >
                  {[...Array(40)].map((e, i) => (
                    <motion.div
                      key={i}
                      className="min-w-g2 bg-white border-2 border-black -mr-[2px]"
                      variants={{
                        visible: { opacity: 1, x: 0, y: 0 },
                        hidden: { opacity: 0, x: -40, y: -40 },
                      }}
                    ></motion.div>
                  ))}
                </motion.div>
                <motion.div
                  className="h-g5 flex justify-center overflow-visible  -mt-[2px]"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.001,
                        delayChildren: 0,
                        staggerChildren: 0.1,
                      },
                    },
                    hidden: {
                      opacity: 0,
                    },
                  }}
                >
                  {[...Array(8)].map((e, i) => (
                    <motion.div
                      key={i}
                      className="min-w-g5 bg-white border-2 border-black -mr-[2px]"
                      variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: -40 },
                      }}
                    ></motion.div>
                  ))}
                  <motion.div
                    className="min-w-[666px] border-2 border-black -mr-[2px] flex flex-col items-center justify-center"
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: -40 },
                    }}
                  >
                    <h1
                      ref={forwardedRef}
                      className="text-center text-[80px] sm:text-[70px] leading-none font-title"
                    >
                      Ramon Blanquer
                    </h1>
                    <h2 className="text-center text-[28px] sm:text-[20px] leading-none font-mono">
                      from code to deployment; from back&nbsp;&nbsp;to front;
                    </h2>
                  </motion.div>
                  {[...Array(8)].map((e, i) => (
                    <motion.div
                      key={i}
                      className="min-w-g5 border-2 border-black -mr-[2px]"
                      variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: -40 },
                      }}
                    ></motion.div>
                  ))}
                </motion.div>

                <div className="grow overflow-hidden">
                  {environment.disableGraphics ? (
                    ""
                  ) : (
                    <Cloth scrollYProgress={scrollYProgress} />
                  )}
                </div>

                <motion.div
                  className="h-g3 flex justify-center overflow-visible -mb-[2px]"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.001,
                        staggerChildren: 0.05,
                        staggerDirection: -1,
                      },
                    },
                    hidden: {
                      opacity: 0,
                    },
                  }}
                >
                  {[...Array(40)].map((e, i) => (
                    <motion.div
                      key={i}
                      className="min-w-g3 bg-white border-2 border-black -mr-[2px]"
                      variants={{
                        visible: { opacity: 1, x: 0, y: 0 },
                        hidden: { opacity: 0, x: -40, y: -40 },
                      }}
                    ></motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
});

export { Hero };
