// React
import React, { useEffect, useRef, useState } from "react";

// Third-Party
import { useInView, useScroll } from "motion/react";

// Project
import { cn } from "@/lib";

export const CubeFlip = ({
  frontContent,
  backContent,
  column,
  numColumns,
  className,
  onClick,
}: {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  column: number;
  numColumns: number;
  className: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const [autoHoverDone, setaAutoHoverDone] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (inView && !autoHoverDone) {
      setTimeout(() => {
        setHovered(true);
      }, 300 * column);

      setTimeout(
        () => {
          setHovered(false);
          setaAutoHoverDone(true);
        },
        300 * column + 300,
      );
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
        <div
          className={cn(
            "relative inline-block w-full h-full transition-transform duration-300 origin-[50%_0] [transform-style:preserve-3d]",
            hovered ? "rotate-x-90" : "",
          )}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className={cn("front-face w-full h-full")}>{frontContent}</div>
          <div className="back-face w-full h-full absolute top-full left-0 origin-top transform -rotate-x-90">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
};
