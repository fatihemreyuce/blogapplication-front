"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor, Server, Paintbrush, Wrench, Lightbulb, ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { Locale } from "@/app/[lang]/dictionaries";

const topics = [
  { icon: Monitor, color: "#8b5cf6", slug: "frontend",  tr: "Frontend",  en: "Frontend" },
  { icon: Server,  color: "#34d399", slug: "backend",   tr: "Backend",   en: "Backend" },
  { icon: Paintbrush, color: "#f97316", slug: "tasarim", tr: "Tasarım", en: "Design" },
  { icon: Wrench,  color: "#60a5fa", slug: "araclar",   tr: "Araçlar",   en: "Tools" },
  { icon: Lightbulb, color: "#fbbf24", slug: "fikirler", tr: "Fikirler", en: "Ideas" },
];

type Props = { lang: Locale };

export function TopicsTeaser({ lang }: Props) {
  const heading  = lang === "tr" ? "Konular"         : "Topics";
  const viewAll  = lang === "tr" ? "Tümünü Gör"      : "View All";
  const sub      = lang === "tr" ? "Ne okumak istiyorsun?" : "What do you want to read?";

  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-4">
        <BlurFade delay={0.05} inView>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">{sub}</p>
              <h2 className="text-2xl font-black tracking-tight text-foreground">{heading}</h2>
            </div>
            <Link
              href={`/${lang}/kategoriler`}
              className="flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-foreground"
            >
              {viewAll}
              <ArrowRight size={14} />
            </Link>
          </div>
        </BlurFade>

        <div className="flex flex-wrap gap-3">
          {topics.map(({ icon: Icon, color, slug, tr, en }, i) => (
            <BlurFade key={slug} delay={0.08 + i * 0.06} inView>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${lang}/kategoriler/${slug}`}
                  className="group flex items-center gap-2.5 rounded-2xl border border-border/60 bg-surface/80 px-4 py-3 backdrop-blur-sm transition-all hover:border-[currentColor]/30 hover:shadow-lg"
                  style={{ "--topic-color": color } as React.CSSProperties}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-border/60 bg-surface-2 transition-all group-hover:shadow-md"
                    style={{ boxShadow: `0 0 0 0 ${color}00` }}
                  >
                    <Icon size={15} style={{ color }} />
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {lang === "tr" ? tr : en}
                  </span>
                  {/* Hover'da görünen ok */}
                  <ArrowRight
                    size={13}
                    className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    style={{ color }}
                  />
                </Link>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
