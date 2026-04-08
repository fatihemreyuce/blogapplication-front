import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/app/[lang]/dictionaries";
import { TaxonomyHub } from "@/components/taxonomy/taxonomy-hub";
import { getBlogTaxonomy } from "@/services/server/post-server";

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

  const { series } = await getBlogTaxonomy();

  return (
    <TaxonomyHub
      lang={lang}
      title={lang === "tr" ? "Seriler" : "Series"}
      subtitle={
        lang === "tr"
          ? "Seri bazında ilerle, bir konuyu adım adım takip et."
          : "Learn step by step with curated post series."
      }
      emptyLabel={lang === "tr" ? "Henüz seri yok." : "No series yet."}
      items={series}
      queryKey="seriesId"
      prefix=""
    />
  );
}
