"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animated SACAR rocket logo.
 *
 * Strategy: position: fixed container so the rocket always stays in viewport.
 * We calculate WHERE the button will be in the viewport at the moment the
 * fly-in animation completes (i.e. at scroll=350px), and target that position.
 */
export default function RocketLogo3D() {
  const rocketRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!rocketRef.current || !trailRef.current || !glowRef.current || !ringRef.current) return;

    const rocket = rocketRef.current;
    const trail = trailRef.current;
    const glow = glowRef.current;
    const ring = ringRef.current;

    // ─── Measure current positions ───
    const scrollY = window.scrollY;

    // Nav logo: fixed element → viewport coords are stable
    const navLogo = document.querySelector("nav a img") as HTMLElement;
    let startVX = 48; // fallback
    let startVY = 40;
    if (navLogo) {
      const r = navLogo.getBoundingClientRect();
      startVX = r.left + r.width / 2;
      startVY = r.top + r.height / 2;
    }

    // Button: scrollable element. Get its DOCUMENT position, then compute
    // where it'll be in the viewport at specific scroll values.
    const btn = document.getElementById("hero-cta-btn");
    let btnDocY = window.innerHeight * 0.78 + scrollY;
    let btnDocX = window.innerWidth / 2;
    if (btn) {
      const r = btn.getBoundingClientRect();
      btnDocX = r.left + r.width / 2;
      btnDocY = r.top + scrollY + r.height / 2;
    }

    // Button viewport position at a given scroll value:
    // btnViewportY(s) = btnDocY - s
    // At scroll=350 (end of fly-in): btnViewportY = btnDocY - 350
    const flyInEnd = 350;
    const btnVYatArrival = btnDocY - flyInEnd;
    const btnVXatArrival = btnDocX;

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
        const orbitR = isDesktop ? 50 : 36;

        // Target: above the button at the moment of arrival
        const targetVX = btnVXatArrival;
        const targetVY = btnVYatArrival - rocketSize / 2 - 12;

        // ─── Initial state: over the nav logo ───
        gsap.set(rocket, {
          opacity: 0,
          left: startVX,
          top: startVY,
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 0.9,
          width: rocketSize,
          height: rocketSize,
        });
        gsap.set(trail, { opacity: 0, scaleY: 0 });
        gsap.set(glow, { opacity: 0, scale: 0.4 });
        gsap.set(ring, { opacity: 0, scale: 0.5 });

        // ─── Phase 1: Fly from nav logo to above button ───
        // The rocket stays in fixed space; the button is scrolling up.
        // We animate the rocket from (startVX, startVY) to (targetVX, targetVY)
        // where targetVY accounts for the button having scrolled up by 350px.
        const flyInTl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "1px top",
            end: `${flyInEnd}px top`,
            scrub: 1.5,
          },
        });

        flyInTl
          .to(rocket, { opacity: 1, duration: 0.05 }, 0)
          .to(
            rocket,
            {
              left: targetVX,
              top: targetVY,
              rotation: 180,
              scale: 1,
              ease: "power1.inOut",
              duration: 1,
            },
            0
          )
          .to(trail, { opacity: 0.5, scaleY: 1, duration: 0.3 }, 0)
          .to(glow, { opacity: 0.7, scale: 1, duration: 0.4 }, 0.1)
          .to(trail, { opacity: 0, scaleY: 0, duration: 0.2 }, 0.7)
          .to(ring, { opacity: 0.35, scale: 1, duration: 0.2 }, 0.8);

        // ─── Phase 2: Follow button + float (scroll 350→750px) ───
        // After arrival, as user continues scrolling, the button keeps moving up.
        // We need the rocket to track it (move up at same rate as scroll).
        // Over 400px of scroll, button moves up 400px → rocket top decreases by 400px.
        const followTl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: `${flyInEnd}px top`,
            end: "750px top",
            scrub: 1,
          },
        });

        followTl.to(rocket, {
          top: targetVY - (750 - flyInEnd),
          ease: "none",
          duration: 1,
        });

        // Float animation (continuous, time-based)
        const floatAnim = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
        floatAnim.to(rocket, {
          y: isDesktop ? -14 : -9,
          duration: 1.4,
          ease: "sine.inOut",
        });

        const glowPulse = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
        glowPulse.to(glow, {
          opacity: 0.35,
          scale: 1.15,
          duration: 1.8,
          ease: "sine.inOut",
        });

        ScrollTrigger.create({
          trigger: document.body,
          start: `${flyInEnd}px top`,
          end: "750px top",
          onEnter: () => {
            floatAnim.play();
            glowPulse.play();
          },
          onLeaveBack: () => {
            floatAnim.pause();
            glowPulse.pause();
            gsap.to(rocket, { y: 0, duration: 0.25 });
          },
          onLeave: () => {
            floatAnim.pause();
            glowPulse.pause();
            gsap.to(rocket, { y: 0, duration: 0.2 });
          },
        });

        // ─── Phase 3: Orbit (scroll 750→1250px) ───
        // Continue following + orbit around button center
        const orbitTl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "750px top",
            end: "1250px top",
            scrub: 1.5,
          },
        });

        // During orbit, button continues scrolling up by 500px more
        // Orbit center offset: button center is ~(rocketSize/2 + 12) below rocket rest
        const orbitCenterOffset = rocketSize / 2 + 12;
        const orbitScrollRange = 500;
        const steps = 16;
        for (let i = 1; i <= steps; i++) {
          const angle = (i / steps) * Math.PI * 2;
          const ox = Math.sin(angle) * orbitR;
          const oy = orbitCenterOffset - Math.cos(angle) * orbitR;
          // Follow scroll: button moves up proportionally
          const scrollFollow = -(orbitScrollRange * (i / steps));
          orbitTl.to(
            rocket,
            {
              x: ox,
              y: oy,
              top: targetVY - (750 - flyInEnd) + scrollFollow,
              rotation: 180 + (360 * i) / steps,
              duration: 1 / steps,
              ease: "none",
            },
            (i - 1) / steps
          );
        }

        // ─── Phase 4: Fly away ───
        const flyOutTl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "1250px top",
            end: "1550px top",
            scrub: 1,
          },
        });

        flyOutTl
          .to(
            rocket,
            {
              opacity: 0,
              left: window.innerWidth + 80,
              top: "15%",
              x: 0,
              y: 0,
              rotation: -20,
              scale: 0.15,
              ease: "power2.in",
              duration: 1,
            },
            0
          )
          .to(glow, { opacity: 0, scale: 0.2, duration: 0.3 }, 0)
          .to(ring, { opacity: 0, scale: 0.2, duration: 0.3 }, 0)
          .to(trail, { opacity: 0, duration: 0.2 }, 0);

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
          className="absolute -inset-4 md:-inset-5"
          style={{
            background:
              "radial-gradient(circle, rgba(192,192,192,0.22) 0%, rgba(192,192,192,0.06) 45%, transparent 70%)",
            filter: "blur(7px)",
            transform: "translateZ(-8px)",
          }}
        />

        {/* SVG with 3D depth */}
        <div
          className="relative w-full h-full"
          style={{
            transform: "rotateX(8deg) rotateY(-4deg) translateZ(12px)",
            filter:
              "drop-shadow(0 0 7px rgba(192,192,192,0.4)) drop-shadow(0 0 16px rgba(192,192,192,0.12)) drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
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

        {/* Trail */}
        <div
          ref={trailRef}
          className="absolute bottom-full left-1/2 -translate-x-1/2"
          style={{
            width: "2px",
            height: "35px",
            background:
              "linear-gradient(to top, rgba(192,192,192,0.5), rgba(192,192,192,0.08) 65%, transparent)",
            filter: "blur(1px)",
            transformOrigin: "bottom center",
          }}
        />

        {/* Orbit ring */}
        <div
          ref={ringRef}
          className="absolute left-1/2"
          style={{
            top: "calc(100% + 4px)",
            width: "90px",
            height: "90px",
            marginLeft: "-45px",
            border: "1px solid rgba(192,192,192,0.12)",
            borderRadius: "50%",
            transform: "rotateX(65deg)",
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
