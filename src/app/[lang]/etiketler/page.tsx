import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/app/[lang]/dictionaries";
import { TaxonomyHub } from "@/components/taxonomy/taxonomy-hub";
import { getBlogTaxonomy } from "@/services/server/post-server";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/etiketler">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "tr" ? "Etiketler" : "Tags",
    description:
      lang === "tr" ? "Yazıları etiketlere göre keşfedin." : "Explore posts by tags.",
  };
}

export default async function TagsPage({ params }: PageProps<"/[lang]/etiketler">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { tags } = await getBlogTaxonomy();

  return (
    <TaxonomyHub
      lang={lang}
      title={lang === "tr" ? "Etiketler" : "Tags"}
      subtitle={
        lang === "tr"
          ? "İlgini çeken konuları etiketlerle yakala, ilgili yazıları tek tıkla filtrele."
          : "Find your topics quickly with tags and jump into filtered posts."
      }
      emptyLabel={lang === "tr" ? "Henüz etiket yok." : "No tags yet."}
      items={tags}
      queryKey="tagId"
      prefix="#"
    />
  );
}
