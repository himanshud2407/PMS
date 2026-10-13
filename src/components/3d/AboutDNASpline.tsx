"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import Spline to disable SSR for WebGL canvas
const Spline = dynamic(() => import("@splinetool/react-spline"), {
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

export default function AboutDNASpline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const splineAppRef = useRef<any>(null);

  // Observer to cleanly strip out any injected Spline watermark/logo badge & handle zoom resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const removeWatermark = () => {
      // 1. Search container and the entire document body (in case Spline appends to body on mobile)
      const selector =
        '#spline-watermark, [id*="spline-watermark"], [class*="spline-watermark"], [id*="watermark"], [class*="watermark"], a[href*="spline"], a[aria-label*="Spline"]';
      const candidates = document.querySelectorAll(selector);
      candidates.forEach((el) => {
        if (el.tagName !== "CANVAS" && !el.querySelector("canvas")) {
          (el as HTMLElement).style.setProperty("display", "none", "important");
          (el as HTMLElement).style.setProperty("opacity", "0", "important");
          (el as HTMLElement).style.setProperty("visibility", "hidden", "important");
          (el as HTMLElement).style.setProperty("pointer-events", "none", "important");
          try {
            el.remove();
          } catch (e) {}
        }
      });

      // 2. Scan for any elements with "Built with Spline" text
      const allLinksAndDivs = document.querySelectorAll("a, div, span, button");
      allLinksAndDivs.forEach((el) => {
        if (
          el.tagName !== "CANVAS" &&
          !el.querySelector("canvas") &&
          el.textContent?.trim().toLowerCase().includes("built with spline")
        ) {
          (el as HTMLElement).style.setProperty("display", "none", "important");
          try {
            el.remove();
          } catch (e) {}
        }
      });
    };

    removeWatermark();
    const interval = setInterval(removeWatermark, 250);

    const observer = new MutationObserver(() => {
      removeWatermark();
    });
    if (typeof document !== "undefined" && document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }

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

    // Allow natural wheel scrolling to bubble to Lenis smoothly while preventing browser pinch-to-zoom
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    const onGesture = (e: Event) => {
      e.preventDefault();
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("gesturestart", onGesture, { passive: false });
    container.addEventListener("gesturechange", onGesture, { passive: false });
    container.addEventListener("gestureend", onGesture, { passive: false });

    return () => {
      clearInterval(interval);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("gesturestart", onGesture);
      container.removeEventListener("gesturechange", onGesture);
      container.removeEventListener("gestureend", onGesture);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] xs:h-[360px] sm:h-[480px] md:h-[600px] lg:h-[780px] xl:h-[840px] flex items-center justify-center select-none bg-transparent cursor-grab active:cursor-grabbing"
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

              // Permanently intercept and neutralize WebGL post-processing watermark passes
              const pipeline = app._renderer?.pipeline;
              if (pipeline) {
                // Permanently neutralize pipeline.setWatermark so async mobile network asset loads cannot re-enable it
                pipeline.setWatermark = function () {
                  if (this.logoOverlayPass) {
                    this.logoOverlayPass.enabled = false;
                  }
                  this.watermarkTexture = null;
                  this._effectChainDirty = true;
                };

                // Neutralize logoOverlayPass safely without triggering texture setter errors
                if (pipeline.logoOverlayPass) {
                  pipeline.logoOverlayPass.enabled = false;
                  pipeline.logoOverlayPass.render = () => {};
                  try {
                    Object.defineProperty(pipeline.logoOverlayPass, "enabled", {
                      get: () => false,
                      set: () => {},
                      configurable: true,
                    });
                  } catch (e) {}
                }

                // Lock watermarkTexture to null
                try {
                  Object.defineProperty(pipeline, "watermarkTexture", {
                    get: () => null,
                    set: () => {},
                    configurable: true,
                  });
                } catch (e) {}

                // Wrap _renderFrame to ensure watermark pass remains disabled on every single frame
                if (pipeline._renderFrame) {
                  const origRenderFrame = pipeline._renderFrame.bind(pipeline);
                  pipeline._renderFrame = function (e: any, t: any) {
                    if (this.logoOverlayPass) {
                      this.logoOverlayPass.enabled = false;
                    }
                    this.watermarkTexture = null;
                    return origRenderFrame(e, t);
                  };
                }
              }

              // Long-running watchdog to enforce watermark suppression across slow mobile network downloads
              const enforceDisableWatermark = () => {
                if (pipeline?.logoOverlayPass) {
                  pipeline.logoOverlayPass.enabled = false;
                }
                if (pipeline) {
                  pipeline.watermarkTexture = null;
                }
              };
              enforceDisableWatermark();
              const watchdogInterval = setInterval(enforceDisableWatermark, 100);
              setTimeout(() => clearInterval(watchdogInterval), 15000);

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
