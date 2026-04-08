import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import type { Category } from "@/types/category.types";

const categorySelectFull =
  "id,name,slug,description,cover_image,created_at";

function normalizeRow(row: Partial<Category>): Category {
  return {
    id: row.id ?? "",
    name: row.name?.trim() ?? "",
    slug: row.slug?.trim() ?? "",
    description: row.description ?? null,
    cover_image: row.cover_image ?? null,
    created_at: row.created_at ?? null,
  };
}

/** Tüm kategoriler — isim sırası */
export async function getCategories(): Promise<Category[]> {
  const supabase = await createServerClient();

  const full = await supabase
    .from("categories" as never)
    .select(categorySelectFull)
    .order("name", { ascending: true });

  if (!full.error && full.data) {
    return (full.data as Partial<Category>[]).map(normalizeRow);
  }

  const minimal = await supabase
    .from("categories" as never)
    .select("id,name,slug")
    .order("name", { ascending: true });

  if (minimal.error || !minimal.data) {
    return [];
  }

  return (minimal.data as Partial<Category>[]).map((r) =>
    normalizeRow({
      ...r,
      description: null,
      cover_image: null,
      created_at: null,
    })
  );
}

/** Slug ile tek kategori (ör. `/kategoriler/[slug]` yönlendirmesi) */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("categories" as never)
    .select(categorySelectFull)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    const fallback = await supabase
      .from("categories" as never)
      .select("id,name,slug")
      .eq("slug", slug)
      .maybeSingle();
    if (fallback.error || !fallback.data) return null;
    return normalizeRow({
      ...(fallback.data as Partial<Category>),
      description: null,
      cover_image: null,
      created_at: null,
    });
  }

  return normalizeRow(data as Partial<Category>);
}
