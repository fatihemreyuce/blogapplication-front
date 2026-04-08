import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { BlogFeed } from "@/components/blog/blog-feed";
import {
  attachCategoryNames,
  getBlogTaxonomy,
  getPublishedPosts,
} from "@/services/server/post-server";

export default async function BlogPage({
  params,
  searchParams,
}: PageProps<"/[lang]/blog"> & {
  searchParams?: Promise<{ categoryId?: string; tagId?: string; seriesId?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const sp = (await searchParams) ?? {};
  const initialCategoryId =
    typeof sp.categoryId === "string" && sp.categoryId.length > 0 ? sp.categoryId : null;
  const initialTagId = typeof sp.tagId === "string" && sp.tagId.length > 0 ? sp.tagId : null;
  const initialSeriesId =
    typeof sp.seriesId === "string" && sp.seriesId.length > 0 ? sp.seriesId : null;

  const dict = await getDictionary(lang);
  const [posts, taxonomy] = await Promise.all([getPublishedPosts(undefined, lang), getBlogTaxonomy()]);
  const postsWithLabels = attachCategoryNames(posts, taxonomy.categories);

  return (
    <BlogFeed
      posts={postsWithLabels}
      taxonomy={taxonomy}
      lang={lang}
      dict={dict.blog}
      initialCategoryId={initialCategoryId}
      initialTagId={initialTagId}
      initialSeriesId={initialSeriesId}
    />
  );
}
