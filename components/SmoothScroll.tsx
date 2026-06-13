"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<React.ComponentRef<typeof ReactLenis>>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // On mobile, visualViewport.resize fires when the browser chrome (URL bar)
    // hides/shows — window.resize does not. Refresh ScrollTrigger only on
    // significant height changes (orientation, keyboard) — not URL bar toggles
    // which are ~56-80px and cause layout jank if we recalculate pins.
    const initialHeight = window.visualViewport?.height ?? window.innerHeight;
    let refreshTimeout: ReturnType<typeof setTimeout>;
    const handleViewportResize = () => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        const currentHeight = window.visualViewport?.height ?? window.innerHeight;
        if (Math.abs(currentHeight - initialHeight) > 100) {
          ScrollTrigger.refresh();
        }
      }, 200);
    };

    window.visualViewport?.addEventListener("resize", handleViewportResize);

    return () => {
      gsap.ticker.remove(update);
      clearTimeout(refreshTimeout);
      window.visualViewport?.removeEventListener("resize", handleViewportResize);
    };
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
