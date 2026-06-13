"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface GlobeProps {
  className?: string;
}

export function Globe({ className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.5,
      mapSamples: 16000,
      mapBrightness: 20,
      baseColor: [0.05, 0.05, 0.12], // Darker ocean for contrast
      markerColor: [1, 1, 1], // Bright white markers
      glowColor: [0.6, 0.6, 0.7], // Subtle silver glow
      markers: [
        // Major space powers
        { location: [38.9072, -77.0369], size: 0.1 }, // Washington DC, USA
        { location: [39.9042, 116.4074], size: 0.1 }, // Beijing, China
        { location: [28.6139, 77.209], size: 0.1 }, // New Delhi, India
        { location: [55.7558, 37.6173], size: 0.1 }, // Moscow, Russia
        { location: [48.8566, 2.3522], size: 0.07 }, // Paris, France
        { location: [35.6762, 139.6503], size: 0.07 }, // Tokyo, Japan
        { location: [-23.5505, -46.6333], size: 0.06 }, // São Paulo, Brazil
        { location: [-25.7479, 28.2293], size: 0.06 }, // Pretoria, South Africa
        { location: [51.5074, -0.1278], size: 0.06 }, // London, UK
        { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
        { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney, Australia
        { location: [31.2304, 121.4737], size: 0.06 }, // Shanghai, China
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
}
