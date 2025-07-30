"use client";

// React
import { createContext, RefObject, useContext, useEffect, useRef } from "react";

// Next.js
import Link from "next/link";

// Third-Party
import { ArrowDownToLine, Brain } from "lucide-react";
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
import { cn, toBool, isUpwork } from "@/lib";
import { usePathname } from "next/navigation";
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
        "sticky top-0 z-50 flex h-(--header-height) w-full justify-center",
      )}
    >
      <motion.header
        ref={headerRef}
        className="w-g40y gap-ggpn border-2-fore bg-fore grid grid-cols-4 grid-rows-2"
        style={{ y: headerTranslateYSpring }}
      >
        {/* Logo */}
        <div
          className={cn(
            "row-span-2 row-start-1",
            "md:pt-[6px] md:pl-[14px]",
            "max-md:flex max-md:items-center max-md:justify-center",
            "bg-back hover:bg-fore text-fore hover:text-back",
            "transition-[scale] active:scale-75",
          )}
        >
          <CursorSize sizeOnHover={0.4}>
            <Link href="/">
              <h1
                className={cn(
                  "font-title center inline select-none",
                  "text-[42px] leading-[34px] lg:text-[44px] lg:leading-[30px]",
                )}
              >
                <span className="hidden md:inline">
                  Ram⬢n {isUpwork ? "B--q--" : "Blanquer"}
                </span>
                <span className="hidden sm:max-md:inline">
                  Ra▲
                  <br />
                  mon
                </span>
                <span className="xs:max-sm:inline hidden">ramn</span>
                <span className="max-xs:inline hidden">Rb</span>
              </h1>
            </Link>
          </CursorSize>
        </div>
        {/* Social */}
        <div className="bg-back col-span-2 flex items-center justify-center gap-2 sm:col-span-1">
          <CursorSize sizeOnHover={0.4}>
            <a href="https://github.com/eulersson" target="_blank">
              <ThemedImage
                src="/github.svg"
                alt="GitHub Logo"
                width={24}
                height={24}
                className="hover:border-2-fore transition-transform hover:p-[2px] active:scale-75"
              />
            </a>
          </CursorSize>
          {!isUpwork && (
            <CursorSize sizeOnHover={0.4}>
              <a
                href="https://www.linkedin.com/in/ramonblanquer"
                target="_blank"
              >
                <ThemedImage
                  src="/linkedin.svg"
                  alt="LinkedIn Logo"
                  width={24}
                  height={24}
                  className="hover:border-2-fore transition-transform hover:p-[2px] active:scale-75"
                />
              </a>
            </CursorSize>
          )}
          <CursorSize sizeOnHover={0.4}>
            <a
              href="https://www.upwork.com/freelancers/~01d7c26a2831791c09?mp_source=share"
              target="_blank"
            >
              <ThemedImage
                src="/upwork-logo.png"
                alt="Upwork Logo"
                width={24}
                height={24}
                className="hover:border-2-fore transition-transform hover:p-[2px] active:scale-75"
              />
            </a>
          </CursorSize>
          <CursorSize sizeOnHover={0.4}>
            <a href="https://notes.ramn.dev/" target="_blank">
              <Brain className="hover:border-2-fore transition-transform active:scale-75" />
            </a>
          </CursorSize>
        </div>
        {/* Resume */}
        <div className="bg-back flex items-center justify-center">
          <Button
            link={`/CV${isUpwork ? "-upwork" : ""}.pdf`}
            className="px-4 max-sm:hidden"
          >
            Resume <ArrowDownToLine className="inline" width={12} height={12} />
          </Button>
          <a
            className="font-mono text-[15px] underline hover:font-bold sm:hidden sm:text-[18px]"
            href={`/CV${isUpwork ? "-upwork" : ""}.pdf"`}
            target="_blank"
          >
            Resume<span className="xs:inline hidden"> (CV)</span>
          </a>
        </div>
        {/* Email or Call to Action */}
        <div className="bg-back col-start-2 col-end-5 row-start-2 flex items-center justify-center sm:col-end-4">
          <CursorSize sizeOnHover={0.4}>
            {isUpwork ? (
              <a
                className="font-mono text-[15px] underline hover:font-bold sm:text-[18px]"
                href="https://www.upwork.com/freelancers/~01d7c26a2831791c09?mp_source=share"
              >
                Hire me on Upwork
              </a>
            ) : (
              <a
                className="font-mono text-[15px] underline hover:font-bold sm:text-[18px]"
                href="mailto:blanquer.ramon@gmail.com"
              >
                blanquer.ramon@gmail.com
              </a>
            )}
          </CursorSize>
        </div>
        {/* Motto */}
        <div className="bg-back col-span-1 col-start-4 row-span-2 row-start-1 flex items-center max-sm:hidden">
          <div className="gap-ggpn flex flex-col text-[15px] leading-[20px]">
            <div className="flex">
              <pre className="bg-fore text-back inline-block font-mono">
                from code to deployment;
              </pre>
            </div>
            <div className="flex">
              <pre className="bg-fore text-back inline-block font-mono">
                from back to front
                <span className="animate-blinky bg-fore text-back inline-block">
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

  const pathname = usePathname();

  useEffect(() => {
    if (correctNavbarUpperSpace && navbarVertical) {
      const offset = pathname === "/" ? (activeSectionIdx + 1) * 28 : 0;
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

    // Protect against the initial scroll in case you refresh after having scrolled.
    if (initialScrollChangeHappened.current === false) {
      initialScrollChangeHappened.current = true;
      return;
    }

    const offset = pathname === "/" ? (activeSectionIdx + 1) * 28 : 0;
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
