"use client";

import { motion } from "framer-motion";
import { Rss, BookOpen, Users, TrendingUp } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import type { Locale } from "@/app/[lang]/dictionaries";

const content = {
  tr: {
    eyebrow: "Blog Hakkında",
    heading: "Blogumuzun\nhikayesi.",
    sub: "Frontend, backend, tasarım ve üretim odaklı notlar.",
    desc: "Burası; modern web teknolojileri, ürün geliştirme ve yazılım kültürü üzerine düzenli notlar tuttuğumuz bir yayın alanı. Teoriden çok pratiğe, parlak cümlelerden çok işe yarayan çıktılara odaklanıyoruz.",
    stats: [
      { icon: BookOpen, value: "48", label: "Yayın" },
      { icon: Users, value: "6", label: "Ana Tema" },
      { icon: TrendingUp, value: "2K+", label: "Aylık Okuma" },
      { icon: Rss, value: "Haftalık", label: "Yeni İçerik" },
    ],
  },
  en: {
    eyebrow: "About the Blog",
    heading: "The story\nbehind this blog.",
    sub: "Notes on frontend, backend, design, and building.",
    desc: "This is our publishing space for modern web technologies, product development, and software craft. We prioritize practical outcomes over abstract theory and share lessons from real work.",
    stats: [
      { icon: BookOpen, value: "48", label: "Articles" },
      { icon: Users, value: "6", label: "Core Topics" },
      { icon: TrendingUp, value: "2K+", label: "Monthly Reads" },
      { icon: Rss, value: "Weekly", label: "New Drops" },
    ],
  },
};

type Props = { lang: Locale };

export function BlogAboutHero({ lang }: Props) {
  const t = content[lang];
  const lines = t.heading.split("\n");

  return (
    <section className="relative overflow-hidden pt-20 pb-12">
      {/* Arka plan */}
      <GridPattern
        squares={[[4, 2], [8, 3], [12, 2], [3, 6], [9, 7]]}
        className="opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,white,transparent)]"
      />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 text-center space-y-8">

        {/* Eyebrow */}
        <BlurFade delay={0.05}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-muted px-3.5 py-1.5 text-xs font-semibold text-primary">
            <Rss size={11} />
            {t.eyebrow}
          </span>
        </BlurFade>

        {/* Başlık */}
        <BlurFade delay={0.12}>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight lg:text-7xl">
            {lines.map((line, i) => (
              <span key={i} className="block">
                {i === 0 ? (
                  <span className="text-foreground">{line}</span>
                ) : (
                  <AnimatedGradientText className="text-5xl font-black lg:text-7xl">
                    {line}
                  </AnimatedGradientText>
                )}
              </span>
            ))}
          </h1>
        </BlurFade>

        {/* Alt başlık */}
        <BlurFade delay={0.2}>
          <p className="text-xl font-medium text-text-muted">{t.sub}</p>
        </BlurFade>

        {/* Açıklama */}
        <BlurFade delay={0.27}>
          <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-text-muted">
            {t.desc}
          </p>
        </BlurFade>

        {/* İstatistik kartları */}
        <BlurFade delay={0.34}>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {t.stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/80 p-5 backdrop-blur-sm text-center hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10 space-y-2">
                  <div className="flex justify-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-muted">
                      <Icon size={16} className="text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl font-black text-foreground">{value}</p>
                  <p className="text-xs text-text-subtle">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
