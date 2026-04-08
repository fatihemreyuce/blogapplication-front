"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, Bookmark } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Spotlight } from "@/components/magicui/spotlight";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/app/[lang]/dictionaries";
import type { PostPreview } from "@/types/post.types";

type Props = {
  posts: PostPreview[];
  lang: Locale;
  emptyLabel: string;
};

function formatDate(date: string | null, lang: Locale): string {
  if (!date) return lang === "tr" ? "Yeni" : "New";
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function PostCard({ post, lang, index }: { post: PostPreview; lang: Locale; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-120, 120], [8, -8]), {
    stiffness: 220,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-120, 120], [-8, 8]), {
    stiffness: 220,
    damping: 24,
  });

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <BlurFade delay={0.08 + index * 0.06} inView>
      <Spotlight className="group rounded-2xl">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
          className="h-full"
        >
          <Link
            href={`/${lang}/blog/${post.id}`}
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="block h-full"
          >
            <Card className="flex h-full min-h-[430px] flex-col rounded-2xl border border-border/60 bg-surface/85 py-0 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-violet-500/10">
              <div className="relative h-40 overflow-hidden rounded-t-2xl border-b border-border/50 bg-gradient-to-br from-violet-600/25 via-blue-600/15 to-emerald-500/20">
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm font-semibold text-text-muted">
                    {lang === "tr" ? "Kapak Görseli" : "Cover Image"}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              <CardHeader className="space-y-2 p-5">
                {post.category_name ? (
                  <span className="inline-flex w-fit rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    {post.category_name}
                  </span>
                ) : null}
                <CardTitle className="line-clamp-2 text-lg font-bold">{post.title}</CardTitle>
                <p className="text-xs text-text-subtle">
                  {formatDate(post.published_at, lang)} • {post.reading_time ?? 1}{" "}
                  {lang === "tr" ? "dk" : "min"}
                </p>
              </CardHeader>

              <CardContent className="mt-auto px-5 pb-5">
                <p className="line-clamp-3 text-sm leading-relaxed text-text-muted">
                  {post.excerpt ?? (lang === "tr" ? "Bu yazıyı okumak için tıkla." : "Click to read this post.")}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-text-subtle">
                  <span className="inline-flex items-center gap-1">
                    <Heart size={13} />
                    {post.likes_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Bookmark size={13} />
                    {post.bookmarks_count}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </Spotlight>
    </BlurFade>
  );
}

export function PostsGrid3D({ posts, lang, emptyLabel }: Props) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 bg-surface/70 p-8 text-center text-text-muted">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} lang={lang} index={index} />
      ))}
    </div>
  );
}
