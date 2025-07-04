"use client";

// Next.js
import Link from "next/link";

// Third-Party
import { motion, useMotionValue } from "motion/react";
import { Grid3x3 } from "lucide-react";

// Project
import { CursorSize } from "@/components/cursor";
import { useHeader } from "@/components/header";
import { ThemedImage } from "@/components/themed-image";
import { cn } from "@/lib";

const anchorClasses = cn(
  "bg-fore text-back hover:text-fore hover:bg-back  px-2 border-fore first:border-l-0 border-l-2  border-r-2 border-b-2",
  "flex items-center justify-center gap-1",
  "group",
);

export function Ribbon({ repo }: { repo?: string }) {
  const headerContext = useHeader();
  const fallbackMotionValue = useMotionValue(0);
  const headerTranslateYSpring =
    headerContext?.headerTranslateYSpring ?? fallbackMotionValue;
  return (
    <div className="absolute top-0 right-0 z-60 h-full">
      <motion.div
        className={cn(
          "sticky z-60",
          "top-(--header-height) group-[.is-open]/modal:top-0",
          "group-[.is-open]/modal:mt-0",
        )}
        style={{ y: headerTranslateYSpring }}
      >
        <CursorSize sizeOnHover={0.4}>
          {repo && (
            <div
              className={cn(
                "gap-ggpn flex text-[12px]",
                "right-[calc(50%-2*var(--bg-grid-box-size)-1.5*var(--bg-grid-gap))] h-[calc(6*var(--spacing))] w-[200px] origin-top-right translate-y-[200px] rotate-90",
              )}
            >
              <a
                href={`https://github.com/${repo}`}
                target="_blank"
                className={anchorClasses}
              >
                <ThemedImage
                  className="block group-hover:hidden"
                  src="/github.svg"
                  alt="GitHub Logo"
                  width={15}
                  height={15}
                  invert
                />
                <ThemedImage
                  className="hidden group-hover:block"
                  src="/github.svg"
                  alt="GitHub Logo"
                  width={15}
                  height={15}
                />
                GitHub
              </a>
              <Link href="/work" className={anchorClasses}>
                <Grid3x3 width={15} height={15} />
                All Projects
              </Link>
            </div>
          )}
        </CursorSize>
      </motion.div>
    </div>
  );
}
