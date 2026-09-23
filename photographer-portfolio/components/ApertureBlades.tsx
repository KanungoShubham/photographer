"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BLADE_COUNT = 9;
const CLOSED_RADIUS = 0.32;
const OPEN_RADIUS = 1.5;

function useBladeShape() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.32, 1.55);
    shape.quadraticCurveTo(0.14, 1.8, -0.05, 1.62);
    shape.lineTo(-0.3, 1.5);
    shape.lineTo(0, 0);
    return shape;
  }, []);
}

type BladeProps = {
  index: number;
  progressRef: { current: number };
};

function Blade({ index, progressRef }: BladeProps) {
  const shape = useBladeShape();
  const geometry = useMemo(() => new THREE.ShapeGeometry(shape), [shape]);
  const pivotRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = (index / BLADE_COUNT) * Math.PI * 2;
  const dir = useMemo(() => new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0), [angle]);

  useFrame((_, delta) => {
    if (!pivotRef.current || !meshRef.current) return;
    const p = progressRef.current;
    const radius = THREE.MathUtils.lerp(CLOSED_RADIUS, OPEN_RADIUS, p);
    pivotRef.current.position.set(dir.x * radius, dir.y * radius, 0);
    const scale = THREE.MathUtils.lerp(0.85, 1.2, p);
    meshRef.current.scale.setScalar(scale);
    meshRef.current.rotation.z += delta * 0.05;
  });

  return (
    <group rotation={[0, 0, angle]}>
      <group ref={pivotRef}>
        <mesh ref={meshRef} geometry={geometry} rotation={[0, 0, angle + Math.PI / 2]}>
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.6}
            roughness={0.25}
            side={THREE.DoubleSide}
            emissive="#8a6a1a"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function ApertureBlades({ progressRef }: { progressRef: { current: number } }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const p = progressRef.current;
    groupRef.current.rotation.z += delta * (0.06 + p * 0.18);
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: BLADE_COUNT }, (_, i) => (
        <Blade key={i} index={i} progressRef={progressRef} />
      ))}
    </group>
  );
}
