"use client";

// Third-Party
import { AnimatePresence } from "motion/react";
import { ForwardedRef, useEffect, useState } from "react";

// Components
import { Header } from "@/components/header";
import { BackgroundGrid } from "@/components/layout/background-grid";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { toBool } from "@/utils";
import { useBreakpoint } from "@/hooks/breakpoint";

export function PageWrapper({
  children,
  heroRef,
}: {
  children: React.ReactNode;
  heroRef: ForwardedRef<HTMLHeadingElement>;
}) {
  const [showNavBar, setShowNavBar] = useState(false);
  const { isSmaller } = useBreakpoint('lg')
  const isSmallerThanLg = isSmaller

  const navBarTimeoutMillis = process.env.NEXT_PUBLIC_DISABLE_COVER
    ? 1000
    : 4800;

  useEffect(() => {
    const setShowNavBarTimeout = setTimeout(() => {
      if (toBool(process.env.NEXT_PUBLIC_DISABLE_NAVBAR)) {
        return;
      }

      console.log(
        `[PageWrapper] Setting show nav bar to 'true' (timeout ${navBarTimeoutMillis}).`
      );
      setShowNavBar(true);
    }, navBarTimeoutMillis);

    return () => {
      clearTimeout(setShowNavBarTimeout);
    };
  }, []);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[PageWrapper] Rendering");
  }

  return (
    <AnimatePresence>
      {showNavBar && <Navbar key="navbar" vertical={isSmallerThanLg} />}
      {!toBool(process.env.NEXT_PUBLIC_DISABLE_HERO) && (
        <Hero key="hero" ref={heroRef} />
      )}
      <div
        key="layout-container"
        className="absolute w-full flex justify-center drill-mouse-hover"
      >
        <div className="w-g40y drill-mouse-hover">
          <Header />
          <main className="mt-g01y pt-ggpn drill-mouse-hover">
            {children}
          </main>
        </div>
      </div>
      <BackgroundGrid key="grid" />
    </AnimatePresence>
  );
}
