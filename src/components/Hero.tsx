"use client";
import { useState, useEffect } from "react";
import BookTestModal from "./BookTestModal";
import { motion, AnimatePresence } from "motion/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

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
    <section id="hero" className="bg-white pt-24 overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Banner Slider */}
        <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-12 shadow-sm group">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { duration: 1, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.5 }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={BANNERS[currentSlide].image}
                alt={BANNERS[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end items-start px-8 md:px-16 pb-10 md:pb-16">
                <h1 className="text-xl md:text-4xl font-Outfit text-white max-w-xl mb-6 [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
                  {BANNERS[currentSlide].title}
                </h1>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-fit px-8 py-3 bg-white text-dark font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg active:scale-95"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation for Banner */}
          <button 
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full text-white hover:bg-white/50 transition-all z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
          <button 
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full text-white hover:bg-white/50 transition-all z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {BANNERS.map((_, i) => (
              <button 
                key={i} 
                onClick={() => {
                  setDirection(i > currentSlide ? 1 : -1);
                  setCurrentSlide(i);
                }}
                className={`h-1.5 rounded-full transition-all ${currentSlide === i ? "w-8 bg-white" : "w-2 bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">Top Categories</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-[#59afb5] font-bold text-sm flex items-center hover:underline"
            >
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-3 transition-transform duration-200 group-hover:-translate-y-1">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                </div>
                <p className="font-bold text-[11px] md:text-sm text-gray-800 text-center line-clamp-1 w-full px-1">{cat.title}</p>
                <div className="flex items-center text-[10px] text-gray-500 font-semibold mt-1">
                  <svg className="w-3 h-3 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" fillRule="evenodd" />
                  </svg>
                  {cat.time}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Services */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">Popular Services</h2>
          </div>

          {/* Mobile: List layout */}
          <div className="sm:hidden divide-y divide-gray-100">
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={`m-skel-${i}`} className="animate-pulse flex items-center gap-4 py-4">
                  <div className="w-20 h-20 rounded-xl bg-gray-200 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              ))
            ) : tests.length > 0 ? (
              tests.map((svc, i) => (
                <Link href={`/tests/${svc.slug?.current || '#'}`} key={`m-${i}`} className="flex items-center gap-4 py-4 group">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img 
                      src={svc.image?.asset ? urlFor(svc.image).url() : "/images/hero/placeholder.jpg"} 
                      alt={svc.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 leading-tight">{svc.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">₹{svc.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-12 text-center text-gray-500">
                No popular services found. Add some in Sanity!
              </div>
            )}
          </div>

          {/* Desktop: Card grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {isLoading ? (
              // Loading Skeleton
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 h-64 rounded-lg" />
              ))
            ) : tests.length > 0 ? (
              tests.map((svc, i) => (
                <div 
                  key={i} 
                  className="flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="h-32 bg-gray-100">
                    <img 
                      src={svc.image?.asset ? urlFor(svc.image).url() : "/images/hero/placeholder.jpg"} 
                      alt={svc.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-sm text-gray-900 mb-2">{svc.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {svc.description}
                    </p>
                    <div className="mt-auto">
                      <p className="font-extrabold text-gray-900 mb-3 text-lg">₹{svc.price}</p>
                      <Link 
                        href={`/tests/${svc.slug?.current || '#'}`}
                        className="block w-full text-center py-2 bg-[#59afb5] text-white text-xs font-bold rounded-lg hover:bg-[#428e94] transition-colors uppercase tracking-wider"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500">
                No popular services found. Add some in Sanity!
              </div>
            )}
          </div>
        </section>
      </main>

      <BookTestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
