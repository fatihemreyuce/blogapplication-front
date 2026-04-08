import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { CategoriesShowcase } from "@/components/categories/categories-showcase";
import { getCategories } from "@/services/server/category-server";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/kategoriler">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "tr" ? "Kategoriler" : "Categories",
    description:
      lang === "tr"
        ? "Blog yazılarını konuya göre keşfedin."
        : "Explore blog posts by category.",
  };
}

export default async function CategoriesPage({ params }: PageProps<"/[lang]/kategoriler">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const [dict, categories] = await Promise.all([getDictionary(lang), getCategories()]);

  return (
    <CategoriesShowcase
      categories={categories}
      lang={lang}
      dict={dict.categories}
    />
  );
}
