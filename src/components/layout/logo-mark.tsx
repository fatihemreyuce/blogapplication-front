"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function LogoMark() {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-30, 30], [14, -14]), {
    stiffness: 250,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-30, 30], [-14, 14]), {
    stiffness: 250,
    damping: 22,
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        perspective: 500,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2.5 cursor-pointer select-none"
    >
      {/* Glow + icon */}
      <div className="relative">
        {/* Glow halo */}
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-violet-500 via-blue-500 to-emerald-400 opacity-40 blur-md" />

        {/* Icon kutu */}
        <motion.div
          style={{ translateZ: 16 }}
          className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-blue-600 to-emerald-500 shadow-xl shadow-violet-500/40"
        >
          {/* Parlak iç kenar */}
          <div className="absolute inset-px rounded-[10px] bg-gradient-to-b from-white/25 to-transparent" />
          <span className="relative z-10 text-sm font-black text-white">B</span>
        </motion.div>
      </div>

      {/* Yazı */}
      <motion.span
        style={{ translateZ: 8 }}
        className="text-sm font-bold tracking-tight text-foreground"
      >
        Blog
      </motion.span>
    </motion.div>
  );
}
