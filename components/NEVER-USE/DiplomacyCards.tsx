"use client";

import { motion } from "framer-motion";
import {
  IconFlask,
  IconScale,
  IconWorld,
} from "@tabler/icons-react";

/* ─── Card data ─── */
const cards = [
  {
    title: "Technical Know-How",
    badge: "THE SPICES",
    line: "Propulsion · Rockets · Payload · Subsystems",
    Icon: IconFlask,
    iconSize: 32,
    hoverAnim: { rotate: [-5, 5, -5] },
    hero: false,
  },
  {
    title: "Legal Know-How",
    badge: "THE COOKING OIL",
    line: "Treaties · Laws · Rules · Regulations",
    Icon: IconScale,
    iconSize: 32,
    hoverAnim: { scale: 1.1 },
    hero: false,
  },
  {
    title: "Space Diplomacy",
    badge: "THE DISH",
    line: "Treaties · Accords · Policy Directives · Negotiations",
    Icon: IconWorld,
    iconSize: 40,
    hoverAnim: {},
    hero: true,
  },
];

/* ─── Archived: "What Space Diplomacy Entails" 3-card grid ─── */
export default function DiplomacyCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
          className={`group relative rounded-xl border bg-[#00021C]/80 backdrop-blur-md p-8 flex flex-col items-center text-center ${
            card.hero
              ? "border-[#C0C0C0]/40 shadow-[0_0_32px_rgba(192,192,192,0.25)] md:py-12"
              : "border-[#C0C0C0]/20"
          }`}
        >
          {/* Icon */}
          <div className="mb-4">
            <card.Icon size={card.iconSize} className="text-[#C0C0C0]" />
          </div>

          {/* Badge */}
          <span
            className={`inline-block border rounded-full px-3 py-0.5 font-mono tracking-widest mb-3 ${
              card.hero
                ? "border-[#C0C0C0]/50 text-[#C0C0C0]/80 text-xs"
                : "border-[#C0C0C0]/30 text-[#C0C0C0]/50 text-[10px]"
            }`}
          >
            {card.badge}
          </span>

          {/* Title */}
          <h3 className="text-lg font-display font-bold text-white mb-2">
            {card.title}
          </h3>

          {/* One line */}
          <p className="text-xs font-mono text-[#C0C0C0]/50 tracking-wide">
            {card.line}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
