"use client";

// React
import { useEffect, useState } from "react";

// Third-Party
import { AnimatePresence } from "motion/react";

// Project
import { Cover } from "@/components/layout/cover";
import { Spinner } from "@/components/layout/spinner";
import { toBool } from "@/lib";

export function CoverWrapper({
  renderPageAfter = 0,
  clearClothAfter = 3500,
  children,
}: {
  renderPageAfter: number;
  clearClothAfter: number;
  children: React.ReactNode;
}) {
  const [showCover, setShowCover] = useState(true);
  const disableCover = toBool(process.env.NEXT_PUBLIC_DISABLE_COVER);
  const [showPage, setShowPage] = useState(
    renderPageAfter === 0 ? true : false,
  );

  useEffect(() => {
    if (disableCover) {
      setShowPage(true);
      return;
    }
    const timeouts: Array<NodeJS.Timeout> = [
      setTimeout(() => {
        setShowPage(true);
      }, renderPageAfter),

      setTimeout(() => {
        setShowCover(false);
      }, clearClothAfter),
    ];

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <AnimatePresence>
      {!disableCover && showCover && <Cover key="cover" />}
      {showPage && <div key="page">{children}</div>}
    </AnimatePresence>
  );
}
