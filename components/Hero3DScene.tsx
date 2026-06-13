"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─── Seeded PRNG (deterministic, avoids React purity warnings) ─── */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

/* ─── Particle Sphere ─── */
function ParticleSphere() {
  const ref = useRef<THREE.Points>(null);
  const count = 600;

  const positions = useMemo(() => {
    const rand = seededRandom(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 1.6 + rand() * 0.4;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#C0C0C0"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Scene Content ─── */
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />

      {/* Particle sphere */}
      <ParticleSphere />

      {/* Sparkles */}
      <Sparkles
        count={30}
        scale={7}
        size={1.2}
        speed={0.2}
        opacity={0.3}
        color="#C0C0C0"
      />

      {/* Stars */}
      <Stars
        radius={60}
        depth={50}
        count={1500}
        factor={2}
        saturation={0}
        fade
        speed={0.3}
      />
    </>
  );
}

/* ─── Main export ─── */
export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 top-20 z-0">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 55 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
