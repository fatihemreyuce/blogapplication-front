"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchCommentsForPost,
  submitComment,
} from "@/services/client/comment-service";
import type { CommentTreeNode, CommentWithAuthor } from "@/types/comment.types";

function buildTree(flat: CommentWithAuthor[]): CommentTreeNode[] {
  const map = new Map<string, CommentTreeNode>();
  for (const c of flat) {
    map.set(c.id, { ...c, replies: [] });
  }
  const roots: CommentTreeNode[] = [];
  for (const c of flat) {
    const node = map.get(c.id)!;
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id)!.replies.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

type Options = {
  initialComments?: CommentWithAuthor[];
};

export function useComments(postId: string, options?: Options) {
  const serverInitial = options?.initialComments;
  const [list, setList] = useState<CommentWithAuthor[]>(serverInitial ?? []);
  const [loading, setLoading] = useState(serverInitial === undefined);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await fetchCommentsForPost(postId);
      setList(rows);
    } catch {
      setError("Failed to load comments.");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (serverInitial !== undefined) {
      setList(serverInitial);
      setLoading(false);
      return;
    }
    void refresh();
  }, [postId, serverInitial, refresh]);

  const tree = useMemo(() => buildTree(list), [list]);

  const addComment = useCallback(
    async (content: string, parentId?: string | null) => {
      setSubmitting(true);
      setError(null);
      const result = await submitComment({
        post_id: postId,
        content,
        parent_id: parentId ?? null,
      });
      setSubmitting(false);
      if (!result.ok) {
        setError(result.message);
        return false;
      }
      await refresh();
      return true;
    },
    [postId, refresh]
  );

  return {
    comments: list,
    tree,
    loading,
    submitting,
    error,
    setError,
    refresh,
    addComment,
    count: list.length,
  };
}
