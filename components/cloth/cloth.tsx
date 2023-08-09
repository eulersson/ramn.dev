// React
import { useLayoutEffect, useMemo, useRef, useState } from "react";

// Third-Party
import { BufferAttribute, DynamicDrawUsage } from "three";
import { Canvas, Size, useFrame, useThree } from "@react-three/fiber";

import { ParticleSystem } from "@/components/cloth/particle-system";
import { Stats } from "@react-three/drei";

function Simulation() {
  const { camera, raycaster, size, viewport } = useThree();
  camera.position.setX(800);
  camera.position.setY(350);
  camera.position.setZ(400);

  const i = 15;
  const [clothWidth, clothHeight] = [i, i];

  if (raycaster.params.Points) {
    raycaster.params.Points.threshold = 5;
  }

  const linesPositionsRef = useRef<BufferAttribute>(null);
  const linesIndicesRef = useRef<BufferAttribute>(null);
  const pointsPositionsRef = useRef<BufferAttribute>(null);

  const pointsData = new Float32Array(
    Array(clothWidth * clothHeight * 3).fill(0)
  );

  const constraintsData = new Uint8Array(
    Array(
      (clothWidth * (clothHeight - 1) + (clothWidth - 1) * clothHeight) * 3
    ).fill(0)
  );

  const particleSystemRef = useRef(new ParticleSystem());
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

  console.log("[Cloth] Rendering")

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
  return (
    <Canvas>
      <Stats />
      <Simulation />
    </Canvas>
  );
}
