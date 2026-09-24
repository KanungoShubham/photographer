"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uProgress;
  uniform vec2 uUvScale;
  uniform vec2 uUvOffset;
  uniform vec2 uPointer;
  varying vec2 vUv;

  float wave(vec2 uv, float t) {
    return sin(uv.y * 24.0 + t * 10.0) * (1.0 - t) * 0.035;
  }

  void main() {
    vec2 uv = vUv * uUvScale + uUvOffset;

    float reveal = clamp(uProgress, 0.0, 1.0);
    float distort = wave(vUv, reveal);
    uv.x += distort;
    uv.y += (1.0 - reveal) * (uPointer.y * 0.02);

    float shift = (1.0 - reveal) * 0.012;
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;

    vec3 color = vec3(r, g, b);

    float scan = smoothstep(reveal - 0.08, reveal, vUv.y) * smoothstep(reveal + 0.08, reveal, vUv.y);
    color += scan * 0.25;

    float vignette = smoothstep(1.05, 0.35, distance(vUv, vec2(0.5)));
    color *= mix(0.75, 1.0, vignette);

    float fade = smoothstep(0.0, 0.6, reveal);
    gl_FragColor = vec4(color, fade);
  }
`;

function coverUvTransform(planeAspect: number, textureAspect: number) {
  if (planeAspect > textureAspect) {
    const scaleY = textureAspect / planeAspect;
    return { scale: new THREE.Vector2(1, scaleY), offset: new THREE.Vector2(0, (1 - scaleY) / 2) };
  }
  const scaleX = planeAspect / textureAspect;
  return { scale: new THREE.Vector2(scaleX, 1), offset: new THREE.Vector2((1 - scaleX) / 2, 0) };
}

function ImagePlane({ images, active, pointer }: { images: string[]; active: number; pointer: React.RefObject<[number, number]> }) {
  const textures = useTexture(images);
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const progressRef = useRef(0);
  const activeTexture = textures[active];

  useEffect(() => {
    activeTexture.colorSpace = THREE.SRGBColorSpace;
    activeTexture.needsUpdate = true;
  }, [activeTexture]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: activeTexture },
      uProgress: { value: 0 },
      uUvScale: { value: new THREE.Vector2(1, 1) },
      uUvOffset: { value: new THREE.Vector2(0, 0) },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    progressRef.current = 0;
    if (materialRef.current) {
      materialRef.current.uniforms.uTexture.value = activeTexture;
      materialRef.current.uniforms.uProgress.value = 0;
    }
  }, [activeTexture]);

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    progressRef.current = THREE.MathUtils.damp(progressRef.current, 1, 4.2, delta);
    materialRef.current.uniforms.uProgress.value = progressRef.current;

    const img = activeTexture.image as { width: number; height: number } | undefined;
    const textureAspect = img && img.width ? img.width / img.height : 1.5;
    const planeAspect = viewport.width / viewport.height;
    const { scale, offset } = coverUvTransform(planeAspect, textureAspect);
    materialRef.current.uniforms.uUvScale.value.copy(scale);
    materialRef.current.uniforms.uUvOffset.value.copy(offset);

    if (pointer.current) {
      const [px, py] = pointer.current;
      const current = materialRef.current.uniforms.uPointer.value as THREE.Vector2;
      current.x = THREE.MathUtils.damp(current.x, px, 4, delta);
      current.y = THREE.MathUtils.damp(current.y, py, 4, delta);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function ServiceImageScene({ images, active }: { images: string[]; active: number }) {
  const [failed, setFailed] = useState(false);
  const pointer = useRef<[number, number]>([0, 0]);

  if (failed) return null;

  return (
    <div
      className="absolute inset-0 h-full w-full"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = [
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -(((event.clientY - rect.top) / rect.height) * 2 - 1),
        ];
      }}
      onPointerLeave={() => {
        pointer.current = [0, 0];
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (event) => {
              event.preventDefault();
              setFailed(true);
            },
            { once: true }
          );
        }}
      >
        <Suspense fallback={null}>
          <ImagePlane images={images} active={active} pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}
