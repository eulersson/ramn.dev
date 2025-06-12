"use client";

// Third-Party
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useVelocity,
} from "motion/react";
import { useEffect, useRef } from "react";

// Project
import { Button } from "@/components/button";
import { CursorSize } from "@/components/cursor";
import { ThemedImage } from "@/components/themed-image";
import { useTouchDevice } from "@/hooks/touch-device";
import { toBool } from "@/utils";
import { useSection } from "@/contexts/section";
import { useBreakpoint } from "@/hooks/breakpoint";
import settings from "@/config/settings";

const SCROLL_THRESHOLD = 900;

export function Header({
  correctNavbarUpperSpace = false,
}: {
  correctNavbarUpperSpace?: boolean;
}) {
  const isTouchDevice = useTouchDevice();

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Header] Rendering");
  }

  const initialScrollChangeHappened = useRef<boolean>(false);

  const { isSmaller } = useBreakpoint(settings.navBarHorizontalAtBreakpoint);
  const navbarVertical = isSmaller;

  const headerRef = useRef<HTMLHeadElement>(null);
  const headerTranslateY = useMotionValue(0);
  const headerTranslateYSpring = useSpring(headerTranslateY);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const { activeSectionIdx } = useSection();

  useEffect(() => {
    if (correctNavbarUpperSpace && navbarVertical) {
      headerTranslateY.set((activeSectionIdx + 1) * 28);
    } else {
      headerTranslateY.set(0);
    }
  }, [correctNavbarUpperSpace, activeSectionIdx, navbarVertical]);

  useMotionValueEvent(scrollY, "change", (v) => {
    if (!correctNavbarUpperSpace) {
      return;
    }
    if (toBool(process.env.NEXT_PUBLIC_DISABLE_HEADER_HIDE_ON_SCROLL)) {
      return;
    }

    if (!isTouchDevice) {
      return;
    }
    // Protect against the initial scroll in case you refresh after having scrolled.
    if (initialScrollChangeHappened.current === false) {
      initialScrollChangeHappened.current = true;
      return;
    }

    if (scrollVelocity.get() < 0) {
      headerTranslateY.set((activeSectionIdx + 1) * 28);
    } else {
      if (headerRef.current && scrollVelocity.get() > SCROLL_THRESHOLD) {
        headerTranslateY.set(-headerRef.current.offsetHeight);
      }
    }
  });

  return (
    <div className="sticky top-0 h-(--header-height) w-full flex justify-center z-10">
      <motion.header
        ref={headerRef}
        className="w-g40y grid grid-cols-4 grid-rows-2 gap-ggpn border-2-fore bg-fore bg-back"
        style={{ y: headerTranslateYSpring }}
      >
        {/* Logo */}
        <div className="row-start-1 row-span-2 bg-back max-md:flex max-md:items-center max-md:justify-center md:pt-[6px] md:pl-[14px]">
          <h1 className="font-title inline text-[42px] lg:text-[44px] leading-[34px] lg:leading-[30px] select-none center">
            <span className="hidden md:inline">Ram⬢n Blanquer</span>
            <span className="hidden sm:max-md:inline">
              Ra▲
              <br />
              mon
            </span>
            <span className="hidden xs:max-sm:inline">ramn</span>
            <span className="hidden max-xs:inline">Rb</span>
          </h1>
        </div>
        {/* Social */}
        <div className="col-span-2 sm:col-span-1 flex gap-2 items-center justify-center bg-back">
          {/* https://github.com/pacocoursey/next-themes#images */}
          <CursorSize sizeOnHover={0.4}>
            <ThemedImage
              src="/github.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
            />
          </CursorSize>
          <CursorSize sizeOnHover={0.4}>
            <ThemedImage
              src="/linkedin.svg"
              alt="LinkedIn Logo"
              width={24}
              height={24}
            />
          </CursorSize>
          <CursorSize sizeOnHover={0.4}>
            <ThemedImage src="/x.svg" alt="X Logo" width={24} height={24} />
          </CursorSize>
        </div>
        {/* Resume */}
        <div className="flex items-center justify-center bg-back">
          <Button className="max-sm:hidden px-4">CV Resume</Button>
          <a className="sm:hidden font-mono text-[15px] sm:text-[18px] underline hover:font-bold">
            Resume<span className="hidden xs:inline"> (CV)</span>
          </a>
        </div>
        {/* Email */}
        <div className="row-start-2 col-start-2 col-end-5 sm:col-end-4 flex items-center justify-center bg-back ">
          <CursorSize sizeOnHover={0.4}>
            <a
              className="font-mono text-[15px] sm:text-[18px] underline hover:font-bold"
              href="mailto:blanquer.ramon@gmail.com"
            >
              blanquer.ramon@gmail.com
            </a>
          </CursorSize>
        </div>
        {/* Motto */}
        <div className="max-sm:hidden row-start-1 col-start-4 row-span-2 col-span-1 flex items-center bg-back ">
          <div className="leading-[20px] text-[15px] flex flex-col gap-ggpn">
            <div className="flex">
              <pre className="font-mono inline-block bg-fore text-back">
                from code to deployment;
              </pre>
            </div>
            <div className="flex">
              <pre className="font-mono inline-block bg-fore text-back">
                from back to front
                <span className="inline-block animate-blinky bg-fore text-back">
                  ;
                </span>
              </pre>
            </div>
          </div>
        </div>
      </motion.header>
    </div>
  );
}
