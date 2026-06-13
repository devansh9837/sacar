"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
}: OrbitingCirclesProps) {
  return (
    <div
      style={
        {
          "--duration": duration,
          "--radius": radius,
          "--delay": -delay,
        } as React.CSSProperties
      }
      className={cn(
        "absolute flex h-full w-full transform-gpu animate-orbit items-center justify-center rounded-full border border-[#C0C0C0]/10 bg-[#00021C]/50 backdrop-blur-sm [animation-delay:calc(var(--delay)*1000ms)]",
        { "[animation-direction:reverse]": reverse },
        className
      )}
    >
      {children}
    </div>
  );
}
