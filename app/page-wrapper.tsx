"use client";

// React
import { useEffect, useState } from "react";

// Third-Party
import { AnimatePresence, motion } from "framer-motion";

// Components
import { BGGrid } from "@/components/layout/bg-grid";
import { Cover } from "@/components/layout/cover";
import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [showCover, setShowCover] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowCover(false);
    }, 2000);
  });

  return (
    <AnimatePresence>
      {showCover && <Cover key="cover" />}
      <Hero key="hero" />
      {!showCover && <Navbar key="navbar" />}
      {!showCover && (
        <div key="layout-container" className="root-layout-container">
          <div>
            <Header />
            <main className="mt-g2">{children}</main>
          </div>
        </div>
      )}
      {!showCover && <BGGrid key="grid" />}
    </AnimatePresence>
  );
}
