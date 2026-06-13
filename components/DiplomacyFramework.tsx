"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { diplomacyFramework as c } from "@/lib/content";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Node data ─── */
interface NodeData {
  id: string;
  label: string;
  image: string;
  description: string;
  featured?: boolean;
}

const nodes: NodeData[] = [
  {
    id: "tech",
    label: c.nodes.technical,
    image: "/new-assets/Space-Technologies.png",
    description: "Engineering, propulsion systems, and launch architecture powering humanity's reach into orbit.",
  },
  {
    id: "legal",
    label: c.nodes.legal,
    image: "/new-assets/Space-Law.png",
    description: "Regulatory frameworks, licensing, and international space law governing orbital activities.",
  },
  {
    id: "affairs",
    label: c.nodes.affairs,
    image: "/new-assets/Space-Affairs.png",
    description: "The intersection of policy, governance, and diplomatic engagement in the space domain.",
  },
  {
    id: "gov",
    label: c.nodes.governance,
    image: "/new-assets/Space-Governance.png",
    description: "Institutional structures and norms shaping how nations cooperate and compete in space.",
  },
  {
    id: "geo",
    label: c.nodes.geopolitics,
    image: "/new-assets/Geopolitics.png",
    description: "Power dynamics, alliances, and strategic competition reshaping the orbital landscape.",
  },
  {
    id: "power",
    label: c.nodes.power,
    image: "/new-assets/Space-Powers.png",
    description: "National capabilities, military space programs, and sovereign capacity in the space domain.",
  },
  {
    id: "diplo",
    label: c.nodes.diplomacy,
    image: "/assets/Space diplomacy.jpg",
    description: "Treaties, negotiations, and multilateral forums building the rules for humanity's future in space.",
    featured: true,
  },
  {
    id: "ir",
    label: c.nodes.ir,
    image: "/assets/International relations.jpg",
    description: "Building goodwill and sustainable partnerships across spacefaring nations.",
  },
];

