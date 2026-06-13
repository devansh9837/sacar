"use client";

import { motion } from "framer-motion";
import { useTilt, type UseTiltOptions } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";

const variantClasses = {
  dark: "glass-card-dark",
  featured: "glass-card-featured",
  "light-featured": "glass-card-light-featured",
} as const;

const spotlightColors = {
  dark: "rgba(192, 192, 192, 0.08)",
  featured: "rgba(192, 192, 192, 0.12)",
  "light-featured": "rgba(0, 2, 28, 0.06)",
} as const;

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltOptions?: Omit<UseTiltOptions, "spotlightColor">;
  variant?: keyof typeof variantClasses;
}

export default function TiltCard({
  children,
  className,
  tiltOptions,
  variant = "dark",
}: TiltCardProps) {
  const { ref, style, spotlightStyle, onMouseMove, onMouseEnter, onMouseLeave } =
    useTilt({
      ...tiltOptions,
      spotlightColor: spotlightColors[variant],
    });

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-glow
      className={cn("relative overflow-hidden", variantClasses[variant], className)}
    >
      {/* Cursor spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-[1]"
        style={spotlightStyle}
      />
      {/* Content */}
      <div className="relative z-[2] h-full">{children}</div>
    </motion.div>
  );
}
