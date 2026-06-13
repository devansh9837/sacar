# SACAR Website — Complete Project Summary & Architecture

## What is SACAR?

**Space Affair Consultancy for Advanced Research** — a space diplomacy consulting institute with strong Indian cultural heritage and a non-aligned diplomatic philosophy.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | **Next.js** (App Router) | 16.1.1 |
| Language | **TypeScript** (strict mode) | 5.x |
| UI | **React** | 19.2.3 |
| Styling | **Tailwind CSS v4** + custom CSS variables | 4.x |
| Primary Animation | **Framer Motion** | 12.25.0 |
| Secondary Animation | **GSAP** + ScrollTrigger + `@gsap/react` | 3.14.2 |
| 3D Engine | **Three.js** via `@react-three/fiber` + `@react-three/drei` | 0.182.0 |
| 3D Scenes | **Spline** (`@splinetool/react-spline`) | 4.1.0 |
| Globe | **Cobe** (WebGL globe) | 0.6.5 |
| Smooth Scroll | **Lenis** | 1.3.18 |
| Icons | **Tabler Icons** + **Lucide React** | 3.36.1 / 0.562.0 |
| Utilities | `clsx` + `tailwind-merge` (via `cn()` helper) | — |
| Linting | ESLint 9 + `eslint-config-next` | — |

---

## Design System — "Elegant Restraint"

**Strict 2-color palette:**
- **Cosmic Navy `#00021C`** — 70% of backgrounds
- **Refined Silver `#C0C0C0`** — all text, borders, accents
- **Pure White `#FFFFFF`** — Services section only (intentional contrast break)
- Silver opacity variations: 0.05–0.8 (10 stops)
- Navy opacity variations: 0.03–0.9 (11 stops)

**Typography (Google Fonts via Next.js font optimization):**
- **Space Grotesk** (400–700) — `--font-display` — H1/H2 headings, buttons
- **Inter** (400) — `--font-body` — Body text, H3–H6
- **Roboto Mono** (400–500) — `--font-mono` — Technical labels, monospace callouts

**Spacing System:** 8px–120px (xs through 5xl)

---

## Page Architecture (Single Page, Scroll-Based)

The site is a single-page application. All sections are active — none are commented out.

```
┌─ CursorGlow (global mouse-follow glow, springs on [data-glow] elements)
├─ EarthBackground (fixed, fades to invisible over first 1000px of scroll)
├─ Navigation (sticky, backdrop-blur on scroll, mobile hamburger)
│
├─ 1. Hero
│     ├─ Hero3DScene (Three.js: 3 orbital rings, 4 nodes, 600-pt particle sphere, 1500 bg stars)
│     ├─ Word-by-word text reveal (TextGenerateEffect)
│     ├─ Animated pill badges (staggered entrance, shimmer gradient)
│     ├─ 2 CTA buttons (MovingBorder primary + outline secondary)
│     └─ SACAR vector logo + scroll indicator
│
├─ 2. DiplomacyFramework ("What Space Diplomacy Entails")
│     ├─ GSAP ScrollTrigger pinned section (250vh scroll height)
│     ├─ 6 animated flow nodes: Technical → Legal → Space Affairs → Geopolitics → Space Diplomacy → International Relations
│     ├─ SVG connecting lines animate via stroke-dashoffset scrub
│     ├─ Desktop (560×520) and mobile (310×530) responsive layouts
│     └─ TiltCard nodes with glow/spotlight effect
│
├─ 3. Differentiator ("About Us" + "How We Are Different")
│     ├─ Starfield background (density 30)
│     ├─ Top: About Us headline + body text
│     └─ 3-card grid: Technical / Legal / Diplomatic (featured, with gradient accent line)
│
├─ 4. Mission ("Our Philosophy")
│     ├─ Starfield background (density 40)
│     ├─ Left: heading, 2 paragraphs, 4 mission pillars
│     └─ Right: CSS orbital visualization (5 concentric rings, 3 orbiting dots, central logo)
│
├─ 5. Services (3 Advisory Pillars — White Background)
│     ├─ White background (unique light section)
│     ├─ Meteors effect in card headers
│     ├─ TiltCard light variant
│     └─ 3 pillars with expandable sub-services: Diplomatic Strategy / Geopolitical Risk / Policy Research
│
├─ 6. Audience (4 Target Segments)
│     ├─ Starfield background (density 25)
│     └─ 4 cards: Foreign Ministries / International NGOs / Space Agencies / Corporate Strategy
│
├─ 7. Engagement (Call-to-Action + Newsletter)
│     ├─ Starfield background (density 60, densest)
│     ├─ Dual CTAs with hover glow
│     └─ Newsletter email signup form with backdrop-blur input
│
└─ 8. Footer
      ├─ Starfield background (density 30)
      ├─ Brand section: logo + tagline + social links (Twitter, LinkedIn, GitHub)
      └─ 4 link groups: Advisory / Research / About / Connect
```

---

## Component Inventory

### Core Section Components (9 active)

