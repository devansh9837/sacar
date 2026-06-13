"use client";

import { motion } from "framer-motion";
import diplomacyActivities from "@/lib/diplomacy-activities";
import Starfield from "../Starfield";

export default function SpaceDiplomacyActivities() {
  return (
    <section
      id="diplomacy-activities"
      className="relative py-24 md:py-32 overflow-hidden bg-[#00021C]"
      aria-labelledby="activities-heading"
    >
      {/* Starfield background */}
      <Starfield density={30} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(192,192,192,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-mono text-[#C0C0C0]/50 uppercase tracking-widest mb-3">
            The Diplomatic Toolkit
          </p>
          <h2
            id="activities-heading"
            className="text-3xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Space Diplomacy Activities
          </h2>
          <p className="text-[#C0C0C0]/70 text-lg max-w-2xl mx-auto">
            The instruments and arenas through which nations negotiate,
            cooperate, and compete in the space domain.
          </p>
        </motion.div>

        {/* Activities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {diplomacyActivities.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: "easeOut",
                }}
                className="group relative rounded-xl border border-[#C0C0C0]/10
                           bg-[#00021C]/60 backdrop-blur-sm
                           p-6 md:p-7
                           hover:border-[#C0C0C0]/25 hover:-translate-y-1
                           transition-all duration-300 ease-out"
                style={{
                  boxShadow:
                    "0 2px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(192,192,192,0.04)",
                }}
              >
                {/* Top row: icon + symbol badge */}
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="flex items-center justify-center w-11 h-11 rounded-lg
                               bg-[#C0C0C0]/8 border border-[#C0C0C0]/10
                               group-hover:bg-[#C0C0C0]/12 group-hover:border-[#C0C0C0]/20
                               transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5 text-[#C0C0C0]" />
                  </span>
                  <span className="text-[10px] font-mono text-[#C0C0C0]/35 uppercase tracking-wider mt-1">
                    {activity.symbol}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-display font-semibold text-white mb-2 leading-snug">
                  {activity.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#C0C0C0]/60 leading-relaxed">
                  {activity.description}
                </p>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px
                             bg-gradient-to-r from-transparent via-[#C0C0C0]/0 to-transparent
                             group-hover:via-[#C0C0C0]/20
                             transition-all duration-500"
                  aria-hidden
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 text-[#C0C0C0]/30">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C0C0C0]/20" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
              13 Instruments of Space Diplomacy
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C0C0C0]/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
