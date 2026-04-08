"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Spotlight } from "@/components/magicui/spotlight";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/app/[lang]/dictionaries";
import type { Category } from "@/types/category.types";

type Dict = {
  title: string;
  subtitle: string;
  empty: string;
  view_posts: string;
};

type Props = {
  categories: Category[];
  lang: Locale;
  dict: Dict;
};

function CategoryCard({ category, lang, dict, index }: { category: Category; lang: Locale; dict: Dict; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-50, 50], [4, -4]), { stiffness: 280, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-50, 50], [-4, 4]), { stiffness: 280, damping: 30 });

  const href = `/${lang}/blog?categoryId=${encodeURIComponent(category.id)}`;

  return (
    <BlurFade delay={0.06 + index * 0.05} inView>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
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
        className="h-full"
      >
        <Link
          ref={ref}
          href={href}
          className="group relative flex h-full min-h-[220px] cursor-pointer flex-col overflow-hidden rounded-3xl border border-border/60 bg-surface/70 shadow-sm backdrop-blur-xl transition-shadow hover:border-primary/25 hover:shadow-xl hover:shadow-violet-500/10"
        >
          {category.cover_image ? (
            <div className="relative h-28 w-full shrink-0 overflow-hidden">
              <img
                src={category.cover_image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            </div>
          ) : (
            <div className="relative h-28 w-full shrink-0 overflow-hidden bg-gradient-to-br from-violet-600/30 via-blue-600/20 to-emerald-500/10">
              <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.5),transparent_50%)]" />
              <FolderOpen className="absolute bottom-3 left-4 h-8 w-8 text-primary/80" />
            </div>
          )}

          <div className="flex flex-1 flex-col gap-2 p-5 pt-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {category.name}
              </h3>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/50 text-text-muted transition-all group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary">
                <ArrowUpRight size={16} />
              </span>
            </div>
            {category.description ? (
              <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">{category.description}</p>
            ) : (
              <p className="text-sm text-text-subtle">/{category.slug}</p>
            )}
            <div className="mt-auto flex items-center justify-between pt-3">
              <Badge variant="outline" className="border-primary/25 bg-primary/5 text-xs font-medium text-primary">
                {dict.view_posts}
              </Badge>
            </div>
          </div>
        </Link>
      </motion.div>
    </BlurFade>
  );
}

export function CategoriesShowcase({ categories, lang, dict }: Props) {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4">
        <BlurFade delay={0.04}>
          <Spotlight className="rounded-[2rem]">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-surface/40 p-8 backdrop-blur-xl md:p-10">
              <GridPattern
                squares={[
                  [2, 1],
                  [5, 3],
                  [8, 0],
                ]}
                className="opacity-[0.15] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,white,transparent)]"
              />
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{dict.title}</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground md:text-4xl">{dict.subtitle}</h1>
              </div>
            </div>
          </Spotlight>
        </BlurFade>

        {categories.length === 0 ? (
          <BlurFade delay={0.1} inView>
            <p className="mt-12 text-center text-sm text-text-muted">{dict.empty}</p>
          </BlurFade>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <li key={c.id} className="list-none">
                <CategoryCard category={c} lang={lang} dict={dict} index={i} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
