# SACAR Website — Copilot Instructions

## Project
Space diplomacy consulting institute. Single-page Next.js App Router site.
Theme: cosmic navy (#00021C) + refined silver (#C0C0C0). NEVER deviate from this palette.

## Stack Rules
- Use Framer Motion for entrance/hover/stagger animations
- Use GSAP + ScrollTrigger for scroll-scrubbed timelines and path animations
- Use Lenis for ALL scroll — sync with GSAP ticker (see ScrollAnimations.tsx)
- Use React Three Fiber for all 3D — never raw Three.js
- Tailwind v4 only — no inline style objects unless inside R3F/Three

## MCP Tool Usage
- Use Context7 BEFORE writing any GSAP, Lenis, or R3F code — fetch live docs first
- Use Playwright AFTER every UI change — screenshot at 1440px and 375px widths
- Use AceternityUI MCP when adding new components — always check library first
- Use Blender MCP for custom 3D model generation (.glb exports into /public/models)

## What NOT to Do
- Never hardcode colors outside the design token variables in globals.css
- Never disable or remove existing Framer Motion animations — only enhance them

## Git Workflow Rules
- NEVER commit directly to main
- Before starting any task, confirm which branch is active
- After completing each feature, stage and commit with a 
  descriptive message: "feat: [what changed]"
- Commit message format: feat | fix | style | refactor | content
- After committing, remind me to push and open a PR
- Always run `npm run build` locally before committing to 
  catch TypeScript and Next.js build errors before Vercel does

