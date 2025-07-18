"use client";

// React
import { ForwardedRef, useEffect, useRef, useState } from "react";

// Third-Party
import { AnimatePresence } from "motion/react";

// Project
import { Header, HeaderProvider } from "@/components/header";
import { BackgroundGrid } from "@/components/layout/background-grid";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { cn, toBool } from "@/lib";
import { useBreakpoint } from "@/hooks/breakpoint";
import settings from "@/config/settings";

export function PageWrapper({
  children,
  heroRef,
}: {
  children: React.ReactNode;
  heroRef: ForwardedRef<HTMLHeadingElement>;
}) {
  const [showNavBar, setShowNavBar] = useState(false);

  const [correctHeaderNavbarUpperSpace, setCorrectHeaderNavbarUpperSpace] =
    useState(false);

  const navBarTimeoutMillis = toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
    ? 1000
    : 4000;

  useEffect(() => {
    const setShowNavBarTimeout = setTimeout(() => {
      if (toBool(process.env.NEXT_PUBLIC_DISABLE_NAVBAR)) {
        return;
      }

      console.log(
        `[PageWrapper] Setting show nav bar to 'true' (timeout ${navBarTimeoutMillis}).`,
      );
      setShowNavBar(true);
    }, navBarTimeoutMillis);

    return () => {
      clearTimeout(setShowNavBarTimeout);
    };
  }, []);

  const [heroEnter, setHeroEnter] = useState(false);

  const { isSmaller } = useBreakpoint(settings.navBarHorizontalAtBreakpoint);
  const navbarVertical = isSmaller;

  useEffect(() => {
    setCorrectHeaderNavbarUpperSpace(!heroEnter && navbarVertical);
  }, [navbarVertical, heroEnter]);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[PageWrapper] Rendering");
  }

  return (
    <AnimatePresence>
      {showNavBar && <Navbar key="navbar" />}
      {!toBool(process.env.NEXT_PUBLIC_DISABLE_HERO) && (
        <Hero
          key="hero"
          ref={heroRef}
          onEnterLeave={(enter) => {
            setHeroEnter(enter);
          }}
        />
      )}
      <LayoutContainer
        delayBackgroundAnimation={6000}
        correctHeaderNavbarUpperSpace={correctHeaderNavbarUpperSpace}
      >
        {children}
      </LayoutContainer>
    </AnimatePresence>
  );
}

export function LayoutContainer({
  className,
  children,
  correctHeaderNavbarUpperSpace,
  delayBackgroundAnimation = 0,
}: {
  className?: string;
  children: React.ReactNode;
  correctHeaderNavbarUpperSpace: boolean;
  delayBackgroundAnimation?: number;
}) {
  const headerRef = useRef<HTMLHeadElement>(null);

  return (
    <>
      <div
        key="layout-container"
        className={cn(
          "absolute flex w-full justify-center",
          "pointer-events-none", // allows background tile hover
          className,
        )}
      >
        <div className="w-g40y">
          <HeaderProvider
            headerRef={headerRef}
            correctNavbarUpperSpace={correctHeaderNavbarUpperSpace}
          >
            <Header ref={headerRef} />
            <div className="pt-ggpn">
              <main className="-mt-ggpn">{children}</main>
            </div>
          </HeaderProvider>
        </div>
      </div>
      <BackgroundGrid
        key="grid"
        delayBackgroundAnimation={delayBackgroundAnimation}
      />
    </>
  );
}
