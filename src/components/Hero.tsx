"use client";
import { useState, useEffect } from "react";
import BookTestModal from "./BookTestModal";
import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import TiltCard from "./3d/TiltCard";

const BANNERS = [
  {
    image: "/images/hero/banner.jpg",
    title: "Skilled nurse. Expert care @Home in minutes.",
  },
  {
    image: "/images/hero/banner2.png",
    title: "Expert Doctor consultations in the comfort of your home.",
  },
  {
    image: "/images/hero/banner3.png",
    title: "Accurate Lab Tests with safe home sample collection.",
  },
];

const CATEGORIES = [
  {
    title: "Doctor at Home",
    image:
      "/dr-home.png",
    time: "30 mins",
  },
  {
    title: "Vacination",
    image: "/vacination.png",
    time: "60 mins",
  },
  {
    title: "Nursing Care",
    image: "/nursing.png",
    time: "45 mins",
  },
  {
    title: "Blood Test",
    image: "/blood-test.png",
    time: "30 mins",
  },
  {
    title: "Wound Care",
    image: "/wound-care.png",
    time: "30 mins",
  },
  {
    title: "IV Therapy",
    image: "/iv-therepy.png",
    time: "30 mins",
  },
];

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [tests, setTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTests() {
      try {
        const data = await client.fetch(`*[_type == "test"] | order(name asc)`);
        
        // Pick the first test from every category
        const categories = ["Blood Test", "Stool Test", "Plasma Test", "Swab Test", "Urine Test"];
        const uniqueTests = categories.map(cat => 
          data.find((test: any) => test.category === cat)
        ).filter(Boolean);

        setTests(uniqueTests);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTests();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + BANNERS.length) % BANNERS.length);
  };

  return (
    <section id="hero" className="relative bg-white pt-24 overflow-x-hidden min-h-[85vh]">
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* Hero Banner Slider */}
        <div className="relative w-full h-[320px] md:h-[460px] rounded-3xl overflow-hidden mb-12 shadow-xl border border-gray-100 group">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.4 }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={BANNERS[currentSlide].image}
                alt={BANNERS[currentSlide].title}
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end items-start px-8 md:px-16 pb-10 md:pb-16 z-10">
                <h1 className="text-2xl md:text-5xl font-Outfit text-white max-w-2xl mb-6 [text-shadow:_0_3px_10px_rgba(0,0,0,0.85)] leading-tight font-bold">
                  {BANNERS[currentSlide].title}
                </h1>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-fit px-8 py-3.5 bg-[#59afb5] hover:bg-[#428e94] text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-[#59afb5]/40 hover:-translate-y-0.5 active:scale-95"
                  >
                    Book Now
                  </button>
                  <Link
                    href="/tests"
                    className="hidden sm:inline-block px-6 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold rounded-xl transition-all border border-white/30"
                  >
                    Explore Directory
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation for Banner */}
          <button 
            onClick={() => paginate(-1)}
            aria-label="Previous banner"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2.5 rounded-full text-white backdrop-blur-md transition-all z-20 hover:scale-110 active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </button>
          <button 
            onClick={() => paginate(1)}
            aria-label="Next banner"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 p-2.5 rounded-full text-white backdrop-blur-md transition-all z-20 hover:scale-110 active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
            {BANNERS.map((_, i) => (
              <button 
                key={i} 
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  setDirection(i > currentSlide ? 1 : -1);
                  setCurrentSlide(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i ? "w-9 bg-[#59afb5] shadow-md shadow-[#59afb5]/60" : "w-2.5 bg-white/60 hover:bg-white"}`}
              />
            ))}
          </div>
        </div>

        {/* Top Categories with 3D TiltCards */}
        <section className="mb-14">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#59afb5] block mb-1">
                Specialized Diagnostic Care
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Top Categories</h2>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-[#59afb5] font-bold text-sm flex items-center hover:underline group"
            >
              View All
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <TiltCard
                key={i}
                maxTilt={12}
                scale={1.03}
                onClick={() => setIsModalOpen(true)}
                className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer group flex flex-col items-center"
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-50">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-108" />
                </div>
                <p className="font-bold text-xs md:text-sm text-gray-800 text-center line-clamp-1 w-full px-1">{cat.title}</p>
                <div className="flex items-center text-[10px] text-gray-500 font-semibold mt-1">
                  <svg className="w-3 h-3 text-orange-500 mr-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" fillRule="evenodd" />
                  </svg>
                  {cat.time}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Popular Services with 3D Depth */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#59afb5] block mb-1">
                Frequently Requested
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Popular Services</h2>
            </div>
            <Link
              href="/tests"
              className="text-[#59afb5] font-bold text-sm flex items-center hover:underline group"
            >
              Browse All Tests
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </Link>
          </div>

          {/* Mobile: List layout */}
          <div className="sm:hidden divide-y divide-gray-100 bg-white rounded-2xl border border-gray-100 p-2 shadow-sm">
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={`m-skel-${i}`} className="animate-pulse flex items-center gap-4 py-4 px-2">
                  <div className="w-20 h-20 rounded-xl bg-gray-200 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              ))
            ) : tests.length > 0 ? (
              tests.map((svc, i) => (
                <Link href={`/tests/${svc.slug?.current || '#'}`} key={`m-${i}`} className="flex items-center gap-4 py-3.5 px-2 group">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100">
                    <img 
                      src={svc.image?.asset ? urlFor(svc.image).url() : "/images/hero/placeholder.jpg"} 
                      alt={svc.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 leading-tight group-hover:text-primary transition-colors">{svc.name}</h3>
                    <p className="text-sm font-extrabold text-primary mt-1">₹{svc.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-12 text-center text-gray-500">
                No popular services found.
              </div>
            )}
          </div>

          {/* Desktop: 3D Tilt Card Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {isLoading ? (
              // Loading Skeleton
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 h-64 rounded-2xl" />
              ))
            ) : tests.length > 0 ? (
              tests.map((svc, i) => (
                <TiltCard 
                  key={i} 
                  maxTilt={8}
                  scale={1.02}
                  className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30 group"
                >
                  <div className="h-36 bg-gray-100 overflow-hidden relative">
                    <img 
                      src={svc.image?.asset ? urlFor(svc.image).url() : "/images/hero/placeholder.jpg"} 
                      alt={svc.name} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-sm text-gray-900 mb-1.5 group-hover:text-primary transition-colors line-clamp-1">{svc.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {svc.description}
                    </p>
                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase block">Price</span>
                        <p className="font-extrabold text-gray-900 text-base">₹{svc.price}</p>
                      </div>
                      <Link 
                        href={`/tests/${svc.slug?.current || '#'}`}
                        className="py-1.5 px-3.5 bg-[#59afb5] hover:bg-[#428e94] text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider shadow-sm group-hover:shadow-md"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500">
                No popular services found.
              </div>
            )}
          </div>
        </section>
      </main>

      <BookTestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
