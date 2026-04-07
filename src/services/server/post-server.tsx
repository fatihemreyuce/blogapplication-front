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

async function enrichPreviews(posts: PostPreview[]): Promise<PostPreview[]> {
  const engagement = await getEngagementByPostIds(posts.map((post) => post.id));
  return posts.map((post) => ({
    ...post,
    likes_count: engagement.get(post.id)?.likes ?? 0,
    bookmarks_count: engagement.get(post.id)?.bookmarks ?? 0,
  }));
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

  if (error) {
    console.error("Failed to fetch published posts:", error?.message);
    return [];
  }

  if (data && data.length > 0) {
    const previews = (data as Partial<Post>[]).map((row) => toPreview(normalizePost(row)));
    return enrichPreviews(previews);
  }

  // Fallback: bazı paneller farklı status formatı kullanabildiği için,
  // published sonucu boşsa en güncel yazıları status filtresiz göster.
  let fallbackQuery = supabase
    .from("posts")
    .select(postSelect)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false, nullsFirst: false });

  if (typeof limit === "number") {
    fallbackQuery = fallbackQuery.limit(limit);
  }

  const { data: fallbackData, error: fallbackError } = await fallbackQuery;
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
