import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, Image as ImageIcon, Link2, UserRound } from "lucide-react";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Spotlight } from "@/components/magicui/spotlight";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { getSeriesBySlug } from "@/services/server/series-server";

function formatDate(date: string | null, lang: "tr" | "en"): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/seriler/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) {
    return {
      title: lang === "tr" ? "Seri bulunamadı" : "Series not found",
    };
  }
  return {
    title: `${series.title} | ${lang === "tr" ? "Seri" : "Series"}`,
    description: series.description ?? undefined,
  };
}

export default async function SeriesDetailPage({
  params,
}: PageProps<"/[lang]/seriler/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const [dict, series] = await Promise.all([getDictionary(lang), getSeriesBySlug(slug)]);
  if (!series) notFound();

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="pointer-events-none absolute -top-20 left-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-6xl space-y-6 px-4">
        <BlurFade delay={0.04}>
          <Link
            href={`/${lang}/seriler`}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1.5 text-sm text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ArrowLeft size={14} />
            {dict.series_detail.back}
          </Link>
        </BlurFade>

        <BlurFade delay={0.08}>
          <Spotlight className="rounded-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/75 p-6 backdrop-blur-xl md:p-8">
              <GridPattern
                squares={[
                  [1, 1],
                  [4, 2],
                  [9, 1],
                ]}
                className="opacity-20 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,white,transparent)]"
              />
              <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-[84px_minmax(0,1fr)_auto] md:items-center">
                <div className="h-[84px] w-[84px] overflow-hidden rounded-2xl border border-border/60 bg-background/50">
                  {series.cover_image ? (
                    <img src={series.cover_image} alt={series.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-text-subtle">
                      <ImageIcon size={20} />
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-primary">{dict.series_home.title}</p>
                  <h1 className="text-3xl font-black tracking-tight md:text-4xl">{series.title}</h1>
                  <p className="text-sm text-text-subtle">/{series.slug}</p>
                </div>
                <ShimmerButton>
                  <Link href={`/${lang}/blog?seriesId=${encodeURIComponent(series.id)}`}>
                    {dict.series_detail.view_posts}
                  </Link>
                </ShimmerButton>
              </div>
            </div>
          </Spotlight>
        </BlurFade>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <BlurFade delay={0.12}>
            <div className="rounded-2xl border border-border/60 bg-surface/70 p-5 backdrop-blur-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-subtle">
                {dict.series_detail.description}
              </p>
              <p className="text-sm leading-relaxed text-text-muted">
                {series.description ?? "—"}
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.16}>
            <div className="space-y-3 rounded-2xl border border-border/60 bg-surface/70 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-subtle">
                {dict.series_detail.base_info}
              </p>
              <div className="space-y-2">
                <div className="rounded-xl border border-border/50 bg-background/40 px-3 py-2">
                  <p className="text-[11px] text-text-subtle">{dict.series_detail.title}</p>
                  <p className="truncate text-sm font-semibold text-foreground">{series.title}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-background/40 px-3 py-2">
                  <p className="text-[11px] text-text-subtle">{dict.series_detail.slug}</p>
                  <p className="truncate text-sm font-semibold text-foreground">/{series.slug}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-background/40 px-3 py-2">
                  <p className="inline-flex items-center gap-1 text-[11px] text-text-subtle">
                    <UserRound size={11} />
                    {dict.series_detail.author_id}
                  </p>
                  <p className="truncate text-sm font-semibold text-foreground">{series.author_id ?? "—"}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-background/40 px-3 py-2">
                  <p className="inline-flex items-center gap-1 text-[11px] text-text-subtle">
                    <CalendarDays size={11} />
                    {dict.series_detail.created_at}
                  </p>
                  <p className="text-sm font-semibold text-foreground">{formatDate(series.created_at, lang)}</p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.2}>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface/70">
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-subtle">
                {dict.series_detail.cover_image}
              </p>
              {series.cover_image ? (
                <a
                  href={series.cover_image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <Link2 size={12} />
                  {dict.series_detail.open_cover}
                </a>
              ) : null}
            </div>
            {series.cover_image ? (
              <img src={series.cover_image} alt={series.title} className="h-56 w-full object-cover md:h-72" />
            ) : (
              <div className="flex h-56 items-center justify-center text-sm text-text-subtle md:h-72">
                {dict.series_detail.no_cover}
              </div>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
