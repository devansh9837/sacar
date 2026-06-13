"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/**
 * Rocket Logo Animation:
 * 1. Flies from nav logo to "Book a session" button (lands pointing down)
 * 2. Hovers above button with gentle bob
 * 3. Travels vertically down to "What we do" section heading
 * 4. Lands just before each diplomacy card heading (vertically, nose down)
 * 5. Continues card by card until the last one, then fades out
 *
 * All movements are vertical & smooth. Rocket always faces downward (rotation: 180).
 */
export default function RocketLogo3D() {
  const rocketRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!rocketRef.current || !trailRef.current || !glowRef.current) return;

    const rocket = rocketRef.current;
    const trail = trailRef.current;
    const glow = glowRef.current;

    const scrollY = window.scrollY;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // ─── Measurements ───

    // Nav logo (fixed)
    const navLogo = document.querySelector("nav a img") as HTMLElement;
    let startVX = 48;
    let startVY = 40;
    if (navLogo) {
      const r = navLogo.getBoundingClientRect();
      startVX = r.left + r.width / 2;
      startVY = r.top + r.height / 2;
    }

    // CTA button
    const btn = document.getElementById("hero-cta-btn");
    let btnDocY = vh * 0.78 + scrollY;
    let btnDocX = vw / 2;
    if (btn) {
      const r = btn.getBoundingClientRect();
      btnDocX = r.left + r.width / 2;
      btnDocY = r.top + scrollY + r.height / 2;
    }

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };

        const rocketSize = isDesktop ? 72 : 54;
        const centerX = vw / 2;

        // Button viewport Y at end of fly-in (scroll 350px)
        const flyInEnd = 350;
        const btnVY = btnDocY - flyInEnd;
        const targetVY = btnVY - rocketSize / 2 - 10;

        // ─── Initial state: at nav logo, invisible, pointing right (will rotate to down) ───
        gsap.set(rocket, {
          opacity: 0,
          left: startVX,
          top: startVY,
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 0.8,
          width: rocketSize,
          height: rocketSize,
        });
        gsap.set(trail, { opacity: 0, scaleY: 0 });
        gsap.set(glow, { opacity: 0, scale: 0.4 });

        // ═══════════════════════════════════════════
        // PHASE 1: Fly from nav logo → above CTA button
        // Scroll: 1px → 350px
        // ═══════════════════════════════════════════
        const phase1 = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "1px top",
            end: `${flyInEnd}px top`,
            scrub: 1.5,
          },
        });

        phase1
          .to(rocket, { opacity: 1, duration: 0.04 }, 0)
          .to(rocket, {
            left: btnDocX,
            top: targetVY,
            rotation: 180, // nose pointing DOWN
            scale: 1,
            ease: "power1.inOut",
            duration: 1,
          }, 0)
          .to(trail, { opacity: 0.5, scaleY: 1, duration: 0.25 }, 0)
          .to(glow, { opacity: 0.6, scale: 1, duration: 0.4 }, 0.1)
          .to(trail, { opacity: 0, scaleY: 0, duration: 0.2 }, 0.75);

        // ═══════════════════════════════════════════
        // PHASE 2: Hover above button (gentle bob, follow scroll)
        // Scroll: 350px → 800px
        // ═══════════════════════════════════════════
        const phase2 = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: `${flyInEnd}px top`,
            end: "800px top",
            scrub: 1,
          },
        });

        // Follow the button as it scrolls up
        phase2.to(rocket, {
          top: targetVY - (800 - flyInEnd),
          ease: "none",
          duration: 1,
        });

        // Gentle float (time-based)
        const floatAnim = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
        floatAnim.to(rocket, { y: -10, duration: 1.3, ease: "sine.inOut" });

        const glowPulse = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
        glowPulse.to(glow, { opacity: 0.35, scale: 1.1, duration: 1.6, ease: "sine.inOut" });

        ScrollTrigger.create({
          trigger: document.body,
          start: `${flyInEnd}px top`,
          end: "800px top",
          onEnter: () => { floatAnim.play(); glowPulse.play(); },
          onLeaveBack: () => { floatAnim.pause(); glowPulse.pause(); gsap.to(rocket, { y: 0, duration: 0.3 }); },
          onLeave: () => { floatAnim.pause(); glowPulse.pause(); gsap.to(rocket, { y: 0, duration: 0.2 }); },
        });

        // ═══════════════════════════════════════════
        // PHASE 3: Travel vertically down to Diplomacy section
        // Trigger: Diplomacy section enters viewport
        // ═══════════════════════════════════════════
        const diplomacySection = document.getElementById("diplomacy-framework");
        if (!diplomacySection) return;

        // Fly down to center of viewport heading area
        const toDiploTl = gsap.timeline({
          scrollTrigger: {
            trigger: diplomacySection,
            start: "top 95%",
            end: "top 50%",
            scrub: 2,
          },
        });

        toDiploTl
          .to(rocket, {
            left: centerX,
            top: "22%", // near the "What we do" heading
            x: 0,
            y: 0,
            rotation: 180,
            scale: 1,
            ease: "power2.inOut",
            duration: 1,
          }, 0)
          .to(trail, { opacity: 0.4, scaleY: 1, duration: 0.3 }, 0)
          .to(glow, { opacity: 0.6, scale: 1, duration: 0.4 }, 0)
          .to(trail, { opacity: 0, scaleY: 0, duration: 0.2 }, 0.7);

        // ═══════════════════════════════════════════
        // PHASE 4: Land at each card's heading, one by one
        // The rocket travels to just above each card's text heading,
        // then continues to the next card.
        // ═══════════════════════════════════════════
        const cardIds = ["tech", "legal", "affairs", "gov", "geo", "power", "diplo", "ir"];

        cardIds.forEach((cardId, idx) => {
          const card = diplomacySection.querySelector(`.diplomacy-card-${cardId}`);
          if (!card) return;

          // Get the text element for this card
          const textEl = card.querySelector(`.diplomacy-text-${cardId}`) as HTMLElement;
          if (!textEl) return;

          const isEven = idx % 2 === 0;

          // On desktop: text is on the side opposite the image
          // Even cards: image left, text right → rocket goes left of text
          // Odd cards: image right, text left → rocket goes right of text
          // On mobile: text is always below image, centered
          const textLeft = isDesktop
            ? (isEven ? "62%" : "32%")
            : "50%";

          // Rocket lands just above the heading text, centered on it
          const landTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "top 35%",
              scrub: 2,
            },
          });

          landTl
            .to(rocket, {
              left: textLeft,
              top: "38%",
              x: 0,
              y: 0,
              rotation: 180, // always nose down
              scale: idx === 6 ? 1.1 : 1, // bigger for featured
              ease: "power2.inOut",
              duration: 1,
            }, 0)
            .to(trail, { opacity: 0.35, scaleY: 1, duration: 0.2 }, 0)
            .to(glow, {
              opacity: idx === 6 ? 0.8 : 0.5,
              scale: idx === 6 ? 1.2 : 1,
              duration: 0.5,
            }, 0)
            .to(trail, { opacity: 0, scaleY: 0, duration: 0.2 }, 0.7);

          // Landing effect: slight bounce when arriving
          const bounceTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 35%",
              end: "top 25%",
              scrub: 1,
            },
          });

          bounceTl
            .to(rocket, { y: 6, scale: 1.05, duration: 0.5, ease: "power2.out" })
            .to(rocket, { y: 0, scale: idx === 6 ? 1.1 : 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
        });

        // ═══════════════════════════════════════════
        // PHASE 5: Fade out after last card
        // ═══════════════════════════════════════════
        const lastCard = diplomacySection.querySelector(".diplomacy-card-ir");
        if (lastCard) {
          const fadeOut = gsap.timeline({
            scrollTrigger: {
              trigger: lastCard,
              start: "bottom 50%",
              end: "bottom 10%",
              scrub: 1.5,
            },
          });

          fadeOut
            .to(rocket, {
              opacity: 0,
              top: "-5%",
              scale: 0.3,
              rotation: 180,
              ease: "power2.in",
              duration: 1,
            }, 0)
            .to(glow, { opacity: 0, scale: 0.3, duration: 0.4 }, 0)
            .to(trail, { opacity: 0, duration: 0.3 }, 0);
        }

        return () => {
          floatAnim.kill();
          glowPulse.kill();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, [ready]);

  if (!ready) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[55]"
      aria-hidden="true"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={rocketRef}
        className="absolute will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glow */}
        <div
          ref={glowRef}
          className="absolute -inset-5 md:-inset-6"
          style={{
            background:
              "radial-gradient(circle, rgba(192,192,192,0.22) 0%, rgba(192,192,192,0.05) 50%, transparent 70%)",
            filter: "blur(8px)",
            transform: "translateZ(-10px)",
          }}
        />

        {/* SVG with 3D depth */}
        <div
          className="relative w-full h-full"
          style={{
            transform: "rotateX(6deg) rotateY(-3deg) translateZ(12px)",
            filter:
              "drop-shadow(0 0 8px rgba(192,192,192,0.4)) drop-shadow(0 0 18px rgba(192,192,192,0.1)) drop-shadow(0 3px 10px rgba(0,0,0,0.5))",
          }}
        >
          <Image
            src="/SACAR_vector.svg"
            alt=""
            fill
            className="object-contain"
            style={{ filter: "brightness(1.2) contrast(1.05)" }}
            priority
          />
        </div>

        {/* Exhaust trail — above rocket since nose points down */}
        <div
          ref={trailRef}
          className="absolute bottom-full left-1/2 -translate-x-1/2"
          style={{
            width: "2px",
            height: "40px",
            background:
              "linear-gradient(to top, rgba(192,192,192,0.5), rgba(192,192,192,0.08) 60%, transparent)",
            filter: "blur(1px)",
            transformOrigin: "bottom center",
          }}
        />

        {/* Particles */}
        <div className="absolute inset-0 overflow-visible">
          <div
            className="absolute w-1 h-1 bg-[#C0C0C0]/35 rounded-full animate-particle-1"
            style={{ top: "-14%", left: "68%" }}
          />
          <div
            className="absolute w-0.5 h-0.5 bg-[#C0C0C0]/25 rounded-full animate-particle-2"
            style={{ top: "-10%", left: "28%" }}
          />
          <div
            className="absolute w-0.5 h-0.5 bg-[#C0C0C0]/20 rounded-full animate-particle-3"
            style={{ top: "-18%", left: "50%" }}
          />
        </div>
      </div>
    </div>
  );
}
