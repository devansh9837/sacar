"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

interface Nebula {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
}

// Simple stylized rocket with clean gradients
function ModernRocket({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Body gradient - white with subtle purple tint */}
        <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E0D8F0" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0D8F0" />
        </linearGradient>

        {/* Nose cone - blue/purple */}
        <linearGradient id="noseCone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8AAEF0" />
          <stop offset="100%" stopColor="#7070C8" />
        </linearGradient>

        {/* Fins - pink */}
        <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF90C8" />
          <stop offset="100%" stopColor="#D060A0" />
        </linearGradient>

        {/* Flame gradient */}
        <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E0" />
          <stop offset="50%" stopColor="#FFD080" />
          <stop offset="100%" stopColor="#FF8040" stopOpacity="0" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#glow)">
        {/* Nose cone */}
        <path d="M50 0 L70 50 L30 50 Z" fill="url(#noseCone)" />

        {/* Main body */}
        <rect x="30" y="48" width="40" height="100" rx="3" fill="url(#rocketBody)" />

        {/* Pink stripe */}
        <rect x="30" y="65" width="40" height="4" fill="#FF80B8" />

        {/* Window */}
        <circle cx="50" cy="95" r="12" fill="#80D0F0" />
        <circle cx="46" cy="91" r="4" fill="white" opacity="0.6" />

        {/* Left fin */}
        <path d="M30 120 L10 165 L10 175 L30 150 Z" fill="url(#finGradient)" />

        {/* Right fin */}
        <path d="M70 120 L90 165 L90 175 L70 150 Z" fill="url(#finGradient)" />

        {/* Engine */}
        <rect x="35" y="148" width="30" height="15" fill="#B0A0C0" />
        <path d="M38 163 L35 175 L65 175 L62 163 Z" fill="#9080A0" />
      </g>

      {/* Flame */}
      <g className="animate-flicker">
        <path d="M38 175 Q35 195 50 220 Q65 195 62 175 Z" fill="url(#flameGrad)" />
      </g>
    </svg>
  );
}

export default function LoadingScreen({
  onLoadingComplete,
  minDuration = 1500,
}: {
  onLoadingComplete?: () => void;
  minDuration?: number;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate stars for the deep space background
  const stars = useMemo(() => {
    const generated: Star[] = [];
    for (let i = 0; i < 200; i++) {
      const seed1 = ((i * 9301 + 49297) % 233280) / 233280;
      const seed2 = ((i * 7919 + 15485863) % 233280) / 233280;
      const seed3 = ((i * 104729 + 104723) % 233280) / 233280;
      const seed4 = ((i * 15731 + 789221) % 233280) / 233280;
      const seed5 = ((i * 1013 + 7879) % 233280) / 233280;

      generated.push({
        id: i,
        x: seed1 * 100,
        y: seed2 * 100,
        size: seed3 < 0.1 ? seed4 * 2 + 1.5 : seed4 * 1.2 + 0.3,
        opacity: seed3 < 0.1 ? seed5 * 0.5 + 0.5 : seed5 * 0.4 + 0.1,
        speed: seed5 * 0.5 + 0.2,
      });
    }
    return generated;
  }, []);

  // Generate subtle nebula clouds
  const nebulae = useMemo(() => {
    const generated: Nebula[] = [];
    for (let i = 0; i < 4; i++) {
      const seed1 = ((i * 12345 + 67890) % 100) / 100;
      const seed2 = ((i * 54321 + 98765) % 100) / 100;

      generated.push({
        id: i,
        x: seed1 * 80 + 10,
        y: seed2 * 80 + 10,
        size: 300 + i * 100,
        rotation: i * 45,
        opacity: 0.03 + (i % 2) * 0.02,
      });
    }
    return generated;
  }, []);

  // Loading progress simulation
  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minDuration) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= minDuration) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsLoading(false);
          onLoadingComplete?.();
        }, 300);
      }
    }, 16);

    return () => clearInterval(progressInterval);
  }, [minDuration, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] bg-[#000510] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Deep space gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#000510] via-[#00021C] to-[#050520]" />

          {/* Subtle nebula clouds */}
          {nebulae.map((nebula) => (
            <div
              key={nebula.id}
              className="absolute rounded-full blur-3xl pointer-events-none"
              style={{
                left: `${nebula.x}%`,
                top: `${nebula.y}%`,
                width: `${nebula.size}px`,
                height: `${nebula.size}px`,
                transform: `translate(-50%, -50%) rotate(${nebula.rotation}deg)`,
                background: `radial-gradient(ellipse at center, rgba(100, 120, 180, ${nebula.opacity}) 0%, transparent 70%)`,
              }}
            />
          ))}

          {/* Stars layer */}
          <div className="absolute inset-0">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  backgroundColor: star.size > 1.5 ? "#E8E8FF" : "#C0C0C0",
                  boxShadow: star.size > 2 ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)` : "none",
                }}
                animate={{
                  opacity: [star.opacity, star.opacity * 0.6, star.opacity],
                }}
                transition={{
                  duration: 2 + star.speed * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: star.speed * 2,
                }}
              />
            ))}
          </div>

          {/* Distant star clusters / galaxies */}
          <div
            className="absolute w-40 h-40 rounded-full blur-2xl opacity-[0.04]"
            style={{
              left: "70%",
              top: "20%",
              background: "radial-gradient(circle, #8090B0 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute w-32 h-32 rounded-full blur-xl opacity-[0.03]"
            style={{
              left: "20%",
              top: "60%",
              background: "radial-gradient(circle, #9080A0 0%, transparent 70%)",
            }}
          />

          {/* Flying Rocket - diagonal from bottom-left to top-right, nose pointing top-right */}
          <motion.div
            className="absolute"
            style={{
              width: "70px",
              height: "160px",
            }}
            initial={{
              left: "-10%",
              bottom: "-15%",
              rotate: 45,
            }}
            animate={{
              left: "110%",
              bottom: "110%",
            }}
            transition={{
              duration: minDuration / 1000 + 0.2,
              ease: [0.2, 0.1, 0.3, 1],
            }}
          >
            {/* Rocket trail - follows behind */}
            <motion.div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2"
              style={{
                width: "5px",
                height: "80px",
                background: "linear-gradient(to bottom, rgba(255, 240, 200, 0.8) 0%, rgba(255, 180, 100, 0.3) 50%, transparent 100%)",
                filter: "blur(2px)",
              }}
            />

            <ModernRocket className="w-full h-full" />
          </motion.div>

          {/* Loading UI - minimal, elegant */}
          <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center">
            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C0C0C0] to-white"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Brand text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <span
                className="text-[#C0C0C0] text-xs tracking-[0.3em] font-mono uppercase"
                style={{ fontFamily: "var(--font-roboto-mono)" }}
              >
                SACAR
              </span>
            </motion.div>
          </div>

          {/* Custom animations */}
          <style jsx global>{`
            @keyframes flicker {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.9; }
            }
            
            .animate-flicker {
              animation: flicker 0.12s ease-in-out infinite;
            }
            
            .animate-flame-outer {
              animation: flame-scale 0.18s ease-in-out infinite alternate;
              transform-origin: center top;
            }
            
            .animate-flame-core {
              animation: flame-scale 0.12s ease-in-out infinite alternate;
              transform-origin: center top;
            }
            
            @keyframes flame-scale {
              from { transform: scaleY(1) scaleX(1); }
              to { transform: scaleY(1.08) scaleX(0.96); }
            }
            
            .animate-sparkle {
              animation: sparkle 1.5s ease-in-out infinite;
            }
            
            @keyframes sparkle {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
