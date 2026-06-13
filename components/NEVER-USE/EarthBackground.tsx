"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EarthBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fade out over the first 1000px of scroll — driven by GSAP ScrollTrigger,
  // not a standalone window scroll listener.
  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "1000px top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      {/* Earth image container - positioned at bottom showing top portion of globe */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-end w-full">
        {/* The Earth image - positioned so top portion rises from bottom */}
        <div
          className="relative"
          style={{
            width: "min(180vw, 2200px)",
            height: "min(180vw, 2200px)",
            transform: "translateY(40%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/textures/earth-nasa.jpg"
            alt="Earth from Space"
            className="w-full h-full object-cover object-center"
            style={{
              filter: "brightness(0.85) saturate(1.15) contrast(1.1)",
            }}
          />

          {/* Atmospheric glow effect */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(100, 180, 255, 0.1) 0%, transparent 40%)",
            }}
          />

          {/* Edge fade to blend into space background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 35%, rgba(0, 2, 28, 0.4) 45%, rgba(0, 2, 28, 0.8) 55%, rgba(0, 2, 28, 1) 65%)",
            }}
          />
        </div>
      </div>

      {/* Top gradient fade into space */}
      <div
        className="absolute top-0 left-0 right-0 h-[50vh] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, transparent, rgba(0, 2, 28, 0.7) 60%, rgba(0, 2, 28, 1))",
        }}
      />
    </div>
  );
}
