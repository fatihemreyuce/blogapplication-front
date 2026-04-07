import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/app/[lang]/dictionaries";
import { BlogAboutHero } from "@/components/sections/blog-about-hero";
import { BlogTopics } from "@/components/sections/blog-topics";
import { BlogMission } from "@/components/sections/blog-mission";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/hakkinda">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "tr" ? "Blog Hakkında" : "About the Blog",
    description:
      lang === "tr"
        ? "Bu blog hakkında — neler yazıyoruz, neden yazıyoruz."
        : "About this blog — what we write, why we write it.",
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/hakkinda">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="relative">
      <BlogAboutHero lang={lang} />

      <Divider />
      <BlogTopics lang={lang} />

      <Divider />
      <BlogMission lang={lang} />

      <div className="h-16" />
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
