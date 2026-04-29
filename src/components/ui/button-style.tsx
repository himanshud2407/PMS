import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const Button = () => {
  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      className="relative group flex items-center gap-4 bg-primary px-8 py-4 rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20 cursor-pointer"
    >
      {/* Animated Gradient Background Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundSize: "200% 100%" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Shimmer / Light Sweep */}
      <motion.div
        className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:animate-shimmer"
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Button Text */}
      <span className="relative z-10 text-white font-display text-xl font-bold tracking-tight">
        Start Your Journey
      </span>

      {/* Icon Container */}
      <motion.div
        variants={{
          initial: { x: 0 },
          hover: { x: 5 },
        }}
        className="relative z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-lg shadow-black/10 group-hover:shadow-white/20 transition-all"
      >
        <ArrowRight size={22} className="group-hover:scale-110 transition-transform" />
      </motion.div>

      {/* Reflection / Glow effect */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/20 pointer-events-none z-20" />
    </motion.button>
  );
};

export default Button;

