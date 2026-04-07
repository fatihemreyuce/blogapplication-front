"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Coffee, Sparkles } from "lucide-react";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37a4 4 0 1 1-2.74-3.74 4 4 0 0 1 2.74 3.74z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.42v6.32zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
  </svg>
);
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/app/[lang]/dictionaries";

const content = {
  tr: {
    badge: "Hakkımda",
    heading: "Merhaba, ben\nFatih Emre",
    subheading: "Full-Stack Developer & Designer",
    bio1:
      "Web'i seviyorum — sadece çalışan değil, güzel ve anlamlı şeyler inşa etmek istiyorum. Modern frontend teknolojileri, minimalist tasarım ve kullanıcı deneyimi benim tutkularım.",
    bio2:
      "Şu anda kendi blog projelerim üzerinde çalışıyorum. Öğrendiklerimi, ürettiklerimi ve gördüklerimi burada paylaşıyorum.",
    location: "Türkiye",
    available: "Müsait",
    contact: "İletişim",
    funFacts: [
      { icon: Coffee, text: "Günde 3+ kahve" },
      { icon: Sparkles, text: "Dark mode taraftarı" },
    ],
  },
  en: {
    badge: "About Me",
    heading: "Hi, I'm\nFatih Emre",
    subheading: "Full-Stack Developer & Designer",
    bio1:
      "I love the web — not just building things that work, but things that are beautiful and meaningful. Modern frontend technologies, minimalist design, and user experience are my passions.",
    bio2:
      "Currently working on my own blog projects. I share what I learn, build, and discover here.",
    location: "Turkey",
    available: "Available",
    contact: "Contact",
    funFacts: [
      { icon: Coffee, text: "3+ coffees a day" },
      { icon: Sparkles, text: "Dark mode advocate" },
    ],
  },
};

type Props = { lang: Locale };

export function AboutHero({ lang }: Props) {
  const t = content[lang];
  const lines = t.heading.split("\n");

  return (
    <section className="relative overflow-hidden pt-16 pb-8">
      {/* Arka plan orb'lar */}
      <div className="pointer-events-none absolute -top-20 left-0 h-72 w-72 rounded-full bg-violet-500/8 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-0 h-64 w-64 rounded-full bg-blue-500/8 blur-3xl" />

      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">

          {/* Sol: Metin */}
          <div className="flex-1 space-y-6">
            <BlurFade delay={0.05}>
              <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary-muted text-primary text-xs px-3 py-1">
                <Sparkles size={11} />
                {t.badge}
              </Badge>
            </BlurFade>

            <BlurFade delay={0.12}>
              <h1 className="text-5xl font-black leading-none tracking-tight lg:text-7xl">
                {lines.map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                        {line}
                      </span>
                    ) : (
                      <span className="text-foreground">{line}</span>
                    )}
                  </span>
                ))}
              </h1>
            </BlurFade>

            <BlurFade delay={0.18}>
              <p className="text-lg font-medium text-text-muted">{t.subheading}</p>
            </BlurFade>

            <BlurFade delay={0.24}>
              <div className="space-y-3 text-text-muted text-[15px] leading-relaxed max-w-lg">
                <p>{t.bio1}</p>
                <p>{t.bio2}</p>
              </div>
            </BlurFade>

            {/* Konum + müsaitlik */}
            <BlurFade delay={0.3}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-sm text-text-subtle">
                  <MapPin size={13} />
                  {t.location}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t.available}
                </span>
                {t.funFacts.map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5 text-xs text-text-subtle">
                    <Icon size={12} className="text-text-subtle" />
                    {text}
                  </span>
                ))}
              </div>
            </BlurFade>

            {/* CTA + sosyal */}
            <BlurFade delay={0.36}>
              <div className="flex flex-wrap items-center gap-3">
                <ShimmerButton>
                  <a href="mailto:hello@example.com" className="flex items-center gap-2">
                    <Mail size={14} />
                    {t.contact}
                  </a>
                </ShimmerButton>

                {[
                  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
                  { icon: XIcon, href: "https://x.com", label: "Twitter/X" },
                  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
                  { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </BlurFade>
          </div>

          {/* Sağ: 3D Kimlik kartı */}
          <BlurFade delay={0.2} className="flex justify-center md:justify-end">
            <AboutCard lang={lang} />
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

/* ── Sağ taraftaki 3D kart ── */
function AboutCard({ lang }: { lang: Locale }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-64"
      style={{ perspective: 800 }}
    >
      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/15 via-blue-500/10 to-emerald-500/15 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/90 backdrop-blur-xl shadow-2xl shadow-black/15">
        {/* Üst şerit */}
        <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400" />

        <div className="p-6 space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-violet-500 to-emerald-400 opacity-60 blur-sm" />
              <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-violet-600 via-blue-600 to-emerald-500 flex items-center justify-center text-xl font-black text-white">
                F
              </div>
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">Fatih Emre</p>
              <p className="text-xs text-text-muted">@fatihemre</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/60" />

          {/* İstatistikler */}
          {[
            { label: lang === "tr" ? "Yazı" : "Posts", value: "48", icon: "📝" },
            { label: lang === "tr" ? "Proje" : "Projects", value: "12", icon: "🚀" },
            { label: lang === "tr" ? "Yıl Deneyim" : "Years Exp.", value: "2+", icon: "⚡" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-text-muted">
                <span>{stat.icon}</span>
                {stat.label}
              </span>
              <span className="text-sm font-bold text-foreground">{stat.value}</span>
            </div>
          ))}

          {/* Alt çizgi */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
