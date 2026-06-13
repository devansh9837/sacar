"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";

export interface UseTiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  spotlightColor?: string;
  spotlightSize?: number;
  /** Delay in ms before tilt activates after cursor enters the card */
  dwellDelay?: number;
}

export interface UseTiltReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  style: MotionStyle;
  spotlightStyle: MotionStyle;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function useTilt(options: UseTiltOptions = {}): UseTiltReturn {
  const {
    maxTilt = 3,
    perspective = 1200,
    scale: hoverScale = 1.01,
    speed = 150,
    spotlightColor = "rgba(192, 192, 192, 0.08)",
    spotlightSize = 60,
    dwellDelay = 250,
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const tiltActiveRef = useRef(false);
  const dwellTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Store the latest cursor percentages so we can apply them once dwell fires
  const pendingCursorRef = useRef<{ percentX: number; percentY: number; spotX: number; spotY: number } | null>(null);

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(pointer.matches && !motion.matches);

    const update = () => setEnabled(pointer.matches && !motion.matches);
    pointer.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      pointer.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  // Raw motion values
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawScale = useMotionValue(1);
  const rawSpotlightX = useMotionValue(50);
  const rawSpotlightY = useMotionValue(50);

  // Softer spring for a premium, deliberate feel
  const springConfig = { stiffness: speed, damping: 25 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const scaleVal = useSpring(rawScale, springConfig);
  const spotlightSpring = { stiffness: 150, damping: 28 };
  const spotlightX = useSpring(rawSpotlightX, spotlightSpring);
  const spotlightY = useSpring(rawSpotlightY, spotlightSpring);

  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]: number[]) => {
      const cx = Math.min(100, Math.max(0, x));
      const cy = Math.min(100, Math.max(0, y));
      return `radial-gradient(circle at ${cx}% ${cy}%, ${spotlightColor} 0%, transparent ${spotlightSize}%)`;
    }
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      const spotX = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
      const spotY = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));

      // Always track the spotlight position (no delay for the subtle light effect)
      rawSpotlightX.set(spotX);
      rawSpotlightY.set(spotY);

      // Store latest cursor data for when dwell fires
      pendingCursorRef.current = { percentX, percentY, spotX, spotY };

      // Only apply tilt rotation once the dwell delay has elapsed
      if (tiltActiveRef.current) {
        rawRotateX.set(-percentY * maxTilt);
        rawRotateY.set(percentX * maxTilt);
      }
    },
    [enabled, maxTilt, rawRotateX, rawRotateY, rawSpotlightX, rawSpotlightY]
  );

  const onMouseEnter = useCallback(() => {
    if (!enabled) return;
    rawScale.set(hoverScale);

    // Start the dwell timer — tilt only kicks in after the delay
    dwellTimerRef.current = setTimeout(() => {
      tiltActiveRef.current = true;
      // Apply the tilt from wherever the cursor currently is
      if (pendingCursorRef.current) {
        const { percentX, percentY } = pendingCursorRef.current;
        rawRotateX.set(-percentY * maxTilt);
        rawRotateY.set(percentX * maxTilt);
      }
    }, dwellDelay);
  }, [enabled, hoverScale, rawScale, dwellDelay, maxTilt, rawRotateX, rawRotateY]);

  const onMouseLeave = useCallback(() => {
    if (!enabled) return;
    // Clear dwell timer and deactivate tilt
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    tiltActiveRef.current = false;
    pendingCursorRef.current = null;

    rawRotateX.set(0);
    rawRotateY.set(0);
    rawScale.set(1);
    rawSpotlightX.set(50);
    rawSpotlightY.set(50);
  }, [enabled, rawRotateX, rawRotateY, rawScale, rawSpotlightX, rawSpotlightY]);

  const style: MotionStyle = {
    perspective,
    rotateX,
    rotateY,
    scale: scaleVal,
    transformStyle: "preserve-3d" as const,
  };

  const spotlightStyle: MotionStyle = {
    background: spotlightBackground,
  };

  return {
    ref,
    style,
    spotlightStyle,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
  };
}
