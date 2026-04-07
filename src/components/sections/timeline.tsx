"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { Locale } from "@/app/[lang]/dictionaries";

const timelineData = {
  tr: [
    {
      icon: Rocket,
      color: "#8b5cf6",
      period: "2024 — Günümüz",
      title: "Freelance Full-Stack Developer",
      place: "Serbest",
      desc: "Modern web uygulamaları geliştiriyorum. React, Next.js ve Supabase ile full-stack projeler üretiyorum.",
    },
    {
      icon: Briefcase,
      color: "#60a5fa",
      period: "2023 — 2024",
      title: "Frontend Developer",
      place: "Startup",
      desc: "SaaS ürünlerin frontend geliştirmesi. TypeScript, React ve tasarım sistemi kurulumu.",
    },
    {
      icon: GraduationCap,
      color: "#34d399",
      period: "2021 — 2023",
      title: "Bilgisayar Mühendisliği",
      place: "Üniversite",
      desc: "Yazılım geliştirme, veri yapıları ve algoritmalar üzerine eğitim.",
    },
  ],
  en: [
    {
      icon: Rocket,
      color: "#8b5cf6",
      period: "2024 — Present",
      title: "Freelance Full-Stack Developer",
      place: "Self-employed",
      desc: "Building modern web applications. Full-stack projects with React, Next.js and Supabase.",
    },
    {
      icon: Briefcase,
      color: "#60a5fa",
      period: "2023 — 2024",
      title: "Frontend Developer",
      place: "Startup",
      desc: "Frontend development for SaaS products. TypeScript, React, and design system setup.",
    },
    {
      icon: GraduationCap,
      color: "#34d399",
      period: "2021 — 2023",
      title: "Computer Engineering",
      place: "University",
      desc: "Studies in software development, data structures, and algorithms.",
    },
  ],
};

type Props = { lang: Locale };

export function Timeline({ lang }: Props) {
  const items = timelineData[lang];
  const heading = lang === "tr" ? "Deneyim" : "Experience";
  const sub = lang === "tr" ? "Bugüne kadar yaptıklarım." : "What I've done so far.";

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <BlurFade delay={0.05} inView>
          <div className="mb-10 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {lang === "tr" ? "Geçmiş" : "History"}
            </p>
            <h2 className="text-3xl font-black tracking-tight text-foreground">{heading}</h2>
            <p className="text-text-muted">{sub}</p>
          </div>
        </BlurFade>

        <div className="relative">
          {/* Dikey çizgi */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-1/2 md:-translate-x-px" />

          <div className="space-y-8">
            {items.map((item, i) => {
              const Icon = item.icon;
              const isRight = i % 2 === 0;

              return (
                <BlurFade key={i} delay={0.1 + i * 0.12} inView>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${isRight ? "md:flex-row" : "md:flex-row-reverse"}`}>

                    {/* Desktop: boşluk */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Merkez ikon — sadece desktop'ta mutlak */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.1 + i * 0.12 }}
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-surface shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0"
                      style={{ borderColor: `${item.color}40`, boxShadow: `0 0 16px ${item.color}20` }}
                    >
                      <Icon size={16} style={{ color: item.color }} />
                    </motion.div>

                    {/* Kart */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={`group flex-1 md:w-[calc(50%-2rem)] ${isRight ? "md:mr-8 md:text-right" : "md:ml-8"} relative overflow-hidden rounded-2xl border border-border/60 bg-surface/80 p-5 backdrop-blur-sm hover:border-border hover:shadow-lg transition-all`}
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(200px at 50% 0%, ${item.color}0A, transparent)` }}
                      />

                      <div className="relative z-10">
                        <span className="text-xs font-medium text-text-subtle">{item.period}</span>
                        <h3 className="mt-1 font-bold text-foreground">{item.title}</h3>
                        <p className="text-sm font-medium text-primary">{item.place}</p>
                        <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.desc}</p>
                      </div>
                    </motion.div>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