| Component | Purpose | Background | Key Tech |
|---|---|---|---|
| Navigation.tsx | Sticky header + mobile hamburger, backdrop-blur on scroll | Transparent → solid | Framer Motion |
| Hero.tsx | Landing section, brand intro, 3D scene | Navy | Hero3DScene (Three.js), TextGenerateEffect, MovingBorder |
| DiplomacyFramework.tsx | Scroll-pinned flow chart of 6 diplomacy domains | Navy | GSAP ScrollTrigger, SVG stroke animation, TiltCard |
| Differentiator.tsx | About Us + 3-card differentiator grid | Navy + Starfield | TiltCard, Framer Motion stagger |
| Mission.tsx | Philosophy pillars + CSS orbital visualization | Navy + Starfield | CSS keyframe orbitals |
| Services.tsx | 3 advisory pillars with expandable sub-services | **White** | TiltCard (light), Meteors, MovingBorder |
| Audience.tsx | 4 target audience segments | Navy + Starfield | TiltCard (dark) |
| Engagement.tsx | CTA + newsletter email signup | Navy + Starfield | MovingBorder |
| Footer.tsx | Brand, social links, nav columns | Navy + Starfield | Static layout |

### Visual/Effect Components (5 active)

| Component | Purpose | Notes |
|---|---|---|
| EarthBackground.tsx | Fixed parallax Earth image (earth-nasa.jpg), fades over 1000px scroll | 180vw, brightness 0.85, saturate 1.15 |
| CursorGlow.tsx | 400×400px silver radial glow that spring-follows mouse on `[data-glow]` elements | Disabled on touch/reduced-motion |
| Starfield.tsx | Procedural stars with deterministic LCG seeding, 10% twinkle | Density prop (25–60 by section) |
| Hero3DScene.tsx | Three.js canvas: 3 orbital rings, 4 emissive nodes, 600-pt particle sphere, 1500 bg stars | SSR-disabled via dynamic import |
| TiltCard.tsx | Parallax tilt card with mouse-tracking spotlight overlay | 3 variants: dark / light / featured |

### UI Library Components (9)

| Component | Used In | Description |
|---|---|---|
| bento-grid.tsx | (available) | Mixed-size responsive grid |
| globe.tsx | (available) | Cobe WebGL globe |
| infinite-moving-cards.tsx | (available) | Infinite horizontal scroll carousel |
| meteors.tsx | Services | Falling meteor particle effect |
| moving-border.tsx | Hero, Services, Engagement | Rotating conic-gradient border animation |
| orbiting-circles.tsx | (available) | CSS orbital animation container |
| sparkles.tsx | Hero3DScene | Shimmer/sparkle effect |
| text-generate-effect.tsx | Hero | Word-by-word fade-in with blur |
| tracing-beam.tsx | (available) | Scroll-linked vertical beam |

### Deprecated Components (`/components/NEVER-USE/`)

AffairsOrbit.tsx, Briefings.tsx, DiplomacyCards.tsx, DiplomaticGap.tsx, FlyingRocket.tsx, InteractiveSolarSystem.tsx, LoadingScreen.tsx, RocketScrollAnimation.tsx, SpaceDiplomacyActivities.tsx, SplineRocket.tsx

---

## Data Layer

| File | Content | # Items |
|---|---|---|
| lib/content.ts | **Single source of truth** for all section text (nav, hero, diplomacyFramework, differentiator, mission, services, audience, engagement, footer) | 9 exports |
| lib/data/audiences.ts | 4 audience segments with Tabler icons | 4 |
| lib/data/differentiators.ts | 3 differentiator cards with icons (diplomatic is featured) | 3 |
| lib/data/services.ts | 3 service pillars each with 3 expandable sub-services | 3 |
| lib/affairs-orbit.ts | Deprecated — 8 diplomacy types for old AffairsOrbit | 8 |
| lib/diplomacy-activities.ts | Deprecated — 13 instruments for old SpaceDiplomacyActivities | 13 |
| lib/utils.ts | `cn()` class merge utility (clsx + tailwind-merge) | 1 function |

**All content is hardcoded** — no CMS, no database, no API calls. The site is fully static.

---

## Assets

| Asset | Location | Usage |
|---|---|---|
| SACAR logo SVG | `/SACAR_vector.svg` | Navigation, Hero, Footer, Mission |
| Earth texture | `/textures/earth-nasa.jpg` | EarthBackground |
| Fonts | Google Fonts CDN (Next.js optimized) | Space Grotesk, Inter, Roboto Mono |

---

## External Dependencies / Services

1. **Google Fonts API** — font delivery (Space Grotesk, Inter, Roboto Mono)
2. **No backend, no database, no auth, no CMS, no analytics**

---

## Animation Architecture

| Layer | Technology | Used For |
|---|---|---|
| **Scroll-Scrub** | GSAP + ScrollTrigger | DiplomacyFramework pinned section, SVG line draws |
| **Entrance/Hover** | Framer Motion `whileInView` + `whileHover` | All section entrances, card hovers, stagger sequences |
| **3D Rendering** | Three.js / React Three Fiber | Hero3DScene orbital rings and particles |
| **CSS Keyframes** | Native CSS | Starfield twinkling, orbital rings in Mission, EarthBackground |
| **Spring Physics** | Framer Motion `useSpring` | CursorGlow mouse-follow, TiltCard parallax reset |
| **Smooth Scroll** | Lenis | Global scroll smoothing |
