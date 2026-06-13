"use client";

import { useRef, useCallback } from "react";

/**
 * Zero-rerender mouse-tracking hook for gradient hover cards.
 * Sets CSS custom properties --mouse-x / --mouse-y directly on the DOM node
 * via style.setProperty — no React state, no re-renders.
 */
export function useGradientHover() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return { ref, onMouseMove };
}
