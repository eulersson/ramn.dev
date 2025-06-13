"use client";

// Third-Party
import { AnimatePresence } from "motion/react";
import { ForwardedRef, useEffect, useState } from "react";

// Project
import { Header } from "@/components/header";
import { BackgroundGrid } from "@/components/layout/background-grid";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { toBool } from "@/utils";

export function PageWrapper({
  children,
  heroRef,
}: {
  children: React.ReactNode;
  heroRef: ForwardedRef<HTMLHeadingElement>;
}) {
  const [showNavBar, setShowNavBar] = useState(false);

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

  const [correctHeaderNavbarUpperSpace, setCorrectHeaderNavbarUpperSpace] =
    useState(false);

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
            setCorrectHeaderNavbarUpperSpace(!enter);
          }}
        />
      )}
      <div
        key="layout-container"
        className="absolute w-full flex justify-center"
      >
        <div className="w-g40y lg:w-g40y xl:w-g40y">
          <Header correctNavbarUpperSpace={correctHeaderNavbarUpperSpace} />
          <div className="pt-ggpn">
            <main className="-mt-ggpn">{children}</main>
          </div>
        </div>
      </div>
      <BackgroundGrid key="grid" />
    </AnimatePresence>
  );
}
