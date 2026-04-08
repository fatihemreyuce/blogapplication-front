"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CornerDownRight, MessageCircle, Send } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Spotlight } from "@/components/magicui/spotlight";
import { Button } from "@/components/ui/button";
import { useComments } from "@/hooks/use-comments";
import { useProfile } from "@/hooks/use-profile";
import type { Locale } from "@/app/[lang]/dictionaries";
import type { CommentTreeNode } from "@/types/comment.types";
import type { CommentWithAuthor } from "@/types/comment.types";

type Dict = {
  comments_title: string;
  comments_sub: string;
  comments_placeholder: string;
  comments_submit: string;
  comments_reply: string;
  comments_cancel: string;
  comments_login: string;
  comments_empty: string;
  comments_loading: string;
};

type Props = {
  postId: string;
  lang: Locale;
  initialComments: CommentWithAuthor[];
  dict: Dict;
};

function formatCommentDate(iso: string | null, lang: Locale): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function CommentCard({
  node,
  lang,
  dict,
  depth,
  onReply,
  replyOpenId,
}: {
  node: CommentTreeNode;
  lang: Locale;
  dict: Dict;
  depth: number;
  onReply: (id: string | null) => void;
  replyOpenId: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-40, 40], [3, -3]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(mx, [-40, 40], [-3, 3]), { stiffness: 260, damping: 28 });

  return (
    <motion.div
      style={{ marginLeft: depth > 0 ? Math.min(depth * 6, 18) : 0 }}
      className="relative overflow-hidden"
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 600 }}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          mx.set(e.clientX - (r.left + r.width / 2));
          my.set(e.clientY - (r.top + r.height / 2));
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="rounded-2xl border border-border/60 bg-surface/75 p-3 backdrop-blur-sm transition-shadow hover:border-primary/25 hover:shadow-lg hover:shadow-violet-500/5 md:p-4"
      >
        <div className="flex gap-3">
          <div className="relative shrink-0">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-violet-500/40 to-blue-500/40 opacity-70 blur-sm" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-600 text-sm font-bold text-white md:h-10 md:w-10">
              {(node.author_name ?? "?").charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="break-words font-semibold text-foreground">{node.author_name}</span>
              <span className="text-[11px] text-text-subtle">
                {formatCommentDate(node.created_at, lang)}
              </span>
            </div>
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-text-muted">
              {node.content}
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => onReply(replyOpenId === node.id ? null : node.id)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <CornerDownRight size={12} />
                {dict.comments_reply}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {node.replies.length > 0 ? (
        <div className="mt-3 space-y-3 border-l border-border/40 pl-2 md:pl-3">
          {node.replies.map((child) => (
            <CommentCard
              key={child.id}
              node={child}
              lang={lang}
              dict={dict}
              depth={depth + 1}
              onReply={onReply}
              replyOpenId={replyOpenId}
            />
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}

export function PostComments({ postId, lang, initialComments, dict }: Props) {
  const { isAuthenticated } = useProfile();
  const { tree, loading, submitting, error, setError, addComment, count } = useComments(
    postId,
    { initialComments }
  );
  const [body, setBody] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = body.trim();
    if (text.length < 2) return;
    setError(null);
    const ok = await addComment(text, replyToId);
    if (ok) {
      setBody("");
      setReplyToId(null);
    }
  }

  return (
    <section className="relative pb-20">
      <BlurFade delay={0.05}>
        <Spotlight className="rounded-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/70 backdrop-blur-xl">
            <GridPattern
              squares={[
                [1, 2],
                [5, 1],
                [9, 3],
              ]}
              className="opacity-25 [mask-image:radial-gradient(ellipse_90%_80%_at_50%_-20%,white,transparent)]"
            />
            <div className="relative z-10 space-y-6 p-6 md:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-primary">
                    <MessageCircle size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {dict.comments_title}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-foreground md:text-3xl">
                    {dict.comments_sub}
                  </h2>
                  <p className="text-sm text-text-subtle">
                    {count}{" "}
                    {lang === "tr" ? "yorum" : count === 1 ? "comment" : "comments"}
                  </p>
                </div>
              </div>

              {isAuthenticated ? (
                <form onSubmit={onSubmit} className="space-y-3">
                  {replyToId ? (
                    <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-primary">
                      <span>
                        {lang === "tr" ? "Yanıt veriliyor" : "Replying to thread"}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        onClick={() => setReplyToId(null)}
                      >
                        {dict.comments_cancel}
                      </Button>
                    </div>
                  ) : null}
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder={dict.comments_placeholder}
                    rows={4}
                    className="w-full resize-y rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition placeholder:text-text-subtle focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  />
                  {error ? (
                    <p className="text-sm text-rose-400">
                      {error === "Sign in to comment."
                        ? lang === "tr"
                          ? "Yorum için giriş yapmalısın."
                          : error
                        : error}
                    </p>
                  ) : null}
                  <ShimmerButton type="submit" disabled={submitting || body.trim().length < 2}>
                    <span className="inline-flex items-center gap-2">
                      <Send size={14} />
                      {submitting ? "…" : dict.comments_submit}
                    </span>
                  </ShimmerButton>
                </form>
              ) : (
                <div className="rounded-2xl border border-border/60 bg-background/40 px-4 py-5 text-center text-sm text-text-muted">
                  <p className="mb-3">{dict.comments_login}</p>
                  <Link
                    href={`/${lang}/login`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {lang === "tr" ? "Giriş yap" : "Sign in"}
                  </Link>
                </div>
              )}

              <div className="border-t border-border/50 pt-6">
                {loading ? (
                  <p className="text-center text-sm text-text-subtle">{dict.comments_loading}</p>
                ) : tree.length === 0 ? (
                  <p className="text-center text-sm text-text-muted">{dict.comments_empty}</p>
                ) : (
                  <div className="space-y-4">
                    {tree.map((node, i) => (
                      <BlurFade key={node.id} delay={0.04 + i * 0.05} inView>
                        <CommentCard
                          node={node}
                          lang={lang}
                          dict={dict}
                          depth={0}
                          onReply={setReplyToId}
                          replyOpenId={replyToId}
                        />
                      </BlurFade>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Spotlight>
      </BlurFade>
    </section>
  );
}
