"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Layers, Database, Paintbrush, Terminal, Globe } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { Locale } from "@/app/[lang]/dictionaries";

const techGroups = [
  {
    icon: Code2,
    color: "#8b5cf6",
    glow: "from-violet-500/20 to-violet-500/5",
    ring: "border-violet-500/20",
    label: { tr: "Frontend", en: "Frontend" },
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Database,
    color: "#3ecf8e",
    glow: "from-emerald-500/20 to-emerald-500/5",
    ring: "border-emerald-500/20",
    label: { tr: "Backend & Veritabanı", en: "Backend & Database" },
    items: ["Supabase", "PostgreSQL", "Node.js", "REST API"],
  },
  {
    icon: Paintbrush,
    color: "#f97316",
    glow: "from-orange-500/20 to-orange-500/5",
    ring: "border-orange-500/20",
    label: { tr: "Tasarım", en: "Design" },
    items: ["Figma", "shadcn/ui", "Radix UI", "CSS Animations"],
  },
  {
    icon: Terminal,
    color: "#60a5fa",
    glow: "from-blue-500/20 to-blue-500/5",
    ring: "border-blue-500/20",
    label: { tr: "Araçlar", en: "Tools" },
    items: ["Git", "VS Code", "Vercel", "pnpm"],
  },
  {
    icon: Globe,
    color: "#a78bfa",
    glow: "from-violet-400/20 to-violet-400/5",
    ring: "border-violet-400/20",
    label: { tr: "Platformlar", en: "Platforms" },
    items: ["Vercel", "GitHub", "Cloudflare"],
  },
  {
    icon: Layers,
    color: "#34d399",
    glow: "from-emerald-400/20 to-emerald-400/5",
    ring: "border-emerald-400/20",
    label: { tr: "Öğreniyorum", en: "Learning" },
    items: ["Rust", "Three.js", "React Native"],
  },
];

type CardProps = (typeof techGroups)[number] & { lang: Locale; index: number };

function TechCard({ icon: Icon, color, glow, ring, label, items, lang, index }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-60, 60], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-60, 60], [-8, 8]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mouseX, [-60, 60], [0, 100]);
  const glowY = useTransform(mouseY, [-60, 60], [0, 100]);

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
    <BlurFade delay={0.1 + index * 0.07} inView className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 600 }}
        className="group h-full cursor-default"
      >
        <motion.div
          style={{ translateZ: 12 }}
          className={`relative h-full overflow-hidden rounded-2xl border bg-surface/80 p-5 backdrop-blur-sm transition-shadow hover:shadow-xl ${ring}`}
        >
          {/* Mouse glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(180px circle at ${glowX}% ${glowY}%, ${color}18, transparent 70%)`,
            }}
          />

          {/* Arka plan gradient */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

          {/* İçerik */}
          <div className="relative z-10 flex h-full flex-col space-y-4">
            {/* Başlık */}
            <div className="flex items-center gap-3">
              <motion.div
                style={{ translateZ: 8 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-surface-2 group-hover:border-current/20 transition-colors"
              >
                <Icon size={17} style={{ color }} />
              </motion.div>
              <p className="text-sm font-semibold text-foreground">
                {label[lang]}
              </p>
            </div>

            {/* Teknolojiler */}
            <div className="mt-auto flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border/50 bg-background/60 px-2 py-0.5 text-[11px] font-medium text-text-muted transition-colors group-hover:border-border"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </BlurFade>
  );
}

type Props = { lang: Locale };

export function TechStack({ lang }: Props) {
  const heading = lang === "tr" ? "Teknoloji Yığını" : "Tech Stack";
  const sub = lang === "tr"
    ? "Günlük kullandığım ve üzerine düşündüğüm teknolojiler."
    : "Technologies I use daily and think deeply about.";

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <BlurFade delay={0.05} inView>
          <div className="mb-10 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Stack</p>
            <h2 className="text-3xl font-black tracking-tight text-foreground">{heading}</h2>
            <p className="text-text-muted">{sub}</p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techGroups.map((group, i) => (
            <TechCard key={group.label.tr} {...group} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
