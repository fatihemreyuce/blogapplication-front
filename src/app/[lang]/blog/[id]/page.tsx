import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  ArrowLeft,
  Eye,
  Heart,
  Bookmark,
  Share2,
  ChevronRight,
} from "lucide-react";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Spotlight } from "@/components/magicui/spotlight";
import { Badge } from "@/components/ui/badge";
import { PostEngagementActions } from "@/components/blog/post-engagement-actions";
import { getPostById } from "@/services/server/post-server";

function formatDate(date: string | null, lang: "tr" | "en"): string {
  if (!date) return lang === "tr" ? "Yayın tarihi yok" : "No publish date";
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function PostDetailPage({
  params,
}: PageProps<"/[lang]/blog/[id]">) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const post = await getPostById(id);
  if (!post || post.status !== "published") notFound();

  const readTime =
    post.reading_time ??
    Math.max(1, Math.ceil((post.content?.split(/\s+/).filter(Boolean).length ?? 0) / 200));
  const words = post.content?.split(/\s+/).filter(Boolean).length ?? 0;
  const shareText = encodeURIComponent(post.title);
  const twitterShare = `https://x.com/intent/tweet?text=${shareText}`;

  return (
    <section className="relative overflow-hidden py-14">
      <div className="pointer-events-none absolute -top-20 left-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-32 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-5xl space-y-8 px-4">
        <BlurFade delay={0.05}>
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1.5 text-sm text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ArrowLeft size={14} />
            {dict.post.back}
          </Link>
        </BlurFade>

        <Spotlight className="rounded-3xl">
          <BlurFade delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/80 backdrop-blur-sm">
              {post.cover_image ? (
                <div className="relative h-64 w-full border-b border-border/50 md:h-80">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                </div>
              ) : null}

              <div className="space-y-5 p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                    {lang === "tr" ? "Yayınlandı" : "Published"}
                  </Badge>
                  {post.is_featured ? (
                    <Badge variant="outline" className="border-amber-400/30 bg-amber-400/10 text-amber-300">
                      {lang === "tr" ? "Öne Çıkan" : "Featured"}
                    </Badge>
                  ) : null}
                </div>

                <h1 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
                  {post.title}
                </h1>

                {post.excerpt ? (
                  <p className="max-w-3xl text-base leading-relaxed text-text-muted md:text-lg">
                    {post.excerpt}
                  </p>
                ) : null}

                <div className="flex flex-wrap items-center gap-4 text-sm text-text-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {formatDate(post.published_at, lang)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={14} />
                    {readTime} {dict.post.min_read}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Eye size={14} />
                    {post.views ?? 0}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Heart size={14} />
                    {post.likes_count}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Bookmark size={14} />
                    {post.bookmarks_count}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    {words} {lang === "tr" ? "kelime" : "words"}
                  </span>
                </div>
              </div>
            </div>
          </BlurFade>
        </Spotlight>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
          <BlurFade delay={0.16}>
            <article className="rounded-2xl border border-border/60 bg-surface/70 p-6 text-base leading-8 text-text-muted whitespace-pre-wrap md:p-8">
              {post.content ?? (lang === "tr" ? "İçerik eklenmemiş." : "No content available.")}
            </article>
          </BlurFade>

          <BlurFade delay={0.2}>
            <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border/60 bg-surface/70 p-4 backdrop-blur-sm">
                <p className="mb-3 text-sm font-semibold text-foreground">
                  {lang === "tr" ? "Yazı Özeti" : "Post Summary"}
                </p>
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-border/50 bg-background/40 px-3 py-2">
                    <p className="text-[11px] text-text-subtle">
                      {lang === "tr" ? "Okuma" : "Reading"}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {readTime} {dict.post.min_read}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-background/40 px-3 py-2">
                    <p className="text-[11px] text-text-subtle">
                      {lang === "tr" ? "Görüntülenme" : "Views"}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{post.views ?? 0}</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-background/40 px-3 py-2">
                    <p className="text-[11px] text-text-subtle">
                      {lang === "tr" ? "Beğeni" : "Likes"}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{post.likes_count}</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-background/40 px-3 py-2">
                    <p className="text-[11px] text-text-subtle">
                      {lang === "tr" ? "Kaydetme" : "Bookmarks"}
                    </p>
                    <p className="text-sm font-semibold text-foreground">{post.bookmarks_count}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <PostEngagementActions
                    postId={post.id}
                    lang={lang}
                    initialLikes={post.likes_count}
                    initialBookmarks={post.bookmarks_count}
                    initialLiked={post.user_has_liked}
                    initialBookmarked={post.user_has_bookmarked}
                  />
                  <a
                    href={twitterShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2 text-sm text-text-muted transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Share2 size={14} />
                      {dict.post.share}
                    </span>
                    <ChevronRight size={14} />
                  </a>
                  <Link
                    href={`/${lang}/blog`}
                    className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2 text-sm text-text-muted transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                  >
                    <span>{lang === "tr" ? "Tüm Yazılar" : "All Posts"}</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </aside>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
