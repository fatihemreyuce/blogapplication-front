"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { BookOpen, Tag, Layers, Rss } from "lucide-react";
import type { Locale } from "@/app/[lang]/dictionaries";

const topicBadges = [
  { label: "Frontend",  color: "#8b5cf6", angle: -30,  radius: 155 },
  { label: "Backend",   color: "#34d399", angle: 15,   radius: 165 },
  { label: "Tasarım",   color: "#f97316", angle: 60,   radius: 150 },
  { label: "Araçlar",   color: "#60a5fa", angle: 105,  radius: 160 },
  { label: "Fikirler",  color: "#fbbf24", angle: 205,  radius: 158 },
  { label: "Projeler",  color: "#a78bfa", angle: 250,  radius: 152 },
];

type Props = {
  lang: Locale;
  stats: Array<{ value: string; label: string }>;
};

export function ProfileCard({ lang, stats }: Props) {
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

  const tagline =
    lang === "tr" ? "Web'i anlatan blog" : "A blog about the web";
  const latestLabel = lang === "tr" ? "Haftalık güncelleme" : "Weekly updates";

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[420px]">
      {/* Floating konu badge'leri */}
      {topicBadges.map((badge, i) => {
        const rad = (badge.angle * Math.PI) / 180;
        const x = Math.cos(rad) * badge.radius;
        const y = Math.sin(rad) * badge.radius;

        return (
          <motion.div
            key={badge.label}
            className="absolute z-20 flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs font-semibold backdrop-blur-md shadow-lg"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
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

      {/* 3D Blog Kartı */}
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
        {/* Glow */}
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
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400" />

          {/* Blog ikonu */}
          <motion.div style={{ translateZ: 20 }} className="mb-4 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-emerald-400 opacity-40 blur-md" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-blue-600 to-emerald-500 shadow-xl">
                <div className="absolute inset-px rounded-[14px] bg-gradient-to-b from-white/20 to-transparent" />
                <BookOpen size={26} className="relative z-10 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Başlık */}
          <motion.div style={{ translateZ: 16 }} className="text-center space-y-1">
            <p className="font-black text-foreground text-base">Blog</p>
            <p className="text-[11px] text-text-muted">{tagline}</p>
          </motion.div>

          {/* Separator */}
          <div className="my-4 h-px bg-border/60" />

          {/* İstatistikler */}
          <motion.div style={{ translateZ: 12 }} className="grid grid-cols-3 gap-2 text-center">
            {stats.map((s) => (
              <div key={s.label} className="space-y-0.5">
                <p className="text-sm font-black text-foreground">{s.value}</p>
                <p className="text-[10px] text-text-subtle">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Separator */}
          <div className="my-4 h-px bg-border/60" />

          {/* Alt bilgi */}
          <motion.div
            style={{ translateZ: 8 }}
            className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {latestLabel}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
