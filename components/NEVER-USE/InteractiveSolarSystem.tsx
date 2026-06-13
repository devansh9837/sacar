"use client";

import { motion } from "framer-motion";

interface Planet {
  name: string;
  size: number;
  orbitRadius: number;
  orbitDuration: number;
  color: string;
  secondaryColor?: string;
  hasRing?: boolean;
  hasAtmosphere?: boolean;
  atmosphereColor?: string;
  initialAngle: number;
}

const planets: Planet[] = [
  { name: "Mercury", size: 8, orbitRadius: 45, orbitDuration: 8, color: "#B0A090", secondaryColor: "#8A7A6A", initialAngle: 45 },
  { name: "Venus", size: 12, orbitRadius: 70, orbitDuration: 12, color: "#E8C88A", secondaryColor: "#D4A862", hasAtmosphere: true, atmosphereColor: "#FFE4B5", initialAngle: 180 },
  { name: "Earth", size: 14, orbitRadius: 100, orbitDuration: 16, color: "#4A90A4", secondaryColor: "#3A7084", hasAtmosphere: true, atmosphereColor: "#87CEEB", initialAngle: 270 },
  { name: "Mars", size: 10, orbitRadius: 130, orbitDuration: 20, color: "#C84C32", secondaryColor: "#A03020", initialAngle: 120 },
  { name: "Jupiter", size: 28, orbitRadius: 175, orbitDuration: 30, color: "#D4A574", secondaryColor: "#B8956A", hasAtmosphere: true, atmosphereColor: "#F4D9B0", initialAngle: 320 },
  { name: "Saturn", size: 24, orbitRadius: 220, orbitDuration: 40, color: "#E8D4A8", secondaryColor: "#D4C090", hasRing: true, initialAngle: 200 },
  { name: "Uranus", size: 18, orbitRadius: 260, orbitDuration: 55, color: "#A8E8E8", secondaryColor: "#88C8D8", hasAtmosphere: true, atmosphereColor: "#B0F0F0", initialAngle: 90 },
  { name: "Neptune", size: 17, orbitRadius: 295, orbitDuration: 70, color: "#4169E1", secondaryColor: "#3050B0", hasAtmosphere: true, atmosphereColor: "#6080FF", initialAngle: 15 },
];

