"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { diplomacyFramework as c } from "@/lib/content";
import Starfield from "./Starfield";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Card content ─── */

interface CardContent {
  label: string;
  mobileLabel?: string;
  sub?: string;
  image: string;
  images?: string[];
  featured?: boolean;
}

const cardContent: Record<string, CardContent> = {
  tech:    { label: c.nodes.technical,   image: "/new-assets/Space-Technologies.png" },
  legal:   { label: c.nodes.legal,       image: "/new-assets/Space-Law.png" },
  affairs: { label: c.nodes.affairs,     image: "/new-assets/Space-Affairs.png" },
  gov:     { label: c.nodes.governance,  mobileLabel: c.nodes.govMobile,  image: "/new-assets/Space-Governance.png" },
  geo:     { label: c.nodes.geopolitics, image: "/new-assets/Geopolitics.png" },
  power:   { label: c.nodes.power,       mobileLabel: c.nodes.powerMobile, image: "/new-assets/Space-Powers.png" },
  diplo:   { label: c.nodes.diplomacy,   image: "/new-assets/Space-Diplomacy-1.png", images: ["/new-assets/Space-Diplomacy-1.png", "/new-assets/Space-Diplomacy-2.png", "/new-assets/Space-Diplomacy-3.png"], featured: true },
  ir:      { label: c.nodes.ir, image: "/assets/International relations.jpg" },
};

/* ─── Layout coordinates ─── */

