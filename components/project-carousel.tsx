"use client";

// React
import {
  CSSProperties,
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useState,
  type ForwardedRef,
} from "react";

// Next.js
import Image from "next/image";
import { useRouter } from "next/navigation";

// Third-Party
import { AnimatePresence, motion } from "motion/react";

// Project
import { CursorSize } from "@/components/cursor";
import { cn, toBool, toRoman } from "@/lib";
import type { ProjectInfo, ProjectMetadata } from "@/types";
import { useTouchDevice } from "@/hooks/browser";

export const ProjectCarousel = ({ projects }: { projects: ProjectInfo[] }) => {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const isTouch = useTouchDevice();
  const AUTO_PLAY_INTERVAL = 8000; // ms
  const PROGRESS_INTERVAL = 50; // ms

  // Auto-play logic
  useEffect(() => {
    if (projects.length <= 1) return;
    if (isPaused) return;
    let progressValue = progress;
    const progressStep = PROGRESS_INTERVAL / AUTO_PLAY_INTERVAL;
    const interval = setInterval(() => {
      progressValue += progressStep;
      if (progressValue >= 1) {
        progressValue = 0;
        setSelectedProject((prev) => (prev + 1) % projects.length);
      }
      setProgress(progressValue);
    }, PROGRESS_INTERVAL);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, selectedProject, projects.length]);

  // Reset progress when project changes (unless it's a pause)
  useEffect(() => {
    setProgress(0);
  }, [selectedProject]);

  if (projects.length == 0) {
    return null;
  }

  const project = projects[selectedProject];
  if (!project) {
    return null;
  }

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[ProjectCarousel] Rendering");
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.05 }}
      className={cn(
        "pointer-events-auto",
        "bg-back border-2-fore mb-g10n",
        "h-g30y xs:h-g20y",
        "md:p-[10px]",
      )}
      onMouseEnter={() => !isTouch && setIsPaused(true)}
      onMouseLeave={() => !isTouch && setIsPaused(false)}
      onTouchStart={() => isTouch && setIsPaused(true)}
      onTouchEnd={() => isTouch && setIsPaused(false)}
      onTouchCancel={() => isTouch && setIsPaused(false)}
    >
      <div className="border-2-fore relative flex h-full w-full">
        <ProjectSelector
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={(i) => {
            setProgress(0);
            setSelectedProject(i);
          }}
        />
        <div
          className="relative grow overflow-hidden"
          onClick={() => {
            router.push(`/work/${project.slug}`);
          }}
        >
          <CursorSize sizeOnHover={4}>
            <AnimatePresence>
              <motion.div
                className="absolute inset-0 flex h-full flex-col"
                key={project.slug}
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", ease: "linear", duration: 0.4 }}
              >
                <div
                  className="bg-fore h-[20px] w-full flex-shrink-0"
                  style={filmStripeStyle}
                ></div>
                <div className="bg-fore relative min-h-0 flex-1 px-[60px] select-none">
                  <ProjectSummary
                    className="h-full"
                    slug={project.slug}
                    project={project.metadata}
                  />
                </div>
                <div
                  className="bg-fore h-[20px] w-full flex-shrink-0"
                  style={filmStripeStyle}
                ></div>
                {/* Progress bar below lower film stripe */}
                <div className="bg-back mt-[4px] h-[8px] w-full overflow-hidden">
                  <motion.div
                    className="bg-fore h-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress }}
                    style={{ originX: 0, scaleX: progress }}
                    transition={{ type: "linear", duration: 0.1 }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </CursorSize>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectSelector = ({
  projects,
  selectedProject,
  setSelectedProject,
}: {
  projects: ProjectInfo[];
  selectedProject: number;
  setSelectedProject: Dispatch<SetStateAction<number>>;
}) => (
  <CursorSize sizeOnHover={0.2}>
    <div
      className={cn(
        "absolute -top-[21px] z-10 h-[20px] w-full",
        "flex items-center justify-center gap-1",
      )}
    >
      {projects.map((_, i) => (
        <div
          key={i}
          className={cn(
            "pointer-events-auto",
            "h-[45px] w-[45px]",
            "border-2-fore flex items-center justify-center font-serif text-[30px]",
            "hover:w-[70px]",
            "transition-[width] duration-150 ease-in-out",
            i == selectedProject ? "text-back bg-fore" : "text-fore bg-back",
          )}
          onClick={() => setSelectedProject(i)}
        >
          {toRoman(i + 1)}
        </div>
      ))}
    </div>
  </CursorSize>
);

const ProjectSummary = forwardRef<
  HTMLDivElement,
  { project: ProjectMetadata; slug: string; className: string }
>(function ProjectSummary(
  { project, slug, className },
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { title, name, description, heroImage, featuredImage } = project;
  const displayTitle = title || name || slug;

  const blackTextOutline: CSSProperties = {
    textShadow:
      "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
  };

  return (
    <div ref={ref} className={cn("relative flex select-none", className)}>
      <div className="absolute flex h-full w-full flex-col justify-between select-none">
        <motion.span
          initial={{ x: -150 }}
          animate={{ x: 5 }}
          transition={{ delay: 0.5 }}
          className={cn(
            "text-back font-mono select-none",
            "origin-top-left rotate-90",
            "text-[24px]",
          )}
        >
          {displayTitle}
        </motion.span>
        {description && (
          <motion.p
            className={cn(
              "z-10 text-center text-ellipsis text-[#ff0] select-none",

              "max-h-[36px] text-[14px] leading-[18px]",
              "xs:text-[14px] xs:leading-[18px] xs:max-h-[36px]",
              "md:text-[20px] md:leading-[26px] md:max-xl:max-h-[52px]",

              "md:mb-[20px] md:px-[40px]",

              "max-xl:line-clamp-2",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.01, delay: 0 } }}
            transition={{ delay: 1.2, duration: 0.01 }}
            style={blackTextOutline}
          >
            {description}
          </motion.p>
        )}
      </div>
      <div
        className={cn(
          "bg-back h-full w-full",
          "xs:rounded-2xl rounded-xl sm:rounded-4xl",
        )}
      >
        <Image
          onLoad={(event) => event.currentTarget.classList.remove("opacity-0")}
          className={cn(
            "h-full w-full object-cover opacity-0 transition-opacity duration-1000",
            "xs:rounded-2xl rounded-xl sm:rounded-4xl",
            "pointer-events-none touch-none select-none",
          )}
          fill
          src={featuredImage || heroImage}
          alt={slug}
          draggable={false}
          unselectable="on"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
});

const filmStripeStyle: CSSProperties = {
  height: "20px",
  backgroundColor: "var(--col-fore)",
  backgroundImage:
    "repeating-linear-gradient(to right, var(--col-fore) 0px, var(--col-fore) 6px, var(--col-back) 6px, var(--col-back) 13px, var(--col-fore) 13px, var(--col-fore) 19px)",
  backgroundPosition: "0 4px",
  backgroundSize: "19px 12px",
  backgroundRepeat: "repeat-x",
};
