"use client";

// Third-Party
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

// Project
import { Cover } from "@/components/layout/cover";
import { Spinner } from "@/components/layout/spinner";
import { toBool } from "@/utils";

export function CoverWrapper({ children }: { children: React.ReactNode }) {
  const [showCover, setShowCover] = useState(true);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    if (toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)) {
      setShowPage(true);
      return;
    }
    const timeouts: Array<NodeJS.Timeout> = [
      setTimeout(() => {
        setShowPage(true);
      }, 3500),
      setTimeout(() => {
        setShowCover(false);
      }, 4000),
    ];
    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);
  return (
    <AnimatePresence>
      {!showCover && !showPage && <Spinner key="spinner" />}
      {showCover && <Cover key="cover" />}
      {showPage && <div key="page">{children}</div>}
    </AnimatePresence>
  );
}
