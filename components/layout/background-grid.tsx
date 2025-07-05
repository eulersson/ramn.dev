"use client";

// React
import {
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// Next.js
import { usePathname } from "next/navigation";

// Third-Party
import { useInView } from "motion/react";

// Project
import { useBreakpoint, useBreakpointChange } from "@/hooks/breakpoint";
import { sleep, toBool } from "@/lib";

// Styles
import "./background-grid.css";
import { BreakpointKey } from "@/types";

// Configuration for different routes
const GRID_CONFIG = {
  "/": {
    "2xl": 112,
    xl: 112,
    lg: 124,
    md: 132,
    sm: 140,
    xs: 248,
    xxs: 332,
  },
  "/work": {
    "2xl": 44,
    xl: 40,
    lg: 44,
    md: 44,
    sm: 48,
    xs: 100,
    xxs: 104,
  },
} as const;

const PLATE_GRID_ITEM_CLASSES =
  "bg-back transition-[border-radius] hover:rounded-[20px] hover:md:rounded-[40px] duration-500 ease-in-out";

const DEBUG_CLASSES =
  "w-[4px] h-[2px] mt-[calc((var(--bg-grid-box-size)/2)+1px)] -translate-[2px] bg-red-500";

export const BackgroundGrid = memo(function BackgroundGrid() {
  const debugGrid = toBool(process.env.NEXT_PUBLIC_DEBUG_GRID);
  const bgGridRef = useRef<HTMLDivElement>(null);
  const bgGridInView = useInView(bgGridRef, {
    once: true,
    margin: "0px 0px -100% 0px",
  });
  const pathname = usePathname();
  const [numBoxes, setNumBoxes] = useState(128);
  const bpXs = useBreakpoint("xs");
  const bpMd = useBreakpoint("md");

  const FLASH_ANIM_DELAY = 1000; // Adjust this value as needed

  const breakpointChangeHandler = (bp: BreakpointKey) => {
    if (pathname.startsWith("/work/")) {
      // If inside a project, since the markdown might be longer or shorter do
      // it dynamically based on the box size.
      const boxes = boxesNeededToCoverProject(bgGridRef);
      if (boxes > 0) {
        setNumBoxes(boxes);
      }
      return;
    }

    const routeConfig =
      GRID_CONFIG[pathname as keyof typeof GRID_CONFIG] || GRID_CONFIG["/"];
    if (bpXs.isSmaller) {
      setNumBoxes(routeConfig["xxs"]);
    } else {
      const numBoxesForBreakpoint = routeConfig[bp as keyof typeof routeConfig];
      if (numBoxesForBreakpoint) {
        setNumBoxes(numBoxesForBreakpoint);
      }
    }
  };

  useBreakpointChange(breakpointChangeHandler);

  useEffect(() => {
    if (!bgGridInView) {
      return;
    }

    const runFlashAnimation = () => {
      if (!bgGridRef.current) {
        return;
      }

      const rounded = bpMd.isSmaller ? "rounded-[20px]" : "rounded-[40px]";
      const leftBoxes = bgGridRef.current.querySelectorAll(
        ".plate-grid--left > div",
      );
      const rightBoxes = bgGridRef.current.querySelectorAll(
        ".plate-grid--right > div",
      );

      let boxesPerRow = 0;
      let prevTop: number | null = null;

      for (let i = 0; i < leftBoxes.length; i++) {
        const box = leftBoxes[i];
        const top = box.getBoundingClientRect().top;

        if (prevTop === null) {
          prevTop = top;
          boxesPerRow = 1;
        } else if (top === prevTop) {
          boxesPerRow++;
        } else {
          // Found the first box of the next row, so we know the stride
          break;
        }
      }

      const allBoxes = [...leftBoxes, ...rightBoxes];

      const oddBoxes = Array.from(allBoxes).filter((_, i) => {
        const row = Math.floor(i / boxesPerRow);
        return (i + row) % 2 === 1;
      });

      const evenBoxes = Array.from(allBoxes).filter((_, i) => {
        const row = Math.floor(i / boxesPerRow);
        return (i + row) % 2 === 0;
      });

      const animateBoxes = async () => {
        oddBoxes.forEach((box) => box.classList.add(rounded));
        await sleep(500);
        oddBoxes.forEach((box) => box.classList.remove(rounded));
        evenBoxes.forEach((box) => box.classList.add(rounded));
        await sleep(500);
        evenBoxes.forEach((box) => box.classList.remove(rounded));
        await sleep(250);
        allBoxes.forEach((box) => box.classList.add(rounded));
        await sleep(500);
        allBoxes.forEach((box) => box.classList.remove(rounded));
      };

      animateBoxes();
    };

    const timeoutId = setTimeout(runFlashAnimation, FLASH_ANIM_DELAY);

    return () => clearTimeout(timeoutId);
  }, [bgGridInView]);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[BGGrid] Rendering");
  }

  return (
    <div ref={bgGridRef} className="flex w-full">
      {/* Left half */}
      <div
        className={`plate-grid plate-grid--left ml-px justify-end ${
          debugGrid ? "bg-red-500" : "bg-fore"
        }`}
      >
        {[...Array(numBoxes)].map((_, i) => (
          <div className={PLATE_GRID_ITEM_CLASSES} key={i}>
            {debugGrid && <div className={DEBUG_CLASSES}></div>}
          </div>
        ))}
      </div>
      {/* Right half */}
      <div
        className={`plate-grid plate-grid--right -ml-ggpn justify-start ${
          debugGrid ? "bg-red-500" : "bg-fore"
        }`}
      >
        {[...Array(numBoxes)].map((_, i) => (
          <div className={PLATE_GRID_ITEM_CLASSES} key={i}>
            {debugGrid && <div className={DEBUG_CLASSES}></div>}
          </div>
        ))}
      </div>
    </div>
  );
});

/*
 * Based on the dimensions of the projects draw background grid boxes to cover
 * it's background.
 *
 * This is dynamic and cannot be guessed with GRID_CONFIG as we do in other
 * routes.
 *
 * Perhaps the long term solution would be to always make it dynamic.
 */
function boxesNeededToCoverProject(
  bgGridRef: RefObject<HTMLDivElement | null>,
): number {
  if (!bgGridRef.current) {
    return -1;
  }

  const project = document.getElementById("project");
  if (!project) {
    return -1;
  }
  const projectHeight = Math.max(project.clientHeight, window.innerHeight);

  const computedStyle = getComputedStyle(project);
  const boxHeight = Number(
    computedStyle
      .getPropertyValue("--bg-grid-box-size")
      .trim()
      .replace("px", ""),
  );
  const boxGap = Number(
    computedStyle.getPropertyValue("--bg-grid-gap").trim().replace("px", ""),
  );

  let headerHeight = 0;
  const header = document.getElementsByTagName("header");
  if (header && header[0]) {
    headerHeight = header[0].clientHeight;
  }

  const leftBoxes = bgGridRef.current.querySelectorAll(
    ".plate-grid--left > div",
  );

  let boxesPerRow = 0;
  let prevTop: number | null = null;

  for (let i = 0; i < leftBoxes.length; i++) {
    const box = leftBoxes[i];
    const top = box.getBoundingClientRect().top;

    if (prevTop === null) {
      prevTop = top;
      boxesPerRow = 1;
    } else if (top === prevTop) {
      boxesPerRow++;
    } else {
      // Found the first box of the next row, so we know the stride
      break;
    }
  }

  const numRowsWanted = Math.ceil(
    1 + (headerHeight + projectHeight) / (boxHeight + boxGap),
  );

  return boxesPerRow * numRowsWanted;
}
