"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers3, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Spotlight } from "@/components/magicui/spotlight";
import type { Locale } from "@/app/[lang]/dictionaries";
import type { Series } from "@/types/series.types";

type Dict = {
  title: string;
  subtitle: string;
  empty: string;
  view_posts: string;
};

type Props = {
  lang: Locale;
  series: Series[];
  dict: Dict;
};

export function SeriesShowcase({ lang, series, dict }: Props) {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="pointer-events-none absolute -top-20 left-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4">
        <BlurFade delay={0.04}>
          <Spotlight className="rounded-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/75 p-7 backdrop-blur-xl md:p-9">
              <GridPattern
                squares={[
                  [1, 2],
                  [4, 1],
                  [8, 3],
                ]}
                className="opacity-25 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,white,transparent)]"
              />

              <div className="relative z-10 text-center">
                <p className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                  <Sparkles size={12} />
                  {dict.title}
                </p>
                <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{dict.title}</h1>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-text-muted md:text-base">{dict.subtitle}</p>
              </div>
            </div>
          </Spotlight>
        </BlurFade>

        {series.length === 0 ? (
          <BlurFade delay={0.1} inView>
            <p className="mt-12 text-center text-sm text-text-muted">{dict.empty}</p>
          </BlurFade>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {series.map((item, i) => (
              <li key={item.id} className="list-none">
                <BlurFade delay={0.06 + i * 0.04} inView>
                  <motion.div whileHover={{ y: -5, scale: 1.02, rotateX: 6, rotateY: -6 }}>
                    <Link
                      href={`/${lang}/seriler/${encodeURIComponent(item.slug)}`}
                      className="group block overflow-hidden rounded-2xl border border-border/60 bg-surface/70 backdrop-blur-md transition-all hover:border-primary/35 hover:shadow-lg hover:shadow-violet-500/10"
                    >
                      <div className="relative h-40 overflow-hidden border-b border-border/50">
                        {item.cover_image ? (
                          <img
                            src={item.cover_image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-violet-600/30 via-blue-600/20 to-emerald-500/20" />
                        )}
                        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-background/70 px-2 py-1 text-[10px] font-semibold text-primary backdrop-blur-sm">
                          <Layers3 size={11} />
                          Series
                        </div>
                      </div>
                      <div className="space-y-2 p-4">
                        <p className="line-clamp-1 text-lg font-bold tracking-tight text-foreground group-hover:text-primary">
                          {item.title}
                        </p>
                        <p className="line-clamp-2 text-sm text-text-muted">
                          {item.description ?? `/${item.slug}`}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-text-subtle group-hover:text-primary">
                          {dict.view_posts}
                          <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </BlurFade>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
