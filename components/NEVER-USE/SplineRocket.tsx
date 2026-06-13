// DO NOT USE
// "use client";

// import { Suspense, lazy, useState, useEffect } from "react";
// import { motion } from "framer-motion";

// // Lazy load Spline for better performance
// const Spline = lazy(() => import("@splinetool/react-spline"));

// interface SplineRocketProps {
//   className?: string;
//   useSpline?: boolean; // Set to true when you have a custom Spline scene
//   splineUrl?: string;
// }

// export default function SplineRocket({ 
//   className = "", 
//   useSpline = false, // Default to CSS rocket for reliability
//   splineUrl = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
// }: SplineRocketProps) {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [hasError, setHasError] = useState(false);

//   // If not using Spline, show the fallback rocket directly
//   if (!useSpline) {
//     return (
//       <div className={`relative ${className}`}>
//         <FallbackRocket />
//       </div>
//     );
//   }

//   return (
//     <div className={`relative ${className}`}>
//       {/* Loading state with animated placeholder */}
//       {!isLoaded && !hasError && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="absolute inset-0 flex items-center justify-center"
//         >
//           <div className="relative">
//             {/* Animated loading rocket silhouette */}
//             <motion.svg
//               width="120"
//               height="200"
//               viewBox="0 0 120 200"
//               fill="none"
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//             >
//               {/* Rocket body */}
//               <path
//                 d="M60 10 L80 60 L80 140 L70 160 L50 160 L40 140 L40 60 Z"
//                 stroke="#C0C0C0"
//                 strokeWidth="2"
//                 fill="none"
//                 opacity="0.5"
//               />
//               {/* Rocket nose cone */}
//               <path
//                 d="M60 10 L70 40 L50 40 Z"
//                 stroke="#C0C0C0"
//                 strokeWidth="2"
//                 fill="none"
//                 opacity="0.5"
//               />
//               {/* Rocket fins */}
//               <path
//                 d="M40 120 L25 160 L40 150"
//                 stroke="#C0C0C0"
//                 strokeWidth="2"
//                 fill="none"
//                 opacity="0.5"
//               />
//               <path
//                 d="M80 120 L95 160 L80 150"
//                 stroke="#C0C0C0"
//                 strokeWidth="2"
//                 fill="none"
//                 opacity="0.5"
//               />
//               {/* Animated exhaust */}
//               <motion.path
//                 d="M50 160 L60 190 L70 160"
//                 stroke="#C0C0C0"
//                 strokeWidth="2"
//                 fill="none"
//                 animate={{ opacity: [0.3, 0.7, 0.3] }}
//                 transition={{ duration: 0.5, repeat: Infinity }}
//               />
//             </motion.svg>
//             <motion.p
//               className="text-[#C0C0C0]/50 text-sm font-mono mt-4 text-center"
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//             >
//               INITIALIZING...
//             </motion.p>
//           </div>
//         </motion.div>
//       )}

//       {/* Error fallback - shows a CSS-based 3D rocket */}
//       {hasError && <FallbackRocket />}

//       {/* Spline 3D Scene */}
//       {!hasError && (
//         <Suspense fallback={null}>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="w-full h-full"
//           >
//             <Spline
//               scene={splineUrl}
//               onLoad={() => setIsLoaded(true)}
//               onError={() => setHasError(true)}
//               style={{ width: "100%", height: "100%" }}
//             />
//           </motion.div>
//         </Suspense>
//       )}
//     </div>
//   );
// }

