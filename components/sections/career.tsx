"use client";

// Next.js
import Link from "next/link";

// Third-Party
import { motion, useMotionValue } from "motion/react";
import { useRef, useState } from "react";

// Project
import { CursorSize } from "@/components/cursor";
import { Gallery } from "@/components/prose/gallery";
import { useHeader } from "@/components/header";
import { Logo, LogoRef } from "@/components/logo";
import { Tag } from "@/components/tag";
import { cn } from "@/lib";
import { Job } from "@/types";

// Content
import jobEfestoLab from "@/content/experience/efesto-lab.json";
import jobMPC from "@/content/experience/mpc.json";
import jobNpaw from "@/content/experience/npaw.json";
import jobSecretStartup from "@/content/experience/secret-startup.json";
import jobWatchity from "@/content/experience/watchity.json";
import { SquareArrowOutUpRight } from "lucide-react";
import MacBookShowcase from "../mackbook-showcase";

export function Career() {
  const logoRef = useRef<LogoRef>(null);

  // Sets the current job to read. When the job is changed spin the job's company logo.
  const [activeEmployer, setActiveEmployer] = useState(0);
  const setActiveEmployerAnimated = (i: number) => {
    setActiveEmployer(i);
    if (logoRef.current) {
      logoRef.current.spin();
    }
  };

  const jobs: Job[] = [
    jobWatchity,
    jobMPC,
    jobEfestoLab,
    jobNpaw,
    jobSecretStartup,
  ];
  const job = jobs[activeEmployer];

  const headerContext = useHeader();
  const fallbackMotionValue = useMotionValue(0);
  const headerTranslateYOffsetSpring =
    headerContext?.headerTranslateYOffsetSpring ?? fallbackMotionValue;

  let titleCompanySpan = (
    <span className={cn("font-bold")}>
      {job["company"].replace("Moving Picture Company", "MPC")}
    </span>
  );

  if (job["website"]) {
    titleCompanySpan = (
      <CursorSize className="inline" sizeOnHover={0.4}>
        <Link className="hover:text-back hover:bg-fore" href={job["website"]}>
          {titleCompanySpan}
          <SquareArrowOutUpRight
            className="mb-[5px] ml-2 inline-block"
            width={15}
            height={15}
          />
        </Link>
      </CursorSize>
    );
  }

  return (
    <div className={cn("px-ggpn gap-ggpn grid grid-cols-4")}>
      {/* Menu selector with logo */}
      <motion.div
        className={cn(
          "pointer-events-auto",
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
              "xs:flex-nowrap flex-wrap",
              "min-w-g40t xs:min-w-g30t sm:min-w-g30t md:min-w-auto",
            )}
          >
            {jobs.map((job, i) => (
              <div
                className={`border-fore flex grow items-center justify-end border-r-2 border-b-2 font-mono text-sm underline sm:text-base ${
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
              "max-xs:absolute max-xs:right-0 max-xs:right-[8px] max-xs:top-[calc(var(--header-height)+10px)]",
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

      <div
        className={cn(
          "pointer-events-auto",
          "bg-back col-span-4 flex flex-col md:col-span-3",
          job["lengthy"]
            ? "xs:h-[calc(12*(var(--bg-grid-box-size)+var(--bg-grid-gap)))] sm:h-g70t md:h-g70t lg:h-g60t xl:h-g50t h-[calc(20*(var(--bg-grid-box-size)+var(--bg-grid-gap)))]"
            : "sm:h-g40t md:h-g30t lg:h-g30t xl:h-g20t h-[calc(11*(var(--bg-grid-box-size)+var(--bg-grid-gap)))]",
        )}
      >
        <div className="mt-3 text-center font-mono text-sm">
          {job["duration"]}
        </div>
        <div className="mb-3 text-center font-serif text-4xl italic">
          {job["title"]} <span className="font-bold">@ </span>
          {titleCompanySpan}
        </div>
        <div className="xs:text-lg text-back bg-fore my-2 py-2 text-center font-mono">
          {job["summary"]}{" "}
        </div>
        <motion.ul
          key={job["title"]}
          className={cn(
            `px/6) space-y-3 px-6 py-3 font-sans`,
            job["images"] && job["images"].length ? "" : "grow",
          )}
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

        {job["images"] && job["images"].length && (
          <>
            <MacBookShowcase
              className="xs:px-8 mt-2 sm:px-25 md:px-20 xl:px-30"
              images={job["images"]}
            />
            <div className="mt-[15px] grow">
              <Gallery
                className="opacity-75 hover:opacity-100"
                gridClassName="grid-cols-4"
                images={job["images"]}
              />
            </div>
          </>
        )}
        <div
          className={`bg-fore gap-ggpy flex flex-wrap items-center justify-center px-4 py-4`}
        >
          {...job["skills"].map((text, i) => <Tag key={i} text={text} />)}
        </div>
      </div>
    </div>
  );
}
