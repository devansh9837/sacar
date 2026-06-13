"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─── Orbital Ring ─── */
function OrbitalRing({
  radius,
  speed,
  tilt,
  opacity = 0.12,
}: {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.004, 16, 128]} />
      <meshBasicMaterial color="#C0C0C0" transparent opacity={opacity} />
    </mesh>
  );
}

/* ─── Particle Sphere ─── */
function ParticleSphere() {
  const ref = useRef<THREE.Points>(null);
  const count = 600;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.6 + Math.random() * 0.4;
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

/* ─── Orbiting Nodes (3D glowing spheres on rings) ─── */
function OrbitingNode({
  radius,
  speed,
  tilt,
  offset = 0,
}: {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  offset?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const angle = useRef(offset);

  useFrame((_, delta) => {
    angle.current += delta * speed;
    if (ref.current) {
      const x = radius * Math.cos(angle.current);
      const y = radius * Math.sin(angle.current);
      ref.current.position.set(x, y, 0);
    }
  });

  return (
    <group rotation={tilt}>
      <group ref={ref}>
        {/* Point light to illuminate this sphere locally */}
        <pointLight color="#ffffff" intensity={0.4} distance={0.5} />
        {/* Core sphere with 3D shading */}
        <mesh>
          <sphereGeometry args={[0.03, 32, 32]} />
          <meshStandardMaterial
            color="#E0E0E0"
            emissive="#8899AA"
            emissiveIntensity={0.6}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        {/* Outer glow layer */}
        <mesh>
          <sphereGeometry args={[0.065, 24, 24]} />
          <meshBasicMaterial
            color="#A0B8CC"
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Scene Content ─── */
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 2, 5]} intensity={0.5} color="#ffffff" />

      {/* Orbital Rings */}
      <OrbitalRing radius={2.0} speed={0.06} tilt={[0.4, 0, 0]} opacity={0.1} />
      <OrbitalRing radius={2.5} speed={-0.04} tilt={[0.9, 0.3, 0]} opacity={0.08} />
      <OrbitalRing radius={3.0} speed={0.025} tilt={[1.3, 0.15, 0.4]} opacity={0.06} />

      {/* Orbiting Nodes */}
      <OrbitingNode radius={2.0} speed={0.3} tilt={[0.4, 0, 0]} offset={0} />
      <OrbitingNode radius={2.0} speed={0.3} tilt={[0.4, 0, 0]} offset={Math.PI} />
      <OrbitingNode radius={2.5} speed={-0.2} tilt={[0.9, 0.3, 0]} offset={1.2} />
      <OrbitingNode radius={3.0} speed={0.15} tilt={[1.3, 0.15, 0.4]} offset={0.5} />

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
