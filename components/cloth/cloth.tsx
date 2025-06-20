// Third-Party
import {
  MotionValue,
  motion,
  useAnimate,
  useInView,
  useSpring,
  useTime,
  useTransform,
  useVelocity,
} from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Third-Party - 3D
import {
  OrthographicCamera as DreiOrthographicCamera,
  Stats,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "three";

// Project
import { useCursor } from "@/components/cursor";
import cursorIconDark from "@/public/cursor-dark.svg";
import cursorIcon from "@/public/cursor.svg";
import { Size } from "@/types";
import { toBool } from "@/utils";

// Local
import { cursorAnimationConfig } from "./cursor-animation";
import { ParticleSystem } from "./particle-system";
import { PlayPrompt } from "./play-prompt";
import { Simulation } from "./simulation";

export function Cloth({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Particle system references.
  const particleSystemRef = useRef(new ParticleSystem());
  const particleSystem = particleSystemRef.current;

  // Cursor.
  const cursorContext = useCursor();

  // Theme.
  const { theme } = useTheme();

  // Gravity based on scroll.
  const time = useTime();
  const baseGravity = particleSystem.gravity;

  time.on("change", (t) => {
    const offset = toBool(process.env.NEXT_PUBLIC_DISABLE_COVER) ? 0 : 2000;
    t -= offset;

    if (t < 0) {
      return;
    }

    if (t > 8000) {
      // Destroy and clean up subscribers.
      time.destroy();
    }
    const amplitude = (5 * Math.max(7000 - t, 0)) / 7000;
    const frequency = 1 / 500;

    // Some lateral wind.
    particleSystem.setExtraGravity({
      x: amplitude * Math.sin(frequency * t),
      y: 0,
    });
  });

  // Vertical gravity.
  scrollYProgress.on("change", (v) => {
    particleSystem.setExtraGravity({ x: 0, y: 4 * (1 - v - 0.5) });
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const scrollScaledVelocity = useTransform(scrollVelocity, (mv) =>
    Math.abs(mv) > 1.2 ? Math.min(Math.max(mv * 2, -4), 4) : 0,
  );
  const scrollSpring = useSpring(scrollScaledVelocity, {
    damping: 4,
    stiffness: 200,
    mass: 1,
    restDelta: 0.001,
  });
  const gravityYDelta = scrollSpring;
  gravityYDelta.on("change", (delta) => {
    particleSystem.setGravity({ x: 0, y: baseGravity.y + delta });
  });

  const cameraRef = useRef<OrthographicCamera>(null);
  const initialWrapperSize = useRef<Size>({
    w: 0,
    h: 0,
  });

  useEffect(() => {
    if (canvasWrapperRef.current) {
      initialWrapperSize.current = {
        w: canvasWrapperRef.current.clientWidth,
        h: canvasWrapperRef.current.clientHeight,
      };
    }
  }, []);

  const [hasResized, setHasResized] = useState(false);

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      if (canvasWrapperRef.current) {
        // TODO: Instead of killing the animation completely handle the
        // resizing properly. At the moment to keep things simply the animation
        //
        // is destroyed and can be re-created by clicking the PlayPrompt.
        // particleSystem.onWindowResize({
        //   w: canvasWrapperRef.current.clientWidth,
        //   h: canvasWrapperRef.current.clientHeight,
        // });
        setCurtainsClosed(true);
        setHasResized(true);
        particleSystemRef.current.destroy();
        initialWrapperSize.current = {
          w: canvasWrapperRef.current.clientWidth,
          h: canvasWrapperRef.current.clientHeight,
        };
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [cursorIconRef, animate] = useAnimate();

  const clothInstructionPlaying = useRef(true);

  const [showCursorIcon, setShowCursorIcon] = useState(true);

  useEffect(() => {
    const containerHeight = canvasWrapperRef.current?.clientHeight || 0;
    const pickFrom = containerHeight > 550 ? -0.1971 : -0.0671;
    if (cursorIconRef.current) {
      animate(
        [
          [
            cursorIconRef.current,
            { x: 0, y: pickFrom * containerHeight, rotateZ: 10, scale: 1.3 },
            { duration: 0.75 },
          ],
          [
            cursorIconRef.current,
            { x: 0, y: pickFrom * containerHeight, rotateZ: 0, scale: 0.8 },
            { duration: 0.15 },
          ],
          [
            cursorIconRef.current,
            { x: 0, y: pickFrom * containerHeight, rotateZ: 0, scale: 0.8 },
            { duration: 0.7 },
          ],
          [
            cursorIconRef.current,
            { x: 200, y: -0.3942 * containerHeight, rotateZ: -20 },
            { duration: 1 },
          ],
          [
            cursorIconRef.current,
            { x: -240, y: -0.5256 * containerHeight, rotateZ: 30 },
            { duration: 1.5 },
          ],
          [
            cursorIconRef.current,
            { x: 120, y: -0.657 * containerHeight, rotateZ: -45 },
            { duration: 0.2 },
          ],
          [
            cursorIconRef.current,
            { x: 120, y: -0.657 * containerHeight, rotateZ: -45 },
            { duration: 0.75 },
          ],
          [
            cursorIconRef.current,
            { x: 120, y: -0.657 * containerHeight, rotateZ: -45, scale: 1.3 },
            { duration: 0.15 },
          ],
          [
            cursorIconRef.current,
            { x: 0, y: 0.1971 * containerHeight, rotateZ: 360 },
            { duration: 1 },
          ],
        ],
        {
          defaultTransition: {
            delay: toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
              ? cursorAnimationConfig.delayOffset
              : cursorAnimationConfig.delayOffset + 1.5,
            ease: "easeInOut",
          },
        },
      ).then(() => {
        setShowCursorIcon(false);
      });
    }
  }, []);

  useEffect(() => {
    const offsetX = 23;
    const offsetY = -197;
    const timeout = setTimeout(() => {
      let i = 0;

      onMouseDown(
        cursorIconRef.current!.getBoundingClientRect().x + offsetX,
        cursorIconRef.current!.getBoundingClientRect().y + offsetY,
        0,
      );

      const interval = setInterval(() => {
        if (i > cursorAnimationConfig.pressingCycles) {
          clothInstructionPlaying.current = false;
          clearInterval(interval);
          onMouseUp();
        }
        particleSystemRef.current?.empty == false &&
          onMouseMove(
            cursorIconRef.current!.getBoundingClientRect().x + offsetX,
            cursorIconRef.current!.getBoundingClientRect().y + offsetY,
          );
        i = i + 1;
      }, cursorAnimationConfig.pressingIntervalSize);
    }, cursorAnimationConfig.pressingStart);
    return () => clearTimeout(timeout);
  }, []);

  const onMouseDown = (offsetX: number, offsetY: number, button: number) => {
    cursorContext?.setCursorSize(0.6);

    let x = offsetX;
    let y = offsetY;

    if (cameraRef.current) {
      x += cameraRef.current.position.x;
      y -= cameraRef.current.position.y;
    }

    // Factor this out, it's being repeated in onMouseDown
    if (initialWrapperSize.current && canvasWrapperRef.current) {
      x -=
        (canvasWrapperRef.current.clientWidth - initialWrapperSize.current.w) /
        2;
    }
    particleSystem.onMouseDown(x, y, button);
  };

  const onMouseMove = (offsetX: number, offsetY: number) => {
    if (!particleSystem.clickCon.active) {
      return;
    }

    let x = offsetX;
    let y = offsetY;

    if (cameraRef.current) {
      x += cameraRef.current.position.x;
      y -= cameraRef.current.position.y;
    }

    // Factor this out, it's being repeated in onMouseDown
    if (initialWrapperSize.current && canvasWrapperRef.current) {
      x -=
        (canvasWrapperRef.current.clientWidth - initialWrapperSize.current.w) /
        2;
    }
    particleSystem.onMouseMove(x, y);
  };

  const onMouseUp = () => {
    cursorContext?.setCursorSize(1);
    particleSystem.onMouseUp();
  };

  // -- Logic to kill WebGL to save up resources when not in view.
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(canvasWrapperRef);
  const previousInView = useRef<boolean | null>(null);
  const hasNavigatedAway = useRef(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const playPromptClicked = useRef(false);

  const [curtainsClosed, setCurtainsClosed] = useState(false);

  useEffect(() => {
    if (inView === false && previousInView.current === true) {
      hasNavigatedAway.current = true;
    }
    if (
      inView === false &&
      hasNavigatedAway.current === true &&
      showPlayPrompt === false
    ) {
      playPromptClicked.current = true;
      setShowPlayPrompt(true);
      setCurtainsClosed(true);
      particleSystemRef.current.destroy();
    }
    previousInView.current = inView;
  }, [inView]);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Cloth] Rendering");
  }

  return (
    <div className="relative w-full h-full bg-back" ref={canvasWrapperRef}>
      {/* https://blog.noelcserepy.com/creating-keyframe-animations-with-framer-motion */}
      {showCursorIcon && (
        <motion.div
          ref={cursorIconRef}
          className="absolute z-100 top-[calc(100%-15px)] left-[calc(50%-35px)] pointer-events-none"
          initial={{ y: -1000 }}
        >
          {theme === "dark" ? (
            <Image width={100} src={cursorIconDark} alt="Cursor" />
          ) : (
            <Image width={100} src={cursorIcon} alt="Cursor" />
          )}
        </motion.div>
      )}

      {showPlayPrompt && (
        <PlayPrompt
          onClick={() => {
            playPromptClicked.current = true;
            setHasResized(false);
            setShowPlayPrompt(false);
            setCurtainsClosed(false);
          }}
        />
      )}

      <Curtains
        playPromptClicked={playPromptClicked.current}
        hasResized={hasResized}
        curtainsClosed={curtainsClosed}
        afterCurtainsClosed={() => {
          setShowPlayPrompt(true);
        }}
      />

      {!showPlayPrompt && (
        <Canvas
          className="select-none touch-none"
          onPointerDown={(e) =>
            clothInstructionPlaying.current === false &&
            onMouseDown(
              e.nativeEvent.offsetX,
              e.nativeEvent.offsetY,
              e.nativeEvent.button,
            )
          }
          onPointerMove={(e) =>
            clothInstructionPlaying.current === false &&
            onMouseMove(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
          }
          onPointerUp={(e) =>
            clothInstructionPlaying.current === false && onMouseUp()
          }
        >
          <DreiOrthographicCamera ref={cameraRef} makeDefault />
          {toBool(process.env.NEXT_PUBLIC_DEBUG) && <Stats />}
          <Simulation particleSystemRef={particleSystemRef} />
        </Canvas>
      )}
    </div>
  );
}

function Curtains({
  playPromptClicked,
  hasResized,
  curtainsClosed,
  afterCurtainsClosed,
}: {
  playPromptClicked: boolean;
  hasResized: boolean;
  curtainsClosed: boolean;
  afterCurtainsClosed: Function;
}) {
  const delay = toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
    ? 1.2
    : playPromptClicked
      ? 0.25
      : hasResized
        ? 1
        : 2.9;

  return (
    <>
      <motion.div
        className="absolute left-0 w-1/2 h-full bg-fore z-10"
        initial="visible"
        animate={curtainsClosed ? "visible" : "hidden"}
        variants={{
          visible: { x: 0 },
          hidden: { x: "-100%" },
        }}
        transition={{
          delay: delay,
          duration: 1,
        }}
        onAnimationComplete={() => {
          curtainsClosed && afterCurtainsClosed();
        }}
      ></motion.div>
      <motion.div
        className="absolute right-0 w-1/2 h-full bg-fore z-10"
        initial="visible"
        animate={curtainsClosed ? "visible" : "hidden"}
        variants={{
          visible: { x: 0 },
          hidden: { x: "100%" },
        }}
        transition={{
          delay: delay,
          duration: 1,
        }}
      ></motion.div>
    </>
  );
}
