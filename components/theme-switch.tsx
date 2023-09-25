"use client";

// React
import { FunctionComponent, useEffect, useState } from "react";

// Third-Party
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

// Project
import { useCursor } from "@/contexts/cursor";

// Environment
import environment from "@/environment";

// - https://github.com/pacocoursey/next-themes/tree/cd67bfa20ef6ea78a814d65625c530baae4075ef#avoid-hydration-mismatch
export const ThemeSwitch: FunctionComponent<{ className?: string }> = ({
  className = "",
}) => {
  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, { stiffness: 200, damping: 12 });

  const [mounted, setMounted] = useState(false);

  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const {cursorSize, setCursorSize} = useCursor();
  const [showSwitcher, setShowSwitcher] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeouts: Array<NodeJS.Timeout> = [];
    if (mounted) {
      if (theme) {
        const offset = 3000;
        timeouts = [
          setTimeout(() => setShowSwitcher(true), offset),
          ...(localStorage.getItem("hasPlayedThemeSwitcherAnimation")
            ? []
            : [
                setTimeout(() => scale.set(2), offset + 500),
                setTimeout(() => {
                  setTheme("dark");
                }, offset + 1000),
                setTimeout(() => {
                  setTheme("light");
                }, offset + 2000),
                setTimeout(() => scale.set(1), offset + 3000),
                setTimeout(
                  () =>
                    localStorage.setItem(
                      "hasPlayedThemeSwitcherAnimation",
                      "true"
                    ),
                  offset + 3000
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

  if (environment.printComponentRendering) {
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
      className="absolute left-[14px] top-[8px]"
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
      className="absolute right-[14px] top-[7px]"
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
          style={{ rotateZ: 360 * (i / 6), originX: "12px", originY: "12px" }}
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
        className={`${className}`}
        initial={{ y: "calc(100vh - 0px)", scale: 1 }}
        animate={{
          y: "calc(100vh - 63.5px)",
          scale: 1,
        }}
        exit={{ y: "calc(100vh - 0px)", scale: 1 }}
        style={{ x: "calc(50vw - 35px)" }}
        transition={{ type: "spring" }}
      >
        <motion.label
          className="relative inline-block w-[70px] h-[34px]"
          onMouseEnter={() => {
            setCursorSize(0.4);
            scale.set(1.2);
          }}
          onMouseLeave={() => {
            setCursorSize(1);
            scale.set(1);
          }}
          style={{ scale: scaleSpring }}
        >
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0"
            checked={isDark}
            onChange={() => setTheme(isDark ? "light" : "dark")}
          />
          <span className={`${slider} ${beforeSliderPseudoElement}`} />
          {isDark ? moon : sun}
        </motion.label>
      </motion.div>
    )
  );
};
