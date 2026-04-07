"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useProfile } from "@/hooks/use-profile";
import type { Locale } from "@/app/[lang]/dictionaries";

type NavItem = { label: string; href: string };

type Props = {
  lang: Locale;
  navItems: NavItem[];
  langToggleLabel: string;
  themeToggleLabel: string;
};

export function HeaderNav({
  lang,
  navItems,
  langToggleLabel,
  themeToggleLabel,
}: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout, loading, profile, user } = useProfile();
  const authLabels =
    lang === "tr"
      ? { login: "Giriş", signup: "Kayıt", logout: "Çıkış" }
      : { login: "Login", signup: "Sign up", logout: "Logout" };
  const avatarLetter = (profile?.full_name?.[0] ?? profile?.username?.[0] ?? user?.email?.[0] ?? "U").toUpperCase();
  const userLabel = profile?.username ?? profile?.full_name ?? user?.email ?? "User";

  const otherLang: Locale = lang === "tr" ? "en" : "tr";
  const langSwitchHref = pathname.replace(`/${lang}`, `/${otherLang}`);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* ── Desktop: merkez floating pill ── */}
      <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 rounded-full border border-border/60 bg-surface/80 px-1.5 py-1 backdrop-blur-sm shadow-sm shadow-black/5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3.5 py-1.5 text-sm font-medium transition-colors"
            >
              {active && (
                <motion.span
                  layoutId="pill-active"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/15 via-blue-500/10 to-emerald-500/10 ring-1 ring-inset ring-primary/20"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-150 ${
                  active
                    ? "bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400 bg-clip-text text-transparent font-semibold"
                    : "text-text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── Desktop: sağ aksiyonlar ── */}
      <div className="hidden md:flex items-center gap-1">
        {!loading && !isAuthenticated ? (
          <>
            <Link
              href={`/${lang}/login`}
              className="flex h-8 items-center rounded-full border border-border/60 bg-surface/80 px-3 text-xs font-semibold text-text-muted transition-all hover:border-primary/30 hover:text-foreground"
            >
              {authLabels.login}
            </Link>
            <Link
              href={`/${lang}/signup`}
              className="flex h-8 items-center rounded-full border border-primary/30 bg-primary/10 px-3 text-xs font-semibold text-primary transition-all hover:bg-primary/15"
            >
              {authLabels.signup}
            </Link>
          </>
        ) : null}

        {!loading && isAuthenticated ? (
          <div className="flex items-center gap-1.5">
            <div className="flex h-8 max-w-[140px] items-center gap-2 rounded-full border border-border/60 bg-surface/80 px-2 pr-2.5 text-xs text-text-muted">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[10px] font-bold text-white">
                {avatarLetter}
              </span>
              <span className="truncate">{userLabel}</span>
            </div>
            <button
              onClick={async () => {
                await logout();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-surface/80 text-text-muted transition-all hover:border-primary/30 hover:text-foreground"
              aria-label={authLabels.logout}
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : null}

        {/* Dil butonu */}
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
          <Link
            href={langSwitchHref}
            aria-label={langToggleLabel}
            className="flex h-8 items-center gap-1.5 rounded-full border border-border/60 bg-surface/80 px-3 text-[11px] font-semibold tracking-widest text-text-muted backdrop-blur-sm transition-all hover:border-primary/30 hover:text-foreground"
          >
            {otherLang.toUpperCase()}
          </Link>
        </motion.div>

        <ThemeToggle label={themeToggleLabel} />
      </div>

      {/* ── Mobil: sağ ── */}
      <div className="flex md:hidden items-center gap-1">
        <ThemeToggle label={themeToggleLabel} />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menüyü aç"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-surface/80 text-text-muted backdrop-blur-sm transition-colors hover:text-foreground"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Mobil dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-[calc(100%+8px)] left-4 right-4 z-50 overflow-hidden rounded-2xl border border-border/60 bg-background/95 shadow-2xl shadow-black/20 backdrop-blur-xl md:hidden"
          >
            {/* Üst gradient şerit */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <nav className="flex flex-col gap-0.5 p-2">
              {!loading && !isAuthenticated ? (
                <>
                  <Link
                    href={`/${lang}/login`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center rounded-xl px-3.5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    {authLabels.login}
                  </Link>
                  <Link
                    href={`/${lang}/signup`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center rounded-xl px-3.5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                  >
                    {authLabels.signup}
                  </Link>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mx-1 my-1 h-px bg-border/60"
                  />
                </>
              ) : null}

              {!loading && isAuthenticated ? (
                <>
                  <div className="mx-1 mb-1 flex items-center gap-2 rounded-xl border border-border/60 bg-surface/60 px-3 py-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[11px] font-bold text-white">
                      {avatarLetter}
                    </span>
                    <span className="truncate text-sm text-text-muted">{userLabel}</span>
                  </div>
                  <button
                    onClick={async () => {
                      await logout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    <LogOut size={14} />
                    {authLabels.logout}
                  </button>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mx-1 my-1 h-px bg-border/60"
                  />
                </>
              ) : null}

              {navItems.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.18 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-gradient-to-r from-violet-500/10 to-blue-500/10 text-primary"
                          : "text-text-muted hover:bg-surface-2 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.04 }}
                className="mx-1 my-1 h-px bg-border/60"
              />

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.04 + 0.04 }}
              >
                <Link
                  href={langSwitchHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  {langToggleLabel}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
