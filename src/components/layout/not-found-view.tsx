"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, RefreshCw, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Spotlight } from "@/components/magicui/spotlight";

type Props = {
  lang?: "tr" | "en";
};

export function NotFoundView({ lang }: Props) {
  const pathname = usePathname();
  const locale: "tr" | "en" =
    lang ?? (pathname?.startsWith("/en") ? "en" : "tr");
  const isEn = locale === "en";
  const title = isEn
    ? "Looks like this page took a wrong turn"
    : "Bu sayfa yanlış bir yola sapmış gibi görünüyor";
  const desc = isEn
    ? "The URL may be outdated, moved, or typed incorrectly."
    : "URL güncel olmayabilir, taşınmış olabilir veya hatalı yazılmış olabilir.";

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute -top-20 left-0 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />

      <BlurFade delay={0.04}>
        <Spotlight className="rounded-3xl">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-surface/75 p-8 text-center backdrop-blur-xl md:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-primary/10 to-transparent" />
            <GridPattern
              squares={[
                [2, 1],
                [6, 2],
                [10, 1],
              ]}
              className="opacity-30 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,white,transparent)]"
            />

            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/90">
                {isEn ? "Error Page" : "Hata Sayfası"}
              </p>
              <p className="mt-1 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-7xl">
                404
              </p>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-foreground md:text-4xl">
                {title}
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm text-text-muted md:text-base">{desc}</p>
              <div className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles size={12} />
                {isEn ? "Let’s get you back on track" : "Hemen doğru rotaya dönelim"}
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                <Link
                  href={`/${locale}`}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
                >
                  <Home size={14} />
                  {isEn ? "Go Home" : "Ana Sayfa"}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <Compass size={14} />
                  {isEn ? "Browse Blog" : "Bloga Dön"}
                </Link>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/70 bg-background/50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <RefreshCw size={14} />
                  {isEn ? "Retry" : "Yenile"}
                </button>
              </div>
            </div>
          </div>
        </Spotlight>
      </BlurFade>
    </section>
  );
}
