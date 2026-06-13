"use client";

import { motion } from "framer-motion";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const briefings = [
  {
    quote:
      "As lunar settlements become reality, the Outer Space Treaty's prohibition on national appropriation faces unprecedented challenges. New frameworks are urgently needed.",
    name: "Lunar Governance Brief",
    title: "Research Paper • 2024",
  },
  {
    quote:
      "The proliferation of mega-constellations demands coordinated orbital traffic management. Without diplomatic solutions, collision risks threaten all space activities.",
    name: "Orbital Commons Report",
    title: "Policy Analysis • 2024",
  },
  {
    quote:
      "Space resource utilization requires balancing national interests with humanity's common heritage. SACAR proposes a graduated licensing framework.",
    name: "Resource Rights Framework",
    title: "White Paper • 2024",
  },
  {
    quote:
      "Military space activities increasingly blur with civilian uses. Establishing norms of responsible behavior is essential to prevent escalation.",
    name: "Space Security Analysis",
    title: "Strategic Brief • 2024",
  },
  {
    quote:
      "Small nations deserve a voice in space governance. Our diplomatic training program prepares representatives from emerging spacefaring nations.",
    name: "Inclusive Space Initiative",
    title: "Program Report • 2024",
  },
];

export default function Briefings() {
  return (
    <section id="briefings" className="relative py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#00021C] mb-4">
            Latest Briefings
          </h2>
          <p className="text-[#00021C]/60 text-lg max-w-2xl mx-auto">
            Insights and analysis on the critical issues shaping space governance.
          </p>
        </motion.div>

        {/* Infinite moving cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <InfiniteMovingCards
            items={briefings}
            direction="left"
            speed="slow"
          />
        </motion.div>

        {/* Second row moving opposite direction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <InfiniteMovingCards
            items={[...briefings].reverse()}
            direction="right"
            speed="slow"
          />
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#00021C]/70 hover:text-[#00021C] transition-colors font-display"
          >
            View All Publications
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
