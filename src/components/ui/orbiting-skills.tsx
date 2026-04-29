"use client"
import React, { useEffect, useState, memo } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

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
}

interface GlowingOrbitPathProps {
  radius: number;
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
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const { orbitRadius, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: 20,
      }}
    >
      <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-100 whitespace-nowrap">
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
        <span className="text-sm font-semibold text-gray-800">{label}</span>
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius }: GlowingOrbitPathProps) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-100 pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    />
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);

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
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const orbitRadii = Array.from(new Set(skillsConfig.map(s => s.orbitRadius))).sort((a, b) => a - b);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-visible">
      {/* Central Logo/Core */}
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center z-10 relative shadow-2xl border border-gray-50">
        {/* <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
        </div> */}
        <img src="/logo.png" alt="Logo" className="h-20 w-20 rounded-full " />
      </div>

      {/* Render orbit paths */}
      {orbitRadii.map((radius) => (
        <GlowingOrbitPath
          key={`path-${radius}`}
          radius={radius}
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
          />
        );
      })}
    </div>
  );
}
