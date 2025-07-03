// React
import { MouseEventHandler } from "react";

// Next.js
import { useTheme } from "next-themes";
import Image from "next/image";

// Third-Party
import { motion } from "motion/react";

// Project
import { CursorSize } from "@/components/cursor";
import { cn } from "@/lib";
import cursorIconDark from "@/public/cursor-dark.svg";
import cursorIcon from "@/public/cursor.svg";

export function PlayPrompt({ onClick }: { onClick: MouseEventHandler }) {
  const { theme } = useTheme();
  return (
    <div className="bg-fore text-back flex h-full w-full items-center justify-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <CursorSize sizeOnHover={8}>
          <motion.div
            onClick={onClick}
            className={cn(
              "relative p-[5px] transition-transform duration-1000 ease-in-out hover:rotate-90",
              "scale-60 hover:scale-50 md:scale-100",
            )}
          >
            {/* Grid. */}
            <div
              className="h-[300px] w-[300px]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(var(--col-back) 0 2px, transparent 1px 100%), " +
                  "repeating-linear-gradient(90deg, var(--col-back) 0 1px, transparent 2px 100%)",
                backgroundSize: "59.74px 59.74px",
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
          </motion.div>
        </CursorSize>

        {/* Cursor. */}
        <div className="pointer-events-none absolute top-[calc(50%-50px)] right-[calc(50%-40px)] translate-x-3 translate-y-14 rotate-180">
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
        <div className="pointer-events-none absolute top-[50%] right-[50%]">
          <div className="absolute -mt-[8px] -ml-[8px]">
            <div className="bg-back absolute h-[16px] w-[16px] rounded-full"></div>
            <div className="bg-back absolute h-[16px] w-[16px] animate-ping rounded-full"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
