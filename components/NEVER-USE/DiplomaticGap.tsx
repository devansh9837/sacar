"use client";

import { motion } from "framer-motion";
import { Globe } from "../ui/globe";
import { TracingBeam } from "../ui/tracing-beam";
import Starfield from "../Starfield";

const timelineItems = [
  {
    year: "1967",
    title: "Outer Space Treaty",
    description: "Foundation of space law, but no diplomatic framework",
  },
  {
    year: "2020s",
    title: "New Space Race",
    description: "Private companies, new nations, conflicting interests",
  },
  {
    year: "2030s",
    title: "Lunar Settlements",
    description: "Resource disputes, territorial claims emerging",
  },
  {
    year: "2040s+",
    title: "Mars Colonization",
    description: "Governance void threatens human expansion",
  },
];

export default function DiplomaticGap() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#00021C]">
      {/* Starfield Background */}
      <Starfield density={40} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            The Diplomatic Void
          </h2>
          <p className="text-[#C0C0C0]/70 text-lg max-w-2xl mx-auto">
            As humanity reaches for the stars, our governance frameworks remain anchored to Earth.
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <div className="relative">
              <Globe className="opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00021C] via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Timeline with Tracing Beam */}
          <div className="relative">
            <TracingBeam className="pl-8">
              <div className="space-y-12">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative pl-8"
                  >
                    <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-[#C0C0C0]" />
                    <span className="font-mono text-sm text-[#C0C0C0]/60">{item.year}</span>
                    <h3 className="text-xl font-display font-bold text-white mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#C0C0C0]/70">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </TracingBeam>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { value: "100+", label: "Nations in space" },
            { value: "0", label: "Space diplomacy institutions" },
            { value: "2030", label: "Lunar settlement target" },
            { value: "∞", label: "Stakes for humanity" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-[#00021C]/80 backdrop-blur-md border border-[#C0C0C0]/10"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-[#C0C0C0]">
                {stat.value}
              </div>
              <div className="text-sm text-[#C0C0C0]/60 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
