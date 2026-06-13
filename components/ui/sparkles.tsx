"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Pre-computed deterministic position function
function hashPosition(seed: number, max: number): number {
  return ((seed * 9301 + 49297) % 233280) / 233280 * max;
}

type SparklesCoreProps = {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
};

export const SparklesCore = ({
  background,
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 100,
  className,
  particleColor = "#FFFFFF",
}: SparklesCoreProps) => {
  // Generate deterministic particle data
  const particles = Array.from({ length: particleDensity }, (_, i) => ({
    id: i,
    x: hashPosition(i * 1, 100),
    y: hashPosition(i * 2 + 500, 100),
    size: hashPosition(i * 3 + 1000, maxSize - minSize) + minSize,
    opacity: hashPosition(i * 4 + 1500, 0.5) + 0.1,
    duration: hashPosition(i * 5 + 2000, 3) + 2,
  }));

  return (
    <div
      className={cn("h-full w-full absolute inset-0 overflow-hidden", className)}
      style={{ background: background || "transparent" }}
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particleColor,
          }}
          animate={{
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
