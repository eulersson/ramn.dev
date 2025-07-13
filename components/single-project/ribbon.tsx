"use client";

// Next.js
import Link from "next/link";

// Third-Party
import { Earth, ExternalLink, Grid3x3 } from "lucide-react";
import { motion, useMotionValue } from "motion/react";

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

export function Ribbon({ repo, website }: { repo?: string; website?: string }) {
  const headerContext = useHeader();
  const fallbackMotionValue = useMotionValue(0);
  const headerTranslateYSpring =
    headerContext?.headerTranslateYSpring ?? fallbackMotionValue;
  return (
    <div className="pointer-events-none absolute top-0 right-0 z-60 h-full">
      <motion.div
        className={cn(
          "sticky z-60",
          "top-(--header-height) group-[.is-open]/modal:top-0",
          "group-[.is-open]/modal:mt-0",
        )}
        style={{ y: headerTranslateYSpring }}
      >
        <CursorSize sizeOnHover={0.4}>
          <div
            className={cn(
              "pointer-events-auto",
              "gap-ggpn flex text-[12px]",
              "right-[calc(50%-2*var(--bg-grid-box-size)-1.5*var(--bg-grid-gap))] h-[calc(6*var(--spacing))] w-[300px] origin-top-right translate-y-[300px] rotate-90",
            )}
          >
            {repo && (
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
            )}
            <Link
              href="/work"
              className={cn(anchorClasses, "group-[.is-open]/modal:hidden")}
            >
              <Grid3x3 width={15} height={15} />
              All Projects
            </Link>
            {website && (
              <Link href={website} target="_blank" className={anchorClasses}>
                <Earth width={15} height={15} />
                Website
                <ExternalLink width={9} height={9} className="inline" />
              </Link>
            )}
          </div>
        </CursorSize>
      </motion.div>
    </div>
  );
}
