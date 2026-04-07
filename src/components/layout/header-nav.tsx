"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import type { Locale } from "@/app/[lang]/dictionaries";

type NavItem = {
  label: string;
  href: string;
};

type Props = {
  lang: Locale;
  navItems: NavItem[];
  langToggleLabel: string;
  themeToggleLabel: string;
  siteName: string;
};

export function HeaderNav({
  lang,
  navItems,
  langToggleLabel,
  themeToggleLabel,
  siteName,
}: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const otherLang: Locale = lang === "tr" ? "en" : "tr";

  // Mevcut sayfanın diğer dildeki karşılığını üret
  // /tr/blog → /en/blog
  const langSwitchHref = pathname.replace(`/${lang}`, `/${otherLang}`);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "text-primary bg-primary-muted"
                : "text-text-muted hover:text-text hover:bg-surface-2"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right actions */}
      <div className="hidden md:flex items-center gap-1">
        {/* Dil değiştirici */}
        <Link
          href={langSwitchHref}
          className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
          aria-label={langToggleLabel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          {otherLang.toUpperCase()}
        </Link>

        <ThemeToggle label={themeToggleLabel} />
      </div>

      {/* Mobile: hamburger + actions */}
      <div className="flex md:hidden items-center gap-1">
        <ThemeToggle label={themeToggleLabel} />

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menüyü aç"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 z-50 border-b border-border bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary-muted"
                    : "text-text-muted hover:text-text hover:bg-surface-2"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-2 border-t border-border pt-2">
              <Link
                href={langSwitchHref}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                {langToggleLabel}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
