"use client";

// React
import React, { useEffect, useRef, useState } from "react";

// Next.js
import Image from "next/image";

// Third-Party
import { AnimatePresence, motion, useInView } from "motion/react";

// Project
import { cn, sleep } from "@/lib";
import cursorIconDark from "@/public/cursor-dark.svg";
import cursorIcon from "@/public/cursor.svg";
import { useTheme } from "next-themes";

export const CubeFlip = ({
  frontContent,
  backContent,
  column,
  className,
  showClickAnimation,
  onClick,
}: {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  column: number;
  className: string;
  showClickAnimation?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const [animationRunning, setAnimationRunning] = useState(false);
  const cursorIconRef = useRef<HTMLDivElement>(null);
  const [autoHoverDone, setAutoHoverDone] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  const { theme } = useTheme();

  useEffect(() => {
    if (inView && showClickAnimation) {
      (async function () {
        await sleep(300 * column);
        await sleep(1000);
        setHovered(true);
        await sleep(500);
        setAnimationRunning(true);
        await sleep(1250);
        setAnimationRunning(false);
        await sleep(300);
        setHovered(false);
        setAutoHoverDone(true);
      })();
    } else if (inView && !autoHoverDone) {
      (async function () {
        await sleep(300 * column);
        setHovered(true);
        await sleep(300);
        setHovered(false);
        setAutoHoverDone(true);
      })();
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      onClick={(e) => {
        if (hovered) {
          onClick && onClick(e);
        } else {
          setHovered(true);
        }
      }}
      className={cn(
        hovered ? "z-20" : "z-10",
        "transition-[z-index] delay-[0ms,300ms]",
        className,
      )}
    >
      <div
        className="inline-block cursor-default"
        style={{
          width: "100%",
          height: "100%",
          lineHeight: "100%",
          perspective: "1000px",
        }}
      >
        <AnimatePresence>
          {showClickAnimation && animationRunning && (
            <motion.div
              ref={cursorIconRef}
              animate={{
                scale: [0, 1, 1, 1, 1, 0.5, 1, 1],
                transition: { duration: 1 },
              }}
              exit={{
                scale: 0,
                transition: {
                  duration: 0.2,
                },
              }}
              className="pointer-events-none absolute top-[calc(50%-60px)] left-[calc(50%-45px)] z-100 scale-75"
            >
              {theme === "dark" ? (
                <Image width={100} src={cursorIconDark} alt="Cursor" />
              ) : (
                <Image width={100} src={cursorIcon} alt="Cursor" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={cn(
            "relative inline-block h-full w-full origin-[50%_0] transition-transform duration-300 [transform-style:preserve-3d]",
            hovered ? "rotate-x-90" : "",
          )}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className={cn("front-face h-full w-full")}>{frontContent}</div>
          <div className="back-face absolute top-full left-0 h-full w-full origin-top -rotate-x-90">
            <div className="relative h-full w-full">{backContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
