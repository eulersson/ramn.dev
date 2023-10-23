"use client";

// Third-Party
import { FunctionComponent, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

// Project
import { Cover } from "@/components/layout/cover";
import { Spinner } from "@/components/layout/spinner";
import { toBool } from "@/utils";

export const CoverWrapper: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showCover, setShowCover] = useState(false);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    if (toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)) {
      setShowPage(true);
      return;
    }
    const timeouts: Array<NodeJS.Timeout> = [
      setTimeout(() => {
        setShowCover(true);
      }, 1000),
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
};
