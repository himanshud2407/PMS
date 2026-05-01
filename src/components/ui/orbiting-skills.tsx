"use client"
import React, { useEffect, useState, memo } from 'react';
import { cn } from "../../lib/utils";

// --- Type Definitions ---
interface SkillConfig {
  id: string;
  orbitRadius: number;
  speed: number;
  phaseShift: number;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
  multiplier: number;
  isMobile: boolean;
}

interface GlowingOrbitPathProps {
  radius: number;
  multiplier: number;
}

// --- Configuration for the Orbiting Features ---
const skillsConfig: SkillConfig[] = [
  { 
    id: 'support',
    orbitRadius: 160, 
    speed: 0.2, 
    phaseShift: 0, 
    label: '24/7 Support'
  },
  { 
    id: 'affordable',
    orbitRadius: 200, 
    speed: -0.15, 
    phaseShift: Math.PI / 4, 
    label: 'Affordable Healthcare'
  },
  { 
    id: 'personalized',
    orbitRadius: 120, 
    speed: 0.3, 
    phaseShift: Math.PI, 
    label: 'Personalized Care'
  },
  { 
    id: 'safety',
    orbitRadius: 180, 
    speed: -0.25, 
    phaseShift: (3 * Math.PI) / 2, 
    label: 'Patient Safety'
  },
  { 
    id: 'wellbeing',
    orbitRadius: 140, 
    speed: 0.1, 
    phaseShift: Math.PI / 2, 
    label: 'Comprehensive Well-Being'
  },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle, multiplier, isMobile }: OrbitingSkillProps) => {
  const { orbitRadius, label } = config;

  const x = Math.cos(angle) * orbitRadius * multiplier;
  const y = Math.sin(angle) * orbitRadius * multiplier;

  // Shorten labels on mobile to prevent overflow
  const displayLabel = isMobile 
    ? label.replace('Comprehensive ', '').replace('24/7 ', '').replace('Affordable ', '') 
    : label;

  return (
    <div
      className="absolute top-1/2 left-1/2 pointer-events-none transition-all duration-300"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: 20,
      }}
    >
      <div className={cn(
        "flex items-center bg-white/95 backdrop-blur-sm rounded-full shadow-xl border border-gray-100 whitespace-nowrap transition-all",
        isMobile ? "px-2 py-1 gap-1.5" : "px-4 py-2 gap-3"
      )}>
        <div className={cn("rounded-full bg-primary animate-pulse", isMobile ? "w-1.5 h-1.5" : "w-2 h-2")} />
        <span className={cn("font-bold text-gray-800", isMobile ? "text-[11px]" : "text-sm")}>{displayLabel}</span>
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, multiplier }: GlowingOrbitPathProps) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-100 pointer-events-none"
      style={{
        width: `${radius * 2 * multiplier}px`,
        height: `${radius * 2 * multiplier}px`,
      }}
    />
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1200);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isSmallMobile = viewportWidth < 400;
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth < 1024;

  // Responsive radius multiplier - increased for better visibility
  const multiplier = isSmallMobile ? 0.6 : isMobile ? 0.75 : isTablet ? 0.9 : 1;

  const orbitRadii = Array.from(new Set(skillsConfig.map(s => s.orbitRadius))).sort((a, b) => a - b);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-visible">
      {/* Central Logo/Core */}
      <div className={cn(
        "bg-white rounded-full flex items-center justify-center z-10 relative shadow-2xl border border-gray-50 transition-all duration-500",
        isMobile ? "w-16 h-16" : "w-24 h-24"
      )}>
        <img src="/logo.png" alt="Logo" className={cn("rounded-full", isMobile ? "h-12 w-12" : "h-20 w-20")} />
      </div>

      {/* Render orbit paths */}
      {orbitRadii.map((radius) => (
        <GlowingOrbitPath
          key={`path-${radius}`}
          radius={radius}
          multiplier={multiplier}
        />
      ))}

      {/* Render orbiting features */}
      {skillsConfig.map((config) => {
        const angle = time * config.speed + config.phaseShift;
        return (
          <OrbitingSkill
            key={config.id}
            config={config}
            angle={angle}
            multiplier={multiplier}
            isMobile={isMobile}
          />
        );
      })}
    </div>
  );
}
