"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Spotlight } from "@/components/magicui/spotlight";
import { Button } from "@/components/ui/button";
import { PostsGrid3D } from "@/components/blog/posts-grid-3d";
import type { Locale } from "@/app/[lang]/dictionaries";
import type { PostPreview } from "@/types/post.types";
import type { BlogTaxonomyItem } from "@/services/server/post-server";

type DictBlog = {
  search_placeholder: string;
  results_found: string;
  no_posts: string;
  no_match: string;
  filter_all: string;
  filter_category: string;
  filter_tag: string;
  filter_series: string;
  clear_filters: string;
  showing: string;
  title: string;
  subtitle: string;
  filters: string;
};

type Props = {
  posts: PostPreview[];
  taxonomy: {
    categories: BlogTaxonomyItem[];
    tags: BlogTaxonomyItem[];
    series: BlogTaxonomyItem[];
  };
  lang: Locale;
  dict: DictBlog;
  /** URL'den gelen kategori (ör. kategoriler sayfasından) */
  initialCategoryId?: string | null;
  /** URL'den gelen etiket */
  initialTagId?: string | null;
  /** URL'den gelen seri */
  initialSeriesId?: string | null;
};

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
        active
          ? "border-primary/50 bg-primary/15 text-primary"
          : "border-border/70 bg-surface/80 text-text-muted hover:border-primary/30 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function BlogFeed({
  posts,
  taxonomy,
  lang,
  dict,
  initialCategoryId,
  initialTagId,
  initialSeriesId,
}: Props) {
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(initialCategoryId ?? null);
  const [tagId, setTagId] = useState<string | null>(initialTagId ?? null);
  const [seriesId, setSeriesId] = useState<string | null>(initialSeriesId ?? null);
  const [isFiltering, setIsFiltering] = useState(false);

  const hasSeriesOnPosts = useMemo(
    () => posts.some((p) => p.series_id != null && p.series_id !== ""),
    [posts]
  );
  const showSeriesFilter = hasSeriesOnPosts && taxonomy.series.length > 0;

  useEffect(() => {
    setCategoryId(initialCategoryId ?? null);
  }, [initialCategoryId]);
  useEffect(() => {
    setTagId(initialTagId ?? null);
  }, [initialTagId]);
  useEffect(() => {
    setSeriesId(initialSeriesId ?? null);
  }, [initialSeriesId]);

  // Search input delay (debounce)
  useEffect(() => {
    const t = window.setTimeout(() => {
      setQuery(queryInput);
    }, 350);
    return () => window.clearTimeout(t);
  }, [queryInput]);

  // Short loading feedback for filter/search transitions
  useEffect(() => {
    setIsFiltering(true);
    const t = window.setTimeout(() => setIsFiltering(false), 220);
    return () => window.clearTimeout(t);
  }, [query, categoryId, tagId, seriesId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (categoryId && p.category_id !== categoryId) return false;
      if (tagId && !p.tag_ids.includes(tagId)) return false;
      if (seriesId && p.series_id !== seriesId) return false;
      if (q) {
        const hay = `${p.title} ${p.excerpt ?? ""} ${p.slug}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [posts, query, categoryId, tagId, seriesId]);

  const hasActiveFilters =
    query.trim().length > 0 || categoryId != null || tagId != null || seriesId != null;

  function clearAll() {
    setQueryInput("");
    setQuery("");
    setCategoryId(null);
    setTagId(null);
    setSeriesId(null);
  }

  const emptyLabel =
    posts.length === 0 ? dict.no_posts : hasActiveFilters ? dict.no_match : dict.no_posts;

  return (
    <section className="relative overflow-hidden py-14">
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-violet-500/12 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl space-y-8 px-4">
        <BlurFade delay={0.04}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Blog</p>
              <h1 className="text-4xl font-black tracking-tight">{dict.title}</h1>
              <p className="text-text-muted">{dict.subtitle}</p>
            </div>
            <p className="text-sm text-text-subtle">
              <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
              {dict.showing}
              {posts.length !== filtered.length ? (
                <span className="text-text-subtle">
                  {" "}
                  / {posts.length}
                </span>
              ) : null}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.08}>
          <Spotlight className="rounded-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/75 p-5 backdrop-blur-xl sm:p-6">
              <GridPattern
                squares={[
                  [2, 1],
                  [6, 2],
                  [10, 1],
                ]}
                className="opacity-30 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,white,transparent)]"
              />

              <div className="relative z-10 space-y-5">
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-subtle"
                    size={18}
                  />
                  <input
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder={dict.search_placeholder}
                    className="h-12 w-full rounded-2xl border border-border/70 bg-background/70 pl-11 pr-10 text-sm outline-none transition placeholder:text-text-subtle focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  />
                  {queryInput ? (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setQueryInput("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-text-subtle hover:text-foreground"
                    >
                      <X size={16} />
                    </button>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-border/50 pt-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-text-subtle">
                    <SlidersHorizontal size={13} />
                    {dict.filters}
                  </span>
                  <Chip
                    active={
                      !categoryId &&
                      !tagId &&
                      !seriesId &&
                      query.trim().length === 0
                    }
                    onClick={() => clearAll()}
                  >
                    {dict.filter_all}
                  </Chip>
                </div>

                {taxonomy.categories.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                      {dict.filter_category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {taxonomy.categories.map((c) => (
                        <Chip
                          key={c.id}
                          active={categoryId === c.id}
                          onClick={() =>
                            setCategoryId((prev) => (prev === c.id ? null : c.id))
                          }
                        >
                          {c.name}
                        </Chip>
                      ))}
                    </div>
                  </div>
                ) : null}

                {taxonomy.tags.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                      {dict.filter_tag}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {taxonomy.tags.map((t) => (
                        <Chip
                          key={t.id}
                          active={tagId === t.id}
                          onClick={() => setTagId((prev) => (prev === t.id ? null : t.id))}
                        >
                          #{t.name}
                        </Chip>
                      ))}
                    </div>
                  </div>
                ) : null}

                {showSeriesFilter ? (
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                      {dict.filter_series}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {taxonomy.series.map((s) => (
                        <Chip
                          key={s.id}
                          active={seriesId === s.id}
                          onClick={() =>
                            setSeriesId((prev) => (prev === s.id ? null : s.id))
                          }
                        >
                          {s.name}
                        </Chip>
                      ))}
                    </div>
                  </div>
                ) : null}

                {hasActiveFilters ? (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end border-t border-border/40 pt-3"
                  >
                    <Button variant="ghost" size="sm" onClick={clearAll}>
                      {dict.clear_filters}
                    </Button>
                  </motion.div>
                ) : null}
              </div>
            </div>
          </Spotlight>
        </BlurFade>

        {isFiltering ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-[430px] animate-pulse rounded-2xl border border-border/60 bg-surface/65"
              />
            ))}
          </div>
        ) : (
          <PostsGrid3D posts={filtered} lang={lang} emptyLabel={emptyLabel} />
        )}
      </div>
    </section>
  );
}
