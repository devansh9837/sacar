"use client";

import Image from "next/image";
import Starfield from "./Starfield";
import { footer as c } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#C0C0C0]/10 bg-[#00021C] overflow-hidden">
      <Starfield density={100} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          {/* Brand */}
          <div className="flex items-center gap-4">
            <Image
              src="/SACAR_vector.svg"
              alt="SACAR"
              width={40}
              height={40}
              className="rounded-full opacity-90"
            />
            <div>
              <span className="font-display font-bold text-white text-lg tracking-wide block">
                {c.brand}
              </span>
              <p className="text-[#C0C0C0]/50 text-xs font-mono tracking-widest uppercase mt-0.5">
                {c.tagline}
              </p>
            </div>
          </div>

          {/* Careers */}
          <div>
            <p className="text-[#C0C0C0]/50 text-[11px] font-mono tracking-[0.2em] uppercase">
              Careers
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {c.socials.map((social) => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 rounded-sm bg-[#C0C0C0]/6 backdrop-blur-sm border border-[#C0C0C0]/12 flex items-center justify-center hover:bg-[#C0C0C0]/15 hover:border-[#C0C0C0]/25 transition-all"
              >
                <span className="sr-only">{social}</span>
                <svg className="w-4 h-4 text-[#C0C0C0]" fill="currentColor" viewBox="0 0 24 24">
                  {social === "twitter" && (
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  )}
                  {social === "linkedin" && (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#C0C0C0]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#C0C0C0]/30 text-xs font-mono">
            © {new Date().getFullYear()} {c.copyright}
          </p>
          <div className="flex gap-6 text-xs">
            {c.legal.map((label) => (
              <a
                key={label}
                href="#"
                className="text-[#C0C0C0]/30 hover:text-[#C0C0C0]/70 transition-colors font-mono tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
