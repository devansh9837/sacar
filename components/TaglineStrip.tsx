"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { positioning as c } from "@/lib/content";

export default function TaglineStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-white py-16 md:py-24 z-10 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* ── Main positioning row ── */}
        <div className="flex items-center justify-center gap-5 md:gap-8 mb-8">

          {/* Left label */}
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#00021C]/25 uppercase"
          >
            Not Technical
          </motion.span>

          {/* Left line — draws in from center */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="w-10 md:w-20 h-px bg-[#00021C]/15 origin-right"
          />

          {/* DIPLOMATICAL — the star */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl md:text-5xl font-bold tracking-[0.06em] text-[#00021C] uppercase"
          >
            Diplomatical
          </motion.span>

          {/* Right line — draws in from center */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="w-10 md:w-20 h-px bg-[#00021C]/15 origin-left"
          />

          {/* Right label */}
          <motion.span
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#00021C]/25 uppercase"
          >
            Not Legal
          </motion.span>
        </div>

        {/* ── Tagline ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          className="text-base md:text-xl text-[#00021C]/45 max-w-xl mx-auto"
        >
          {c.tagline}
        </motion.p>

      </div>
    </section>
  );
}
