"use client";

import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  shouldTwinkle: boolean;
  twinkleDelay: number;
  twinkleDuration: number;
}

export default function Starfield({ density = 80, color = "#C0C0C0" }: { density?: number; color?: string }) {
  const stars = useMemo(() => {
    const generatedStars: Star[] = [];
    for (let i = 0; i < density; i++) {
      // Use varied seeds for more random distribution
      const seed1 = ((i * 9301 + 49297) % 233280) / 233280;
      const seed2 = ((i * 7919 + 15485863) % 233280) / 233280;
      const seed3 = ((i * 104729 + 104723) % 233280) / 233280;
      const seed4 = ((i * 15731 + 789221) % 233280) / 233280;
      const seed5 = ((i * 1013 + 7879) % 233280) / 233280;
      const seed6 = ((i * 2749 + 3571) % 233280) / 233280;

      // Only ~10% of stars should twinkle
      const shouldTwinkle = seed6 < 0.1;

      generatedStars.push({
        id: i,
        x: seed1 * 100,
        y: seed2 * 100,
        size: seed3 * 1.5 + 0.5,
        opacity: seed4 * 0.4 + 0.15,
        shouldTwinkle,
        twinkleDelay: seed5 * 10,
        twinkleDuration: seed6 * 4 + 4,
      });
    }
    return generatedStars;
  }, [density]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: color,
            opacity: star.opacity,
            animation: star.shouldTwinkle 
              ? `twinkle ${star.twinkleDuration}s ease-in-out infinite`
              : 'none',
            animationDelay: star.shouldTwinkle ? `${star.twinkleDelay}s` : '0s',
          }}
        />
      ))}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
