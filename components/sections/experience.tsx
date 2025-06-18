// Third-Party
import { motion, useMotionValue } from "motion/react";
import { forwardRef, useRef, useState } from "react";

// Project
import { CursorSize } from "@/components/cursor";
import { useHeader } from "@/components/header";
import { Logo, LogoRef } from "@/components/logo";
import { Recommendations } from "@/components/sections/recommendations";
import { Tag } from "@/components/tag";
import { Title } from "@/components/title";
import { cn, toBool } from "@/utils";

// Project - Content
import jobEfestoLab from "@/content/experience/efesto-lab.json";
import jobMPC from "@/content/experience/mpc.json";
import jobNpaw from "@/content/experience/npaw.json";
import jobSecretStartup from "@/content/experience/secret-startup.json";
import jobWatchity from "@/content/experience/watchity.json";

const Experience = forwardRef<HTMLHeadingElement>(function Experience({}, ref) {
  const logoRef = useRef<LogoRef>(null);

  // Sets the current job to read. When the job is changed spin the job's company logo.
  const [activeEmployer, setActiveEmployer] = useState(0);
  const setActiveEmployerAnimated = (i: number) => {
    setActiveEmployer(i);
    if (logoRef.current) {
      logoRef.current.spin();
    }
  };

  const jobs = [jobWatchity, jobMPC, jobEfestoLab, jobNpaw, jobSecretStartup];
  const job = jobs[activeEmployer];

  const headerContext = useHeader();
  const fallbackMotionValue = useMotionValue(0);
  const headerTranslateYOffsetSpring =
    headerContext?.headerTranslateYOffsetSpring ?? fallbackMotionValue;

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Experience] Rendering");
  }

  return (
    <div ref={ref}>
      <section className="flex flex-col justify-center md:mb-g04n">
        <Title
          className={cn(
            // Upper spacing.
            "mt-[calc(1*var(--bg-grid-box-size)+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",
            "md:mt-[calc(0.5*var(--bg-grid-box-size)+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",

            // Lower spacing.
            "mb-[calc(1*var(--bg-grid-box-size)-var(--title-tag-size)/2-var(--title-tag-padding))]",
          )}
        >
          Experience
        </Title>
        <div
          className={cn(
            "px-ggpn grid grid-cols-4 gap-ggpn",
            job["lengthy"]
              ? "md:h-g50t lg:h-g40t xl:h-g30t"
              : "md:h-g30t lg:h-g30t xl:h-g20t",
          )}
        >
          {/* Menu selector with logo */}
          <motion.div
            className={cn(
              "col-span-4 md:col-span-1",

              "max-md:sticky max-md:z-10",

              "flex flex-row md:flex-col",
              "-mb-ggpn -mr-ggpn",
            )}
            style={{ top: headerTranslateYOffsetSpring }}
          >
            <CursorSize sizeOnHover={0.4}>
              <div
                className={cn(
                  "h-g10t flex flex-col",
                  "flex-wrap xs:flex-nowrap",
                  "min-w-g40t xs:min-w-g30t sm:min-w-g30t md:min-w-auto",
                )}
              >
                {jobs.map((job, i) => (
                  <div
                    className={`grow font-mono text-sm sm:text-base green border-b-2 border-r-2 border-fore underline flex items-center justify-end ${
                      i === activeEmployer
                        ? "bg-fore text-back hover:font-extrabold"
                        : "bg-back text-fore hover:bg-fore hover:text-back"
                    } ${i === jobs.length - 1 ? "" : "border-b-2"}`}
                    key={i}
                    onClick={() => setActiveEmployerAnimated(i)}
                  >
                    <span
                      className={
                        i === activeEmployer
                          ? "text-fore bg-back"
                          : "text-back bg-fore"
                      }
                    >
                      {job["company"]}
                    </span>
                  </div>
                ))}
              </div>
            </CursorSize>
            <div>
              <div
                className={cn(
                  "xs:max-md:-m-ggpy xs:max-md:scale-50",
                  "xs:max-md:border-4 xs:max-md:border-fore xs:max-md:bg-back",
                  "max-xs:absolute max-xs:right-0 max-xs:top-[calc(var(--header-height))]",
                )}
              >
                <Logo
                  className="max-xs:w-[50px]"
                  logoUrl={job["logo"]}
                  ref={logoRef}
                />
              </div>
            </div>
          </motion.div>

          <div className={`col-span-4 md:col-span-3 bg-back flex flex-col`}>
            <div className="font-mono text-center text-sm mt-3">
              {job["duration"]}
            </div>
            <div className="font-serif italic text-center text-4xl mb-3">
              {job["title"]}{" "}
              <span className="font-bold">
                @ {job["company"].replace("Moving Picture Company", "MPC")}
              </span>
            </div>
            <div className="font-mono text-center text-md xs:text-lg text-back bg-fore py-2 my-2">
              {job["summary"]}
            </div>
            <motion.ul
              key={job["title"]}
              className={`font-sans py-3 px/6) space-y-3 px-6 grow`}
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } },
              }}
            >
              {job["points"].map((p, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { rotateX: 90 },
                    show: {
                      rotateX: 0,
                      transition: { duration: 0.4 },
                    },
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {p}
                </motion.li>
              ))}
            </motion.ul>
            <div
              className={`bg-fore px-4 py-4 flex flex-wrap gap-ggpy items-center justify-center`}
            >
              {...job["skills"].map((text, i) => <Tag key={i} text={text} />)}
            </div>
          </div>
        </div>
      </section>
      <Recommendations />
    </div>
  );
});

export { Experience };
