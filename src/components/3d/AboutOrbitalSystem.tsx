"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";

interface OrbitItem {
  id: string;
  label: string;
  radius: number;
  speed: number;
  inclinationX: number;
  inclinationZ: number;
  phase: number;
  description: string;
}

const ORBIT_ITEMS: OrbitItem[] = [
  {
    id: "support",
    label: "24/7 Emergency Support",
    radius: 7.2,
    speed: 0.45,
    inclinationX: 0.4,
    inclinationZ: 0.2,
    phase: 0,
    description: "Round the clock patient assistance",
  },
  {
    id: "affordable",
    label: "Transparent Pricing",
    radius: 8.8,
    speed: -0.38,
    inclinationX: -0.5,
    inclinationZ: 0.6,
    phase: Math.PI * 0.4,
    description: "Zero hidden costs & upfront rates",
  },
  {
    id: "personalized",
    label: "Personalized Care",
    radius: 6.2,
    speed: 0.52,
    inclinationX: 0.8,
    inclinationZ: -0.4,
    phase: Math.PI * 0.85,
    description: "Customized diagnostic plans",
  },
  {
    id: "safety",
    label: "Hospital-Grade Hygiene",
    radius: 9.6,
    speed: -0.3,
    inclinationX: -0.3,
    inclinationZ: -0.5,
    phase: Math.PI * 1.3,
    description: "Sterile barcoded sample handling",
  },
  {
    id: "accuracy",
    label: "99.8% Test Accuracy",
    radius: 7.8,
    speed: 0.4,
    inclinationX: 0.6,
    inclinationZ: 0.5,
    phase: Math.PI * 1.75,
    description: "Certified clinical pathologists",
  },
];

