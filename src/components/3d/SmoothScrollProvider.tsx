"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Disable Lenis completely on mobile and touch devices.
    // Mobile browsers (iOS Safari, Android Chrome) have native 120Hz GPU hardware-accelerated scrolling.
    // Running Lenis on mobile hijacks touch events, causing noticeable lag and scroll friction.
    const isTouchOrMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window);

    if (prefersReducedMotion || isTouchOrMobile) {
      return;
    }

    // Initialize Lenis with snappy, responsive and crisp scrolling animation
    // Avoid sluggish 0.1 lerp which causes heavy latency / laggy feel
    const lenis = new Lenis({
      duration: 0.7, // Snappy 0.7s duration (fast, responsive deceleration)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Clean exponential deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.15, // Responsive 1:1 wheel feel
      touchMultiplier: 1.2,
      autoRaf: true, // Native high-performance RAF loop managed by Lenis
      syncTouch: false, // Keep native touch momentum on mobile for zero input lag
    });

    lenisRef.current = lenis;

    // Provide access globally if needed (e.g., modals or anchor jumps)
    (window as any).__lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      (window as any).__lenis = null;
    };
  }, []);

  return <>{children}</>;
}
