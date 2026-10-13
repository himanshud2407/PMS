"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import ButtonWithIcon from "./ui/button-with-icon";
import Link from "next/link";
import StatCounter from "./3d/StatCounter";
import FloatingMedicalParticles from "./3d/FloatingMedicalParticles";

const AboutDNASpline = dynamic(() => import("./3d/AboutDNASpline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] sm:min-h-[460px] flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full border-3 border-[#59afb5]/20 border-t-[#59afb5] animate-spin" />
      <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase animate-pulse">
        Loading 3D Diagnostic Model...
      </span>
    </div>
  ),
});

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Preload 3D model only when user scrolls within 350px of About section
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad3D(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="px-4 lg:px-12 pt-16 pb-4 sm:pt-20 sm:pb-12 lg:py-24 bg-white relative overflow-hidden"
    >
      {/* Ambient background particles */}
      <FloatingMedicalParticles count={4} />

      {/* Decorative radial glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[650px] h-[650px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center relative z-10">
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
        <div className="relative flex items-center justify-center min-h-[320px] xs:min-h-[360px] sm:min-h-[480px] lg:min-h-[800px] w-full h-full">
          {shouldLoad3D ? (
            <AboutDNASpline />
          ) : (
            <div className="w-full h-full min-h-[300px] sm:min-h-[460px] flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full border-3 border-[#59afb5]/20 border-t-[#59afb5] animate-spin" />
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase animate-pulse">
                Loading 3D Diagnostic Model...
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

