// Third-Party
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { MouseEventHandler } from "react";

// Project
import { CursorSize } from "@/components/cursor";
import cursorIconDark from "@/public/cursor-dark.svg";
import cursorIcon from "@/public/cursor.svg";
import { cn } from "@/utils";

export function PlayPrompt({ onClick }: { onClick: MouseEventHandler }) {
  const { theme } = useTheme();
  return (
    <div className="bg-fore text-back w-full h-full flex items-center justify-center">
      <CursorSize sizeOnHover={8}>
        <div
          onClick={onClick}
          className={cn(
            "relative p-[5px] transition-transform duration-1000 ease-in-out hover:rotate-90 ",
            "scale-70 xs:scale-100 hover:scale-50",
          )}
        >
          {/* Grid. */}
          <div
            className=" w-[300px] h-[300px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(var(--col-back) 0 2px, transparent 1px 100%), " +
                "repeating-linear-gradient(90deg, var(--col-back) 0 1px, transparent 2px 100%)",
              backgroundSize: "59.75px 59.75px",
            }}
          ></div>

          {/* Dots. */}
          <div
            className="absolute inset-0"
            style={{
              display: "grid",
              gridTemplateRows: "repeat(6, 10px)",
              gridTemplateColumns: "repeat(6, 10px)",
              justifyContent: "space-between",
              alignContent: "space-between",
            }}
          >
            {[...Array(36)].map((_, i) => (
              <div key={i} className="bg-back"></div>
            ))}
          </div>
        </div>
      </CursorSize>

      {/* Cursor. */}
      <div className="absolute pointer-events-none rotate-180 translate-x-3 translate-y-14">
        <div className="animate-bounce">
          <div className="rotate-180">
            {theme === "dark" ? (
              <Image width={80} src={cursorIconDark} alt="Cursor" />
            ) : (
              <Image width={80} src={cursorIcon} alt="Cursor" />
            )}
          </div>
        </div>
      </div>

      {/* Pinging sphere. */}
      <motion.div className="absolute pointer-events-none">
        <div className="absolute -ml-[8px] -mt-[8px]">
          <div className="absolute rounded-full w-[16px] h-[16px] bg-back"></div>
          <div className="absolute animate-ping rounded-full w-[16px] h-[16px] bg-back"></div>
        </div>
      </motion.div>
    </div>
  );
}
