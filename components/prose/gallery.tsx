"use client";

// React
import { useState } from "react";

// Next.js
import Image from "next/image";

// Project
import { CursorSize } from "@/components/cursor";
import { cn } from "@/lib";

export const Gallery = ({
  images,
  opacity = "100",
  minH = "0px",
}: {
  images: string[];
  opacity?: string;
  minH?: string;
}) => {
  const [zoom, setZoom] = useState(false);

  const zoomClasses = "fixed z-60 inset-0 w-full h-full bg-black/80";

  return (
    <div
      onClick={() => setZoom(!zoom)}
      className={cn(
        `gap-ggpn grid min-h-[${minH}] h-full opacity-${opacity} transition-all hover:opacity-100`,
        zoom ? zoomClasses : "grid-cols-3 hover:scale-110",
      )}
    >
      {images.map((src) => (
        <div key={src} className="relative">
          <CursorSize className="h-full" sizeOnHover={zoom ? 4 : 0.4}>
            <Image
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
