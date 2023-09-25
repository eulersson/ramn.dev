"use client";

// React
import { forwardRef, useEffect, useRef, useState } from "react";

// Third-Party
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Project
import { Cloth } from "@/components/cloth/cloth";
import { CursorSize } from "@/components/cursor-size";
import { ThemeSwitch } from "@/components/theme-switch";
import { useSection } from "@/contexts/section";

// Environment
import environment from "@/environment";

const Hero = forwardRef<HTMLHeadingElement>(function Hero({}, forwardedRef) {
  const ref = useRef<HTMLDivElement>(null);

  const clothWrapperRef = useRef<HTMLDivElement>(null);
  const clothWrapperInView = useInView(clothWrapperRef);

  const { scrollY, scrollYProgress } = useScroll({ container: ref });

  if (environment.printComponentRendering) {
    console.log("[Hero] Rendering");
  }

  const progressBar = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const { section } = useSection();

  const previousSectionRef = useRef<string>("home");

  useEffect(() => {
    if (section === "home" && previousSectionRef.current !== "home") {
      ref.current?.scroll({ top: 0 });
    }
    previousSectionRef.current = section;
  }, [section]);

  return (
    <>
      <div
        className={`w-full h-screen bg-back overflow-y-scroll overflow-x-hidden -mb-[2px]`}
        ref={ref}
      >
        <div className="h-[500vh]">
          <section className="sticky top-0 h-screen bg-back">
            <div className="w-full h-full flex flex-col">
              <motion.div
                ref={forwardedRef}
                initial={{ y: 0, scaleX: 0 }}
                animate={{ y: 0, scaleX: 1 }}
                transition={{
                  delay: environment.disableCover ? 0 : 3.22,
                  duration: 1.5,
                }}
                className="h-[20px] bg-fore"
                style={{ scaleX: progressBar }}
              />
              <motion.div
                className="h-g2 flex justify-center overflow-visible"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: environment.disableCover ? 0 : 2.62,
                      duration: 0.001,
                      delayChildren: environment.disableCover ? 0 : 2.62,
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
                    className="min-w-g2 bg-back border-2-fore -mx-[1px]"
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
                      delay: environment.disableCover ? 0 : 2.62,
                      duration: 0.001,
                      delayChildren: environment.disableCover ? 0 : 2.62,
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
                    className="min-w-g5 bg-back border-2-fore -mx-[1px]"
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: -40 },
                    }}
                  ></motion.div>
                ))}
                <CursorSize sizeOnHover={4}>
                  <motion.div
                    className="h-full min-w-[666px] bg-back border-2-fore -mx-[1px] flex flex-col items-center justify-center"
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: -40 },
                    }}
                  >
                    <h1 className="text-center text-[80px] sm:text-[70px] leading-none font-title font-extrabold ">
                      Ramon Blanquer
                    </h1>
                    <h2 className="text-center text-[28px] sm:text-[20px] leading-none font-mono translate-x-[0.75px]">
                      <span className="mr-[10px] bg-fore text-back">
                        from code to deployment;
                      </span>
                      <span className="bg-fore text-back mr-[24px]">
                        from back
                      </span>
                      <span className="bg-fore text-back">to front;</span>
                    </h2>
                  </motion.div>
                </CursorSize>
                {[...Array(8)].map((e, i) => (
                  <motion.div
                    key={i}
                    className="min-w-g5 bg-back border-2-fore -mx-[1px]"
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: -40 },
                    }}
                  ></motion.div>
                ))}
              </motion.div>

              <div className="grow overflow-hidden" ref={clothWrapperRef}>
                {environment.disableGraphics || clothWrapperInView === false ? (
                  ""
                ) : (
                  <Cloth
                    scrollYProgress={scrollYProgress}
                    delayOffset={
                      localStorage.getItem("hasPlayedThemeSwitcherAnimation")
                        ? 0
                        : 3
                    }
                  />
                )}
              </div>

              <motion.div
                className="h-g3 flex justify-center overflow-visible"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      delay: environment.disableCover ? 0 : 2.62,
                      duration: 0.001,
                      delayChildren: environment.disableCover ? 0 : 2.62,
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
                    className="min-w-g3 bg-back border-2-fore -mx-[1px]"
                    variants={{
                      visible: { opacity: 1, x: 0, y: 0 },
                      hidden: { opacity: 0, x: -40, y: -40 },
                    }}
                  ></motion.div>
                ))}
              </motion.div>
              <ThemeSwitch className="absolute" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
});

export { Hero };
