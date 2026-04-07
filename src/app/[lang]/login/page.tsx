import { notFound } from "next/navigation";
import { hasLocale } from "@/app/[lang]/dictionaries";
import { AuthCard3D } from "@/components/auth/auth-card-3d";

export default async function LoginPage({ params }: PageProps<"/[lang]/login">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <section className="relative min-h-[calc(100vh-56px)] overflow-hidden py-16">
      <div className="pointer-events-none absolute -top-20 left-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-16 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="mx-auto max-w-md px-4">
        <AuthCard3D mode="login" lang={lang} />
      </div>
    </section>
  );
}
