"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Starfield from "./Starfield";
import { audiences } from "@/lib/data/audiences";
import { audience as c } from "@/lib/content";

/* ─── Sector card ─── */

function SectorCard({ title, image }: { title: string; image: string }) {
  return (
    <div className="relative rounded-xl overflow-hidden h-40 md:h-48 group cursor-default">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 33vw, 20vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
      <div className="absolute inset-0 rounded-xl border border-white/8" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <span className="font-display font-semibold text-lg text-white/90 leading-tight block">
          {title}
        </span>
      </div>
    </div>
  );
}

export default function Audience() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="audience"
      className="relative py-24 md:py-32 overflow-hidden bg-[#00021C]"
    >
      <Starfield density={100} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-4xl md:text-5xl font-display font-bold text-white mb-3 block">
            {c.label}
          </span>
          <h2 className="font-mono text-xl md:text-2xl lg:text-3xl tracking-[0.1em] text-[#C0C0C0]/80 uppercase mb-6">
            {c.heading}
          </h2>
          <p className="text-[#C0C0C0]/70 text-xl md:text-2xl max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </motion.div>

        {/* ── Entity cards — 3×2 grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {audiences.map((segment, i) => {
            const isHovered = hoveredIdx === i;
            const hasHover = hoveredIdx !== null;

            return (
              <div
                key={segment.id}
                className="relative rounded-xl overflow-hidden cursor-pointer h-[240px] md:h-[300px] transition-transform duration-500 ease-out"
                style={{
                  transform: isHovered
                    ? "scale(1.03)"
                    : hasHover
                      ? "scale(0.98)"
                      : "scale(1)",
                  zIndex: isHovered ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Background image */}
                <Image
                  src={segment.image}
                  alt={segment.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out"
                  style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/50" />

                {/* Navy overlay on hover */}
                <div
                  className="absolute inset-0 bg-[#00021C]/85 transition-opacity duration-500"
                  style={{ opacity: isHovered ? 1 : 0 }}
                />

                {/* Title */}
                <div className="absolute inset-0 z-10 p-5 md:p-6">
                  <h3 className="text-lg font-display font-bold text-white leading-tight">
                    {segment.title}
                  </h3>
                </div>

                {/* Description on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6 transition-opacity duration-500"
                  style={{ opacity: isHovered ? 1 : 0 }}
                >
                  <p className="text-lg text-[#C0C0C0]/70 leading-relaxed">
                    {segment.descriptor}
                  </p>
                </div>

                {/* Border */}
                <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none" />
              </div>
            );
          })}
        </motion.div>

        {/* ── Sectors grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              {c.sectors.label}
            </h2>
          </div>

          <div className="space-y-8">
            {c.sectors.tiers.map((tier, ti) => (
              <div key={tier.label}>
                {/* Tier label */}
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-mono text-2xl tracking-[0.1em] text-[#C0C0C0]/80 whitespace-nowrap">
                    {tier.label}
                  </span>
                  <div className="flex-1 h-px bg-[#C0C0C0]/10" />
                </div>

                {/* Tier cards */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: ti * 0.1 }}
                  className="grid grid-cols-3 gap-3"
                >
                  {tier.items.map((item) => (
                    <SectorCard key={item.id} title={item.title} image={item.image} />
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
