// React
import {
  FunctionComponent,
  MouseEventHandler,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Next.js
import Image from "next/image";

// Third-Party
import { BufferAttribute, DynamicDrawUsage, OrthographicCamera } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrthographicCamera as DreiOrthographicCamera,
  Stats,
} from "@react-three/drei";
import {
  MotionValue,
  motion,
  useInView,
  useSpring,
  useTime,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useTheme } from "next-themes";

// Project
import { GridDimensions, Size } from "@/types";
import { CursorSize } from "@/components/cursor-size";
import { ParticleSystem } from "@/components/cloth/particle-system";
import cursorIcon from "@/public/cursor.svg";
import cursorIconDark from "@/public/cursor-dark.svg";
import { useCursor } from "@/contexts/cursor";

// Project - Local
import { cursorAnimationConfig } from "./cursor-animation";

// Environment
import environment from "@/environment";

const Replay: FunctionComponent<{
  onClick: MouseEventHandler;
}> = ({ onClick }) => {
  const { theme } = useTheme();
  return (
    <div className="bg-fore text-back w-full h-full flex items-center justify-center">
      <CursorSize sizeOnHover={8}>
        <div
          onClick={onClick}
          className="relative p-[5px] transition-transform duration-1000 ease-in-out hover:rotate-90 hover:scale-50"
        >
          {/* Grid */}
          <div
            className="w-[300px] h-[300px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(var(--col-back) 0 2px, transparent 1px 100%), repeating-linear-gradient(90deg, var(--col-back) 0 1px, transparent 2px 100%)",
              backgroundSize: "59.75px 59.75px",
            }}
          ></div>
          {/* Dots */}
          <div
            className="absolute inset-0"
            style={{
              display: "grid",
              gridTemplateRows: "repeat(6, 10px)",
              gridTemplateColumns: "repeat(6, 10px)",
              justifyContent: "space-between",
              alignContent: "space-between",
            }}
          >
            {[...Array(36)].map((_, i) => (
              <div key={i} className="bg-back"></div>
            ))}
          </div>
        </div>
      </CursorSize>
      {/* Cursor */}
      <div className="absolute pointer-events-none rotate-180 translate-x-3 translate-y-14">
        <div className="animate-bounce">
          <div className="rotate-180">
            {theme === "dark" ? (
              <Image width={40} src={cursorIconDark} alt="Cursor" />
            ) : (
              <Image width={80} src={cursorIcon} alt="Cursor" />
            )}
          </div>
        </div>
      </div>
      {/* Pinging Sphere */}
      <motion.div className="absolute pointer-events-none">
        <div className="absolute -ml-[8px] -mt-[8px]">
          <div className="absolute rounded-full w-[16px] h-[16px] bg-back"></div>
          <div className="absolute animate-ping rounded-full w-[16px] h-[16px] bg-back"></div>
        </div>
      </motion.div>
    </div>
  );
};

