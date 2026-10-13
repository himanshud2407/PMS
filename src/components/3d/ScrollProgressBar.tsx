"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[120] pointer-events-none bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-[#59afb5] via-[#428e94] to-[#315e63] origin-left shadow-[0_0_12px_rgba(89,175,181,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}