// 3D Planet Component
function Planet3D({ planet }: { planet: Planet }) {
  const { size, color, secondaryColor, hasRing, hasAtmosphere, atmosphereColor } = planet;
  
  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Atmosphere glow */}
      {hasAtmosphere && (
        <div
          className="absolute rounded-full blur-sm"
          style={{
            width: size * 1.3,
            height: size * 1.3,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${atmosphereColor}40 0%, transparent 70%)`,
          }}
        />
      )}
      
      {/* Saturn's rings - behind planet */}
      {hasRing && (
        <>
          {/* Outer ring */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: size * 2.4,
              height: size * 0.8,
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(232, 212, 168, 0.1) 10%,
                rgba(232, 212, 168, 0.3) 20%,
                rgba(232, 212, 168, 0.4) 30%,
                rgba(200, 180, 140, 0.3) 50%,
                rgba(232, 212, 168, 0.4) 70%,
                rgba(232, 212, 168, 0.3) 80%,
                rgba(232, 212, 168, 0.1) 90%,
                transparent 100%
              )`,
              borderRadius: "50%",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) rotateX(75deg)",
              boxShadow: "inset 0 0 10px rgba(232, 212, 168, 0.2)",
            }}
          />
          {/* Inner ring gap */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: size * 1.6,
              height: size * 0.5,
              background: "transparent",
              border: "2px solid rgba(232, 212, 168, 0.2)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) rotateX(75deg)",
            }}
          />
        </>
      )}

      {/* Planet sphere with 3D effect */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          left: 0,
          top: 0,
          // Multi-layered gradient for 3D sphere effect
          background: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 40%),
            radial-gradient(circle at 30% 30%, ${color} 0%, ${secondaryColor || color} 50%, rgba(0,0,0,0.6) 100%)
          `,
          boxShadow: `
            inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0,0,0,0.5),
            inset ${size * 0.05}px ${size * 0.05}px ${size * 0.2}px rgba(255,255,255,0.2),
            0 0 ${size * 0.3}px rgba(0,0,0,0.3)
          `,
        }}
      >
        {/* Highlight reflection */}
        <div
          className="absolute rounded-full"
          style={{
            width: size * 0.3,
            height: size * 0.2,
            left: "20%",
            top: "15%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)",
            transform: "rotate(-30deg)",
          }}
        />
        
        {/* Secondary highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: size * 0.15,
            height: size * 0.1,
            left: "15%",
            top: "25%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 70%)",
            transform: "rotate(-30deg)",
          }}
        />

        {/* Terminator line (day/night boundary) */}
        <div
          className="absolute"
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(105deg, transparent 45%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.5) 100%)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Rim light effect */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size,
          height: size,
          left: 0,
          top: 0,
          background: `radial-gradient(circle at 80% 80%, rgba(255,200,150,0.15) 0%, transparent 50%)`,
          boxShadow: `inset -1px -1px ${size * 0.1}px rgba(255,200,150,0.1)`,
        }}
      />
    </div>
  );
}

export default function InteractiveSolarSystem() {
  return (
    <div
      className="relative w-full h-[600px] flex items-center justify-center select-none pointer-events-none"
      style={{
        perspective: 1200,
      }}
    >
      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Sun */}
        <div 
          className="absolute z-20"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Sun glow layers */}
          <div className="absolute -inset-8 rounded-full bg-orange-500/10 blur-2xl" />
          <div className="absolute -inset-6 rounded-full bg-orange-400/15 blur-xl" />
          <div className="absolute -inset-4 rounded-full bg-yellow-500/25 blur-lg" />
          <div className="absolute -inset-2 rounded-full bg-yellow-400/30 blur-md" />
          
          {/* Sun core - 40px x 40px */}
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-[40px] h-[40px] rounded-full overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, #FFFAF0 0%, #FFE4B5 20%, #FFD700 40%, #FFA500 70%, #FF6B00 100%)
              `,
              boxShadow: `
                inset -3px -3px 8px rgba(255, 100, 0, 0.5),
                inset 2px 2px 5px rgba(255, 255, 200, 0.4),
                0 0 50px 20px rgba(255, 165, 0, 0.4),
                0 0 80px 35px rgba(255, 100, 0, 0.2)
              `,
            }}
          />
        </div>

        {/* Orbital paths */}
        {planets.map((planet) => (
          <div
            key={`orbit-${planet.name}`}
            className="absolute rounded-full border border-[#C0C0C0]/10"
            style={{
              width: planet.orbitRadius * 2,
              height: planet.orbitRadius * 2,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Planets */}
        {planets.map((planet) => {
          // Calculate keyframes for circular motion
          const angleToRadians = (angle: number) => (angle * Math.PI) / 180;
          const initialRad = angleToRadians(planet.initialAngle);
          const numSteps = 72; // Keyframes for smooth circle approximation
          const xKeyframes = [];
          const yKeyframes = [];
          
          for (let i = 0; i <= numSteps; i++) {
            const angle = initialRad + (i / numSteps) * (Math.PI * 2);
            xKeyframes.push(Math.cos(angle) * planet.orbitRadius - planet.size / 2);
            yKeyframes.push(Math.sin(angle) * planet.orbitRadius - planet.size / 2);
          }
          
          return (
            <motion.div
              key={planet.name}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                x: xKeyframes[0], // Set initial position to avoid jump
                y: yKeyframes[0],
              }}
              animate={{
                x: xKeyframes,
                y: yKeyframes,
              }}
              transition={{
                duration: planet.orbitDuration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Planet3D planet={planet} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
