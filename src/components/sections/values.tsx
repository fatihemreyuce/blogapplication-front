"use client";

import { motion } from "framer-motion";
import { Zap, Heart, BookOpen, Telescope } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Spotlight } from "@/components/magicui/spotlight";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import Link from "next/link";
import type { Locale } from "@/app/[lang]/dictionaries";

const valuesData = {
  tr: [
    {
      icon: Zap,
      color: "#8b5cf6",
      bg: "from-violet-500/10 to-violet-500/0",
      title: "Hız & Kalite",
      desc: "Hızlı ama sağlam. Performance ve developer experience birbirinin düşmanı olmak zorunda değil.",
    },
    {
      icon: Heart,
      color: "#f43f5e",
      bg: "from-rose-500/10 to-rose-500/0",
      title: "Detaylara Önem",
      desc: "Küçük detaylar büyük fark yaratır. Animasyonlar, boşluklar, tipografi — hepsi önemli.",
    },
    {
      icon: BookOpen,
      color: "#60a5fa",
      bg: "from-blue-500/10 to-blue-500/0",
      title: "Sürekli Öğrenme",
      desc: "Teknoloji durmuyor. Ben de durmuyorum. Her gün yeni bir şey öğrenmeye çalışıyorum.",
    },
    {
      icon: Telescope,
      color: "#34d399",
      bg: "from-emerald-500/10 to-emerald-500/0",
      title: "Açık Kaynak Ruhu",
      desc: "Öğrendiklerimi paylaşmak, topluluktan öğrenmek ve geri vermek benim için çok değerli.",
    },
  ],
  en: [
    {
      icon: Zap,
      color: "#8b5cf6",
      bg: "from-violet-500/10 to-violet-500/0",
      title: "Speed & Quality",
      desc: "Fast but solid. Performance and developer experience don't have to be enemies.",
    },
    {
      icon: Heart,
      color: "#f43f5e",
      bg: "from-rose-500/10 to-rose-500/0",
      title: "Attention to Detail",
      desc: "Small details make a big difference. Animations, spacing, typography — it all matters.",
    },
    {
      icon: BookOpen,
      color: "#60a5fa",
      bg: "from-blue-500/10 to-blue-500/0",
      title: "Continuous Learning",
      desc: "Technology doesn't stop. Neither do I. I try to learn something new every day.",
    },
    {
      icon: Telescope,
      color: "#34d399",
      bg: "from-emerald-500/10 to-emerald-500/0",
      title: "Open Source Spirit",
      desc: "Sharing what I learn, learning from the community, and giving back is very valuable to me.",
    },
  ],
};

type Props = { lang: Locale };

export function Values({ lang }: Props) {
  const items = valuesData[lang];
  const heading = lang === "tr" ? "Değerlerim" : "My Values";
  const sub = lang === "tr"
    ? "İyi yazılım yaparken önem verdiğim şeyler."
    : "Things I care about when building great software.";
  const ctaLabel = lang === "tr" ? "Blog'u Keşfet" : "Explore Blog";

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4 space-y-16">

        {/* Values grid */}
        <div>
          <BlurFade delay={0.05} inView>
            <div className="mb-10 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {lang === "tr" ? "Felsefe" : "Philosophy"}
              </p>
              <h2 className="text-3xl font-black tracking-tight text-foreground">{heading}</h2>
              <p className="text-text-muted">{sub}</p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map(({ icon: Icon, color, bg, title, desc }, i) => (
              <BlurFade key={title} delay={0.1 + i * 0.08} inView>
                <Spotlight className="group rounded-2xl">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`relative overflow-hidden rounded-2xl border border-border/60 bg-surface/80 p-6 backdrop-blur-sm hover:border-border transition-all hover:shadow-lg`}
                  >
                    {/* Arka plan gradient */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative z-10 space-y-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-surface-2 transition-colors group-hover:border-current/20"
                        style={{ boxShadow: `0 0 12px ${color}20` }}
                      >
                        <Icon size={18} style={{ color }} />
                      </div>
                      <h3 className="font-bold text-foreground">{title}</h3>
                      <p className="text-sm leading-relaxed text-text-muted">{desc}</p>
                    </div>
                  </motion.div>
                </Spotlight>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <BlurFade delay={0.1} inView>
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/80 backdrop-blur-xl p-10 text-center">
            {/* Arka plan glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            </div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="relative z-10 space-y-4">
              <p className="text-3xl font-black text-foreground">
                {lang === "tr" ? "Yazılarıma göz at 👀" : "Check out my posts 👀"}
              </p>
              <p className="text-text-muted mx-auto max-w-sm text-sm">
                {lang === "tr"
                  ? "Teknoloji, tasarım ve yazılım hakkında düşüncelerimi paylaşıyorum."
                  : "I share my thoughts on technology, design, and software."}
              </p>
              <div className="flex items-center justify-center pt-2">
                <ShimmerButton>
                  <Link href={`/${lang}/blog`} className="flex items-center gap-2">
                    {ctaLabel}
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </Link>
                </ShimmerButton>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
