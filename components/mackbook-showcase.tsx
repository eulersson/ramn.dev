"use client";

// React
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Third-Party
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Project
import { CursorSize } from "@/components/cursor";
import { cn } from "@/lib";

const MacBookShowcase = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const macbookRef = useRef<HTMLDivElement>(null);

  // Auto-cycle through images (only when not hovering and not in fullscreen)
  useEffect(() => {
    if (!isHovering && !isFullscreen) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, isFullscreen, images.length]);

  const nextScreen = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevScreen = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Handle mouse move to determine which screen to show
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (macbookRef.current) {
      const rect = macbookRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const relativeX = x / width;

      // Calculate which screen to show based on mouse position
      const screenIndex = Math.floor(relativeX * images.length);
      const clampedIndex = Math.max(
        0,
        Math.min(screenIndex, images.length - 1),
      );

      setHoverIndex(clampedIndex);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Handle keyboard navigation in fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "ArrowLeft") {
          prevScreen();
        } else if (e.key === "ArrowRight") {
          nextScreen();
        } else if (e.key === "Escape") {
          closeFullscreen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Determine which screen to display
  const displayIndex = isHovering ? hoverIndex : currentIndex;

  return (
    <>
      {/* Main MacBook Mockup */}
      <motion.div
        className={cn("flex items-center justify-center md:p-8", className)}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{
          duration: 1,
          times: [0, 0.5, 1],
          ease: "easeInOut",
        }}
      >
        <div
          ref={macbookRef}
          className="relative transform cursor-pointer transition-transform duration-300 hover:scale-110"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={openFullscreen}
        >
          {/* MacBook Mockup Image */}
          <div className="relative">
            <img
              src="/macbook-mockup.png"
              alt="MacBook Mockup"
              className="h-auto w-full max-w-4xl"
            />

            {/* Screen overlay positioned within the MacBook */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: "11.97%", // 453 / 3784 * 100
                top: "6.13%", // 134 / 2187 * 100
                width: "76.14%", // (3334 - 453) / 3784 * 100
                height: "82.47%", // (1935 - 134) / 2187 * 100
              }}
            >
              <img
                src={images[displayIndex]}
                alt={`Screen ${displayIndex + 1}`}
                className="object-fit h-full w-full"
              />
            </div>

            {/* Screen indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === displayIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black">
          {/* Close button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-10 text-white transition-colors hover:text-gray-300"
          >
            <X size={32} />
          </button>

          {/* Navigation arrows */}
          <CursorSize sizeOnHover={0.4}>
            <button
              onClick={prevScreen}
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 transform text-white transition-colors hover:text-gray-300"
            >
              <ChevronLeft size={48} />
            </button>
          </CursorSize>

          <CursorSize sizeOnHover={0.4}>
            <button
              onClick={nextScreen}
              className="absolute top-1/2 right-4 z-10 -translate-y-1/2 transform text-white transition-colors hover:text-gray-300"
            >
              <ChevronRight size={48} />
            </button>
          </CursorSize>

          <div
            className="pointer-events-auto fixed top-0 left-0 h-full w-[50vw]"
            onClick={prevScreen}
          ></div>

          <div
            className="pointer-events-auto fixed top-0 right-0 h-full w-[50vw]"
            onClick={nextScreen}
          ></div>

          {/* Fullscreen image */}
          <div className="flex h-full w-full items-center justify-center p-8">
            <img
              src={images[currentIndex]}
              alt={`Screen ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Fullscreen indicators */}
          <div className="absolute bottom-8 flex flex-wrap justify-center space-x-3">
            {images.map((_, i) => (
              <CursorSize key={i} sizeOnHover={0.4}>
                <button
                  onClick={() => setCurrentIndex(i)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              </CursorSize>
            ))}
          </div>

          {/* Screen counter */}
          <div className="absolute top-4 left-4 text-sm text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default MacBookShowcase;
