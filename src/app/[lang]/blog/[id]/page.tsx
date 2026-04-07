import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, ArrowLeft } from "lucide-react";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Spotlight } from "@/components/magicui/spotlight";
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

  return (
    <section className="py-14">
      <div className="mx-auto max-w-4xl space-y-8 px-4">
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
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-surface/80 p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <h1 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {formatDate(post.published_at, lang)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={14} />
                    {readTime} {dict.post.min_read}
                  </span>
                </div>
              </div>
            </div>
          </BlurFade>
        </Spotlight>

        <BlurFade delay={0.16}>
          <article className="rounded-2xl border border-border/60 bg-surface/70 p-6 text-base leading-8 text-text-muted whitespace-pre-wrap md:p-8">
            {post.content ?? (lang === "tr" ? "İçerik eklenmemiş." : "No content available.")}
          </article>
        </BlurFade>
      </div>
    </section>
  );
}
