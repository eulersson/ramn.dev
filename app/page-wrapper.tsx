"use client";

// React
import { ForwardedRef, useEffect, useRef, useState } from "react";

// Third-Party
import { AnimatePresence } from "framer-motion";

// Components
import { BGGrid } from "@/components/layout/bg-grid";
import { Cover } from "@/components/layout/cover";
import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";

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
    setTimeout(() => {
      setShowCover(false);
    }, 2000);

    setTimeout(() => {
      setShowNavBar(true);
    }, 3000);
  }, []);

  return (
    <AnimatePresence>
      {showCover && <Cover key="cover" />}
      {showNavBar && <Navbar key="navbar" />}
      <Hero key="hero" ref={heroRef} />
      <div
        key="layout-container"
        className="root-layout-container"
        hidden={showCover}
      >
        <div>
          <Header />
          <main className="mt-g1">{children}</main>
        </div>
      </div>
      {!showCover && <BGGrid key="grid" />}
    </AnimatePresence>
  );
}
