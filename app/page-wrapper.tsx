"use client";

// React
import { ForwardedRef, useEffect, useRef, useState } from "react";

// Third-Party
import { AnimatePresence } from "framer-motion";

// Components
import { BackgroundGrid } from "@/components/layout/background-grid";
import { Cover } from "@/components/layout/cover";
import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";

// Environment
import environment from "@/environment";

export function PageWrapper({
  children,
  heroRef,
}: {
  children: React.ReactNode;
  heroRef: ForwardedRef<HTMLHeadingElement>;
}) {
  const [coverAnimFinished, setCoverAnimFinished] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    const setCoverAnimFinishedTimeout = setTimeout(() => {
      console.log(
        "[PageWrapper] Setting cover anim finished to `true` (timeout 2000)."
      );
      setCoverAnimFinished(true);
    }, 2000);

    const setCoverTimeout = setTimeout(() => {
      console.log("[PageWrapper] Setting cover to `false` (timeout 2000).");
      setShowCover(false);
    }, 3500);

    const setShowNavBarTimeout = setTimeout(() => {
      console.log(
        "[PageWrapper] Setting show nav bar to `true` (timeout 3000)."
      );
      setShowNavBar(true);
    }, 4800);

    return () => {
      clearTimeout(setCoverAnimFinishedTimeout);
      clearTimeout(setCoverTimeout);
      clearTimeout(setShowNavBarTimeout);
    };
  }, []);

  if (environment.printComponentRendering) {
    console.log("[PageWrapper] Rendering");
  }

  // Prevent animation lag due to big rendering whilst the animation has not finished.
  const showNonCoverComponent = environment.disableCover
    ? true
    : coverAnimFinished;

  return (
    <AnimatePresence>
      {!environment.disableCover && showCover && <Cover key="cover" />}
      {showNonCoverComponent && showNavBar && <Navbar key="navbar" />}
      {showNonCoverComponent && !environment.disableHero && (
        <Hero key="hero" ref={heroRef} />
      )}
      {showNonCoverComponent && (
        <div
          key="layout-container"
          className="root-layout-container drill-mouse-hover"
          hidden={showCover}
        >
          <div className="drill-mouse-hover">
            <Header />
            <main className="mt-g1 drill-mouse-hover">{children}</main>
          </div>
        </div>
      )}
      {showNonCoverComponent &&
        (environment.disableCover ? true : !showCover) && (
          <BackgroundGrid key="grid" />
        )}
    </AnimatePresence>
  );
}