// // Fallback 3D-looking rocket using CSS and SVG
// function FallbackRocket() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="w-full h-full flex items-center justify-center"
//     >
//       <motion.div
//         animate={{ y: [0, -15, 0] }}
//         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//         className="relative"
//         style={{ filter: "drop-shadow(0 20px 40px rgba(192, 192, 192, 0.2))" }}
//       >
//         <svg
//           width="200"
//           height="350"
//           viewBox="0 0 200 350"
//           fill="none"
//           className="transform-gpu"
//         >
//           {/* Rocket body - main gradient for 3D effect */}
//           <defs>
//             <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#404040" />
//               <stop offset="30%" stopColor="#C0C0C0" />
//               <stop offset="50%" stopColor="#E8E8E8" />
//               <stop offset="70%" stopColor="#C0C0C0" />
//               <stop offset="100%" stopColor="#404040" />
//             </linearGradient>
//             <linearGradient id="noseGradient" x1="0%" y1="100%" x2="0%" y2="0%">
//               <stop offset="0%" stopColor="#C0C0C0" />
//               <stop offset="100%" stopColor="#E8E8E8" />
//             </linearGradient>
//             <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#00021C" />
//               <stop offset="50%" stopColor="#303040" />
//               <stop offset="100%" stopColor="#00021C" />
//             </linearGradient>
//             <radialGradient id="windowGradient" cx="30%" cy="30%">
//               <stop offset="0%" stopColor="#87CEEB" />
//               <stop offset="70%" stopColor="#4A90A4" />
//               <stop offset="100%" stopColor="#00021C" />
//             </radialGradient>
//             <linearGradient id="exhaustGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" stopColor="#C0C0C0" stopOpacity="0.8" />
//               <stop offset="50%" stopColor="#808080" stopOpacity="0.4" />
//               <stop offset="100%" stopColor="#404040" stopOpacity="0" />
//             </linearGradient>
//           </defs>

//           {/* Exhaust flame effect */}
//           <motion.g
//             animate={{ scaleY: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
//             transition={{ duration: 0.3, repeat: Infinity }}
//             style={{ transformOrigin: "100px 280px" }}
//           >
//             <ellipse cx="100" cy="320" rx="25" ry="40" fill="url(#exhaustGradient)" />
//             <ellipse cx="100" cy="310" rx="15" ry="25" fill="#C0C0C0" opacity="0.3" />
//           </motion.g>

//           {/* Left fin */}
//           <path
//             d="M55 220 L25 290 L55 270 Z"
//             fill="url(#finGradient)"
//             stroke="#C0C0C0"
//             strokeWidth="1"
//           />
          
//           {/* Right fin */}
//           <path
//             d="M145 220 L175 290 L145 270 Z"
//             fill="url(#finGradient)"
//             stroke="#C0C0C0"
//             strokeWidth="1"
//           />

//           {/* Center fin (back) */}
//           <path
//             d="M95 240 L100 295 L105 240 Z"
//             fill="#303040"
//             stroke="#C0C0C0"
//             strokeWidth="0.5"
//           />

//           {/* Main rocket body */}
//           <path
//             d="M60 90 L60 270 Q60 280 70 280 L130 280 Q140 280 140 270 L140 90 Z"
//             fill="url(#bodyGradient)"
//             stroke="#C0C0C0"
//             strokeWidth="1.5"
//           />

//           {/* Nose cone */}
//           <path
//             d="M60 90 Q60 50 100 20 Q140 50 140 90 Z"
//             fill="url(#noseGradient)"
//             stroke="#C0C0C0"
//             strokeWidth="1.5"
//           />

//           {/* Window */}
//           <circle
//             cx="100"
//             cy="130"
//             r="22"
//             fill="url(#windowGradient)"
//             stroke="#E8E8E8"
//             strokeWidth="3"
//           />
          
//           {/* Window highlight */}
//           <ellipse
//             cx="92"
//             cy="122"
//             rx="8"
//             ry="6"
//             fill="white"
//             opacity="0.4"
//           />

//           {/* Body stripes for depth */}
//           <rect x="60" y="180" width="80" height="4" fill="#00021C" opacity="0.3" />
//           <rect x="60" y="200" width="80" height="4" fill="#00021C" opacity="0.3" />
//           <rect x="60" y="250" width="80" height="8" fill="#00021C" opacity="0.4" />

//           {/* Highlight edge */}
//           <path
//             d="M70 90 L70 270"
//             stroke="white"
//             strokeWidth="2"
//             opacity="0.3"
//           />
//         </svg>
//       </motion.div>
//     </motion.div>
//   );
// }
