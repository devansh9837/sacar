"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  duration = 3000,
  rx = "30%",
  ry = "30%",
  className,
  containerClassName,
  borderClassName,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  [key: string]: unknown;
}) => {
  return (
    <button
      data-glow
      className={cn(
        "relative h-12 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${rx} * 0.96) calc(${ry} * 0.96)` }}
      >
        <motion.div
          className={cn(
            "absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(192,192,192,0.4)_360deg)]",
            borderClassName
          )}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center bg-[#00021C]/80 text-sm antialiased backdrop-blur-xl",
          className
        )}
        style={{ borderRadius: `calc(${rx} * 0.96) calc(${ry} * 0.96)` }}
      >
        {children}
      </div>
    </button>
  );
};
