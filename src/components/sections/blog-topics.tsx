"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Monitor, Server, Paintbrush, Wrench, Lightbulb, Layers } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { Locale } from "@/app/[lang]/dictionaries";

const topics = [
  {
    icon: Monitor,
    color: "#8b5cf6",
    glow: "from-violet-500/15 to-violet-500/0",
    ring: "hover:border-violet-500/30",
    tr: { title: "Frontend", desc: "React, Next.js, Tailwind, animasyonlar ve performans optimizasyonu üzerine pratik yazılar." },
    en: { title: "Frontend", desc: "Practical articles on React, Next.js, Tailwind, animations, and performance optimization." },
  },
  {
    icon: Server,
    color: "#34d399",
    glow: "from-emerald-500/15 to-emerald-500/0",
    ring: "hover:border-emerald-500/30",
    tr: { title: "Backend", desc: "API tasarımı, veritabanı mimarisi, Supabase ve sunucu tarafı best practice'ler." },
    en: { title: "Backend", desc: "API design, database architecture, Supabase, and server-side best practices." },
  },
  {
    icon: Paintbrush,
    color: "#f97316",
    glow: "from-orange-500/15 to-orange-500/0",
    ring: "hover:border-orange-500/30",
    tr: { title: "Tasarım", desc: "UI/UX prensipleri, design system kurulumu, renk teorisi ve tipografi." },
    en: { title: "Design", desc: "UI/UX principles, design system setup, color theory, and typography." },
  },
  {
    icon: Wrench,
    color: "#60a5fa",
    glow: "from-blue-500/15 to-blue-500/0",
    ring: "hover:border-blue-500/30",
    tr: { title: "Araçlar & DX", desc: "Geliştirici deneyimini iyileştiren araçlar, konfigürasyonlar ve iş akışları." },
    en: { title: "Tools & DX", desc: "Tools, configurations, and workflows that improve developer experience." },
  },
  {
    icon: Lightbulb,
    color: "#fbbf24",
    glow: "from-yellow-500/15 to-yellow-500/0",
    ring: "hover:border-yellow-500/30",
    tr: { title: "Fikirler", desc: "Yazılım dünyası, kariyer, üretkenlik ve teknoloji üzerine düşünceler." },
    en: { title: "Ideas", desc: "Thoughts on software, career, productivity, and technology." },
  },
  {
    icon: Layers,
    color: "#a78bfa",
    glow: "from-violet-400/15 to-violet-400/0",
    ring: "hover:border-violet-400/30",
    tr: { title: "Projeler", desc: "Gerçek projeler, case study'ler ve açık kaynak katkıları üzerine yazılar." },
    en: { title: "Projects", desc: "Real projects, case studies, and articles on open source contributions." },
  },
];

function TopicCard({
  topic,
  lang,
  index,
}: {
  topic: (typeof topics)[number];
  lang: Locale;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(x, [-50, 50], [0, 100]);
  const glowY = useTransform(y, [-50, 50], [0, 100]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - (r.left + r.width / 2));
    y.set(e.clientY - (r.top + r.height / 2));
  }
  function onLeave() { x.set(0); y.set(0); }

  const { title, desc } = topic[lang];

  return (
    <BlurFade delay={0.08 + index * 0.07} inView>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 600 }}
        className="group h-full cursor-default"
      >
        <motion.div
          style={{ translateZ: 10 }}
          className={`relative h-full overflow-hidden rounded-2xl border border-border/60 bg-surface/80 p-5 backdrop-blur-sm transition-all hover:shadow-xl ${topic.ring}`}
        >
          {/* Mouse glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: `radial-gradient(160px circle at ${glowX}% ${glowY}%, ${topic.color}15, transparent 70%)` }}
          />
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${topic.glow} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

          <div className="relative z-10 flex h-full flex-col gap-4">
            {/* İkon */}
            <motion.div
              style={{ translateZ: 8 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-surface-2 transition-all group-hover:shadow-md"
              whileHover={{ boxShadow: `0 0 16px ${topic.color}30` }}
            >
              <topic.icon size={18} style={{ color: topic.color }} />
            </motion.div>

            {/* Başlık */}
            <div className="space-y-1.5">
              <h3 className="font-bold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{desc}</p>
            </div>

            {/* Alt çizgi */}
            <div
              className="mt-auto h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-full"
              style={{ background: `linear-gradient(90deg, ${topic.color}, transparent)` }}
            />
          </div>
        </motion.div>
      </motion.div>
    </BlurFade>
  );
}

type Props = { lang: Locale };

export function BlogTopics({ lang }: Props) {
  const heading = lang === "tr" ? "Konular" : "Topics";
  const sub = lang === "tr"
    ? "Bu yayında hangi içerikler var?"
    : "What kind of content is published here?";

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <BlurFade delay={0.05} inView>
          <div className="mb-10 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {lang === "tr" ? "Yayın Haritası" : "Content Map"}
            </p>
            <h2 className="text-3xl font-black tracking-tight text-foreground">{heading}</h2>
            <p className="text-text-muted">{sub}</p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, i) => (
            <TopicCard key={topic.tr.title} topic={topic} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
