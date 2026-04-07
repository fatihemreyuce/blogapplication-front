"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { Sparkles, ShieldCheck, Zap, ArrowRight, Eye, EyeOff } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Spotlight } from "@/components/magicui/spotlight";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useProfile } from "@/hooks/use-profile";

type Props = {
  mode: "login" | "signup";
  lang: "tr" | "en";
};

const copy = {
  tr: {
    loginTitle: "Tekrar hoş geldin",
    loginSub: "Hesabına giriş yap ve etkileşime devam et.",
    signupTitle: "Aramıza katıl",
    signupSub: "Hızlıca hesap oluştur, yazıları beğen ve kaydet.",
    email: "E-posta",
    password: "Şifre",
    fullName: "Ad Soyad",
    username: "Kullanıcı adı",
    loginCta: "Giriş Yap",
    signupCta: "Kayıt Ol",
    switchToLogin: "Zaten hesabın var mı? Giriş yap",
    switchToSignup: "Hesabın yok mu? Kayıt ol",
    secure: "Güvenli kimlik doğrulama",
    fast: "Hızlı erişim ve modern deneyim",
  },
  en: {
    loginTitle: "Welcome back",
    loginSub: "Sign in to continue engaging with posts.",
    signupTitle: "Join the community",
    signupSub: "Create your account and start liking/saving posts.",
    email: "Email",
    password: "Password",
    fullName: "Full name",
    username: "Username",
    loginCta: "Sign In",
    signupCta: "Sign Up",
    switchToLogin: "Already have an account? Sign in",
    switchToSignup: "No account yet? Sign up",
    secure: "Secure authentication flow",
    fast: "Fast access and modern experience",
  },
} as const;

export function AuthCard3D({ mode, lang }: Props) {
  const t = copy[lang];
  const router = useRouter();
  const { login, signup, error, setError } = useProfile();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-160, 160], [7, -7]), {
    stiffness: 220,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mouseX, [-160, 160], [-7, 7]), {
    stiffness: 220,
    damping: 26,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (mode === "login") {
      const result = await login(email, password);
      if (result.ok) router.push(`/${lang}`);
    } else {
      const result = await signup({
        email,
        password,
        username,
        full_name: fullName,
      });
      if (result.ok) router.push(`/${lang}`);
    }

    setLoading(false);
  }

  return (
    <Spotlight className="relative rounded-3xl">
      <GridPattern
        squares={[
          [0, 1],
          [2, 2],
          [4, 3],
          [6, 1],
        ]}
        className="opacity-40"
      />
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseX.set(e.clientX - (rect.left + rect.width / 2));
          mouseY.set(e.clientY - (rect.top + rect.height / 2));
        }}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-surface/80 p-8 backdrop-blur-xl"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="pointer-events-none absolute -top-12 -right-10 h-32 w-32 rounded-full bg-violet-500/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-blue-500/15 blur-2xl" />
        <div className="space-y-6">
          <BlurFade delay={0.05}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                <Sparkles size={12} />
                {mode === "login" ? "Login" : "Signup"}
              </div>
              <h1 className="text-3xl font-black tracking-tight">
                {mode === "login" ? t.loginTitle : t.signupTitle}
              </h1>
              <p className="text-sm text-text-muted">
                {mode === "login" ? t.loginSub : t.signupSub}
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.08}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-xs text-text-muted">
                <ShieldCheck size={14} className="text-emerald-400" />
                {t.secure}
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-xs text-text-muted">
                <Zap size={14} className="text-blue-400" />
                {t.fast}
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.1}>
            <form className="space-y-3" onSubmit={onSubmit}>
              {mode === "signup" ? (
                <>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fullName}
                    required
                    className="h-11 w-full rounded-xl border border-border/70 bg-background/60 px-3 text-sm outline-none transition placeholder:text-text-subtle focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  />
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t.username}
                    required
                    className="h-11 w-full rounded-xl border border-border/70 bg-background/60 px-3 text-sm outline-none transition placeholder:text-text-subtle focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  />
                </>
              ) : null}

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder={t.email}
                required
                className="h-11 w-full rounded-xl border border-border/70 bg-background/60 px-3 text-sm outline-none transition placeholder:text-text-subtle focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              />
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder={t.password}
                  required
                  minLength={6}
                  className="h-11 w-full rounded-xl border border-border/70 bg-background/60 px-3 pr-10 text-sm outline-none transition placeholder:text-text-subtle focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-subtle transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error ? <p className="text-xs text-rose-400">{error}</p> : null}

              <ShimmerButton type="submit" disabled={loading} className="w-full text-sm font-semibold">
                <span className="inline-flex items-center gap-2">
                  {loading ? "..." : mode === "login" ? t.loginCta : t.signupCta}
                  {!loading ? <ArrowRight size={14} /> : null}
                </span>
              </ShimmerButton>
            </form>
          </BlurFade>

          <BlurFade delay={0.15}>
            <div className="text-xs text-text-subtle">
              {mode === "login" ? (
                <Link href={`/${lang}/signup`} className="hover:text-primary">
                  {t.switchToSignup}
                </Link>
              ) : (
                <Link href={`/${lang}/login`} className="hover:text-primary">
                  {t.switchToLogin}
                </Link>
              )}
            </div>
          </BlurFade>
        </div>
      </motion.div>
    </Spotlight>
  );
}
