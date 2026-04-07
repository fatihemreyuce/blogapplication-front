"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Bookmark, Clock } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { PostPreview } from "@/types/post.types";
import type { Locale } from "@/app/[lang]/dictionaries";

function formatDate(date: string | null, lang: Locale) {
  if (!date) return "";
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

type Props = { post: PostPreview; lang: Locale };

export function FeaturedPost({ post, lang }: Props) {
  const readLabel = lang === "tr" ? "Oku" : "Read";
  const featuredLabel = lang === "tr" ? "Öne Çıkan" : "Featured";
  const minLabel = lang === "tr" ? "dk okuma" : "min read";

  return (
    <BlurFade delay={0.08} inView>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group"
      >
        <Link href={`/${lang}/blog/${post.id}`} className="block">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/80 backdrop-blur-sm hover:border-primary/30 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500">

            {/* Üst gradient şerit */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10" />

            <div className="flex flex-col md:flex-row">
              {/* Görsel */}
              <div className="relative h-52 shrink-0 overflow-hidden md:h-auto md:w-2/5">
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full min-h-[220px] items-center justify-center bg-gradient-to-br from-violet-600/25 via-blue-600/15 to-emerald-500/20">
                    <div className="text-5xl opacity-20 select-none">✦</div>
                  </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/20 md:bg-gradient-to-l" />
              </div>

              {/* İçerik */}
              <div className="flex flex-1 flex-col justify-between gap-5 p-7 md:p-8">
                {/* Üst */}
                <div className="space-y-4">
                  {/* Badge + Meta */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gradient-to-r from-violet-500/15 to-blue-500/15 border border-primary/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest text-primary">
                      {featuredLabel}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-text-subtle">
                      <Clock size={11} />
                      {post.reading_time ?? 1} {minLabel}
                    </span>
                    {post.published_at && (
                      <span className="text-xs text-text-subtle">
                        {formatDate(post.published_at, lang)}
                      </span>
                    )}
                  </div>

                  {/* Başlık */}
                  <h3 className="text-xl font-black leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="line-clamp-3 text-sm leading-relaxed text-text-muted">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {/* Alt: stats + CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-text-subtle">
                    <span className="flex items-center gap-1">
                      <Heart size={12} />
                      {post.likes_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bookmark size={12} />
                      {post.bookmarks_count}
                    </span>
                  </div>

                  <motion.span
                    className="flex items-center gap-1.5 rounded-full bg-primary-muted px-4 py-1.5 text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                    animate={{ x: 0 }}
                    whileHover={{ x: 2 }}
                  >
                    {readLabel}
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </BlurFade>
  );
}
