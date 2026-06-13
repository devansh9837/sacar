"use client";

import { useGradientHover } from "@/hooks/useGradientHover";
import { cn } from "@/lib/utils";

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
}

const variantClasses = {
  dark: "gradient-hover-card",
  light: "gradient-hover-card-light",
} as const;

/**
 * Glassmorphism card with a mouse-tracking radial spotlight.
 * Uses CSS custom properties for the spotlight position — zero React re-renders.
 * The ::before pseudo-element handles the gradient; see globals.css for styles.
 */
export default function GradientCard({ children, className, variant = "dark" }: GradientCardProps) {
  const { ref, onMouseMove } = useGradientHover();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      data-glow
      className={cn(variantClasses[variant], className)}
    >
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
