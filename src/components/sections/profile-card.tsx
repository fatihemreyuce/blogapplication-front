"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const techBadges = [
  { label: "React", color: "#61dafb", angle: -25, radius: 155 },
  { label: "Next.js", color: "#ffffff", angle: 20, radius: 165 },
  { label: "TypeScript", color: "#3178c6", angle: 65, radius: 150 },
  { label: "Supabase", color: "#3ecf8e", angle: 110, radius: 160 },
  { label: "Tailwind", color: "#38bdf8", angle: 200, radius: 158 },
  { label: "Figma", color: "#f24e1e", angle: 250, radius: 152 },
];

type Props = {
  name: string;
  title: string;
  location: string;
  stats: Array<{ value: string; label: string }>;
};

export function ProfileCard({ name, title, location, stats }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-120, 120], [18, -18]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-120, 120], [-18, 18]), {
    stiffness: 180,
    damping: 22,
  });
  const glowX = useTransform(mouseX, [-120, 120], [0, 100]);
  const glowY = useTransform(mouseY, [-120, 120], [0, 100]);

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
    <div className="relative flex items-center justify-center w-full h-full min-h-[420px]">
      {/* Floating badges */}
      {techBadges.map((badge, i) => {
        const rad = (badge.angle * Math.PI) / 180;
        const x = Math.cos(rad) * badge.radius;
        const y = Math.sin(rad) * badge.radius;

        return (
          <motion.div
            key={badge.label}
            className="absolute z-20 flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs font-semibold backdrop-blur-md shadow-lg"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { delay: 0.6 + i * 0.08, duration: 0.4 },
              scale: { delay: 0.6 + i * 0.08, duration: 0.4, type: "spring" },
              y: {
                delay: 0.6 + i * 0.08,
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: badge.color }}
            />
            <span className="text-foreground">{badge.label}</span>
          </motion.div>
        );
      })}

      {/* 3D Card */}
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 800,
        }}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 120 }}
        className="relative z-10 w-[230px] cursor-pointer"
      >
        {/* Glow halo arkada */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-emerald-500/20 blur-2xl" />

        {/* Kart */}
        <motion.div
          style={{ translateZ: 30 }}
          className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/90 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          {/* Mouse glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(200px circle at ${glowX}% ${glowY}%, rgba(139,92,246,0.15), transparent 70%)`,
            }}
          />

          {/* Üst gradient şerit */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {/* Avatar */}
          <motion.div style={{ translateZ: 20 }} className="mb-4 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-emerald-400 opacity-70 blur-sm" />
              <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-violet-600 via-blue-600 to-emerald-500 flex items-center justify-center text-2xl font-black text-white shadow-xl">
                {name.charAt(0)}
              </div>
              {/* Online dot */}
              <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            </div>
          </motion.div>

          {/* İsim */}
          <motion.div style={{ translateZ: 16 }} className="text-center space-y-1">
            <p className="font-bold text-foreground">{name}</p>
            <p className="text-xs text-text-muted">{title}</p>
          </motion.div>

          {/* Separator */}
          <div className="my-4 h-px bg-border/60" />

          {/* Stats */}
          <motion.div style={{ translateZ: 12 }} className="grid grid-cols-3 gap-2 text-center">
            {stats.map((s) => (
              <div key={s.label} className="space-y-0.5">
                <p className="text-sm font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-text-subtle">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Konum */}
          <motion.div style={{ translateZ: 8 }} className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-text-subtle">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
