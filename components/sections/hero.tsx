"use client";

// React
import { forwardRef, useEffect, useRef } from "react";

// Third-Party
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useMediaQuery } from "react-responsive";

// Project
import { Cloth } from "@/components/cloth/cloth";
import { CursorSize } from "@/components/cursor";
import { ThemeSwitch } from "@/components/theme-switch";
import settings from "@/config/settings";
import { useSection } from "@/contexts/section";
import { useBreakpoint } from "@/hooks/breakpoint";
import { cn, toBool } from "@/lib";

const Hero = forwardRef<
  HTMLHeadingElement,
  { onEnterLeave?: (enter: boolean) => void }
>(function Hero({ onEnterLeave }, forwardedRef) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ container: ref });

  const progressBar = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const { section } = useSection();

  const previousSectionRef = useRef<string>("home");

  useEffect(() => {
    if (section === "home" && previousSectionRef.current !== "home") {
      ref.current?.scroll({ top: 0 });
    }
    previousSectionRef.current = section;
  }, [section]);

  // The `localStorage` can only be accessed on client.
  let hasPlayedThemeSwitcherAnimation = false;
  if (typeof window !== "undefined") {
    hasPlayedThemeSwitcherAnimation = !!localStorage.getItem(
      "hasPlayedThemeSwitcherAnimation",
    );
  }

  const { activeSectionIdx, sections } = useSection();
  const { isSmaller } = useBreakpoint(settings.navBarHorizontalAtBreakpoint);
  const navbarVertical = isSmaller;

  const marginBottom = useMotionValue(0);
  const marginBottomSpring = useSpring(marginBottom);

  useEffect(() => {
    if (navbarVertical) {
      marginBottom.set((sections.length - activeSectionIdx - 1) * 28);
    } else {
      marginBottom.set(0);
    }
  }, [activeSectionIdx, navbarVertical]);

  const smallerThanSm = useMediaQuery({
    query: `(max-width: 640px)`,
  });

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Hero] Rendering");
  }

  return (
    <motion.div
      className={`bg-fore invisible-scrollbar -mb-ggpn h-dvh w-full overflow-x-hidden overflow-y-auto overflow-y-scroll`}
      ref={ref}
    >
      <div className="h-[500vh]">
        <section className="bg-fore sticky top-0 h-dvh">
          <div className="flex h-full w-full flex-col">
            {/* Progress bar. */}
            <div className={`bg-back mt-7 lg:mt-0`}>
              <motion.div
                ref={forwardedRef}
                initial={{ y: 0, scaleX: 0 }}
                animate={{ y: 0, scaleX: 1 }}
                transition={{
                  delay: toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
                    ? 0
                    : 2.22,
                  duration: 1.5,
                }}
                className="bg-fore h-[20px]"
                style={{ scaleX: progressBar }}
              />
            </div>

            {/* Upper small box stripe */}
            <motion.div
              className="h-g03n xs:h-g02n flex justify-center overflow-visible select-none"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    delay: toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
                      ? 0
                      : 1.12,
                    duration: 0.001,
                    delayChildren: toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
                      ? 0
                      : 1.12,
                    staggerChildren: 0.05,
                  },
                },
                hidden: {
                  opacity: 0,
                },
              }}
            >
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="min-w-g03n xs:min-w-g02n bg-back border-2-fore -mx-px"
                  variants={{
                    visible: { opacity: 1, x: 0, y: 0 },
                    hidden: { opacity: 0, x: -40, y: -40 },
                  }}
                ></motion.div>
              ))}
            </motion.div>

            {/* Upper big box stripe (the one with the hero title) */}
            <motion.div
              className="h-g14n xs:h-g12n sm:h-g05n -mt-ggpn flex justify-center overflow-visible select-none"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    delay: toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
                      ? 0
                      : 1.12,
                    duration: 0.001,
                    delayChildren: toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
                      ? 0
                      : 1.12,
                    staggerChildren: 0.1,
                  },
                },
                hidden: {
                  opacity: 0,
                },
              }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="min-w-g14n xs:min-w-g12n sm:min-w-g05n bg-back border-2-fore -mx-px"
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: -40 },
                  }}
                ></motion.div>
              ))}
              <CursorSize sizeOnHover={8}>
                <motion.div
                  className={cn(
                    "bg-back border-2-fore h-full",
                    "min-w-[300px] sm:min-w-[560px] md:min-w-[660px]",
                    "-mx-px pt-[8px] sm:mb-0 sm:pt-0",
                    "flex flex-col items-center justify-center",
                  )}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: -40 },
                  }}
                >
                  {/* Typewritting Ramon Blanquer */}
                  <motion.h1
                    className={cn(
                      "text-center text-[50px] sm:text-[60px] md:text-[70px]",
                      "-mt-[6px] lg:-mt-[12px]",
                      "font-title leading-[0.7] font-extrabold sm:leading-none",
                    )}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.3,
                        },
                      },
                      hidden: { transition: { delay: 10 } },
                    }}
                  >
                    {"> Ramon|Blanquer".split("").map((char, index) =>
                      char === "|" && smallerThanSm ? (
                        <br key={index} />
                      ) : (
                        <motion.span
                          key={index}
                          variants={{
                            visible: {
                              opacity: 1,
                              transition: {
                                duration: 0.01,
                              },
                            },
                            hidden: {
                              opacity: 0,
                            },
                          }}
                          style={{ display: "inline-block" }}
                        >
                          {char === " " || char === "|" ? "\u00A0" : char}
                        </motion.span>
                      ),
                    )}
                  </motion.h1>
                  <motion.h2
                    className={cn(
                      "text-start text-[14px] sm:text-center sm:text-[17px] md:text-[20px]",
                      "font-mono leading-none",
                      "-translate-y-[4px] sm:translate-x-[23px] sm:translate-x-[28px] sm:translate-y-0 md:translate-x-[33px]",
                      "mt-[10px] sm:mt-0",
                    )}
                    initial={{ rotateX: 90 }}
                    animate={{ rotateX: 0 }}
                    transition={{ duration: 0.3, delay: 2 }}
                  >
                    <span className="bg-fore text-back mb-[3px] block sm:mr-[10px] sm:mb-0 sm:inline">
                      from code to deployment;
                    </span>
                    <span className="bg-fore text-back sm:mr-[24px]">
                      from back<span className="sm:hidden">&nbsp;</span>
                    </span>
                    <span className="bg-fore text-back">to front;</span>
                  </motion.h2>
                </motion.div>
              </CursorSize>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="min-w-g14n xs:min-w-g12n sm:min-w-g05n bg-back border-2-fore -mx-px"
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: -40 },
                  }}
                ></motion.div>
              ))}
            </motion.div>

            {/* The WebGL cloth animation */}
            <div className="bg-back grow overflow-hidden">
              {toBool(process.env.NEXT_PUBLIC_DISABLE_GRAPHICS) ? (
                ""
              ) : (
                <Cloth scrollYProgress={scrollYProgress} />
              )}
            </div>

            {/* Lower small box stripe */}
            <motion.div
              className={`h-g10n xs:h-g06n md:h-g03n flex justify-center overflow-visible select-none`}
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    delay: toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
                      ? 0
                      : 1.12,
                    duration: 0.001,
                    delayChildren: toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
                      ? 0
                      : 1.12,
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
                hidden: {
                  opacity: 0,
                },
              }}
            >
              {[...Array(39)].map((_, i) => {
                const middleIndex = Math.floor(39 / 2); // Index 19
                const isMiddle = i === middleIndex;
                return (
                  <motion.div
                    key={i}
                    className={`min-w-g10n xs:min-w-g06n md:min-w-g03n bg-back border-2-fore -mx-px ${
                      isMiddle &&
                      "min-w-g12n xs:min-w-g10n md:min-w-g05n flex items-center justify-center"
                    }`}
                    variants={{
                      visible: { opacity: 1, x: 0, y: 0 },
                      hidden: { opacity: 0, x: -40, y: -40 },
                    }}
                  >
                    {isMiddle && <ThemeSwitch yInitial={-100} />}
                  </motion.div>
                );
              })}
            </motion.div>
            <motion.div
              className="bg-front bg-fore pointer-events-none w-full"
              onViewportEnter={() => {
                onEnterLeave !== undefined && onEnterLeave(true);
              }}
              onViewportLeave={() => {
                onEnterLeave !== undefined && onEnterLeave(false);
              }}
              style={{ height: marginBottomSpring }}
            ></motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
});

export { Hero };
