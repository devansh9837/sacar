# SACAR Website

## Stack
- Next.js 16, App Router. Single-page site, everything renders on `app/page.tsx`
- Tailwind CSS v4 with CSS-based config (`@theme inline` in `globals.css`). No `tailwind.config.ts`
- Framer Motion for section reveals and hover states
- GSAP + ScrollTrigger for the scroll-pinned DiplomacyFramework
- Three.js (`@react-three/fiber` + `@react-three/drei`) for Hero3DScene, Cobe for the globe
- Lenis for smooth scrolling
- Fonts via next/font: Space Grotesk (display), Inter (body), Roboto Mono (mono)
- Lucide React and Tabler Icons
- clsx, tailwind-merge for class utilities

## Design system
- **Tone**: editorial, strategic, restrained. Think diplomatic briefing, not startup landing page.
- **Theme**: dark. Cosmic navy background (`#00021C`), silver text (`#C0C0C0`), white accents (`#FFFFFF`)
- **Typography**: Space Grotesk on h1/h2, Inter on h3-h6 and body, Roboto Mono on labels and technical text
- **Border radius**: 2px. Buttons are sharp rectangles, not rounded blobs.
- **Spacing**: 8px base unit, defined as CSS variables `--spacing-xs` through `--spacing-5xl`
- **Glass effects**: full glassmorphism system in globals.css (`glass`, `glass-card-dark`, `glass-card-light`, `glass-card-featured`)
- **Section separation**: dividers or spacing. Don't wrap sections in extra glass card containers.

## Content
- All copy lives in `lib/content.ts`. Components import from there, no hardcoded strings.
- Workflow: edit `page-contents.md`, then update `lib/content.ts` to match.
- Icons, animation config, and layout logic stay in component files.

## Components
- Section components are flat files in `/components/` (e.g. `Hero.tsx`, `Services.tsx`)
- Reusable UI primitives go in `/components/ui/` (globe, sparkles, orbiting-circles, etc.)
- `/components/NEVER-USE/` has deprecated components, excluded from tsconfig
- Use the CSS variables in `globals.css`. Don't hardcode colors.
- Animations already respect `prefers-reduced-motion` via a global rule
- Breakpoints: sm 640, md 768, lg 1024 (mobile-first)

## Code style
- TypeScript strict mode
- `@/*` path alias for imports
- Default exports on pages and section components
- Only comment non-obvious logic

## Working with Claude
- **Any UI/UX change must go through the `/frontend-design` skill.** No exceptions.
- Don't touch the Hero3DScene or EarthBackground scroll-fade. They're intentional. If they need performance work, optimize them, don't replace them with something lighter.
- Same goes for the DiplomacyFramework scroll-pinned animation (GSAP ScrollTrigger). Don't swap it for a viewport-triggered alternative. The pinned behavior is the whole point.
- Don't wrap sections in glass cards for visual separation. Dividers and spacing are enough.
- Be bold with type size and whitespace. Generic layouts are worse than risky ones.
- Output working code. No pseudocode, no stubs.
- If you need a library not in package.json, ask first.
