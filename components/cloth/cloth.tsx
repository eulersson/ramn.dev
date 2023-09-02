// React
import {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

// Third-Party
import { BufferAttribute, DynamicDrawUsage, OrthographicCamera } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrthographicCamera as DreiOrthographicCamera,
  Stats,
} from "@react-three/drei";
import {
  MotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

// Project
import { GridDimensions, Size } from "@/types";
import { ParticleSystem } from "@/components/cloth/particle-system";

// Environment
import environment from "@/environment";
import { useCursor } from "@/contexts/cursor";

export const Simulation: FunctionComponent<{
  particleSystemRef: MutableRefObject<ParticleSystem>;
}> = ({ particleSystemRef }) => {
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
        <lineBasicMaterial color={0x000000} linewidth={1} />
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
        <pointsMaterial color={0x00000} size={5} sizeAttenuation={false} />
      </points>
    </>
  );
};

export const Cloth: FunctionComponent<{
  scrollYProgress: MotionValue<number>;
}> = ({ scrollYProgress }) => {
  // Particle system references.
  const particleSystemRef = useRef(new ParticleSystem());
  const particleSystem = particleSystemRef.current;

  // Cursor.
  const [cursorSize, setCursorSize] = useCursor();

  // Gravity based on scroll.
  const baseGravity = particleSystem.gravity;
  const scrollVelocity = useVelocity(scrollYProgress);
  const scrollScaledVelocity = useTransform(scrollVelocity, (mv) =>
    Math.max(-Math.abs(mv) * 5, -8)
  );
  scrollScaledVelocity.on("change", (v) => {
    console.log(v);
  });
  const scrollSpring = useSpring(scrollScaledVelocity, {
    damping: 6,
    stiffness: 200,
    mass: 2,
  });
  const gravityYDelta = scrollSpring;
  gravityYDelta.on("change", (delta) => {
    particleSystem.setGravity({ x: 0, y: baseGravity + delta });
  });

  // Needed width and height deltas on resize for mouse collision calculation.
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="w-full h-full" ref={canvasWrapperRef}>
      <Canvas
        onMouseDown={(e) => {
          setCursorSize(0.6);

          let x = e.nativeEvent.offsetX;
          let y = e.nativeEvent.offsetY;

          if (cameraRef.current) {
            x += cameraRef.current.position.x;
            y -= cameraRef.current.position.y;
          }

          // Factor this out, it's beign repeated in onMouseDown
          if (initialWrapperSize.current && canvasWrapperRef.current) {
            x -=
              (canvasWrapperRef.current.clientWidth -
                initialWrapperSize.current.w) /
              2;
          }
          particleSystem.onMouseDown(x, y, e.button);
        }}
        onMouseMove={(e) => {
          if (!particleSystem.clickCon.active) {
            return;
          }

          let x = e.nativeEvent.offsetX;
          let y = e.nativeEvent.offsetY;

          if (cameraRef.current) {
            x += cameraRef.current.position.x;
            y -= cameraRef.current.position.y;
          }

          // Factor this out, it's beign repeated in onMouseDown
          if (initialWrapperSize.current && canvasWrapperRef.current) {
            x -=
              (canvasWrapperRef.current.clientWidth -
                initialWrapperSize.current.w) /
              2;
          }
          particleSystem.onMouseMove(x, y);
        }}
        onMouseUp={() => {
          setCursorSize(1);
          particleSystem.onMouseUp();
        }}
      >
        <DreiOrthographicCamera ref={cameraRef} makeDefault />
        {environment.debug && <Stats />}
        <Simulation particleSystemRef={particleSystemRef} />
      </Canvas>
    </div>
  );
};
