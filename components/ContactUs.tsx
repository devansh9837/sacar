"use client";

import { motion } from "framer-motion";
import Starfield from "./Starfield";
import { contactUs as c } from "@/lib/content";

export default function ContactUs() {
  return (
    <section className="relative py-20 overflow-hidden bg-[#00021C]">
      <Starfield density={60} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
        </motion.div>
      </div>
    </section>
  );
}
