"use client";

import { motion } from "framer-motion";
import { Check, Zap, BookOpen, MessageSquare } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Spotlight } from "@/components/magicui/spotlight";
import Link from "next/link";
import type { Locale } from "@/app/[lang]/dictionaries";

const content = {
  tr: {
    eyebrow: "Neden Bu Blog?",
    heading: "Yayın İlkemiz",
    desc: "İnternette içerik çok, sinyal az. Bu blogu; az ama nitelikli, uygulanabilir ve güncel içerik üretmek için sürdürüyoruz.",
    pillars: [
      {
        icon: Zap,
        color: "#8b5cf6",
        title: "Pratik Önce",
        points: [
          "Gerçek projelerden alınan örnekler",
          "Çalışan kod parçaları",
          "Adım adım açıklamalar",
        ],
      },
      {
        icon: BookOpen,
        color: "#60a5fa",
        title: "Derinlik",
        points: [
          "Yüzeysel değil, derinlemesine",
          "Neden ve nasıl soruları",
          "Alternatif yaklaşımlar",
        ],
      },
      {
        icon: MessageSquare,
        color: "#34d399",
        title: "Dürüstlük",
        points: [
          "Sadece iyi değil, kötü deneyimler de",
          "Trade-off'ları açık açık tartışmak",
          "Kişisel görüş ve deneyim",
        ],
      },
    ],
    authorLabel: "Yazar Hakkında",
    authorName: "Fatih Emre",
    authorTitle: "Full-Stack Developer",
    authorBio: "2+ yıldır web ürünleri geliştiriyor. React, Next.js ve Supabase odaklı çalışıyor. Bu yayın; öğrendiklerini sade ve uygulanabilir şekilde paylaşmak için yürütülüyor.",
    cta: "Okumaya Başla",
  },
  en: {
    eyebrow: "Why This Blog?",
    heading: "Editorial Principle",
    desc: "There is too much content and too little signal. This blog is maintained to publish fewer but more useful, practical, and up-to-date articles.",
    pillars: [
      {
        icon: Zap,
        color: "#8b5cf6",
        title: "Practical First",
        points: [
          "Examples from real projects",
          "Working code snippets",
          "Step-by-step explanations",
        ],
      },
      {
        icon: BookOpen,
        color: "#60a5fa",
        title: "Depth",
        points: [
          "In-depth, not surface level",
          "The why and how questions",
          "Alternative approaches",
        ],
      },
      {
        icon: MessageSquare,
        color: "#34d399",
        title: "Honesty",
        points: [
          "Not just good, but bad experiences too",
          "Trade-offs discussed openly",
          "Personal opinion and experience",
        ],
      },
    ],
    authorLabel: "About the Author",
    authorName: "Fatih Emre",
    authorTitle: "Full-Stack Developer",
    authorBio: "Building web products for 2+ years, mainly with React, Next.js, and Supabase. This publication exists to share learnings in a clear and actionable way.",
    cta: "Start Reading",
  },
};

type Props = { lang: Locale };

export function BlogMission({ lang }: Props) {
  const t = content[lang];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4 space-y-16">

        {/* Misyon sütunları */}
        <div>
          <BlurFade delay={0.05} inView>
            <div className="mb-10 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t.eyebrow}</p>
              <h2 className="text-3xl font-black tracking-tight text-foreground">{t.heading}</h2>
              <p className="max-w-2xl text-text-muted">{t.desc}</p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {t.pillars.map(({ icon: Icon, color, title, points }, i) => (
              <BlurFade key={title} delay={0.1 + i * 0.1} inView>
                <Spotlight className="group h-full rounded-2xl">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="h-full overflow-hidden rounded-2xl border border-border/60 bg-surface/80 p-6 backdrop-blur-sm hover:border-border hover:shadow-xl transition-all"
                  >
                    {/* Üst renkli şerit */}
                    <div className="mb-5 h-0.5 w-8 rounded-full" style={{ background: color }} />

                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-surface-2">
                      <Icon size={18} style={{ color }} />
                    </div>

                    <h3 className="mb-4 font-bold text-foreground">{title}</h3>

                    <ul className="space-y-2">
                      {points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-text-muted">
                          <Check size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </Spotlight>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Yazar kartı */}
        <BlurFade delay={0.1} inView>
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/80 backdrop-blur-xl p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
              {/* Avatar tarafı */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-emerald-400 opacity-50 blur-sm" />
                  <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-violet-600 via-blue-600 to-emerald-500 flex items-center justify-center text-2xl font-black text-white shadow-xl">
                    F
                  </div>
                </div>
                <div>
                  <p className="font-bold text-foreground">{t.authorName}</p>
                  <p className="text-sm text-primary">{t.authorTitle}</p>
                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {lang === "tr" ? "Aktif yazar" : "Active writer"}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1 space-y-1 md:border-l md:border-border/60 md:pl-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-text-subtle">
                  {t.authorLabel}
                </p>
                <p className="text-[15px] leading-relaxed text-text-muted">{t.authorBio}</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* CTA Banner */}
        <BlurFade delay={0.1} inView>
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/80 backdrop-blur-xl p-10 text-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
            </div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="relative z-10 space-y-5">
              <p className="text-3xl font-black text-foreground">
                {lang === "tr" ? "Hazır mısın? 🚀" : "Ready to dive in? 🚀"}
              </p>
              <p className="mx-auto max-w-sm text-sm text-text-muted">
                {lang === "tr"
                  ? "Tüm yazılara göz at, bir kategoriden başla ya da arama yap."
                  : "Browse all posts, start with a category, or search for something specific."}
              </p>
              <ShimmerButton>
                <Link href={`/${lang}/blog`} className="flex items-center gap-2">
                  {t.cta}
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
        </BlurFade>
      </div>
    </section>
  );
}
