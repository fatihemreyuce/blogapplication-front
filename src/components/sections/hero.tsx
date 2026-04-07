import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Spotlight } from "@/components/magicui/spotlight";
import { ProfileCard } from "./profile-card";
import { TypingRoles } from "./typing-roles";
import type { Locale } from "@/app/[lang]/dictionaries";

const content = {
  tr: {
    greeting: "Merhaba, ben",
    name: "Fatih",
    roles: ["Geliştirici", "Tasarımcı", "Yazar", "Üretici"],
    bio: "Full-stack geliştirici ve tasarımcı. Modern web teknolojileri, kullanıcı deneyimi ve minimalist tasarım üzerine yazıyorum.",
    cta_primary: "Yazıları Oku",
    cta_secondary: "Hakkımda",
    stats: [
      { value: "48", label: "Yazı" },
      { value: "6", label: "Kategori" },
      { value: "1K+", label: "Okuyucu" },
    ],
    badge: "Açık müsait",
  },
  en: {
    greeting: "Hi, I'm",
    name: "Fatih",
    roles: ["Developer", "Designer", "Writer", "Maker"],
    bio: "Full-stack developer and designer. I write about modern web technologies, user experience, and minimalist design.",
    cta_primary: "Read Posts",
    cta_secondary: "About Me",
    stats: [
      { value: "48", label: "Posts" },
      { value: "6", label: "Categories" },
      { value: "1K+", label: "Readers" },
    ],
    badge: "Open to work",
  },
};

type Props = { lang: Locale };

export function Hero({ lang }: Props) {
  const t = content[lang];

  return (
    <Spotlight className="relative min-h-[calc(100vh-56px)] w-full overflow-hidden">
      {/* Grid arka plan */}
      <GridPattern
        squares={[
          [3, 2], [5, 4], [8, 2], [11, 5],
          [14, 3], [2, 7], [7, 8], [13, 7],
        ]}
        className="opacity-60"
      />

      {/* Gradient orb'lar */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-16 right-0 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-500/6 blur-3xl" />

      {/* İçerik */}
      <div className="relative mx-auto flex min-h-[calc(100vh-56px)] max-w-5xl flex-col items-center justify-center gap-16 px-4 py-20 md:flex-row md:gap-8">

        {/* Sol: Text */}
        <div className="flex flex-1 flex-col gap-5 text-center md:text-left">

          {/* Küçük badge */}
          <BlurFade delay={0.05}>
            <div className="inline-flex items-center self-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 md:self-start">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {t.badge}
            </div>
          </BlurFade>

          {/* Başlık */}
          <BlurFade delay={0.1}>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-text-muted mb-1 block text-3xl font-medium sm:text-4xl lg:text-5xl">
                {t.greeting}
              </span>
              <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                {t.name}
              </span>
            </h1>
          </BlurFade>

          {/* Dönen ünvan */}
          <BlurFade delay={0.18}>
            <p className="text-xl font-semibold text-text-muted sm:text-2xl">
              <TypingRoles
                words={t.roles}
                className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"
              />
            </p>
          </BlurFade>

          {/* Bio */}
          <BlurFade delay={0.26}>
            <p className="max-w-md text-base leading-relaxed text-text-muted mx-auto md:mx-0">
              {t.bio}
            </p>
          </BlurFade>

          {/* CTA butonları */}
          <BlurFade delay={0.34}>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <ShimmerButton>
                <Link href={`/${lang}/blog`} className="flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19" />
                    <path d="M8 2v20" />
                    <path d="M19 2v20" />
                  </svg>
                  {t.cta_primary}
                </Link>
              </ShimmerButton>

              <Link
                href={`/${lang}/hakkinda`}
                className="flex items-center gap-2 rounded-full border border-border/70 px-5 py-2.5 text-sm font-semibold text-text-muted transition-all hover:border-primary/40 hover:bg-primary-muted hover:text-primary"
              >
                {t.cta_secondary}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
          </BlurFade>

          {/* Tech stack ufak gösterim */}
          <BlurFade delay={0.42}>
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {["React", "Next.js", "TypeScript", "Supabase", "Tailwind"].map(
                (tech, i) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border/60 bg-surface/80 px-2.5 py-1 text-[11px] font-medium text-text-muted backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </BlurFade>
        </div>

        {/* Sağ: 3D Profile Card */}
        <BlurFade delay={0.2} className="flex-1 flex items-center justify-center w-full max-w-sm md:max-w-none">
          <ProfileCard
            lang={lang}
            stats={t.stats}
          />
        </BlurFade>
      </div>

      {/* Alt fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </Spotlight>
  );
}
