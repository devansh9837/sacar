"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { motion, useInView, PanInfo } from "framer-motion";
import { differentiators } from "@/lib/data/differentiators";
import { differentiator as c } from "@/lib/content";
import Starfield from "./Starfield";

type CardId = "technical" | "diplomatic" | "legal";
const CARD_ORDER: CardId[] = ["technical", "diplomatic", "legal"];

function getDesktopAnimate(
  cardId: CardId,
  activeCard: CardId,
  isInView: boolean
) {
  if (!isInView) {
    if (cardId === "diplomatic") return { x: -200, y: 80, rotate: 0, opacity: 0, scale: 0.9, zIndex: 20 };
    if (cardId === "technical")  return { x: -420, y: 30, rotate: -12, opacity: 0, scale: 1, zIndex: 10 };
    return { x: 120, y: 30, rotate: 12, opacity: 0, scale: 1, zIndex: 10 };
  }

  const isActive = cardId === activeCard;
  if (isActive) {
    const isWide = cardId === "diplomatic";
    return { x: isWide ? -200 : -150, y: 0, rotate: 0, opacity: 1, scale: isWide ? 1 : 1.08, zIndex: 20 };
  }

  const isLeft =
    (activeCard === "diplomatic" && cardId === "technical") ||
    (activeCard === "technical" && cardId === "diplomatic") ||
    (activeCard === "legal" && cardId === "technical");

  return {
    x: isLeft ? -380 : 80,
    y: 30,
    rotate: isLeft ? -12 : 12,
    opacity: 0.55,
    scale: 1,
    zIndex: 10,
  };
}

function getMobileAnimate(
  cardId: CardId,
  activeCard: CardId,
  isInView: boolean
) {
  if (!isInView) return { x: 0, y: 20, rotate: 0, opacity: 0, scale: 0.95, zIndex: 10 };

  const activeIdx = CARD_ORDER.indexOf(activeCard);
  const cardIdx = CARD_ORDER.indexOf(cardId);
  const deckPos = (cardIdx - activeIdx + 3) % 3;

  // deckPos 0 = active (on top), 1 = peeks left edge, 2 = peeks right edge
  if (deckPos === 0) return { x: -120, y: 0, rotate: 0, opacity: 1,   scale: 1, zIndex: 30 };
  if (deckPos === 1) return { x: -152, y: 0, rotate: 0, opacity: 0.75, scale: 1, zIndex: 20 };
  return               { x: -88,  y: 0, rotate: 0, opacity: 0.75, scale: 1, zIndex: 10 };
}

const cardTransition = { type: "spring" as const, stiffness: 180, damping: 26 };

