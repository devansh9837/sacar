"use client";

import { motion } from "framer-motion";
import { services as c } from "@/lib/content";
import Starfield from "./Starfield";

/* ─── Service Visualization: SVG diagrams for each pillar ─── */

function NormRingsViz() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" fill="none">
      {/* Concentric norm rings */}
      {[80, 60, 40, 24].map((r, i) => (
        <circle
          key={r}
          cx={150}
          cy={95}
          r={r}
          stroke={`rgba(0, 2, 28, ${0.06 + i * 0.03})`}
          strokeWidth="0.5"
          strokeDasharray={i % 2 === 0 ? "none" : "4 4"}
        />
      ))}
      {/* Center node */}
      <circle cx={150} cy={95} r={6} fill="rgba(0, 2, 28, 0.6)" />
      <circle cx={150} cy={95} r={10} fill="rgba(0, 2, 28, 0.06)" />
      {/* Multilateral connection nodes */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = Math.round((150 + Math.cos(rad) * 65) * 100) / 100;
        const y = Math.round((95 + Math.sin(rad) * 65) * 100) / 100;
        return (
          <g key={deg}>
            <line
              x1={150} y1={95} x2={x} y2={y}
              stroke="rgba(0, 2, 28, 0.08)"
              strokeWidth="0.5"
            />
            <circle
              cx={x} cy={y}
              r={2 + (i % 2)}
              fill={`rgba(0, 2, 28, ${0.25 + (i % 3) * 0.1})`}
            />
          </g>
        );
      })}
    </svg>
  );
}

function AllianceMapViz() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" fill="none">
      {/* Two coalition arcs */}
      <path
        d="M 40 140 Q 150 30 260 140"
        stroke="rgba(0, 2, 28, 0.12)"
        strokeWidth="1"
      />
      <path
        d="M 60 150 Q 150 60 240 150"
        stroke="rgba(0, 2, 28, 0.08)"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />
      {/* Horizon line */}
      <line
        x1={20} y1={145} x2={280} y2={145}
        stroke="rgba(0, 2, 28, 0.06)"
        strokeWidth="0.5"
      />
      {/* Coalition nodes — left cluster */}
      {[
        { x: 60, y: 130 }, { x: 80, y: 115 }, { x: 55, y: 108 },
        { x: 95, y: 125 }, { x: 70, y: 98 },
      ].map((p, i) => (
        <circle key={`l${i}`} cx={p.x} cy={p.y} r={2.5 - i * 0.2} fill={`rgba(0, 2, 28, ${0.3 + i * 0.05})`} />
      ))}
      {/* Coalition nodes — right cluster */}
      {[
        { x: 240, y: 130 }, { x: 220, y: 112 }, { x: 245, y: 105 },
        { x: 205, y: 122 }, { x: 230, y: 95 },
      ].map((p, i) => (
        <circle key={`r${i}`} cx={p.x} cy={p.y} r={2.5 - i * 0.2} fill={`rgba(0, 2, 28, ${0.3 + i * 0.05})`} />
      ))}
      {/* Center tension point */}
      <circle cx={150} cy={85} r={4} fill="rgba(0, 2, 28, 0.5)" />
      <circle cx={150} cy={85} r={8} fill="rgba(0, 2, 28, 0.05)" />
    </svg>
  );
}

function GovernanceLayersViz() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" fill="none">
      {/* Stacked governance strata */}
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 40 + i * 30;
        const indent = i * 8;
        return (
          <g key={i}>
            <rect
              x={30 + indent}
              y={y}
              width={240 - indent * 2}
              height={22}
              rx={3}
              fill={`rgba(0, 2, 28, ${0.03 + i * 0.01})`}
              stroke={`rgba(0, 2, 28, ${0.06 + i * 0.02})`}
              strokeWidth="0.5"
            />
            {/* Indicator bars within each stratum */}
            {[0, 1, 2].map((j) => (
              <rect
                key={j}
                x={40 + indent + j * 70}
                y={y + 8}
                width={20 + (j === 1 ? 15 : 0)}
                height={3}
                rx={1.5}
                fill={`rgba(0, 2, 28, ${0.08 + j * 0.04})`}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

const vizComponents = [NormRingsViz, AllianceMapViz, GovernanceLayersViz];

/* ─── Service Panel ─── */

function ServicePanel({
  pillar,
  index,
}: {
  pillar: (typeof c.pillars)[number];
  index: number;
}) {
  const Viz = vizComponents[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="gradient-hover-card-light p-6 md:p-8 flex flex-col"
    >
      {/* Visualization area */}
      <div className="h-[180px] md:h-[200px] mb-6 flex items-center justify-center opacity-70">
        <Viz />
      </div>

      {/* Title */}
      <h3 className="text-lg font-display font-bold text-[#00021C] mb-2">
        {pillar.title}
      </h3>
      <p className="text-sm text-[#00021C]/40 leading-relaxed mb-6">
        {pillar.summary}
      </p>

      {/* Sub-service pathways */}
      <div className="mt-auto space-y-3 pt-4 border-t border-[#00021C]/6">
        {pillar.subServices.map((sub) => (
          <div key={sub.title} className="flex items-center gap-3 group">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00021C]/15 group-hover:bg-[#00021C]/40 transition-colors flex-shrink-0" />
            <span className="text-sm font-display font-medium text-[#00021C]/55 group-hover:text-[#00021C]/80 transition-colors">
              {sub.title}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-40 overflow-hidden bg-white">
      <Starfield density={100} color="#00021C" />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,2,28,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,2,28,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle atmospheric depth on white */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#e8edf5]/60 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="font-mono text-xl md:text-2xl tracking-[0.1em] text-[#00021C]/70 uppercase mb-3 block">
            {c.label}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#00021C] mb-6">
            {c.heading}
          </h2>
          <p className="text-[#00021C]/70 text-2xl md:text-3xl max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </motion.div>

        {/* Three service panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.pillars.map((pillar, i) => (
            <ServicePanel key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <button className="h-12 px-10 bg-[#00021C]/5 backdrop-blur-sm border border-[#00021C]/12 text-[#00021C] rounded-full font-display font-semibold text-[15px] hover:bg-[#00021C]/10 hover:border-[#00021C]/25 transition-all">
            {c.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
