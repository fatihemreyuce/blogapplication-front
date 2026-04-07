import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/app/[lang]/dictionaries";
import { AboutHero } from "@/components/sections/about-hero";
import { TechStack } from "@/components/sections/tech-stack";
import { Timeline } from "@/components/sections/timeline";
import { Values } from "@/components/sections/values";
import { GridPattern } from "@/components/magicui/grid-pattern";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/hakkinda">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "tr" ? "Hakkımda" : "About Me",
    description:
      lang === "tr"
        ? "Full-stack geliştirici ve tasarımcı hakkında bilgi."
        : "About a full-stack developer and designer.",
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/hakkinda">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="relative">
      {/* Subtle arka plan deseni */}
      <GridPattern className="opacity-40 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,white,transparent)]" />

      <AboutHero lang={lang} />

      {/* Section divider */}
      <SectionDivider />

      <TechStack lang={lang} />

      <SectionDivider />

      <Timeline lang={lang} />

      <SectionDivider />

      <Values lang={lang} />

      {/* Alt boşluk */}
      <div className="h-16" />
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
