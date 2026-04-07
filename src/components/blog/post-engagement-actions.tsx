"use client";

import { useState } from "react";
import { Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabaseClient } from "@/lib/supabase/client";

type Props = {
  postId: string;
  lang: "tr" | "en";
  initialLikes: number;
  initialBookmarks: number;
  initialLiked: boolean;
  initialBookmarked: boolean;
};

export function PostEngagementActions({
  postId,
  lang,
  initialLikes,
  initialBookmarks,
  initialLiked,
  initialBookmarked,
}: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [liked, setLiked] = useState(initialLiked);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function requireUser() {
    const supabase = getSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setMessage(lang === "tr" ? "Beğenmek/kaydetmek için giriş yap." : "Sign in to like/bookmark.");
      return null;
    }
    setMessage(null);
    return user;
  }

  async function onToggleLike() {
    if (loadingLike) return;
    setLoadingLike(true);
    const user = await requireUser();
    if (!user) {
      setLoadingLike(false);
      return;
    }

    const supabase = getSupabaseClient();
    if (liked) {
      const { error } = await supabase
        .from("likes" as never)
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);
      if (!error) {
        setLiked(false);
        setLikes((value) => Math.max(0, value - 1));
      } else {
        setMessage(error.message);
      }
    } else {
      const { error } = await supabase
        .from("likes" as never)
        .insert([{ post_id: postId, user_id: user.id }] as never);
      if (!error) {
        setLiked(true);
        setLikes((value) => value + 1);
      } else {
        setMessage(error.message);
      }
    }
    setLoadingLike(false);
  }

  async function onToggleBookmark() {
    if (loadingBookmark) return;
    setLoadingBookmark(true);
    const user = await requireUser();
    if (!user) {
      setLoadingBookmark(false);
      return;
    }

    const supabase = getSupabaseClient();
    if (bookmarked) {
      const { error } = await supabase
        .from("bookmarks" as never)
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);
      if (!error) {
        setBookmarked(false);
        setBookmarks((value) => Math.max(0, value - 1));
      } else {
        setMessage(error.message);
      }
    } else {
      const { error } = await supabase
        .from("bookmarks" as never)
        .insert([{ post_id: postId, user_id: user.id }] as never);
      if (!error) {
        setBookmarked(true);
        setBookmarks((value) => value + 1);
      } else {
        setMessage(error.message);
      }
    }
    setLoadingBookmark(false);
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={liked ? "default" : "outline"}
          onClick={onToggleLike}
          disabled={loadingLike}
          className="h-9 justify-between rounded-xl"
        >
          <span className="inline-flex items-center gap-1.5">
            <Heart size={14} className={liked ? "fill-current" : ""} />
            {lang === "tr" ? "Beğen" : "Like"}
          </span>
          <span>{likes}</span>
        </Button>

        <Button
          variant={bookmarked ? "default" : "outline"}
          onClick={onToggleBookmark}
          disabled={loadingBookmark}
          className="h-9 justify-between rounded-xl"
        >
          <span className="inline-flex items-center gap-1.5">
            <Bookmark size={14} className={bookmarked ? "fill-current" : ""} />
            {lang === "tr" ? "Kaydet" : "Save"}
          </span>
          <span>{bookmarks}</span>
        </Button>
      </div>

      {message ? <p className="text-xs text-amber-300">{message}</p> : null}
    </div>
  );
}
