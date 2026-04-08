"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Spotlight } from "@/components/magicui/spotlight";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/app/[lang]/dictionaries";
import type { Category } from "@/types/category.types";

type Dict = {
  title: string;
  subtitle: string;
  empty: string;
  view_posts: string;
};

type Props = {
  lang: Locale;
  categories: Category[];
  dict: Dict;
};

export function HomeCategoriesStrip({ lang, categories, dict }: Props) {
  const top = categories.slice(0, 8);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-4">
        <BlurFade delay={0.06}>
          <Spotlight className="rounded-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/70 p-6 backdrop-blur-xl md:p-7">
              <div className="pointer-events-none absolute -top-10 right-10 h-36 w-36 rounded-full bg-violet-500/15 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 left-8 h-36 w-36 rounded-full bg-blue-500/15 blur-2xl" />
              <GridPattern
                squares={[
                  [1, 1],
                  [4, 2],
                  [7, 1],
                ]}
                className="opacity-25 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,white,transparent)]"
              />

              <div className="relative z-10">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      <Sparkles size={12} />
                      {dict.title}
                    </div>
                    <p className="text-sm text-text-muted">{dict.subtitle}</p>
                  </div>
                  <Link
                    href={`/${lang}/kategoriler`}
                    className="hidden items-center gap-1 text-sm font-semibold text-text-muted hover:text-foreground sm:inline-flex"
                  >
                    {lang === "tr" ? "Tümü" : "All"}
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {top.length === 0 ? (
                  <p className="text-sm text-text-muted">{dict.empty}</p>
                ) : (
                  <div className="flex flex-wrap gap-2.5">
                    {top.map((c, i) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: i * 0.03, duration: 0.25 }}
                        whileHover={{ y: -4, scale: 1.04, rotateX: 8, rotateY: -8 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Link href={`/${lang}/blog?categoryId=${encodeURIComponent(c.id)}`}>
                          <Badge
                            variant="outline"
                            className="h-9 cursor-pointer rounded-full border-border/70 bg-background/50 px-3.5 text-sm text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-md hover:shadow-violet-500/10"
                          >
                            {c.name}
                          </Badge>
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
