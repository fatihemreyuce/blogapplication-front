import Link from "next/link";
import { getDictionary, type Locale } from "@/app/[lang]/dictionaries";
import { HeaderNav } from "./header-nav";

type Props = {
  lang: Locale;
};

export async function Header({ lang }: Props) {
  const dict = await getDictionary(lang);

  const navItems = [
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: dict.nav.categories, href: `/${lang}/kategoriler` },
    { label: dict.nav.tags, href: `/${lang}/etiketler` },
    { label: dict.nav.series, href: `/${lang}/seriler` },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 relative">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 font-semibold text-text shrink-0"
        >
          <span className="text-primary font-bold text-lg">●</span>
          <span>Blog</span>
        </Link>

        <HeaderNav
          lang={lang}
          navItems={navItems}
          langToggleLabel={dict.nav.toggle_lang}
          themeToggleLabel={dict.nav.toggle_theme}
          siteName="Blog"
        />
      </div>
    </header>
  );
}
