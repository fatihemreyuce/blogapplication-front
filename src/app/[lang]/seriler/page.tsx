import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { SeriesShowcase } from "@/components/series/series-showcase";
import { getSeriesList } from "@/services/server/series-server";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/seriler">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "tr" ? "Seriler" : "Series",
    description:
      lang === "tr" ? "Yazı serilerini sırayla takip edin." : "Follow post series in order.",
  };
}

export default async function SeriesPage({ params }: PageProps<"/[lang]/seriler">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const [dict, series] = await Promise.all([getDictionary(lang), getSeriesList()]);

  return (
    <SeriesShowcase
      lang={lang}
      series={series}
      dict={dict.series_home}
    />
  );
}
