"use client";

import React from "react";
import { motion } from "motion/react";

interface FloatingParticleProps {
  count?: number;
  className?: string;
}

export default function FloatingMedicalParticles({
  count = 6,
  className = "",
}: FloatingParticleProps) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 16 + (i % 3) * 12,
    top: `${15 + (i * 22) % 75}%`,
    left: `${8 + (i * 29) % 84}%`,
    duration: 8 + (i % 4) * 3,
    delay: (i * 1.2) % 4,
    type: i % 2 === 0 ? "cross" : "orb",
  }));

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ top: p.top, left: p.left }}
          animate={{
            y: [-12, 12, -12],
            x: [-6, 6, -6],
            rotate: [0, 45, 90, 0],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.type === "cross" ? (
            <div
              style={{ width: p.size, height: p.size }}
              className="relative opacity-35"
            >
              <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#59afb5] to-transparent rounded-full" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#59afb5] to-transparent rounded-full" />
            </div>
          ) : (
            <div
              style={{ width: p.size, height: p.size }}
              className="rounded-full bg-gradient-to-br from-[#59afb5]/20 to-[#6abcc3]/10 backdrop-blur-xs border border-primary/20 shadow-[0_0_15px_rgba(89,175,181,0.25)]"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
