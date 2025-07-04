"use client";

// React
import { createContext, RefObject, useContext, useEffect, useRef } from "react";

// Next.js
import Link from "next/link";

// Third-Party
import { Brain } from "lucide-react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useVelocity,
} from "motion/react";

// Project
import { Button } from "@/components/button";
import { CursorSize } from "@/components/cursor";
import { ThemedImage } from "@/components/themed-image";
import settings from "@/config/settings";
import { useSection } from "@/contexts/section";
import { useBreakpoint } from "@/hooks/breakpoint";
import { useTouchDevice } from "@/hooks/browser";
import { cn, toBool } from "@/lib";
import { forwardRef } from "react";

const SCROLL_THRESHOLD = 800;

const Header = forwardRef<HTMLHeadElement>(function Header(_, headerRef) {
  const headerContext = useHeader();
  const fallbackMotionValue = useMotionValue(0);
  const headerTranslateYSpring = headerContext
    ? headerContext.headerTranslateYSpring
    : fallbackMotionValue;

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Header] Rendering");
  }

  return (
    <motion.div
      className={cn(
        "pointer-events-auto",
        "sticky top-0 h-(--header-height) w-full flex justify-center z-50",
      )}
    >
      <motion.header
        ref={headerRef}
        className="w-g40y grid grid-cols-4 grid-rows-2 gap-ggpn border-2-fore bg-fore"
        style={{ y: headerTranslateYSpring }}
      >
        {/* Logo */}
        <div
          className={cn(
            "row-start-1 row-span-2",
            "md:pt-[6px] md:pl-[14px]",
            "max-md:flex max-md:items-center max-md:justify-center",
            "bg-back hover:bg-fore text-fore hover:text-back",
            "active:scale-75 transition-[scale]",
          )}
        >
          <CursorSize sizeOnHover={0.4}>
            <Link href="/">
              <h1
                className={cn(
                  "font-title inline select-none center",
                  "text-[42px] lg:text-[44px] leading-[34px] lg:leading-[30px]",
                )}
              >
                <span className="hidden md:inline">Ram⬢n Blanquer</span>
                <span className="hidden sm:max-md:inline">
                  Ra▲
                  <br />
                  mon
                </span>
                <span className="hidden xs:max-sm:inline">ramn</span>
                <span className="hidden max-xs:inline">Rb</span>
              </h1>
            </Link>
          </CursorSize>
        </div>
        {/* Social */}
        <div className="bg-back flex gap-2 items-center justify-center col-span-2 sm:col-span-1">
          <CursorSize sizeOnHover={0.4}>
            <a href="https://github.com/eulersson" target="_blank">
              <ThemedImage
                src="/github.svg"
                alt="GitHub Logo"
                width={24}
                height={24}
                className="transition-transform active:scale-75 hover:p-[2px] hover:border-2-fore"
              />
            </a>
          </CursorSize>
          <CursorSize sizeOnHover={0.4}>
            <a href="https://www.linkedin.com/in/ramonblanquer" target="_blank">
              <ThemedImage
                src="/linkedin.svg"
                alt="LinkedIn Logo"
                width={24}
                height={24}
                className="transition-transform active:scale-75 hover:p-[2px] hover:border-2-fore"
              />
            </a>
          </CursorSize>
          <CursorSize sizeOnHover={0.4}>
            <a href="https://www.linkedin.com/in/ramonblanquer" target="_blank">
              <ThemedImage
                src="/x.svg"
                alt="X Logo"
                width={24}
                height={24}
                className="transition-transform active:scale-75 hover:p-[2px] hover:border-2-fore"
              />
            </a>
          </CursorSize>
          <CursorSize sizeOnHover={0.4}>
            <a href="https://notes.ramn.dev/" target="_blank">
              <Brain className="transition-transform active:scale-75 hover:border-2-fore" />
            </a>
          </CursorSize>
        </div>
        {/* Resume */}
        <div className="flex items-center justify-center bg-back">
          <Button link="/CV.pdf" className="max-sm:hidden px-4">
            CV Resume
          </Button>
          <a
            className="sm:hidden font-mono text-[15px] sm:text-[18px] underline hover:font-bold"
            href="/CV.pdf"
            target="_blank"
          >
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
    </motion.div>
  );
});

const HeaderContext = createContext<{
  headerTranslateYSpring: MotionValue;
  headerTranslateYOffsetSpring: MotionValue;
} | null>(null);

export function HeaderProvider({
  headerRef,
  correctNavbarUpperSpace,
  children,
}: {
  headerRef: RefObject<HTMLHeadElement | null>;
  correctNavbarUpperSpace: boolean;
  children: React.ReactNode;
}) {
  const initialScrollChangeHappened = useRef<boolean>(false);

  const { isSmaller } = useBreakpoint(settings.navBarHorizontalAtBreakpoint);
  const navbarVertical = isSmaller;

  const headerTranslateY = useMotionValue(0);
  const headerTranslateYSpring = useSpring(headerTranslateY);

  const headerTranslateYOffset = useMotionValue(0);
  const headerTranslateYOffsetSpring = useSpring(headerTranslateYOffset);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const { activeSectionIdx } = useSection();

  useEffect(() => {
    if (correctNavbarUpperSpace && navbarVertical) {
      const offset = (activeSectionIdx + 1) * 28;
      headerTranslateY.set(offset);
      headerTranslateYOffset.set(
        offset + (headerRef.current?.offsetHeight || 0),
      );
    } else {
      headerTranslateY.set(0);
      headerTranslateYOffset.set(headerRef.current?.offsetHeight || 0);
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

    const offset = (activeSectionIdx + 1) * 28;
    if (scrollVelocity.get() < 0) {
      headerTranslateY.set(offset);
      headerTranslateYOffset.set(
        offset + (headerRef.current?.offsetHeight || 0),
      );
    } else {
      if (headerRef.current && scrollVelocity.get() > SCROLL_THRESHOLD) {
        // Scrolling up hides the header.
        headerTranslateY.set(-headerRef.current.offsetHeight);
        headerTranslateYOffset.set(offset);
      }
    }
  });

  return (
    <HeaderContext.Provider
      value={{ headerTranslateYSpring, headerTranslateYOffsetSpring }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}

export { Header };
