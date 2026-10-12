"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import Spline to disable SSR for WebGL canvas
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[460px] flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full border-3 border-[#59afb5]/20 border-t-[#59afb5] animate-spin" />
      <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase animate-pulse">
        Loading 3D Diagnostic Model...
      </span>
    </div>
  ),
});

export default function AboutDNASpline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Observer to cleanly strip out any injected Spline watermark/logo badge
  useEffect(() => {
    const removeWatermark = () => {
      const container = containerRef.current;
      if (!container) return;

      const candidates = container.querySelectorAll(
        '#spline-watermark, [id*="spline"], [class*="spline"], a[href*="spline"]'
      );
      candidates.forEach((el) => {
        if (el.tagName !== "CANVAS" && !el.querySelector("canvas")) {
          (el as HTMLElement).style.display = "none";
          (el as HTMLElement).style.opacity = "0";
          (el as HTMLElement).style.visibility = "hidden";
          (el as HTMLElement).style.pointerEvents = "none";
        }
      });
    };

    removeWatermark();
    const interval = setInterval(removeWatermark, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480px] sm:h-[540px] lg:h-[620px] flex items-center justify-center select-none bg-transparent"
    >
      {/* 3D Spline DNA Model */}
      <div className="w-full h-full flex items-center justify-center bg-transparent">
        <Spline
          scene="https://prod.spline.design/oyaa1BirDbw9F-fL/scene.splinecode"
          onLoad={(spline) => {
            try {
              // Ensure 100% transparent background
              spline.setBackgroundColor("transparent");

              const app = spline as any;
              const scene1 = app._scene?.getObjectByName("Scene 1");
              if (scene1) {
                // Ensure the underlying black emitter mesh remains hidden
                // so the original vibrant particle colors shine through
                const shape = scene1.getObjectByName("DNA Shape");
                if (shape) {
                  shape.visible = false;
                }
                const dnaGroup = scene1.getObjectByName("DNA");
                if (dnaGroup) {
                  dnaGroup.position.set(0, 0, 0);
                }
              }
              if (app._camera) {
                app._camera.zoom = 1.5;
                app._camera.updateProjectionMatrix();
              }
            } catch (e) {
              console.error("Spline init error:", e);
            }
          }}
          className="w-full h-full bg-transparent"
        />
      </div>
    </div>
  );
}
