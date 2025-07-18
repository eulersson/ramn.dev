"use client";

// React
import { useState } from "react";

// Next.js
import Image from "next/image";

// Project
import { CursorSize } from "@/components/cursor";
import { cn } from "@/lib";

const zoomClasses = "fixed z-70 inset-0 w-full h-full bg-black/80";

export const Gallery = ({
  images,
  className,
  gridClassName = "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  zoomClassName = "grid-cols-1 sm:grid-cols-2",
}: {
  images: string[];
  className?: string;
  gridClassName?: string;
  zoomClassName?: string;
}) => {
  const [zoom, setZoom] = useState(false);
  return (
    <div
      onClick={() => setZoom(!zoom)}
      className={cn(
        `gap-ggpn grid h-full transition-all hover:opacity-100`,
        className,
        zoom
          ? cn(zoomClasses, zoomClassName)
          : `${gridClassName} hover:scale-110`,
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
  );
};
