"use client";

// Third-Party
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

// Project
import { CursorSize } from "@/components/cursor";
import ThemedImage from "@/components/themed-image";
import { cn } from "@/lib";

export type LogoRef = {
  spin: Function;
};

const Logo = forwardRef<LogoRef, { logoUrl: string; className?: string }>(
  function Logo({ logoUrl, className }, ref) {
    // Logo animations.
    const logoRef = useRef(null);
    const logoInView = useInView(logoRef);
    const logoRotateY = useMotionValue(0);
    const logoRotateYSpring = useSpring(logoRotateY, {
      mass: 3,
      stiffness: 100,
      damping: 8,
    });

    // Call this function every time you want the job's company logo to spin.
    const spinLogo = useCallback(() => {
      logoRotateY.set(logoRotateY.get() === 360 ? 0 : 360);
    }, []);

    useImperativeHandle(ref, () => {
      return {
        spin() {
          spinLogo();
        },
      };
    }, []);

    // Spin the logo when it shows on screen.
    useEffect(() => {
      if (logoInView) {
        spinLogo();
      }
    }, [logoInView]);

    return (
      <CursorSize sizeOnHover={8}>
        <div
          className={cn(
            "min-h-[calc(var(--bg-grid-box-size)-2px)]",
            "flex flex-col items-center justify-center",
            className,
          )}
          ref={logoRef}
          onMouseEnter={() => {
            spinLogo();
          }}
          onMouseLeave={() => {
            spinLogo();
          }}
        >
          <motion.div style={{ rotateY: logoRotateYSpring }}>
            <ThemedImage src={logoUrl} alt="Logo" width={200} height={200} />
          </motion.div>
        </div>
      </CursorSize>
    );
  },
);

export { Logo };
