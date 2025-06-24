// React
import { RefObject, useEffect, useLayoutEffect, useMemo, useRef } from "react";

// Next.js
import { useTheme } from "next-themes";

// Project - 3D
import { useFrame, useThree } from "@react-three/fiber";
import { BufferAttribute, DynamicDrawUsage } from "three";

// Project
import { toBool } from "@/lib";
import { GridDimensions } from "@/types";

// Local
import { ParticleSystem } from "./particle-system";

export function Simulation({
  particleSystemRef,
}: {
  particleSystemRef: RefObject<ParticleSystem>;
}) {
  const { camera, raycaster, size } = useThree();

  camera.position.setX(0);
  camera.position.setY(0);
  camera.position.setZ(500);

  useEffect(() => {
    camera.position.setX(particleSystem.approximateHalfClothWidth);
    camera.position.setY(-size.height / 2);
  }, [camera, size]);

  if (raycaster.params.Points) {
    raycaster.params.Points.threshold = 5;
  }

  const linesPositionsRef = useRef<BufferAttribute>(null);
  const linesIndicesRef = useRef<BufferAttribute>(null);
  const pointsPositionsRef = useRef<BufferAttribute>(null);

  const clothGridDimensions: GridDimensions = useMemo(
    () => ({ rows: 20, cols: 40 }),
    [],
  );

  const pointsData = new Float32Array(
    Array(clothGridDimensions.rows * clothGridDimensions.cols * 3).fill(0),
  );

  const numLineConstraints =
    clothGridDimensions.cols * (clothGridDimensions.rows - 1) +
    (clothGridDimensions.cols - 1) * clothGridDimensions.rows;
  const constraintsData = new Uint16Array(
    Array(numLineConstraints * 2).fill(0),
  );

  const particleSystem = particleSystemRef.current;

  useLayoutEffect(() => {
    if (particleSystem.empty) {
      particleSystem.populate(
        { w: size.width, h: size.height },
        clothGridDimensions,
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

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Cloth] Rendering");
  }

  const { theme } = useTheme();
  const col = theme === "dark" ? 0x94a3b8 : 0x111827;

  return (
    <>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            ref={linesIndicesRef}
            attach="index"
            count={constraintsData.length}
            usage={DynamicDrawUsage}
            args={[constraintsData, 1]}
          />
          <bufferAttribute
            ref={linesPositionsRef}
            attach="attributes-position"
            count={clothGridDimensions.rows * clothGridDimensions.cols}
            usage={DynamicDrawUsage}
            args={[pointsData, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={col} linewidth={1} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={pointsPositionsRef}
            attach="attributes-position"
            count={clothGridDimensions.rows * clothGridDimensions.cols}
            usage={DynamicDrawUsage}
            args={[pointsData, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color={col} size={5} sizeAttenuation={false} />
      </points>
    </>
  );
}
