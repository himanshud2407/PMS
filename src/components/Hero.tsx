import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // UI references
  const introRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Force body background to black to prevent white gaps on mobile scroll
    const originalBg = document.body.style.backgroundColor;
    document.documentElement.style.backgroundColor = "black";
    document.body.style.backgroundColor = "black";

    const frameCount = 240;
    const currentFrame = (index: number) =>
      `/images/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.png`;

    const images: HTMLImageElement[] = [];
    const airpods = {
      frame: 0,
    };

    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === 1) {
          // Draw first frame immediately when it's loaded
          render();
        }
      };
      img.src = currentFrame(i);
      images.push(img);
    }

    let lastFrameIndex = -1;
    const render = (force = false) => {
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(airpods.frame)),
      );

      // Only redraw if the frame has actually changed or if forced (e.g. on resize)
      if (!force && frameIndex === lastFrameIndex) return;

      const img = images[frameIndex];
      if (img && img.complete) {
        // Clear canvas before drawing
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Scale image to cover canvas (like object-fit: cover)
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height,
        );
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;
        context.drawImage(img, x, y, img.width * scale, img.height * scale);

        lastFrameIndex = frameIndex;
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(true);
    };

    window.addEventListener("resize", handleResize);

    // Set initial size
    handleResize();

    // Initial render attempt in case of fast caching
    render();

    // 0. Entry animation for stats (visible on load)
    if (statsRef.current) {
      gsap.from(statsRef.current.children, {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        delay: 1, // Delay to sync with image loading
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=600%",
        scrub: 1.2, // Smoother follow for premium feel
        pin: true,
        anticipatePin: 1,
      },
    });

    // 1. Animate frames
    tl.to(
      airpods,
      {
        frame: frameCount - 1,
        ease: "none",
        onUpdate: () => render(),
        duration: 10,
      },
      0,
    );

    // 2. Timeline for text elements overlay (duration 10 to match frames)

    // Intro: fades out early
    tl.to(
      introRef.current,
      { opacity: 0, scale: 1.1, filter: "blur(10px)", duration: 1 },
      1,
    );

    // Transition: comes in and goes out
    tl.fromTo(
      transitionRef.current,
      { opacity: 0, scale: 0.9, y: 50, filter: "blur(10px)" },
      { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1 },
      2,
    );
    tl.to(
      transitionRef.current,
      { opacity: 0, scale: 1.1, filter: "blur(10px)", y: -50, duration: 1 },
      4,
    );

    // Subject Reveal: comes in and goes out
    tl.fromTo(
      subjectRef.current,
      { opacity: 0, scale: 0.9, y: 50, filter: "blur(10px)" },
      { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1 },
      5,
    );
    tl.to(
      subjectRef.current,
      { opacity: 0, scale: 1.1, filter: "blur(10px)", y: -50, duration: 1 },
      7,
    );

    // Final Scene: stays till the end
    tl.fromTo(
      finalRef.current,
      { opacity: 0, scale: 0.9, y: 50, filter: "blur(10px)" },
      { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1 },
      8,
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      // Restore original background if needed
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-black text-white overflow-hidden h-screen h-[100dvh] w-full"
    >
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center bg-black">
        <AnimatePresence>
          {loadingProgress < 100 && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6"
            >
              <div className="w-full max-w-md space-y-8">
                <div className="space-y-4 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-3 mb-2"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-2xl font-bold font-display tracking-tight text-white">Lunira</span>
                  </motion.div>
                  <p className="text-blue-400 text-xs tracking-[0.3em] uppercase font-bold animate-pulse">
                    {loadingProgress < 40 ? "Calibrating Medical Systems" : 
                     loadingProgress < 80 ? "Optimizing Diagnostic View" : 
                     "Preparing Cinematic Sequence"}
                  </p>
                </div>

                <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                  />
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest block font-medium">Progress</span>
                    <span className="text-4xl font-display font-bold text-white tabular-nums">
                      {loadingProgress}<span className="text-blue-500 text-xl">%</span>
                    </span>
                  </div>
                  <div className="text-right text-[10px] text-white/30 uppercase tracking-widest font-medium pb-1">
                    Version 2.4.0 <br />
                    System Stable
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px] opacity-20 pointer-events-none"></div>
              <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-white/10 rounded-tl-3xl pointer-events-none"></div>
              <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-white/10 rounded-br-3xl pointer-events-none"></div>
            </motion.div>
          )}
        </AnimatePresence>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
          style={{ imageRendering: "auto" }}
        />

        {/* Subtle dark gradient overlay to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 pointer-events-none z-10"></div>
      </div>

      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 lg:px-12 pointer-events-none">
        {/* Intro */}
        <div
          ref={introRef}
          className="absolute top-[45%] md:top-1/2 -translate-y-1/2 left-6 lg:left-12 right-6 md:right-auto max-w-3xl"
        >
          <h1 className="text-3xl md:text-7xl font-display font-medium leading-[1.2] md:leading-[1.1] mb-4 md:mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Advance <br className="hidden md:block" />
            <span className="text-blue-400 italic drop-shadow-[0_0_20px_rgba(96,165,250,0.4)]">
              Lab testing for
            </span>{" "}
            <br />
            Better Health
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] mb-8 md:mb-10">
            From routine blood tests to specialized diagnostics, we deliver
            reliable results with cutting-edge technology.
          </p>

          <div
            ref={statsRef}
            className="flex flex-wrap gap-4 md:gap-12 pointer-events-auto"
          >
            <div className="relative group">
              <div className="text-2xl md:text-4xl font-bold text-white mb-0 md:mb-1 drop-shadow-md">
                99.9%
              </div>
              <div className="text-[9px] md:text-xs text-blue-400 uppercase tracking-[0.2em] font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                Precision Rate
              </div>
              <div className="absolute -left-3 md:-left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-50"></div>
            </div>
            <div className="relative group">
              <div className="text-2xl md:text-4xl font-bold text-white mb-0 md:mb-1 drop-shadow-md">
                24/7
              </div>
              <div className="text-[9px] md:text-xs text-blue-400 uppercase tracking-[0.2em] font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                Expert Care
              </div>
              <div className="absolute -left-3 md:-left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-transparent rounded-full opacity-50"></div>
            </div>
            <div className="relative group">
              <div className="text-2xl md:text-4xl font-bold text-white mb-0 md:mb-1 drop-shadow-md">
                10k+
              </div>
              <div className="text-[9px] md:text-xs text-blue-400 uppercase tracking-[0.2em] font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                Happy Lives
              </div>
              <div className="absolute -left-3 md:-left-4 top-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-transparent rounded-full opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Transition */}
        <div
          ref={transitionRef}
          className="absolute top-1/2 -translate-y-1/2 right-6 lg:right-12 max-w-xl text-right opacity-0"
        >
          <h2 className="text-3xl md:text-6xl font-display font-medium mb-4 md:mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Beyond Boundaries <br />
            <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              Discover More
            </span>
          </h2>
          <div className="flex flex-col gap-6 items-end">
            <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-md">
                24/7
              </div>
              <div className="text-sm md:text-base text-gray-300">
                Continuous Monitoring & Care
              </div>
            </div>
          </div>
        </div>

        {/* Subject Reveal */}
        <div
          ref={subjectRef}
          className="absolute top-1/3 left-6 lg:left-12 max-w-xl opacity-0"
        >
          <h2 className="text-3xl md:text-6xl font-display font-medium mb-4 md:mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Unparalleled <br />
            <span className="text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]">
              Accuracy
            </span>
          </h2>
          <p className="text-xl text-gray-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Every frame of your health data, analyzed and protected. We leave no
            stone unturned in ensuring your well-being.
          </p>
        </div>

        {/* Final Scene */}
        <div
          ref={finalRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 w-full max-w-4xl"
        >
          <h2 className="text-4xl md:text-8xl font-display font-medium mb-6 md:mb-8 drop-shadow-[0_4px_20_rgba(0,0,0,0.8)]">
            Your Future, <br />
            <span className="text-primary italic drop-shadow-[0_0_30px_rgba(37,99,235,0.6)]">
              Secured Today
            </span>
          </h2>
          <button className="pointer-events-auto bg-primary hover:bg-primary-hover text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.6)] text-base md:text-lg">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
