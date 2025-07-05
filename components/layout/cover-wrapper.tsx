"use client";

// React
import { useEffect, useState } from "react";

// Third-Party
import { AnimatePresence } from "motion/react";

// Project
import { Cover } from "@/components/layout/cover";
import { Spinner } from "@/components/layout/spinner";
import { toBool } from "@/lib";

export function CoverWrapper({ children }: { children: React.ReactNode }) {
  const [showCover, setShowCover] = useState(true);
  const disableCover = toBool(process.env.NEXT_PUBLIC_DISABLE_COVER);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    if (disableCover) {
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
      {!disableCover && !showCover && !showPage && <Spinner key="spinner" />}
      {!disableCover && showCover && <Cover key="cover" />}
      {showPage && <div key="page">{children}</div>}
    </AnimatePresence>
  );
}
