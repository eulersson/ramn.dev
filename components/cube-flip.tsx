// React
import React, { useState } from "react";

// Project
import { cn } from "@/lib";

export const CubeFlip = ({
  frontContent,
  backContent,
  className,
  onClick,
}: {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
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
