"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const enabledRef = useRef(false);
  const hoveringRef = useRef(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const opacityMV = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 150, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 25 });
  const springOpacity = useSpring(opacityMV, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    enabledRef.current = pointer.matches && !reducedMotion.matches;

    if (!enabledRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isOver = !!target.closest("[data-glow]");
      if (isOver !== hoveringRef.current) {
        hoveringRef.current = isOver;
        opacityMV.set(isOver ? 1 : 0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, opacityMV]);

  // Render unconditionally — opacity handles visibility.
  // The enabled check is in the mousemove handler; if disabled,
  // the glow stays at opacity 0 (its initial value).
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(192, 192, 192, 0.045) 0%, rgba(192, 192, 192, 0.02) 30%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 40,
        mixBlendMode: "screen",
        opacity: springOpacity,
      }}
    />
  );
}
