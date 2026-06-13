"use client";

import { motion } from "framer-motion";
import Starfield from "./Starfield";
import { Globe } from "@/components/ui/globe";
import { perspective as c } from "@/lib/content";

export default function Perspective() {
  return (
    <section id="perspective" className="relative py-24 overflow-hidden bg-[#00021C]">
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
            <p className="text-4xl md:text-5xl font-display font-bold text-white mb-3 leading-tight">
              {c.label}
            </p>
            <p className="text-3xl md:text-4xl font-display font-bold text-white/70 mb-5 leading-tight">
              {c.name}
            </p>
            <h2 className="text-[#C0C0C0]/80 text-xl md:text-2xl font-mono uppercase tracking-wider mb-6 leading-tight">
              {c.heading}
            </h2>
            <p className="text-[#C0C0C0]/70 text-xl md:text-2xl leading-relaxed">
              {c.body}
            </p>
          </motion.div>

          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center -mx-6 lg:mx-0"
          >
            <Globe className="opacity-90" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
