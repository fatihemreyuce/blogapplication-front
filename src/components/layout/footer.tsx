import Link from "next/link";
import { getDictionary, type Locale } from "@/app/[lang]/dictionaries";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37a4 4 0 1 1-2.74-3.74 4 4 0 0 1 2.74 3.74z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.42v6.32zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
      </svg>
    ),
  },
  {
    label: "RSS",
    href: "/rss.xml",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

type Props = { lang: Locale };

export async function Footer({ lang }: Props) {
  const dict = await getDictionary(lang);

  const navColumns = [
    {
      title: "Keşfet",
      links: [
        { label: dict.nav.blog, href: `/${lang}/blog` },
        { label: dict.nav.categories, href: `/${lang}/kategoriler` },
        { label: dict.nav.tags, href: `/${lang}/etiketler` },
        { label: dict.nav.series, href: `/${lang}/seriler` },
      ],
    },
    {
      title: lang === "tr" ? "Daha Fazla" : "More",
      links: [
        { label: dict.nav.about, href: `/${lang}/hakkinda` },
        { label: "RSS", href: "/rss.xml" },
      ],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border/50">
      {/* Üst gradient çizgi */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Arka plan glow */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 py-12">
        {/* Üst kısım */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Sol: Logo + açıklama */}
          <div className="max-w-xs space-y-4">
            {/* Logo */}
            <Link href={`/${lang}`} className="inline-flex items-center gap-2.5 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-blue-600 to-emerald-500 shadow-lg shadow-violet-500/30 transition-shadow group-hover:shadow-violet-500/50">
                <div className="absolute inset-px rounded-[10px] bg-gradient-to-b from-white/25 to-transparent" />
                <span className="relative z-10 text-sm font-black text-white">B</span>
              </div>
              <span className="text-sm font-bold text-foreground">Blog</span>
            </Link>

            <p className="text-sm leading-relaxed text-text-muted">
              {lang === "tr"
                ? "Teknoloji, tasarım ve yazılım üzerine düşünceler."
                : "Thoughts on technology, design, and software."}
            </p>

            {/* Sosyal ikonlar */}
            <div className="flex items-center gap-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-text-subtle transition-all hover:bg-surface-2 hover:text-foreground hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sağ: Nav kolonları */}
          <div className="flex gap-12">
            {navColumns.map((col) => (
              <div key={col.title} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-text-subtle">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Alt çizgi + copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/50 pt-6 sm:flex-row">
          <p className="text-xs text-text-subtle">
            © {currentYear} Blog.{" "}
            {lang === "tr" ? "Tüm hakları saklıdır." : "All rights reserved."}
          </p>

          {/* Dil geçiş linki */}
          <Link
            href={lang === "tr" ? "/en" : "/tr"}
            className="text-xs text-text-subtle transition-colors hover:text-foreground"
          >
            {lang === "tr" ? "Switch to English" : "Türkçeye Geç"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
