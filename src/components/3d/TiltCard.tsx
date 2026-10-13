"use client";

import React, { useRef, useState, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default 10)
  glareOpacity?: number; // Opacity of light glare (0 to 1, default 0.25)
  perspective?: number; // Perspective distance in px (default 1000)
  scale?: number; // Hover scale (default 1.02)
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glareOpacity = 0.2,
  perspective = 1000,
  scale = 1.02,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalized coordinates (-1 to 1)
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      const rotateY = normX * maxTilt;
      const rotateX = -normY * maxTilt;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: "transform 100ms ease-out",
      });

      // Position specular glare
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setGlareStyle({
        opacity: glareOpacity,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 65%)`,
        transition: "opacity 200ms ease-out",
      });
    },
    [maxTilt, glareOpacity, perspective, scale]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 500ms cubic-bezier(0.23, 1, 0.32, 1)",
    });
    setGlareStyle({
      opacity: 0,
      transition: "opacity 400ms ease-out",
    });
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform [transform-style:preserve-3d] select-none ${className}`}
      style={style}
    >
      {children}
      {/* Dynamic Specular Light Glare Layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden mix-blend-overlay z-30"
        style={glareStyle}
      />
    </div>
  );
}
