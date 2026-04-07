"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="absolute top-0 left-0 right-0 h-[2px] z-50 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400"
    />
  );
}
