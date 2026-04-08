import { notFound, redirect } from "next/navigation";
import { hasLocale } from "@/app/[lang]/dictionaries";
import { getCategoryBySlug } from "@/services/server/category-server";

export default async function CategorySlugRedirectPage({
  params,
}: PageProps<"/[lang]/kategoriler/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  redirect(`/${lang}/blog?categoryId=${encodeURIComponent(category.id)}`);
}