export default function AboutOrbitalSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodePositions, setNodePositions] = useState<
    Array<{ x: number; y: number; z: number; visible: boolean; item: OrbitItem }>
  >([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 24);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Orbital System Main Group
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    // Central Glowing Diagnostic Core
    const coreGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x59afb5,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    systemGroup.add(coreMesh);

    // Glowing Halo around core
    const haloGeo = new THREE.SphereGeometry(2.1, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x8be5ec,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    systemGroup.add(haloMesh);

    // Generate 3D Orbital Rings
    const ringMaterials: THREE.LineBasicMaterial[] = [];
    const ringGeometries: THREE.BufferGeometry[] = [];

    const distinctRadii = Array.from(new Set(ORBIT_ITEMS.map((o) => o.radius)));
    distinctRadii.forEach((r, idx) => {
      const segments = 90;
      const ringPoints: THREE.Vector3[] = [];
      const itemConfig = ORBIT_ITEMS[idx % ORBIT_ITEMS.length];

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        const p = new THREE.Vector3(x, 0, z);

        // Apply orbit inclinations
        p.applyAxisAngle(new THREE.Vector3(1, 0, 0), itemConfig.inclinationX);
        p.applyAxisAngle(new THREE.Vector3(0, 0, 1), itemConfig.inclinationZ);
        ringPoints.push(p);
      }

      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0x59afb5,
        transparent: true,
        opacity: 0.22,
      });

      ringGeometries.push(ringGeo);
      ringMaterials.push(ringMat);

      const ringLine = new THREE.Line(ringGeo, ringMat);
      systemGroup.add(ringLine);
    });

    // Satellite spheres
    const satelliteMeshes: THREE.Mesh[] = [];
    ORBIT_ITEMS.forEach(() => {
      const satGeo = new THREE.SphereGeometry(0.38, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({
        color: 0x428e94,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      systemGroup.add(sat);
      satelliteMeshes.push(sat);
    });

    // Drag-to-rotate / interactive touch controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.002, y: 0.004 }; // gentle auto-rotation

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      systemGroup.rotation.y += deltaX * 0.008;
      systemGroup.rotation.x += deltaY * 0.008;

      rotationVelocity = {
        x: deltaY * 0.001,
        y: deltaX * 0.001,
      };

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Animation & 3D Projector
    let animId: number;
    let clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Inertia / Auto-drift
      if (!isDragging) {
        systemGroup.rotation.y += 0.003 + rotationVelocity.y * 0.9;
        systemGroup.rotation.x += rotationVelocity.x * 0.9;
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;
      }

      // Core pulsing
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
      coreMesh.scale.set(pulse, pulse, pulse);
      haloMesh.rotation.y = elapsedTime * 0.3;
      haloMesh.rotation.z = elapsedTime * 0.2;

      // Calculate satellite positions
      const projectedList = ORBIT_ITEMS.map((item, idx) => {
        const angle = elapsedTime * item.speed + item.phase;
        const x = Math.cos(angle) * item.radius;
        const z = Math.sin(angle) * item.radius;

        const pos = new THREE.Vector3(x, 0, z);
        pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), item.inclinationX);
        pos.applyAxisAngle(new THREE.Vector3(0, 0, 1), item.inclinationZ);

        // Update 3D satellite mesh
        satelliteMeshes[idx].position.copy(pos);

        // Project position to screen space for HTML overlays
        tempVec.copy(pos);
        tempVec.applyMatrix4(systemGroup.matrixWorld);
        tempVec.project(camera);

        const screenX = ((tempVec.x + 1) * width) / 2;
        const screenY = ((-tempVec.y + 1) * height) / 2;

        return {
          x: screenX,
          y: screenY,
          z: tempVec.z,
          visible: tempVec.z < 1, // in front of camera
          item,
        };
      });

      setNodePositions(projectedList);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Adjust camera distance for smaller screens
      if (width < 640) {
        camera.position.z = 30;
      } else if (width < 1024) {
        camera.position.z = 26;
      } else {
        camera.position.z = 23;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("resize", handleResize);

      coreGeo.dispose();
      coreMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      ringGeometries.forEach((g) => g.dispose());
      ringMaterials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] sm:h-[520px] md:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Center 3D Brand Badge */}
      <div className="absolute pointer-events-none z-10 flex flex-col items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-md shadow-2xl border-2 border-primary/30 flex items-center justify-center p-2.5 animate-pulse">
          <Image
            src="/logo.png"
            alt="Dr Baviskar Pathology Lab"
            width={64}
            height={64}
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-primary mt-2 bg-white/80 px-2.5 py-0.5 rounded-full shadow-sm">
          Precision Core
        </span>
      </div>

      {/* 3D Projected Interactive Orbit Badges */}
      {nodePositions.map(({ x, y, z, visible, item }) => {
        if (!visible) return null;
        // Scale and opacity according to depth in 3D
        const depthScale = Math.max(0.7, 1 - z * 0.4);
        const depthOpacity = Math.max(0.4, 1 - z * 0.6);
        const isHovered = activeItem === item.id;

        return (
          <div
            key={item.id}
            onMouseEnter={() => setActiveItem(item.id)}
            onMouseLeave={() => setActiveItem(null)}
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${
                isHovered ? depthScale * 1.15 : depthScale
              })`,
              opacity: isHovered ? 1 : depthOpacity,
              zIndex: z < 0 ? 25 : 15,
            }}
            className="absolute top-0 left-0 transition-transform duration-75 ease-out cursor-pointer pointer-events-auto"
          >
            <div
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full backdrop-blur-md transition-all shadow-lg ${
                isHovered
                  ? "bg-primary text-white ring-4 ring-primary/20 scale-105"
                  : "bg-white/90 text-dark border border-gray-100 hover:border-primary/40"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isHovered ? "bg-white animate-ping" : "bg-primary animate-pulse"
                }`}
              />
              <span className="text-xs sm:text-sm font-bold whitespace-nowrap">
                {item.label}
              </span>
            </div>

            {/* Hover Tooltip / Description */}
            {isHovered && (
              <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 bg-dark/95 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap pointer-events-none z-30">
                {item.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
