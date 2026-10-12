"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import ButtonWithIcon from "./ui/button-with-icon";
import Link from "next/link";
import StatCounter from "./3d/StatCounter";
import FloatingMedicalParticles from "./3d/FloatingMedicalParticles";

const AboutDNASpline = dynamic(() => import("./3d/AboutDNASpline"), {
  ssr: false,
});

export default function AboutSection() {
  return (
    <section id="home" className="px-4 lg:px-12 py-24 bg-white relative overflow-hidden">
      {/* Ambient background particles */}
      <FloatingMedicalParticles count={4} />

      {/* Decorative radial glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#59afb5] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#59afb5] animate-ping" />
            About Dr Baviskar Pathology Lab
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight mb-6 text-gray-900">
            Providing Advanced Care with Modern Diagnostic Equipment
          </h2>
          <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
            At Dr Baviskar Pathology lab, we combine clinical expertise with state-of-the-art diagnostic technology. Our commitment is to provide precise, timely, and accessible healthcare solutions to the community in Pune, ensuring every patient receives the highest standard of diagnostic care.
          </p>
          <div className="mb-14">
            <Link href="/about-us" className="inline-block">
              <ButtonWithIcon label="Learn More About Us" className="w-auto shadow-lg shadow-primary/20" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-12">
            <div className="p-4 rounded-2xl bg-gray-soft/60 border border-gray-100/60 shadow-xs">
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-2 text-dark">
                <StatCounter value={15} suffix="+" />
              </h3>
              <div className="h-0.5 w-full bg-primary/20 mb-3" />
              <p className="text-gray-500 text-xs md:text-sm font-semibold tracking-tight">Years Of Clinical Experience</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-soft/60 border border-gray-100/60 shadow-xs">
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-2 text-dark">
                <StatCounter value={50} suffix="+" />
              </h3>
              <div className="h-0.5 w-full bg-primary/20 mb-3" />
              <p className="text-gray-500 text-xs md:text-sm font-semibold tracking-tight">Certified Specialists</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-soft/60 border border-gray-100/60 shadow-xs">
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-2 text-dark">
                <StatCounter value={20} suffix="+" />
              </h3>
              <div className="h-0.5 w-full bg-primary/20 mb-3" />
              <p className="text-gray-500 text-xs md:text-sm font-semibold tracking-tight">Medical Awards Achieved</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-soft/60 border border-gray-100/60 shadow-xs">
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-2 text-dark">
                <StatCounter value={15} suffix="k+" />
              </h3>
              <div className="h-0.5 w-full bg-primary/20 mb-3" />
              <p className="text-gray-500 text-xs md:text-sm font-semibold tracking-tight">Satisfied Families</p>
            </div>
          </div>
        </div>

        {/* 3D Interactive Spline DNA Model */}
        <div className="relative flex items-center justify-center min-h-[460px]">
          <AboutDNASpline />
        </div>
      </div>
    </section>
  );
}

