import "server-only";

import { createServerClient } from "@/lib/supabase/server";
import type { Comment, CommentWithAuthor } from "@/types/comment.types";

const PUBLIC_STATUSES = ["approved", "published"] as const;

function mapComment(
  row: Comment,
  profileMap: Map<
    string,
    { username: string | null; full_name: string | null; avatar_url: string | null }
  >
): CommentWithAuthor {
  if (!row.author_id) {
    return { ...row, author_name: "Guest", author_avatar_url: null };
  }
  const p = profileMap.get(row.author_id);
  const name =
    p?.full_name?.trim() ||
    p?.username?.trim() ||
    `${row.author_id.slice(0, 8)}…`;
  return {
    ...row,
    author_name: name,
    author_avatar_url: p?.avatar_url ?? null,
  };
}

export async function getPublicCommentsForPost(
  postId: string
): Promise<CommentWithAuthor[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("comments" as never)
    .select(
      "id,post_id,author_id,content,status,parent_id,created_at,updated_at"
    )
    .eq("post_id", postId)
    .in("status", [...PUBLIC_STATUSES])
    .order("created_at", { ascending: true });

  if (error || !data) {
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
