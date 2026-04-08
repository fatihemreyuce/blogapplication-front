"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers3 } from "lucide-react";
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

export function HomeSeriesStrip({ lang, series, dict }: Props) {
  const top = series.slice(0, 3);

  return (
    <section className="py-6 md:py-8">
      <div className="mx-auto max-w-5xl px-4">
        <BlurFade delay={0.08}>
          <Spotlight className="rounded-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/70 p-6 backdrop-blur-xl md:p-7">
              <GridPattern
                squares={[
                  [2, 1],
                  [6, 2],
                  [10, 1],
                ]}
                className="opacity-20 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,white,transparent)]"
              />
              <div className="relative z-10">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      <Layers3 size={12} />
                      {dict.title}
                    </p>
                    <p className="text-sm text-text-muted">{dict.subtitle}</p>
                  </div>
                  <Link
                    href={`/${lang}/seriler`}
                    className="hidden items-center gap-1 text-sm font-semibold text-text-muted hover:text-foreground sm:inline-flex"
                  >
                    {dict.view_posts}
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {top.length === 0 ? (
                  <p className="text-sm text-text-muted">{dict.empty}</p>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {top.map((s, i) => (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: i * 0.05, duration: 0.25 }}
                        whileHover={{ y: -6, scale: 1.02, rotateX: 6, rotateY: -6 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Link
                          href={`/${lang}/seriler/${encodeURIComponent(s.slug)}`}
                          className="group block overflow-hidden rounded-2xl border border-border/60 bg-background/45 transition-all hover:border-primary/35 hover:shadow-lg hover:shadow-violet-500/10"
                        >
                          <div className="relative h-24 overflow-hidden">
                            {s.cover_image ? (
                              <img
                                src={s.cover_image}
                                alt={s.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="h-full w-full bg-gradient-to-br from-violet-600/30 via-blue-600/20 to-emerald-500/20" />
                            )}
                          </div>
                          <div className="p-3">
                            <p className="line-clamp-1 text-sm font-bold text-foreground group-hover:text-primary">
                              {s.title}
                            </p>
                            <p className="mt-1 text-[11px] text-text-subtle">/{s.slug}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Spotlight>
        </BlurFade>
      </div>
    </section>
  );
}
