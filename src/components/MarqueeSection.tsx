"use client";

import { motion } from "motion/react";

const PILLARS_ROW1 = [
  "Advanced Diagnostics",
  "Personalized Care",
  "NABL Aligned Protocols",
  "Expert Specialists",
  "Modern Analyzers",
  "24/7 Home Support",
  "Hospital-Grade Safety",
  "99.8% Accurate Results",
];

const PILLARS_ROW2 = [
  "Home Sample Collection",
  "Digital WhatsApp Reports",
  "Preventive Full Body Checkups",
  "Rapid 6-Hour Turnaround",
  "Sterile Vacuum Tubes",
  "Experienced Phlebotomists",
  "Affordable Diagnostic Plans",
  "Pune Wide Coverage",
];

export default function MarqueeSection() {
  return (
    <div className="py-8 bg-gradient-to-b from-white via-[#f8fafb] to-white border-y border-gray-100 overflow-hidden select-none relative [perspective:1200px]">
      {/* 3D Depth Vignette Edge Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* Row 1: Leftward Scroll with 3D slant */}
      <div className="flex overflow-hidden group mb-3 [transform:rotateX(6deg)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 sm:gap-16 whitespace-nowrap items-center will-change-transform"
        >
          {[...PILLARS_ROW1, ...PILLARS_ROW1].map((item, i) => (
            <div key={i} className="flex items-center gap-12 sm:gap-16">
              <span className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-gray-200 uppercase tracking-tighter transition-colors duration-300 hover:text-primary/70 cursor-default">
                {item}
              </span>
              <div className="w-2.5 h-2.5 bg-primary/30 rounded-full shadow-[0_0_8px_rgba(89,175,181,0.5)]" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Rightward Scroll with Badge Pills */}
      <div className="flex overflow-hidden group [transform:rotateX(-4deg)]">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 whitespace-nowrap items-center will-change-transform"
        >
          {[...PILLARS_ROW2, ...PILLARS_ROW2].map((item, i) => (
            <div
              key={i}
              className="px-4 py-1.5 rounded-full bg-white border border-gray-100/80 shadow-xs text-xs sm:text-sm font-semibold text-gray-600 hover:text-primary hover:border-primary/30 transition-all cursor-default flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

