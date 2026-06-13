// DO NOT USE
// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";

// export default function RocketScrollAnimation() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const rocketRef = useRef<HTMLDivElement>(null);
//   const [hasAnimated, setHasAnimated] = useState(false);

//   useEffect(() => {
//     if (!containerRef.current || !rocketRef.current || hasAnimated) return;

//     // Set initial position off-screen to the left
//     gsap.set(rocketRef.current, {
//       x: -150,
//       y: 0,
//       rotation: 90, // Pointing right (horizontal)
//     });

//     // Animate rocket flying horizontally across the screen
//     gsap.to(rocketRef.current, {
//       x: window.innerWidth + 150,
//       duration: 3,
//       ease: "power2.inOut",
//       delay: 0.5,
//       onComplete: () => setHasAnimated(true),
//     });
//   }, [hasAnimated]);

//   return (
//     <div
//       ref={containerRef}
//       className="fixed inset-0 pointer-events-none overflow-hidden"
//       style={{ zIndex: 50 }}
//     >
//       {/* The Rocket - Simple white outline */}
//       <div
//         ref={rocketRef}
//         className="absolute top-1/2 -translate-y-1/2"
//         style={{ zIndex: 10 }}
//       >
//         {/* Rocket SVG - White outline only */}
//         <svg
//           width="100"
//           height="50"
//           viewBox="0 0 100 50"
//           className="w-20 md:w-24"
//         >
//           {/* Simple rocket outline */}
//           <path
//             d="M0 25 
//                L15 15
//                L15 10
//                L25 10
//                L25 5
//                L75 5
//                L90 15
//                L100 25
//                L90 35
//                L75 45
//                L25 45
//                L25 40
//                L15 40
//                L15 35
//                Z"
//             fill="none"
//             stroke="#FFFFFF"
//             strokeWidth="2"
//           />
//           {/* Nose cone */}
//           <path
//             d="M75 5 L100 25 L75 45"
//             fill="none"
//             stroke="#FFFFFF"
//             strokeWidth="2"
//           />
//           {/* Window */}
//           <circle cx="60" cy="25" r="6" fill="none" stroke="#FFFFFF" strokeWidth="2" />
//           {/* Fins */}
//           <path d="M25 5 L15 0 L15 10" fill="none" stroke="#FFFFFF" strokeWidth="2" />
//           <path d="M25 45 L15 50 L15 40" fill="none" stroke="#FFFFFF" strokeWidth="2" />
//         </svg>
//       </div>
//     </div>
//   );
// }
