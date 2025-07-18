"use client";

// React
import { useState } from "react";

// Next.js
import Image from "next/image";

// Project
import { CursorSize } from "@/components/cursor";
import { cn } from "@/lib";

const zoomClasses = "fixed z-70 inset-0 bg-black/80 overflow-scroll";

export const Gallery = ({
  images,
  className,
  gridClassName = "h-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  zoomClassName = "h-full grid-cols-1 sm:grid-cols-2",
}: {
  images: string[];
  className?: string;
  gridClassName?: string;
  zoomClassName?: string;
}) => {
  const [zoom, setZoom] = useState(false);
  return (
    <div
      className={cn(
        "group/zoom-container",
        zoom && "is-zoomed",
        zoom ? zoomClasses : "h-full",
      )}
    >
      <div
        onClick={() => setZoom(!zoom)}
        className={cn(
          `gap-ggpn grid transition-all hover:opacity-100`,
          className,
          zoom ? zoomClassName : `${gridClassName} hover:scale-110`,
        )}
      >
        {images.map((src) => (
          <div key={src} className="relative">
            <CursorSize className="h-full" sizeOnHover={zoom ? 4 : 0.4}>
              <Image
                onLoad={(event) =>
                  event.currentTarget.classList.remove("opacity-0")
                }
                className="opacity-0 transition-opacity duration-1000"
                fill
                objectFit={zoom ? "contain" : "cover"}
                alt=""
                src={src}
              />
            </CursorSize>
          </div>
        ))}
      </div>
    </div>
  );
};
