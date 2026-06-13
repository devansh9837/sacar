"use client";

import { motion } from "framer-motion";
import Starfield from "./Starfield";
import { mission as c } from "@/lib/content";

export default function Mission() {
  return (
    <section id="mission" className="relative py-24 overflow-hidden bg-[#00021C]">
      <Starfield density={120} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#C0C0C0]/60 text-sm font-mono uppercase tracking-wider mb-3">
              {c.label}
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              {c.heading}
            </h2>
            <p className="text-[#C0C0C0]/80 text-lg mb-6">
              {c.paragraphs[0]}
            </p>
            <p className="text-[#C0C0C0]/70 mb-8">
              {c.paragraphs[1]}
            </p>

            {/* Key pillars */}
            <div className="space-y-4">
              {c.pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-[#C0C0C0]" />
                  <span className="text-[#C0C0C0]/80">{pillar}</span>
                </motion.div>
              ))}
            </div>


          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[500px] flex items-center justify-center"
          >
            {/* Orbital visualization */}
            <div className="relative w-full h-full">
              {/* Concentric orbit rings */}
              {[100, 160, 220, 280, 340].map((size, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C0C0C0]/10"
                  style={{ width: size, height: size }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              ))}

              {/* Central element - SACAR logo silhouette */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#C0C0C0]/20 to-transparent border border-[#C0C0C0]/30 flex items-center justify-center"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#C0C0C0]"
                >
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Orbiting dots */}
              {[
                { radius: 80, duration: 15, delay: 0 },
                { radius: 130, duration: 20, delay: 5 },
                { radius: 175, duration: 25, delay: 10 },
              ].map((orbit, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: orbit.radius * 2,
                    height: orbit.radius * 2,
                    marginLeft: -orbit.radius,
                    marginTop: -orbit.radius,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: orbit.duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="absolute w-3 h-3 rounded-full bg-[#C0C0C0]"
                    style={{ top: 0, left: "50%", marginLeft: -6 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
