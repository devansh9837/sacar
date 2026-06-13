"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DiplomacyFramework from "@/components/DiplomacyFramework";
import Differentiator from "@/components/Differentiator";
import Perspective from "@/components/Perspective";
import Audience from "@/components/Audience";
import Engagement from "@/components/Engagement";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import EarthBackground from "@/components/EarthBackground";
import CursorGlow from "@/components/CursorGlow";

const RocketLogo3D = dynamic(() => import("@/components/RocketLogo3D"), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-[100svh] bg-[#00021C]">
      <CursorGlow />
      {/* Earth background that fades on scroll */}
      <EarthBackground />

      {/* 3D Rocket Logo — fixed overlay, scroll-driven */}
      <RocketLogo3D />

      <Navigation />
      <Hero />
      <DiplomacyFramework />
      <Differentiator />
      {/* Section divider */}
      <div className="max-w-xs mx-auto">
        <hr className="border-0 h-px bg-[#C0C0C0]/10" />
      </div>
      <Perspective />
      <Audience />
      {/* Section divider */}
      <div className="max-w-xs mx-auto">
        <hr className="border-0 h-px bg-[#C0C0C0]/10" />
      </div>
      <Engagement />
      <ContactUs />
      <Footer />
    </main>
  );
}
