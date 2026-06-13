// DO NOT USE
// "use client";

// import React, { useRef, useMemo } from "react";
// import { Canvas, useThree, useFrame } from "@react-three/fiber";
// import { Environment } from "@react-three/drei";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import * as THREE from "three";

// // Register GSAP plugin
// gsap.registerPlugin(useGSAP);

// // Procedural 3D Rocket (no external model needed)
// function RocketModel() {
//   const groupRef = useRef<THREE.Group>(null);
//   const { viewport } = useThree();
//   const flameRef = useRef<THREE.Mesh>(null);

//   // Animate flame flicker
//   useFrame((state) => {
//     if (flameRef.current) {
//       flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 20) * 0.2;
//       flameRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 15) * 0.1;
//     }
//   });

//   // GSAP animation for flying across screen
//   useGSAP(() => {
//     if (!groupRef.current) return;

//     const startX = -viewport.width / 2 - 3;
//     const endX = viewport.width / 2 + 3;

//     // Set initial position
//     groupRef.current.position.x = startX;
//     groupRef.current.position.y = 0;

//     // Create the flying animation
//     gsap.to(groupRef.current.position, {
//       x: endX,
//       duration: 8,
//       repeat: -1,
//       ease: "none",
//       onUpdate: () => {
//         if (groupRef.current) {
//           // Subtle bobbing motion
//           groupRef.current.position.y = Math.sin(Date.now() / 300) * 0.3;
//           // Slight rotation wobble
//           groupRef.current.rotation.z = Math.sin(Date.now() / 400) * 0.05;
//         }
//       },
//     });
//   }, { dependencies: [viewport] });

//   // Silver metallic material matching SACAR color scheme
//   const silverMaterial = useMemo(
//     () =>
//       new THREE.MeshStandardMaterial({
//         color: "#C0C0C0",
//         metalness: 0.8,
//         roughness: 0.2,
//       }),
//     []
//   );

//   const darkMaterial = useMemo(
//     () =>
//       new THREE.MeshStandardMaterial({
//         color: "#00021C",
//         metalness: 0.5,
//         roughness: 0.3,
//       }),
//     []
//   );

//   return (
//     <group ref={groupRef} rotation={[0, 0, Math.PI / 2]} scale={0.4}>
//       {/* Rocket Body (Cylinder) */}
//       <mesh material={silverMaterial} position={[0, 0, 0]}>
//         <cylinderGeometry args={[0.4, 0.5, 3, 32]} />
//       </mesh>

//       {/* Nose Cone */}
//       <mesh material={silverMaterial} position={[0, 2, 0]}>
//         <coneGeometry args={[0.4, 1.2, 32]} />
//       </mesh>

//       {/* Window */}
//       <mesh position={[0.35, 0.8, 0]}>
//         <sphereGeometry args={[0.15, 16, 16]} />
//         <meshStandardMaterial
//           color="#4A90D9"
//           emissive="#4A90D9"
//           emissiveIntensity={0.3}
//           metalness={0.9}
//           roughness={0.1}
//         />
//       </mesh>

//       {/* Fins (3 of them) */}
//       {[0, 120, 240].map((angle, i) => (
//         <mesh
//           key={i}
//           material={darkMaterial}
//           position={[
//             Math.cos((angle * Math.PI) / 180) * 0.5,
//             -1.2,
//             Math.sin((angle * Math.PI) / 180) * 0.5,
//           ]}
//           rotation={[0, (-angle * Math.PI) / 180, 0]}
//         >
//           <boxGeometry args={[0.1, 0.8, 0.6]} />
//         </mesh>
//       ))}

//       {/* Engine Nozzle */}
//       <mesh material={darkMaterial} position={[0, -1.7, 0]}>
//         <cylinderGeometry args={[0.35, 0.25, 0.4, 32]} />
//       </mesh>

//       {/* Flame/Exhaust */}
//       <mesh ref={flameRef} position={[0, -2.3, 0]}>
//         <coneGeometry args={[0.3, 1.2, 16]} />
//         <meshBasicMaterial color="#FF6B00" transparent opacity={0.9} />
//       </mesh>

//       {/* Inner flame (brighter) */}
//       <mesh position={[0, -2.1, 0]}>
//         <coneGeometry args={[0.15, 0.8, 16]} />
//         <meshBasicMaterial color="#FFD700" transparent opacity={0.95} />
//       </mesh>

//       {/* Exhaust particles effect */}
//       <ExhaustParticles />
//     </group>
//   );
// }

// // Generate initial particle positions outside component to avoid React Compiler issues
// function createInitialParticlePositions(count: number): Float32Array {
//   const pos = new Float32Array(count * 3);
//   for (let i = 0; i < count; i++) {
//     pos[i * 3] = (Math.random() - 0.5) * 0.5;
//     pos[i * 3 + 1] = -2.5 - Math.random() * 2;
//     pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
//   }
//   return pos;
// }

// const initialParticlePositions = createInitialParticlePositions(50);

// // Exhaust particle trail
// function ExhaustParticles() {
//   const particlesRef = useRef<THREE.Points>(null);
//   const particleCount = 50;

//   useFrame(() => {
//     if (particlesRef.current) {
//       const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
//       for (let i = 0; i < particleCount; i++) {
//         posArray[i * 3 + 1] -= 0.05;
//         if (posArray[i * 3 + 1] < -4.5) {
//           posArray[i * 3 + 1] = -2.5;
//           posArray[i * 3] = (Math.random() - 0.5) * 0.5;
//           posArray[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
//         }
//       }
//       particlesRef.current.geometry.attributes.position.needsUpdate = true;
//     }
//   });

//   return (
//     <points ref={particlesRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           args={[initialParticlePositions, 3]}
//           count={particleCount}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         size={0.08}
//         color="#FFA500"
//         transparent
//         opacity={0.6}
//         sizeAttenuation
//       />
//     </points>
//   );
// }

// // Main component that wraps everything in a Canvas
// export default function FlyingRocket() {
//   return (
//     <div className="fixed inset-0 pointer-events-none z-10">
//       <Canvas
//         camera={{ position: [0, 0, 10], fov: 50 }}
//         style={{ background: "transparent" }}
//         gl={{ alpha: true }}
//       >
//         {/* Lighting */}
//         <ambientLight intensity={0.4} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />
//         <pointLight position={[-5, 0, 5]} intensity={0.5} color="#FFA500" />

//         {/* The Rocket */}
//         <RocketModel />

//         {/* Optional environment for reflections */}
//         <Environment preset="night" />
//       </Canvas>
//     </div>
//   );
// }
