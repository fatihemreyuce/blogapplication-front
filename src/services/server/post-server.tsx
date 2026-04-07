import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import type {
  Bookmark,
  Like,
  Post,
  PostPreview,
  PostWithEngagement,
} from "@/types/post.types";

const postSelect =
  "id,title,slug,content,excerpt,cover_image,author_id,category_id,status,published_at,scheduled_at,reading_time,views,is_featured,meta_description,og_image,created_at,updated_at";

const postSelectWithSeries = `${postSelect},series_id`;

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
    series_id: row.series_id ?? null,
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
    category_id: post.category_id,
    tag_ids: [],
    series_id: post.series_id ?? null,
    category_name: null,
    likes_count: 0,
    bookmarks_count: 0,
  };
}

async function getEngagementByPostIds(postIds: string[]) {
  if (postIds.length === 0) return new Map<string, { likes: number; bookmarks: number }>();

  const supabase = await createServerClient();
  const [likesRes, bookmarksRes] = await Promise.all([
    supabase.from("likes").select("post_id").in("post_id", postIds),
    supabase.from("bookmarks").select("post_id").in("post_id", postIds),
  ]);

  const likesRows = (likesRes.data ?? []) as Pick<Like, "post_id">[];
  const bookmarkRows = (bookmarksRes.data ?? []) as Pick<Bookmark, "post_id">[];

  const likesCount = new Map<string, number>();
  for (const row of likesRows) {
    likesCount.set(row.post_id, (likesCount.get(row.post_id) ?? 0) + 1);
  }

  const bookmarksCount = new Map<string, number>();
  for (const row of bookmarkRows) {
    bookmarksCount.set(row.post_id, (bookmarksCount.get(row.post_id) ?? 0) + 1);
  }

  const merged = new Map<string, { likes: number; bookmarks: number }>();
  for (const postId of postIds) {
    merged.set(postId, {
      likes: likesCount.get(postId) ?? 0,
      bookmarks: bookmarksCount.get(postId) ?? 0,
    });
  }

  return merged;
}

async function getPostTagLinks(postIds: string[]): Promise<Map<string, string[]>> {
  if (postIds.length === 0) return new Map();
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("post_tags" as never)
    .select("post_id,tag_id")
    .in("post_id", postIds);
  if (error || !data) return new Map();
  const map = new Map<string, string[]>();
  for (const row of data as { post_id: string; tag_id: string }[]) {
    const list = map.get(row.post_id) ?? [];
    list.push(row.tag_id);
    map.set(row.post_id, list);
  }
  return map;
}

export type BlogTaxonomyItem = { id: string; name: string };

export async function getBlogTaxonomy(): Promise<{
  categories: BlogTaxonomyItem[];
  tags: BlogTaxonomyItem[];
  series: BlogTaxonomyItem[];
}> {
  const supabase = await createServerClient();

  const [catRes, tagRes, serRes] = await Promise.all([
    supabase.from("categories" as never).select("id,name,title").order("id"),
    supabase.from("tags" as never).select("id,name,title").order("id"),
    supabase.from("series" as never).select("id,name,title").order("id"),
  ]);

  const pickName = (row: { name?: string | null; title?: string | null }) =>
    row.name?.trim() || row.title?.trim() || "—";

  const categories = ((catRes.data ?? []) as { id: string; name?: string; title?: string }[]).map(
    (r) => ({ id: r.id, name: pickName(r) })
  );
  const tags = ((tagRes.data ?? []) as { id: string; name?: string; title?: string }[]).map((r) => ({
    id: r.id,
    name: pickName(r),
  }));
  const series = ((serRes.data ?? []) as { id: string; name?: string; title?: string }[]).map((r) => ({
    id: r.id,
    name: pickName(r),
  }));

  return { categories, tags, series };
}

async function enrichPreviews(posts: PostPreview[]): Promise<PostPreview[]> {
  const ids = posts.map((post) => post.id);
  const [engagement, tagMap] = await Promise.all([
    getEngagementByPostIds(ids),
    getPostTagLinks(ids),
  ]);

  return posts.map((post) => ({
    ...post,
    tag_ids: tagMap.get(post.id) ?? [],
    likes_count: engagement.get(post.id)?.likes ?? 0,
    bookmarks_count: engagement.get(post.id)?.bookmarks ?? 0,
  }));
}

export function attachCategoryNames(
  posts: PostPreview[],
  categories: BlogTaxonomyItem[]
): PostPreview[] {
  const map = new Map(categories.map((c) => [c.id, c.name]));
  return posts.map((post) => ({
    ...post,
    category_name: post.category_id ? map.get(post.category_id) ?? null : null,
  }));
}

async function fetchPublishedRows(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  limit: number | undefined,
  useSeries: boolean
) {
  const select = useSeries ? postSelectWithSeries : postSelect;
  let query = supabase
    .from("posts")
    .select(select)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const result = await query;
  if (
    useSeries &&
    result.error &&
    /series_id|column/i.test(result.error.message ?? "")
  ) {
    return fetchPublishedRows(supabase, limit, false);
  }
  return result;
}

async function fetchFallbackRows(
  supabase: Awaited<ReturnType<typeof createServerClient>>,
  limit: number | undefined,
  useSeries: boolean
) {
  const select = useSeries ? postSelectWithSeries : postSelect;
  let query = supabase
    .from("posts")
    .select(select)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false, nullsFirst: false });

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const result = await query;
  if (
    useSeries &&
    result.error &&
    /series_id|column/i.test(result.error.message ?? "")
  ) {
    return fetchFallbackRows(supabase, limit, false);
  }
  return result;
}

export async function getPublishedPosts(limit?: number): Promise<PostPreview[]> {
  const supabase = await createServerClient();

  const { data, error } = await fetchPublishedRows(supabase, limit, true);

  if (error) {
    console.error("Failed to fetch published posts:", error?.message);
    return [];
  }

  if (data && data.length > 0) {
    const previews = (data as Partial<Post>[]).map((row) => toPreview(normalizePost(row)));
    return enrichPreviews(previews);
  }

  const { data: fallbackData, error: fallbackError } = await fetchFallbackRows(
    supabase,
    limit,
    true
  );
  if (fallbackError || !fallbackData) {
    console.error("Failed to fetch fallback posts:", fallbackError?.message);
    return [];
  }

  const previews = (fallbackData as Partial<Post>[]).map((row) =>
    toPreview(normalizePost(row))
  );
  return enrichPreviews(previews);
}

export async function getPostById(id: string): Promise<PostWithEngagement | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  const post = normalizePost(data as Partial<Post>);
  const engagement = await getEngagementByPostIds([post.id]);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userHasLiked = false;
  let userHasBookmarked = false;
  if (user?.id) {
    const [likedRes, bookmarkedRes] = await Promise.all([
      supabase
        .from("likes")
        .select("post_id")
        .eq("post_id", post.id)
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("bookmarks")
        .select("post_id")
        .eq("post_id", post.id)
        .eq("user_id", user.id)
        .maybeSingle(),
    ]);
    userHasLiked = !!likedRes.data;
    userHasBookmarked = !!bookmarkedRes.data;
  }

  return {
    ...post,
    likes_count: engagement.get(post.id)?.likes ?? 0,
    bookmarks_count: engagement.get(post.id)?.bookmarks ?? 0,
    user_has_liked: userHasLiked,
    user_has_bookmarked: userHasBookmarked,
  };
}
