"use client";

// React
import { ForwardedRef, useEffect, useRef, useState } from "react";

// Third-Party
import { AnimatePresence } from "framer-motion";

// Components
import { BackgroundGrid } from "@/components/layout/background-grid";
import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";
import { toBool } from "@/utils";

export function PageWrapper({
  children,
  heroRef,
}: {
  children: React.ReactNode;
  heroRef: ForwardedRef<HTMLHeadingElement>;
}) {
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    const setShowNavBarTimeout = setTimeout(() => {
      console.log(
        "[PageWrapper] Setting show nav bar to `true` (timeout 3000)."
      );
      setShowNavBar(true);
    }, 4800);

    return () => {
      clearTimeout(setShowNavBarTimeout);
    };
  }, []);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[PageWrapper] Rendering");
  }

  return (
    <AnimatePresence>
      {showNavBar && <Navbar key="navbar" />}
      {!toBool(process.env.NEXT_PUBLIC_DISABLE_HERO) && (
        <Hero key="hero" ref={heroRef} />
      )}
      <div
        key="layout-container"
        className="root-layout-container drill-mouse-hover"
      >
        <div className="drill-mouse-hover">
          <Header />
          <main className="mt-g1 drill-mouse-hover">{children}</main>
        </div>
      </div>
      <BackgroundGrid key="grid" />
    </AnimatePresence>
  );
}
