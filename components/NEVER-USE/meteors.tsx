"use client";

import { cn } from "@/lib/utils";

// Pre-computed deterministic meteor positions using a simple hash function
function hashPosition(seed: number, max: number): number {
  return ((seed * 9301 + 49297) % 233280) / 233280 * max;
}

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  // Generate deterministic meteor data
  const meteors = Array.from({ length: number }, (_, idx) => ({
    id: idx,
    top: `${Math.floor(hashPosition(idx * 1, 100))}%`,
    left: `${Math.floor(hashPosition(idx * 2 + 100, 100))}%`,
    animationDelay: `${(hashPosition(idx * 3 + 200, 0.6) + 0.2).toFixed(2)}s`,
    animationDuration: `${Math.floor(hashPosition(idx * 4 + 300, 8) + 2)}s`,
  }));

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-[#C0C0C0] shadow-[0_0_0_1px_#C0C0C010] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#C0C0C0] before:to-transparent",
            className
          )}
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        />
      ))}
    </>
  );
};
