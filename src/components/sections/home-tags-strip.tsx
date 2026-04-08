"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Hash, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Spotlight } from "@/components/magicui/spotlight";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/app/[lang]/dictionaries";
import type { BlogTaxonomyItem } from "@/services/server/post-server";

type Dict = {
  title: string;
  subtitle: string;
  empty: string;
  view_posts: string;
};

type Props = {
  lang: Locale;
  tags: BlogTaxonomyItem[];
  dict: Dict;
};

export function HomeTagsStrip({ lang, tags, dict }: Props) {
  const top = tags.slice(0, 10);

  return (
    <section className="py-6 md:py-8">
      <div className="mx-auto max-w-5xl px-4">
        <BlurFade delay={0.08}>
          <Spotlight className="rounded-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/70 p-6 backdrop-blur-xl md:p-7">
              <div className="pointer-events-none absolute -top-14 left-6 h-36 w-36 rounded-full bg-fuchsia-500/15 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-14 right-6 h-36 w-36 rounded-full bg-cyan-500/15 blur-2xl" />
              <GridPattern
                squares={[
                  [2, 1],
                  [5, 2],
                  [9, 1],
                ]}
                className="opacity-20 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,white,transparent)]"
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
                    href={`/${lang}/etiketler`}
                    className="hidden items-center gap-1 text-sm font-semibold text-text-muted hover:text-foreground sm:inline-flex"
                  >
                    {dict.view_posts}
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {top.length === 0 ? (
                  <p className="text-sm text-text-muted">{dict.empty}</p>
                ) : (
                  <div className="flex flex-wrap gap-2.5">
                    {top.map((t, i) => (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: i * 0.03, duration: 0.25 }}
                        whileHover={{ y: -4, scale: 1.04, rotateX: 8, rotateY: -8 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Link href={`/${lang}/blog?tagId=${encodeURIComponent(t.id)}`}>
                          <Badge
                            variant="outline"
                            className="h-9 cursor-pointer rounded-full border-border/70 bg-background/50 px-3.5 text-sm text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-md hover:shadow-fuchsia-500/10"
                          >
                            <Hash size={12} />
                            {t.name}
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
