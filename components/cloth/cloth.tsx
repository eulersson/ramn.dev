// React
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Third-Party
import { BufferAttribute, DynamicDrawUsage, OrthographicCamera } from "three";
import { Canvas, Size, useFrame, useThree } from "@react-three/fiber";
import {
  OrthographicCamera as DreiOrthographicCamera,
  Stats,
} from "@react-three/drei";

// Project
import { ParticleSystem } from "@/components/cloth/particle-system";

// Environment
import environment from "@/environment";
import { useCursor } from "@/contexts/cursor";

function Simulation({
  particleSystemRef,
  clothWidth,
  clothHeight,
}: {
  particleSystemRef: MutableRefObject<ParticleSystem>;
  clothWidth: number;
  clothHeight: number;
}) {
  const { camera, raycaster, size, viewport, gl } = useThree();

  camera.position.setX(0);
  camera.position.setY(0);
  camera.position.setZ(500);

  useEffect(() => {
    const aproximateClothWidth = clothWidth * 20; // TODO: Read the 20 from particleSystem.cWidth;
    const aproximateClothHeight = clothHeight * 20; // TODO: Read the 20 from particleSystem.cWidth;
    const sizeWidth = size.width;
    const sizeHeight = size.height;
    camera.position.setX(aproximateClothWidth / 2);
    camera.position.setY(-aproximateClothHeight / 2);
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

  const pointsData = new Float32Array(
    Array(clothWidth * clothHeight * 3).fill(0)
  );

  const numLineConstraints =
    clothWidth * (clothHeight - 1) + (clothWidth - 1) * clothHeight;
  const constraintsData = new Uint16Array(
    Array(numLineConstraints * 2).fill(0)
  );

  const particleSystem = particleSystemRef.current;

  useLayoutEffect(() => {
    if (particleSystem.empty) {
      particleSystem.populate(size.width, size.height, clothWidth, clothHeight);
    }
  }, [particleSystem, size, clothWidth, clothHeight]);

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

  console.log("[Cloth] Rendering");

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
            count={clothWidth * clothHeight}
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
            count={clothWidth * clothHeight}
            itemSize={3}
            usage={DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial color={0x00000} size={5} sizeAttenuation={false} />
      </points>
    </>
  );
}

export function Cloth() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const [clothWidth, clothHeight] = [40, 25];

  const particleSystemRef = useRef(new ParticleSystem());
  const particleSystem = particleSystemRef.current;

  if (environment.printComponentRendering) {
    console.log("[Cloth] Rendering");
  }

  const cameraRef = useRef<OrthographicCamera>(null);

  // Todo: Refactor into a size class or interface?
  const initialWrapperWidth = useRef<number>(0);
  const initialWrapperHeight = useRef<number>(0);

  useEffect(() => {
    if (canvasWrapperRef.current) {
      initialWrapperWidth.current = canvasWrapperRef.current.clientWidth;
      initialWrapperHeight.current = canvasWrapperRef.current.clientHeight;
    }
  }, []);

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      console.log(
        canvasWrapperRef.current?.clientWidth,
        canvasWrapperRef.current?.clientHeight
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [cursorSize, setCursorSize] = useCursor();

  return (
    <div className="w-full h-full" ref={canvasWrapperRef}>
      <Canvas
        onMouseDown={(e) => {
          setCursorSize(0.6);

          let x = e.nativeEvent.offsetX;
          let y = e.nativeEvent.offsetY;
          // TODO read from particle system instead of explicit 20
          // TODO: Avoid division
          x += (clothWidth * 20) / 2;
          y += (clothHeight * 20) / 2;

          // Factor this out, it's beign repeated in onMouseDown
          if (initialWrapperWidth.current && canvasWrapperRef.current) {
            x -=
              (canvasWrapperRef.current.clientWidth -
                initialWrapperWidth.current) /
              2;

            y -=
              (canvasWrapperRef.current.clientHeight -
                initialWrapperHeight.current) /
              2;
          }
          particleSystem.onMouseDown(x, y, e.button);
        }}
        onMouseMove={(e) => {
          let x = e.nativeEvent.offsetX;
          let y = e.nativeEvent.offsetY;
          // TODO read from particle system instead of explicit 20
          // TODO: Avoid division
          x += (clothWidth * 20) / 2;
          y += (clothHeight * 20) / 2;

          // Factor this out, it's beign repeated in onMouseDown
          if (initialWrapperWidth.current && canvasWrapperRef.current) {
            x -=
              (canvasWrapperRef.current.clientWidth -
                initialWrapperWidth.current) /
              2;

            y -=
              (canvasWrapperRef.current.clientHeight -
                initialWrapperHeight.current) /
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
        <Stats />
        <Simulation
          clothWidth={clothWidth}
          clothHeight={clothHeight}
          particleSystemRef={particleSystemRef}
        />
      </Canvas>
    </div>
  );
}
