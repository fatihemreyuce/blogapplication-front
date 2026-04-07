"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
    emailNotConfirmed:
      "E-posta doğrulanmamış. Mail kutundan doğrulama linkine tıkla veya yeniden gönder.",
    resendConfirm: "Doğrulama mailini tekrar gönder",
    resendSent: "Doğrulama maili tekrar gönderildi.",
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
    emailNotConfirmed:
      "Your email is not confirmed. Check your inbox or resend the confirmation email.",
    resendConfirm: "Resend confirmation email",
    resendSent: "Confirmation email sent again.",
  },
} as const;

export function AuthCard3D({ mode, lang }: Props) {
  const t = copy[lang];
  const router = useRouter();
  const { login, signup, resendConfirmation, error, setError } = useProfile();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

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

  async function onResendConfirmation() {
    if (!email.trim()) return;
    setResending(true);
    setInfo(null);
    const result = await resendConfirmation(email.trim());
    if (result.ok) {
      setInfo(t.resendSent);
    }
    setResending(false);
  }

  const isEmailNotConfirmed = error === "EMAIL_NOT_CONFIRMED";

  return (
    <Spotlight className="relative">
      <GridPattern
        squares={[
          [0, 1],
          [2, 2],
          [4, 3],
          [6, 1],
        ]}
        className="opacity-30"
      />
      <div className="relative grid gap-10 px-2 py-4 md:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] md:items-center md:gap-14 md:px-0 lg:gap-20">
        <div className="pointer-events-none absolute -top-14 left-10 h-36 w-36 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-14 right-10 h-36 w-36 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="space-y-6">
          <BlurFade delay={0.08}>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                <Sparkles size={12} />
                {mode === "login" ? "Login" : "Signup"}
              </div>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                {mode === "login" ? t.loginTitle : t.signupTitle}
              </h1>
              <p className="max-w-xl text-sm text-text-muted md:text-base">
                {mode === "login" ? t.loginSub : t.signupSub}
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.12}>
            <div className="grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-background/35 px-3 py-2 text-xs text-text-muted backdrop-blur-sm">
                <ShieldCheck size={14} className="text-emerald-400" />
                {t.secure}
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-background/35 px-3 py-2 text-xs text-text-muted backdrop-blur-sm">
                <Zap size={14} className="text-blue-400" />
                {t.fast}
              </div>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.16}>
          <div className="space-y-3 md:justify-self-end md:w-full md:max-w-[460px]">
            <form
              className="space-y-3 rounded-2xl border border-border/55 bg-surface/55 p-5 backdrop-blur-lg md:p-6"
              onSubmit={onSubmit}
            >
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

              {error ? (
                <div className="space-y-1">
                  <p className="text-xs text-rose-400">
                    {isEmailNotConfirmed ? t.emailNotConfirmed : error}
                  </p>
                  {mode === "login" && isEmailNotConfirmed ? (
                    <button
                      type="button"
                      onClick={onResendConfirmation}
                      disabled={resending || !email.trim()}
                      className="text-xs font-medium text-primary underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {resending ? "..." : t.resendConfirm}
                    </button>
                  ) : null}
                </div>
              ) : null}
              {info ? <p className="text-xs text-emerald-400">{info}</p> : null}

              <ShimmerButton type="submit" disabled={loading} className="w-full text-sm font-semibold">
                <span className="inline-flex items-center gap-2">
                  {loading ? "..." : mode === "login" ? t.loginCta : t.signupCta}
                  {!loading ? <ArrowRight size={14} /> : null}
                </span>
              </ShimmerButton>
            </form>
            <div className="px-1 text-center text-xs text-text-subtle md:text-left">
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
          </div>
        </BlurFade>
      </div>
    </Spotlight>
  );
}
