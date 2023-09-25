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
  const [showCover, setShowCover] = useState(true);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    const setCoverTimeout = setTimeout(() => {
      console.log("[PageWrapper] Setting cover to off (timeout 2000).")
      setShowCover(false);
    }, 2000);

    const setShowNavBarTimeout = setTimeout(() => {
      console.log("[PageWrapper] Setting show nav bar to on (timeout 3000).")
      setShowNavBar(true);
    }, 3000);

    return () => {
      clearTimeout(setCoverTimeout);
      clearTimeout(setShowNavBarTimeout);
    }
  }, []);

  if (environment.printComponentRendering) {
    console.log("[PageWrapper] Rendering");
  }

  return (
    <AnimatePresence>
      {!environment.disableCover && showCover && <Cover key="cover" />}
      {showNavBar && <Navbar key="navbar" />}
      {!environment.disableHero && <Hero key="hero" ref={heroRef} />}
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
      {!showCover && <BackgroundGrid key="grid" />}
    </AnimatePresence>
  );
}