export default function Differentiator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const diplomaticCardRef = useRef<HTMLDivElement>(null);
  const [cardMinHeight, setCardMinHeight] = useState<number | undefined>(undefined);
  const [activeCard, setActiveCard] = useState<CardId>("diplomatic");

  useLayoutEffect(() => {
    if (diplomaticCardRef.current) {
      setCardMinHeight(diplomaticCardRef.current.offsetHeight);
    }
  }, []);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const handleSwipe = (direction: "left" | "right") => {
    setActiveCard((current) => {
      const idx = CARD_ORDER.indexOf(current);
      return direction === "left"
        ? CARD_ORDER[(idx + 1) % 3]
        : CARD_ORDER[(idx - 1 + 3) % 3];
    });
  };

  const handlePanEnd = (_: PointerEvent, info: PanInfo) => {
    const SWIPE_THRESHOLD = 50;
    if (
      Math.abs(info.offset.x) > Math.abs(info.offset.y) * 1.5 &&
      Math.abs(info.offset.x) > SWIPE_THRESHOLD
    ) {
      handleSwipe(info.offset.x < 0 ? "left" : "right");
    }
  };

  const technical = differentiators.find((d) => d.id === "technical")!;
  const legal = differentiators.find((d) => d.id === "legal")!;
  const diplomatic = differentiators.find((d) => d.id === "diplomatic")!;

  return (
    <section
      id="about"
      className="relative pt-40 md:pt-56 pb-24 md:pb-32 overflow-hidden bg-[#00021C]"
    >
      <Starfield density={100} />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight block">
            {c.differenceLabel}
          </span>
          <h2 className="font-mono text-2xl md:text-3xl tracking-wider text-[#C0C0C0]/80 uppercase mb-8 leading-tight">
            {c.differenceHeading}
          </h2>
          <p className="text-[#C0C0C0]/70 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            {c.positioningStatement}
          </p>
        </motion.div>

        {/* ── Card stacking layout ── */}
        <div ref={containerRef} className="relative">
          {/* Mobile fanned layout */}
          <motion.div
            className="md:hidden relative h-[360px] touch-pan-y"
            onPanEnd={handlePanEnd}
          >
            {/* Technical */}
            <motion.div
              animate={getMobileAnimate("technical", activeCard, isInView)}
              transition={cardTransition}
              onClick={() => { if (activeCard !== "technical") setActiveCard("technical"); }}
              className="absolute"
              style={{ left: "50%", top: 0, width: 240, cursor: activeCard !== "technical" ? "pointer" : "default" }}
            >
              <div className="bg-[#0d1535] border border-[#C0C0C0]/20 p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]" style={{ minHeight: cardMinHeight }}>
                <h4 className="text-xl font-display font-bold mb-3 text-[#C0C0C0]">{technical.title}</h4>
                {technical.domains && (
                  <div className="grid grid-cols-1 gap-y-1.5 cursor-default">
                    {technical.domains.map((d) => (
                      <span key={d} className="text-lg font-mono text-[#C0C0C0]/60 select-none">{d}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Legal */}
            <motion.div
              animate={getMobileAnimate("legal", activeCard, isInView)}
              transition={cardTransition}
              onClick={() => { if (activeCard !== "legal") setActiveCard("legal"); }}
              className="absolute"
              style={{ left: "50%", top: 0, width: 240, cursor: activeCard !== "legal" ? "pointer" : "default" }}
            >
              <div className="bg-[#0d1535] border border-[#C0C0C0]/20 p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]" style={{ minHeight: cardMinHeight }}>
                <h4 className="text-xl font-display font-bold mb-3 text-[#C0C0C0]">{legal.title}</h4>
                {legal.domains && (
                  <div className="grid grid-cols-1 gap-y-1.5 cursor-default">
                    {legal.domains.map((d) => (
                      <span key={d} className="text-lg font-mono text-[#C0C0C0]/60 select-none">{d}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Diplomatic */}
            <motion.div
              animate={getMobileAnimate("diplomatic", activeCard, isInView)}
              transition={cardTransition}
              onClick={() => { if (activeCard !== "diplomatic") setActiveCard("diplomatic"); }}
              className="absolute"
              style={{ left: "50%", top: 0, width: 240, cursor: activeCard !== "diplomatic" ? "pointer" : "default" }}
            >
              <div ref={diplomaticCardRef} className="bg-white p-6 rounded-xl border border-[#00021C]/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                <h4 className="text-xl font-display font-bold mb-3 text-[#00021C]">{diplomatic.title}</h4>
                {diplomatic.domains && (
                  <div className="grid grid-cols-1 gap-y-1.5 cursor-default">
                    {diplomatic.domains.map((d) => (
                      <span key={d} className="text-lg font-mono text-[#00021C]/60 select-none">{d}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Dot indicators — mobile only */}
          <div className="flex justify-center gap-2.5 mt-5 md:hidden">
            {CARD_ORDER.map((id) => (
              <button
                key={id}
                onClick={() => setActiveCard(id)}
                className={`rounded-full transition-all duration-300 ${
                  activeCard === id
                    ? "w-4 h-1.5 bg-[#C0C0C0]"
                    : "w-1.5 h-1.5 bg-[#C0C0C0]/30"
                }`}
              />
            ))}
          </div>

          {/* Desktop layout — click-to-center angled cards */}
          <motion.div
            className="hidden md:flex justify-center items-start relative h-[520px] touch-pan-y"
            onPanEnd={handlePanEnd}
          >
            {/* Technical */}
            <motion.div
              animate={getDesktopAnimate("technical", activeCard, isInView)}
              transition={cardTransition}
              onClick={() => { if (activeCard !== "technical") setActiveCard("technical"); }}
              className="absolute"
              style={{ left: "50%", top: 0, width: 300, cursor: activeCard !== "technical" ? "pointer" : "default" }}
            >
              <div className="bg-[#0d1535] border border-[#C0C0C0]/20 p-6 md:p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <h4 className="text-xl font-display font-bold mb-3 text-[#C0C0C0]">{technical.title}</h4>
                {technical.domains && (
                  <div className="grid grid-cols-1 gap-y-1.5 cursor-default">
                    {technical.domains.map((d) => (
                      <span key={d} className="text-lg font-mono text-[#C0C0C0]/60 select-none">{d}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Legal */}
            <motion.div
              animate={getDesktopAnimate("legal", activeCard, isInView)}
              transition={cardTransition}
              onClick={() => { if (activeCard !== "legal") setActiveCard("legal"); }}
              className="absolute"
              style={{ left: "50%", top: 0, width: 300, cursor: activeCard !== "legal" ? "pointer" : "default" }}
            >
              <div className="bg-[#0d1535] border border-[#C0C0C0]/20 p-6 md:p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <h4 className="text-xl font-display font-bold mb-3 text-[#C0C0C0]">{legal.title}</h4>
                {legal.domains && (
                  <div className="grid grid-cols-1 gap-y-1.5 cursor-default">
                    {legal.domains.map((d) => (
                      <span key={d} className="text-lg font-mono text-[#C0C0C0]/60 select-none">{d}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Diplomatic — white card */}
            <motion.div
              animate={getDesktopAnimate("diplomatic", activeCard, isInView)}
              transition={cardTransition}
              onClick={() => { if (activeCard !== "diplomatic") setActiveCard("diplomatic"); }}
              className="absolute"
              style={{ left: "50%", top: 0, width: 400, cursor: activeCard !== "diplomatic" ? "pointer" : "default" }}
            >
              <div className="rounded-xl bg-white border border-[#00021C]/10 shadow-[0_0_30px_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="p-8 md:p-10">
                  <h4 className="text-xl font-display font-bold mb-4 text-[#00021C]">{diplomatic.title}</h4>
                  {diplomatic.domains && (
                    <div className="grid grid-cols-1 gap-y-1.5 cursor-default">
                      {diplomatic.domains.map((d) => (
                        <span key={d} className="text-lg font-mono text-[#00021C]/60 select-none">{d}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footnote */}
      </div>
    </section>
  );
}
