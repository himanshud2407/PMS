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

  const splineAppRef = useRef<any>(null);

  // Observer to cleanly strip out any injected Spline watermark/logo badge & handle zoom resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const removeWatermark = () => {
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

    const getTargetZoom = () => {
      if (typeof window === "undefined") return 7.2;
      if (window.innerWidth < 640) return 4.2;
      if (window.innerWidth < 1024) return 5.8;
      if (window.innerWidth < 1440) return 7.2;
      return 8.0;
    };

    const handleResize = () => {
      const app = splineAppRef.current;
      if (!app) return;
      const z = getTargetZoom();
      if (app._camera) {
        app._camera.zoom = z;
        app._camera.updateProjectionMatrix();
      }
      const oc = app._controls?.orbitControls;
      if (oc) {
        oc.minZoom = z;
        oc.maxZoom = z;
      }
    };
    window.addEventListener("resize", handleResize);

    // Stop wheel events from triggering Spline's internal zoom, while allowing standard page scroll
    const onWheel = (e: WheelEvent) => {
      // Prevent Spline canvas from receiving wheel zoom events
      e.stopImmediatePropagation();
      // If ctrl is pressed (browser pinch-to-zoom on touchpad), prevent zooming
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    const onGesture = (e: Event) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    };

    container.addEventListener("wheel", onWheel, { capture: true, passive: false });
    container.addEventListener("gesturestart", onGesture, { capture: true, passive: false });
    container.addEventListener("gesturechange", onGesture, { capture: true, passive: false });
    container.addEventListener("gestureend", onGesture, { capture: true, passive: false });

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("wheel", onWheel, { capture: true } as any);
      container.removeEventListener("gesturestart", onGesture, { capture: true } as any);
      container.removeEventListener("gesturechange", onGesture, { capture: true } as any);
      container.removeEventListener("gestureend", onGesture, { capture: true } as any);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[540px] sm:h-[640px] lg:h-[780px] xl:h-[840px] flex items-center justify-center select-none bg-transparent cursor-grab active:cursor-grabbing"
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
              splineAppRef.current = app;

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

              const getTargetZoom = () => {
                if (typeof window === "undefined") return 7.2;
                if (window.innerWidth < 640) return 4.2;
                if (window.innerWidth < 1024) return 5.8;
                if (window.innerWidth < 1440) return 7.2;
                return 8.0;
              };

              const applyZoom = () => {
                const z = getTargetZoom();
                if (app._camera) {
                  app._camera.zoom = z;
                  app._camera.updateProjectionMatrix();
                }
              };
              applyZoom();
              requestAnimationFrame(applyZoom);
              setTimeout(applyZoom, 100);
              setTimeout(applyZoom, 300);
              setTimeout(applyZoom, 600);
              setTimeout(applyZoom, 1200);

              // Permanently disable the WebGL post-processing shader pass that renders the watermark
              const disableWatermarkPass = () => {
                if (app._renderer?.pipeline?.logoOverlayPass) {
                  app._renderer.pipeline.logoOverlayPass.enabled = false;
                }
              };
              disableWatermarkPass();
              requestAnimationFrame(disableWatermarkPass);
              setTimeout(disableWatermarkPass, 100);
              setTimeout(disableWatermarkPass, 500);

              // Lock zoom completely and prevent wheel / touchpad swipe zoom
              const configureControls = () => {
                const z = getTargetZoom();
                const oc = app._controls?.orbitControls;
                if (oc) {
                  oc.enableZoom = false;
                  oc.minZoom = z;
                  oc.maxZoom = z;
                  if (app._camera?.position?.z) {
                    oc.minDistance = app._camera.position.z;
                    oc.maxDistance = app._camera.position.z;
                  }
                  // Keep full rotation enabled (left, right, up, down)
                  oc.enableRotate = true;
                }
              };
              configureControls();
              requestAnimationFrame(configureControls);
              setTimeout(configureControls, 100);
              setTimeout(configureControls, 500);

              if (typeof window !== "undefined") {
                (window as any).__spline = spline;
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
