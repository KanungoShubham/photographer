"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import ApertureBlades from "@/components/ApertureBlades";

function CameraRig({ progressRef }: { progressRef: { current: number } }) {
  const { camera } = useThree();

  /* eslint-disable react-hooks/immutability -- imperative camera animation is the standard R3F pattern */
  useFrame(() => {
    const p = progressRef.current;
    camera.position.z = THREE.MathUtils.lerp(6.4, 9, p);
    camera.position.y = 0;
    camera.lookAt(0, 0, 0);
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}

function RotatingLight({ progressRef }: { progressRef: { current: number } }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    const t = clock.getElapsedTime();
    const p = progressRef.current;
    lightRef.current.position.set(
      Math.cos(t * 0.4) * (3 + p * 2),
      Math.sin(t * 0.4) * (3 + p * 2),
      2
    );
  });

  return <pointLight ref={lightRef} intensity={40} color="#d4af37" />;
}

export default function ApertureScene({ progressRef }: { progressRef: { current: number } }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#080808"]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[-4, -3, 4]} intensity={18} color="#f5f5f5" />
      <RotatingLight progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
      <ApertureBlades progressRef={progressRef} />
      <Sparkles count={70} scale={7} size={2.4} speed={0.25} color="#d4af37" opacity={0.6} />
      <fog attach="fog" args={["#080808", 4, 11]} />
    </Canvas>
  );
}
