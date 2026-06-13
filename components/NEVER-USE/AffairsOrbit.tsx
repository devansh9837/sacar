"use client";

import React, { useState, useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import affairsOrbitItems from "@/lib/affairs-orbit";
import {
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ITEMS = affairsOrbitItems;
const N = ITEMS.length;               // 8
const STEP = 360 / N;                 // 45°
const AUTO_SPEED = 0.015;
const ORBIT_RADIUS = 36;              // single ring at 36%

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function normalise(deg: number) {
  return ((deg % 360) + 360) % 360;
}

function depthFactor(angleDeg: number) {
  const rad = ((angleDeg - 270) * Math.PI) / 180;
  return (Math.cos(rad) + 1) / 2;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* ------------------------------------------------------------------ */
/*  Per-item bespoke SVG animations                                    */
/* ------------------------------------------------------------------ */

const S = "rgba(192,192,192,";   // silver shorthand

/* ════════════════════════════════════════════════════
   1. MULTILATERAL — Refined ISS + pulsing nation nodes
════════════════════════════════════════════════════ */
function MultilateralAnim() {
  const labels = ["US", "RU", "EU", "JP", "CA"];
  return (
    <svg viewBox="0 0 420 300" className="w-full h-full" fill="none">
      <defs>
        <radialGradient id="mg-bg" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="rgba(192,192,192,0.07)" />
          <stop offset="100%" stopColor="rgba(192,192,192,0)" />
        </radialGradient>
        <filter id="ml-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="210" cy="150" rx="160" ry="130" fill="url(#mg-bg)" />

      {/* Orbit ellipse draws in */}
      <motion.ellipse
        cx="210" cy="150" rx="145" ry="95"
        stroke={`${S}0.22)`} strokeWidth="1.2" strokeDasharray="6 5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      {/* ISS — refined cross structure */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 24, delay: 0.3 }}
        style={{ transformOrigin: "210px 150px" }}
      >
        {/* Main horizontal truss */}
        <rect x="166" y="146" width="88" height="8" rx="2"
          fill={`${S}0.12)`} stroke={`${S}0.52)`} strokeWidth="1.2" />
        {/* Left solar array */}
        <rect x="148" y="139" width="18" height="22" rx="1"
          fill={`${S}0.07)`} stroke={`${S}0.36)`} strokeWidth="1" />
        <line x1="148" y1="150" x2="166" y2="150" stroke={`${S}0.22)`} strokeWidth="0.7" />
        <line x1="148" y1="145" x2="166" y2="145" stroke={`${S}0.12)`} strokeWidth="0.5" />
        <line x1="148" y1="155" x2="166" y2="155" stroke={`${S}0.12)`} strokeWidth="0.5" />
        {/* Right solar array */}
        <rect x="254" y="139" width="18" height="22" rx="1"
          fill={`${S}0.07)`} stroke={`${S}0.36)`} strokeWidth="1" />
        <line x1="254" y1="150" x2="272" y2="150" stroke={`${S}0.22)`} strokeWidth="0.7" />
        <line x1="254" y1="145" x2="272" y2="145" stroke={`${S}0.12)`} strokeWidth="0.5" />
        <line x1="254" y1="155" x2="272" y2="155" stroke={`${S}0.12)`} strokeWidth="0.5" />
        {/* Vertical spine */}
        <rect x="206" y="126" width="8" height="48" rx="2"
          fill={`${S}0.1)`} stroke={`${S}0.45)`} strokeWidth="1" />
        {/* Core module */}
        <rect x="196" y="140" width="28" height="20" rx="3"
          fill={`${S}0.18)`} stroke={`${S}0.65)`} strokeWidth="1.5" filter="url(#ml-glow)" />
        {/* Viewports */}
        <circle cx="204" cy="150" r="2.5" fill={`${S}0.5)`} />
        <circle cx="216" cy="150" r="2.5" fill={`${S}0.3)`} />
        {/* Cupola */}
        <ellipse cx="210" cy="128" rx="7" ry="4"
          fill={`${S}0.09)`} stroke={`${S}0.38)`} strokeWidth="1" />
      </motion.g>

      {/* 5 nation nodes */}
      {labels.map((label, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const nx = 210 + 145 * Math.cos(angle);
        const ny = 150 + 95 * Math.sin(angle);
        return (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 140, damping: 26 }}
            style={{ transformOrigin: `${nx}px ${ny}px` }}
          >
            <motion.line x1="210" y1="150" x2={nx} y2={ny}
              stroke={`${S}0.18)`} strokeWidth="1" strokeDasharray="4 4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.55 + i * 0.1, duration: 0.5 }}
            />
            <circle cx={nx} cy={ny} r="17"
              fill={`${S}0.1)`} stroke={`${S}0.42)`} strokeWidth="1.3" />
            <motion.circle cx={nx} cy={ny} r="17" fill="none"
              stroke={`${S}0.3)`} strokeWidth="1"
              animate={{ r: [17, 28, 17], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 4.5, delay: 1.0 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <text x={nx} y={ny + 1} textAnchor="middle" dominantBaseline="central"
              fill={`${S}1)`} fontSize="14" fontFamily="monospace"
              fontWeight="700" letterSpacing="0.5">{label}</text>
          </motion.g>
        );
      })}

      {/* Traveling data particles along spokes */}
      {labels.map((_, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const ex = 210 + 145 * Math.cos(angle);
        const ey = 150 + 95 * Math.sin(angle);
        return (
          <motion.circle key={`p${i}`} r="2" fill={`${S}0.9)`}
            animate={{ cx: [210, ex, 210], cy: [150, ey, 150], opacity: [0, 0.8, 0] }}
            transition={{ duration: 5, delay: 1.8 + i * 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </svg>
  );
}

/* ════════════════════════════════════════════════════
   2. DUAL — GPS dish with civilian/military diverging beams
════════════════════════════════════════════════════ */
function DualAnim() {
  return (
    <svg viewBox="0 0 420 300" className="w-full h-full" fill="none">
      <defs>
        <radialGradient id="dd-bg" cx="50%" cy="65%" r="45%">
          <stop offset="0%" stopColor="rgba(192,192,192,0.08)" />
          <stop offset="100%" stopColor="rgba(192,192,192,0)" />
        </radialGradient>
        <filter id="dd-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="210" cy="195" rx="180" ry="115" fill="url(#dd-bg)" />

      {/* CIVILIAN node — top left */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 130, damping: 24 }}
        style={{ transformOrigin: "110px 72px" }}
      >
        <circle cx="110" cy="72" r="28" fill={`${S}0.08)`} stroke={`${S}0.42)`} strokeWidth="1.3" />
        <motion.circle cx="110" cy="72" r="28" fill="none" stroke={`${S}0.22)`}
          animate={{ r: [28, 44, 28], opacity: [0.18, 0, 0.18] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1.2, ease: "easeInOut" }}
        />
        {/* Navigation arrow */}
        <path d="M 110 58 L 118 76 L 110 71 L 102 76 Z"
          fill={`${S}0.65)`} stroke={`${S}0.85)`} strokeWidth="0.8" />
        <text x="110" y="118" textAnchor="middle"
          fill={`${S}0.9)`} fontSize="13" fontFamily="monospace" letterSpacing="1.5">CIVILIAN</text>
      </motion.g>

      {/* MILITARY node — top right */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 130, damping: 24 }}
        style={{ transformOrigin: "310px 72px" }}
      >
        <circle cx="310" cy="72" r="28" fill={`${S}0.08)`} stroke={`${S}0.42)`} strokeWidth="1.3" />
        <motion.circle cx="310" cy="72" r="28" fill="none" stroke={`${S}0.22)`}
          animate={{ r: [28, 44, 28], opacity: [0.18, 0, 0.18] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1.7, ease: "easeInOut" }}
        />
        {/* Crosshair target */}
        <circle cx="310" cy="72" r="11" fill="none" stroke={`${S}0.65)`} strokeWidth="1.3" />
        <circle cx="310" cy="72" r="4"  fill="none" stroke={`${S}0.65)`} strokeWidth="1.3" />
        <line x1="295" y1="72" x2="325" y2="72" stroke={`${S}0.6)`} strokeWidth="1" />
        <line x1="310" y1="57" x2="310" y2="87" stroke={`${S}0.6)`} strokeWidth="1" />
        <text x="310" y="118" textAnchor="middle"
          fill={`${S}0.9)`} fontSize="13" fontFamily="monospace" letterSpacing="1.5">MILITARY</text>
      </motion.g>

      {/* Central GPS dish */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 24, delay: 0.1 }}
        style={{ transformOrigin: "210px 198px" }}
      >
        <motion.path d="M 182 198 Q 210 158 238 198"
          stroke={`${S}0.72)`} strokeWidth="2.5" fill={`${S}0.1)`}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
        />
        <motion.path d="M 193 198 Q 210 170 227 198"
          stroke={`${S}0.38)`} strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        />
        <line x1="210" y1="198" x2="210" y2="226"
          stroke={`${S}0.58)`} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="193" y1="226" x2="227" y2="226"
          stroke={`${S}0.48)`} strokeWidth="2" strokeLinecap="round" />
        <motion.circle cx="210" cy="176" r="3.5"
          fill={`${S}0.8)`} stroke={`${S}1)`} strokeWidth="0.8"
          animate={{ r: [3.5, 5.5, 3.5], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="210" y="248" textAnchor="middle"
          fill={`${S}0.85)`} fontSize="13" fontFamily="monospace" letterSpacing="1.5">GPS SIGNAL</text>
      </motion.g>

      {/* Dashed lines from focus to nodes */}
      <motion.line x1="210" y1="176" x2="110" y2="100"
        stroke={`${S}0.18)`} strokeWidth="1" strokeDasharray="5 4"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
      />
      <motion.line x1="210" y1="176" x2="310" y2="100"
        stroke={`${S}0.18)`} strokeWidth="1" strokeDasharray="5 4"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
      />

      {/* Signal pulses */}
      <motion.circle r="2.5" fill={`${S}0.85)`}
        animate={{ cx: [210, 110], cy: [176, 100], opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, delay: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle r="2.5" fill={`${S}0.85)`}
        animate={{ cx: [210, 310], cy: [176, 100], opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, delay: 2.7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dual-use spectrum slider */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}>
        <rect x="116" y="259" width="188" height="2" rx="1" fill={`${S}0.18)`} />
        <motion.circle cy="260" r="5.5"
          fill={`${S}0.68)`} stroke={`${S}0.92)`} strokeWidth="1.2"
          animate={{ cx: [116, 304, 116] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
        />
        <text x="104" y="278" textAnchor="middle" fill={`${S}0.85)`}
          fontSize="12" fontFamily="monospace" letterSpacing="1.5">CIVIL</text>
        <text x="316" y="278" textAnchor="middle" fill={`${S}0.85)`}
          fontSize="12" fontFamily="monospace" letterSpacing="1.5">MIL</text>
      </motion.g>
    </svg>
  );
}

/* ════════════════════════════════════════════════════
   3. CIVIL — COSPAR network with data flows
════════════════════════════════════════════════════ */
function CivilAnim() {
  const nodes = [
    { id: "COSPAR", x: 210, y: 142, r: 22, primary: true  },
    { id: "NGO",    x: 84,  y: 68,  r: 15, primary: false },
    { id: "ACAD",   x: 326, y: 62,  r: 15, primary: false },
    { id: "SCI",    x: 64,  y: 212, r: 15, primary: false },
    { id: "ENG",    x: 350, y: 206, r: 15, primary: false },
    { id: "GOV",    x: 210, y: 250, r: 15, primary: false },
  ];
  const edges: [number, number][] = [
    [0,1],[0,2],[0,3],[0,4],[0,5],
    [1,2],[3,5],[4,5],
  ];

  return (
    <svg viewBox="0 0 420 300" className="w-full h-full" fill="none">
      <defs>
        <radialGradient id="cd-bg" cx="50%" cy="47%" r="42%">
          <stop offset="0%" stopColor="rgba(192,192,192,0.07)" />
          <stop offset="100%" stopColor="rgba(192,192,192,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="148" rx="175" ry="145" fill="url(#cd-bg)" />

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={`${S}${a === 0 ? "0.18" : "0.1"})`}
          strokeWidth={a === 0 ? "1" : "0.8"}
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.35 + i * 0.1, duration: 0.55 }}
        />
      ))}

      {/* Data particles from COSPAR outward */}
      {nodes.slice(1).map((node, i) => (
        <motion.circle key={`p${i}`} r="2" fill={`${S}0.85)`}
          animate={{
            cx: [nodes[0].x, node.x, nodes[0].x],
            cy: [nodes[0].y, node.y, nodes[0].y],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 3.5, delay: 1.3 + i * 0.75, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12 + i * 0.1, type: "spring", stiffness: 140, damping: 24 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r={n.r}
            fill={`${S}${n.primary ? "0.14" : "0.08"})`}
            stroke={`${S}${n.primary ? "0.58" : "0.38"})`}
            strokeWidth={n.primary ? "1.6" : "1.2"} />
          {n.primary && (
            <>
              <circle cx={n.x} cy={n.y} r={n.r - 7}
                fill="none" stroke={`${S}0.28)`} strokeWidth="0.8" />
              <circle cx={n.x} cy={n.y} r="4" fill={`${S}0.6)`} />
              <motion.circle cx={n.x} cy={n.y} r={n.r}
                fill="none" stroke={`${S}0.28)`}
                animate={{ r: [n.r, n.r + 16, n.r], opacity: [0.28, 0, 0.28] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
          {!n.primary && (
            <>
              <circle cx={n.x} cy={n.y} r="4" fill={`${S}0.45)`} />
              <motion.circle cx={n.x} cy={n.y} r={n.r}
                fill="none" stroke={`${S}0.18)`}
                animate={{ r: [n.r, n.r + 10, n.r], opacity: [0.18, 0, 0.18] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 + i * 0.5 }}
              />
            </>
          )}
          <text x={n.x} y={n.y + n.r + 14}
            textAnchor="middle" fill={`${S}0.9)`}
            fontSize="13" fontFamily="monospace" letterSpacing="1">{n.id}</text>
        </motion.g>
      ))}
    </svg>
  );
}

/* ════════════════════════════════════════════════════
   4. SHUTTLE — Diplomat arcing between two capitols
════════════════════════════════════════════════════ */
function ShuttleAnim() {
  return (
    <svg viewBox="0 0 420 300" className="w-full h-full" fill="none">
      {/* Party A — left capitol */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 24 }}
        style={{ transformOrigin: "72px 160px" }}
      >
        <rect x="48" y="128" width="48" height="68" rx="1"
          fill={`${S}0.07)`} stroke={`${S}0.42)`} strokeWidth="1.3" />
        <line x1="60" y1="128" x2="60" y2="196" stroke={`${S}0.22)`} strokeWidth="0.8" />
        <line x1="72" y1="128" x2="72" y2="196" stroke={`${S}0.22)`} strokeWidth="0.8" />
        <line x1="84" y1="128" x2="84" y2="196" stroke={`${S}0.22)`} strokeWidth="0.8" />
        <polygon points="48,128 96,128 72,104"
          fill={`${S}0.09)`} stroke={`${S}0.42)`} strokeWidth="1.3" />
        <rect x="46" y="196" width="52" height="5"
          fill={`${S}0.1)`} stroke={`${S}0.28)`} strokeWidth="0.8" />
        <text x="72" y="220" textAnchor="middle"
          fill={`${S}0.9)`} fontSize="14" fontFamily="monospace" letterSpacing="1">PARTY A</text>
      </motion.g>

      {/* Party B — right capitol */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 24 }}
        style={{ transformOrigin: "348px 160px" }}
      >
        <rect x="324" y="128" width="48" height="68" rx="1"
          fill={`${S}0.07)`} stroke={`${S}0.42)`} strokeWidth="1.3" />
        <line x1="336" y1="128" x2="336" y2="196" stroke={`${S}0.22)`} strokeWidth="0.8" />
        <line x1="348" y1="128" x2="348" y2="196" stroke={`${S}0.22)`} strokeWidth="0.8" />
        <line x1="360" y1="128" x2="360" y2="196" stroke={`${S}0.22)`} strokeWidth="0.8" />
        <polygon points="324,128 372,128 348,104"
          fill={`${S}0.09)`} stroke={`${S}0.42)`} strokeWidth="1.3" />
        <rect x="322" y="196" width="52" height="5"
          fill={`${S}0.1)`} stroke={`${S}0.28)`} strokeWidth="0.8" />
        <text x="348" y="220" textAnchor="middle"
          fill={`${S}0.9)`} fontSize="14" fontFamily="monospace" letterSpacing="1">PARTY B</text>
      </motion.g>

      {/* Straight shuttle path */}
      <motion.line x1="96" y1="162" x2="324" y2="162"
        stroke={`${S}0.18)`} strokeWidth="1" strokeDasharray="5 5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      />

      {/* Center dividing line */}
      <motion.line x1="210" y1="94" x2="210" y2="210"
        stroke={`${S}0.14)`} strokeWidth="1" strokeDasharray="3 3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />

      {/* Shuttle diplomat — travels straight between capitols */}
      <motion.g
        animate={{ x: [0, 218, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      >
        <g transform="translate(100, 162)">
          <path d="M -9 0 L 0 -6 L 9 0 L 0 4 Z"
            fill={`${S}0.68)`} stroke={`${S}0.88)`} strokeWidth="1" />
          <path d="M -3 -1 L -9 6 L -3 2 Z" fill={`${S}0.38)`} />
          <path d="M  3 -1 L  9 6 L  3 2 Z" fill={`${S}0.38)`} />
          <motion.circle r="3.5" cx="0" cy="0" fill="none"
            stroke={`${S}0.45)`} strokeWidth="0.8"
            animate={{ r: [3.5, 6, 3.5], opacity: [0.45, 0.1, 0.45] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </g>
      </motion.g>

      {/* Label */}
      <motion.text x="210" y="285" textAnchor="middle"
        fill={`${S}0.85)`} fontSize="13" fontFamily="monospace" letterSpacing="2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >NO DIRECT CONTACT</motion.text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════
   5. SILENT — Encrypted back-channel with classified lock
════════════════════════════════════════════════════ */
function SilentAnim() {
  const cipherItems = [
    { x: 170, y: 100, symbol: "◈" },
    { x: 210, y: 88,  symbol: "⊕" },
    { x: 250, y: 100, symbol: "◉" },
  ];

  return (
    <svg viewBox="0 0 420 300" className="w-full h-full" fill="none">
      <defs>
        <radialGradient id="silent-glow" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="rgba(192,192,192,0.1)" />
          <stop offset="100%" stopColor="rgba(192,192,192,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="160" rx="160" ry="130" fill="url(#silent-glow)" />

      {/* Party A terminal */}
      <motion.g
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
      >
        <circle cx="88" cy="106" r="22"
          fill={`${S}0.08)`} stroke={`${S}0.4)`} strokeWidth="1.3" />
        <circle cx="88" cy="106" r="6" fill={`${S}0.3)`} />
        <motion.circle cx="88" cy="106" r="22" fill="none" stroke={`${S}0.2)`}
          animate={{ r: [22, 34, 22], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
        <line x1="88" y1="128" x2="88" y2="148"
          stroke={`${S}0.28)`} strokeWidth="1" strokeDasharray="3 3" />
        <text x="88" y="164" textAnchor="middle"
          fill={`${S}0.9)`} fontSize="13" fontFamily="monospace" letterSpacing="1.5">
          PARTY A
        </text>
      </motion.g>

      {/* Party B terminal */}
      <motion.g
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.55, ease: "easeOut" }}
      >
        <circle cx="332" cy="106" r="22"
          fill={`${S}0.08)`} stroke={`${S}0.4)`} strokeWidth="1.3" />
        <circle cx="332" cy="106" r="6" fill={`${S}0.3)`} />
        <motion.circle cx="332" cy="106" r="22" fill="none" stroke={`${S}0.2)`}
          animate={{ r: [22, 34, 22], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        />
        <line x1="332" y1="128" x2="332" y2="148"
          stroke={`${S}0.28)`} strokeWidth="1" strokeDasharray="3 3" />
        <text x="332" y="164" textAnchor="middle"
          fill={`${S}0.9)`} fontSize="13" fontFamily="monospace" letterSpacing="1.5">
          PARTY B
        </text>
      </motion.g>

      {/* Hidden channel box */}
      <motion.rect x="172" y="84" width="76" height="32" rx="4"
        fill={`${S}0.06)`} stroke={`${S}0.22)`} strokeWidth="1" strokeDasharray="4 3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.5 }}
      />

      {/* Cipher symbols drifting inside channel */}
      {cipherItems.map((item, i) => (
        <motion.text
          key={i} x={item.x} y={item.y}
          textAnchor="middle" fill={`${S}0.75)`}
          fontSize="16" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.72, 0], y: [item.y, item.y - 5, item.y] }}
          transition={{
            duration: 4, delay: 1 + i * 0.6, repeat: Infinity, ease: "easeOut",
          }}
        >
          {item.symbol}
        </motion.text>
      ))}

      {/* Central classified lock */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 120, damping: 24 }}
        style={{ transformOrigin: "210px 200px" }}
      >
        {/* Lock body */}
        <rect x="192" y="196" width="36" height="30" rx="3"
          fill={`${S}0.1)`} stroke={`${S}0.52)`} strokeWidth="1.5" />
        {/* Shackle */}
        <path d="M 200 196 L 200 185 Q 200 174 210 174 Q 220 174 220 185 L 220 196"
          fill="none" stroke={`${S}0.52)`} strokeWidth="2" strokeLinecap="round" />
        {/* Keyhole */}
        <circle cx="210" cy="208" r="4"
          fill="none" stroke={`${S}0.72)`} strokeWidth="1.3" />
        <line x1="210" y1="212" x2="210" y2="219"
          stroke={`${S}0.72)`} strokeWidth="1.5" strokeLinecap="round" />
        {/* Pulse ring */}
        <motion.circle cx="210" cy="211" r="20" fill="none" stroke={`${S}0.2)`}
          animate={{ r: [20, 36, 20], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
        />
        <text x="210" y="250" textAnchor="middle"
          fill={`${S}0.85)`} fontSize="13" fontFamily="monospace" letterSpacing="2">
          CLASSIFIED
        </text>
      </motion.g>

      {/* Encrypted signal particle A → lock */}
      <motion.circle r="2" fill={`${S}0.85)`}
        animate={{ cx: [88, 192, 88], cy: [128, 196, 128], opacity: [0, 1, 0] }}
        transition={{ duration: 3, delay: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Encrypted signal particle B → lock */}
      <motion.circle r="2" fill={`${S}0.85)`}
        animate={{ cx: [332, 228, 332], cy: [128, 196, 128], opacity: [0, 1, 0] }}
        transition={{ duration: 3, delay: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════
   6. CULTURAL — Voyager Golden Record
════════════════════════════════════════════════════ */
function CulturalAnim() {
  const G = "rgba(200,168,70,"; // gold shorthand for the Golden Record

  const symbols = [
    { x: 210, y: 32,  char: "♪" },
    { x: 300, y: 90,  char: "○" },
    { x: 300, y: 198, char: "△" },
    { x: 210, y: 238, char: "☆" },
    { x: 120, y: 188, char: "◇" },
  ];

  return (
    <svg viewBox="0 0 420 300" className="w-full h-full" fill="none">
      <defs>
        <radialGradient id="cult-glow" cx="50%" cy="48%" r="46%">
          <stop offset="0%" stopColor="rgba(200,168,70,0.13)" />
          <stop offset="100%" stopColor="rgba(200,168,70,0)" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="148" r="108" fill="url(#cult-glow)" />

      {/* Outer breathing ring */}
      <motion.circle cx="210" cy="148" r="98" fill="none" stroke={`${G}0.14)`}
        animate={{ r: [98, 108, 98], opacity: [0.12, 0.28, 0.12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Spinning record */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "210px 148px" }}
      >
        <circle cx="210" cy="148" r="88"
          fill={`${G}0.04)`} stroke={`${G}0.42)`} strokeWidth="1.6" />
        {/* Grooves */}
        {[76, 65, 55, 46, 38, 30, 22].map((r, i) => (
          <circle key={i} cx="210" cy="148" r={r}
            fill="none"
            stroke={`${G}${i < 3 ? "0.22" : "0.12"})`}
            strokeWidth="0.8"
          />
        ))}
        {/* Notch markers */}
        <line x1="210" y1="60" x2="210" y2="70"
          stroke={`${G}0.48)`} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="298" y1="148" x2="288" y2="148"
          stroke={`${G}0.38)`} strokeWidth="1.2" strokeLinecap="round" />
        {/* Center label */}
        <circle cx="210" cy="148" r="15"
          fill={`${G}0.14)`} stroke={`${G}0.58)`} strokeWidth="1.5" />
        <circle cx="210" cy="148" r="5" fill={`${G}0.72)`} />
      </motion.g>

      {/* Ambient cultural symbols — static, staggered fade-in */}
      {symbols.map((sym, i) => (
        <motion.text
          key={i} x={sym.x} y={sym.y}
          textAnchor="middle" dominantBaseline="central"
          fill={`${G}0.6)`} fontSize="18" fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.48, 0.3] }}
          transition={{ delay: 0.8 + i * 0.22, duration: 0.8 }}
        >
          {sym.char}
        </motion.text>
      ))}

      {/* Label */}
      <text x="210" y="276" textAnchor="middle"
        fill={`${G}0.85)`} fontSize="12" fontFamily="monospace" letterSpacing="1.5">
        VOYAGER GOLDEN RECORD
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════
   7. COERCIVE / TOOTHLESS — Shield with ban + broken chain
════════════════════════════════════════════════════ */
function CoerciveAnim() {
  return (
    <svg viewBox="0 0 420 300" className="w-full h-full" fill="none">
      {/* Outer shield — draws in */}
      <motion.path
        d="M 210 40 L 280 70 L 280 160 Q 280 220 210 260 Q 140 220 140 160 L 140 70 Z"
        fill={`${S}0.08)`} stroke={`${S}0.45)`} strokeWidth="1.8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Inner shield accent (dashed) */}
      <motion.path
        d="M 210 60 L 265 82 L 265 160 Q 265 210 210 242 Q 155 210 155 160 L 155 82 Z"
        fill="none" stroke={`${S}0.22)`} strokeWidth="1" strokeDasharray="3 3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />

      {/* X / ban symbol */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 130, damping: 24 }}
        style={{ transformOrigin: "210px 140px" }}
      >
        <circle cx="210" cy="140" r="28"
          fill="none" stroke={`${S}0.5)`} strokeWidth="2" />
        <motion.line x1="190" y1="120" x2="230" y2="160"
          stroke={`${S}0.6)`} strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        />
      </motion.g>

      {/* Chain below shield — broken middle link */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const cx = 150 + i * 30;
          const isBroken = i === 2;
          return (
            <motion.ellipse
              key={i} cx={cx} cy={278} rx={12} ry={6}
              fill="none"
              stroke={`${S}${isBroken ? "0.15" : "0.4"})`}
              strokeWidth="1.5"
              strokeDasharray={isBroken ? "2 2" : undefined}
              animate={isBroken ? {
                cy: [278, 284, 278],
                opacity: [0.6, 0.18, 0.6],
              } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
      </motion.g>

      {/* Excluded entity nudging the shield edge */}
      <motion.g
        animate={{ x: [0, -6, 0], opacity: [0.5, 0.88, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        {/* Satellite body */}
        <rect x="340" y="88" width="20" height="14" rx="3"
          fill={`${S}0.12)`} stroke={`${S}0.45)`} strokeWidth="1.3" />
        {/* Solar panels */}
        <rect x="326" y="91" width="12" height="8" rx="1"
          fill={`${S}0.06)`} stroke={`${S}0.35)`} strokeWidth="1" />
        <rect x="362" y="91" width="12" height="8" rx="1"
          fill={`${S}0.06)`} stroke={`${S}0.35)`} strokeWidth="1" />
        {/* Panel struts */}
        <line x1="338" y1="95" x2="340" y2="95"
          stroke={`${S}0.4)`} strokeWidth="1.2" />
        <line x1="360" y1="95" x2="362" y2="95"
          stroke={`${S}0.4)`} strokeWidth="1.2" />
        {/* Antenna */}
        <line x1="350" y1="88" x2="350" y2="80"
          stroke={`${S}0.5)`} strokeWidth="1" strokeLinecap="round" />
        <circle cx="350" cy="78" r="2"
          fill={`${S}0.55)`} />
        {/* Red-ish X over the satellite */}
        <line x1="338" y1="86" x2="362" y2="104"
          stroke={`${S}0.3)`} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="362" y1="86" x2="338" y2="104"
          stroke={`${S}0.3)`} strokeWidth="1.5" strokeLinecap="round" />
        <text x="350" y="122" textAnchor="middle"
          fill={`${S}0.9)`} fontSize="13" fontFamily="monospace" letterSpacing="1.5">EXCLUDED</text>
      </motion.g>

      {/* "Non-binding agreement" floating italic */}
      <motion.text x="210" y="178" textAnchor="middle"
        fill={`${S}0.85)`} fontSize="10" fontFamily="monospace" fontStyle="italic"
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        &quot;Non-binding agreement&quot;
      </motion.text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════
   8. CROSS DIPLOMACY — Private × Payload × Foreign Gov
════════════════════════════════════════════════════ */
function CrossAnim() {
  return (
    <svg viewBox="0 0 420 300" className="w-full h-full" fill="none">
      <defs>
        <filter id="cr-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Diagonal X path lines */}
      <motion.line x1="70" y1="50" x2="350" y2="250"
        stroke={`${S}0.25)`} strokeWidth="1.5" strokeDasharray="5 4"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
      <motion.line x1="350" y1="50" x2="70" y2="250"
        stroke={`${S}0.25)`} strokeWidth="1.5" strokeDasharray="5 4"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      />

      {/* Center hub — cross-sector nexus */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: 0.8, stiffness: 120, damping: 24 }}
        style={{ transformOrigin: "210px 150px" }}
      >
        <circle cx="210" cy="150" r="22"
          fill={`${S}0.1)`} stroke={`${S}0.5)`} strokeWidth="1.5" filter="url(#cr-glow)" />
        <circle cx="210" cy="150" r="14"
          fill="none" stroke={`${S}0.22)`} strokeWidth="0.8" />
        {/* Infinity symbol */}
        <path
          d="M 196 150 Q 200 142 210 150 Q 220 158 224 150 Q 220 142 210 150 Q 200 158 196 150"
          fill="none" stroke={`${S}0.75)`} strokeWidth="1.5" strokeLinecap="round"
        />
        <motion.circle cx="210" cy="150" r="22" fill="none" stroke={`${S}0.3)`}
          animate={{ r: [22, 36, 22], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <text x="210" y="192" textAnchor="middle"
          fill={`${S}0.9)`} fontSize="13" fontFamily="monospace" letterSpacing="1.5">
          CROSS-SECTOR
        </text>
      </motion.g>

      {/* Top-left: PRIVATE company */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        style={{ transformOrigin: "68px 49px" }}
      >
        <rect x="40" y="25" width="56" height="48" rx="6"
          fill={`${S}0.08)`} stroke={`${S}0.42)`} strokeWidth="1.3" />
        {/* Rocket */}
        <path d="M 68 37 L 74 52 L 68 49 L 62 52 Z"
          fill={`${S}0.58)`} stroke={`${S}0.78)`} strokeWidth="0.8" />
        <path d="M 62 52 L 59 57 L 66 53 Z" fill={`${S}0.28)`} />
        <path d="M 74 52 L 77 57 L 70 53 Z" fill={`${S}0.28)`} />
        <motion.circle cx="68" cy="49" r="22"
          fill="none" stroke={`${S}0.22)`}
          animate={{ r: [22, 30, 22], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
        <text x="68" y="88" textAnchor="middle"
          fill={`${S}0.9)`} fontSize="13" fontFamily="monospace">PRIVATE</text>
      </motion.g>

      {/* Top-right: PAYLOAD */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        style={{ transformOrigin: "352px 49px" }}
      >
        <rect x="324" y="25" width="56" height="48" rx="6"
          fill={`${S}0.08)`} stroke={`${S}0.42)`} strokeWidth="1.3" />
        {/* Satellite box */}
        <rect x="346" y="37" width="12" height="10" rx="2"
          fill="none" stroke={`${S}0.55)`} strokeWidth="1.2" />
        <line x1="340" y1="42" x2="346" y2="42"
          stroke={`${S}0.5)`} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="358" y1="42" x2="364" y2="42"
          stroke={`${S}0.5)`} strokeWidth="1.5" strokeLinecap="round" />
        <text x="352" y="88" textAnchor="middle"
          fill={`${S}0.9)`} fontSize="13" fontFamily="monospace">PAYLOAD</text>
      </motion.g>

      {/* Bottom-right: FOREIGN GOV */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", delay: 0.4 }}
        style={{ transformOrigin: "352px 233px" }}
      >
        <rect x="324" y="209" width="56" height="48" rx="6"
          fill={`${S}0.08)`} stroke={`${S}0.42)`} strokeWidth="1.3" />
        {/* Flag */}
        <line x1="346" y1="222" x2="346" y2="248"
          stroke={`${S}0.6)`} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 346 222 L 360 228 L 346 234 Z"
          fill={`${S}0.22)`} stroke={`${S}0.52)`} strokeWidth="1" />
        <text x="352" y="274" textAnchor="middle"
          fill={`${S}0.9)`} fontSize="12" fontFamily="monospace">FOREIGN GOV</text>
      </motion.g>

      {/* Traveling dot — top-right → bottom-left */}
      <motion.circle r="3" fill={`${S}0.8)`}
        animate={{
          cx: [350, 210, 70,  210, 350],
          cy: [50,  150, 250, 150, 50],
          opacity: [0, 1, 0, 1, 0],
        }}
        transition={{ duration: 4, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Traveling dot — top-left → bottom-right */}
      <motion.circle r="3" fill={`${S}0.8)`}
        animate={{
          cx: [70,  210, 350, 210, 70],
          cy: [50,  150, 250, 150, 50],
          opacity: [0, 1, 0, 1, 0],
        }}
        transition={{ duration: 4, delay: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Contract label */}
      <text x="210" y="296" textAnchor="middle"
        fill={`${S}0.85)`} fontSize="12" fontFamily="monospace" letterSpacing="1.5">
        CROSS-SECTOR CONTRACT
      </text>
    </svg>
  );
}

/* Memo-wrapped animations — prevents re-renders + lets React skip reconciliation */
const MemoMultilateral = React.memo(MultilateralAnim);
const MemoDual          = React.memo(DualAnim);
const MemoCivil         = React.memo(CivilAnim);
const MemoShuttle       = React.memo(ShuttleAnim);
const MemoSilent        = React.memo(SilentAnim);
const MemoCultural      = React.memo(CulturalAnim);
const MemoCoercive      = React.memo(CoerciveAnim);
const MemoCross         = React.memo(CrossAnim);

/* Animation lookup map */
const ANIM_MAP: Record<string, React.FC> = {
  multilateral: MemoMultilateral,
  dual: MemoDual,
  civil: MemoCivil,
  shuttle: MemoShuttle,
  silent: MemoSilent,
  cultural: MemoCultural,
  coercive: MemoCoercive,
  cross: MemoCross,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AffairsOrbit() {
  const prefersReducedMotion = useReducedMotion();

  /* ---- state ---- */
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);

  const selectedItem = ITEMS[selectedIndex];

  /* ---- refs ---- */
  const rafRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const lockedRef = useRef(false);
  const snapTargetRef = useRef<number | null>(null);
  const snapStartRotRef = useRef(0);
  const snapStartTimeRef = useRef(0);
  const orbitItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const emptySubscribe = useCallback(() => () => {}, []);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => { lockedRef.current = locked; });

  /* ---- Direct DOM update for orbit positions (no React re-render) ---- */
  const updateOrbitPositions = useCallback(() => {
    const rot = rotationRef.current;
    for (let i = 0; i < N; i++) {
      const el = orbitItemRefs.current[i];
      if (!el) continue;
      const angleDeg = normalise(i * STEP + rot);
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = 50 + ORBIT_RADIUS * Math.cos(angleRad);
      const y = 50 + ORBIT_RADIUS * Math.sin(angleRad);
      const depth = depthFactor(angleDeg);
      const scale = 0.88 + depth * 0.12;
      const opacity = 0.85 + depth * 0.15;
      const zIndex = Math.round(depth * 20);
      el.style.left = `${x}%`;
      el.style.top = `${y}%`;
      el.style.zIndex = String(zIndex);
      el.style.opacity = String(opacity);
      el.style.transform = `translate(-50%, -50%) scale(${scale}) translateZ(0)`;
    }
  }, []);

  /* ---- rAF loop ---- */
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;
    const loop = (time: number) => {
      if (snapTargetRef.current !== null) {
        const totalDelta = snapTargetRef.current - snapStartRotRef.current;
        const duration = (0.6 + (Math.abs(totalDelta) / 360) * 1.4) * 1000;
        const elapsed = time - snapStartTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        rotationRef.current = snapStartRotRef.current + totalDelta * eased;
        updateOrbitPositions();
        if (progress >= 1) snapTargetRef.current = null;
      } else if (!lockedRef.current) {
        rotationRef.current += AUTO_SPEED;
        updateOrbitPositions();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [mounted, prefersReducedMotion, updateOrbitPositions]);

  /* ---- select item ---- */
  const selectItem = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      setLocked(true);
      lockedRef.current = true;
      setHasSelected(true);

      const currentAngle = normalise(index * STEP + rotationRef.current);
      let delta = normalise(270 - currentAngle);
      if (delta < 30) delta += 360;

      if (prefersReducedMotion) {
        rotationRef.current += delta;
        updateOrbitPositions();
        return;
      }
      snapStartRotRef.current = rotationRef.current;
      snapTargetRef.current = rotationRef.current + delta;
      snapStartTimeRef.current = performance.now();
    },
    [prefersReducedMotion, updateOrbitPositions],
  );

  const toggleLock = useCallback(() => {
    setLocked((prev) => { lockedRef.current = !prev; return !prev; });
  }, []);

  const stepSelection = useCallback(
    (dir: 1 | -1) => {
      const next = ((selectedIndex + dir) % N + N) % N;
      selectItem(next);
    },
    [selectedIndex, selectItem],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); stepSelection(1); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); stepSelection(-1); }
    },
    [stepSelection],
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  const DetailAnim = selectedItem ? ANIM_MAP[selectedItem.id] : null;

  return (
    <section
      id="affairs-orbit"
      className="relative py-20 md:py-28 overflow-hidden bg-[#00021C]"
      aria-labelledby="affairs-orbit-heading"
    >
      <h2 id="affairs-orbit-heading" className="sr-only">
        Space affairs domains
      </h2>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm font-mono text-[#C0C0C0]/50 uppercase tracking-widest mb-3">
            Advisory Domains
          </p>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            The Affairs Orbit
          </h3>
          <p className="text-[#C0C0C0]/70 text-lg max-w-2xl mx-auto">
            Space diplomacy spans an interconnected constellation of disciplines.
            Explore the domains where governance and strategy converge.
          </p>
        </motion.div>

        {/* Dynamic layout */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-6">
          {/* ============ ORBIT ============ */}
          <div
            className="flex-shrink-0 flex flex-col items-center justify-center transition-all duration-500 ease-out"
            style={{ flex: hasSelected ? "0 0 auto" : "1 1 100%" }}
          >
            <div
              className="relative transition-all duration-500 ease-out"
              style={{
                width: hasSelected ? 480 : 620,
                height: hasSelected ? 480 : 620,
                maxWidth: "90vw",
                maxHeight: "90vw",
              }}
              tabIndex={0}
              role="group"
              aria-label="Orbit navigation – use arrow keys to browse domains"
              onKeyDown={handleKeyDown}
            >
              {/* Visual ring track */}
              <div
                className="absolute rounded-full border border-dashed border-[#C0C0C0]/10 pointer-events-none"
                style={{ inset: `${50 - ORBIT_RADIUS}%` }}
              />
              <div
                className="absolute rounded-full border border-[#C0C0C0]/5 pointer-events-none"
                style={{ inset: `${50 - ORBIT_RADIUS - 0.5}%` }}
              />

              {/* Centre logo button */}
              <button
                onClick={toggleLock}
                aria-label={locked ? "Resume orbit rotation" : "Pause orbit rotation"}
                className="absolute inset-0 m-auto z-30
                           w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full
                           bg-[#00021C]/60 backdrop-blur-xl border border-[#C0C0C0]/20
                           flex items-center justify-center
                           shadow-[0_0_50px_rgba(192,192,192,0.1)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#00021C]
                           transition-shadow hover:shadow-[0_0_60px_rgba(192,192,192,0.18)]
                           cursor-pointer"
              >
                <Image
                  src="/SACAR_vector.svg"
                  alt="SACAR – click to toggle rotation"
                  width={120}
                  height={120}
                  className="rounded-full pointer-events-none select-none w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] md:w-[88px] md:h-[88px] lg:w-[104px] lg:h-[104px]"
                />
                {!locked && !prefersReducedMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-[#C0C0C0]/20"
                    animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden
                  />
                )}
              </button>

              {/* ======== ORBIT ITEMS ======== */}
              {mounted &&
                ITEMS.map((item, i) => {
                  const isActive = i === selectedIndex && locked;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      ref={(el) => { orbitItemRefs.current[i] = el; }}
                      onClick={() => selectItem(i)}
                      aria-label={item.label}
                      aria-pressed={isActive}
                      className={`absolute rounded-2xl cursor-pointer flex flex-col items-center justify-center gap-1 border
                        transition-[filter,border-color] duration-200 hover:brightness-130
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#00021C]
                        w-[68px] h-[68px] sm:w-[78px] sm:h-[78px] md:w-[88px] md:h-[88px] lg:w-[96px] lg:h-[96px]
                        ${isActive ? "bg-[#C0C0C0]/15 border-[#C0C0C0]/50" : "bg-[#00021C]/80 border-[#C0C0C0]/10 hover:border-[#C0C0C0]/30"}
                      `}
                      style={{
                        willChange: "transform, left, top, opacity",
                        contain: "layout style",
                        boxShadow: isActive
                          ? "0 0 22px rgba(192,192,192,0.25), 0 4px 18px rgba(0,0,0,0.4)"
                          : "0 6px 16px rgba(0,0,0,0.45)",
                      }}
                    >
                      {/* Icon */}
                      <span className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl"
                        style={{
                          background: isActive
                            ? "radial-gradient(circle at 40% 35%, rgba(192,192,192,0.25) 0%, rgba(192,192,192,0.08) 70%)"
                            : "radial-gradient(circle at 40% 35%, rgba(192,192,192,0.12) 0%, rgba(0,2,28,0.3) 70%)",
                        }}
                      >
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? "text-white" : "text-[#C0C0C0]"}`} />
                      </span>
                      <span className={`text-[8px] sm:text-[9px] md:text-[11px] font-display font-semibold leading-tight relative z-10 text-center px-1
                        ${isActive ? "text-white" : "text-[#C0C0C0]/70"}`}>
                        {item.short}
                      </span>
                    </button>
                  );
                })}
            </div>

            {/* Prompt before first selection */}
            <AnimatePresence>
              {!hasSelected && (
                <motion.p
                  className="mt-6 text-sm md:text-base font-display text-[#C0C0C0]/50 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  Select a domain to explore
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* ============ DETAILS PANEL ============ */}
          <AnimatePresence>
            {hasSelected && selectedItem && (
              <motion.div
                className="flex flex-col items-center justify-center h-[680px] md:h-[720px] lg:h-[760px] flex-1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedItem.id}
                    className="relative w-full flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Domain label — fixed height */}
                    <motion.div
                      className="text-center mb-4 flex flex-col items-center justify-end h-[72px] md:h-[84px] lg:h-[96px]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h4 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-2 leading-tight">
                        {selectedItem.label}
                      </h4>
                      <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#C0C0C0]/40 to-transparent" />
                    </motion.div>

                    {/* Blurb — fixed height to prevent layout shift */}
                    <motion.div
                      className="text-center max-w-sm mb-4 h-[48px] md:h-[52px] lg:h-[56px] flex items-start justify-center overflow-hidden"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05, duration: 0.25 }}
                    >
                      <p className="text-sm md:text-base text-[#C0C0C0]/60 leading-relaxed">
                        {selectedItem.blurb}
                      </p>
                    </motion.div>

                    {/* Bespoke animation per domain */}
                    <motion.div
                      className="relative w-[280px] h-[220px] md:w-[360px] md:h-[260px] lg:w-[420px] lg:h-[300px] rounded-2xl border border-[#C0C0C0]/12 bg-[#00021C]/70 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05, duration: 0.2 }}
                      style={{
                        boxShadow:
                          "0 4px 40px rgba(0,0,0,0.5), 0 0 80px rgba(192,192,192,0.05), inset 0 1px 0 rgba(192,192,192,0.08)",
                        filter: "drop-shadow(0 0 6px rgba(192,192,192,0.08))",
                        willChange: "transform, opacity",
                        contain: "content",
                        transform: "translateZ(0)",
                      }}
                    >
                      {DetailAnim && <DetailAnim />}
                    </motion.div>

                    {/* Example quote */}
                    <motion.div
                      className="mt-4 max-w-sm text-center"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.25 }}
                    >
                      <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-[#C0C0C0]/25 block mb-1">
                        Example
                      </span>
                      <p className="text-[11px] md:text-xs text-[#C0C0C0]/45 leading-relaxed italic">
                        {selectedItem.example}
                      </p>
                    </motion.div>

                    {/* Navigation + CTA */}
                    <motion.div
                      className="flex flex-col items-center gap-4 mt-6"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.25 }}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => stepSelection(-1)}
                          aria-label="Previous domain"
                          className="w-9 h-9 rounded-full border border-[#C0C0C0]/20 flex items-center justify-center
                                     text-[#C0C0C0]/70 hover:text-white hover:border-[#C0C0C0]/40 transition-colors
                                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/60
                                     focus-visible:ring-offset-2 focus-visible:ring-offset-[#00021C]"
                        >
                          <IconChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-mono text-[#C0C0C0]/40 select-none">
                          {selectedIndex + 1} / {N}
                        </span>
                        <button
                          onClick={() => stepSelection(1)}
                          aria-label="Next domain"
                          className="w-9 h-9 rounded-full border border-[#C0C0C0]/20 flex items-center justify-center
                                     text-[#C0C0C0]/70 hover:text-white hover:border-[#C0C0C0]/40 transition-colors
                                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/60
                                     focus-visible:ring-offset-2 focus-visible:ring-offset-[#00021C]"
                        >
                          <IconChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 h-11 px-7 rounded-full
                                   bg-[#C0C0C0] text-[#00021C] font-display font-semibold text-sm
                                   hover:bg-white transition-colors
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/60
                                   focus-visible:ring-offset-2 focus-visible:ring-offset-[#00021C]"
                      >
                        Discuss This Domain
                        <span aria-hidden>&rarr;</span>
                      </a>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}