"use client";

import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { LogoMark } from "./logo-mark";
import { HeaderNav } from "./header-nav";
import { ScrollProgress } from "./scroll-progress";
import type { Locale } from "@/app/[lang]/dictionaries";

type NavItem = { label: string; href: string };

type Props = {
  lang: Locale;
  navItems: NavItem[];
  langToggleLabel: string;
  themeToggleLabel: string;
};

export function HeaderClient({ lang, navItems, langToggleLabel, themeToggleLabel }: Props) {
  const { scrollY } = useScroll();

  // Scroll'a göre blur ve border opacity artar
  const bgOpacity = useTransform(scrollY, [0, 60], [0.5, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 60], [0.3, 0.7]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.12]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Ana bar */}
      <motion.div
        style={{
          backgroundColor: `rgba(var(--background-rgb, 9,9,11), ${bgOpacity})`,
          borderBottomColor: `rgba(255,255,255, ${borderOpacity})`,
          boxShadow: shadowOpacity
            ? `0 8px 32px rgba(0,0,0,${shadowOpacity})`
            : undefined,
        }}
        className="relative border-b backdrop-blur-2xl"
      >
        {/* Scroll progress bar */}
        <ScrollProgress />

        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 relative">
          {/* Logo */}
          <Link href={`/${lang}`} className="shrink-0 z-10">
            <LogoMark />
          </Link>

          {/* Nav + aksiyonlar */}
          <HeaderNav
            lang={lang}
            navItems={navItems}
            langToggleLabel={langToggleLabel}
            themeToggleLabel={themeToggleLabel}
          />
        </div>

        {/* Alt ince gradient çizgi */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </motion.div>
    </motion.header>
  );
}
