"use client";

import { useMotionValue, useSpring, motion } from "framer-motion";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  spotlightClassName?: string;
};

export function Spotlight({ children, className, spotlightClassName }: Props) {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const onMouseLeave = useCallback(() => {
    mouseX.set(Infinity);
    mouseY.set(Infinity);
  }, [mouseX, mouseY]);

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Spotlight circle */}
      <motion.div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          spotlightClassName
        )}
        style={{
          background: `radial-gradient(300px circle at ${springX}px ${springY}px, rgba(139,92,246,0.12), transparent 70%)`,
          opacity: 1,
        }}
      />
      {children}
    </div>
  );
}
