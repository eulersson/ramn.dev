"use client";

// Project
import { Button } from "@/components/button";
import { CursorSize } from "@/components/cursor-size";
import { ThemedImage } from "@/components/themed-image";
import { useCursor } from "@/contexts/cursor";

// Environment
import environment from "@/environment";

export function Header() {
  const { cursorSize, setCursorSize } = useCursor();

  if (environment.printComponentRendering) {
    console.log("[Header] Rendering");
  }

  return (
    <div className="sticky top-0 h-g3 w-full flex justify-center z-10">
      <header className="w-[calc(4*var(--bg-grid-box-size)+2px)] border-2-fore bg-fore grid grid-cols-4 grid-rows-2 bg-back border-fore gap-[2px]">
        <div className="bg-back row-span-2 pt-[6px] pl-[14px]">
          <h1 className="font-title inline text-[44px] leading-[30px] select-none">
            Ramon Blanquer
          </h1>
        </div>
        <div className="bg-back col-span-1 flex gap-2 items-center justify-center">
          {/* https://github.com/pacocoursey/next-themes#images */}
          <CursorSize>
            <ThemedImage
              src="/github.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
            />
          </CursorSize>
          <CursorSize>
            <ThemedImage
              src="/linkedin.svg"
              alt="LinkedIn Logo"
              width={24}
              height={24}
            />
          </CursorSize>
          <CursorSize>
            <ThemedImage src="/x.svg" alt="X Logo" width={24} height={24} />
          </CursorSize>
        </div>
        <div className="bg-back col-span-1 flex items-center justify-center">
          <Button className="px-4">Resume / CV</Button>
        </div>
        <div className="bg-back row-start-2 col-start-2 col-span-2 flex items-center justify-center">
          <a
            className="font-mono text-[18px] underline hover:font-bold"
            href="mailto:blanquer.ramon@gmail.com"
            onMouseEnter={() => setCursorSize(0.4)}
            onMouseLeave={() => setCursorSize(1)}
          >
            blanquer.ramon@gmail.com
          </a>
        </div>
        <div className="bg-back row-start-1 col-start-4 row-span-2 col-span-1 flex items-center">
          <div className="leading-[20px] text-[15px] flex flex-col gap-[2px]">
            <div className="flex">
              <pre className="font-mono inline-block bg-fore text-back">
                from code to deployment;
              </pre>
            </div>
            <div className="flex">
              <pre className="font-mono inline-block bg-fore text-back">
                from back to front
                <span className="inline-block animate-blinky bg-fore text-back">
                  ;
                </span>
              </pre>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