/* ─── 3D Card Component ─── */
function Card3D({
  node,
  index,
}: {
  node: NodeData;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`diplomacy-card diplomacy-card-${node.id} relative w-full flex items-center justify-center`}
      style={{
        minHeight: node.featured ? "100svh" : "85svh",
        perspective: "1200px",
      }}
    >
      {/* Background depth layer — blurred, parallax */}
      <div
        className={`diplomacy-bg-${node.id} absolute inset-0 overflow-hidden`}
        style={{ transform: "translateZ(-100px) scale(1.1)" }}
      >
        <Image
          src={node.image}
          alt=""
          fill
          className="object-cover opacity-[0.07] blur-sm"
          sizes="100vw"
        />
      </div>

      {/* Content wrapper */}
      <div
        className={`diplomacy-content-${node.id} relative z-10 w-full max-w-6xl mx-auto px-6 py-20 flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-8 md:gap-16`}
      >
        {/* 3D Image card */}
        <div
          className={`diplomacy-img-${node.id} relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden`}
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${isEven ? "6" : "-6"}deg) rotateX(3deg)`,
          }}
        >
          {/* Image */}
          <Image
            src={node.image}
            alt={node.label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 45vw"
          />

          {/* Holographic border glow */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              border: node.featured
                ? "1.5px solid rgba(192,192,192,0.4)"
                : "1px solid rgba(192,192,192,0.15)",
              boxShadow: node.featured
                ? "0 0 30px rgba(192,192,192,0.1), inset 0 0 30px rgba(0,0,0,0.3)"
                : "0 0 20px rgba(192,192,192,0.05), inset 0 0 20px rgba(0,0,0,0.3)",
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00021C]/70 via-transparent to-transparent" />

          {/* Depth shadow */}
          <div
            className="absolute -inset-1 rounded-2xl -z-10"
            style={{
              background: "rgba(0,0,0,0.4)",
              filter: "blur(20px)",
              transform: "translateZ(-30px) translateY(10px)",
            }}
          />
        </div>

        {/* Text content */}
        <div className={`diplomacy-text-${node.id} w-full md:w-1/2 flex flex-col gap-4`}>
          {/* Node index indicator */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#C0C0C0]/40 tracking-[0.2em] uppercase">
              {String(index + 1).padStart(2, "0")} / {String(nodes.length).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#C0C0C0]/20 to-transparent" />
          </div>

          {/* Label */}
          <h3
            className={`font-display font-bold leading-tight ${
              node.featured
                ? "text-4xl md:text-5xl lg:text-6xl text-white"
                : "text-3xl md:text-4xl lg:text-5xl text-white/90"
            }`}
          >
            {node.label}
          </h3>

          {/* Description */}
          <p className="text-lg md:text-xl text-[#C0C0C0]/70 leading-relaxed max-w-lg">
            {node.description}
          </p>

          {/* Featured badge */}
          {node.featured && (
            <div className="mt-2 inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-[#C0C0C0]/20 bg-[#C0C0C0]/5">
              <div className="w-2 h-2 rounded-full bg-[#C0C0C0] animate-pulse" />
              <span className="font-mono text-xs text-[#C0C0C0]/80 tracking-widest uppercase">
                Our Focus
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Connecting line to next card */}
      {index < nodes.length - 1 && (
        <div
          className={`diplomacy-connector-${node.id} absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24`}
          style={{
            background: "linear-gradient(to bottom, rgba(192,192,192,0.3), rgba(192,192,192,0.05))",
          }}
        />
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export default function DiplomacyFramework() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;

      // Animate each card on scroll
      nodes.forEach((node, i) => {
        const card = section.querySelector(`.diplomacy-card-${node.id}`);
        const img = section.querySelector(`.diplomacy-img-${node.id}`);
        const text = section.querySelector(`.diplomacy-text-${node.id}`);
        const bg = section.querySelector(`.diplomacy-bg-${node.id}`);
        const connector = section.querySelector(`.diplomacy-connector-${node.id}`);

        if (!card) return;

        // Card entrance animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 20%",
            scrub: 1,
          },
        });

        // Image: fly in with 3D rotation
        if (img) {
          gsap.set(img, {
            opacity: 0,
            y: 80,
            rotateY: i % 2 === 0 ? 15 : -15,
            rotateX: 8,
            scale: 0.85,
          });
          tl.to(
            img,
            {
              opacity: 1,
              y: 0,
              rotateY: i % 2 === 0 ? 6 : -6,
              rotateX: 3,
              scale: 1,
              ease: "power2.out",
              duration: 1,
            },
            0
          );
        }

        // Text: fade in and slide
        if (text) {
          gsap.set(text, { opacity: 0, x: i % 2 === 0 ? 60 : -60 });
          tl.to(
            text,
            {
              opacity: 1,
              x: 0,
              ease: "power2.out",
              duration: 1,
            },
            0.2
          );
        }

        // Background parallax
        if (bg) {
          tl.fromTo(
            bg,
            { y: 50 },
            { y: -50, ease: "none", duration: 1 },
            0
          );
        }

        // Connector line draws in
        if (connector) {
          gsap.set(connector, { scaleY: 0, transformOrigin: "top center" });
          gsap.to(connector, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "bottom 60%",
              end: "bottom 20%",
              scrub: 1,
            },
          });
        }

        // 3D tilt on scroll (parallax depth effect while in view)
        if (img) {
          gsap.to(img, {
            rotateX: -2,
            rotateY: i % 2 === 0 ? 2 : -2,
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 50%",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="diplomacy-framework"
      className="relative z-10 bg-[#00021C]"
    >
      {/* Section header */}
      <div className="relative z-10 text-center pt-32 pb-16 px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
          {c.heading}
        </h2>
        <p className="font-mono text-xl md:text-2xl text-[#C0C0C0]/60 max-w-2xl mx-auto">
          {c.subtitle}
        </p>
      </div>

      {/* Vertical guide line */}
      <div
        className="absolute top-48 bottom-0 left-1/2 -translate-x-1/2 w-px z-0"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(192,192,192,0.08) 10%, rgba(192,192,192,0.08) 90%, transparent)",
        }}
      />

      {/* 3D Cards */}
      {nodes.map((node, i) => (
        <Card3D key={node.id} node={node} index={i} />
      ))}
    </section>
  );
}
