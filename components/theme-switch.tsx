"use client";

// React
import { useEffect, useState } from "react";

// Third-Party
import { motion, useMotionValue, useSpring } from "motion/react";
import { useTheme } from "next-themes";

// Project
import { CursorSize } from "@/components/cursor";
import { toBool } from "@/lib";

// - https://github.com/pacocoursey/next-themes/tree/cd67bfa20ef6ea78a814d65625c530baae4075ef#avoid-hydration-mismatch
export function ThemeSwitch({ yInitial }: { yInitial: number }) {
  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, { stiffness: 200, damping: 12 });

  const [mounted, setMounted] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);

  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeouts: Array<NodeJS.Timeout> = [];
    if (mounted) {
      if (theme) {
        const timeOffset = toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
          ? 2000
          : 4000;
        timeouts = [
          setTimeout(() => setShowSwitcher(true), timeOffset),
          ...(localStorage.getItem("hasPlayedThemeSwitcherAnimation")
            ? []
            : [
                setTimeout(() => scale.set(1.5), timeOffset + 500),
                setTimeout(() => {
                  setTheme("dark");
                }, timeOffset + 1000),
                setTimeout(() => {
                  setTheme("light");
                }, timeOffset + 2000),
                setTimeout(() => scale.set(1), timeOffset + 3000),
                setTimeout(
                  () =>
                    localStorage.setItem(
                      "hasPlayedThemeSwitcherAnimation",
                      "true",
                    ),
                  timeOffset + 3000,
                ),
              ]),
        ];
      } else {
        throw new Error("Could not read theme... Race condition?");
      }
    }
    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[ThemeSwitch] Rendering.");
  }

  const slider =
    "bg-fore absolute inset-0 rounded-[34px] transition duration-500";
  let beforeSliderPseudoElement =
    "before:bg-back before:absolute before:content-[''] before:w-[26px] before:h-[26px] before:left-[4px] before:top-[4px] before:rounded-[50%] before:transition before:duration-500";

  if (isDark) {
    beforeSliderPseudoElement += " before:translate-x-[36px]";
  }

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.2, duration: 1, ease: "easeInOut" },
        opacity: { delay: 0.2, duration: 0.01 },
      },
    },
  };

  const moon = (
    <motion.svg
      className="absolute top-[8px] left-[14px]"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        stroke="var(--col-back)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        d="M22.8,10.7c0.1,0.6,0.2,1.2,0.2,1.9c0,5.8-4.7,10.5-10.5,10.5S2,18.4,2,12.6C2,6.8,6.6,2.2,12.3,2.1c-2.7,1.2-4.6,3.9-4.6,7c0,4.2,3.4,7.7,7.7,7.7C19,16.7,22.1,14.1,22.8,10.7z"
        variants={draw}
      ></motion.path>
    </motion.svg>
  );

  const sun = (
    <motion.svg
      className="absolute top-[7px] right-[14px]"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        stroke="var(--col-back)"
        strokeWidth="2"
        cx="12"
        cy="12"
        r="4"
        variants={{
          hidden: { scale: 0 },
          visible: { scale: 1, transition: { delay: 0.2 } },
        }}
      />
      {[...Array(6)].map((e, i) => (
        <motion.line
          key={i}
          stroke="var(--col-back)"
          strokeWidth="2"
          strokeLinecap="round"
          x1="20"
          y1="12"
          x2="23"
          y2="12"
          style={{
            rotateZ: 360 * (i / 6),
            originX: "12px",
            originY: "12px",
            transformBox: "view-box",
          }}
          variants={{
            hidden: { scale: 0 },
            visible: {
              scale: 1,
              transition: { delay: 0.2 + 0.05 * i, ease: "easeInOut" },
            },
          }}
        ></motion.line>
      ))}
    </motion.svg>
  );

  return (
    showSwitcher && (
      <motion.div
        initial={{ y: yInitial }}
        animate={{ y: 0 }}
        transition={{ type: "spring" }}
      >
        <CursorSize sizeOnHover={0.4}>
          <motion.label
            className="relative inline-block h-[34px] w-[70px]"
            onMouseEnter={() => {
              scale.set(1.15);
            }}
            onMouseLeave={() => {
              scale.set(1);
            }}
            style={{ scale: scaleSpring }}
          >
            <input
              type="checkbox"
              className="h-0 w-0 opacity-0"
              checked={isDark}
              onChange={() => setTheme(isDark ? "light" : "dark")}
            />
            <span className={`${slider} ${beforeSliderPseudoElement}`} />
            {isDark ? moon : sun}
          </motion.label>
        </CursorSize>
      </motion.div>
    )
  );
}
