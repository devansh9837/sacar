"use client";

import { motion } from "framer-motion";
import Starfield from "./Starfield";
import { engagement as c } from "@/lib/content";

export default function Engagement() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-[#00021C]">
      <Starfield density={120} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            {c.heading}
          </h2>
          <p className="text-2xl text-[#C0C0C0]/80 max-w-2xl mx-auto mb-10">
            {c.subtitle}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <motion.button
            data-glow
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(192,192,192,0.15), 0 0 50px rgba(192,192,192,0.06)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="h-12 px-8 bg-[#C0C0C0]/10 backdrop-blur-md border border-[#C0C0C0]/20 text-white rounded-full font-display font-semibold hover:bg-[#C0C0C0]/18 hover:border-[#C0C0C0]/35 transition-all"
          >
            Contact Us
          </motion.button>
        </motion.div>


      </div>
    </section>
  );
}
