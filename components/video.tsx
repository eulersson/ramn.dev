"use client";

import { cn } from "@/lib";
import { useState } from "react";

const mockupSrc = "/iphone-14-mockup.webp";

export function Video({
  src,
  previewSrc,
  noPhoneOverlay,
}: {
  src: string;
  previewSrc: string;
  noPhoneOverlay: boolean;
}) {
  const [playSrc, setPlaySrc] = useState(previewSrc);
  const [showContinueWatching, setShowContinueWatching] = useState(false);

  return (
    <div className="xs:w-[300px] relative mx-auto my-2 w-[250px]">
      {/* Video absolutely positioned in the content area */}
      <video
        src={playSrc}
        autoPlay
        muted
        controls={false}
        playsInline
        onEnded={() => {
          if (playSrc === previewSrc) {
            setShowContinueWatching(true);
          }
        }}
        className="xs:p-[17px] h-full w-full rounded-[40px] object-cover p-[14px]"
      />
      {showContinueWatching && (
        <div className="xs:m-[12px] absolute inset-0 m-[4px] flex items-center justify-center rounded-[40px] bg-black/50">
          <button
            onClick={() => {
              setShowContinueWatching(false);
              setPlaySrc(src);
            }}
            className="rounded-lg bg-white px-4 py-2 font-medium text-black shadow-md transition hover:bg-gray-200"
          >
            Continue watching
          </button>
        </div>
      )}
      {/* Mockup overlays everything */}
      {!noPhoneOverlay && (
        <img
          src={mockupSrc}
          alt="Device mockup"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
          }}
          draggable={false}
        />
      )}
    </div>
  );
}
