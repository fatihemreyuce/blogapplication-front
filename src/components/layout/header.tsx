import Link from "next/link";
import { getDictionary, type Locale } from "@/app/[lang]/dictionaries";
import { HeaderClient } from "./header-client";
import { LogoMark } from "./logo-mark";

type Props = { lang: Locale };

export async function Header({ lang }: Props) {
  const dict = await getDictionary(lang);

  const navItems = [
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: dict.nav.categories, href: `/${lang}/kategoriler` },
    { label: dict.nav.tags, href: `/${lang}/etiketler` },
    { label: dict.nav.series, href: `/${lang}/seriler` },
    { label: dict.nav.about, href: `/${lang}/hakkinda` },
  ];

  return (
    <HeaderClient
      lang={lang}
      navItems={navItems}
      langToggleLabel={dict.nav.toggle_lang}
      themeToggleLabel={dict.nav.toggle_theme}
    />
  );
}