const Simulation: FunctionComponent<{
  particleSystemRef: MutableRefObject<ParticleSystem>;
  delayOffset?: number;
}> = ({ particleSystemRef, delayOffset }) => {
  const { camera, raycaster, size } = useThree();

  camera.position.setX(0);
  camera.position.setY(0);
  camera.position.setZ(500);

  useEffect(() => {
    camera.position.setX(particleSystem.approximateHalfClothWidth);
    camera.position.setY(-size.height / 2);
  }, [camera, size]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        camera.position.setX(camera.position.x - 5);
      } else if (e.key === "ArrowRight") {
        camera.position.setX(camera.position.x + 5);
      } else if (e.key === "ArrowDown") {
        camera.position.setY(camera.position.y - 5);
      } else if (e.key === "ArrowUp") {
        camera.position.setY(camera.position.y + 5);
      } else if (e.key === "o") {
        camera.position.setZ(camera.position.z - 5);
      } else if (e.key === "i") {
        camera.position.setZ(camera.position.z + 5);
      } else if (e.key === "j") {
        particleSystem.decrementGravity();
      } else if (e.key === "k") {
        particleSystem.incrementGravity();
      }
    });
  }, []);

  if (raycaster.params.Points) {
    raycaster.params.Points.threshold = 5;
  }

  const linesPositionsRef = useRef<BufferAttribute>(null);
  const linesIndicesRef = useRef<BufferAttribute>(null);
  const pointsPositionsRef = useRef<BufferAttribute>(null);

  const clothGridDimensions: GridDimensions = useMemo(
    () => ({ rows: 20, cols: 40 }),
    []
  );

  const pointsData = new Float32Array(
    Array(clothGridDimensions.rows * clothGridDimensions.cols * 3).fill(0)
  );

  const numLineConstraints =
    clothGridDimensions.cols * (clothGridDimensions.rows - 1) +
    (clothGridDimensions.cols - 1) * clothGridDimensions.rows;
  const constraintsData = new Uint16Array(
    Array(numLineConstraints * 2).fill(0)
  );

  const particleSystem = particleSystemRef.current;

  useLayoutEffect(() => {
    if (particleSystem.empty) {
      particleSystem.populate(
        { w: size.width, h: size.height },
        clothGridDimensions
      );
    }
  }, [particleSystem, size, clothGridDimensions]);

  useFrame((state, delta) => {
    particleSystem.step();
    pointsData.set(particleSystem.getPoints());
    constraintsData.set(particleSystem.getConstraints());

    if (pointsPositionsRef.current) {
      pointsPositionsRef.current.needsUpdate = true;
    }
    if (linesPositionsRef.current) {
      linesPositionsRef.current.needsUpdate = true;
    }
    if (linesIndicesRef.current) {
      linesIndicesRef.current.needsUpdate = true;
    }
  });

  if (environment.printComponentRendering) {
    console.log("[Cloth] Rendering");
  }

  const { theme, setTheme } = useTheme();
  const col = theme === "dark" ? 0x94a3b8 : 0x111827;

  return (
    <>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            ref={linesIndicesRef}
            array={constraintsData}
            attach="index"
            count={constraintsData.length}
            itemSize={1}
            usage={DynamicDrawUsage}
          />
          <bufferAttribute
            ref={linesPositionsRef}
            attach="attributes-position"
            array={pointsData}
            count={clothGridDimensions.rows * clothGridDimensions.cols}
            itemSize={3}
            usage={DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial color={col} linewidth={1} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={pointsPositionsRef}
            attach="attributes-position"
            array={pointsData}
            count={clothGridDimensions.rows * clothGridDimensions.cols}
            itemSize={3}
            usage={DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial color={col} size={5} sizeAttenuation={false} />
      </points>
    </>
  );
};

export const Cloth: FunctionComponent<{
  scrollYProgress: MotionValue<number>;
  delayOffset?: number;
}> = ({ scrollYProgress, delayOffset = 0 }) => {
  // Particle system references.
  const particleSystemRef = useRef(new ParticleSystem());
  const particleSystem = particleSystemRef.current;

  // Cursor.
  const { setCursorSize } = useCursor();

  // Theme.
  const { theme, setTheme } = useTheme();

  // Gravity based on scroll.
  const time = useTime();
  const baseGravity = particleSystem.gravity;

  time.on("change", (t) => {
    const offset = environment.disableCover ? 0 : 2000;
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
    Math.abs(mv) > 0.3 ? Math.min(Math.max(mv * 2, -4), 4) : 0
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

  // Needed width and height deltas on resize for mouse collision calculation.
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const inView = useInView(canvasWrapperRef);
  const previousInView = useRef<boolean>(inView);
  const [navigatedAway, setNavigatedAway] = useState(false);

  useEffect(() => {
    if (inView === false && previousInView.current === true) {
      setNavigatedAway(true);
    }
    previousInView.current = inView;
  }, [inView]);

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

  if (environment.printComponentRendering) {
    console.log("[Cloth] Rendering");
  }

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      if (canvasWrapperRef.current) {
        particleSystem.onWindowResize({
          w: canvasWrapperRef.current.clientWidth,
          h: canvasWrapperRef.current.clientHeight,
        });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const cursorIconRef = useRef<HTMLDivElement>(null);

  const clothInstructionPlaying = useRef(true);

  useEffect(() => {
    const offsetX = 23;
    const offsetY = -197;
    const timeout = setTimeout(() => {
      let i = 0;

      onMouseDown(
        cursorIconRef.current!.getBoundingClientRect().x + offsetX,
        cursorIconRef.current!.getBoundingClientRect().y + offsetY,
        0
      );

      const interval = setInterval(() => {
        if (i > cursorAnimationConfig.pressingCycles) {
          clothInstructionPlaying.current = false;
          clearInterval(interval);
          onMouseUp();
        }
        onMouseMove(
          cursorIconRef.current!.getBoundingClientRect().x + offsetX,
          cursorIconRef.current!.getBoundingClientRect().y + offsetY
        );
        i = i + 1;
      }, cursorAnimationConfig.pressingIntervalSize);
    }, cursorAnimationConfig.pressingStart + delayOffset);
    return () => clearTimeout(timeout);
  }, []);

  const onMouseDown = (offsetX: number, offsetY: number, button: number) => {
    setCursorSize(0.6);

    let x = offsetX;
    let y = offsetY;

    if (cameraRef.current) {
      x += cameraRef.current.position.x;
      y -= cameraRef.current.position.y;
    }

    // Factor this out, it's beign repeated in onMouseDown
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

    // Factor this out, it's beign repeated in onMouseDown
    if (initialWrapperSize.current && canvasWrapperRef.current) {
      x -=
        (canvasWrapperRef.current.clientWidth - initialWrapperSize.current.w) /
        2;
    }
    particleSystem.onMouseMove(x, y);
  };

  const onMouseUp = () => {
    setCursorSize(1);
    particleSystem.onMouseUp();
  };
  return (
    <div className="relative w-full h-full" ref={canvasWrapperRef}>
      {/* https://blog.noelcserepy.com/creatin  g-keyframe-animations-with-framer-motion */}
      <motion.div
        ref={cursorIconRef}
        className="absolute z-20 top-1/2 left-1/2 pointer-events-none"
        animate={{ ...cursorAnimationConfig.animate }}
        transition={{
          ...cursorAnimationConfig.transition,
          delay: cursorAnimationConfig.transition.delay + delayOffset,
        }}
      >
        {theme === "dark" ? (
          <Image width={100} src={cursorIconDark} alt="Cursor" />
        ) : (
          <Image width={100} src={cursorIcon} alt="Cursor" />
        )}
      </motion.div>
      {navigatedAway ? (
        <Replay onClick={() => setNavigatedAway(false)} />
      ) : (
        <Canvas
          onMouseDown={(e) =>
            clothInstructionPlaying.current === false &&
            onMouseDown(
              e.nativeEvent.offsetX,
              e.nativeEvent.offsetY,
              e.nativeEvent.button
            )
          }
          onMouseMove={(e) =>
            clothInstructionPlaying.current === false &&
            onMouseMove(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
          }
          onMouseUp={(e) =>
            clothInstructionPlaying.current === false && onMouseUp()
          }
        >
          <DreiOrthographicCamera ref={cameraRef} makeDefault />
          {environment.debug && <Stats />}
          <Simulation
            particleSystemRef={particleSystemRef}
            delayOffset={delayOffset}
          />
        </Canvas>
      )}
    </div>
  );
};
