import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import type { Series } from "@/types/series.types";

const seriesSelectFull =
  "id,title,slug,description,cover_image,author_id,created_at";

function normalizeSeriesRow(row: Partial<Series>): Series {
  return {
    id: row.id ?? "",
    title: row.title?.trim() ?? "",
    slug: row.slug?.trim() ?? "",
    description: row.description ?? null,
    cover_image: row.cover_image ?? null,
    author_id: row.author_id ?? null,
    created_at: row.created_at ?? null,
  };
}

export async function getSeriesList(): Promise<Series[]> {
  const supabase = await createServerClient();

  const full = await supabase
    .from("series" as never)
    .select(seriesSelectFull)
    .order("created_at", { ascending: false, nullsFirst: false });

  if (!full.error && full.data) {
    return (full.data as Partial<Series>[]).map(normalizeSeriesRow);
  }

  const fallback = await supabase
    .from("series" as never)
    .select("id,title,slug")
    .order("id");

  if (fallback.error || !fallback.data) {
    return [];
  }

  return (fallback.data as Partial<Series>[]).map((r) =>
    normalizeSeriesRow({
      ...r,
      description: null,
      cover_image: null,
      author_id: null,
      created_at: null,
    })
  );
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("series" as never)
    .select(seriesSelectFull)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return normalizeSeriesRow(data as Partial<Series>);
}
