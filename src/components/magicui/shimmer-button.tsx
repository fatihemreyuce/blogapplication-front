"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  shimmerColor?: string;
  background?: string;
  className?: string;
  children: React.ReactNode;
};

export function ShimmerButton({
  shimmerColor = "rgba(255,255,255,0.18)",
  background = "linear-gradient(135deg, #7c3aed, #2563eb)",
  className,
  children,
  ...props
}: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...(props as React.ComponentProps<typeof motion.button>)}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-shadow hover:shadow-violet-500/40",
        className
      )}
      style={{ background }}
    >
      {/* Shimmer sweep */}
      <motion.span
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(105deg, transparent 40%, ${shimmerColor} 50%, transparent 60%)`,
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% center", "-200% center"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner highlight */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent" />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