interface CardRect {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

// Desktop: 900 × 960 — 5-level pyramid
const DT = { W: 900, H: 960 };
const dtCards: CardRect[] = [
  // Level 1
  { id: "tech",    x: 80,  y: 0,   w: 260, h: 150 },
  { id: "legal",   x: 560, y: 0,   w: 260, h: 150 },
  // Level 2
  { id: "affairs", x: 250, y: 200, w: 400, h: 150 },
  // Level 3
  { id: "gov",     x: 0,   y: 400, w: 260, h: 150 },
  { id: "geo",     x: 320, y: 400, w: 260, h: 150 },
  { id: "power",   x: 640, y: 400, w: 260, h: 150 },
  // Level 4 — 3-panel triptych
  { id: "diplo",   x: 175, y: 600, w: 550, h: 200 },
  // Level 5
  { id: "ir",      x: 175, y: 850, w: 550, h: 110 },
];

const dtLines = [
  // Level 1 → Level 2
  { id: "tech-affairs",   d: "M 210 150 C 210 175, 450 175, 450 200" },
  { id: "legal-affairs",  d: "M 690 150 C 690 175, 450 175, 450 200" },
  // Level 2 → Level 3
  { id: "affairs-gov",    d: "M 450 350 C 450 375, 130 375, 130 400" },
  { id: "affairs-geo",    d: "M 450 350 L 450 400" },
  { id: "affairs-power",  d: "M 450 350 C 450 375, 770 375, 770 400" },
  // Level 3 → Level 4
  { id: "gov-diplo",      d: "M 130 550 C 130 575, 450 575, 450 600" },
  { id: "geo-diplo",      d: "M 450 550 L 450 600" },
  { id: "power-diplo",    d: "M 770 550 C 770 575, 450 575, 450 600" },
  // Level 4 → Level 5
  { id: "diplo-ir",       d: "M 450 800 L 450 850" },
];

// Mobile: 310 × 720 — compact 5-level pyramid
const MB = { W: 310, H: 720 };
const mbCards: CardRect[] = [
  // Level 1
  { id: "tech",    x: 5,   y: 0,   w: 142, h: 100 },
  { id: "legal",   x: 163, y: 0,   w: 142, h: 100 },
  // Level 2
  { id: "affairs", x: 55,  y: 140, w: 200, h: 100 },
  // Level 3
  { id: "gov",     x: 0,   y: 280, w: 90,  h: 90  },
  { id: "geo",     x: 110, y: 280, w: 90,  h: 90  },
  { id: "power",   x: 220, y: 280, w: 90,  h: 90  },
  // Level 4 — 3-panel triptych
  { id: "diplo",   x: 0,   y: 410, w: 310, h: 140 },
  // Level 5
  { id: "ir",      x: 10,  y: 590, w: 290, h: 120 },
];

const mbLines = [
  { id: "tech-affairs",   d: "M 76 100 C 76 120, 155 120, 155 140" },
  { id: "legal-affairs",  d: "M 234 100 C 234 120, 155 120, 155 140" },
  { id: "affairs-gov",    d: "M 155 240 C 155 260, 45 260, 45 280" },
  { id: "affairs-geo",    d: "M 155 240 L 155 280" },
  { id: "affairs-power",  d: "M 155 240 C 155 260, 265 260, 265 280" },
  { id: "gov-diplo",      d: "M 45 370 C 45 390, 155 390, 155 410" },
  { id: "geo-diplo",      d: "M 155 370 L 155 410" },
  { id: "power-diplo",    d: "M 265 370 C 265 390, 155 390, 155 410" },
  { id: "diplo-ir",       d: "M 155 550 L 155 590" },
];

/* ─── Animation ordering ─── */

const LINE_IDS = [
  "tech-affairs",
  "legal-affairs",
  "affairs-gov",
  "affairs-geo",
  "affairs-power",
  "gov-diplo",
  "geo-diplo",
  "power-diplo",
  "diplo-ir",
];

/* ─── Flow Card Component — image-backed ─── */

function FlowCard({
  label,
  sub,
  image,
  images,
  featured,
  small,
}: {
  label: string;
  sub?: string;
  image: string;
  images?: string[];
  featured?: boolean;
  small?: boolean;
}) {
  const isTriple = images && images.length === 3;
  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative">
      {isTriple ? (
        <div className="flex w-full h-full">
          {images!.map((src, i) => (
            <div key={i} className="flex-1 relative">
              <Image
                src={src}
                alt={`${label} ${i + 1}`}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <Image
          src={image}
          alt={label}
          fill
          sizes={small ? "(max-width: 768px) 45vw" : "30vw"}
          className="object-cover"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Border */}
      <div
        className={`absolute inset-0 rounded-xl border ${
          featured ? "border-white/25" : "border-white/10"
        }`}
      />

      {/* Label */}
      <div className={`absolute bottom-0 left-0 right-0 ${small ? "p-2" : "p-3.5"}`}>
        <span
          className={`font-display font-bold block leading-tight break-words ${
            featured
              ? `${small ? "text-sm" : "text-lg"} text-white`
              : `${small ? "text-sm" : "text-lg"} text-white/90`
          }`}
        >
          {label}
        </span>
        {sub && (
          <span
            className={`text-white/40 font-mono block ${
              small ? "text-[7px] mt-0.5" : "text-[10px] mt-1"
            }`}
          >
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Flow Chart Renderer ─── */

function FlowChart({
  cards,
  lines,
  container,
  prefix,
  small,
}: {
  cards: CardRect[];
  lines: { id: string; d: string }[];
  container: { W: number; H: number };
  prefix: string;
  small?: boolean;
}) {
  return (
    <div
      className="relative w-full mx-auto"
      style={{
        maxWidth: container.W,
        aspectRatio: `${container.W} / ${container.H}`,
        maxHeight: "calc(100svh - 220px)",
      }}
    >
      {/* SVG connecting lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
        viewBox={`0 0 ${container.W} ${container.H}`}
        fill="none"
      >
        {lines.map((line) => (
          <g key={line.id}>
            {/* Soft glow behind the line */}
            <path
              className={`${prefix}-line-${line.id}`}
              d={line.d}
              stroke="#C0C0C0"
              strokeOpacity={0.08}
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
            />
            {/* Main line */}
            <path
              className={`${prefix}-line-${line.id}`}
              d={line.d}
              stroke="#C0C0C0"
              strokeOpacity={0.45}
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
        {/* Connection dots at endpoints */}
        {lines.map((line) => {
          const parts = line.d.split(/[ML]\s*/);
          const startCoords = parts[1]?.trim().split(/\s+/);
          const endMatch = line.d.match(/[\s,](\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*$/);
          if (!startCoords || !endMatch) return null;
          return (
            <g key={`${line.id}-dots`}>
              <circle
                className={`${prefix}-dot-${line.id}`}
                cx={startCoords[0]}
                cy={startCoords[1]}
                r={3}
                fill="#C0C0C0"
                fillOpacity={0.35}
              />
              <circle
                className={`${prefix}-dot-${line.id}`}
                cx={endMatch[1]}
                cy={endMatch[2]}
                r={3}
                fill="#C0C0C0"
                fillOpacity={0.35}
              />
            </g>
          );
        })}
      </svg>

      {/* Card nodes */}
      {cards.map((card) => {
        const data = cardContent[card.id];
        return (
          <div
            key={card.id}
            className={`${prefix}-node-${card.id} absolute z-[2]`}
            style={{
              left: `${(card.x / container.W) * 100}%`,
              top: `${(card.y / container.H) * 100}%`,
              width: `${(card.w / container.W) * 100}%`,
              height: `${(card.h / container.H) * 100}%`,
            }}
          >
            <FlowCard
              label={small && data.mobileLabel ? data.mobileLabel : data.label}
              sub={data.sub}
              image={data.image}
              images={data.images}
              featured={data.featured}
              small={small}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   GSAP scroll-scrubbed timeline
   ═══════════════════════════════════════════════════════ */

function buildTimeline(container: HTMLElement, prefix: string) {
  const tl = gsap.timeline();

  const node = (id: string) =>
    container.querySelector(`.${prefix}-node-${id}`) as HTMLElement;
  const lines = (id: string) =>
    container.querySelectorAll(`.${prefix}-line-${id}`) as NodeListOf<SVGPathElement>;
  const dots = (id: string) =>
    container.querySelectorAll(`.${prefix}-dot-${id}`) as NodeListOf<SVGCircleElement>;

  // Initial state: cards hidden + shifted down
  ["tech", "legal", "affairs", "gov", "geo", "power", "diplo", "ir"].forEach((id) => {
    const n = node(id);
    if (n) gsap.set(n, { opacity: 0, y: 20 });
  });

  // Initial state: lines hidden via stroke-dashoffset, dots hidden
  LINE_IDS.forEach((id) => {
    lines(id).forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    dots(id).forEach((d) => {
      gsap.set(d, { opacity: 0, scale: 0, transformOrigin: "center center" });
    });
  });

  const dur = 0.06;
  const lineDur = 0.08;

  const drawLine = (id: string, position: number) => {
    lines(id).forEach((p) => {
      tl.to(p, { strokeDashoffset: 0, duration: lineDur, ease: "power2.inOut" }, position);
    });
    dots(id).forEach((d) => {
      tl.to(d, { opacity: 1, scale: 1, duration: 0.05, ease: "back.out(2)" }, position + lineDur * 0.5);
    });
  };

  /* ── Level 1: Technical + Legal ── */
  tl.to(node("tech"),  { opacity: 1, y: 0, duration: dur, ease: "power2.out" }, 0.0);
  tl.to(node("legal"), { opacity: 1, y: 0, duration: dur, ease: "power2.out" }, 0.04);

  /* ── Lines: Level 1 → Space Affairs ── */
  drawLine("tech-affairs",  0.12);
  drawLine("legal-affairs", 0.15);

  /* ── Level 2: Space Affairs ── */
  tl.to(node("affairs"), { opacity: 1, y: 0, duration: dur, ease: "power2.out" }, 0.26);

  /* ── Lines: Space Affairs → Governance / Geopolitics / Power ── */
  drawLine("affairs-gov",   0.36);
  drawLine("affairs-geo",   0.38);
  drawLine("affairs-power", 0.40);

  /* ── Level 3: Governance + Geopolitics + Power ── */
  tl.to(node("gov"),   { opacity: 1, y: 0, duration: dur, ease: "power2.out" }, 0.50);
  tl.to(node("geo"),   { opacity: 1, y: 0, duration: dur, ease: "power2.out" }, 0.52);
  tl.to(node("power"), { opacity: 1, y: 0, duration: dur, ease: "power2.out" }, 0.54);

  /* ── Lines: Level 3 → Space Diplomacy ── */
  drawLine("gov-diplo",   0.62);
  drawLine("geo-diplo",   0.64);
  drawLine("power-diplo", 0.66);

  /* ── Level 4: Space Diplomacy ── */
  tl.to(node("diplo"), { opacity: 1, y: 0, duration: dur, ease: "power2.out" }, 0.74);

  /* ── Line: Diplomacy → IR ── */
  drawLine("diplo-ir", 0.82);

  /* ── Level 5: International Relations ── */
  tl.to(node("ir"), { opacity: 1, y: 0, duration: dur, ease: "power2.out" }, 0.90);

  return tl;
}

/* ─── Main Component ─── */

export default function DiplomacyFramework() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = buildTimeline(pinRef.current!, "dt");
        ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: pinRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          animation: tl,
          invalidateOnRefresh: true,
        });
      });

      mm.add("(max-width: 767px)", () => {
        const tl = buildTimeline(pinRef.current!, "mb");
        ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: pinRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          animation: tl,
          invalidateOnRefresh: true,
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#00021C] overflow-hidden"
      style={{ height: "200svh" }}
    >
      <Starfield density={100} />

      <div
        ref={pinRef}
        className="h-[100svh] flex flex-col items-center justify-center pt-20 px-6 overflow-hidden"
      >
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white text-center mb-3 md:mb-4">
          {c.heading}
        </h2>
        <p className="font-mono text-2xl md:text-3xl text-[#C0C0C0]/70 text-center mb-8 md:mb-10">
          {c.subtitle}
        </p>

        {/* Desktop Flow Chart */}
        <div className="hidden md:flex items-center justify-center w-full">
          <FlowChart
            cards={dtCards}
            lines={dtLines}
            container={DT}
            prefix="dt"
          />
        </div>

        {/* Mobile Flow Chart */}
        <div className="flex md:hidden items-center justify-center w-full">
          <FlowChart
            cards={mbCards}
            lines={mbLines}
            container={MB}
            prefix="mb"
            small
          />
        </div>
      </div>
    </section>
  );
}
