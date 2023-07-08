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
  const showCover = false;
  // const [showCover, setShowCover] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowCover(false);
  //   }, 2000);
  // }, []);
  const [activeSection, setActiveSection] = useState("home");
  const [numb, setNumb] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumb(numb >= 3 ? 0 : numb + 1);
      console.log(numb);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [numb]);

  return (
    <AnimatePresence>
      {showCover && <Cover key="cover" />}
      {!showCover && <Navbar key="navbar" activeSection={["home", "about", "experience", "projects"][numb]} />}
      <Hero key="hero" />
      {!showCover && (
        <div key="layout-container" className="root-layout-container">
          <div>
            <Header />
            <main className="md:mt-[2px] lg:mt-[27px]">{children}</main>
          </div>
        </div>
      )}
      {!showCover && <BGGrid key="grid" />}
    </AnimatePresence>
  );
}
