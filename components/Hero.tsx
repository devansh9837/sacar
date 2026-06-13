"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Image from "next/image";
import { hero } from "@/lib/content";

const Hero3DScene = dynamic(() => import("./Hero3DScene"), { ssr: false });

export default function Hero() {
  return (
    <section id="hero-section" className="relative min-h-[100svh] overflow-hidden bg-transparent">
      {/* 3D orbital scene */}
      <Hero3DScene />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00021C]/30 via-transparent to-[#00021C]/60 pointer-events-none z-[1]" />


      {/* Content — positioned near top */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-28 md:pt-36 pb-24 flex flex-col items-center text-center">
        {/* Headline */}
        <TextGenerateEffect
          words={hero.headline}
          className="text-4xl md:text-5xl lg:text-[56px] font-display text-white mb-6 leading-tight"
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <Image
            src="/SACAR_vector.svg"
            alt="SACAR Logo"
            width={360}
            height={360}
            className="w-[240px] h-[240px] md:w-[360px] md:h-[360px] drop-shadow-[0_0_40px_rgba(192,192,192,0.15)]"
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="font-mono text-xl md:text-2xl tracking-[0.1em] uppercase text-white/90 mb-8 flex flex-col items-center gap-2 md:flex-row md:gap-0"
          style={{ textShadow: "0 0 20px rgba(0,2,28,0.9), 0 0 40px rgba(0,2,28,0.7), 0 0 60px rgba(0,2,28,0.5)" }}
        >
          {hero.pills.map((pill, i) => (
            <span key={pill} className="flex items-center">
              {pill}
              {i < hero.pills.length - 1 && (
                <span className="hidden md:inline-block mx-3 md:mx-4 text-[#C0C0C0]/25">|</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="relative"
        >
          {/* Rocket target marker */}
          <div id="rocket-target" className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-1" />
          <motion.a
            id="hero-cta-btn"
            href="#contact"
            data-glow
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(192,192,192,0.15), 0 0 50px rgba(192,192,192,0.06)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-block h-12 px-8 leading-[48px] bg-[#C0C0C0]/10 backdrop-blur-md border border-[#C0C0C0]/20 text-white rounded-full font-display font-semibold hover:bg-[#C0C0C0]/18 hover:border-[#C0C0C0]/35 transition-all"
          >
            {hero.primaryCta}
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#C0C0C0]/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-[#C0C0C0]/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
