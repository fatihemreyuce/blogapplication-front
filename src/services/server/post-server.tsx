import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import type { Post, PostPreview } from "@/types/post.types";

const postSelect =
  "id,title,slug,content,excerpt,cover_image,author_id,category_id,status,published_at,scheduled_at,reading_time,views,is_featured,meta_description,og_image,created_at,updated_at";

function estimateReadTime(content: string | null): number {
  if (!content) return 1;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function normalizePost(row: Partial<Post>): Post {
  return {
    id: row.id ?? "",
    title: row.title ?? "",
    slug: row.slug ?? "",
    content: row.content ?? null,
    excerpt: row.excerpt ?? null,
    cover_image: row.cover_image ?? null,
    author_id: row.author_id ?? null,
    category_id: row.category_id ?? null,
    status: row.status ?? "draft",
    published_at: row.published_at ?? null,
    scheduled_at: row.scheduled_at ?? null,
    reading_time: row.reading_time ?? null,
    views: row.views ?? null,
    is_featured: row.is_featured ?? null,
    meta_description: row.meta_description ?? null,
    og_image: row.og_image ?? null,
    created_at: row.created_at ?? null,
    updated_at: row.updated_at ?? null,
  };
}

function toPreview(post: Post): PostPreview {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    cover_image: post.cover_image,
    published_at: post.published_at,
    reading_time: post.reading_time ?? estimateReadTime(post.content),
  };
}

export async function getPublishedPosts(limit?: number): Promise<PostPreview[]> {
  const supabase = await createServerClient();

  let query = supabase
    .from("posts")
    .select(postSelect)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Failed to fetch published posts:", error?.message);
    return [];
  }

  return (data as Partial<Post>[]).map((row) => toPreview(normalizePost(row)));
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return normalizePost(data as Partial<Post>);
}
