"use client";

import { getSupabaseClient } from "@/lib/supabase/client";
import type {
  Comment,
  CommentStatus,
  CommentWithAuthor,
  CreateCommentInput,
} from "@/types/comment.types";

const PUBLIC_STATUSES = ["approved", "published"] as const;

function mapComment(
  row: Comment,
  profileMap: Map<
    string,
    { username: string | null; full_name: string | null; avatar_url: string | null }
  >
): CommentWithAuthor {
  if (!row.author_id) {
    return {
      ...row,
      author_name: "Guest",
      author_avatar_url: null,
    };
  }
  const p = profileMap.get(row.author_id);
  const name =
    p?.full_name?.trim() ||
    p?.username?.trim() ||
    row.author_id.slice(0, 8) + "…";
  return {
    ...row,
    author_name: name,
    author_avatar_url: p?.avatar_url ?? null,
  };
}

export async function fetchCommentsForPost(
  postId: string
): Promise<CommentWithAuthor[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("comments" as never)
    .select(
      "id,post_id,author_id,content,status,parent_id,created_at,updated_at"
    )
    .eq("post_id", postId)
    .in("status", [...PUBLIC_STATUSES])
    .order("created_at", { ascending: true });

  if (error || !data) {
    console.error("fetchCommentsForPost:", error?.message);
    return [];
  }

  const rows = data as unknown as Comment[];
  const authorIds = [...new Set(rows.map((r) => r.author_id).filter(Boolean))] as string[];

  const profileMap = new Map<
    string,
    { username: string | null; full_name: string | null; avatar_url: string | null }
  >();

  if (authorIds.length > 0) {
    const { data: profs } = await supabase
      .from("profiles" as never)
      .select("id,username,full_name,avatar_url")
      .in("id", authorIds);

    for (const p of (profs ?? []) as {
      id: string;
      username: string | null;
      full_name: string | null;
      avatar_url: string | null;
    }[]) {
      profileMap.set(p.id, {
        username: p.username,
        full_name: p.full_name,
        avatar_url: p.avatar_url,
      });
    }
  }

  return rows.map((row) => mapComment(row, profileMap));
}

export type SubmitCommentResult = { ok: true } | { ok: false; message: string };

export async function submitComment(
  input: CreateCommentInput
): Promise<SubmitCommentResult> {
  const supabase = getSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: "Sign in to comment." };
  }

  /** Prod’da moderasyon için `pending` yapıp RLS ile onaylayabilirsin. */
  const status: CommentStatus = input.status ?? "approved";

  const { error } = await supabase.from("comments" as never).insert([
    {
      post_id: input.post_id,
      author_id: user.id,
      content: input.content.trim(),
      status,
      parent_id: input.parent_id ?? null,
    } as never,
  ]);

  if (error) {
    return { ok: false, message: error.message };
  }
  return { ok: true };
}
